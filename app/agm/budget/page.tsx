
// app/agm/budget/page.tsx
// Server Component (App Router) — loads mock data, shows summary cards, mounts BudgetGrid (TanStack).
// NOTE: We now import the TanStack grid component, NOT the AG Grid one.

export const runtime = "nodejs";

import { promises as fs } from "fs";
import path from "path";
import BudgetGrid, { type BudgetLine } from "../../../components/BudgetGrid.tanstack";

// ---- helpers (kept local; we can move to /lib later) ----
async function loadBudgetLines(): Promise<BudgetLine[]> {
    const filePath = path.join(process.cwd(), "data", "budgetLines.json");
    const raw = await fs.readFile(filePath, "utf-8");
    const json = JSON.parse(raw);

    // Normalize shapes to a single array:
    // A) Flat array
    if (Array.isArray(json)) return json as BudgetLine[];
    // B) { revenues: [], expenses: [] } or { lines: [] }
    const lines: BudgetLine[] = [];
    if (Array.isArray(json.revenues)) lines.push(...json.revenues);
    if (Array.isArray(json.expenses)) lines.push(...json.expenses);
    if (Array.isArray(json.lines)) lines.push(...json.lines);
    return lines;
}

function sumAmount(lines: BudgetLine[], kind: BudgetLine["type"]) {
    return lines.reduce((acc, l) => {
        if (l.type === kind && typeof l.amount === "number") acc += l.amount;
        return acc;
    }, 0);
}

function fmtCurrency(n: number) {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
    }).format(n);
}

/**
 * Optional: clone an additional 2025 dataset from the base lines.
 * - If period is "YYYY-MM" -> replace the year with "2025"
 * - If period is "YYYY"    -> set to "2025"
 * - If null/number         -> tag as "2025"
 * You can comment this out if you don't want 2025 mock data yet.
 */
function with2025(lines: BudgetLine[], upliftPct?: number): BudgetLine[] {
    const uplift = typeof upliftPct === "number" ? 1 + upliftPct / 100 : 1;
    const replaceYear = (p: string) => p.replace(/^\d{4}/, "2025");
    const clones: BudgetLine[] = [];

    for (const d of lines) {
        let period: string | number | null = d.period ?? null;
        if (typeof period === "string") {
            if (/^\d{4}-\d{2}$/.test(period)) period = replaceYear(period);
            else if (/^\d{4}$/.test(period)) period = "2025";
        } else {
            period = "2025";
        }
        const amount =
            typeof d.amount === "number" ? Math.round(d.amount * uplift) : d.amount ?? null;

        clones.push({ ...d, period, amount });
    }
    return [...lines, ...clones];
}

export default async function AgmBudgetPage() {
    const baseLines = await loadBudgetLines();

    // Toggle 2025 mocks by switching between these two lines:
    // const lines = baseLines;                 // ← no 2025
    const lines = with2025(baseLines, /* uplift % */ undefined); // ← add 2025 copy (no uplift)

    const totalRevenue = sumAmount(lines, "revenue");
    const totalExpense = sumAmount(lines, "expense");
    const net = totalRevenue - totalExpense;

    return (
        <div className="space-y-6">
            {/* Page title */}
            <header className="space-y-1">
                <h1 className="text-xl font-semibold text-slate-900">Budget</h1>
                <p className="text-sm text-slate-600">
                    Review and update budget lines by community, category, and period.
                </p>
            </header>

            {/* Summary cards */}
            <section
                aria-label="Budget summary"
                className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
            >
                <Card title="Total Revenue" value={fmtCurrency(totalRevenue)} testId="card-total-revenue" />
                <Card title="Total Expense" value={fmtCurrency(totalExpense)} testId="card-total-expense" />
                <Card title="Net" value={fmtCurrency(net)} testId="card-net" />
            </section>

            {/* TanStack Grid mount */}
            <section
                aria-label="Budget grid"
                className="space-y-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
            >
                <div className="flex items-center justify-between">
                    <h2 className="text-base font-semibold text-slate-900">Budget Lines</h2>
                    <p className="text-xs text-slate-500">
                        {lines.length} rows · {new Set(lines.map((l) => l.community)).size} communities
                    </p>
                </div>

                {/* Mount the TanStack grid (safer side-by-side with old grid while you test) */}
                <BudgetGrid rows={lines} />
            </section>
        </div>
    );
}

function Card({
    title,
    value,
    testId,
}: {
    title: string;
    value: string;
    testId?: string;
}) {
    return (
        <div
            className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
            data-testid={testId}
        >
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                {title}
            </p>
            <p className="mt-1 text-2xl font-semibold text-slate-900">{value}</p>
        </div>
    );
}
``
