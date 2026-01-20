
"use client";

import * as React from "react";

/**
 * AmountCell — standalone inline editor for the "Amount" column.
 * - Click to enter edit mode
 * - Commit on Enter/blur; Escape cancels
 * - Persists via table.options.meta.updateRow(rowIndex, { amount: next })
 *
 * Requirements from parent table:
 *   - The TanStack Table instance must define `meta.updateRow(index, partial)`
 *     which will update backing data (see BudgetGrid.tanstack.tsx).
 */

export default function AmountCell({
    getValue,
    row,
    table,
}: {
    getValue: () => number | null | undefined;
    row: any;
    table: any;
}) {
    const initial = getValue();
    const [editing, setEditing] = React.useState(false);
    const [draft, setDraft] = React.useState<number | "">(
        typeof initial === "number" ? initial : initial == null ? "" : Number(initial)
    );

    // Format helper (display only)
    const fmtUSD = React.useCallback(
        (n: number) =>
            new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
                maximumFractionDigits: 0,
            }).format(n),
        []
    );

    const commit = () => {
        const next = draft === "" ? null : Number(draft);
        table.options.meta?.updateRow?.(row.index, { amount: next });
        setEditing(false);
    };

    const cancel = () => {
        // Revert to current value in the row
        const current = getValue();
        setDraft(typeof current === "number" ? current : current == null ? "" : Number(current));
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
                        if (e.key === "Escape") cancel();
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
