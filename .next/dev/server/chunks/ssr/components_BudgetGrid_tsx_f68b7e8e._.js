module.exports = [
"[project]/components/BudgetGrid.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>BudgetGrid
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
/**
 * BudgetGrid.tsx (AG Grid v35)
 * - Legacy theme (avoids Theming API clash) -> theme="legacy" + legacy CSS files
 * - Grouping: Community -> Type -> Category (shown in a single tree column labeled "Community")
 * - Sorting, Filtering, Resizing
 * - Inline editing for Amount
 * - Bulk edit toolbar: % delta or set fixed amount on selected rows
 * - Pinned bottom total (api.setGridOption('pinnedBottomRowData', ...))
 * - CSV export
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$ag$2d$grid$2d$react$2f$dist$2f$package$2f$index$2e$esm$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/ag-grid-react/dist/package/index.esm.mjs [app-ssr] (ecmascript)");
// ---- REQUIRED in v35+ (modular build): register the community features ----
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$ag$2d$grid$2d$community$2f$dist$2f$package$2f$main$2e$esm$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/ag-grid-community/dist/package/main.esm.mjs [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$ag$2d$grid$2d$community$2f$dist$2f$package$2f$main$2e$esm$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ModuleRegistry"].registerModules([
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$ag$2d$grid$2d$community$2f$dist$2f$package$2f$main$2e$esm$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AllCommunityModule"]
]);
// ----------------------- Helpers -----------------------
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
const isLeafRow = (node)=>!!node && !node.group;
function BudgetGrid({ rows }) {
    const gridRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const apiRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Local copy so we can mutate on edits/bulk operations
    const [rowData, setRowData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(()=>rows ?? []);
    const [groupOrderA, setGroupOrderA] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true); // A: community->type->category
    // ----------------------- Column Definitions -----------------------
    const columnDefs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        return [
            // Group keys (hidden in data columns; shown via single-column tree)
            {
                headerName: "Community",
                field: "community",
                rowGroup: true,
                hide: true,
                filter: "agSetColumnFilter"
            },
            {
                headerName: "Type",
                field: "type",
                rowGroup: true,
                hide: true,
                filter: "agSetColumnFilter"
            },
            {
                headerName: "Category",
                field: "category",
                rowGroup: true,
                hide: true,
                filter: "agSetColumnFilter"
            },
            // Visible columns
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
                filter: "agSetColumnFilter",
                width: 180
            },
            {
                headerName: "Driver",
                field: "driver",
                filter: "agTextColumnFilter",
                minWidth: 160,
                valueGetter: (p)=>p.data?.driver ?? p.data?.driverTag ?? null
            },
            // Amount (editable + aggregated)
            {
                headerName: "Amount",
                field: "amount",
                type: "rightAligned",
                editable: (p)=>isLeafRow(p.node),
                valueParser: (params)=>parseNumber(params.newValue),
                valueFormatter: (p)=>typeof p.value === "number" ? fmtUSD(p.value) : "—",
                aggFunc: "sum",
                minWidth: 140
            }
        ];
    }, []);
    const defaultColDef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>({
            sortable: true,
            resizable: true,
            filter: true,
            flex: 1,
            minWidth: 140
        }), []);
    // Single tree column that shows the group path (Community -> Type -> Category)
    const autoGroupColumnDef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>({
            headerName: "Community",
            minWidth: 260,
            cellRendererParams: {
                suppressCount: false
            }
        }), []);
    // ----------------------- Toolbar State/Actions -----------------------
    const [pctDelta, setPctDelta] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("5"); // default +5%
    const [setValue, setSetValue] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const applyPercentToSelection = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        const api = apiRef.current;
        if (!api) return;
        const pct = Number(pctDelta);
        if (!Number.isFinite(pct)) return;
        const multiplier = 1 + pct / 100;
        const updated = [
            ...rowData
        ];
        const idSet = new Set();
        api.getSelectedNodes().forEach((node)=>{
            if (!isLeafRow(node)) return;
            const idx = node.rowIndex ?? -1;
            if (idx < 0 || !updated[idx]) return;
            const current = updated[idx].amount ?? 0;
            const next = Math.round(current * multiplier);
            updated[idx] = {
                ...updated[idx],
                amount: next
            };
            idSet.add(idx);
        });
        if (idSet.size > 0) {
            setRowData(updated);
            api.refreshCells({
                force: true
            });
            recomputePinnedTotal();
        }
    }, [
        pctDelta,
        rowData
    ]);
    const setFixedAmountForSelection = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        const api = apiRef.current;
        if (!api) return;
        const nextVal = parseNumber(setValue);
        if (nextVal === null) return;
        const updated = [
            ...rowData
        ];
        const idSet = new Set();
        api.getSelectedNodes().forEach((node)=>{
            if (!isLeafRow(node)) return;
            const idx = node.rowIndex ?? -1;
            if (idx < 0 || !updated[idx]) return;
            updated[idx] = {
                ...updated[idx],
                amount: nextVal
            };
            idSet.add(idx);
        });
        if (idSet.size > 0) {
            setRowData(updated);
            api.refreshCells({
                force: true
            });
            recomputePinnedTotal();
        }
    }, [
        setValue,
        rowData
    ]);
    const clearSelection = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        apiRef.current?.deselectAll();
    }, []);
    const exportCsv = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        apiRef.current?.exportDataAsCsv({
            fileName: "budget-grid.csv",
            processCellCallback: (p)=>{
                if (p.column.getColId() === "amount" && typeof p.value === "number") {
                    return p.value; // raw number in CSV, not $-formatted
                }
                return p.value ?? "";
            }
        });
    }, []);
    const toggleGroupOrder = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        const api = apiRef.current;
        if (!api) return;
        const asA = groupOrderA; // current state: A or B
        // A) community -> type -> category
        const orderA = [
            {
                colId: "community",
                rowGroup: true,
                rowGroupIndex: 0
            },
            {
                colId: "type",
                rowGroup: true,
                rowGroupIndex: 1
            },
            {
                colId: "category",
                rowGroup: true,
                rowGroupIndex: 2
            }
        ];
        // B) type -> community -> category
        const orderB = [
            {
                colId: "type",
                rowGroup: true,
                rowGroupIndex: 0
            },
            {
                colId: "community",
                rowGroup: true,
                rowGroupIndex: 1
            },
            {
                colId: "category",
                rowGroup: true,
                rowGroupIndex: 2
            }
        ];
        const params = {
            state: asA ? orderB : orderA,
            defaultState: {
                rowGroup: false,
                rowGroupIndex: null
            }
        };
        api.applyColumnState(params);
        setGroupOrderA(!asA);
    }, [
        groupOrderA
    ]);
    // ----------------------- Grid Lifecycle -----------------------
    const recomputePinnedTotal = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        const api = apiRef.current;
        if (!api) return;
        let total = 0;
        // Only sum leaf displayed nodes (respects filters)
        api.forEachLeafNode((node)=>{
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
                amount: total
            }
        ]);
    }, []);
    const onGridReady = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((e)=>{
        apiRef.current = e.api;
        // Grouping defined via colDefs (rowGroup: true on hidden key columns)
        // Auto-size visible columns
        e.api.autoSizeAllColumns?.(false);
        recomputePinnedTotal();
    }, [
        recomputePinnedTotal
    ]);
    const onModelUpdated = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        recomputePinnedTotal();
    }, [
        recomputePinnedTotal
    ]);
    const onFilterChanged = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        recomputePinnedTotal();
    }, [
        recomputePinnedTotal
    ]);
    const onCellValueChanged = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((e)=>{
        const idx = e.node.rowIndex ?? -1;
        if (idx >= 0) {
            setRowData((prev)=>{
                if (!prev[idx]) return prev;
                const next = [
                    ...prev
                ];
                next[idx] = {
                    ...next[idx],
                    amount: parseNumber(e.newValue) ?? 0
                };
                return next;
            });
            recomputePinnedTotal();
        }
    }, [
        recomputePinnedTotal
    ]);
    const getRowId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((p)=>{
        const d = p.data;
        return `${d.community ?? ""}|${d.type ?? ""}|${d.category ?? ""}|${d.subCategory ?? ""}|${d.period ?? ""}`;
    }, []);
    // ----------------------- Render -----------------------
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        "aria-label": "Budget grid",
        className: "space-y-3",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-wrap items-center gap-2 rounded-xl border border-slate-200 bg-white p-3 shadow-sm",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mr-3 text-sm font-semibold text-slate-700",
                        children: "Bulk Edit (selection)"
                    }, void 0, false, {
                        fileName: "[project]/components/BudgetGrid.tsx",
                        lineNumber: 347,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "sr-only",
                        htmlFor: "pct-input",
                        children: "Percent change"
                    }, void 0, false, {
                        fileName: "[project]/components/BudgetGrid.tsx",
                        lineNumber: 351,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
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
                        placeholder: "%"
                    }, void 0, false, {
                        fileName: "[project]/components/BudgetGrid.tsx",
                        lineNumber: 354,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        "aria-label": "Apply percent change to selected rows",
                        onClick: applyPercentToSelection,
                        className: "rounded-md bg-teal-600 px-3 py-1.5 text-sm font-medium text-white shadow hover:bg-teal-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500",
                        children: "Apply % Δ"
                    }, void 0, false, {
                        fileName: "[project]/components/BudgetGrid.tsx",
                        lineNumber: 365,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "mx-2 text-slate-300",
                        children: "|"
                    }, void 0, false, {
                        fileName: "[project]/components/BudgetGrid.tsx",
                        lineNumber: 374,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "sr-only",
                        htmlFor: "setamount-input",
                        children: "Set fixed amount"
                    }, void 0, false, {
                        fileName: "[project]/components/BudgetGrid.tsx",
                        lineNumber: 376,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
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
                        placeholder: "Set amount ($)"
                    }, void 0, false, {
                        fileName: "[project]/components/BudgetGrid.tsx",
                        lineNumber: 379,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        "aria-label": "Set fixed amount on selected rows",
                        onClick: setFixedAmountForSelection,
                        className: "rounded-md bg-slate-700 px-3 py-1.5 text-sm font-medium text-white shadow hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500",
                        children: "Set Amount"
                    }, void 0, false, {
                        fileName: "[project]/components/BudgetGrid.tsx",
                        lineNumber: 390,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "mx-2 text-slate-300",
                        children: "|"
                    }, void 0, false, {
                        fileName: "[project]/components/BudgetGrid.tsx",
                        lineNumber: 399,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        "aria-label": "Clear selection",
                        onClick: clearSelection,
                        className: "rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500",
                        children: "Clear Selection"
                    }, void 0, false, {
                        fileName: "[project]/components/BudgetGrid.tsx",
                        lineNumber: 401,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        "aria-label": "Export to CSV",
                        onClick: exportCsv,
                        className: "rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500",
                        children: "Export CSV"
                    }, void 0, false, {
                        fileName: "[project]/components/BudgetGrid.tsx",
                        lineNumber: 410,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        "aria-label": "Toggle group order",
                        onClick: toggleGroupOrder,
                        className: "rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500",
                        children: "Toggle Group Order"
                    }, void 0, false, {
                        fileName: "[project]/components/BudgetGrid.tsx",
                        lineNumber: 419,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/BudgetGrid.tsx",
                lineNumber: 346,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "ag-theme-alpine w-full",
                style: {
                    height: 720
                },
                "aria-label": "Budget AG Grid",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$ag$2d$grid$2d$react$2f$dist$2f$package$2f$index$2e$esm$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AgGridReact"], {
                    ref: gridRef,
                    rowData: rowData,
                    columnDefs: columnDefs,
                    defaultColDef: defaultColDef,
                    autoGroupColumnDef: autoGroupColumnDef,
                    // 👇 single tree column shows Community -> Type -> Category
                    groupDisplayType: "singleColumn",
                    suppressDragLeaveHidesColumns: true,
                    animateRows: true,
                    // NOTE: enableRangeSelection removed (Enterprise module)
                    rowSelection: "multiple",
                    onGridReady: onGridReady,
                    onModelUpdated: onModelUpdated,
                    onFilterChanged: onFilterChanged,
                    onCellValueChanged: onCellValueChanged,
                    getRowId: getRowId,
                    // 👇 Force legacy theme so legacy CSS is valid and no theming clash occurs
                    theme: "legacy"
                }, void 0, false, {
                    fileName: "[project]/components/BudgetGrid.tsx",
                    lineNumber: 435,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/BudgetGrid.tsx",
                lineNumber: 430,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/BudgetGrid.tsx",
        lineNumber: 344,
        columnNumber: 9
    }, this);
}
}),
];

//# sourceMappingURL=components_BudgetGrid_tsx_f68b7e8e._.js.map