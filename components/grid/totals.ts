
// components/grid/totals.ts
import type { Table } from "@tanstack/react-table";

/**
 * sumColumnFiltered
 * Sums a numeric column using the table's *filtered* row model.
 * Usage:
 *   const total = sumColumnFiltered(table, r => r.amount);
 */
export function sumColumnFiltered<T>(
    table: Table<T>,
    accessor: (row: T) => number | null | undefined
): number {
    let total = 0;
    for (const row of table.getFilteredRowModel().rows) {
        const v = accessor(row.original);
        if (typeof v === "number") total += v;
    }
    return total;
}

/**
 * Optional: shared currency formatter.
 * If you prefer centralizing formatting, you can import this in the grid.
 */
export function fmtUSD(n: number): string {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
    }).format(n);
}
