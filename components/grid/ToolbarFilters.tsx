
// components/grid/ToolbarFilters.tsx
import * as React from 'react';
import type { ColumnFiltersState, Table } from '@tanstack/react-table';

type Props = {
    /** Which pickers to show, in order. Example: ['year','quarter','budgetType','category'] */
    ids?: Array<'year' | 'quarter' | 'month' | 'budgetType' | 'category'>;
    filters: ColumnFiltersState;
    setFilters:
    | React.Dispatch<React.SetStateAction<ColumnFiltersState>>
    | ((updater: ColumnFiltersState | ((old: ColumnFiltersState) => ColumnFiltersState)) => void);
    onClear: () => void;
    onExport: () => void;
    table: Table<any>;
};

function getFilterValue(filters: ColumnFiltersState, id: string): string {
    const f = filters.find(f => f.id === id);
    return f?.value != null ? String(f.value) : '';
}

function upsert(
    set: Props['setFilters'],
    id: 'year' | 'quarter' | 'month' | 'budgetType' | 'category',
    value: string
) {
    const updater = (prev: ColumnFiltersState) => {
        const next = prev.filter(f => f.id !== id);
        if (value !== '') {
            const v = id === 'year' ? Number(value) : value; // keep 'year' numeric
            next.push({ id, value: v } as any);
        }
        return next;
    };
    if (typeof set === 'function' && (set as any).length === 1) {
        (set as any)(updater);
    } else {
        (set as React.Dispatch<React.SetStateAction<ColumnFiltersState>>)(updater);
    }
}

function getOptions(table: Table<any>, columnId: string): string[] {
    const col = table.getColumn(columnId);
    if (!col) return [];
    const pre = table.getPreFilteredRowModel();
    const s = new Set<string>();
    pre.flatRows.forEach(r => {
        const v = r.getValue?.(columnId);
        if (v == null) return;
        const str = String(v);
        if (str.trim().length) s.add(str);
    });
    return Array.from(s).sort((a, b) => a.localeCompare(b));
}

function Divider() {
    return (
        <span
            aria-hidden="true"
            style={{
                width: 1,
                height: 22,
                background: '#e5e5e5',
                margin: '0 10px',
                display: 'inline-block',
            }}
        />
    );
}

export default function ToolbarFilters({
    ids = ['year', 'quarter', 'budgetType', 'category'],
    filters,
    setFilters,
    onClear,
    onExport,
    table,
}: Props) {
    const LABELS: Record<string, string> = {
        year: 'Year',
        quarter: 'Quarter',
        month: 'Month',
        budgetType: 'Budget Type',
        category: 'Category',
    };

    const filteredCount = table.getFilteredRowModel().rows.length;

    return (
        <div
            className="grid-toolbar"
            style={{
                display: 'flex',
                alignItems: 'center',
                gap: 0,
                padding: '4px 4px 8px 4px',
            }}
        >
            {ids.map((id, idx) => {
                const label = LABELS[id];
                const options = getOptions(table, id);
                const value = getFilterValue(filters, id);
                const control = (
                    <div
                        key={id}
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            padding: '2px 10px',
                            borderRadius: 6,
                            border: '1px solid #e5e5e5',
                            background: '#fff',
                        }}
                    >
                        <select
                            value={value}
                            onChange={(e) => upsert(setFilters, id, e.target.value)}
                            disabled={options.length === 0}
                            style={{
                                border: 'none',
                                outline: 'none',
                                background: 'transparent',
                                minWidth: id === 'budgetType' ? 150 : id === 'category' ? 180 : 110,
                                cursor: options.length ? 'pointer' : 'not-allowed',
                            }}
                            aria-label={label}
                        >
                            <option value="">{label}</option>
                            {options.map(opt => (
                                <option key={`${id}:${opt}`} value={opt}>{opt}</option>
                            ))}
                        </select>
                    </div>
                );

                return (
                    <React.Fragment key={`frag-${id}`}>
                        {control}
                        {idx < ids.length - 1 ? <Divider /> : <span style={{ width: 8 }} />}
                    </React.Fragment>
                );
            })}

            <div style={{ marginLeft: 'auto', display: 'inline-flex', gap: 12, alignItems: 'center', color: '#666' }}>
                <span style={{ fontSize: 12 }}>{filteredCount} rows</span>
                <button type="button" onClick={onClear}>Clear</button>
                <button type="button" onClick={onExport}>Export CSV</button>
            </div>
        </div>
    );
}
