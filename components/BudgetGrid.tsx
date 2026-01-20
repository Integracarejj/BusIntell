
"use client";
/**
 * BudgetGrid.tsx — AG Grid Community (v35)
 * Default: ungrouped, unfiltered, CSS theme (Alpine)
 *
 * Notes:
 * - Community edition: no row grouping or set filter. We use Text filters and a flat table by default.
 * - Fixes Error #239 by explicitly setting theme="legacy" (you import CSS themes).
 * - Keeps: Editing, Bulk % change, Set Amount, CSV export, Pinned TOTAL (filtered).
 */

import React, { useCallback, useMemo, useRef, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import type {
    ColDef,
    GridApi,
    GridReadyEvent,
    CellValueChangedEvent,
    ValueParserParams,
    GetRowIdParams,
} from "ag-grid-community";

// CSS theme (legacy/CSS approach)
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

// ✅ Community only
import { ModuleRegistry, AllCommunityModule } from "ag-grid-community";
ModuleRegistry.registerModules([AllCommunityModule]);

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

type Props = { rows: BudgetLine[] };

// ---------- helpers ----------
const fmtUSD = (n: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);

const parseNumber = (v: unknown): number | null => {
    if (v === null || v === undefined) return null;
    if (typeof v === "number" && !Number.isNaN(v)) return v;
    const s = String(v).replace(/[$, ]+/g, "");
    const n = Number(s);
    return Number.isFinite(n) ? n : null;
};

export default function BudgetGrid({ rows }: Props) {
    const gridRef = useRef<AgGridReact<BudgetLine>>(null);
    const apiRef = useRef<GridApi | null>(null);

    const [rowData, setRowData] = useState<BudgetLine[]>(() => rows ?? []);

    // ---------- columns (Community) ----------
    const columnDefs = useMemo<ColDef<BudgetLine>[]>(() => {
        return [
            { headerName: "Community", field: "community", filter: "agTextColumnFilter", minWidth: 160 },
            { headerName: "Type", field: "type", filter: "agTextColumnFilter", width: 130 },
            { headerName: "Category", field: "category", filter: "agTextColumnFilter", minWidth: 160 },
            { headerName: "Subcategory", field: "subCategory", filter: "agTextColumnFilter", minWidth: 200 },
            { headerName: "Period", field: "period", filter: "agTextColumnFilter", width: 120 },
            { headerName: "GL Code", field: "glCode", filter: "agTextColumnFilter", width: 120 },
            { headerName: "Method", field: "budgetMethod", filter: "agTextColumnFilter", width: 180 },
            {
                headerName: "Driver",
                field: "driver",
                filter: "agTextColumnFilter",
                minWidth: 160,
                valueGetter: (p) => p.data?.driver ?? p.data?.driverTag ?? null,
            },
            {
                headerName: "Amount",
                field: "amount",
                type: "rightAligned",
                editable: true, // edit leaf rows
                valueParser: (params: ValueParserParams) => parseNumber(params.newValue),
                valueFormatter: (p) => (typeof p.value === "number" ? fmtUSD(p.value) : "—"),
                minWidth: 140,
            },
        ];
    }, []);

    const defaultColDef = useMemo<ColDef<BudgetLine>>(
        () => ({ sortable: true, resizable: true, filter: true, flex: 1, minWidth: 140 }),
        []
    );

    // ---------- toolbar state/actions ----------
    const [pctDelta, setPctDelta] = useState<string>("5"); // default +5%
    const [setValue, setSetValue] = useState<string>("");

    const recomputePinnedTotal = useCallback(() => {
        const api = apiRef.current;
        if (!api) return;

        let total = 0;
        // Sum displayed rows after filter/sort
        api.forEachNodeAfterFilterAndSort((node) => {
            const d = node.data as BudgetLine | undefined;
            if (d && typeof d.amount === "number") total += d.amount;
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

    const applyPercentToSelection = useCallback(() => {
        const api = apiRef.current;
        if (!api) return;

        const pct = Number(pctDelta);
        if (!Number.isFinite(pct)) return;
        const multiplier = 1 + pct / 100;

        const updated = [...rowData];
        const selected = api.getSelectedRows() as BudgetLine[];
        if (!selected.length) return;

        let touched = 0;
        for (const r of selected) {
            const idx = updated.indexOf(r);
            if (idx >= 0) {
                const current = updated[idx].amount ?? 0;
                const next = Math.round(current * multiplier);
                updated[idx] = { ...updated[idx], amount: next };
                touched++;
            }
        }
        if (touched > 0) {
            setRowData(updated);
            api.refreshCells({ force: true });
            recomputePinnedTotal();
        }
    }, [pctDelta, rowData, recomputePinnedTotal]);

    const setFixedAmountForSelection = useCallback(() => {
        const api = apiRef.current;
        if (!api) return;

        const nextVal = parseNumber(setValue);
        if (nextVal === null) return;

        const updated = [...rowData];
        const selected = api.getSelectedRows() as BudgetLine[];
        if (!selected.length) return;

        let touched = 0;
        for (const r of selected) {
            const idx = updated.indexOf(r);
            if (idx >= 0) {
                updated[idx] = { ...updated[idx], amount: nextVal };
                touched++;
            }
        }
        if (touched > 0) {
            setRowData(updated);
            api.refreshCells({ force: true });
            recomputePinnedTotal();
        }
    }, [setValue, rowData, recomputePinnedTotal]);

    const clearSelection = useCallback(() => apiRef.current?.deselectAll(), []);
    const exportCsv = useCallback(
        () =>
            apiRef.current?.exportDataAsCsv({
                fileName: "budget-grid.csv",
                processCellCallback: (p) => {
                    if (p.column.getColId() === "amount" && typeof p.value === "number") return p.value; // raw in CSV
                    return p.value ?? "";
                },
            }),
        []
    );

    // ---------- lifecycle ----------
    const onGridReady = useCallback(
        (e: GridReadyEvent) => {
            apiRef.current = e.api;
            e.api.autoSizeAllColumns?.(false);
            recomputePinnedTotal();
        },
        [recomputePinnedTotal]
    );

    const onModelUpdated = useCallback(recomputePinnedTotal, [recomputePinnedTotal]);
    const onFilterChanged = useCallback(recomputePinnedTotal, [recomputePinnedTotal]);

    const onCellValueChanged = useCallback(
        (_e: CellValueChangedEvent<BudgetLine>) => {
            // valueParser already normalized; just recompute total
            recomputePinnedTotal();
        },
        [recomputePinnedTotal]
    );

    const getRowId = useCallback((p: GetRowIdParams<BudgetLine>) => {
        const d = p.data!;
        return `${d.community ?? ""}${d.type ?? ""}${d.category ?? ""}${d.subCategory ?? ""}${d.period ?? ""}`;
    }, []);

    // ---------- render ----------
    return (
        <section aria-label="Budget grid" className="space-y-3">
            {/* Toolbar */}
            <div className="flex flex-wrap items-center gap-2 rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
                <div className="mr-3 text-sm font-semibold text-slate-700">Bulk Edit (selection)</div>

                <label className="sr-only" htmlFor="pct-input">Percent change</label>
                <input
                    id="pct-input"
                    aria-label="Percent change"
                    className="rounded-md border border-slate-300 px-2 py-1 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
                    type="number" step="0.1" value={pctDelta} onChange={(e) => setPctDelta(e.target.value)}
                    style={{ width: 90 }} placeholder="%"
                    title="Enter % and click Apply to adjust Amount for selected rows"
                />
                <button
                    type="button" onClick={applyPercentToSelection}
                    className="rounded-md bg-teal-600 px-3 py-1.5 text-sm font-medium text-white shadow hover:bg-teal-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
                    title="Apply % change to Amount on selected rows"
                >
                    Apply % Δ
                </button>

                <span className="mx-2 text-slate-300">|</span>

                <label className="sr-only" htmlFor="setamount-input">Set fixed amount</label>
                <input
                    id="setamount-input"
                    aria-label="Set fixed amount"
                    className="rounded-md border border-slate-300 px-2 py-1 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
                    type="number" step="1" value={setValue} onChange={(e) => setSetValue(e.target.value)}
                    style={{ width: 140 }} placeholder="Set amount ($)"
                    title="Set a fixed Amount on all selected rows"
                />
                <button
                    type="button" onClick={setFixedAmountForSelection}
                    className="rounded-md bg-slate-700 px-3 py-1.5 text-sm font-medium text-white shadow hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
                    title="Overwrite Amount on selected rows"
                >
                    Set Amount
                </button>

                <span className="mx-2 text-slate-300">|</span>

                <button
                    type="button" onClick={clearSelection}
                    className="rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
                >
                    Clear Selection
                </button>
                <button
                    type="button" onClick={exportCsv}
                    className="rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
                >
                    Export CSV
                </button>
            </div>

            {/* Grid */}
            <div className="ag-theme-alpine w-full" style={{ height: 720 }} aria-label="Budget AG Grid">
                <AgGridReact<BudgetLine>
                    ref={gridRef}
                    rowData={rowData}
                    columnDefs={columnDefs}
                    defaultColDef={defaultColDef}
                    suppressDragLeaveHidesColumns={true}
                    animateRows={true}
                    rowSelection="multiple"
                    onGridReady={onGridReady}
                    onModelUpdated={onModelUpdated}
                    onFilterChanged={onFilterChanged}
                    onCellValueChanged={onCellValueChanged}
                    getRowId={getRowId}
                    theme="legacy"   // ← Important: avoid Theming API/CSS conflict (Error #239)
                />
            </div>
        </section>
    );
}
