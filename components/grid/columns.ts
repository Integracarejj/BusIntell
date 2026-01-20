
// components/grid/columns.ts
import React from "react";
import type { ColumnDef, CellContext } from "@tanstack/react-table";
import AmountCell from "./AmountCell";
import { multiIncludesSome, equalsString, parseYearFromPeriod } from "./filters";

/** Shared row type */
export type BudgetLine = {
    type: "revenue" | "expense" | "home office" | string;
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

export function createBudgetColumns(): ColumnDef<BudgetLine, unknown>[] {
    return [
        {
            id: "community",
            accessorKey: "community",
            header: "Community",
            meta: { filterPlaceholder: "filter…" },
            filterFn: multiIncludesSome,
            enablePinning: true,
        },
        {
            id: "type",
            accessorKey: "type",
            header: "Type",
            size: 130,
            filterFn: equalsString,
        },
        {
            id: "category",
            accessorKey: "category",
            header: "Category",
            filterFn: multiIncludesSome,
        },
        { id: "subCategory", accessorKey: "subCategory", header: "Subcategory" },
        { id: "period", accessorKey: "period", header: "Period", size: 120 },
        { id: "glCode", accessorKey: "glCode", header: "GL Code", size: 120 },
        { id: "budgetMethod", accessorKey: "budgetMethod", header: "Method", size: 180 },
        {
            id: "driver",
            header: "Driver",
            accessorFn: (row) => row.driver ?? row.driverTag ?? null,
        },

        // Amount column: wrap AmountCell without JSX (this file is .ts)
        {
            id: "amount",
            accessorKey: "amount",
            header: "Amount",
            size: 140,
            cell: (ctx: CellContext<BudgetLine, unknown>) =>
                React.createElement(AmountCell, {
                    // Narrow unknown -> number | null | undefined
                    getValue: () => ctx.getValue() as number | null | undefined,
                    row: ctx.row,
                    table: ctx.table,
                }),
        },

        // Hidden helper column for Year filtering (derived from period)
        {
            id: "__year",
            accessorFn: (row) => parseYearFromPeriod(row.period),
            header: "Year (hidden)",
            enableHiding: true,
            meta: { hiddenHelper: true },
            filterFn: (r, id, val: string | null) =>
                !val || String(r.getValue(id) ?? "") === String(val),
        },
    ];
}
``

