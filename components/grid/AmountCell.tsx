
// components/grid/AmountCell.tsx
import * as React from 'react';
import type { CellContext } from '@tanstack/react-table';
import type { BudgetRow } from './columns';

// Currency helpers
const fmt = new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
});

function parseCurrency(input: string): number | null {
    // Accept: "$480,000", "480000", "480,000", "480000.00"
    if (input == null) return null;
    const stripped = String(input).replace(/[^0-9.-]/g, '');
    if (stripped.trim() === '') return null;
    const n = Number(stripped);
    return Number.isFinite(n) ? n : null;
}

type TableMeta = {
    updateAmount?: (rowId: string, newValue: number) => void;
};

export default function AmountCell(ctx: CellContext<BudgetRow, unknown>) {
    const { row, getValue, table } = ctx;
    const meta = table.options.meta as TableMeta | undefined;

    // Show formatted currency when not editing; turn into an <input> when focused/double-clicked
    const initial = getValue() as number | string | null | undefined;
    const initialNumber =
        typeof initial === 'number'
            ? initial
            : typeof initial === 'string'
                ? Number(initial)
                : null;

    const [isEditing, setEditing] = React.useState(false);
    const [draft, setDraft] = React.useState(
        initialNumber != null ? fmt.format(initialNumber) : ''
    );

    // Keep local draft in sync if the underlying cell changes from elsewhere
    React.useEffect(() => {
        const n =
            typeof initial === 'number'
                ? initial
                : typeof initial === 'string'
                    ? Number(initial)
                    : null;
        setDraft(n != null ? fmt.format(n) : '');
    }, [initial]);

    const commit = React.useCallback(() => {
        const n = parseCurrency(draft);
        if (n != null && meta?.updateAmount) {
            meta.updateAmount(row.id, n);
        }
        setEditing(false);
    }, [draft, meta, row.id]);

    const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            commit();
        } else if (e.key === 'Escape') {
            e.preventDefault();
            // Revert draft to current cell value
            const n =
                typeof initial === 'number'
                    ? initial
                    : typeof initial === 'string'
                        ? Number(initial)
                        : null;
            setDraft(n != null ? fmt.format(n) : '');
            setEditing(false);
        }
    };

    if (!isEditing) {
        const display =
            initialNumber != null ? fmt.format(initialNumber) : '';
        return (
            <div
                role="button"
                tabIndex={0}
                onDoubleClick={() => setEditing(true)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') setEditing(true);
                }}
                style={{ cursor: 'text' }}
            >
                {display}
            </div>
        );
    }

    return (
        <input
            autoFocus
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onBlur={commit}
            onKeyDown={onKeyDown}
            inputMode="numeric"
            style={{
                width: '100%',
                border: '1px solid #cfd8e3',
                borderRadius: 4,
                padding: '4px 6px',
                outline: 'none',
                textAlign: 'left',
            }}
        />
    );
}
