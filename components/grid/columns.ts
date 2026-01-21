
// components/grid/columns.ts
import type { ColumnDef } from '@tanstack/react-table';
import AmountCell from './AmountCell';

/** Raw JSON shape you use today (kept intact) */
export type BudgetRow = {
    type?: string;            // raw: "expense", "revenue", etc.
    community?: string;
    category?: string;
    subCategory?: string;
    budgetMethod?: string;    // present in data but NOT displayed as a column
    driver?: string;
    driverTag?: string;
    glCode?: string | null;
    period?: string;          // e.g., "2026-03"
    amount?: number | string | null;
    [key: string]: unknown;
};

// Back-compat alias if other files import BudgetLine
export type BudgetLine = BudgetRow;

/* ---------------------------------- */
/* Helpers: derive Year, Quarter, Month from "YYYY-MM" */
/* ---------------------------------- */

/** Return 2026 from "2026-03" */
export function deriveYear(period?: string): number | null {
    if (!period) return null;
    const y = parseInt(period.slice(0, 4), 10);
    return Number.isFinite(y) ? y : null;
}

/** Internal: 1–12 from "2026-03" */
function deriveMonthNumber(period?: string): number | null {
    if (!period || period.length < 7) return null;
    const m = parseInt(period.slice(5, 7), 10);
    return m >= 1 && m <= 12 ? m : null;
}

/** Return month label: Jan, Feb, Mar, ... */
export function deriveMonthLabel(period?: string): string {
    const m = deriveMonthNumber(period);
    if (!m) return '';
    const labels = [
        '', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
    ];
    return labels[m] ?? '';
}

/** Return quarter in format YYQ#: e.g., 26Q1, 25Q4 */
export function deriveQuarterLabel(period?: string): string {
    const year = deriveYear(period);
    const m = deriveMonthNumber(period);
    if (!year || !m) return '';
    const q = Math.ceil(m / 3);
    const yy = String(year).slice(-2); // 2026 → "26"
    return `${yy}Q${q}`;
}

/** Map raw "type" → UI label for Budget Type */
export function mapBudgetType(raw?: string): string {
    if (!raw) return '';
    const t = String(raw).toLowerCase();
    if (t === 'expense') return 'Expense';
    if (t === 'revenue') return 'Revenue';
    if (t === 'capex' || t === 'capital' || t === 'capital_expenditure') return 'CapEx';
    // Fallback: Title Case original value
    return raw.charAt(0).toUpperCase() + raw.slice(1);
}

/* ---------------------------------- */
/* Column definitions (ORDER LOCKED)  */
/* Community | Category | SubCategory | GL Code | Budget Type | Year | Quarter | Month | Amount */
/* ---------------------------------- */

export const columns: ColumnDef<BudgetRow, any>[] = [
    {
        id: 'community',
        accessorKey: 'community',
        header: 'Community',
        enableResizing: true,
        size: 200,
    },
    {
        id: 'category',
        accessorKey: 'category',
        header: 'Category',
        enableResizing: true,
        size: 200,
    },
    {
        id: 'subCategory',
        accessorKey: 'subCategory',
        header: 'SubCategory',
        enableResizing: true,
        size: 220,
    },
    {
        id: 'glCode',
        accessorKey: 'glCode',
        header: 'GL Code',
        enableResizing: true,
        size: 110,
        cell: (info) => String(info.getValue() ?? ''),
    },
    {
        id: 'budgetType',
        header: 'Budget Type',
        accessorFn: (row) => mapBudgetType(row.type),
        enableResizing: true,
        size: 140,
    },
    {
        id: 'year',
        header: 'Year',
        accessorFn: (row) => deriveYear(row.period),
        enableResizing: true,
        size: 90,
        cell: (info) => {
            const y = info.getValue() as number | null;
            return y ?? '';
        },
        // Keep filtering on 'year' numeric-safe so toolbar Year works as expected
        filterFn: (row, _columnId, filterValue: unknown) => {
            const y = row.getValue<number | null>('year');
            if (filterValue == null || filterValue === '') return true;
            const fv = typeof filterValue === 'string' ? parseInt(filterValue, 10) : filterValue;
            return y === fv;
        },
    },
    {
        id: 'quarter',
        header: 'Quarter',
        accessorFn: (row) => deriveQuarterLabel(row.period), // e.g., 26Q1
        enableResizing: true,
        size: 100,
    },
    {
        id: 'month',
        header: 'Month',
        accessorFn: (row) => deriveMonthLabel(row.period),   // e.g., Jan
        enableResizing: true,
        size: 90,
    },
    {
        id: 'amount',
        accessorKey: 'amount',
        header: 'Amount',
        enableResizing: true,
        size: 140,
        cell: AmountCell,
        meta: { isNumeric: true },
    },
];

export default columns;
