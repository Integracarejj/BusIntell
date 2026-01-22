
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
    useReactTable,
} from '@tanstack/react-table';
import columns, { BudgetRow } from './grid/columns';
import ToolbarFilters from './grid/ToolbarFilters';
import VirtualRows from './grid/VirtualRows';
import { buildTotalsFromTable } from './grid/totals';

// ---------- small utils ----------
function toCsv(rows: BudgetRow[], visibleKeys: string[]): string {
    const esc = (v: unknown) => {
        if (v == null) return '';
        const s = String(v);
        return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
    };
    const header = visibleKeys.map(esc).join(',');
    const body = rows.map(r => visibleKeys.map(k => esc((r as any)[k])).join(',')).join('\n');
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

// ---------- props ----------
type Props = {
    rows?: BudgetRow[];
    initialSorting?: SortingState;
    initialFilters?: ColumnFiltersState;
    filters?: ColumnFiltersState;
    onFiltersChange?: (updater: ColumnFiltersState | ((old: ColumnFiltersState) => ColumnFiltersState)) => void;
    onUpdateAmount?: (rowIndex: number, newValue: number) => void;
    toolbarIds?: Array<'year' | 'quarter' | 'month' | 'budgetType' | 'category'>;
};

// ---------- component ----------
export default function BudgetGrid({
    rows,
    initialSorting = [],
    initialFilters = [],
    filters,
    onFiltersChange,
    onUpdateAmount,
    toolbarIds = ['year', 'quarter', 'budgetType', 'category'], // page can hide this via CSS
}: Props) {
    const [data, setData] = React.useState<BudgetRow[]>(() => rows ?? []);
    React.useEffect(() => {
        if (rows) setData(rows);
    }, [rows]);

    const [sorting, setSorting] = React.useState<SortingState>(initialSorting);

    const isControlled = !!filters && !!onFiltersChange;
    const [uncontrolledFilters, setUncontrolledFilters] = React.useState<ColumnFiltersState>(initialFilters);
    const effectiveFilters = isControlled ? (filters as ColumnFiltersState) : uncontrolledFilters;
    const setEffectiveFilters = isControlled ? (onFiltersChange as Props['onFiltersChange']) : setUncontrolledFilters;

    const updateAmountLocal = React.useCallback(
        (rowId: string, newValue: number) => {
            const idx = Number(rowId);
            if (Number.isFinite(idx)) {
                if (onUpdateAmount) {
                    onUpdateAmount(idx, newValue);
                } else {
                    setData(prev => {
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

    const table = useReactTable<BudgetRow>({
        data,
        columns,
        state: { sorting, columnFilters: effectiveFilters },
        onSortingChange: setSorting,
        onColumnFiltersChange: setEffectiveFilters as NonNullable<Props['onFiltersChange']>,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        enableColumnResizing: true,
        columnResizeMode: 'onChange',
        getRowId: (_row, idx) => String(idx),
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        meta: { updateAmount: updateAmountLocal },
    } as TableOptions<BudgetRow>);

    const scrollRef = React.useRef<HTMLDivElement>(null);
    const leafCols = table.getVisibleLeafColumns();

    const totalsObj = buildTotalsFromTable(table, ['amount']);

    // Visual theme for borders/lines
    const HEADER_DIVIDER = '#d0d7df'; // header bottom + header vertical
    const BODY_LINE = '#e1e7ec';      // body vertical/horizontal
    const HEADER_BG = '#f7f9fb';      // Option A subtle gray

    return (
        <section style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <ToolbarFilters
                ids={toolbarIds as any}
                filters={effectiveFilters}
                setFilters={setEffectiveFilters as any}
                onClear={() => setEffectiveFilters?.([] as any)}
                onExport={() => {
                    const visibleCols = table.getVisibleLeafColumns();
                    const keys = visibleCols.map(c => (c.columnDef as any).accessorKey ?? c.id);
                    const filtered = table.getFilteredRowModel().rows.map(r => r.original as BudgetRow);
                    const csv = toCsv(filtered, keys);
                    downloadBlob(`budget-grid-${new Date().toISOString().slice(0, 10)}.csv`, csv);
                }}
                table={table as any}
            />

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
                    <colgroup>
                        {leafCols.map(col => (
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

                    {/* HEADER (sticky) */}
                    <thead>
                        {table.getHeaderGroups().map(hg => (
                            <tr key={hg.id}>
                                {hg.headers.map(h => {
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
                                    {row.getVisibleCells().map((cell: Cell<BudgetRow, unknown>) => (
                                        <td
                                            key={cell.id}
                                            style={{
                                                borderBottom: `1px solid ${BODY_LINE}`,
                                                borderRight: `1px solid ${BODY_LINE}`,
                                                padding: '8px 10px',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                whiteSpace: 'nowrap',
                                                textAlign: 'left',
                                                background: '#fff',
                                            }}
                                        >
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </td>
                                    ))}
                                </tr>
                            )}
                        />
                    </tbody>

                    {/* FOOTER TOTALS */}
                    <tfoot>
                        <tr>
                            {leafCols.map((col, idx) => {
                                const content =
                                    col.id === 'amount' ? formatCurrency(totalsObj.amount ?? 0) : idx === 0 ? 'Totals' : '';
                                return (
                                    <td
                                        key={col.id}
                                        style={{
                                            borderTop: `2px solid ${HEADER_DIVIDER}`,
                                            borderRight: `1px solid ${BODY_LINE}`,
                                            fontWeight: 600,
                                            padding: '8px 10px',
                                            textAlign: 'left',
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
}
