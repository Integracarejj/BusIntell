
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

// Read a filter value from ColumnFiltersState
function getFilterValue(filters: ColumnFiltersState, id: string): string | undefined {
    const f = filters.find(f => f.id === id);
    return (typeof f?.value === 'string' || typeof f?.value === 'number')
        ? String(f!.value) : undefined;
}

// Upsert/remove a filter entry
function setFilter(
    setFilters: React.Dispatch<React.SetStateAction<ColumnFiltersState>>,
    id: string,
    value?: string
) {
    setFilters(prev => {
        const next = prev.filter(f => f.id !== id);
        if (value && value.length > 0) next.push({ id, value });
        return next;
    });
}

// Robust option extraction: prefer table values if the column exists,
// otherwise fall back to row.original with common synonyms.
// This prevents the controls from disappearing when ids drift.
function getOptionsRobust(table: Table<any>, columnId: string): string[] {
    const uniq = new Set<string>();
    const col = table.getColumn(columnId);

    // 1) Prefer TanStack row values when the column exists
    if (col) {
        table.getCoreRowModel().flatRows.forEach(r => {
            const v = r.getValue?.(columnId);
            if (v != null && String(v).trim().length) uniq.add(String(v));
        });
    }

    // 2) Also parse row.original for common synonyms to handle current data
    const rows = table.getCoreRowModel().flatRows.map(r => r.original ?? {});
    for (const orig of rows) {
        let v: unknown;
        switch (columnId) {
            case 'community':
                v = (orig.community ?? orig.Community);
                break;
            case 'category':
                v = (orig.category ?? orig.Category);
                break;
            case 'budgetType':
                v = (orig.budgetType ?? orig.budget_type ?? orig.type ?? orig.Type);
                break;
            case 'year':
                v = (orig.year ?? orig.fiscalYear ?? orig.FY ?? orig.fiscal_year);
                break;
            default:
                v = undefined;
        }
        if (v != null && String(v).trim().length) uniq.add(String(v));
    }

    return Array.from(uniq).sort((a, b) => a.localeCompare(b));
}

export default function ToolbarFilters({ filters, setFilters, onClear, onExport, table }: Props) {
    const ids: Array<{ id: 'community' | 'category' | 'budgetType' | 'year'; label: string }> = [
        { id: 'community', label: 'Community' },
        { id: 'category', label: 'Category' },
        { id: 'budgetType', label: 'Budget Type' },
        { id: 'year', label: 'Year' },
    ];

    // counts
    const filteredCount = table.getFilteredRowModel().rows.length;
    const communityCount = (() => {
        const s = new Set<string>();
        table.getFilteredRowModel().rows.forEach(r => {
            const v = r.getValue?.('community') ?? r.original?.community ?? r.original?.Community ?? '';
            if (String(v).trim().length) s.add(String(v));
        });
        return s.size;
    })();

    return (
        <div className="grid-toolbar" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            {ids.map(({ id, label }) => {
                const options = getOptionsRobust(table, id);
                const value = getFilterValue(filters, id) ?? '';
                const disabled = options.length === 0;

                return (
                    <label key={id} style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                        <span>{label}:</span>
                        <select
                            value={value}
                            onChange={(e) => setFilter(setFilters, id, e.target.value || undefined)}
                            disabled={disabled}
                        >
                            <option value="">All</option>
                            {options.map(opt => (
                                <option key={`${id}:${opt}`} value={opt}>{opt}</option>
                            ))}
                        </select>
                    </label>
                );
            })}

            <div style={{ marginLeft: 'auto', display: 'inline-flex', gap: 12, alignItems: 'center', color: '#666' }}>
                <span style={{ fontSize: 12 }}>{filteredCount} rows · {communityCount} communities</span>
                <button type="button" onClick={onClear}>Clear</button>
                <button type="button" onClick={onExport}>Export CSV</button>
            </div>
        </div>
    );
}
