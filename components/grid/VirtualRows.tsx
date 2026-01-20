
// components/grid/VirtualRows.tsx
"use client";

import * as React from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { flexRender, type Table } from "@tanstack/react-table";

/**
 * VirtualRows — scrollable virtualized body for TanStack Table.
 * Hides helper columns (e.g., meta.hiddenHelper) automatically.
 */

export default function VirtualRows<TData extends object>({
    table,
    height = 720,
    rowClassName,
    toggleSelectOnRowClick = true,
    "aria-label": ariaLabel = "Virtualized grid body",
}: {
    table: Table<TData>;
    height?: number;
    rowClassName?: (rowIndex: number) => string | undefined;
    toggleSelectOnRowClick?: boolean;
    "aria-label"?: string;
}) {
    const parentRef = React.useRef<HTMLDivElement>(null);

    const rows = table.getRowModel().rows;
    const virtualizer = useVirtualizer({
        count: rows.length,
        getScrollElement: () => parentRef.current,
        estimateSize: () => 40,
        overscan: 8,
    });
    const virtualItems = virtualizer.getVirtualItems();

    return (
        <div
            ref={parentRef}
            className="border-x border-b border-slate-200"
            style={{ height, overflow: "auto", position: "relative" }}
            aria-label={ariaLabel}
        >
            <div style={{ height: virtualizer.getTotalSize(), position: "relative" }}>
                {virtualItems.map((vi) => {
                    const row = rows[vi.index];

                    // Only render visible, non-helper columns
                    const visibleCells = row
                        .getVisibleCells()
                        .filter((c) => !(c.column.columnDef as any)?.meta?.hiddenHelper);

                    const cls =
                        rowClassName?.(vi.index) ??
                        `grid grid-cols-[repeat(var(--cols),minmax(140px,1fr))] border-b border-slate-100 px-2 text-sm ${row.getIsSelected() ? "bg-teal-50" : "bg-white"
                        } hover:bg-slate-50`;

                    return (
                        <div
                            key={row.id}
                            className={cls}
                            style={{
                                transform: `translateY(${vi.start}px)`,
                                ["--cols" as any]: visibleCells.length,
                                height: vi.size,
                                alignItems: "center",
                            }}
                            onClick={() => toggleSelectOnRowClick && row.toggleSelected()}
                        >
                            {visibleCells.map((cell) => (
                                <div key={cell.id} className="pr-2">
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </div>
                            ))}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
