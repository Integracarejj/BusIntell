
// components/grid/totals.ts
import type { Table } from '@tanstack/react-table';

export type NumericKey = string;

/**
 * Sums numeric fields across a collection of row "originals".
 * Non-numeric / null / undefined values are ignored.
 */
export function buildTotals<T extends Record<string, unknown>>(
    rows: T[],
    numericKeys: readonly NumericKey[]
): Record<NumericKey, number> {
    const totals: Record<NumericKey, number> = Object.fromEntries(
        numericKeys.map(k => [k, 0])
    ) as Record<NumericKey, number>;

    for (const row of rows) {
        for (const k of numericKeys) {
            const v = row[k];
            const n = typeof v === 'string' ? Number(v) : (typeof v === 'number' ? v : NaN);
            if (!Number.isNaN(n)) {
                totals[k] += n;
            }
        }
    }
    return totals;
}

/**
 * Convenience helper: sums from the table's *filtered* row model.
 * Usage: buildTotalsFromTable(table, ['amount'])
 */
export function buildTotalsFromTable<T extends Record<string, unknown>>(
    table: Table<T>,
    numericKeys: readonly NumericKey[]
): Record<NumericKey, number> {
    const rows = table.getFilteredRowModel().rows.map(r => r.original);
    return buildTotals(rows as T[], numericKeys);
}
