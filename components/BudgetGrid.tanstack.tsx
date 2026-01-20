
"use client";

import React, { useMemo, useRef, useState } from "react";
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
import { useVirtualizer } from "@tanstack/react-virtual";
import ToolbarFilters from "./grid/ToolbarFilters";
import AmountCell from "./grid/AmountCell";

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
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);

function exportRowsToCsv<T extends object>(rows: T[], columns: ColumnDef<T, any>[], fileName = "budget-grid.csv") {
    const colIds = columns
        .map((c) =>
            "accessorKey" in c && c.accessorKey ? String(c.accessorKey) : c.id ? String(c.id) : null
        )
        .filter(Boolean) as string[];

    const esc = (s: any) => {
        if (s == null) return "";
        const str = String(s);
        return /[",\n]/.test(str) ? `"${str.replace(/"/g, '""')}"` : str;
    };

    const header = colIds.join(",");
    const body = rows
        .map((r) =>
            colIds
                .map((k) => (k === "amount" ? (r as any)[k] ?? "" : (r as any)[k] ?? ""))
                .map(esc)
                .join(",")
        )
        .join("\n");

    const csv = `${header}\n${body}`;
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(a.href);
}

// ---------- main ----------
export default function BudgetGrid({ rows }: Props) {
    // local states
    const [data, setData] = useState<BudgetLine[]>(() => rows ?? []);
    const [sorting, setSorting] = useState<SortingState>([]);
    const [filters, setFilters] = useState<ColumnFiltersState>([]);
    const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
    const [columnVisibility, setColumnVisibility] = useState<Record<string, boolean>>({});
    const [columnPinning, setColumnPinning] = useState<ColumnPinningState>({ left: [], right: [] });
    const [grouping, setGrouping] = useState<GroupingState>([]);

    // columns
    const columns = useMemo<ColumnDef<BudgetLine, any>[]>(() => {
        const multiIncludesSome = (row: any, columnId: string, filterValue: string[]) => {
            if (!Array.isArray(filterValue) || filterValue.length === 0) return true;
            const v = String(row.getValue(columnId) ?? "");
            return filterValue.includes(v);
        };
        const equalsString = (row: any, columnId: string, filterValue: string | null) => {
            if (!filterValue) return true;
            return String(row.getValue(columnId) ?? "") === String(filterValue);
        };

        return [
            { id: "community", accessorKey: "community", header: "Community", meta: { filterPlaceholder: "filter…" }, filterFn: multiIncludesSome, enablePinning: true },
            { id: "type", accessorKey: "type", header: "Type", size: 130, filterFn: equalsString },
            { id: "category", accessorKey: "category", header: "Category", filterFn: multiIncludesSome },
            { id: "subCategory", accessorKey: "subCategory", header: "Subcategory" },
            { id: "period", accessorKey: "period", header: "Period", size: 120 },
            { id: "glCode", accessorKey: "glCode", header: "GL Code", size: 120 },
            { id: "budgetMethod", accessorKey: "budgetMethod", header: "Method", size: 180 },
            { id: "driver", header: "Driver", accessorFn: (row) => row.driver ?? row.driverTag ?? null },
            { id: "amount", accessorKey: "amount", header: "Amount", cell: AmountCell, size: 140 },

            // Hidden helper column for Year filtering derived from period ("YYYY" or "YYYY-MM")
            {
                id: "__year",
                accessorFn: (row) => {
                    const s = String(row.period ?? "");
                    const y = s.slice(0, 4);
                    return /^\d{4}$/.test(y) ? y : null;
                },
                header: "Year (hidden)",
                enableHiding: true,
                meta: { hiddenHelper: true },
                filterFn: (r, id, val: string | null) => !val || String(r.getValue(id) ?? "") === String(val),
            },
        ];
    }, []);

    // table
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        state: { sorting, columnFilters: filters, rowSelection, columnVisibility, columnPinning, grouping },
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

    // toolbar actions
    const clearAllFilters = () => setFilters([]);
    const exportCsv = () => {
        const out = table.getRowModel().rows.map((r) => r.original);
        exportRowsToCsv(out, columns);
    };

    // virtualization
    const parentRef = useRef<HTMLDivElement>(null);
    const virtualizer = useVirtualizer({
        count: table.getRowModel().rows.length,
        getScrollElement: () => parentRef.current,
        estimateSize: () => 40,
        overscan: 8,
    });
    const virtualItems = virtualizer.getVirtualItems();

    // totals
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
            {/* Toolbar (sibling component) */}
            <ToolbarFilters
                table={table}
                filters={filters}
                setFilters={setFilters}
                onClear={clearAllFilters}
                onExport={exportCsv}
            />

            {/* Column headers + simple text filters */}
            <div className="rounded-t-lg border-x border-t border-slate-200 bg-slate-50">
                <div
                    className="grid grid-cols-[repeat(var(--cols),minmax(140px,1fr))] px-2 py-2 text-xs font-semibold text-slate-600"
                    style={{
                        ["--cols" as any]: table
                            .getAllColumns()
                            .filter((c) => c.getIsVisible() && !(c.columnDef as any)?.meta?.hiddenHelper).length,
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
                                            placeholder={(header.column.columnDef as any).meta?.filterPlaceholder ?? "filter…"}
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

            {/* Body (virtualized rows) */}
            <div
                ref={parentRef}
                className="border-x border-b border-slate-200"
                style={{ height: 720, overflow: "auto", position: "relative" }}
                aria-label="Budget TanStack Grid"
            >
                <div style={{ height: virtualizer.getTotalSize(), position: "relative" }}>
                    {virtualItems.map((vi) => {
                        const row = table.getRowModel().rows[vi.index];
                        const visibleCols = row.getVisibleCells().filter((c) => !(c.column.columnDef as any)?.meta?.hiddenHelper);
                        return (
                            <div
                                key={row.id}
                                className={`grid grid-cols-[repeat(var(--cols),minmax(140px,1fr))] border-b border-slate-100 px-2 text-sm ${row.getIsSelected() ? "bg-teal-50" : "bg-white"
                                    } hover:bg-slate-50`}
                                style={{
                                    transform: `translateY(${vi.start}px)`,
                                    ["--cols" as any]: visibleCols.length,
                                    height: vi.size,
                                    alignItems: "center",
                                }}
                                onClick={() => row.toggleSelected()}
                            >
                                {visibleCols.map((cell) => (
                                    <div key={cell.id} className="pr-2">
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </div>
                                ))}
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Pinned TOTAL (filtered) */}
            <div className="rounded-b-lg border border-teal-200 bg-teal-50 px-3 py-2 text-sm font-semibold text-teal-800">
                TOTAL (filtered): <span className="tabular-nums">{fmtUSD(totalFiltered)}</span>
            </div>
        </section>
    );
}
