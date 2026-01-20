
// components/grid/export.ts

/**
 * Lightweight export utilities. CSV works without extra deps.
 * XLSX tries to dynamically import 'xlsx' if available.
 */

import type { ColumnDef } from "@tanstack/react-table";

function escapeCsv(value: any) {
    if (value === null || value === undefined) return "";
    const str = String(value);
    return /[",\n]/.test(str) ? `"${str.replace(/"/g, '""')}"` : str;
}

/**
 * exportRowsToCsv
 * Exports the provided row objects using the table's column order/ids.
 */
export function exportRowsToCsv<T extends object>(
    rows: T[],
    columns: ColumnDef<T, any>[],
    fileName = "budget-grid.csv"
) {
    const colIds = columns
        .map((c) =>
            "accessorKey" in c && c.accessorKey
                ? String(c.accessorKey)
                : c.id
                    ? String(c.id)
                    : null
        )
        .filter(Boolean) as string[];

    const header = colIds.join(",");
    const body = rows
        .map((r) => colIds.map((k) => escapeCsv((r as any)[k] ?? "")).join(","))
        .join("\n");

    const csv = `${header}\n${body}`;
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(a.href);
}

/**
 * exportRowsToXlsx (optional)
 * If 'xlsx' is not installed, logs a warning and returns.
 * To enable: `npm i xlsx` then call this function from your UI.
 */
export async function exportRowsToXlsx<T extends object>(
    rows: T[],
    columns: ColumnDef<T, any>[],
    fileName = "budget-grid.xlsx"
) {
    try {
        const XLSX = await import("xlsx"); // requires 'xlsx' to be installed
        const colIds = columns
            .map((c) =>
                "accessorKey" in c && c.accessorKey
                    ? String(c.accessorKey)
                    : c.id
                        ? String(c.id)
                        : null
            )
            .filter(Boolean) as string[];

        const data = [
            colIds, // header row
            ...rows.map((r) => colIds.map((k) => (r as any)[k] ?? "")),
        ];

        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.aoa_to_sheet(data);
        XLSX.utils.book_append_sheet(wb, ws, "Budget");
        XLSX.writeFile(wb, fileName);
    } catch (err) {
        // Non-fatal if xlsx isn't present; CSV is still available.
        // eslint-disable-next-line no-console
        console.warn(
            "[exportRowsToXlsx] 'xlsx' package not found. Install it with `npm i xlsx` to enable XLSX export."
        );
    }
}

