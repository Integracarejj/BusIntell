
// components/grid/ToolbarFilters.tsx
import * as React from 'react';
import type { ColumnFiltersState, Table } from '@tanstack/react-table';

type Props = {
    filters: ColumnFiltersState;
    setFilters: React.Dispatch<React.SetStateAction<ColumnFiltersState>>;
    onClear: () => void;
    onExport: () => void;
    table: Table<any>;
};

function getFilterValue(filters: ColumnFiltersState, id: string): string {
    const f = filters.find(f => f.id === id);
    return f?.value != null ? String(f.value) : '';
}

function setFilter(
    setFilters: React.Dispatch<React.SetStateAction<ColumnFiltersState>>,
    id: 'community' | 'year' | 'budgetType' | 'category',
    value: string
) {
    setFilters(prev => {
        const next = prev.filter(f => f.id !== id);
        if (value !== '') {
            const casted = id === 'year' ? Number(value) : value; // year as number
            next.push({ id, value: casted as any });
        }
        return next;
    });
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

export default function ToolbarFilters({ filters, setFilters, onClear, onExport, table }: Props) {
    const items: Array<{ id: 'community' | 'year' | 'budgetType' | 'category'; label: string; minWidth?: number }> = [
        { id: 'community', label: 'Community', minWidth: 160 },
        { id: 'year', label: 'Year', minWidth: 110 },
        { id: 'budgetType', label: 'Budget Type', minWidth: 150 },
        { id: 'category', label: 'Category', minWidth: 160 },
    ];

    const filteredCount = table.getFilteredRowModel().rows.length;
    const communityCount = (() => {
        const s = new Set<string>();
        table.getFilteredRowModel().rows.forEach(r => {
            const v = r.getValue?.('community');
            if (v != null) s.add(String(v));
        });
        return s.size;
    })();

    return (
        <div
            className="grid-toolbar"
            style={{
                display: 'flex',
                alignItems: 'center',
                gap: 24,
                padding: '4px 4px 8px 4px',
            }}
        >
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 16 }}>
                {items.map(({ id, label, minWidth }) => {
                    const options = getOptions(table, id);
                    const value = getFilterValue(filters, id);
                    // Use label as placeholder-like first option (acts as clear/all)
                    return (
                        <div
                            key={id}
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                padding: '2px 8px',
                                borderRadius: 6,
                                border: '1px solid #e5e5e5',
                                background: '#fff',
                            }}
                        >
                            <select
                                value={value}
                                onChange={(e) => setFilter(setFilters, id, e.target.value)}
                                disabled={options.length === 0}
                                style={{
                                    border: 'none',
                                    outline: 'none',
                                    background: 'transparent',
                                    minWidth: minWidth ?? 120,
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
                })}
            </div>

            <div style={{ marginLeft: 'auto', display: 'inline-flex', gap: 12, alignItems: 'center', color: '#666' }}>
                <span style={{ fontSize: 12 }}>{filteredCount} rows · {communityCount} communities</span>
                <button type="button" onClick={onClear}>Clear</button>
                <button type="button" onClick={onExport}>Export CSV</button>
            </div>
        </div>
    );
}
``
