
"use client";

/**
 * BudgetGrid.tsx (AG Grid v35)
 * - Legacy theme (avoids Theming API clash) -> theme="legacy" + legacy CSS files
 * - Grouping: Community -> Type -> Category (shown in a single tree column labeled "Community")
 * - Sorting, Filtering, Resizing
 * - Inline editing for Amount
 * - Bulk edit toolbar: % delta or set fixed amount on selected rows
 * - Pinned bottom total (api.setGridOption('pinnedBottomRowData', ...))
 * - CSV export
 */

import React, { useCallback, useMemo, useRef, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import type {
    ColDef,
    GridApi,
    GridReadyEvent,
    CellValueChangedEvent,
    ValueParserParams,
    IRowNode,
    ApplyColumnStateParams,
    ColumnState,
    GetRowIdParams,
} from "ag-grid-community";

// ---- Legacy CSS (we're explicitly using legacy theme to avoid the v33+ Theming API) ----
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

// ---- REQUIRED in v35+ (modular build): register the community features ----
import { ModuleRegistry, AllCommunityModule } from "ag-grid-community";
ModuleRegistry.registerModules([AllCommunityModule]);

// ----------------------- Types -----------------------
export type BudgetLine = {
    type: "revenue" | "expense";
    community: string;
    category: string;
    subCategory?: string | null;
    budgetMethod?: string | null;
    driver?: string | null;
    driverTag?: string | null;
    glCode?: string | null;
    period?: string | number | null; // "YYYY-MM" or "YYYY"
    amount?: number | null;
};

type Props = {
    rows: BudgetLine[];
};

// ----------------------- Helpers -----------------------
const fmtUSD = (n: number) =>
    new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
    }).format(n);

const parseNumber = (v: unknown): number | null => {
    if (v === null || v === undefined) return null;
    if (typeof v === "number" && !Number.isNaN(v)) return v;
    const s = String(v).replace(/[$, ]+/g, "");
    const n = Number(s);
    return Number.isFinite(n) ? n : null;
};

const isLeafRow = (node: IRowNode | null) => !!node && !node.group;

// ----------------------- Component -----------------------
export default function BudgetGrid({ rows }: Props) {
    const gridRef = useRef<AgGridReact<BudgetLine>>(null);
    const apiRef = useRef<GridApi | null>(null);

    // Local copy so we can mutate on edits/bulk operations
    const [rowData, setRowData] = useState<BudgetLine[]>(() => rows ?? []);
    const [groupOrderA, setGroupOrderA] = useState<boolean>(true); // A: community->type->category

    // ----------------------- Column Definitions -----------------------
    const columnDefs = useMemo<ColDef<BudgetLine>[]>(() => {
        return [
            // Group keys (hidden in data columns; shown via single-column tree)
            {
                headerName: "Community",
                field: "community",
                rowGroup: true,
                hide: true, // grouped; displayed via the auto group column
                filter: "agSetColumnFilter",
            },
            {
                headerName: "Type",
                field: "type",
                rowGroup: true,
                hide: true,
                filter: "agSetColumnFilter",
            },
            {
                headerName: "Category",
                field: "category",
                rowGroup: true,
                hide: true,
                filter: "agSetColumnFilter",
            },

            // Visible columns
            {
                headerName: "Subcategory",
                field: "subCategory",
                filter: "agTextColumnFilter",
                minWidth: 200,
            },
            {
                headerName: "Period",
                field: "period",
                filter: "agTextColumnFilter",
                width: 120,
            },
            {
                headerName: "GL Code",
                field: "glCode",
                filter: "agTextColumnFilter",
                width: 120,
            },
            {
                headerName: "Method",
                field: "budgetMethod",
                filter: "agSetColumnFilter",
                width: 180,
            },
            {
                headerName: "Driver",
                field: "driver",
                filter: "agTextColumnFilter",
                minWidth: 160,
                valueGetter: (p) => p.data?.driver ?? p.data?.driverTag ?? null,
            },

            // Amount (editable + aggregated)
            {
                headerName: "Amount",
                field: "amount",
                type: "rightAligned",
                editable: (p) => isLeafRow(p.node),
                valueParser: (params: ValueParserParams) => parseNumber(params.newValue),
                valueFormatter: (p) =>
                    typeof p.value === "number" ? fmtUSD(p.value) : "—",
                aggFunc: "sum",
                minWidth: 140,
            },
        ];
    }, []);

    const defaultColDef = useMemo<ColDef<BudgetLine>>(
        () => ({
            sortable: true,
            resizable: true,
            filter: true,
            flex: 1,
            minWidth: 140,
        }),
        []
    );

    // Single tree column that shows the group path (Community -> Type -> Category)
    const autoGroupColumnDef = useMemo<ColDef<BudgetLine>>(
        () => ({
            headerName: "Community",
            minWidth: 260,
            cellRendererParams: {
                suppressCount: false,
            },
        }),
        []
    );

    // ----------------------- Toolbar State/Actions -----------------------
    const [pctDelta, setPctDelta] = useState<string>("5"); // default +5%
    const [setValue, setSetValue] = useState<string>("");

    const applyPercentToSelection = useCallback(() => {
        const api = apiRef.current;
        if (!api) return;
        const pct = Number(pctDelta);
        if (!Number.isFinite(pct)) return;

        const multiplier = 1 + pct / 100;
        const updated: BudgetLine[] = [...rowData];
        const idSet = new Set<number>();

        api.getSelectedNodes().forEach((node) => {
            if (!isLeafRow(node)) return;
            const idx = node.rowIndex ?? -1;
            if (idx < 0 || !updated[idx]) return;
            const current = updated[idx].amount ?? 0;
            const next = Math.round(current * multiplier);
            updated[idx] = { ...updated[idx], amount: next };
            idSet.add(idx);
        });

        if (idSet.size > 0) {
            setRowData(updated);
            api.refreshCells({ force: true });
            recomputePinnedTotal();
        }
    }, [pctDelta, rowData]);

    const setFixedAmountForSelection = useCallback(() => {
        const api = apiRef.current;
        if (!api) return;

        const nextVal = parseNumber(setValue);
        if (nextVal === null) return;

        const updated: BudgetLine[] = [...rowData];
        const idSet = new Set<number>();

        api.getSelectedNodes().forEach((node) => {
            if (!isLeafRow(node)) return;
            const idx = node.rowIndex ?? -1;
            if (idx < 0 || !updated[idx]) return;
            updated[idx] = { ...updated[idx], amount: nextVal };
            idSet.add(idx);
        });

        if (idSet.size > 0) {
            setRowData(updated);
            api.refreshCells({ force: true });
            recomputePinnedTotal();
        }
    }, [setValue, rowData]);

    const clearSelection = useCallback(() => {
        apiRef.current?.deselectAll();
    }, []);

    const exportCsv = useCallback(() => {
        apiRef.current?.exportDataAsCsv({
            fileName: "budget-grid.csv",
            processCellCallback: (p) => {
                if (p.column.getColId() === "amount" && typeof p.value === "number") {
                    return p.value; // raw number in CSV, not $-formatted
                }
                return p.value ?? "";
            },
        });
    }, []);

    const toggleGroupOrder = useCallback(() => {
        const api = apiRef.current;
        if (!api) return;

        const asA = groupOrderA; // current state: A or B

        // A) community -> type -> category
        const orderA: ColumnState[] = [
            { colId: "community", rowGroup: true, rowGroupIndex: 0 },
            { colId: "type", rowGroup: true, rowGroupIndex: 1 },
            { colId: "category", rowGroup: true, rowGroupIndex: 2 },
        ];
        // B) type -> community -> category
        const orderB: ColumnState[] = [
            { colId: "type", rowGroup: true, rowGroupIndex: 0 },
            { colId: "community", rowGroup: true, rowGroupIndex: 1 },
            { colId: "category", rowGroup: true, rowGroupIndex: 2 },
        ];

        const params: ApplyColumnStateParams = {
            state: asA ? orderB : orderA,
            defaultState: { rowGroup: false, rowGroupIndex: null },
        };

        api.applyColumnState(params);
        setGroupOrderA(!asA);
    }, [groupOrderA]);

    // ----------------------- Grid Lifecycle -----------------------
    const recomputePinnedTotal = useCallback(() => {
        const api = apiRef.current;
        if (!api) return;

        let total = 0;
        // Only sum leaf displayed nodes (respects filters)
        api.forEachLeafNode((node) => {
            if (node.displayed && node.data && typeof node.data.amount === "number") {
                total += node.data.amount;
            }
        });

        api.setGridOption("pinnedBottomRowData", [
            {
                community: "",
                type: "",
                category: "",
                subCategory: "TOTAL (filtered)",
                period: "",
                glCode: "",
                budgetMethod: "",
                driver: "",
                driverTag: "",
                amount: total,
            } as unknown as BudgetLine,
        ]);
    }, []);

    const onGridReady = useCallback((e: GridReadyEvent) => {
        apiRef.current = e.api;
        // Grouping defined via colDefs (rowGroup: true on hidden key columns)
        // Auto-size visible columns
        e.api.autoSizeAllColumns?.(false);
        recomputePinnedTotal();
    }, [recomputePinnedTotal]);

    const onModelUpdated = useCallback(() => {
        recomputePinnedTotal();
    }, [recomputePinnedTotal]);

    const onFilterChanged = useCallback(() => {
        recomputePinnedTotal();
    }, [recomputePinnedTotal]);

    const onCellValueChanged = useCallback((e: CellValueChangedEvent<BudgetLine>) => {
        const idx = e.node.rowIndex ?? -1;
        if (idx >= 0) {
            setRowData((prev) => {
                if (!prev[idx]) return prev;
                const next = [...prev];
                next[idx] = { ...next[idx], amount: parseNumber(e.newValue) ?? 0 };
                return next;
            });
            recomputePinnedTotal();
        }
    }, [recomputePinnedTotal]);

    const getRowId = useCallback((p: GetRowIdParams<BudgetLine>) => {
        const d = p.data!;
        return `${d.community ?? ""}|${d.type ?? ""}|${d.category ?? ""}|${d.subCategory ?? ""}|${d.period ?? ""}`;
    }, []);

    // ----------------------- Render -----------------------
    return (
        <section aria-label="Budget grid" className="space-y-3">
            {/* Toolbar */}
            <div className="flex flex-wrap items-center gap-2 rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
                <div className="mr-3 text-sm font-semibold text-slate-700">
                    Bulk Edit (selection)
                </div>

                <label className="sr-only" htmlFor="pct-input">
                    Percent change
                </label>
                <input
                    id="pct-input"
                    aria-label="Percent change"
                    className="rounded-md border border-slate-300 px-2 py-1 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
                    type="number"
                    step="0.1"
                    value={pctDelta}
                    onChange={(e) => setPctDelta(e.target.value)}
                    style={{ width: 90 }}
                    placeholder="%"
                />
                <button
                    type="button"
                    aria-label="Apply percent change to selected rows"
                    onClick={applyPercentToSelection}
                    className="rounded-md bg-teal-600 px-3 py-1.5 text-sm font-medium text-white shadow hover:bg-teal-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
                >
                    Apply % Δ
                </button>

                <span className="mx-2 text-slate-300">|</span>

                <label className="sr-only" htmlFor="setamount-input">
                    Set fixed amount
                </label>
                <input
                    id="setamount-input"
                    aria-label="Set fixed amount"
                    className="rounded-md border border-slate-300 px-2 py-1 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
                    type="number"
                    step="1"
                    value={setValue}
                    onChange={(e) => setSetValue(e.target.value)}
                    style={{ width: 140 }}
                    placeholder="Set amount ($)"
                />
                <button
                    type="button"
                    aria-label="Set fixed amount on selected rows"
                    onClick={setFixedAmountForSelection}
                    className="rounded-md bg-slate-700 px-3 py-1.5 text-sm font-medium text-white shadow hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
                >
                    Set Amount
                </button>

                <span className="mx-2 text-slate-300">|</span>

                <button
                    type="button"
                    aria-label="Clear selection"
                    onClick={clearSelection}
                    className="rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
                >
                    Clear Selection
                </button>

                <button
                    type="button"
                    aria-label="Export to CSV"
                    onClick={exportCsv}
                    className="rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
                >
                    Export CSV
                </button>

                <button
                    type="button"
                    aria-label="Toggle group order"
                    onClick={toggleGroupOrder}
                    className="rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
                >
                    Toggle Group Order
                </button>
            </div>

            {/* Grid */}
            <div
                className="ag-theme-alpine w-full"
                style={{ height: 720 }}
                aria-label="Budget AG Grid"
            >
                <AgGridReact<BudgetLine>
                    ref={gridRef}
                    rowData={rowData}
                    columnDefs={columnDefs}
                    defaultColDef={defaultColDef}
                    autoGroupColumnDef={autoGroupColumnDef}
                    // 👇 single tree column shows Community -> Type -> Category
                    groupDisplayType="singleColumn"
                    suppressDragLeaveHidesColumns={true}
                    animateRows={true}
                    // NOTE: enableRangeSelection removed (Enterprise module)
                    rowSelection="multiple"
                    onGridReady={onGridReady}
                    onModelUpdated={onModelUpdated}
                    onFilterChanged={onFilterChanged}
                    onCellValueChanged={onCellValueChanged}
                    getRowId={getRowId}
                    // 👇 Force legacy theme so legacy CSS is valid and no theming clash occurs
                    theme="legacy"
                />
            </div>
        </section>
    );
}
