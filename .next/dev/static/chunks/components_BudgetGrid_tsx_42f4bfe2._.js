(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/components/BudgetGrid.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>BudgetGrid
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
/**
 * BudgetGrid.tsx — AG Grid Community (v35)
 * Default: ungrouped, unfiltered, CSS theme (Alpine)
 *
 * Notes:
 * - Community edition: no row grouping or set filter. We use Text filters and a flat table by default.
 * - Fixes Error #239 by explicitly setting theme="legacy" (you import CSS themes).
 * - Keeps: Editing, Bulk % change, Set Amount, CSV export, Pinned TOTAL (filtered).
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$ag$2d$grid$2d$react$2f$dist$2f$package$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/ag-grid-react/dist/package/index.esm.mjs [app-client] (ecmascript)");
// ✅ Community only
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$ag$2d$grid$2d$community$2f$dist$2f$package$2f$main$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/ag-grid-community/dist/package/main.esm.mjs [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$ag$2d$grid$2d$community$2f$dist$2f$package$2f$main$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ModuleRegistry"].registerModules([
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$ag$2d$grid$2d$community$2f$dist$2f$package$2f$main$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AllCommunityModule"]
]);
// ---------- helpers ----------
const fmtUSD = (n)=>new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0
    }).format(n);
const parseNumber = (v)=>{
    if (v === null || v === undefined) return null;
    if (typeof v === "number" && !Number.isNaN(v)) return v;
    const s = String(v).replace(/[$, ]+/g, "");
    const n = Number(s);
    return Number.isFinite(n) ? n : null;
};
function BudgetGrid({ rows }) {
    _s();
    const gridRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const apiRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [rowData, setRowData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "BudgetGrid.useState": ()=>rows ?? []
    }["BudgetGrid.useState"]);
    // ---------- columns (Community) ----------
    const columnDefs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "BudgetGrid.useMemo[columnDefs]": ()=>{
            return [
                {
                    headerName: "Community",
                    field: "community",
                    filter: "agTextColumnFilter",
                    minWidth: 160
                },
                {
                    headerName: "Type",
                    field: "type",
                    filter: "agTextColumnFilter",
                    width: 130
                },
                {
                    headerName: "Category",
                    field: "category",
                    filter: "agTextColumnFilter",
                    minWidth: 160
                },
                {
                    headerName: "Subcategory",
                    field: "subCategory",
                    filter: "agTextColumnFilter",
                    minWidth: 200
                },
                {
                    headerName: "Period",
                    field: "period",
                    filter: "agTextColumnFilter",
                    width: 120
                },
                {
                    headerName: "GL Code",
                    field: "glCode",
                    filter: "agTextColumnFilter",
                    width: 120
                },
                {
                    headerName: "Method",
                    field: "budgetMethod",
                    filter: "agTextColumnFilter",
                    width: 180
                },
                {
                    headerName: "Driver",
                    field: "driver",
                    filter: "agTextColumnFilter",
                    minWidth: 160,
                    valueGetter: {
                        "BudgetGrid.useMemo[columnDefs]": (p)=>p.data?.driver ?? p.data?.driverTag ?? null
                    }["BudgetGrid.useMemo[columnDefs]"]
                },
                {
                    headerName: "Amount",
                    field: "amount",
                    type: "rightAligned",
                    editable: true,
                    valueParser: {
                        "BudgetGrid.useMemo[columnDefs]": (params)=>parseNumber(params.newValue)
                    }["BudgetGrid.useMemo[columnDefs]"],
                    valueFormatter: {
                        "BudgetGrid.useMemo[columnDefs]": (p)=>typeof p.value === "number" ? fmtUSD(p.value) : "—"
                    }["BudgetGrid.useMemo[columnDefs]"],
                    minWidth: 140
                }
            ];
        }
    }["BudgetGrid.useMemo[columnDefs]"], []);
    const defaultColDef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "BudgetGrid.useMemo[defaultColDef]": ()=>({
                sortable: true,
                resizable: true,
                filter: true,
                flex: 1,
                minWidth: 140
            })
    }["BudgetGrid.useMemo[defaultColDef]"], []);
    // ---------- toolbar state/actions ----------
    const [pctDelta, setPctDelta] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("5"); // default +5%
    const [setValue, setSetValue] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const recomputePinnedTotal = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "BudgetGrid.useCallback[recomputePinnedTotal]": ()=>{
            const api = apiRef.current;
            if (!api) return;
            let total = 0;
            // Sum displayed rows after filter/sort
            api.forEachNodeAfterFilterAndSort({
                "BudgetGrid.useCallback[recomputePinnedTotal]": (node)=>{
                    const d = node.data;
                    if (d && typeof d.amount === "number") total += d.amount;
                }
            }["BudgetGrid.useCallback[recomputePinnedTotal]"]);
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
                    amount: total
                }
            ]);
        }
    }["BudgetGrid.useCallback[recomputePinnedTotal]"], []);
    const applyPercentToSelection = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "BudgetGrid.useCallback[applyPercentToSelection]": ()=>{
            const api = apiRef.current;
            if (!api) return;
            const pct = Number(pctDelta);
            if (!Number.isFinite(pct)) return;
            const multiplier = 1 + pct / 100;
            const updated = [
                ...rowData
            ];
            const selected = api.getSelectedRows();
            if (!selected.length) return;
            let touched = 0;
            for (const r of selected){
                const idx = updated.indexOf(r);
                if (idx >= 0) {
                    const current = updated[idx].amount ?? 0;
                    const next = Math.round(current * multiplier);
                    updated[idx] = {
                        ...updated[idx],
                        amount: next
                    };
                    touched++;
                }
            }
            if (touched > 0) {
                setRowData(updated);
                api.refreshCells({
                    force: true
                });
                recomputePinnedTotal();
            }
        }
    }["BudgetGrid.useCallback[applyPercentToSelection]"], [
        pctDelta,
        rowData,
        recomputePinnedTotal
    ]);
    const setFixedAmountForSelection = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "BudgetGrid.useCallback[setFixedAmountForSelection]": ()=>{
            const api = apiRef.current;
            if (!api) return;
            const nextVal = parseNumber(setValue);
            if (nextVal === null) return;
            const updated = [
                ...rowData
            ];
            const selected = api.getSelectedRows();
            if (!selected.length) return;
            let touched = 0;
            for (const r of selected){
                const idx = updated.indexOf(r);
                if (idx >= 0) {
                    updated[idx] = {
                        ...updated[idx],
                        amount: nextVal
                    };
                    touched++;
                }
            }
            if (touched > 0) {
                setRowData(updated);
                api.refreshCells({
                    force: true
                });
                recomputePinnedTotal();
            }
        }
    }["BudgetGrid.useCallback[setFixedAmountForSelection]"], [
        setValue,
        rowData,
        recomputePinnedTotal
    ]);
    const clearSelection = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "BudgetGrid.useCallback[clearSelection]": ()=>apiRef.current?.deselectAll()
    }["BudgetGrid.useCallback[clearSelection]"], []);
    const exportCsv = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "BudgetGrid.useCallback[exportCsv]": ()=>apiRef.current?.exportDataAsCsv({
                fileName: "budget-grid.csv",
                processCellCallback: {
                    "BudgetGrid.useCallback[exportCsv]": (p)=>{
                        if (p.column.getColId() === "amount" && typeof p.value === "number") return p.value; // raw in CSV
                        return p.value ?? "";
                    }
                }["BudgetGrid.useCallback[exportCsv]"]
            })
    }["BudgetGrid.useCallback[exportCsv]"], []);
    // ---------- lifecycle ----------
    const onGridReady = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "BudgetGrid.useCallback[onGridReady]": (e)=>{
            apiRef.current = e.api;
            e.api.autoSizeAllColumns?.(false);
            recomputePinnedTotal();
        }
    }["BudgetGrid.useCallback[onGridReady]"], [
        recomputePinnedTotal
    ]);
    const onModelUpdated = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])(recomputePinnedTotal, [
        recomputePinnedTotal
    ]);
    const onFilterChanged = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])(recomputePinnedTotal, [
        recomputePinnedTotal
    ]);
    const onCellValueChanged = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "BudgetGrid.useCallback[onCellValueChanged]": (_e)=>{
            // valueParser already normalized; just recompute total
            recomputePinnedTotal();
        }
    }["BudgetGrid.useCallback[onCellValueChanged]"], [
        recomputePinnedTotal
    ]);
    const getRowId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "BudgetGrid.useCallback[getRowId]": (p)=>{
            const d = p.data;
            return `${d.community ?? ""}${d.type ?? ""}${d.category ?? ""}${d.subCategory ?? ""}${d.period ?? ""}`;
        }
    }["BudgetGrid.useCallback[getRowId]"], []);
    // ---------- render ----------
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        "aria-label": "Budget grid",
        className: "space-y-3",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-wrap items-center gap-2 rounded-xl border border-slate-200 bg-white p-3 shadow-sm",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mr-3 text-sm font-semibold text-slate-700",
                        children: "Bulk Edit (selection)"
                    }, void 0, false, {
                        fileName: "[project]/components/BudgetGrid.tsx",
                        lineNumber: 229,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "sr-only",
                        htmlFor: "pct-input",
                        children: "Percent change"
                    }, void 0, false, {
                        fileName: "[project]/components/BudgetGrid.tsx",
                        lineNumber: 231,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        id: "pct-input",
                        "aria-label": "Percent change",
                        className: "rounded-md border border-slate-300 px-2 py-1 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500",
                        type: "number",
                        step: "0.1",
                        value: pctDelta,
                        onChange: (e)=>setPctDelta(e.target.value),
                        style: {
                            width: 90
                        },
                        placeholder: "%",
                        title: "Enter % and click Apply to adjust Amount for selected rows"
                    }, void 0, false, {
                        fileName: "[project]/components/BudgetGrid.tsx",
                        lineNumber: 232,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: applyPercentToSelection,
                        className: "rounded-md bg-teal-600 px-3 py-1.5 text-sm font-medium text-white shadow hover:bg-teal-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500",
                        title: "Apply % change to Amount on selected rows",
                        children: "Apply % Δ"
                    }, void 0, false, {
                        fileName: "[project]/components/BudgetGrid.tsx",
                        lineNumber: 240,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "mx-2 text-slate-300",
                        children: "|"
                    }, void 0, false, {
                        fileName: "[project]/components/BudgetGrid.tsx",
                        lineNumber: 248,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "sr-only",
                        htmlFor: "setamount-input",
                        children: "Set fixed amount"
                    }, void 0, false, {
                        fileName: "[project]/components/BudgetGrid.tsx",
                        lineNumber: 250,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        id: "setamount-input",
                        "aria-label": "Set fixed amount",
                        className: "rounded-md border border-slate-300 px-2 py-1 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500",
                        type: "number",
                        step: "1",
                        value: setValue,
                        onChange: (e)=>setSetValue(e.target.value),
                        style: {
                            width: 140
                        },
                        placeholder: "Set amount ($)",
                        title: "Set a fixed Amount on all selected rows"
                    }, void 0, false, {
                        fileName: "[project]/components/BudgetGrid.tsx",
                        lineNumber: 251,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: setFixedAmountForSelection,
                        className: "rounded-md bg-slate-700 px-3 py-1.5 text-sm font-medium text-white shadow hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500",
                        title: "Overwrite Amount on selected rows",
                        children: "Set Amount"
                    }, void 0, false, {
                        fileName: "[project]/components/BudgetGrid.tsx",
                        lineNumber: 259,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "mx-2 text-slate-300",
                        children: "|"
                    }, void 0, false, {
                        fileName: "[project]/components/BudgetGrid.tsx",
                        lineNumber: 267,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: clearSelection,
                        className: "rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500",
                        children: "Clear Selection"
                    }, void 0, false, {
                        fileName: "[project]/components/BudgetGrid.tsx",
                        lineNumber: 269,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: exportCsv,
                        className: "rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500",
                        children: "Export CSV"
                    }, void 0, false, {
                        fileName: "[project]/components/BudgetGrid.tsx",
                        lineNumber: 275,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/BudgetGrid.tsx",
                lineNumber: 228,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "ag-theme-alpine w-full",
                style: {
                    height: 720
                },
                "aria-label": "Budget AG Grid",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$ag$2d$grid$2d$react$2f$dist$2f$package$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AgGridReact"], {
                    ref: gridRef,
                    rowData: rowData,
                    columnDefs: columnDefs,
                    defaultColDef: defaultColDef,
                    suppressDragLeaveHidesColumns: true,
                    animateRows: true,
                    rowSelection: "multiple",
                    onGridReady: onGridReady,
                    onModelUpdated: onModelUpdated,
                    onFilterChanged: onFilterChanged,
                    onCellValueChanged: onCellValueChanged,
                    getRowId: getRowId,
                    theme: "legacy"
                }, void 0, false, {
                    fileName: "[project]/components/BudgetGrid.tsx",
                    lineNumber: 285,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/BudgetGrid.tsx",
                lineNumber: 284,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/BudgetGrid.tsx",
        lineNumber: 226,
        columnNumber: 9
    }, this);
}
_s(BudgetGrid, "WxRO4T97jRVqYJkfjfexhIVrOJY=");
_c = BudgetGrid;
var _c;
__turbopack_context__.k.register(_c, "BudgetGrid");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=components_BudgetGrid_tsx_42f4bfe2._.js.map