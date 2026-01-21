
// components/grid/columns.ts
import type { ColumnDef } from '@tanstack/react-table';
import AmountCell from './AmountCell';

/** Raw JSON shape you use today */
export type BudgetRow = {
    type?: string;           // raw: "expense", "revenue", etc.
    community?: string;
    category?: string;
    subCategory?: string;
    budgetMethod?: string;
    driver?: string;
    driverTag?: string;
    glCode?: string | null;
    period?: string;         // e.g., "2024-12"
    amount?: number | string | null;
    [key: string]: unknown;
};

// Back-compat alias if other files import BudgetLine
export type BudgetLine = BudgetRow;

/** Derive Year from "YYYY-MM" */
export function deriveYear(period?: string): number | null {
    if (!period) return null;
    const y = parseInt(period.slice(0, 4), 10);
    return Number.isFinite(y) ? y : null;
}

/** Map raw "type" → UI label for Budget Type */
export function mapBudgetType(raw?: string): string {
    if (!raw) return '';
    const t = String(raw).toLowerCase();
    if (t === 'expense') return 'Expense';
    if (t === 'revenue') return 'Revenue';
    if (t === 'capex' || t === 'capital' || t === 'capital_expenditure') return 'CapEx';
    return raw.charAt(0).toUpperCase() + raw.slice(1);
}

/**
 * Column definitions:
 *   - ids match the OneNote/toolbar expectations
 *   - 'year' is computed from 'period' and exists for filtering,
 *     but we will hide it by default in the grid (handled in the grid component).
 */
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
        id: 'budgetMethod',
        accessorKey: 'budgetMethod',
        header: 'Budget Method',
        enableResizing: true,
        size: 220,
    },
    {
        id: 'glCode',
        accessorKey: 'glCode',
        header: 'GL Code',
        enableResizing: true,
        size: 120,
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
        id: 'period',
        accessorKey: 'period',
        header: 'Period',
        enableResizing: true,
        size: 110,
        cell: (info) => String(info.getValue() ?? ''),
    },
    // Hidden column for filtering only
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
        filterFn: (row, _columnId, filterValue: unknown) => {
            const y = row.getValue<number | null>('year');
            if (filterValue == null || filterValue === '') return true;
            const fv = typeof filterValue === 'string' ? parseInt(filterValue, 10) : filterValue;
            return y === fv;
        },
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
