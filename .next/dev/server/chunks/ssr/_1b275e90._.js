module.exports = [
"[project]/components/grid/AmountCell.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AmountCell
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
// components/grid/AmountCell.tsx
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
;
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
    const { row, getValue, table } = ctx;
    const meta = table.options.meta;
    // Show formatted currency when not editing; turn into an <input> when focused/double-clicked
    const initial = getValue();
    const initialNumber = typeof initial === 'number' ? initial : typeof initial === 'string' ? Number(initial) : null;
    const [isEditing, setEditing] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"](false);
    const [draft, setDraft] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"](initialNumber != null ? fmt.format(initialNumber) : '');
    // Keep local draft in sync if the underlying cell changes from elsewhere
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"](()=>{
        const n = typeof initial === 'number' ? initial : typeof initial === 'string' ? Number(initial) : null;
        setDraft(n != null ? fmt.format(n) : '');
    }, [
        initial
    ]);
    const commit = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"](()=>{
        const n = parseCurrency(draft);
        if (n != null && meta?.updateAmount) {
            meta.updateAmount(row.id, n);
        }
        setEditing(false);
    }, [
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
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
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
}),
"[project]/components/grid/columns.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$grid$2f$AmountCell$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/grid/AmountCell.tsx [app-ssr] (ecmascript)");
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
        cell: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$grid$2f$AmountCell$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"],
        meta: {
            isNumeric: true
        }
    }
];
const __TURBOPACK__default__export__ = columns;
}),
"[project]/components/grid/ToolbarFilters.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ToolbarFilters
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
// components/grid/ToolbarFilters.tsx
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
;
;
function getFilterValue(filters, id) {
    const f = filters.find((f)=>f.id === id);
    return f?.value != null ? String(f.value) : '';
}
function upsert(set, id, value) {
    const updater = (prev)=>{
        const next = prev.filter((f)=>f.id !== id);
        if (value !== '') {
            const v = id === 'year' ? Number(value) : value; // keep 'year' numeric
            next.push({
                id,
                value: v
            });
        }
        return next;
    };
    if (typeof set === 'function' && set.length === 1) {
        set(updater);
    } else {
        set(updater);
    }
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
        lineNumber: 59,
        columnNumber: 9
    }, this);
}
function ToolbarFilters({ ids = [
    'year',
    'quarter',
    'budgetType',
    'category'
], filters, setFilters, onClear, onExport, table }) {
    const LABELS = {
        year: 'Year',
        quarter: 'Quarter',
        month: 'Month',
        budgetType: 'Budget Type',
        category: 'Category'
    };
    const filteredCount = table.getFilteredRowModel().rows.length;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "grid-toolbar",
        style: {
            display: 'flex',
            alignItems: 'center',
            gap: 0,
            padding: '4px 4px 8px 4px'
        },
        children: [
            ids.map((id, idx)=>{
                const label = LABELS[id];
                const options = getOptions(table, id);
                const value = getFilterValue(filters, id);
                const control = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        display: 'inline-flex',
                        alignItems: 'center',
                        padding: '2px 10px',
                        borderRadius: 6,
                        border: '1px solid #e5e5e5',
                        background: '#fff'
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                        value: value,
                        onChange: (e)=>upsert(setFilters, id, e.target.value),
                        disabled: options.length === 0,
                        style: {
                            border: 'none',
                            outline: 'none',
                            background: 'transparent',
                            minWidth: id === 'budgetType' ? 150 : id === 'category' ? 180 : 110,
                            cursor: options.length ? 'pointer' : 'not-allowed'
                        },
                        "aria-label": label,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "",
                                children: label
                            }, void 0, false, {
                                fileName: "[project]/components/grid/ToolbarFilters.tsx",
                                lineNumber: 129,
                                columnNumber: 29
                            }, this),
                            options.map((opt)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                    value: opt,
                                    children: opt
                                }, `${id}:${opt}`, false, {
                                    fileName: "[project]/components/grid/ToolbarFilters.tsx",
                                    lineNumber: 131,
                                    columnNumber: 33
                                }, this))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/grid/ToolbarFilters.tsx",
                        lineNumber: 116,
                        columnNumber: 25
                    }, this)
                }, id, false, {
                    fileName: "[project]/components/grid/ToolbarFilters.tsx",
                    lineNumber: 105,
                    columnNumber: 21
                }, this);
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: [
                        control,
                        idx < ids.length - 1 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Divider, {}, void 0, false, {
                            fileName: "[project]/components/grid/ToolbarFilters.tsx",
                            lineNumber: 140,
                            columnNumber: 49
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            style: {
                                width: 8
                            }
                        }, void 0, false, {
                            fileName: "[project]/components/grid/ToolbarFilters.tsx",
                            lineNumber: 140,
                            columnNumber: 63
                        }, this)
                    ]
                }, `frag-${id}`, true, {
                    fileName: "[project]/components/grid/ToolbarFilters.tsx",
                    lineNumber: 138,
                    columnNumber: 21
                }, this);
            }),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    marginLeft: 'auto',
                    display: 'inline-flex',
                    gap: 12,
                    alignItems: 'center',
                    color: '#666'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        style: {
                            fontSize: 12
                        },
                        children: [
                            filteredCount,
                            " rows"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/grid/ToolbarFilters.tsx",
                        lineNumber: 146,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: onClear,
                        children: "Clear"
                    }, void 0, false, {
                        fileName: "[project]/components/grid/ToolbarFilters.tsx",
                        lineNumber: 147,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: onExport,
                        children: "Export CSV"
                    }, void 0, false, {
                        fileName: "[project]/components/grid/ToolbarFilters.tsx",
                        lineNumber: 148,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/grid/ToolbarFilters.tsx",
                lineNumber: 145,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/grid/ToolbarFilters.tsx",
        lineNumber: 91,
        columnNumber: 9
    }, this);
}
}),
"[project]/components/grid/VirtualRows.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "VirtualRows",
    ()=>VirtualRows,
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
// components/grid/VirtualRows.tsx
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
;
;
function VirtualRows({ rows, rowHeight = 36, overscan = 6, scrollContainerRef, visibleColumnCount, renderRow, disableVirtual }) {
    const isServer = ("TURBOPACK compile-time value", "undefined") === 'undefined';
    const [viewport, setViewport] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"]({
        scrollTop: 0,
        height: 0
    });
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"](()=>{
        if ("TURBOPACK compile-time truthy", 1) return;
        //TURBOPACK unreachable
        ;
        // We widened the ref type; here we assert to HTMLElement at usage time
        const el = undefined;
        const handle = undefined;
        const ro = undefined;
    }, [
        scrollContainerRef,
        disableVirtual,
        isServer
    ]);
    // If virtualization is disabled or we can't measure yet, render all rows
    if ("TURBOPACK compile-time truthy", 1) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
            children: rows.map((row, i)=>renderRow(row, i))
        }, void 0, false);
    }
    //TURBOPACK unreachable
    ;
    const total = undefined;
    const estTotalHeight = undefined;
    const startIndex = undefined;
    const visibleCount = undefined;
    const endIndex = undefined;
    const topPad = undefined;
    const bottomPad = undefined;
}
const __TURBOPACK__default__export__ = VirtualRows;
}),
"[project]/components/grid/totals.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
}),
"[project]/components/BudgetGrid.tanstack.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>BudgetGrid
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$table$2f$build$2f$lib$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-table/build/lib/index.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$table$2d$core$2f$build$2f$lib$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/table-core/build/lib/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$grid$2f$columns$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/grid/columns.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$grid$2f$ToolbarFilters$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/grid/ToolbarFilters.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$grid$2f$VirtualRows$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/grid/VirtualRows.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$grid$2f$totals$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/grid/totals.ts [app-ssr] (ecmascript)");
// components/BudgetGrid.tanstack.tsx
'use client';
;
;
;
;
;
;
;
/* ----------------------------------------------------------------------------
   Small utilities
---------------------------------------------------------------------------- */ function toCsv(rows, visibleKeys) {
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
function formatCurrency(n) {
    return Intl.NumberFormat(undefined, {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0
    }).format(n || 0);
}
/* ----------------------------------------------------------------------------
   Column helpers for header filters
---------------------------------------------------------------------------- */ const HEADER_FILTER_IDS = [
    'community',
    'category',
    'subCategory',
    'glCode',
    'budgetType',
    'year',
    'quarter',
    'month'
];
function getColumnOptions(table, columnId) {
    const col = table.getColumn(columnId);
    if (!col) return [];
    const pre = table.getPreFilteredRowModel();
    const uniq = new Set();
    pre.flatRows.forEach((r)=>{
        // Prefer TanStack's computed cell value
        let v = r.getValue?.(columnId);
        // Fallbacks for common synonyms if accessor differs
        if (v == null) {
            const orig = r.original ?? {};
            switch(columnId){
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
    return Array.from(uniq).sort((a, b)=>a.localeCompare(b));
}
function setFilter(setFilters, id, value) {
    if (!setFilters) return;
    // works for both controlled and uncontrolled signatures
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setFilters((prev)=>{
        const next = prev.filter((f)=>f.id !== id);
        if (value != null && value !== '') {
            next.push({
                id,
                value: id === 'year' ? Number(value) : value
            });
        }
        return next;
    });
}
/* ----------------------------------------------------------------------------
   Runtime column augmentation:
   - We do NOT edit columns.ts.
   - Inject aggregation ONLY for 'amount' (sum) so grouped rows display totals.
---------------------------------------------------------------------------- */ function useAugmentedColumns() {
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"](()=>{
        return __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$grid$2f$columns$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].map((c)=>{
            const colId = c.id ?? c.accessorKey;
            if (colId === 'amount') {
                return {
                    ...c,
                    aggregationFn: 'sum',
                    meta: {
                        ...c.meta ?? {},
                        isNumeric: true
                    }
                };
            }
            return c;
        });
    }, []);
}
function BudgetGrid({ rows, initialSorting = [], initialFilters = [], filters, onFiltersChange, onUpdateAmount, toolbarIds = [
    'year',
    'quarter',
    'budgetType',
    'category'
] }) {
    // Data / edits
    const [data, setData] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"](()=>rows ?? []);
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"](()=>{
        if (rows) setData(rows);
    }, [
        rows
    ]);
    // Sorting
    const [sorting, setSorting] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"](initialSorting);
    // Filters: controlled vs uncontrolled
    const controlled = !!filters && !!onFiltersChange;
    const [uncontrolledFilters, setUncontrolledFilters] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"](initialFilters);
    const effectiveFilters = controlled ? filters : uncontrolledFilters;
    const setEffectiveFilters = controlled ? onFiltersChange : setUncontrolledFilters;
    // Grouping + row expansion
    const [grouping, setGrouping] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"]([]);
    const [expanded, setExpanded] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"]({});
    // Update from AmountCell (bubbles to page if provided)
    const updateAmountLocal = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"]((rowId, newValue)=>{
        const idx = Number(rowId);
        if (Number.isFinite(idx)) {
            if (onUpdateAmount) {
                onUpdateAmount(idx, newValue);
            } else {
                setData((prev)=>{
                    if (idx < 0 || idx >= prev.length) return prev;
                    const next = prev.slice();
                    next[idx] = {
                        ...next[idx],
                        amount: newValue
                    };
                    return next;
                });
            }
        }
    }, [
        onUpdateAmount
    ]);
    // Inject aggregation for 'amount' at runtime (no edit to columns.ts)
    const augColumns = useAugmentedColumns();
    const table = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$table$2f$build$2f$lib$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["useReactTable"])({
        data,
        columns: augColumns,
        state: {
            sorting,
            columnFilters: effectiveFilters,
            grouping,
            expanded
        },
        onSortingChange: setSorting,
        onColumnFiltersChange: setEffectiveFilters,
        onGroupingChange: setGrouping,
        onExpandedChange: setExpanded,
        getCoreRowModel: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$table$2d$core$2f$build$2f$lib$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getCoreRowModel"])(),
        getSortedRowModel: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$table$2d$core$2f$build$2f$lib$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getSortedRowModel"])(),
        getFilteredRowModel: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$table$2d$core$2f$build$2f$lib$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getFilteredRowModel"])(),
        getGroupedRowModel: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$table$2d$core$2f$build$2f$lib$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getGroupedRowModel"])(),
        getExpandedRowModel: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$table$2d$core$2f$build$2f$lib$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getExpandedRowModel"])(),
        enableColumnResizing: true,
        columnResizeMode: 'onChange',
        getRowId: (_row, idx)=>String(idx),
        // Expose meta so AmountCell can push edits up
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        meta: {
            updateAmount: updateAmountLocal
        }
    });
    const scrollRef = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"](null);
    const leafCols = table.getVisibleLeafColumns();
    // Totals for footer (already filtered — independent of grouping)
    const totalsObj = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$grid$2f$totals$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["buildTotalsFromTable"])(table, [
        'amount'
    ]);
    // Visual theme
    const HEADER_DIVIDER = '#d0d7df'; // header bottom + header vertical
    const BODY_LINE = '#e1e7ec'; // body vertical/horizontal
    const HEADER_BG = '#f7f9fb'; // Option A subtle gray
    // Grouping UX
    const groupableColumns = [
        {
            id: 'community',
            label: 'Community'
        },
        {
            id: 'category',
            label: 'Category'
        },
        {
            id: 'subCategory',
            label: 'SubCategory'
        },
        {
            id: 'year',
            label: 'Year'
        },
        {
            id: 'quarter',
            label: 'Quarter'
        },
        {
            id: 'month',
            label: 'Month'
        },
        {
            id: 'budgetType',
            label: 'Budget Type'
        }
    ];
    const toggleGroup = (id)=>setGrouping((prev)=>prev.includes(id) ? prev.filter((g)=>g !== id) : [
                ...prev,
                id
            ]);
    const clearGrouping = ()=>setGrouping([]);
    // Render
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        style: {
            display: 'flex',
            flexDirection: 'column',
            gap: 10
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$grid$2f$ToolbarFilters$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                ids: toolbarIds,
                // use the same state abstraction the component already supports
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                filters: effectiveFilters,
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                setFilters: setEffectiveFilters,
                onClear: ()=>setEffectiveFilters?.([]),
                onExport: ()=>{
                    const visibleCols = table.getVisibleLeafColumns();
                    const keys = visibleCols.map((c)=>c.columnDef.accessorKey ?? c.id);
                    const filtered = table.getFilteredRowModel().rows.map((r)=>r.original);
                    const csv = toCsv(filtered, keys);
                    downloadBlob(`budget-grid-${new Date().toISOString().slice(0, 10)}.csv`, csv);
                },
                table: table
            }, void 0, false, {
                fileName: "[project]/components/BudgetGrid.tanstack.tsx",
                lineNumber: 279,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grouping-toolbar",
                style: {
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    flexWrap: 'wrap',
                    padding: '6px 8px',
                    border: '1px solid #e5e7eb',
                    borderRadius: 8,
                    background: '#ffffff'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        style: {
                            fontSize: 12,
                            color: '#475569',
                            fontWeight: 600
                        },
                        children: "Group by:"
                    }, void 0, false, {
                        fileName: "[project]/components/BudgetGrid.tanstack.tsx",
                        lineNumber: 311,
                        columnNumber: 17
                    }, this),
                    groupableColumns.map(({ id, label })=>{
                        const active = grouping.includes(id);
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            onClick: ()=>toggleGroup(id),
                            style: {
                                fontSize: 12,
                                lineHeight: 1,
                                padding: '6px 10px',
                                borderRadius: 14,
                                border: `1px solid ${active ? '#0ea5e9' : '#e5e7eb'}`,
                                background: active ? '#e0f2fe' : '#fff',
                                color: active ? '#0369a1' : '#334155',
                                cursor: 'pointer'
                            },
                            "aria-pressed": active,
                            title: active ? 'Remove from grouping' : 'Add to grouping',
                            children: label
                        }, id, false, {
                            fileName: "[project]/components/BudgetGrid.tanstack.tsx",
                            lineNumber: 315,
                            columnNumber: 25
                        }, this);
                    }),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: clearGrouping,
                        style: {
                            marginLeft: 'auto',
                            fontSize: 12,
                            lineHeight: 1,
                            padding: '6px 10px',
                            borderRadius: 6,
                            border: '1px solid #e5e7eb',
                            background: '#fff',
                            color: '#334155',
                            cursor: 'pointer'
                        },
                        title: "Clear all grouping",
                        children: "Clear"
                    }, void 0, false, {
                        fileName: "[project]/components/BudgetGrid.tanstack.tsx",
                        lineNumber: 336,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/BudgetGrid.tanstack.tsx",
                lineNumber: 298,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: scrollRef,
                style: {
                    overflow: 'auto',
                    maxHeight: '70vh',
                    border: '1px solid var(--border, #ddd)',
                    borderRadius: 6,
                    background: '#fff'
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                    style: {
                        width: '100%',
                        borderCollapse: 'separate',
                        borderSpacing: 0,
                        tableLayout: 'fixed'
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("colgroup", {
                            children: leafCols.map((col)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("col", {
                                    style: {
                                        width: col.getSize(),
                                        minWidth: col.columnDef.minSize ?? 40,
                                        maxWidth: col.columnDef.maxSize ?? Number.POSITIVE_INFINITY
                                    }
                                }, `col-${col.id}`, false, {
                                    fileName: "[project]/components/BudgetGrid.tanstack.tsx",
                                    lineNumber: 378,
                                    columnNumber: 29
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/components/BudgetGrid.tanstack.tsx",
                            lineNumber: 376,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                            children: [
                                table.getHeaderGroups().map((hg)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                        children: hg.headers.map((h)=>{
                                            const canResize = h.column.getCanResize();
                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                colSpan: h.colSpan,
                                                style: {
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
                                                    whiteSpace: 'nowrap'
                                                },
                                                children: [
                                                    h.isPlaceholder ? null : (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$table$2f$build$2f$lib$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["flexRender"])(h.column.columnDef.header, h.getContext()),
                                                    canResize && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                                                        lineNumber: 416,
                                                        columnNumber: 49
                                                    }, this)
                                                ]
                                            }, h.id, true, {
                                                fileName: "[project]/components/BudgetGrid.tanstack.tsx",
                                                lineNumber: 396,
                                                columnNumber: 41
                                            }, this);
                                        })
                                    }, `hdr-${hg.id}`, false, {
                                        fileName: "[project]/components/BudgetGrid.tanstack.tsx",
                                        lineNumber: 392,
                                        columnNumber: 29
                                    }, this)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                    children: HEADER_FILTER_IDS.map((colId)=>{
                                        const col = table.getColumn(colId);
                                        if (!col) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            style: {
                                                position: 'sticky',
                                                top: 44,
                                                zIndex: 5,
                                                background: `var(--th-bg, ${HEADER_BG})`,
                                                borderBottom: `1px solid ${HEADER_DIVIDER}`,
                                                borderRight: `1px solid ${HEADER_DIVIDER}`,
                                                padding: '6px 8px'
                                            }
                                        }, `flt-missing-${colId}`, false, {
                                            fileName: "[project]/components/BudgetGrid.tanstack.tsx",
                                            lineNumber: 445,
                                            columnNumber: 37
                                        }, this);
                                        const opts = getColumnOptions(table, colId);
                                        const isSelect = [
                                            'community',
                                            'category',
                                            'subCategory',
                                            'budgetType',
                                            'year',
                                            'quarter',
                                            'month'
                                        ].includes(colId);
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            style: {
                                                position: 'sticky',
                                                top: 44,
                                                zIndex: 5,
                                                background: `var(--th-bg, ${HEADER_BG})`,
                                                borderBottom: `1px solid ${HEADER_DIVIDER}`,
                                                borderRight: `1px solid ${HEADER_DIVIDER}`,
                                                padding: '6px 8px'
                                            },
                                            children: isSelect ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                value: String(col.getFilterValue?.() ?? ''),
                                                onChange: (e)=>setFilter(setEffectiveFilters, colId, e.target.value || undefined),
                                                style: {
                                                    width: '100%',
                                                    padding: '6px 8px',
                                                    borderRadius: 6,
                                                    border: '1px solid #e5e7eb',
                                                    background: '#fff'
                                                },
                                                "aria-label": `Filter ${colId}`,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: "",
                                                        children: "All"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/BudgetGrid.tanstack.tsx",
                                                        lineNumber: 487,
                                                        columnNumber: 49
                                                    }, this),
                                                    opts.map((o)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: o,
                                                            children: o
                                                        }, `${colId}:${o}`, false, {
                                                            fileName: "[project]/components/BudgetGrid.tanstack.tsx",
                                                            lineNumber: 489,
                                                            columnNumber: 53
                                                        }, this))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/BudgetGrid.tanstack.tsx",
                                                lineNumber: 475,
                                                columnNumber: 45
                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "text",
                                                value: String(col.getFilterValue?.() ?? ''),
                                                onChange: (e)=>setFilter(setEffectiveFilters, colId, e.target.value || undefined),
                                                placeholder: `Filter ${colId}`,
                                                style: {
                                                    width: '100%',
                                                    padding: '6px 8px',
                                                    borderRadius: 6,
                                                    border: '1px solid #e5e7eb',
                                                    background: '#fff'
                                                },
                                                "aria-label": `Filter ${colId}`
                                            }, void 0, false, {
                                                fileName: "[project]/components/BudgetGrid.tanstack.tsx",
                                                lineNumber: 495,
                                                columnNumber: 45
                                            }, this)
                                        }, `flt-${colId}`, false, {
                                            fileName: "[project]/components/BudgetGrid.tanstack.tsx",
                                            lineNumber: 462,
                                            columnNumber: 37
                                        }, this);
                                    })
                                }, void 0, false, {
                                    fileName: "[project]/components/BudgetGrid.tanstack.tsx",
                                    lineNumber: 441,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/BudgetGrid.tanstack.tsx",
                            lineNumber: 390,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$grid$2f$VirtualRows$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                rows: table.getRowModel().rows,
                                rowHeight: 36,
                                overscan: 8,
                                scrollContainerRef: scrollRef,
                                visibleColumnCount: leafCols.length,
                                renderRow: (row)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                        children: row.getVisibleCells().map((cell)=>{
                                            const isGroupedCell = cell.getIsGrouped?.();
                                            const isAggregated = cell.getIsAggregated?.();
                                            const isPlaceholder = cell.getIsPlaceholder?.();
                                            // Grouped cell: expander + value + row count
                                            if (isGroupedCell) {
                                                const groupVal = cell.getValue();
                                                const toggle = row.getToggleExpandedHandler();
                                                const expandedNow = row.getIsExpanded();
                                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    style: {
                                                        borderBottom: `1px solid ${BODY_LINE}`,
                                                        borderRight: `1px solid ${BODY_LINE}`,
                                                        padding: '6px 10px',
                                                        background: '#fff',
                                                        fontWeight: 600
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            type: "button",
                                                            onClick: toggle,
                                                            "aria-label": expandedNow ? 'Collapse group' : 'Expand group',
                                                            title: expandedNow ? 'Collapse' : 'Expand',
                                                            style: {
                                                                marginRight: 8,
                                                                border: '1px solid #e5e7eb',
                                                                background: '#fff',
                                                                borderRadius: 4,
                                                                width: 18,
                                                                height: 18,
                                                                lineHeight: '16px',
                                                                textAlign: 'center',
                                                                fontSize: 12,
                                                                cursor: 'pointer'
                                                            },
                                                            children: expandedNow ? '–' : '+'
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/BudgetGrid.tanstack.tsx",
                                                            lineNumber: 547,
                                                            columnNumber: 53
                                                        }, void 0),
                                                        String(groupVal ?? ''),
                                                        ' ',
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            style: {
                                                                color: '#64748b',
                                                                fontWeight: 400
                                                            },
                                                            children: [
                                                                "(",
                                                                row.subRows?.length ?? 0,
                                                                ")"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/components/BudgetGrid.tanstack.tsx",
                                                            lineNumber: 568,
                                                            columnNumber: 53
                                                        }, void 0)
                                                    ]
                                                }, cell.id, true, {
                                                    fileName: "[project]/components/BudgetGrid.tanstack.tsx",
                                                    lineNumber: 537,
                                                    columnNumber: 49
                                                }, void 0);
                                            }
                                            // Aggregated cell (e.g., Amount totals on group rows)
                                            if (isAggregated) {
                                                const v = cell.getValue();
                                                const isNumeric = (cell.column.columnDef.meta?.isNumeric ?? false) === true;
                                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    style: {
                                                        borderBottom: `1px solid ${BODY_LINE}`,
                                                        borderRight: `1px solid ${BODY_LINE}`,
                                                        padding: '6px 10px',
                                                        background: '#fff',
                                                        fontWeight: 600,
                                                        textAlign: isNumeric ? 'right' : 'left'
                                                    },
                                                    children: cell.column.id === 'amount' ? formatCurrency(Number(v) || 0) : String(v ?? '')
                                                }, cell.id, false, {
                                                    fileName: "[project]/components/BudgetGrid.tanstack.tsx",
                                                    lineNumber: 578,
                                                    columnNumber: 49
                                                }, void 0);
                                            }
                                            // Placeholder cell (render nothing but keep grid lines)
                                            if (isPlaceholder) {
                                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    style: {
                                                        borderBottom: `1px solid ${BODY_LINE}`,
                                                        borderRight: `1px solid ${BODY_LINE}`,
                                                        padding: '6px 10px',
                                                        background: '#fff'
                                                    }
                                                }, cell.id, false, {
                                                    fileName: "[project]/components/BudgetGrid.tanstack.tsx",
                                                    lineNumber: 597,
                                                    columnNumber: 49
                                                }, void 0);
                                            }
                                            // Leaf cell
                                            const isNumeric = (cell.column.columnDef.meta?.isNumeric ?? false) === true;
                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                style: {
                                                    borderBottom: `1px solid ${BODY_LINE}`,
                                                    borderRight: `1px solid ${BODY_LINE}`,
                                                    padding: '6px 10px',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    whiteSpace: 'nowrap',
                                                    textAlign: isNumeric ? 'right' : 'left',
                                                    background: '#fff'
                                                },
                                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$table$2f$build$2f$lib$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["flexRender"])(cell.column.columnDef.cell, cell.getContext())
                                            }, cell.id, false, {
                                                fileName: "[project]/components/BudgetGrid.tanstack.tsx",
                                                lineNumber: 612,
                                                columnNumber: 45
                                            }, void 0);
                                        })
                                    }, row.id, false, {
                                        fileName: "[project]/components/BudgetGrid.tanstack.tsx",
                                        lineNumber: 525,
                                        columnNumber: 33
                                    }, void 0)
                            }, void 0, false, {
                                fileName: "[project]/components/BudgetGrid.tanstack.tsx",
                                lineNumber: 518,
                                columnNumber: 25
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/BudgetGrid.tanstack.tsx",
                            lineNumber: 517,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tfoot", {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                children: leafCols.map((col, idx)=>{
                                    const content = col.id === 'amount' ? formatCurrency(totalsObj.amount ?? 0) : idx === 0 ? 'Totals' : '';
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                        style: {
                                            borderTop: `2px solid ${HEADER_DIVIDER}`,
                                            borderRight: `1px solid ${BODY_LINE}`,
                                            fontWeight: 600,
                                            padding: '8px 10px',
                                            textAlign: col.id === 'amount' ? 'right' : 'left',
                                            background: '#fbfcfd'
                                        },
                                        children: content
                                    }, col.id, false, {
                                        fileName: "[project]/components/BudgetGrid.tanstack.tsx",
                                        lineNumber: 641,
                                        columnNumber: 37
                                    }, this);
                                })
                            }, void 0, false, {
                                fileName: "[project]/components/BudgetGrid.tanstack.tsx",
                                lineNumber: 636,
                                columnNumber: 25
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/BudgetGrid.tanstack.tsx",
                            lineNumber: 635,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/BudgetGrid.tanstack.tsx",
                    lineNumber: 367,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/BudgetGrid.tanstack.tsx",
                lineNumber: 357,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/BudgetGrid.tanstack.tsx",
        lineNumber: 277,
        columnNumber: 9
    }, this);
}
``;
}),
"[project]/app/agm/budget/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AgmBudgetPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/styled-jsx/style.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$BudgetGrid$2e$tanstack$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/BudgetGrid.tanstack.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$grid$2f$columns$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/grid/columns.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
/* ============================================================================
   DATA LOADER (PUBLIC -> served at /budgetLines.json)
   ============================================================================ */ const DATA_URL = '/budgetLines.json';
async function loadRows() {
    const res = await fetch(DATA_URL, {
        cache: 'no-store'
    });
    if (!res.ok) throw new Error(`Failed to load ${DATA_URL} (HTTP ${res.status})`);
    const json = await res.json();
    if (!Array.isArray(json)) throw new Error(`Unexpected JSON shape from ${DATA_URL}`);
    return json;
}
/* ============================================================================
   Tiny UI helpers
   ============================================================================ */ const Label = ({ children })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            fontSize: 12,
            color: '#6b7a8a',
            fontWeight: 600,
            marginBottom: 4
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/app/agm/budget/page.tsx",
        lineNumber: 32,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
const SmallCard = ({ title, value })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            background: '#fff',
            border: '1px solid #e9eef1',
            borderRadius: 10,
            padding: '10px 12px',
            display: 'flex',
            flexDirection: 'column',
            gap: 4,
            minHeight: 64
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    fontSize: 11,
                    color: '#7a8a99'
                },
                children: title
            }, void 0, false, {
                fileName: "[project]/app/agm/budget/page.tsx",
                lineNumber: 48,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    fontSize: 22,
                    fontWeight: 600
                },
                children: value
            }, void 0, false, {
                fileName: "[project]/app/agm/budget/page.tsx",
                lineNumber: 49,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/app/agm/budget/page.tsx",
        lineNumber: 36,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
function MultiSelectGrouped({ placeholder, groups, selected, onChange, width }) {
    const [open, setOpen] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"](false);
    const containerRef = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"](null);
    const toggleItem = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"]((item)=>{
        const next = new Set(selected);
        next.has(item) ? next.delete(item) : next.add(item);
        onChange(next);
    }, [
        selected,
        onChange
    ]);
    const toggleGroup = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"]((items)=>{
        const next = new Set(selected);
        const allSelected = items.every((i)=>next.has(i));
        if (allSelected) items.forEach((i)=>next.delete(i));
        else items.forEach((i)=>next.add(i));
        onChange(next);
    }, [
        selected,
        onChange
    ]);
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"](()=>{
        if (!open) return;
        const handle = (e)=>{
            if (containerRef.current && !containerRef.current.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener('mousedown', handle);
        return ()=>document.removeEventListener('mousedown', handle);
    }, [
        open
    ]);
    const summary = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"](()=>{
        const count = selected.size;
        if (count === 0) return placeholder;
        if (count <= 2) return Array.from(selected).join(', ');
        return `${count} selected`;
    }, [
        selected,
        placeholder
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: containerRef,
        style: {
            position: 'relative',
            width
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                onClick: ()=>setOpen((o)=>!o),
                style: {
                    width: '100%',
                    padding: '8px 10px',
                    borderRadius: 8,
                    border: '1px solid #e5e5e5',
                    background: '#fff',
                    textAlign: 'left'
                },
                "aria-haspopup": "listbox",
                "aria-expanded": open,
                children: summary
            }, void 0, false, {
                fileName: "[project]/app/agm/budget/page.tsx",
                lineNumber: 116,
                columnNumber: 13
            }, this),
            open && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                role: "listbox",
                style: {
                    position: 'absolute',
                    zIndex: 50,
                    top: 'calc(100% + 6px)',
                    left: 0,
                    width: Math.max(260, width),
                    maxHeight: 320,
                    overflowY: 'auto',
                    background: '#fff',
                    border: '1px solid #e5e5e5',
                    borderRadius: 8,
                    boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
                    padding: 10
                },
                children: groups.map(({ group, items })=>{
                    const allSelected = items.every((i)=>selected.has(i));
                    const someSelected = items.some((i)=>selected.has(i));
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            paddingBottom: 10,
                            marginBottom: 10,
                            borderBottom: '1px solid #f0f3f6'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                style: {
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 8,
                                    marginBottom: 6
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "checkbox",
                                        checked: allSelected,
                                        ref: (el)=>{
                                            if (el) el.indeterminate = !allSelected && someSelected;
                                        },
                                        onChange: ()=>toggleGroup(items)
                                    }, void 0, false, {
                                        fileName: "[project]/app/agm/budget/page.tsx",
                                        lineNumber: 160,
                                        columnNumber: 37
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            fontWeight: 700,
                                            fontSize: 12,
                                            color: '#334155'
                                        },
                                        children: group
                                    }, void 0, false, {
                                        fileName: "[project]/app/agm/budget/page.tsx",
                                        lineNumber: 168,
                                        columnNumber: 37
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/agm/budget/page.tsx",
                                lineNumber: 159,
                                columnNumber: 33
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: 'grid',
                                    gridTemplateColumns: '1fr 1fr',
                                    gap: 4
                                },
                                children: items.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        style: {
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 6,
                                            fontSize: 13
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "checkbox",
                                                checked: selected.has(item),
                                                onChange: ()=>toggleItem(item)
                                            }, void 0, false, {
                                                fileName: "[project]/app/agm/budget/page.tsx",
                                                lineNumber: 174,
                                                columnNumber: 45
                                            }, this),
                                            item
                                        ]
                                    }, item, true, {
                                        fileName: "[project]/app/agm/budget/page.tsx",
                                        lineNumber: 173,
                                        columnNumber: 41
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/app/agm/budget/page.tsx",
                                lineNumber: 171,
                                columnNumber: 33
                            }, this)
                        ]
                    }, group, true, {
                        fileName: "[project]/app/agm/budget/page.tsx",
                        lineNumber: 155,
                        columnNumber: 29
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/app/agm/budget/page.tsx",
                lineNumber: 134,
                columnNumber: 17
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/agm/budget/page.tsx",
        lineNumber: 115,
        columnNumber: 9
    }, this);
}
function AgmBudgetPage() {
    const [rows, setRows] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"]([]);
    const [loading, setLoading] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"](true);
    const [error, setError] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"](null);
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"](()=>{
        let alive = true;
        (async ()=>{
            try {
                const data = await loadRows();
                if (!alive) return;
                setRows(data);
                if (data.length === 0) setError('No data found at /budgetLines.json');
            } catch (err) {
                if (!alive) return;
                setError(err?.message || 'Failed to load /budgetLines.json');
            } finally{
                if (alive) setLoading(false);
            }
        })();
        return ()=>{
            alive = false;
        };
    }, []);
    /* --------------------------------------------------------------------------
       SHARED FILTER STATE (for Community / Year / Quarter / Month)
       -------------------------------------------------------------------------- */ const [filters, setFilters] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"]([]);
    const get = (id)=>filters.find((f)=>f.id === id)?.value ?? '';
    const selected = {
        community: get('community'),
        year: get('year') || '',
        quarter: get('quarter'),
        month: get('month'),
        budgetType: get('budgetType'),
        category: get('category')
    };
    /* --------------------------------------------------------------------------
       OPTIONS (derived from data)
       -------------------------------------------------------------------------- */ const allCommunities = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"](()=>Array.from(new Set(rows.map((r)=>r.community).filter(Boolean))).sort(), [
        rows
    ]);
    const allYears = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"](()=>Array.from(new Set(rows.map((r)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$grid$2f$columns$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["deriveYear"])(r.period)).filter(Boolean))).sort(), [
        rows
    ]);
    const allQuarters = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"](()=>Array.from(new Set(rows.map((r)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$grid$2f$columns$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["deriveQuarterLabel"])(r.period)).filter(Boolean))).sort(), [
        rows
    ]);
    const allMonths = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"](()=>Array.from(new Set(rows.map((r)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$grid$2f$columns$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["deriveMonthLabel"])(r.period)).filter(Boolean))).sort(), [
        rows
    ]);
    // Revenue subcategories (for the Revenue totals picker)
    const revenueSubcats = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"](()=>Array.from(new Set(rows.filter((r)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$grid$2f$columns$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mapBudgetType"])(r.type) === 'Revenue').map((r)=>typeof r.subCategory === 'string' ? r.subCategory : '').filter((s)=>s.length > 0))).sort(), [
        rows
    ]);
    // EXPENSE GROUPING — Hybrid (A): use dash prefix if present, else use category (C)
    // Produces: GroupedOptions with items strictly string[]
    const expenseGroups = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"](()=>{
        const map = new Map();
        for (const r of rows){
            const t = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$grid$2f$columns$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mapBudgetType"])(r.type);
            if (t === 'Expense' || t === 'CapEx') {
                const sub = typeof r.subCategory === 'string' ? r.subCategory.trim() : '';
                if (!sub) continue;
                // If subcategory has a dash, group by the prefix; else group by the category
                const dashIdx = sub.indexOf('-');
                const byPrefix = dashIdx > 0 ? sub.slice(0, dashIdx).trim() : '';
                const fallbackCat = String(r.category ?? '').trim() || (t === 'CapEx' ? 'CapEx' : 'Expense');
                const group = byPrefix || fallbackCat;
                if (!map.has(group)) map.set(group, new Set());
                map.get(group).add(sub);
            }
        }
        return Array.from(map.entries()).map(([group, set])=>({
                group,
                items: Array.from(set)
            })).sort((a, b)=>a.group.localeCompare(b.group));
    }, [
        rows
    ]);
    const revenueGroups = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"](()=>revenueSubcats.length ? [
            {
                group: 'Revenue',
                items: revenueSubcats
            }
        ] : [], [
        revenueSubcats
    ]);
    /* --------------------------------------------------------------------------
       FILTERED ROWS for cards & totals (respects Community/Year/Qtr/Month)
       -------------------------------------------------------------------------- */ const filteredRows = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"](()=>{
        return rows.filter((r)=>{
            if (selected.community && r.community !== selected.community) return false;
            const y = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$grid$2f$columns$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["deriveYear"])(r.period);
            if (selected.year && y !== selected.year) return false;
            const q = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$grid$2f$columns$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["deriveQuarterLabel"])(r.period);
            if (selected.quarter && q !== selected.quarter) return false;
            const m = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$grid$2f$columns$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["deriveMonthLabel"])(r.period);
            if (selected.month && m !== selected.month) return false;
            const bt = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$grid$2f$columns$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mapBudgetType"])(r.type);
            if (selected.budgetType && bt !== selected.budgetType) return false;
            if (selected.category && r.category !== selected.category) return false;
            return true;
        });
    }, [
        rows,
        selected
    ]);
    /* --------------------------------------------------------------------------
       KPI CARDS (Revenue, Expense, Net)
       -------------------------------------------------------------------------- */ const totals = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"](()=>{
        let rev = 0, exp = 0;
        for (const r of filteredRows){
            const amt = Number(r.amount ?? 0);
            const bt = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$grid$2f$columns$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mapBudgetType"])(r.type);
            if (bt === 'Revenue') rev += amt;
            else if (bt === 'Expense' || bt === 'CapEx') exp += amt;
        }
        return {
            rev,
            exp,
            net: rev - exp
        };
    }, [
        filteredRows
    ]);
    const fmt = (n)=>Intl.NumberFormat(undefined, {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: 0
        }).format(n || 0);
    /* --------------------------------------------------------------------------
       CATEGORY TOTAL SELECTORS — grouped multi-select
       -------------------------------------------------------------------------- */ const [revSel, setRevSel] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"](new Set());
    const [expSel, setExpSel] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"](new Set());
    const revCatTotal = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"](()=>{
        if (!revSel.size) return 0;
        return filteredRows.filter((r)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$grid$2f$columns$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mapBudgetType"])(r.type) === 'Revenue' && revSel.has(String(r.subCategory))).reduce((sum, r)=>sum + Number(r.amount ?? 0), 0);
    }, [
        filteredRows,
        revSel
    ]);
    const expCatTotal = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"](()=>{
        if (!expSel.size) return 0;
        return filteredRows.filter((r)=>{
            const t = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$grid$2f$columns$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mapBudgetType"])(r.type);
            return (t === 'Expense' || t === 'CapEx') && expSel.has(String(r.subCategory));
        }).reduce((sum, r)=>sum + Number(r.amount ?? 0), 0);
    }, [
        filteredRows,
        expSel
    ]);
    /* --------------------------------------------------------------------------
       PAGE LAYOUT
       -------------------------------------------------------------------------- */ const CATEGORY_WIDTH = 420;
    const RIGHT_PANEL_MAX = 540;
    const COMPACT = 120;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        style: {
            padding: 16,
            display: 'flex',
            flexDirection: 'column',
            gap: 14
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                style: {
                    display: 'grid',
                    gridTemplateColumns: '280px 1fr',
                    columnGap: 220,
                    alignItems: 'center',
                    marginBottom: 6
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Label, {
                                children: "Community"
                            }, void 0, false, {
                                fileName: "[project]/app/agm/budget/page.tsx",
                                lineNumber: 382,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                value: selected.community,
                                onChange: (e)=>setFilters((prev)=>{
                                        const v = e.target.value || '';
                                        const next = prev.filter((f)=>f.id !== 'community');
                                        if (v) next.push({
                                            id: 'community',
                                            value: v
                                        });
                                        return next;
                                    }),
                                style: {
                                    width: '100%',
                                    padding: '8px 10px',
                                    borderRadius: 8,
                                    border: '1px solid #e5e5e5',
                                    background: '#fff'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "",
                                        children: "All"
                                    }, void 0, false, {
                                        fileName: "[project]/app/agm/budget/page.tsx",
                                        lineNumber: 401,
                                        columnNumber: 25
                                    }, this),
                                    allCommunities.map((c)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                            value: c,
                                            children: c
                                        }, c, false, {
                                            fileName: "[project]/app/agm/budget/page.tsx",
                                            lineNumber: 403,
                                            columnNumber: 29
                                        }, this))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/agm/budget/page.tsx",
                                lineNumber: 383,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/agm/budget/page.tsx",
                        lineNumber: 381,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: 'flex',
                            justifyContent: 'flex-start'
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                width: '100%',
                                maxWidth: RIGHT_PANEL_MAX,
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 18,
                                marginTop: -4
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Label, {
                                        children: "Revenue Category Totals"
                                    }, void 0, false, {
                                        fileName: "[project]/app/agm/budget/page.tsx",
                                        lineNumber: 423,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: 'grid',
                                            gridTemplateColumns: 'auto 120px',
                                            gap: 12
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(MultiSelectGrouped, {
                                                placeholder: "Pick category",
                                                groups: revenueGroups,
                                                selected: revSel,
                                                onChange: setRevSel,
                                                width: CATEGORY_WIDTH
                                            }, void 0, false, {
                                                fileName: "[project]/app/agm/budget/page.tsx",
                                                lineNumber: 425,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    border: '1px solid #e5e5e5',
                                                    borderRadius: 8,
                                                    padding: '8px 10px',
                                                    textAlign: 'right',
                                                    background: '#fff',
                                                    fontWeight: 600,
                                                    width: 120
                                                },
                                                children: fmt(revCatTotal)
                                            }, void 0, false, {
                                                fileName: "[project]/app/agm/budget/page.tsx",
                                                lineNumber: 432,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/agm/budget/page.tsx",
                                        lineNumber: 424,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/agm/budget/page.tsx",
                                lineNumber: 422,
                                columnNumber: 25
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/agm/budget/page.tsx",
                            lineNumber: 412,
                            columnNumber: 21
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/agm/budget/page.tsx",
                        lineNumber: 411,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/agm/budget/page.tsx",
                lineNumber: 371,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                style: {
                    display: 'grid',
                    gridTemplateColumns: '280px 1fr',
                    columnGap: 220,
                    alignItems: 'start'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 10,
                            marginTop: -6
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SmallCard, {
                                title: "TOTAL REVENUE",
                                value: fmt(totals.rev)
                            }, void 0, false, {
                                fileName: "[project]/app/agm/budget/page.tsx",
                                lineNumber: 462,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SmallCard, {
                                title: "TOTAL EXPENSE",
                                value: fmt(totals.exp)
                            }, void 0, false, {
                                fileName: "[project]/app/agm/budget/page.tsx",
                                lineNumber: 463,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SmallCard, {
                                title: "NET",
                                value: fmt(totals.net)
                            }, void 0, false, {
                                fileName: "[project]/app/agm/budget/page.tsx",
                                lineNumber: 464,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/agm/budget/page.tsx",
                        lineNumber: 461,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: 'flex',
                            justifyContent: 'flex-start'
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                width: '100%',
                                maxWidth: RIGHT_PANEL_MAX,
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 18,
                                marginTop: -10
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Label, {
                                            children: "Expense Category Totals"
                                        }, void 0, false, {
                                            fileName: "[project]/app/agm/budget/page.tsx",
                                            lineNumber: 481,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                display: 'grid',
                                                gridTemplateColumns: 'auto 120px',
                                                gap: 12
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(MultiSelectGrouped, {
                                                    placeholder: "Pick category",
                                                    groups: expenseGroups,
                                                    selected: expSel,
                                                    onChange: setExpSel,
                                                    width: CATEGORY_WIDTH
                                                }, void 0, false, {
                                                    fileName: "[project]/app/agm/budget/page.tsx",
                                                    lineNumber: 483,
                                                    columnNumber: 33
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        border: '1px solid #e5e5e5',
                                                        borderRadius: 8,
                                                        padding: '8px 10px',
                                                        textAlign: 'right',
                                                        background: '#fff',
                                                        fontWeight: 600,
                                                        width: 120
                                                    },
                                                    children: fmt(expCatTotal)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/agm/budget/page.tsx",
                                                    lineNumber: 490,
                                                    columnNumber: 33
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/agm/budget/page.tsx",
                                            lineNumber: 482,
                                            columnNumber: 29
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/agm/budget/page.tsx",
                                    lineNumber: 480,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        display: 'flex',
                                        alignItems: 'flex-end',
                                        gap: 12,
                                        flexWrap: 'wrap'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Label, {
                                                    children: "Year"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/agm/budget/page.tsx",
                                                    lineNumber: 509,
                                                    columnNumber: 33
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                    value: String(selected.year || ''),
                                                    onChange: (e)=>setFilters((f)=>{
                                                            const next = f.filter((x)=>x.id !== 'year');
                                                            if (e.target.value) next.push({
                                                                id: 'year',
                                                                value: Number(e.target.value)
                                                            });
                                                            return next;
                                                        }),
                                                    style: {
                                                        width: COMPACT,
                                                        padding: '8px 10px',
                                                        borderRadius: 8,
                                                        border: '1px solid #e5e5e5',
                                                        background: '#fff'
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: "",
                                                            children: "All"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/agm/budget/page.tsx",
                                                            lineNumber: 527,
                                                            columnNumber: 37
                                                        }, this),
                                                        allYears.map((y)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: y,
                                                                children: y
                                                            }, y, false, {
                                                                fileName: "[project]/app/agm/budget/page.tsx",
                                                                lineNumber: 529,
                                                                columnNumber: 41
                                                            }, this))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/agm/budget/page.tsx",
                                                    lineNumber: 510,
                                                    columnNumber: 33
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/agm/budget/page.tsx",
                                            lineNumber: 508,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Label, {
                                                    children: "Quarter"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/agm/budget/page.tsx",
                                                    lineNumber: 537,
                                                    columnNumber: 33
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                    value: selected.quarter,
                                                    onChange: (e)=>setFilters((f)=>{
                                                            const next = f.filter((x)=>x.id !== 'quarter');
                                                            if (e.target.value) next.push({
                                                                id: 'quarter',
                                                                value: e.target.value
                                                            });
                                                            return next;
                                                        }),
                                                    style: {
                                                        width: COMPACT,
                                                        padding: '8px 10px',
                                                        borderRadius: 8,
                                                        border: '1px solid #e5e5e5',
                                                        background: '#fff'
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: "",
                                                            children: "All"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/agm/budget/page.tsx",
                                                            lineNumber: 555,
                                                            columnNumber: 37
                                                        }, this),
                                                        allQuarters.map((q)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: q,
                                                                children: q
                                                            }, q, false, {
                                                                fileName: "[project]/app/agm/budget/page.tsx",
                                                                lineNumber: 557,
                                                                columnNumber: 41
                                                            }, this))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/agm/budget/page.tsx",
                                                    lineNumber: 538,
                                                    columnNumber: 33
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/agm/budget/page.tsx",
                                            lineNumber: 536,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Label, {
                                                    children: "Month"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/agm/budget/page.tsx",
                                                    lineNumber: 565,
                                                    columnNumber: 33
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                    value: selected.month,
                                                    onChange: (e)=>setFilters((f)=>{
                                                            const next = f.filter((x)=>x.id !== 'month');
                                                            if (e.target.value) next.push({
                                                                id: 'month',
                                                                value: e.target.value
                                                            });
                                                            return next;
                                                        }),
                                                    style: {
                                                        width: COMPACT,
                                                        padding: '8px 10px',
                                                        borderRadius: 8,
                                                        border: '1px solid #e5e5e5',
                                                        background: '#fff'
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: "",
                                                            children: "All"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/agm/budget/page.tsx",
                                                            lineNumber: 583,
                                                            columnNumber: 37
                                                        }, this),
                                                        allMonths.map((m)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: m,
                                                                children: m
                                                            }, m, false, {
                                                                fileName: "[project]/app/agm/budget/page.tsx",
                                                                lineNumber: 585,
                                                                columnNumber: 41
                                                            }, this))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/agm/budget/page.tsx",
                                                    lineNumber: 566,
                                                    columnNumber: 33
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/agm/budget/page.tsx",
                                            lineNumber: 564,
                                            columnNumber: 29
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/agm/budget/page.tsx",
                                    lineNumber: 507,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/agm/budget/page.tsx",
                            lineNumber: 469,
                            columnNumber: 21
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/agm/budget/page.tsx",
                        lineNumber: 468,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/agm/budget/page.tsx",
                lineNumber: 452,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                id: "grid-wrapper",
                style: {
                    marginTop: -10
                },
                className: "jsx-a8a0ba75cb7ee073",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        id: "a8a0ba75cb7ee073",
                        children: "#grid-wrapper.jsx-a8a0ba75cb7ee073 .grid-toolbar.jsx-a8a0ba75cb7ee073{display:none!important}"
                    }, void 0, false, void 0, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$BudgetGrid$2e$tanstack$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        rows: rows,
                        filters: filters,
                        onFiltersChange: setFilters,
                        onUpdateAmount: (rowIndex, newValue)=>setRows((prev)=>{
                                if (rowIndex < 0 || rowIndex >= prev.length) return prev;
                                const next = prev.slice();
                                next[rowIndex] = {
                                    ...next[rowIndex],
                                    amount: newValue
                                };
                                return next;
                            }),
                        toolbarIds: []
                    }, void 0, false, {
                        fileName: "[project]/app/agm/budget/page.tsx",
                        lineNumber: 604,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/agm/budget/page.tsx",
                lineNumber: 597,
                columnNumber: 13
            }, this),
            loading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    color: '#6b7a8a'
                },
                children: "Loading data…"
            }, void 0, false, {
                fileName: "[project]/app/agm/budget/page.tsx",
                lineNumber: 620,
                columnNumber: 25
            }, this),
            error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    color: 'crimson'
                },
                children: error
            }, void 0, false, {
                fileName: "[project]/app/agm/budget/page.tsx",
                lineNumber: 621,
                columnNumber: 23
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/agm/budget/page.tsx",
        lineNumber: 369,
        columnNumber: 9
    }, this);
}
}),
];

//# sourceMappingURL=_1b275e90._.js.map