
"use client";

import React, { useMemo, useState } from "react";
import {
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
import VirtualRows from "./grid/VirtualRows";
import { createBudgetColumns, type BudgetLine } from "./grid/columns";
import { sumColumnFiltered, fmtUSD } from "./grid/totals";
import { exportRowsToCsv } from "./grid/export";

type Props = { rows: BudgetLine[] };

export default function BudgetGrid({ rows }: Props) {
    // local states
    const [data, setData] = useState<BudgetLine[]>(() => rows ?? []);
    const [sorting, setSorting] = useState<SortingState>([]);
    const [filters, setFilters] = useState<ColumnFiltersState>([]);
    const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
    const [columnVisibility, setColumnVisibility] = useState<Record<string, boolean>>({});
    const [columnPinning, setColumnPinning] = useState<ColumnPinningState>({ left: [], right: [] });
    const [grouping, setGrouping] = useState<GroupingState>([]);

    // columns (from factory)
    const columns = useMemo(() => createBudgetColumns(), []);

    // table
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
            `${row.community ?? ""}${row.type ?? ""}${row.category ?? ""}${row.subCategory ?? ""}${row.period ?? ""
            }`,
    });

    // toolbar actions
    const clearAllFilters = () => setFilters([]);
    const exportCsv = () => {
        const out = table.getRowModel().rows.map((r) => r.original);
        exportRowsToCsv(out, columns);
    };

    // totals (filtered)
    const totalFiltered = useMemo(
        () => sumColumnFiltered(table, (r) => r.amount ?? null),
        [table, data, filters, sorting, grouping]
    );

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

            {/* Column headers + text filter row */}
            <div className="rounded-t-lg border-x border-t border-slate-200 bg-slate-50">
                <div
                    className="grid grid-cols-[repeat(var(--cols),minmax(140px,1fr))] px-2 py-2 text-xs font-semibold text-slate-600"
                    style={{
                        ["--cols" as any]: table
                            .getAllColumns()
                            .filter((col) => col.getIsVisible() && !(col.columnDef as any)?.meta?.hiddenHelper)
                            .length,
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
                                                (header.column.columnDef as any).meta?.filterPlaceholder ?? "filter…"
                                            }
                                            value={(header.column.getFilterValue() as string) ?? ""}
                                            onChange={(e) => header.column.setFilterValue(e.target.value)}
                                        />
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Virtualized body */}
            <VirtualRows table={table} height={720} />

            {/* Pinned TOTAL (filtered) */}
            <div className="rounded-b-lg border border-teal-200 bg-teal-50 px-3 py-2 text-sm font-semibold text-teal-800">
                TOTAL (filtered): <span className="tabular-nums">{fmtUSD(totalFiltered)}</span>
            </div>
        </section>
    );
}

/** Re-export the type so existing imports keep working */
export type { BudgetLine } from "./grid/columns";
