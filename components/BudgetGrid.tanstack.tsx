
"use client";

/**
 * BudgetGrid.tanstack.tsx — TanStack Table v8 + React Virtual
 * Toolbar shows labeled controls when empty:
 *   Community | Year | Budget Type | Category
 * Keeps: per-column text filters, inline Amount editing, virtualization,
 * TOTAL (filtered) footer, CSV export.
 */

import React, { useCallback, useMemo, useRef, useState } from "react";
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

type Props = {
    rows: BudgetLine[];
};

// ---------- helpers ----------
const fmtUSD = (n: number) =>
    new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
    }).format(n);

function exportRowsToCsv<T extends object>(
    rows: T[],
    columns: ColumnDef<T, any>[],
    fileName = "budget-grid.csv"
) {
    const colIds = columns
        .map((c) =>
            "accessorKey" in c && c.accessorKey ? String(c.accessorKey)
                : c.id ? String(c.id)
                    : null
        )
        .filter(Boolean) as string[];

    const esc = (s: any) => {
        if (s === null || s === undefined) return "";
        const str = String(s);
        return /[",\n]/.test(str) ? `"${str.replace(/"/g, '""')}"` : str;
    };

    const header = colIds.join(",");
    const body = rows
        .map((r) =>
            colIds.map((k) => (k === "amount" ? (r as any)[k] ?? "" : (r as any)[k] ?? ""))
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

// ---------- editable amount cell ----------
function AmountCell({
    getValue,
    row,
    table,
}: {
    getValue: () => number | null | undefined;
    row: any;
    table: any;
}) {
    const initial = getValue();
    const [editing, setEditing] = useState(false);
    const [draft, setDraft] = useState<number | "">(
        typeof initial === "number" ? initial : initial == null ? "" : Number(initial)
    );

    const commit = () => {
        const next = draft === "" ? null : Number(draft);
        table.options.meta?.updateRow?.(row.index, { amount: next });
        setEditing(false);
    };

    return (
        <div className="text-right">
            {editing ? (
                <input
                    autoFocus
                    type="number"
                    step={1}
                    className="w-full rounded border border-slate-300 px-2 py-1 text-right text-sm"
                    value={draft}
                    onChange={(e) => setDraft(e.target.value === "" ? "" : Number(e.target.value))}
                    onBlur={commit}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") commit();
                        if (e.key === "Escape") setEditing(false);
                    }}
                />
            ) : (
                <button
                    className="w-full text-right tabular-nums"
                    onClick={() => setEditing(true)}
                    title="Click to edit"
                >
                    {typeof initial === "number" ? fmtUSD(initial) : "—"}
                </button>
            )}
        </div>
    );
}

// ---------- headless dropdowns (label when empty) ----------
type Option = { label: string; value: string };

function useClickOutsideClose<T extends HTMLElement>(onClose: () => void) {
    const ref = useRef<T | null>(null);
    React.useEffect(() => {
        const onDocClick = (e: MouseEvent) => {
            if (!ref.current) return;
            if (!ref.current.contains(e.target as Node)) onClose();
        };
        const onEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        document.addEventListener("mousedown", onDocClick);
        document.addEventListener("keydown", onEsc);
        return () => {
            document.removeEventListener("mousedown", onDocClick);
            document.removeEventListener("keydown", onEsc);
        };
    }, [onClose]);
    return ref;
}

function SingleSelect({
    label,
    value,
    options,
    onChange,
    className,
    "aria-label": ariaLabel,
}: {
    label: string;                // ← required so we can display it when empty
    value: string | null;
    options: Option[];
    onChange: (val: string | null) => void;
    className?: string;
    "aria-label"?: string;
}) {
    const [open, setOpen] = useState(false);
    const ref = useClickOutsideClose<HTMLDivElement>(() => setOpen(false));
    const current = options.find((o) => o.value === value);

    // When empty, show the control name (label) instead of "All"
    const displayText = current ? current.label : label;

    return (
        <div className={`relative ${className ?? ""}`} ref={ref}>
            <button
                type="button"
                aria-label={ariaLabel || label}
                onClick={() => setOpen((o) => !o)}
                className="inline-flex min-w-[168px] items-center justify-between rounded-md border border-slate-300 bg-white px-2.5 py-1.5 text-sm text-slate-800 shadow-sm hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
            >
                <span className={`truncate ${current ? "" : "text-slate-500"}`}>
                    {displayText}
                </span>
                <svg viewBox="0 0 20 20" aria-hidden="true" className="ml-2 h-4 w-4 text-slate-500">
                    <path d="M5.25 7.5l4.5 4.5 4.5-4.5" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" />
                </svg>
            </button>
            {open && (
                <div
                    role="listbox"
                    className="absolute z-40 mt-1 max-h-64 w-[min(280px,calc(100vw-2rem))] overflow-auto rounded-md border border-slate-200 bg-white p-1 shadow-lg"
                >
                    <button
                        className="w-full rounded px-2 py-1 text-left text-sm text-slate-700 hover:bg-slate-100"
                        onClick={() => { onChange(null); setOpen(false); }}
                    >
                        {/* Show 'All' in menu, but empty state shows control name */}
                        All
                    </button>
                    <div className="my-1 h-px bg-slate-100" />
                    {options.map((opt) => (
                        <button
                            key={opt.value}
                            role="option"
                            aria-selected={opt.value === value}
                            className={`w-full rounded px-2 py-1 text-left text-sm hover:bg-slate-100 ${opt.value === value ? "bg-teal-50 text-teal-700" : "text-slate-700"}`}
                            onClick={() => { onChange(opt.value); setOpen(false); }}
                        >
                            {opt.label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}

function MultiSelect({
    label,
    values,
    options,
    onChange,
    searchable = true,
    className,
    "aria-label": ariaLabel,
}: {
    label: string;               // ← required for empty-label behavior
    values: string[];
    options: Option[];
    onChange: (vals: string[]) => void;
    searchable?: boolean;
    className?: string;
    "aria-label"?: string;
}) {
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState("");
    const ref = useClickOutsideClose<HTMLDivElement>(() => setOpen(false));

    // When empty, show the control name (label). Otherwise show chips/count.
    const display =
        values.length === 0
            ? label
            : values.length <= 2
                ? options
                    .filter((o) => values.includes(o.value))
                    .map((o) => o.label)
                    .join(", ")
                : `${values.length} selected`;

    const filtered = useMemo(() => {
        if (!searchable || !query.trim()) return options;
        const q = query.toLowerCase();
        return options.filter((o) => o.label.toLowerCase().includes(q));
    }, [options, searchable, query]);

    const toggle = (val: string) => {
        if (values.includes(val)) onChange(values.filter((v) => v !== val));
        else onChange([...values, val]);
    };

    const selectAll = () => onChange(options.map((o) => o.value));
    const clearAll = () => onChange([]);

    return (
        <div className={`relative ${className ?? ""}`} ref={ref}>
            <button
                type="button"
                aria-label={ariaLabel || label}
                onClick={() => setOpen((o) => !o)}
                className="inline-flex min-w-[220px] items-center justify-between rounded-md border border-slate-300 bg-white px-2.5 py-1.5 text-sm text-slate-800 shadow-sm hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
            >
                <span className={`truncate ${values.length === 0 ? "text-slate-500" : ""}`}>{display}</span>
                <svg viewBox="0 0 20 20" aria-hidden="true" className="ml-2 h-4 w-4 text-slate-500">
                    <path d="M5.25 7.5l4.5 4.5 4.5-4.5" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" />
                </svg>
            </button>
            {open && (
                <div
                    role="listbox"
                    className="absolute z-40 mt-1 max-h-72 w-[min(420px,calc(100vw-2rem))] overflow-auto rounded-md border border-slate-200 bg-white p-2 shadow-lg"
                >
                    {searchable && (
                        <div className="mb-2">
                            <input
                                autoFocus
                                type="text"
                                placeholder="Search…"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                className="w-full rounded border border-slate-300 px-2 py-1 text-sm"
                            />
                        </div>
                    )}
                    <div className="flex items-center justify-between px-1 pb-2">
                        <div className="text-xs text-slate-500">{options.length} options</div>
                        <div className="space-x-2">
                            <button className="rounded bg-slate-100 px-2 py-0.5 text-xs hover:bg-slate-200" onClick={selectAll}>
                                Select all
                            </button>
                            <button className="rounded bg-slate-100 px-2 py-0.5 text-xs hover:bg-slate-200" onClick={clearAll}>
                                Clear
                            </button>
                        </div>
                    </div>
                    <ul className="space-y-0.5">
                        {filtered.map((opt) => {
                            const checked = values.includes(opt.value);
                            return (
                                <li key={opt.value}>
                                    <label className="flex cursor-pointer items-center gap-2 rounded px-2 py-1 text-sm hover:bg-slate-50">
                                        <input
                                            type="checkbox"
                                            className="h-3.5 w-3.5 accent-teal-600"
                                            checked={checked}
                                            onChange={() => toggle(opt.value)}
                                        />
                                        <span className={checked ? "text-teal-700" : "text-slate-700"}>{opt.label}</span>
                                    </label>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            )}
        </div>
    );
}

// ---------- main ----------
export default function BudgetGrid({ rows }: Props) {
    // local data
    const [data, setData] = useState<BudgetLine[]>(() => rows ?? []);
    const [sorting, setSorting] = useState<SortingState>([]);
    const [filters, setFilters] = useState<ColumnFiltersState>([]);
    const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
    const [columnVisibility, setColumnVisibility] = useState<Record<string, boolean>>({});
    const [columnPinning, setColumnPinning] = useState<ColumnPinningState>({ left: [], right: [] });
    const [grouping, setGrouping] = useState<GroupingState>([]);

    // ---- columns ----
    const columns = useMemo<ColumnDef<BudgetLine, any>[]>(() => {
        // filter fns for array-typed filters
        const multiIncludesSome = (row: any, columnId: string, filterValue: string[]) => {
            if (!Array.isArray(filterValue) || filterValue.length === 0) return true;
            const v = String(row.getValue(columnId) ?? "");
            return filterValue.includes(v);
        };
        const equalsString = (row: any, columnId: string, filterValue: string | null) => {
            if (!filterValue) return true;
            const v = String(row.getValue(columnId) ?? "");
            return v === String(filterValue);
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
            // hidden helper for year filtering
            {
                id: "__year",
                accessorFn: (row) => {
                    const p = row.period;
                    const s = p == null ? "" : String(p);
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

    // ---------- toolbar options ----------
    const allCommunities = useMemo<Option[]>(() => {
        const set = new Set<string>();
        data.forEach((r) => r.community && set.add(r.community));
        return Array.from(set).sort((a, b) => a.localeCompare(b)).map((v) => ({ value: v, label: v }));
    }, [data]);

    const yearOptions: Option[] = useMemo(
        () => ["2024", "2025", "2026"].map((y) => ({ value: y, label: y })),
        []
    );

    const typeOptions: Option[] = useMemo(
        () => ["expense", "revenue", "home office"].map((t) => ({ value: t, label: t })),
        []
    );

    const getFilter = (id: string) => filters.find((f) => f.id === id)?.value as any;

    const selectedCommunities = (getFilter("community") as string[]) ?? [];
    const selectedYear = (getFilter("__year") as string | null) ?? null;
    const selectedType = (getFilter("type") as string | null) ?? null;
    const selectedCategories = (getFilter("category") as string[]) ?? [];

    // Category options reflect Community/Year/Type selections
    const categoryOptions: Option[] = useMemo(() => {
        const rowsForOptions = table.getPreFilteredRowModel().rows.filter((r) => {
            const commPass =
                selectedCommunities.length === 0 || selectedCommunities.includes(String(r.getValue("community") ?? ""));
            const typePass = !selectedType || String(r.getValue("type") ?? "") === selectedType;
            const s = String(r.original.period ?? "");
            const y = /^\d{4}/.test(s) ? s.slice(0, 4) : "";
            const yearPass = !selectedYear || y === selectedYear;
            return commPass && typePass && yearPass;
        });
        const set = new Set<string>();
        rowsForOptions.forEach((rr) => {
            const v = String(rr.getValue("category") ?? "");
            if (v) set.add(v);
        });
        return Array.from(set).sort((a, b) => a.localeCompare(b)).map((v) => ({ value: v, label: v }));
    }, [table, selectedCommunities, selectedType, selectedYear]);

    const setFilter = useCallback((id: string, value: any) => {
        setFilters((old) => {
            const others = old.filter((f) => f.id !== id);
            if (value == null || (Array.isArray(value) && value.length === 0)) return others;
            return [...others, { id, value }];
        });
        setRowSelection({});
    }, []);

    const clearAllFilters = () => setFilters([]);

    const exportCsv = () => {
        const rows = table.getRowModel().rows.map((r) => r.original);
        exportRowsToCsv(rows, columns);
    };

    // ---------- virtualization ----------
    const parentRef = useRef<HTMLDivElement>(null);
    const virtualizer = useVirtualizer({
        count: table.getRowModel().rows.length,
        getScrollElement: () => parentRef.current,
        estimateSize: () => 40,
        overscan: 8,
    });
    const virtualItems = virtualizer.getVirtualItems();

    // TOTAL (filtered)
    const totalFiltered = useMemo(() => {
        let sum = 0;
        for (const r of table.getFilteredRowModel().rows) {
            const v = r.original.amount;
            if (typeof v === "number") sum += v;
        }
        return sum;
    }, [table, data, filters, sorting, grouping]);

    const anyFilterActive = filters.length > 0;

    return (
        <section aria-label="Budget grid" className="space-y-3">
            {/* Toolbar */}
            <div className="flex flex-wrap items-center gap-2 rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
                <MultiSelect
                    aria-label="Filter by community"
                    label="Community"
                    values={selectedCommunities}
                    options={allCommunities}
                    onChange={(vals) => setFilter("community", vals)}
                    className="mr-1"
                />
                <SingleSelect
                    aria-label="Filter by year"
                    label="Year"
                    value={selectedYear}
                    options={yearOptions}
                    onChange={(val) => setFilter("__year", val)}
                    className="mr-1"
                />
                <SingleSelect
                    aria-label="Filter by budget type"
                    label="Budget Type"
                    value={selectedType}
                    options={typeOptions}
                    onChange={(val) => setFilter("type", val)}
                    className="mr-1"
                />
                <MultiSelect
                    aria-label="Filter by category"
                    label="Category"
                    values={selectedCategories}
                    options={categoryOptions}
                    onChange={(vals) => setFilter("category", vals)}
                    className="mr-1"
                />
                <div className="grow" />
                {anyFilterActive && (
                    <span className="rounded-full bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600">
                        {filters.length} filter{filters.length > 1 ? "s" : ""} active
                    </span>
                )}
                <button
                    type="button"
                    onClick={clearAllFilters}
                    className="rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
                >
                    Clear Filters
                </button>
                <button
                    type="button"
                    onClick={exportCsv}
                    className="rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
                >
                    Export CSV
                </button>
            </div>

            {/* Column headers + text filter row */}
            <div className="rounded-t-lg border-x border-t border-slate-200 bg-slate-50">
                <div
                    className="grid grid-cols-[repeat(var(--cols),minmax(140px,1fr))] px-2 py-2 text-xs font-semibold text-slate-600"
                    style={{
                        ["--cols" as any]: table.getAllColumns().filter((c) => c.getIsVisible() && !(c.columnDef as any)?.meta?.hiddenHelper).length,
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

            {/* Table (virtualized rows) */}
            <div
                ref={parentRef}
                className="border-x border-b border-slate-200"
                style={{ height: 720, overflow: "auto", position: "relative" }}
                aria-label="Budget TanStack Grid"
            >
                <div style={{ height: useVirtualizer({ count: table.getRowModel().rows.length, getScrollElement: () => parentRef.current, estimateSize: () => 40, overscan: 8 }).getTotalSize(), position: "relative" }}>
                    {useVirtualizer({ count: table.getRowModel().rows.length, getScrollElement: () => parentRef.current, estimateSize: () => 40, overscan: 8 }).getVirtualItems().map((vi) => {
                        const row = table.getRowModel().rows[vi.index];
                        const visibleCols = row.getVisibleCells().filter((c) => !(c.column.columnDef as any)?.meta?.hiddenHelper);
                        return (
                            <div
                                key={row.id}
                                className={`grid grid-cols-[repeat(var(--cols),minmax(140px,1fr))] border-b border-slate-100 px-2 text-sm ${row.getIsSelected() ? "bg-teal-50" : "bg-white"} hover:bg-slate-50`}
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
