
// app/agm/budget/page.tsx
// Server Component (App Router) — loads mock data, shows summary cards, mounts BudgetGrid (AG Grid).
// No new deps here; grid is in a separate client component: components/BudgetGrid.tsx

export const runtime = "nodejs";

import { promises as fs } from "fs";
import path from "path";
import BudgetGrid from "../../../components/BudgetGrid";

// Temporary local type (we'll move to /types/budgetLine.ts later)
type BudgetLine = {
    type: "revenue" | "expense";
    community: string;
    category: string;
    subCategory?: string | null;
    budgetMethod?: string | null;
    driver?: string | null;
    driverTag?: string | null;
    glCode?: string | null;
    period?: string | number | null; // e.g., "2026-01" or "2026"
    amount?: number | null;
};

// ---- helpers (will move to /lib/data.ts later) ----
async function loadBudgetLines(): Promise<BudgetLine[]> {
    const filePath = path.join(process.cwd(), "data", "budgetLines.json");
    const raw = await fs.readFile(filePath, "utf-8");
    const json = JSON.parse(raw);

    // Normalize shapes to a single array:
    // A) Flat array
    if (Array.isArray(json)) return json as BudgetLine[];
    // B) { revenues: [], expenses: [] }
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

export default async function AgmBudgetPage() {
    const lines = await loadBudgetLines();

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

            {/* AG Grid mount */}
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

                {/* This is the only change vs your previous table: mount the grid */}
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
