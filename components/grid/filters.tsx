
// components/grid/filters.ts

/**
 * Reusable filter functions & helpers for TanStack Table.
 */

import type { Row } from "@tanstack/react-table";

/**
 * multiIncludesSome
 * Matches when the cell's string value is contained in the selected array.
 * If the filter array is empty or not provided, the row passes.
 */
export function multiIncludesSome<TData>(
    row: Row<TData>,
    columnId: string,
    filterValue: string[] | undefined
) {
    if (!Array.isArray(filterValue) || filterValue.length === 0) return true;
    const v = String(row.getValue(columnId) ?? "");
    return filterValue.includes(v);
}

/**
 * equalsString
 * Exact string match for single-select filters. Empty filter → pass.
 */
export function equalsString<TData>(
    row: Row<TData>,
    columnId: string,
    filterValue: string | null | undefined
) {
    if (!filterValue) return true;
    const v = String(row.getValue(columnId) ?? "");
    return v === String(filterValue);
}

/**
 * parseYearFromPeriod
 * Supports values like "2026-01" or "2026" (also numbers).
 * Returns a 4-digit year string or null if not parseable.
 */
export function parseYearFromPeriod(
    period: string | number | null | undefined
): string | null {
    if (period == null) return null;
    const s = String(period);
    const y = s.slice(0, 4);
    return /^\d{4}$/.test(y) ? y : null;
}
