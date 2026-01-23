
// components/BudgetGrid.tanstack.tsx
'use client';

import * as React from 'react';
import {
    Cell,
    ColumnFiltersState,
    Row,
    SortingState,
    TableOptions,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getSortedRowModel,
    getGroupedRowModel,
    getExpandedRowModel,
    useReactTable,
} from '@tanstack/react-table';
import baseColumns, { BudgetRow } from './grid/columns';
import ToolbarFilters from './grid/ToolbarFilters';
import VirtualRows from './grid/VirtualRows';
import { buildTotalsFromTable } from './grid/totals';

/* ----------------------------------------------------------------------------
   Small utilities
---------------------------------------------------------------------------- */
function toCsv(rows: BudgetRow[], visibleKeys: string[]): string {
    const esc = (v: unknown) => {
        if (v == null) return '';
        const s = String(v);
        return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
    };
    const header = visibleKeys.map(esc).join(',');
    const body = rows.map((r) => visibleKeys.map((k) => esc((r as any)[k])).join(',')).join('\n');
    return `${header}\n${body}`;
}

function downloadBlob(filename: string, content: string, mime = 'text/csv;charset=utf-8') {
    const blob = new Blob([content], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
}

function formatCurrency(n: number): string {
    return Intl.NumberFormat(undefined, { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n || 0);
}

/* ----------------------------------------------------------------------------
   Props
---------------------------------------------------------------------------- */
type Props = {
    rows?: BudgetRow[];
    initialSorting?: SortingState;
    initialFilters?: ColumnFiltersState;

    // Controlled filters from the page (syncs with right-hand panel)
    filters?: ColumnFiltersState;
    onFiltersChange?: (
        updater: ColumnFiltersState | ((old: ColumnFiltersState) => ColumnFiltersState)
    ) => void;

    // Push edits up if the page is managing row state
    onUpdateAmount?: (rowIndex: number, newValue: number) => void;

    // Legacy toolbar (kept for future grouping/AI actions, page hides via CSS)
    toolbarIds?: Array<'year' | 'quarter' | 'month' | 'budgetType' | 'category'>;

    // SAFETY: emit grouping keys after render only (prevents render-phase updates)
    onGroupingAfterRender?: (keys: string[]) => void;
};

/* ----------------------------------------------------------------------------
   Column helpers for header filters
---------------------------------------------------------------------------- */
const HEADER_FILTER_IDS = [
    'community',
    'category',
    'subCategory',
    'glCode',
    'budgetType',
    'year',
    'quarter',
    'month',
] as const;

function getColumnOptions(table: any, columnId: string): string[] {
    const col = table.getColumn(columnId);
    if (!col) return [];
    const pre = table.getPreFilteredRowModel();
    const uniq = new Set<string>();
    pre.flatRows.forEach((r: any) => {
        // Prefer TanStack's computed cell value
        let v = r.getValue?.(columnId);
        // Fallbacks for common synonyms if accessor differs
        if (v == null) {
            const orig = r.original ?? {};
            switch (columnId) {
                case 'community':
                    v = orig.community ?? orig.Community;
                    break;
                case 'category':
                    v = orig.category ?? orig.Category;
                    break;
                case 'subCategory':
                    v = orig.subCategory ?? orig.SubCategory;
                    break;
                case 'budgetType':
                    v = orig.type ?? orig.budgetType ?? orig.BudgetType;
                    break;
                case 'year':
                    v = orig.year ?? '';
                    break;
                case 'quarter':
                    v = orig.quarter ?? '';
                    break;
                case 'month':
                    v = orig.month ?? '';
                    break;
                default:
                    v = v ?? '';
            }
        }
        if (v != null) {
            const s = String(v).trim();
            if (s.length) uniq.add(s);
        }
    });
    return Array.from(uniq).sort((a, b) => a.localeCompare(b));
}

/**
 * Helper that works for both controlled and uncontrolled signatures.
 * We pass a "setState-compatible" dispatcher everywhere. This avoids type issues
 * and lets us centralize the "after-mount" guard.
 */
function setFilter(
    setFilters:
        | React.Dispatch<React.SetStateAction<ColumnFiltersState>>
        | ((updater: ColumnFiltersState | ((old: ColumnFiltersState) => ColumnFiltersState)) => void)
        | undefined,
    id: string,
    value?: string
) {
    if (!setFilters) return;
    (setFilters as any)((prev: ColumnFiltersState) => {
        const next = prev.filter((f) => f.id !== id);
        if (value != null && value !== '') {
            next.push({ id, value: id === 'year' ? Number(value) : value } as any);
        }
        return next;
    });
}

/* ----------------------------------------------------------------------------
   Runtime column augmentation:
   - We do NOT edit columns.ts.
   - Inject aggregation ONLY for 'amount' (sum) so grouped rows display totals.
---------------------------------------------------------------------------- */
function useAugmentedColumns() {
    return React.useMemo(() => {
        return (baseColumns as any[]).map((c) => {
            const colId = (c.id ?? c.accessorKey) as string | undefined;
            if (colId === 'amount') {
                return { ...c, aggregationFn: 'sum' as const, meta: { ...(c.meta ?? {}), isNumeric: true } };
            }
            return c;
        });
    }, []);
}

/* ----------------------------------------------------------------------------
   Component (forwardRef exposes TanStack table if parent ever needs it)
---------------------------------------------------------------------------- */
const BudgetGrid = React.forwardRef<any, Props>(function BudgetGrid(
    {
        rows,
        initialSorting = [],
        initialFilters = [],
        filters,
        onFiltersChange,
        onUpdateAmount,
        toolbarIds = ['year', 'quarter', 'budgetType', 'category'],
        onGroupingAfterRender,
    }: Props,
    ref
) {
    // Data / edits
    const [data, setData] = React.useState<BudgetRow[]>(() => rows ?? []);
    React.useEffect(() => {
        if (rows) setData(rows);
    }, [rows]);

    // Sorting
    const [sorting, setSorting] = React.useState<SortingState>(initialSorting);

    // Filters: controlled vs uncontrolled
    const controlled = !!filters && !!onFiltersChange;
    const [uncontrolledFilters, setUncontrolledFilters] = React.useState<ColumnFiltersState>(initialFilters);
    const effectiveFilters = controlled ? (filters as ColumnFiltersState) : uncontrolledFilters;
    const setEffectiveFilters = controlled ? (onFiltersChange as NonNullable<Props['onFiltersChange']>) : setUncontrolledFilters;

    // Grouping + row expansion
    const [grouping, setGrouping] = React.useState<string[]>([]);
    const [expanded, setExpanded] = React.useState<Record<string, boolean>>({});

    // SAFETY: mark component mounted before any effects from children/React Table might fire.
    const mountedRef = React.useRef(false);
    React.useLayoutEffect(() => {
        mountedRef.current = true;
        return () => {
            mountedRef.current = false;
        };
    }, []);

    // A single, guarded dispatcher for column filter changes.
    const onColumnFiltersChangeSafe = React.useCallback(
        (updater: ColumnFiltersState | ((old: ColumnFiltersState) => ColumnFiltersState)) => {
            if (!mountedRef.current) return; // ignore pre-mount emissions
            setEffectiveFilters(updater as any);
        },
        [setEffectiveFilters]
    );

    // Update from AmountCell (bubbles to page if provided)
    const updateAmountLocal = React.useCallback(
        (rowId: string, newValue: number) => {
            const idx = Number(rowId);
            if (Number.isFinite(idx)) {
                if (onUpdateAmount) {
                    onUpdateAmount(idx, newValue);
                } else {
                    setData((prev) => {
                        if (idx < 0 || idx >= prev.length) return prev;
                        const next = prev.slice();
                        next[idx] = { ...next[idx], amount: newValue };
                        return next;
                    });
                }
            }
        },
        [onUpdateAmount]
    );

    // Inject aggregation for 'amount' at runtime (no edit to columns.ts)
    const augColumns = useAugmentedColumns();

    const table = useReactTable<BudgetRow>({
        data,
        columns: augColumns,
        state: {
            sorting,
            columnFilters: effectiveFilters,
            grouping,
            expanded,
        },
        onSortingChange: setSorting,
        // IMPORTANT: route through the guarded handler to avoid pre-mount updates
        onColumnFiltersChange: onColumnFiltersChangeSafe as NonNullable<Props['onFiltersChange']>,
        // IMPORTANT: no onGroupingChange here; we snapshot grouping after render instead
        onExpandedChange: setExpanded,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getGroupedRowModel: getGroupedRowModel(),
        getExpandedRowModel: getExpandedRowModel(),
        enableColumnResizing: true,
        columnResizeMode: 'onChange',
        getRowId: (_row, idx) => String(idx),
        // Expose meta so AmountCell can push edits up
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        meta: { updateAmount: updateAmountLocal },
    } as TableOptions<BudgetRow>);

    // Expose TanStack table to parent if needed later
    React.useImperativeHandle(ref, () => table, [table]);

    // SAFETY: emit grouping snapshot AFTER render; Strict Mode safe
    React.useEffect(() => {
        onGroupingAfterRender?.(grouping);
    }, [grouping, onGroupingAfterRender]);

    const scrollRef = React.useRef<HTMLDivElement>(null);
    const leafCols = table.getVisibleLeafColumns();

    // Totals for footer (already filtered — independent of grouping)
    const totalsObj = buildTotalsFromTable(table, ['amount']);

    // Visual theme
    const HEADER_DIVIDER = '#d0d7df'; // header bottom + header vertical
    const BODY_LINE = '#e1e7ec'; // body vertical/horizontal
    const HEADER_BG = '#f7f9fb'; // Option A subtle gray

    // Grouping UX
    const groupableColumns: { id: string; label: string }[] = [
        { id: 'community', label: 'Community' },
        { id: 'category', label: 'Category' },
        { id: 'subCategory', label: 'SubCategory' },
        { id: 'year', label: 'Year' },
        { id: 'quarter', label: 'Quarter' },
        { id: 'month', label: 'Month' },
        { id: 'budgetType', label: 'Budget Type' },
    ];

    const toggleGroup = (id: string) => setGrouping((prev) => (prev.includes(id) ? prev.filter((g) => g !== id) : [...prev, id]));
    const clearGrouping = () => setGrouping([]);

    // Render
    return (
        <section style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {/* Legacy grid toolbar (hidden by page CSS, but kept for future actions) */}
            <ToolbarFilters
                ids={toolbarIds as any}
                // use the same state abstraction the component already supports
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                filters={effectiveFilters as any}
                // Route toolbar updates through the guarded handler as well
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                setFilters={onColumnFiltersChangeSafe as any}
                onClear={() => onColumnFiltersChangeSafe([] as any)}
                onExport={() => {
                    const visibleCols = table.getVisibleLeafColumns();
                    const keys = visibleCols.map((c) => (c.columnDef as any).accessorKey ?? c.id);
                    const filtered = table.getFilteredRowModel().rows.map((r) => r.original as BudgetRow);
                    const csv = toCsv(filtered, keys);
                    downloadBlob(`budget-grid-${new Date().toISOString().slice(0, 10)}.csv`, csv);
                }}
                table={table as any}
            />

            {/* Grouping bar */}
            <div
                className="grouping-toolbar"
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    flexWrap: 'wrap',
                    padding: '6px 8px',
                    border: '1px solid #e5e7eb',
                    borderRadius: 8,
                    background: '#ffffff',
                }}
            >
                <span style={{ fontSize: 12, color: '#475569', fontWeight: 600 }}>Group by:</span>
                {groupableColumns.map(({ id, label }) => {
                    const active = grouping.includes(id);
                    return (
                        <button
                            key={id}
                            type="button"
                            onClick={() => toggleGroup(id)}
                            style={{
                                fontSize: 12,
                                lineHeight: 1,
                                padding: '6px 10px',
                                borderRadius: 14,
                                border: `1px solid ${active ? '#0ea5e9' : '#e5e7eb'}`,
                                background: active ? '#e0f2fe' : '#fff',
                                color: active ? '#0369a1' : '#334155',
                                cursor: 'pointer',
                            }}
                            aria-pressed={active}
                            title={active ? 'Remove from grouping' : 'Add to grouping'}
                        >
                            {label}
                        </button>
                    );
                })}
                <button
                    type="button"
                    onClick={clearGrouping}
                    style={{
                        marginLeft: 'auto',
                        fontSize: 12,
                        lineHeight: 1,
                        padding: '6px 10px',
                        borderRadius: 6,
                        border: '1px solid #e5e7eb',
                        background: '#fff',
                        color: '#334155',
                        cursor: 'pointer',
                    }}
                    title="Clear all grouping"
                >
                    Clear
                </button>
            </div>

            {/* Scroll container */}
            <div
                ref={scrollRef}
                style={{
                    overflow: 'auto',
                    maxHeight: '70vh',
                    border: '1px solid var(--border, #ddd)',
                    borderRadius: 6,
                    background: '#fff',
                }}
            >
                <table
                    style={{
                        width: '100%',
                        borderCollapse: 'separate',
                        borderSpacing: 0,
                        tableLayout: 'fixed',
                    }}
                >
                    {/* column widths */}
                    <colgroup>
                        {leafCols.map((col) => (
                            <col
                                key={`col-${col.id}`}
                                style={{
                                    width: col.getSize(),
                                    minWidth: col.columnDef.minSize ?? 40,
                                    maxWidth: col.columnDef.maxSize ?? Number.POSITIVE_INFINITY,
                                }}
                            />
                        ))}
                    </colgroup>

                    {/* HEADER (labels) */}
                    <thead>
                        {table.getHeaderGroups().map((hg) => (
                            <tr key={`hdr-${hg.id}`}>
                                {hg.headers.map((h) => {
                                    const canResize = h.column.getCanResize();
                                    return (
                                        <th
                                            key={h.id}
                                            colSpan={h.colSpan}
                                            style={{
                                                position: 'sticky',
                                                top: 0,
                                                zIndex: 5,
                                                background: `var(--th-bg, ${HEADER_BG})`,
                                                textAlign: 'center',
                                                fontWeight: 600,
                                                borderBottom: `1px solid ${HEADER_DIVIDER}`,
                                                borderRight: `1px solid ${HEADER_DIVIDER}`,
                                                padding: '10px 10px',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                whiteSpace: 'nowrap',
                                            }}
                                        >
                                            {h.isPlaceholder ? null : flexRender(h.column.columnDef.header, h.getContext())}
                                            {canResize && (
                                                <div
                                                    onMouseDown={h.getResizeHandler()}
                                                    onTouchStart={h.getResizeHandler()}
                                                    role="separator"
                                                    aria-orientation="vertical"
                                                    aria-label={`Resize ${String(h.column.id)} column`}
                                                    style={{
                                                        position: 'absolute',
                                                        right: 0,
                                                        top: 0,
                                                        height: '100%',
                                                        width: 6,
                                                        cursor: 'col-resize',
                                                        userSelect: 'none',
                                                        touchAction: 'none',
                                                    }}
                                                />
                                            )}
                                        </th>
                                    );
                                })}
                            </tr>
                        ))}

                        {/* HEADER FILTER ROW (also sticky, just below labels) */}
                        <tr>
                            {HEADER_FILTER_IDS.map((colId) => {
                                const col = table.getColumn(colId);
                                if (!col)
                                    return (
                                        <th
                                            key={`flt-missing-${colId}`}
                                            style={{
                                                position: 'sticky',
                                                top: 44,
                                                zIndex: 5,
                                                background: `var(--th-bg, ${HEADER_BG})`,
                                                borderBottom: `1px solid ${HEADER_DIVIDER}`,
                                                borderRight: `1px solid ${HEADER_DIVIDER}`,
                                                padding: '6px 8px',
                                            }}
                                        />
                                    );
                                const opts = getColumnOptions(table, colId);
                                const isSelect =
                                    ['community', 'category', 'subCategory', 'budgetType', 'year', 'quarter', 'month'].includes(colId);
                                return (
                                    <th
                                        key={`flt-${colId}`}
                                        style={{
                                            position: 'sticky',
                                            top: 44,
                                            zIndex: 5,
                                            background: `var(--th-bg, ${HEADER_BG})`,
                                            borderBottom: `1px solid ${HEADER_DIVIDER}`,
                                            borderRight: `1px solid ${HEADER_DIVIDER}`,
                                            padding: '6px 8px',
                                        }}
                                    >
                                        {isSelect ? (
                                            <select
                                                value={String(col.getFilterValue?.() ?? '')}
                                                onChange={(e) => setFilter(onColumnFiltersChangeSafe as any, colId, e.target.value || undefined)}
                                                style={{
                                                    width: '100%',
                                                    padding: '6px 8px',
                                                    borderRadius: 6,
                                                    border: '1px solid #e5e7eb',
                                                    background: '#fff',
                                                }}
                                                aria-label={`Filter ${colId}`}
                                            >
                                                <option value="">All</option>
                                                {opts.map((o) => (
                                                    <option key={`${colId}:${o}`} value={o}>
                                                        {o}
                                                    </option>
                                                ))}
                                            </select>
                                        ) : (
                                            <input
                                                type="text"
                                                value={String(col.getFilterValue?.() ?? '')}
                                                onChange={(e) => setFilter(onColumnFiltersChangeSafe as any, colId, e.target.value || undefined)}
                                                placeholder={`Filter ${colId}`}
                                                style={{
                                                    width: '100%',
                                                    padding: '6px 8px',
                                                    borderRadius: 6,
                                                    border: '1px solid #e5e7eb',
                                                    background: '#fff',
                                                }}
                                                aria-label={`Filter ${colId}`}
                                            />
                                        )}
                                    </th>
                                );
                            })}
                        </tr>
                    </thead>

                    {/* BODY */}
                    <tbody>
                        <VirtualRows
                            rows={table.getRowModel().rows}
                            rowHeight={36}
                            overscan={8}
                            scrollContainerRef={scrollRef}
                            visibleColumnCount={leafCols.length}
                            renderRow={(row: Row<BudgetRow>) => (
                                <tr key={row.id}>
                                    {row.getVisibleCells().map((cell: Cell<BudgetRow, unknown>) => {
                                        const isGroupedCell = (cell as any).getIsGrouped?.();
                                        const isAggregated = (cell as any).getIsAggregated?.();
                                        const isPlaceholder = (cell as any).getIsPlaceholder?.();

                                        // Grouped cell: expander + value + row count
                                        if (isGroupedCell) {
                                            const groupVal = cell.getValue();
                                            const toggle = row.getToggleExpandedHandler();
                                            const expandedNow = row.getIsExpanded();
                                            return (
                                                <td
                                                    key={cell.id}
                                                    style={{
                                                        borderBottom: `1px solid ${BODY_LINE}`,
                                                        borderRight: `1px solid ${BODY_LINE}`,
                                                        padding: '6px 10px',
                                                        background: '#fff',
                                                        fontWeight: 600,
                                                    }}
                                                >
                                                    <button
                                                        type="button"
                                                        onClick={toggle}
                                                        aria-label={expandedNow ? 'Collapse group' : 'Expand group'}
                                                        title={expandedNow ? 'Collapse' : 'Expand'}
                                                        style={{
                                                            marginRight: 8,
                                                            border: '1px solid #e5e7eb',
                                                            background: '#fff',
                                                            borderRadius: 4,
                                                            width: 18,
                                                            height: 18,
                                                            lineHeight: '16px',
                                                            textAlign: 'center',
                                                            fontSize: 12,
                                                            cursor: 'pointer',
                                                        }}
                                                    >
                                                        {expandedNow ? '–' : '+'}
                                                    </button>
                                                    {String(groupVal ?? '')}{' '}
                                                    <span style={{ color: '#64748b', fontWeight: 400 }}>
                                                        ({row.subRows?.length ?? 0})
                                                    </span>
                                                </td>
                                            );
                                        }

                                        // Aggregated cell (e.g., Amount totals on group rows)
                                        if (isAggregated) {
                                            const v = cell.getValue();
                                            const isNumeric = ((cell.column.columnDef as any).meta?.isNumeric ?? false) === true;
                                            return (
                                                <td
                                                    key={cell.id}
                                                    style={{
                                                        borderBottom: `1px solid ${BODY_LINE}`,
                                                        borderRight: `1px solid ${BODY_LINE}`,
                                                        padding: '6px 10px',
                                                        background: '#fff',
                                                        fontWeight: 600,
                                                        textAlign: isNumeric ? 'right' : 'left',
                                                    }}
                                                >
                                                    {cell.column.id === 'amount' ? formatCurrency(Number(v) || 0) : String(v ?? '')}
                                                </td>
                                            );
                                        }

                                        // Placeholder cell
                                        if (isPlaceholder) {
                                            return (
                                                <td
                                                    key={cell.id}
                                                    style={{
                                                        borderBottom: `1px solid ${BODY_LINE}`,
                                                        borderRight: `1px solid ${BODY_LINE}`,
                                                        padding: '6px 10px',
                                                        background: '#fff',
                                                    }}
                                                />
                                            );
                                        }

                                        // Leaf cell
                                        const isNumeric = ((cell.column.columnDef as any).meta?.isNumeric ?? false) === true;
                                        return (
                                            <td
                                                key={cell.id}
                                                style={{
                                                    borderBottom: `1px solid ${BODY_LINE}`,
                                                    borderRight: `1px solid ${BODY_LINE}`,
                                                    padding: '6px 10px',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    whiteSpace: 'nowrap',
                                                    textAlign: isNumeric ? 'right' : 'left',
                                                    background: '#fff',
                                                }}
                                            >
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </td>
                                        );
                                    })}
                                </tr>
                            )}
                        />
                    </tbody>

                    {/* FOOTER TOTALS (still visible in grouped & filtered states) */}
                    <tfoot>
                        <tr>
                            {leafCols.map((col, idx) => {
                                const content = col.id === 'amount' ? formatCurrency(totalsObj.amount ?? 0) : idx === 0 ? 'Totals' : '';
                                return (
                                    <td
                                        key={col.id}
                                        style={{
                                            borderTop: `2px solid ${HEADER_DIVIDER}`,
                                            borderRight: `1px solid ${BODY_LINE}`,
                                            fontWeight: 600,
                                            padding: '8px 10px',
                                            textAlign: col.id === 'amount' ? 'right' : 'left',
                                            background: '#fbfcfd',
                                        }}
                                    >
                                        {content}
                                    </td>
                                );
                            })}
                        </tr>
                    </tfoot>
                </table>
            </div>
        </section>
    );
});

export default BudgetGrid;
