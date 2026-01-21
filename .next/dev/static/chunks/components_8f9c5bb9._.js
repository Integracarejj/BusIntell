(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/components/grid/AmountCell.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AmountCell
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
// components/grid/AmountCell.tsx
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
// Currency helpers
const fmt = new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
});
function parseCurrency(input) {
    // Accept: "$480,000", "480000", "480,000", "480000.00"
    if (input == null) return null;
    const stripped = String(input).replace(/[^0-9.-]/g, '');
    if (stripped.trim() === '') return null;
    const n = Number(stripped);
    return Number.isFinite(n) ? n : null;
}
function AmountCell(ctx) {
    _s();
    const { row, getValue, table } = ctx;
    const meta = table.options.meta;
    // Show formatted currency when not editing; turn into an <input> when focused/double-clicked
    const initial = getValue();
    const initialNumber = typeof initial === 'number' ? initial : typeof initial === 'string' ? Number(initial) : null;
    const [isEditing, setEditing] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](false);
    const [draft, setDraft] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](initialNumber != null ? fmt.format(initialNumber) : '');
    // Keep local draft in sync if the underlying cell changes from elsewhere
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"]({
        "AmountCell.useEffect": ()=>{
            const n = typeof initial === 'number' ? initial : typeof initial === 'string' ? Number(initial) : null;
            setDraft(n != null ? fmt.format(n) : '');
        }
    }["AmountCell.useEffect"], [
        initial
    ]);
    const commit = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"]({
        "AmountCell.useCallback[commit]": ()=>{
            const n = parseCurrency(draft);
            if (n != null && meta?.updateAmount) {
                meta.updateAmount(row.id, n);
            }
            setEditing(false);
        }
    }["AmountCell.useCallback[commit]"], [
        draft,
        meta,
        row.id
    ]);
    const onKeyDown = (e)=>{
        if (e.key === 'Enter') {
            e.preventDefault();
            commit();
        } else if (e.key === 'Escape') {
            e.preventDefault();
            // Revert draft to current cell value
            const n = typeof initial === 'number' ? initial : typeof initial === 'string' ? Number(initial) : null;
            setDraft(n != null ? fmt.format(n) : '');
            setEditing(false);
        }
    };
    if (!isEditing) {
        const display = initialNumber != null ? fmt.format(initialNumber) : '';
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            role: "button",
            tabIndex: 0,
            onDoubleClick: ()=>setEditing(true),
            onKeyDown: (e)=>{
                if (e.key === 'Enter' || e.key === ' ') setEditing(true);
            },
            style: {
                cursor: 'text'
            },
            children: display
        }, void 0, false, {
            fileName: "[project]/components/grid/AmountCell.tsx",
            lineNumber: 86,
            columnNumber: 13
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
        autoFocus: true,
        value: draft,
        onChange: (e)=>setDraft(e.target.value),
        onBlur: commit,
        onKeyDown: onKeyDown,
        inputMode: "numeric",
        style: {
            width: '100%',
            border: '1px solid #cfd8e3',
            borderRadius: 4,
            padding: '4px 6px',
            outline: 'none',
            textAlign: 'left'
        }
    }, void 0, false, {
        fileName: "[project]/components/grid/AmountCell.tsx",
        lineNumber: 101,
        columnNumber: 9
    }, this);
}
_s(AmountCell, "cW8IfUHMQFSrfzS+Pp7UjlYyXu4=");
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
    "deriveMonthLabel",
    ()=>deriveMonthLabel,
    "deriveQuarterLabel",
    ()=>deriveQuarterLabel,
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
/** Internal: 1–12 from "2026-03" */ function deriveMonthNumber(period) {
    if (!period || period.length < 7) return null;
    const m = parseInt(period.slice(5, 7), 10);
    return m >= 1 && m <= 12 ? m : null;
}
function deriveMonthLabel(period) {
    const m = deriveMonthNumber(period);
    if (!m) return '';
    const labels = [
        '',
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec'
    ];
    return labels[m] ?? '';
}
function deriveQuarterLabel(period) {
    const year = deriveYear(period);
    const m = deriveMonthNumber(period);
    if (!year || !m) return '';
    const q = Math.ceil(m / 3);
    const yy = String(year).slice(-2); // 2026 → "26"
    return `${yy}Q${q}`;
}
function mapBudgetType(raw) {
    if (!raw) return '';
    const t = String(raw).toLowerCase();
    if (t === 'expense') return 'Expense';
    if (t === 'revenue') return 'Revenue';
    if (t === 'capex' || t === 'capital' || t === 'capital_expenditure') return 'CapEx';
    // Fallback: Title Case original value
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
        id: 'glCode',
        accessorKey: 'glCode',
        header: 'GL Code',
        enableResizing: true,
        size: 110,
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
        id: 'year',
        header: 'Year',
        accessorFn: (row)=>deriveYear(row.period),
        enableResizing: true,
        size: 90,
        cell: (info)=>{
            const y = info.getValue();
            return y ?? '';
        },
        // Keep filtering on 'year' numeric-safe so toolbar Year works as expected
        filterFn: (row, _columnId, filterValue)=>{
            const y = row.getValue('year');
            if (filterValue == null || filterValue === '') return true;
            const fv = typeof filterValue === 'string' ? parseInt(filterValue, 10) : filterValue;
            return y === fv;
        }
    },
    {
        id: 'quarter',
        header: 'Quarter',
        accessorFn: (row)=>deriveQuarterLabel(row.period),
        enableResizing: true,
        size: 100
    },
    {
        id: 'month',
        header: 'Month',
        accessorFn: (row)=>deriveMonthLabel(row.period),
        enableResizing: true,
        size: 90
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

__turbopack_context__.s([
    "default",
    ()=>ToolbarFilters
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
// components/grid/ToolbarFilters.tsx
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
;
function getFilterValue(filters, id) {
    const f = filters.find((f)=>f.id === id);
    return f?.value != null ? String(f.value) : '';
}
function setFilter(setFilters, id, value) {
    setFilters((prev)=>{
        const next = prev.filter((f)=>f.id !== id);
        if (value !== '') {
            const casted = id === 'year' ? Number(value) : value;
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
function Divider() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        "aria-hidden": "true",
        style: {
            width: 1,
            height: 22,
            background: '#e5e5e5',
            margin: '0 10px',
            display: 'inline-block'
        }
    }, void 0, false, {
        fileName: "[project]/components/grid/ToolbarFilters.tsx",
        lineNumber: 50,
        columnNumber: 9
    }, this);
}
_c = Divider;
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
            gap: 0,
            padding: '4px 4px 8px 4px'
        },
        children: [
            items.map(({ id, label, minWidth }, idx)=>{
                const options = getOptions(table, id);
                const value = getFilterValue(filters, id);
                const control = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        display: 'inline-flex',
                        alignItems: 'center',
                        padding: '2px 10px',
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
                                lineNumber: 119,
                                columnNumber: 29
                            }, this),
                            options.map((opt)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                    value: opt,
                                    children: opt
                                }, `${id}:${opt}`, false, {
                                    fileName: "[project]/components/grid/ToolbarFilters.tsx",
                                    lineNumber: 121,
                                    columnNumber: 33
                                }, this))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/grid/ToolbarFilters.tsx",
                        lineNumber: 106,
                        columnNumber: 25
                    }, this)
                }, id, false, {
                    fileName: "[project]/components/grid/ToolbarFilters.tsx",
                    lineNumber: 95,
                    columnNumber: 21
                }, this);
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: [
                        control,
                        idx < items.length - 1 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Divider, {}, void 0, false, {
                            fileName: "[project]/components/grid/ToolbarFilters.tsx",
                            lineNumber: 130,
                            columnNumber: 51
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            style: {
                                width: 8
                            }
                        }, void 0, false, {
                            fileName: "[project]/components/grid/ToolbarFilters.tsx",
                            lineNumber: 130,
                            columnNumber: 65
                        }, this)
                    ]
                }, `frag-${id}`, true, {
                    fileName: "[project]/components/grid/ToolbarFilters.tsx",
                    lineNumber: 128,
                    columnNumber: 21
                }, this);
            }),
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
                        lineNumber: 136,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: onClear,
                        children: "Clear"
                    }, void 0, false, {
                        fileName: "[project]/components/grid/ToolbarFilters.tsx",
                        lineNumber: 137,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: onExport,
                        children: "Export CSV"
                    }, void 0, false, {
                        fileName: "[project]/components/grid/ToolbarFilters.tsx",
                        lineNumber: 138,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/grid/ToolbarFilters.tsx",
                lineNumber: 135,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/grid/ToolbarFilters.tsx",
        lineNumber: 82,
        columnNumber: 9
    }, this);
}
_c1 = ToolbarFilters;
var _c, _c1;
__turbopack_context__.k.register(_c, "Divider");
__turbopack_context__.k.register(_c1, "ToolbarFilters");
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
// ---------- helpers ----------
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
function toNumber(v) {
    if (typeof v === 'number') return v;
    const n = Number(v);
    return Number.isFinite(n) ? n : 0;
}
function formatCurrency(n) {
    return Intl.NumberFormat(undefined, {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0
    }).format(n || 0);
}
function BudgetGrid({ rows, initialSorting = [], initialFilters = [] }) {
    _s();
    const [data, setData] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"]({
        "BudgetGrid.useState": ()=>rows ?? []
    }["BudgetGrid.useState"]);
    const [sorting, setSorting] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](initialSorting);
    const [columnFilters, setColumnFilters] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](initialFilters);
    // Updater used by AmountCell via table.options.meta.updateAmount
    const updateAmount = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"]({
        "BudgetGrid.useCallback[updateAmount]": (rowId, newValue)=>{
            setData({
                "BudgetGrid.useCallback[updateAmount]": (prev)=>{
                    // Row ids are index-based fallback in our getRowId; coerce if needed
                    const idx = Number.isFinite(Number(rowId)) ? Number(rowId) : prev.findIndex({
                        "BudgetGrid.useCallback[updateAmount]": (_r, i)=>String(i) === rowId
                    }["BudgetGrid.useCallback[updateAmount]"]);
                    if (idx < 0 || idx >= prev.length) return prev;
                    const next = prev.slice();
                    next[idx] = {
                        ...next[idx],
                        amount: newValue
                    };
                    return next;
                }
            }["BudgetGrid.useCallback[updateAmount]"]);
        }
    }["BudgetGrid.useCallback[updateAmount]"], []);
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
        // >>> expose meta so cells can call back into the table
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore tanstack's TableOptions allows unknown meta
        meta: {
            updateAmount
        }
    });
    const scrollRef = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"](null);
    // ---------- toolbar actions ----------
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
    // ---------- live totals (filter-aware & edit-aware) ----------
    const filteredRows = table.getFilteredRowModel().rows;
    const yearFilter = columnFilters.find((f)=>f.id === 'year')?.value;
    const totalsLive = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"]({
        "BudgetGrid.useMemo[totalsLive]": ()=>{
            let rev = 0, exp = 0;
            for (const r of filteredRows){
                if (yearFilter !== undefined && yearFilter !== null) {
                    const y = r.getValue?.('year');
                    const yWanted = typeof yearFilter === 'string' ? parseInt(yearFilter, 10) : yearFilter;
                    if (y !== yWanted) continue;
                }
                const amt = toNumber(r.original.amount);
                const bt = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$grid$2f$columns$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mapBudgetType"])(r.original.type);
                if (bt === 'Revenue') rev += amt;
                else if (bt === 'Expense' || bt === 'CapEx') exp += amt;
            }
            return {
                rev,
                exp,
                net: rev - exp
            };
        }
    }["BudgetGrid.useMemo[totalsLive]"], [
        filteredRows,
        yearFilter
    ]);
    // ---------- render ----------
    const leafCols = table.getVisibleLeafColumns();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        style: {
            display: 'flex',
            flexDirection: 'column',
            gap: 12
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, minmax(240px, 1fr))',
                    gap: 16,
                    marginTop: 4
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SummaryCard, {
                        title: "TOTAL REVENUE",
                        value: formatCurrency(totalsLive.rev)
                    }, void 0, false, {
                        fileName: "[project]/components/BudgetGrid.tanstack.tsx",
                        lineNumber: 155,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SummaryCard, {
                        title: "TOTAL EXPENSE",
                        value: formatCurrency(totalsLive.exp)
                    }, void 0, false, {
                        fileName: "[project]/components/BudgetGrid.tanstack.tsx",
                        lineNumber: 156,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SummaryCard, {
                        title: "NET",
                        value: formatCurrency(totalsLive.net)
                    }, void 0, false, {
                        fileName: "[project]/components/BudgetGrid.tanstack.tsx",
                        lineNumber: 157,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/BudgetGrid.tanstack.tsx",
                lineNumber: 147,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$grid$2f$ToolbarFilters$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                filters: columnFilters,
                setFilters: setColumnFilters,
                onClear: handleClearFilters,
                onExport: handleExportCsv,
                table: table
            }, void 0, false, {
                fileName: "[project]/components/BudgetGrid.tanstack.tsx",
                lineNumber: 161,
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
                                    lineNumber: 189,
                                    columnNumber: 29
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/components/BudgetGrid.tanstack.tsx",
                            lineNumber: 187,
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
                                                textAlign: 'center',
                                                fontWeight: 600,
                                                borderBottom: '1px solid #e5e5e5',
                                                borderRight: '1px solid #f3f3f3',
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
                                                    lineNumber: 224,
                                                    columnNumber: 49
                                                }, this)
                                            ]
                                        }, h.id, true, {
                                            fileName: "[project]/components/BudgetGrid.tanstack.tsx",
                                            lineNumber: 206,
                                            columnNumber: 41
                                        }, this);
                                    })
                                }, hg.id, false, {
                                    fileName: "[project]/components/BudgetGrid.tanstack.tsx",
                                    lineNumber: 202,
                                    columnNumber: 29
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/components/BudgetGrid.tanstack.tsx",
                            lineNumber: 200,
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
                                        children: row.getVisibleCells().map((cell)=>{
                                            const isAmount = cell.column.id === 'amount' || cell.column.columnDef.meta?.isNumeric;
                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                style: {
                                                    borderBottom: '1px solid #f0f0f0',
                                                    borderRight: '1px solid #f7f7f7',
                                                    padding: '6px 10px',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    whiteSpace: 'nowrap',
                                                    textAlign: 'left'
                                                },
                                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$table$2f$build$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["flexRender"])(cell.column.columnDef.cell, cell.getContext())
                                            }, cell.id, false, {
                                                fileName: "[project]/components/BudgetGrid.tanstack.tsx",
                                                lineNumber: 261,
                                                columnNumber: 45
                                            }, void 0);
                                        })
                                    }, row.id, false, {
                                        fileName: "[project]/components/BudgetGrid.tanstack.tsx",
                                        lineNumber: 257,
                                        columnNumber: 33
                                    }, void 0)
                            }, void 0, false, {
                                fileName: "[project]/components/BudgetGrid.tanstack.tsx",
                                lineNumber: 250,
                                columnNumber: 25
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/BudgetGrid.tanstack.tsx",
                            lineNumber: 249,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tfoot", {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                children: leafCols.map((col, idx)=>{
                                    const isAmount = col.id === 'amount' || col.columnDef.meta?.isNumeric;
                                    const totalObj = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$grid$2f$totals$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["buildTotalsFromTable"])(table, [
                                        'amount'
                                    ]); // filtered totals
                                    const content = col.id === 'amount' ? formatCurrency(totalObj.amount ?? 0) : idx === 0 ? 'Totals' : '';
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                        style: {
                                            borderTop: '2px solid #e5e5e5',
                                            borderRight: '1px solid #f7f7f7',
                                            fontWeight: 600,
                                            padding: '8px 10px',
                                            textAlign: 'left'
                                        },
                                        children: content
                                    }, col.id, false, {
                                        fileName: "[project]/components/BudgetGrid.tanstack.tsx",
                                        lineNumber: 293,
                                        columnNumber: 37
                                    }, this);
                                })
                            }, void 0, false, {
                                fileName: "[project]/components/BudgetGrid.tanstack.tsx",
                                lineNumber: 283,
                                columnNumber: 25
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/BudgetGrid.tanstack.tsx",
                            lineNumber: 282,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/BudgetGrid.tanstack.tsx",
                    lineNumber: 179,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/BudgetGrid.tanstack.tsx",
                lineNumber: 170,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/BudgetGrid.tanstack.tsx",
        lineNumber: 145,
        columnNumber: 9
    }, this);
}
_s(BudgetGrid, "B5ii21K05e0Bm/MunAT0TM8Rq34=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$table$2f$build$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["useReactTable"]
    ];
});
_c = BudgetGrid;
// ---------- small presentational card ----------
function SummaryCard({ title, value }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            background: '#fff',
            border: '1px solid #e9eef1',
            borderRadius: 10,
            padding: '16px 20px',
            display: 'flex',
            flexDirection: 'column',
            gap: 6,
            minHeight: 86
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    fontSize: 12,
                    color: '#7a8a99',
                    letterSpacing: 0.4
                },
                children: title
            }, void 0, false, {
                fileName: "[project]/components/BudgetGrid.tanstack.tsx",
                lineNumber: 330,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    fontSize: 28,
                    fontWeight: 600
                },
                children: value
            }, void 0, false, {
                fileName: "[project]/components/BudgetGrid.tanstack.tsx",
                lineNumber: 331,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/BudgetGrid.tanstack.tsx",
        lineNumber: 318,
        columnNumber: 9
    }, this);
}
_c1 = SummaryCard;
var _c, _c1;
__turbopack_context__.k.register(_c, "BudgetGrid");
__turbopack_context__.k.register(_c1, "SummaryCard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=components_8f9c5bb9._.js.map