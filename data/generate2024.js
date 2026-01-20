
// data/generate2024.js
// ESM script for Node. Creates 2024 data from 2026 base.
// Amount adjustment = 6% decrease (×0.94)

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// --- config ---
const INPUT = path.join(__dirname, "budgetLines.json");
const BACKUP = path.join(__dirname, "budgetLines.backup2024.json");
const OUT_2024 = path.join(__dirname, "budgetLines_2024.json");
const FACTOR = 0.94; // ~6% decrease from 2026

// --- helpers ---
const adjust = (n) => (typeof n === "number" ? Math.round(n * FACTOR) : n);
const to2024 = (period) =>
    typeof period === "string" ? period.replace(/^2026/, "2024") : "2024";

function rowKey(d) {
    return `${d.community}|${d.type}|${d.category}|${d.subCategory}|${d.period}`;
}

function main() {
    if (!fs.existsSync(INPUT)) {
        console.error("❌ Could not find input file:", INPUT);
        process.exit(1);
    }

    const raw = fs.readFileSync(INPUT, "utf8");
    let base;
    try {
        base = JSON.parse(raw);
        if (!Array.isArray(base)) throw new Error("Expected flat JSON array.");
    } catch (e) {
        console.error("❌ Failed to parse JSON:", e.message);
        process.exit(1);
    }

    fs.writeFileSync(BACKUP, JSON.stringify(base, null, 2));

    const from2026 = base.filter(
        (r) => typeof r.period === "string" && /^2026-/.test(r.period)
    );

    if (from2026.length === 0) {
        console.warn("⚠️ No 2026 rows found to derive 2024 from.");
        return;
    }

    const generated2024 = from2026.map((row) => ({
        ...row,
        period: to2024(row.period),
        amount: adjust(row.amount),
    }));

    // Write 2024-only file
    fs.writeFileSync(OUT_2024, JSON.stringify(generated2024, null, 2));

    console.log(`✅ Wrote ${generated2024.length} 2024 rows to ${OUT_2024}`);
    console.log(`📄 Backup saved at ${BACKUP}`);
}

main();
