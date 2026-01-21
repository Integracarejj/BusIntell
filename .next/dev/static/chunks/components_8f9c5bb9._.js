(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/components/grid/AmountCell.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AmountCell
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
function AmountCell({ getValue, row, table }) {
    _s();
    const initial = getValue();
    const [editing, setEditing] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](false);
    const [draft, setDraft] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](typeof initial === "number" ? initial : initial == null ? "" : Number(initial));
    // Format helper (display only)
    const fmtUSD = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"]({
        "AmountCell.useCallback[fmtUSD]": (n)=>new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
                maximumFractionDigits: 0
            }).format(n)
    }["AmountCell.useCallback[fmtUSD]"], []);
    const commit = ()=>{
        const next = draft === "" ? null : Number(draft);
        table.options.meta?.updateRow?.(row.index, {
            amount: next
        });
        setEditing(false);
    };
    const cancel = ()=>{
        // Revert to current value in the row
        const current = getValue();
        setDraft(typeof current === "number" ? current : current == null ? "" : Number(current));
        setEditing(false);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "text-right",
        children: editing ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
            autoFocus: true,
            type: "number",
            step: 1,
            className: "w-full rounded border border-slate-300 px-2 py-1 text-right text-sm",
            value: draft,
            onChange: (e)=>setDraft(e.target.value === "" ? "" : Number(e.target.value)),
            onBlur: commit,
            onKeyDown: (e)=>{
                if (e.key === "Enter") commit();
                if (e.key === "Escape") cancel();
            }
        }, void 0, false, {
            fileName: "[project]/components/grid/AmountCell.tsx",
            lineNumber: 59,
            columnNumber: 17
        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            className: "w-full text-right tabular-nums",
            onClick: ()=>setEditing(true),
            title: "Click to edit",
            children: typeof initial === "number" ? fmtUSD(initial) : "—"
        }, void 0, false, {
            fileName: "[project]/components/grid/AmountCell.tsx",
            lineNumber: 73,
            columnNumber: 17
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/grid/AmountCell.tsx",
        lineNumber: 57,
        columnNumber: 9
    }, this);
}
_s(AmountCell, "FQIHIwYP1+ycIgA0vZE0QdUVAM4=");
_c = AmountCell;
var _c;
__turbopack_context__.k.register(_c, "AmountCell");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/grid/columns.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// components/grid/columns.ts
__turbopack_context__.s([
    "columns",
    ()=>columns,
    "default",
    ()=>__TURBOPACK__default__export__,
    "deriveYear",
    ()=>deriveYear,
    "mapBudgetType",
    ()=>mapBudgetType
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$grid$2f$AmountCell$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/grid/AmountCell.tsx [app-client] (ecmascript)");
;
function deriveYear(period) {
    if (!period) return null;
    const y = parseInt(period.slice(0, 4), 10);
    return Number.isFinite(y) ? y : null;
}
function mapBudgetType(raw) {
    if (!raw) return '';
    const t = String(raw).toLowerCase();
    if (t === 'expense') return 'Expense';
    if (t === 'revenue') return 'Revenue';
    if (t === 'capex' || t === 'capital' || t === 'capital_expenditure') return 'CapEx';
    return raw.charAt(0).toUpperCase() + raw.slice(1);
}
const columns = [
    {
        id: 'community',
        accessorKey: 'community',
        header: 'Community',
        enableResizing: true,
        size: 200
    },
    {
        id: 'category',
        accessorKey: 'category',
        header: 'Category',
        enableResizing: true,
        size: 200
    },
    {
        id: 'subCategory',
        accessorKey: 'subCategory',
        header: 'SubCategory',
        enableResizing: true,
        size: 220
    },
    {
        id: 'budgetMethod',
        accessorKey: 'budgetMethod',
        header: 'Budget Method',
        enableResizing: true,
        size: 220
    },
    {
        id: 'glCode',
        accessorKey: 'glCode',
        header: 'GL Code',
        enableResizing: true,
        size: 120,
        cell: (info)=>String(info.getValue() ?? '')
    },
    {
        id: 'budgetType',
        header: 'Budget Type',
        accessorFn: (row)=>mapBudgetType(row.type),
        enableResizing: true,
        size: 140
    },
    {
        id: 'period',
        accessorKey: 'period',
        header: 'Period',
        enableResizing: true,
        size: 110,
        cell: (info)=>String(info.getValue() ?? '')
    },
    // Hidden column for filtering only
    {
        id: 'year',
        header: 'Year',
        accessorFn: (row)=>deriveYear(row.period),
        enableResizing: true,
        size: 90,
        cell: (info)=>{
            const y = info.getValue();
            return y ?? '';
        },
        filterFn: (row, _columnId, filterValue)=>{
            const y = row.getValue('year');
            if (filterValue == null || filterValue === '') return true;
            const fv = typeof filterValue === 'string' ? parseInt(filterValue, 10) : filterValue;
            return y === fv;
        }
    },
    {
        id: 'amount',
        accessorKey: 'amount',
        header: 'Amount',
        enableResizing: true,
        size: 140,
        cell: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$grid$2f$AmountCell$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
        meta: {
            isNumeric: true
        }
    }
];
const __TURBOPACK__default__export__ = columns;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/grid/ToolbarFilters.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// components/grid/ToolbarFilters.tsx
__turbopack_context__.s([
    "default",
    ()=>ToolbarFilters
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
;
function getFilterValue(filters, id) {
    const f = filters.find((f)=>f.id === id);
    return f?.value != null ? String(f.value) : '';
}
function setFilter(setFilters, id, value) {
    setFilters((prev)=>{
        const next = prev.filter((f)=>f.id !== id);
        if (value !== '') {
            const casted = id === 'year' ? Number(value) : value; // year as number
            next.push({
                id,
                value: casted
            });
        }
        return next;
    });
}
function getOptions(table, columnId) {
    const col = table.getColumn(columnId);
    if (!col) return [];
    const pre = table.getPreFilteredRowModel();
    const s = new Set();
    pre.flatRows.forEach((r)=>{
        const v = r.getValue?.(columnId);
        if (v == null) return;
        const str = String(v);
        if (str.trim().length) s.add(str);
    });
    return Array.from(s).sort((a, b)=>a.localeCompare(b));
}
function ToolbarFilters({ filters, setFilters, onClear, onExport, table }) {
    const items = [
        {
            id: 'community',
            label: 'Community',
            minWidth: 160
        },
        {
            id: 'year',
            label: 'Year',
            minWidth: 110
        },
        {
            id: 'budgetType',
            label: 'Budget Type',
            minWidth: 150
        },
        {
            id: 'category',
            label: 'Category',
            minWidth: 160
        }
    ];
    const filteredCount = table.getFilteredRowModel().rows.length;
    const communityCount = (()=>{
        const s = new Set();
        table.getFilteredRowModel().rows.forEach((r)=>{
            const v = r.getValue?.('community');
            if (v != null) s.add(String(v));
        });
        return s.size;
    })();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "grid-toolbar",
        style: {
            display: 'flex',
            alignItems: 'center',
            gap: 24,
            padding: '4px 4px 8px 4px'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 16
                },
                children: items.map(({ id, label, minWidth })=>{
                    const options = getOptions(table, id);
                    const value = getFilterValue(filters, id);
                    // Use label as placeholder-like first option (acts as clear/all)
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: 'inline-flex',
                            alignItems: 'center',
                            padding: '2px 8px',
                            borderRadius: 6,
                            border: '1px solid #e5e5e5',
                            background: '#fff'
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                            value: value,
                            onChange: (e)=>setFilter(setFilters, id, e.target.value),
                            disabled: options.length === 0,
                            style: {
                                border: 'none',
                                outline: 'none',
                                background: 'transparent',
                                minWidth: minWidth ?? 120,
                                cursor: options.length ? 'pointer' : 'not-allowed'
                            },
                            "aria-label": label,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                    value: "",
                                    children: label
                                }, void 0, false, {
                                    fileName: "[project]/components/grid/ToolbarFilters.tsx",
                                    lineNumber: 106,
                                    columnNumber: 33
                                }, this),
                                options.map((opt)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: opt,
                                        children: opt
                                    }, `${id}:${opt}`, false, {
                                        fileName: "[project]/components/grid/ToolbarFilters.tsx",
                                        lineNumber: 108,
                                        columnNumber: 37
                                    }, this))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/grid/ToolbarFilters.tsx",
                            lineNumber: 93,
                            columnNumber: 29
                        }, this)
                    }, id, false, {
                        fileName: "[project]/components/grid/ToolbarFilters.tsx",
                        lineNumber: 82,
                        columnNumber: 25
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/components/grid/ToolbarFilters.tsx",
                lineNumber: 76,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    marginLeft: 'auto',
                    display: 'inline-flex',
                    gap: 12,
                    alignItems: 'center',
                    color: '#666'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        style: {
                            fontSize: 12
                        },
                        children: [
                            filteredCount,
                            " rows · ",
                            communityCount,
                            " communities"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/grid/ToolbarFilters.tsx",
                        lineNumber: 117,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: onClear,
                        children: "Clear"
                    }, void 0, false, {
                        fileName: "[project]/components/grid/ToolbarFilters.tsx",
                        lineNumber: 118,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: onExport,
                        children: "Export CSV"
                    }, void 0, false, {
                        fileName: "[project]/components/grid/ToolbarFilters.tsx",
                        lineNumber: 119,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/grid/ToolbarFilters.tsx",
                lineNumber: 116,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/grid/ToolbarFilters.tsx",
        lineNumber: 67,
        columnNumber: 9
    }, this);
}
_c = ToolbarFilters;
``;
var _c;
__turbopack_context__.k.register(_c, "ToolbarFilters");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/grid/VirtualRows.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "VirtualRows",
    ()=>VirtualRows,
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
// components/grid/VirtualRows.tsx
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
function VirtualRows({ rows, rowHeight = 36, overscan = 6, scrollContainerRef, visibleColumnCount, renderRow, disableVirtual }) {
    _s();
    const isServer = ("TURBOPACK compile-time value", "object") === 'undefined';
    const [viewport, setViewport] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"]({
        scrollTop: 0,
        height: 0
    });
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"]({
        "VirtualRows.useEffect": ()=>{
            if (disableVirtual || isServer) return;
            // We widened the ref type; here we assert to HTMLElement at usage time
            const el = scrollContainerRef.current;
            if (!el) return;
            const handle = {
                "VirtualRows.useEffect.handle": ()=>{
                    setViewport({
                        scrollTop: el.scrollTop,
                        height: el.clientHeight
                    });
                }
            }["VirtualRows.useEffect.handle"];
            handle();
            el.addEventListener('scroll', handle, {
                passive: true
            });
            const ro = new ResizeObserver(handle);
            ro.observe(el);
            return ({
                "VirtualRows.useEffect": ()=>{
                    el.removeEventListener('scroll', handle);
                    ro.disconnect();
                }
            })["VirtualRows.useEffect"];
        }
    }["VirtualRows.useEffect"], [
        scrollContainerRef,
        disableVirtual,
        isServer
    ]);
    // If virtualization is disabled or we can't measure yet, render all rows
    if (disableVirtual || isServer || !scrollContainerRef.current || viewport.height === 0) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
            children: rows.map((row, i)=>renderRow(row, i))
        }, void 0, false);
    }
    const total = rows.length;
    const estTotalHeight = total * rowHeight;
    const startIndex = Math.max(0, Math.floor(viewport.scrollTop / rowHeight) - overscan);
    const visibleCount = Math.ceil(viewport.height / rowHeight) + overscan * 2;
    const endIndex = Math.min(total, startIndex + visibleCount);
    const topPad = startIndex * rowHeight;
    const bottomPad = Math.max(0, estTotalHeight - topPad - (endIndex - startIndex) * rowHeight);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            topPad > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                "aria-hidden": "true",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                    colSpan: visibleColumnCount,
                    style: {
                        height: topPad,
                        padding: 0,
                        border: 'none'
                    }
                }, void 0, false, {
                    fileName: "[project]/components/grid/VirtualRows.tsx",
                    lineNumber: 86,
                    columnNumber: 21
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/grid/VirtualRows.tsx",
                lineNumber: 85,
                columnNumber: 17
            }, this),
            rows.slice(startIndex, endIndex).map((row, i)=>renderRow(row, startIndex + i)),
            bottomPad > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                "aria-hidden": "true",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                    colSpan: visibleColumnCount,
                    style: {
                        height: bottomPad,
                        padding: 0,
                        border: 'none'
                    }
                }, void 0, false, {
                    fileName: "[project]/components/grid/VirtualRows.tsx",
                    lineNumber: 94,
                    columnNumber: 21
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/grid/VirtualRows.tsx",
                lineNumber: 93,
                columnNumber: 17
            }, this)
        ]
    }, void 0, true);
}
_s(VirtualRows, "5d5n1vS6JCWEnHtl6ijK3rYWNYA=");
_c = VirtualRows;
const __TURBOPACK__default__export__ = VirtualRows;
var _c;
__turbopack_context__.k.register(_c, "VirtualRows");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/grid/totals.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// components/grid/totals.ts
__turbopack_context__.s([
    "buildTotals",
    ()=>buildTotals,
    "buildTotalsFromTable",
    ()=>buildTotalsFromTable
]);
function buildTotals(rows, numericKeys) {
    const totals = Object.fromEntries(numericKeys.map((k)=>[
            k,
            0
        ]));
    for (const row of rows){
        for (const k of numericKeys){
            const v = row[k];
            const n = typeof v === 'string' ? Number(v) : typeof v === 'number' ? v : NaN;
            if (!Number.isNaN(n)) {
                totals[k] += n;
            }
        }
    }
    return totals;
}
function buildTotalsFromTable(table, numericKeys) {
    const rows = table.getFilteredRowModel().rows.map((r)=>r.original);
    return buildTotals(rows, numericKeys);
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/BudgetGrid.tanstack.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>BudgetGrid
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$table$2f$build$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-table/build/lib/index.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$table$2d$core$2f$build$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/table-core/build/lib/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$grid$2f$columns$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/grid/columns.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$grid$2f$ToolbarFilters$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/grid/ToolbarFilters.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$grid$2f$VirtualRows$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/grid/VirtualRows.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$grid$2f$totals$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/grid/totals.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
// components/BudgetGrid.tanstack.tsx
'use client';
;
;
;
;
;
;
function toCsv(rows, visibleKeys) {
    const esc = (v)=>{
        if (v == null) return '';
        const s = String(v);
        return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
    };
    const header = visibleKeys.map(esc).join(',');
    const body = rows.map((r)=>visibleKeys.map((k)=>esc(r[k])).join(',')).join('\n');
    return `${header}\n${body}`;
}
function downloadBlob(filename, content, mime = 'text/csv;charset=utf-8') {
    const blob = new Blob([
        content
    ], {
        type: mime
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
}
function BudgetGrid({ rows, initialSorting = [], initialFilters = [] }) {
    _s();
    const [data] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"]({
        "BudgetGrid.useState": ()=>rows ?? []
    }["BudgetGrid.useState"]);
    const [sorting, setSorting] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](initialSorting);
    const [columnFilters, setColumnFilters] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](initialFilters);
    const table = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$table$2f$build$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["useReactTable"])({
        data,
        columns: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$grid$2f$columns$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
        state: {
            sorting,
            columnFilters
        },
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$table$2d$core$2f$build$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCoreRowModel"])(),
        getSortedRowModel: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$table$2d$core$2f$build$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getSortedRowModel"])(),
        getFilteredRowModel: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$table$2d$core$2f$build$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getFilteredRowModel"])(),
        enableColumnResizing: true,
        columnResizeMode: 'onChange',
        getRowId: {
            "BudgetGrid.useReactTable[table]": (row, idx)=>row.id ?? String(idx)
        }["BudgetGrid.useReactTable[table]"],
        // 👇 hide the 'year' column by default (still available for filters)
        initialState: {
            columnVisibility: {
                year: false
            }
        }
    });
    const scrollRef = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"](null);
    const handleClearFilters = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"]({
        "BudgetGrid.useCallback[handleClearFilters]": ()=>{
            setColumnFilters([]);
            table.resetColumnFilters();
        }
    }["BudgetGrid.useCallback[handleClearFilters]"], [
        table
    ]);
    const handleExportCsv = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"]({
        "BudgetGrid.useCallback[handleExportCsv]": ()=>{
            const visibleCols = table.getVisibleLeafColumns();
            const keys = visibleCols.map({
                "BudgetGrid.useCallback[handleExportCsv].keys": (c)=>c.columnDef.accessorKey ?? c.id
            }["BudgetGrid.useCallback[handleExportCsv].keys"]);
            const filtered = table.getFilteredRowModel().rows.map({
                "BudgetGrid.useCallback[handleExportCsv].filtered": (r)=>r.original
            }["BudgetGrid.useCallback[handleExportCsv].filtered"]);
            const csv = toCsv(filtered, keys);
            downloadBlob(`budget-grid-${new Date().toISOString().slice(0, 10)}.csv`, csv);
        }
    }["BudgetGrid.useCallback[handleExportCsv]"], [
        table
    ]);
    const totals = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$grid$2f$totals$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["buildTotalsFromTable"])(table, [
        'amount'
    ]);
    const leafCols = table.getVisibleLeafColumns();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        style: {
            display: 'flex',
            flexDirection: 'column',
            gap: 12
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$grid$2f$ToolbarFilters$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                filters: columnFilters,
                setFilters: setColumnFilters,
                onClear: handleClearFilters,
                onExport: handleExportCsv,
                table: table
            }, void 0, false, {
                fileName: "[project]/components/BudgetGrid.tanstack.tsx",
                lineNumber: 99,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: scrollRef,
                style: {
                    overflow: 'auto',
                    maxHeight: '70vh',
                    border: '1px solid var(--border, #ddd)',
                    borderRadius: 6
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                    style: {
                        width: '100%',
                        borderCollapse: 'separate',
                        borderSpacing: 0,
                        tableLayout: 'fixed'
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("colgroup", {
                            children: leafCols.map((col)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("col", {
                                    style: {
                                        width: col.getSize(),
                                        minWidth: col.columnDef.minSize ?? 40,
                                        maxWidth: col.columnDef.maxSize ?? Number.POSITIVE_INFINITY
                                    }
                                }, `col-${col.id}`, false, {
                                    fileName: "[project]/components/BudgetGrid.tanstack.tsx",
                                    lineNumber: 126,
                                    columnNumber: 29
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/components/BudgetGrid.tanstack.tsx",
                            lineNumber: 124,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                            children: table.getHeaderGroups().map((hg)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                    children: hg.headers.map((h)=>{
                                        const canResize = h.column.getCanResize();
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            colSpan: h.colSpan,
                                            style: {
                                                position: 'relative',
                                                background: 'var(--th-bg, #f8f8f8)',
                                                textAlign: 'left',
                                                fontWeight: 600,
                                                borderBottom: '1px solid #e5e5e5',
                                                padding: '8px 10px',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                whiteSpace: 'nowrap'
                                            },
                                            children: [
                                                h.isPlaceholder ? null : (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$table$2f$build$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["flexRender"])(h.column.columnDef.header, h.getContext()),
                                                canResize && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    onMouseDown: h.getResizeHandler(),
                                                    onTouchStart: h.getResizeHandler(),
                                                    role: "separator",
                                                    "aria-orientation": "vertical",
                                                    "aria-label": `Resize ${String(h.column.id)} column`,
                                                    style: {
                                                        position: 'absolute',
                                                        right: 0,
                                                        top: 0,
                                                        height: '100%',
                                                        width: 6,
                                                        cursor: 'col-resize',
                                                        userSelect: 'none',
                                                        touchAction: 'none'
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/components/BudgetGrid.tanstack.tsx",
                                                    lineNumber: 160,
                                                    columnNumber: 49
                                                }, this)
                                            ]
                                        }, h.id, true, {
                                            fileName: "[project]/components/BudgetGrid.tanstack.tsx",
                                            lineNumber: 143,
                                            columnNumber: 41
                                        }, this);
                                    })
                                }, hg.id, false, {
                                    fileName: "[project]/components/BudgetGrid.tanstack.tsx",
                                    lineNumber: 139,
                                    columnNumber: 29
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/components/BudgetGrid.tanstack.tsx",
                            lineNumber: 137,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$grid$2f$VirtualRows$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                rows: table.getRowModel().rows,
                                rowHeight: 36,
                                overscan: 8,
                                scrollContainerRef: scrollRef,
                                visibleColumnCount: leafCols.length,
                                renderRow: (row)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                        children: row.getVisibleCells().map((cell)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                style: {
                                                    borderBottom: '1px solid #f0f0f0',
                                                    padding: '6px 10px',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    whiteSpace: 'nowrap'
                                                },
                                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$table$2f$build$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["flexRender"])(cell.column.columnDef.cell, cell.getContext())
                                            }, cell.id, false, {
                                                fileName: "[project]/components/BudgetGrid.tanstack.tsx",
                                                lineNumber: 195,
                                                columnNumber: 41
                                            }, void 0))
                                    }, row.id, false, {
                                        fileName: "[project]/components/BudgetGrid.tanstack.tsx",
                                        lineNumber: 193,
                                        columnNumber: 33
                                    }, void 0)
                            }, void 0, false, {
                                fileName: "[project]/components/BudgetGrid.tanstack.tsx",
                                lineNumber: 186,
                                columnNumber: 25
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/BudgetGrid.tanstack.tsx",
                            lineNumber: 185,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tfoot", {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                children: leafCols.map((col, idx)=>{
                                    const isAmount = col.id === 'amount' || col.columnDef.meta?.isNumeric;
                                    const content = col.id === 'amount' ? Intl.NumberFormat(undefined, {
                                        style: 'currency',
                                        currency: 'USD'
                                    }).format(totals.amount ?? 0) : idx === 0 ? 'Totals' : '';
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                        style: {
                                            borderTop: '2px solid #e5e5e5',
                                            fontWeight: 600,
                                            padding: '8px 10px',
                                            textAlign: isAmount ? 'right' : 'left'
                                        },
                                        children: content
                                    }, col.id, false, {
                                        fileName: "[project]/components/BudgetGrid.tanstack.tsx",
                                        lineNumber: 223,
                                        columnNumber: 37
                                    }, this);
                                })
                            }, void 0, false, {
                                fileName: "[project]/components/BudgetGrid.tanstack.tsx",
                                lineNumber: 214,
                                columnNumber: 25
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/BudgetGrid.tanstack.tsx",
                            lineNumber: 213,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/BudgetGrid.tanstack.tsx",
                    lineNumber: 116,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/BudgetGrid.tanstack.tsx",
                lineNumber: 107,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/BudgetGrid.tanstack.tsx",
        lineNumber: 98,
        columnNumber: 9
    }, this);
}
_s(BudgetGrid, "PvJ5kcmmqo59MP1/J6ITTYQU1Bo=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$table$2f$build$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["useReactTable"]
    ];
});
_c = BudgetGrid;
var _c;
__turbopack_context__.k.register(_c, "BudgetGrid");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=components_8f9c5bb9._.js.map