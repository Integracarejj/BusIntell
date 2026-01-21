
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

type Props = {
    rows?: BudgetRow[];
    initialSorting?: SortingState;
    initialFilters?: ColumnFiltersState;
};

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

export default function BudgetGrid({
    rows,
    initialSorting = [],
    initialFilters = [],
}: Props) {
    const [data] = React.useState<BudgetRow[]>(() => rows ?? []);
    const [sorting, setSorting] = React.useState<SortingState>(initialSorting);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(initialFilters);

    const table = useReactTable<BudgetRow>({
        data,
        columns,
        state: { sorting, columnFilters },
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        enableColumnResizing: true,
        columnResizeMode: 'onChange',
        getRowId: (row, idx) => (row as any).id ?? String(idx),
        // 👇 hide the 'year' column by default (still available for filters)
        initialState: {
            columnVisibility: { year: false },
        },
    } as TableOptions<BudgetRow>);

    const scrollRef = React.useRef<HTMLDivElement>(null);

    const handleClearFilters = React.useCallback(() => {
        setColumnFilters([]);
        table.resetColumnFilters();
    }, [table]);

    const handleExportCsv = React.useCallback(() => {
        const visibleCols = table.getVisibleLeafColumns();
        const keys = visibleCols.map(c => (c.columnDef as any).accessorKey ?? c.id);
        const filtered = table.getFilteredRowModel().rows.map(r => r.original);
        const csv = toCsv(filtered, keys);
        downloadBlob(`budget-grid-${new Date().toISOString().slice(0, 10)}.csv`, csv);
    }, [table]);

    const totals = buildTotalsFromTable(table, ['amount']);
    const leafCols = table.getVisibleLeafColumns();

    return (
        <section style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <ToolbarFilters
                filters={columnFilters}
                setFilters={setColumnFilters}
                onClear={handleClearFilters}
                onExport={handleExportCsv}
                table={table}
            />

            <div
                ref={scrollRef}
                style={{
                    overflow: 'auto',
                    maxHeight: '70vh',
                    border: '1px solid var(--border, #ddd)',
                    borderRadius: 6,
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
                                                position: 'relative',
                                                background: 'var(--th-bg, #f8f8f8)',
                                                textAlign: 'left',
                                                fontWeight: 600,
                                                borderBottom: '1px solid #e5e5e5',
                                                padding: '8px 10px',
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
                                                borderBottom: '1px solid #f0f0f0',
                                                padding: '6px 10px',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                whiteSpace: 'nowrap',
                                            }}
                                        >
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </td>
                                    ))}
                                </tr>
                            )}
                        />
                    </tbody>

                    <tfoot>
                        <tr>
                            {leafCols.map((col, idx) => {
                                const isAmount = col.id === 'amount' || (col.columnDef.meta as any)?.isNumeric;
                                const content =
                                    col.id === 'amount'
                                        ? Intl.NumberFormat(undefined, { style: 'currency', currency: 'USD' }).format(totals.amount ?? 0)
                                        : (idx === 0 ? 'Totals' : '');

                                return (
                                    <td
                                        key={col.id}
                                        style={{
                                            borderTop: '2px solid #e5e5e5',
                                            fontWeight: 600,
                                            padding: '8px 10px',
                                            textAlign: isAmount ? 'right' : 'left',
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
