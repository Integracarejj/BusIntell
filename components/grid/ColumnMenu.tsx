
// components/grid/ColumnMenu.tsx
import * as React from "react";
import { Column, Table } from "@tanstack/react-table";

/**
 * Lightweight headless column menu for TanStack Table v8.
 * Zero deps (Tailwind for styling only).
 */

type Props<TData> = {
    table: Table<TData>;
    column: Column<TData, unknown>;
};

function useOutsideClick(
    ref: React.RefObject<HTMLElement | null>,
    onClickAway: () => void
) {
    React.useEffect(() => {
        function handler(e: MouseEvent) {
            const el = ref.current;
            if (!el) return;
            if (!el.contains(e.target as Node)) onClickAway();
        }
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, [onClickAway, ref]);
}

export default function ColumnMenu<TData>({ table, column }: Props<TData>) {
    const [open, setOpen] = React.useState(false);
    const btnRef = React.useRef<HTMLButtonElement>(null);
    const popRef = React.useRef<HTMLDivElement>(null);

    // Close on outside click
    useOutsideClick(popRef as React.RefObject<HTMLElement | null>, () => setOpen(false));

    // Close on escape
    React.useEffect(() => {
        function onKey(e: KeyboardEvent) {
            if (e.key === "Escape") setOpen(false);
        }
        document.addEventListener("keydown", onKey);
        return () => document.removeEventListener("keydown", onKey);
    }, []);

    const pinState = column.getIsPinned(); // 'left' | 'right' | false
    const isVisible = column.getIsVisible();
    const canSort = column.getCanSort();
    const hasFilter = Boolean(column.getFilterValue());

    // Auto-size via table.setColumnSizing()
    const autoSize = React.useCallback(() => {
        const ctx = document.createElement("canvas").getContext("2d");
        if (!ctx) return;

        const computed = window.getComputedStyle(document.body);
        ctx.font = `${computed.fontSize} ${computed.fontFamily}`;

        const padding = 24;
        const sampleRows = table.getPrePaginationRowModel().rows.slice(0, 100);

        const measure = (txt: unknown) =>
            Math.ceil(ctx.measureText((txt ?? "").toString()).width);

        const headerLabel =
            typeof column.columnDef.header === "string"
                ? column.columnDef.header
                : column.id;

        const headerW = measure(headerLabel);
        const cellW = sampleRows.reduce((max, r) => {
            const v = r.getValue(column.id);
            return Math.max(max, measure(v));
        }, 0);

        const desired = Math.max(headerW, cellW) + padding;
        const min = (column.columnDef.minSize as number) ?? 60;
        const max = (column.columnDef.maxSize as number) ?? 700;
        const clamped = Math.max(min, Math.min(desired, max));

        table.setColumnSizing((prev) => ({ ...prev, [column.id]: clamped }));
    }, [column, table]);

    const resetWidth = React.useCallback(() => {
        // Reset to no explicit size; TanStack will use default size or CSS.
        table.setColumnSizing((prev) => {
            const { [column.id]: _, ...rest } = prev || {};
            return rest;
        });
    }, [column.id, table]);

    const togglePin = (side: "left" | "right" | false) => {
        column.pin(side);
    };

    const toggleVisibility = () => column.toggleVisibility(!isVisible);

    const sortAsc = () => column.toggleSorting(true);
    const sortDesc = () => column.toggleSorting(false);
    const clearFilter = () => column.setFilterValue(undefined);

    return (
        <div className="relative inline-flex">
            <button
                ref={btnRef}
                type="button"
                className="ml-1 inline-flex h-6 w-6 items-center justify-center rounded hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
                aria-haspopup="menu"
                aria-expanded={open}
                title="Column menu"
                onClick={() => setOpen((o) => !o)}
            >
                <svg viewBox="0 0 24 24" className="h-4 w-4 text-gray-600" fill="currentColor">
                    <circle cx="5" cy="12" r="2" />
                    <circle cx="12" cy="12" r="2" />
                    <circle cx="19" cy="12" r="2" />
                </svg>
            </button>

            {open && (
                <div
                    ref={popRef}
                    role="menu"
                    className="absolute right-0 z-50 mt-2 w-52 overflow-hidden rounded-md border border-gray-200 bg-white shadow-lg"
                >
                    <Section label={String(column.columnDef.header ?? column.id)} />

                    <Item onClick={toggleVisibility}>
                        {isVisible ? "Hide column" : "Show column"}
                    </Item>

                    <Separator />

                    <Item onClick={() => togglePin("left")} active={pinState === "left"}>
                        Pin left
                    </Item>
                    <Item onClick={() => togglePin("right")} active={pinState === "right"}>
                        Pin right
                    </Item>
                    {pinState && <Item onClick={() => togglePin(false)}>Unpin</Item>}

                    <Separator />

                    <Item onClick={sortAsc} disabled={!canSort}>Sort ascending</Item>
                    <Item onClick={sortDesc} disabled={!canSort}>Sort descending</Item>
                    <Item onClick={clearFilter} disabled={!hasFilter}>Clear filter</Item>

                    <Separator />

                    <Item onClick={autoSize}>Auto‑size column</Item>
                    <Item onClick={resetWidth}>Reset width</Item>
                </div>
            )}
        </div>
    );
}

function Section({ label }: { label: string }) {
    return (
        <div className="px-3 py-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
            {label}
        </div>
    );
}

function Separator() {
    return <div className="my-1 h-px bg-gray-100" />;
}

function Item({
    children,
    onClick,
    disabled,
    active,
}: {
    children: React.ReactNode;
    onClick: () => void;
    disabled?: boolean;
    active?: boolean;
}) {
    const base =
        "w-full px-3 py-2 text-left text-sm hover:bg-gray-50 focus:bg-gray-50 focus:outline-none";
    const styles = [
        base,
        disabled ? "cursor-not-allowed text-gray-300" : "text-gray-800",
        active ? "bg-gray-50 font-medium" : "",
    ].join(" ");
    return (
        <button type="button" className={styles} onClick={!disabled ? onClick : undefined} disabled={disabled}>
            {children}
        </button>
    );
}
