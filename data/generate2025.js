
// data/generate2025.js
// ESM script for Node (your project has "type": "module").
// It will:
// 1) backup data/budgetLines.json to data/budgetLines.backup.json
// 2) generate 2025 rows from existing 2026 rows with a 3% decrease
// 3) append only missing 2025 rows (idempotent) into budgetLines.json

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ---- config ----
const INPUT = path.join(__dirname, "budgetLines.json");
const BACKUP = path.join(__dirname, "budgetLines.backup.json");
const FACTOR = 0.97; // 3% decrease

// ---- helpers ----
const adjust = (n) => (typeof n === "number" ? Math.round(n * FACTOR) : n);
const to2025 = (period) =>
    typeof period === "string" ? period.replace(/^2026/, "2025") : "2025";

// Create a stable row key (same logic as your getRowId in the grid)
function rowKey(d) {
    return `${d.community ?? ""}|${d.type ?? ""}|${d.category ?? ""}|${d.subCategory ?? ""}|${d.period ?? ""}`;
}

function main() {
    if (!fs.existsSync(INPUT)) {
        console.error("❌ Could not find input file:", INPUT);
        process.exit(1);
    }

    // Read and parse base JSON
    const raw = fs.readFileSync(INPUT, "utf8");
    let base;
    try {
        base = JSON.parse(raw);
        if (!Array.isArray(base)) throw new Error("Expected a flat array");
    } catch (e) {
        console.error("❌ Failed to parse JSON:", e.message);
        process.exit(1);
    }

    // Build a set of existing keys to avoid duplicates
    const existingKeys = new Set(base.map(rowKey));

    // Create a backup (once per run; overwrite OK to keep last state)
    fs.writeFileSync(BACKUP, JSON.stringify(base, null, 2));

    // Derive 2025 rows from 2026 rows only
    const from2026 = base.filter((r) => typeof r.period === "string" && /^2026-/.test(r.period));
    if (from2026.length === 0) {
        console.warn("⚠️ No 2026 rows with 'YYYY-MM' pattern found. Nothing to clone.");
        process.exit(0);
    }

    const generated2025 = from2026.map((row) => {
        const period2025 = to2025(row.period);
        return {
            ...row,
            period: period2025,
            amount: adjust(row.amount),
        };
    });

    // Filter out any 2025 rows that already exist in base
    const toInsert = generated2025.filter((r) => !existingKeys.has(rowKey(r)));

    if (toInsert.length === 0) {
        console.log("ℹ️ 2025 rows already present. No changes made.");
        return;
    }

    const merged = [...base, ...toInsert];

    fs.writeFileSync(INPUT, JSON.stringify(merged, null, 2));

    console.log(`✅ Added ${toInsert.length} new 2025 rows`);
    console.log(`📄 Backup saved at: ${BACKUP}`);
    console.log(`📄 Updated file:    ${INPUT}`);
}

main();

