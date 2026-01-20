
"use client";

import React, { useMemo, useState } from "react";
import {
    ColumnDef,
    RowSelectionState,
    SortingState,
    ColumnFiltersState,
    getCoreRowModel,
    getFilteredRowModel,
    getSortedRowModel,
    useReactTable,
    flexRender,
    ColumnPinningState,
    GroupingState,
} from "@tanstack/react-table";

import ToolbarFilters from "./grid/ToolbarFilters";
import AmountCell from "./grid/AmountCell";
import VirtualRows from "./grid/VirtualRows";
import { multiIncludesSome, equalsString, parseYearFromPeriod } from "./grid/filters";
import { exportRowsToCsv } from "./grid/export";

// ---------- types ----------
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

type Props = { rows: BudgetLine[] };

// ---------- utils ----------
const fmtUSD = (n: number) =>
    new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
    }).format(n);

// ---------- main ----------
export default function BudgetGrid({ rows }: Props) {
    const [data, setData] = useState<BudgetLine[]>(() => rows ?? []);
    const [sorting, setSorting] = useState<SortingState>([]);
    const [filters, setFilters] = useState<ColumnFiltersState>([]);
    const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
    const [columnVisibility, setColumnVisibility] = useState<Record<string, boolean>>({});
    const [columnPinning, setColumnPinning] = useState<ColumnPinningState>({ left: [], right: [] });
    const [grouping, setGrouping] = useState<GroupingState>([]);

    const columns = useMemo<ColumnDef<BudgetLine, any>[]>(() => {
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
            { id: "driver", header: "Driver", accessorFn: (row) => row.driver ?? row.driverTag ?? null },
            { id: "amount", accessorKey: "amount", header: "Amount", cell: AmountCell, size: 140 },

            {
                id: "__year",
                accessorFn: (row) => parseYearFromPeriod(row.period),
                header: "Year (hidden)",
                enableHiding: true,
                meta: { hiddenHelper: true },
                filterFn: (row, id, val: string | null) =>
                    !val || String(row.getValue(id) ?? "") === String(val),
            },
        ];
    }, []);

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),

        state: {
            sorting,
            columnFilters: filters,
            rowSelection,
            columnVisibility,
            columnPinning,
            grouping,
        },

        onSortingChange: setSorting,
        onColumnFiltersChange: setFilters,
        onRowSelectionChange: setRowSelection,
        onColumnVisibilityChange: setColumnVisibility,
        onColumnPinningChange: setColumnPinning,
        onGroupingChange: setGrouping,

        enableRowSelection: true,

        meta: {
            updateRow: (rowIndex: number, partial: Partial<BudgetLine>) => {
                setData((old) => {
                    const next = old.slice();
                    next[rowIndex] = { ...next[rowIndex], ...partial };
                    return next;
                });
            },
        },

        getRowId: (row) =>
            `${row.community ?? ""}${row.type ?? ""}${row.category ?? ""}${row.subCategory ?? ""}${row.period ?? ""}`,
    });

    const clearAllFilters = () => setFilters([]);

    const exportCsv = () => {
        const out = table.getRowModel().rows.map((r) => r.original);
        exportRowsToCsv(out, columns);
    };

    const totalFiltered = useMemo(() => {
        let sum = 0;
        for (const r of table.getFilteredRowModel().rows) {
            const v = r.original.amount;
            if (typeof v === "number") sum += v;
        }
        return sum;
    }, [table, data, filters, sorting, grouping]);

    return (
        <section aria-label="Budget grid" className="space-y-3">
            {/* Toolbar */}
            <ToolbarFilters
                table={table}
                filters={filters}
                setFilters={setFilters}
                onClear={clearAllFilters}
                onExport={exportCsv}
            />

            {/* Column headers */}
            <div className="rounded-t-lg border-x border-t border-slate-200 bg-slate-50">
                <div
                    className="grid grid-cols-[repeat(var(--cols),minmax(140px,1fr))] px-2 py-2 text-xs font-semibold text-slate-600"
                    style={{
                        ["--cols" as any]: table
                            .getAllColumns()
                            .filter(
                                (col) =>
                                    col.getIsVisible() &&
                                    !(col.columnDef as any)?.meta?.hiddenHelper
                            ).length,
                    }}
                >
                    {table.getFlatHeaders().map((header) => {
                        if ((header.column.columnDef as any)?.meta?.hiddenHelper) return null;

                        return (
                            <div key={header.id} className="pr-2">
                                <button
                                    className="inline-flex items-center gap-1 hover:text-slate-900"
                                    onClick={header.column.getToggleSortingHandler()}
                                    title="Click to sort"
                                >
                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                    {{
                                        asc: " ↑",
                                        desc: " ↓",
                                    }[header.column.getIsSorted() as string] ?? null}
                                </button>

                                {header.column.getCanFilter() && (
                                    <div className="mt-1">
                                        <input
                                            className="w-full rounded border border-slate-300 px-1.5 py-1 text-xs"
                                            placeholder={
                                                (header.column.columnDef as any).meta
                                                    ?.filterPlaceholder ?? "filter…"
                                            }
                                            value={(header.column.getFilterValue() as string) ?? ""}
                                            onChange={(e) =>
                                                header.column.setFilterValue(e.target.value)
                                            }
                                        />
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Body */}
            <VirtualRows table={table} height={720} />

            {/* Footer total */}
            <div className="rounded-b-lg border border-teal-200 bg-teal-50 px-3 py-2 text-sm font-semibold text-teal-800">
                TOTAL (filtered): <span className="tabular-nums">{fmtUSD(totalFiltered)}</span>
            </div>
        </section>
    );
}
