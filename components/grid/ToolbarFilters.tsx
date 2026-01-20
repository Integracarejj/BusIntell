
"use client";

import * as React from "react";
import type { ColumnFiltersState, Table } from "@tanstack/react-table";

type Option = { label: string; value: string };

type ToolbarFiltersProps<TData extends object> = {
    /** TanStack Table instance so we can derive options contextually (esp. Category) */
    table: Table<TData>;
    /** Current columnFilters state from the grid */
    filters: ColumnFiltersState;
    /** Setter from the grid */
    setFilters: React.Dispatch<React.SetStateAction<ColumnFiltersState>>;
    /** UI actions provided by the grid */
    onClear: () => void;
    onExport: () => void;
    /** Optional override lists */
    yearOptions?: string[];             // default: ["2024","2025","2026"]
    typeOptions?: string[];             // default: ["expense","revenue","home office"]
    /** Field accessors (defaults match your dataset) */
    communityColumnId?: string;         // default: "community"
    typeColumnId?: string;              // default: "type"
    categoryColumnId?: string;          // default: "category"
    yearHelperColumnId?: string;        // default: "__year"
};

export default function ToolbarFilters<TData extends object>({
    table,
    filters,
    setFilters,
    onClear,
    onExport,
    yearOptions = ["2024", "2025", "2026"],
    typeOptions = ["expense", "revenue", "home office"],
    communityColumnId = "community",
    typeColumnId = "type",
    categoryColumnId = "category",
    yearHelperColumnId = "__year",
}: ToolbarFiltersProps<TData>) {
    // ----- helpers -----
    const getFilter = React.useCallback(
        (id: string) => filters.find((f) => f.id === id)?.value as any,
        [filters]
    );

    const setFilter = React.useCallback(
        (id: string, value: any) => {
            setFilters((old) => {
                const others = old.filter((f) => f.id !== id);
                if (value == null || (Array.isArray(value) && value.length === 0)) return others;
                return [...others, { id, value }];
            });
            // clear row selection when filters change
            table.resetRowSelection();
        },
        [setFilters, table]
    );

    // ----- current selections -----
    const selectedCommunities: string[] = (getFilter(communityColumnId) as string[]) ?? [];
    const selectedYear: string | null = (getFilter(yearHelperColumnId) as string | null) ?? null;
    const selectedType: string | null = (getFilter(typeColumnId) as string | null) ?? null;
    const selectedCategories: string[] = (getFilter(categoryColumnId) as string[]) ?? [];

    // ----- option derivation -----
    const communityOptions: Option[] = React.useMemo(() => {
        const set = new Set<string>();
        table.getPreFilteredRowModel().rows.forEach((r) => {
            const v = String(r.getValue(communityColumnId) ?? "");
            if (v) set.add(v);
        });
        return Array.from(set).sort((a, b) => a.localeCompare(b)).map((v) => ({ value: v, label: v }));
    }, [table, communityColumnId]);

    const yearOpts: Option[] = React.useMemo(
        () => yearOptions.map((y) => ({ value: y, label: y })),
        [yearOptions]
    );

    const typeOpts: Option[] = React.useMemo(
        () => typeOptions.map((t) => ({ value: t, label: t })),
        [typeOptions]
    );

    // Category options reflect current (Community, Year, Type)
    const categoryOptions: Option[] = React.useMemo(() => {
        const rows = table.getPreFilteredRowModel().rows.filter((r) => {
            const commPass =
                selectedCommunities.length === 0 ||
                selectedCommunities.includes(String(r.getValue(communityColumnId) ?? ""));
            const typePass = !selectedType || String(r.getValue(typeColumnId) ?? "") === selectedType;
            const yr = String(r.getValue(yearHelperColumnId) ?? "");
            const yearPass = !selectedYear || yr === selectedYear;
            return commPass && typePass && yearPass;
        });
        const set = new Set<string>();
        rows.forEach((rr) => {
            const v = String(rr.getValue(categoryColumnId) ?? "");
            if (v) set.add(v);
        });
        return Array.from(set).sort((a, b) => a.localeCompare(b)).map((v) => ({ value: v, label: v }));
    }, [
        table,
        communityColumnId,
        typeColumnId,
        categoryColumnId,
        yearHelperColumnId,
        selectedCommunities,
        selectedType,
        selectedYear,
    ]);

    const anyFilterActive = filters.length > 0;

    // ----- UI -----
    return (
        <div className="flex flex-wrap items-center gap-2 rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
            {/* Community (multi) */}
            <MultiSelect
                aria-label="Filter by community"
                label="Community"
                values={selectedCommunities}
                options={communityOptions}
                onChange={(vals) => setFilter(communityColumnId, vals)}
                className="mr-1"
            />

            {/* Year (single) */}
            <SingleSelect
                aria-label="Filter by year"
                label="Year"
                value={selectedYear}
                options={yearOpts}
                onChange={(val) => setFilter(yearHelperColumnId, val)}
                className="mr-1"
            />

            {/* Budget Type (single) */}
            <SingleSelect
                aria-label="Filter by budget type"
                label="Budget Type"
                value={selectedType}
                options={typeOpts}
                onChange={(val) => setFilter(typeColumnId, val)}
                className="mr-1"
            />

            {/* Category (multi) */}
            <MultiSelect
                aria-label="Filter by category"
                label="Category"
                values={selectedCategories}
                options={categoryOptions}
                onChange={(vals) => setFilter(categoryColumnId, vals)}
                className="mr-1"
            />

            {/* Spacer */}
            <div className="grow" />

            {/* Filters active badge */}
            {anyFilterActive && (
                <span className="rounded-full bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600">
                    {filters.length} filter{filters.length > 1 ? "s" : ""} active
                </span>
            )}

            <button
                type="button"
                onClick={onClear}
                className="rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
            >
                Clear Filters
            </button>
            <button
                type="button"
                onClick={onExport}
                className="rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
            >
                Export CSV
            </button>
        </div>
    );
}

/* ========================== Headless Inputs ========================== */

function useClickOutsideClose<T extends HTMLElement>(onClose: () => void) {
    const ref = React.useRef<T | null>(null);
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
    label: string; // control name when empty
    value: string | null;
    options: Option[];
    onChange: (val: string | null) => void;
    className?: string;
    "aria-label"?: string;
}) {
    const [open, setOpen] = React.useState(false);
    const ref = useClickOutsideClose<HTMLDivElement>(() => setOpen(false));
    const current = options.find((o) => o.value === value);
    const displayText = current ? current.label : label;

    return (
        <div className={`relative ${className ?? ""}`} ref={ref}>
            <button
                type="button"
                aria-label={ariaLabel || label}
                onClick={() => setOpen((o) => !o)}
                className="inline-flex min-w-[168px] items-center justify-between rounded-md border border-slate-300 bg-white px-2.5 py-1.5 text-sm text-slate-800 shadow-sm hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
            >
                <span className={`truncate ${current ? "" : "text-slate-500"}`}>{displayText}</span>
                <Caret />
            </button>
            {open && (
                <div role="listbox" className="absolute z-40 mt-1 max-h-64 w-[min(280px,calc(100vw-2rem))] overflow-auto rounded-md border border-slate-200 bg-white p-1 shadow-lg">
                    <button
                        className="w-full rounded px-2 py-1 text-left text-sm text-slate-700 hover:bg-slate-100"
                        onClick={() => { onChange(null); setOpen(false); }}
                    >
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
    label: string; // control name when empty
    values: string[];
    options: Option[];
    onChange: (vals: string[]) => void;
    searchable?: boolean;
    className?: string;
    "aria-label"?: string;
}) {
    const [open, setOpen] = React.useState(false);
    const [query, setQuery] = React.useState("");
    const ref = useClickOutsideClose<HTMLDivElement>(() => setOpen(false));

    const display =
        values.length === 0
            ? label
            : values.length <= 2
                ? options.filter((o) => values.includes(o.value)).map((o) => o.label).join(", ")
                : `${values.length} selected`;

    const filtered = React.useMemo(() => {
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
                <Caret />
            </button>
            {open && (
                <div role="listbox" className="absolute z-40 mt-1 max-h-72 w-[min(420px,calc(100vw-2rem))] overflow-auto rounded-md border border-slate-200 bg-white p-2 shadow-lg">
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

function Caret() {
    return (
        <svg viewBox="0 0 20 20" aria-hidden="true" className="ml-2 h-4 w-4 text-slate-500">
            <path d="M5.25 7.5l4.5 4.5 4.5-4.5" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" />
        </svg>
    );
}
