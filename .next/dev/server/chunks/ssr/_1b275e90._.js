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
// ---------- small utils ----------
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
function formatCurrency(n) {
    return Intl.NumberFormat(undefined, {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0
    }).format(n || 0);
}
function BudgetGrid({ rows, initialSorting = [], initialFilters = [], filters, onFiltersChange, onUpdateAmount, toolbarIds = [
    'year',
    'quarter',
    'budgetType',
    'category'
] }) {
    // Data (local state for edits unless parent handles onUpdateAmount)
    const [data, setData] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"](()=>rows ?? []);
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"](()=>{
        // adopt rows from parent when they refresh
        if (rows) setData(rows);
    }, [
        rows
    ]);
    // Sorting
    const [sorting, setSorting] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"](initialSorting);
    // Filters: controlled vs uncontrolled
    const isControlled = !!filters && !!onFiltersChange;
    const [uncontrolledFilters, setUncontrolledFilters] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"](initialFilters);
    const effectiveFilters = isControlled ? filters : uncontrolledFilters;
    const setEffectiveFilters = isControlled ? onFiltersChange : setUncontrolledFilters;
    // Update from AmountCell
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
    // Table
    const table = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$table$2f$build$2f$lib$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["useReactTable"])({
        data,
        columns: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$grid$2f$columns$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"],
        state: {
            sorting,
            columnFilters: effectiveFilters
        },
        onSortingChange: setSorting,
        onColumnFiltersChange: setEffectiveFilters,
        getCoreRowModel: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$table$2d$core$2f$build$2f$lib$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getCoreRowModel"])(),
        getSortedRowModel: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$table$2d$core$2f$build$2f$lib$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getSortedRowModel"])(),
        getFilteredRowModel: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$table$2d$core$2f$build$2f$lib$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getFilteredRowModel"])(),
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
    // Totals for the table footer (already filtered)
    const totalsObj = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$grid$2f$totals$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["buildTotalsFromTable"])(table, [
        'amount'
    ]);
    // ---- Visual Theme Tweaks (borders/lines) ----
    // A slightly darker neutral for header dividers:
    const HEADER_DIVIDER = '#d0d7df'; // header bottom + header vertical
    // Body grid lines (match vertical/horizontal):
    const BODY_LINE = '#e1e7ec';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        style: {
            display: 'flex',
            flexDirection: 'column',
            gap: 12
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$grid$2f$ToolbarFilters$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                ids: toolbarIds,
                filters: effectiveFilters,
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
                lineNumber: 152,
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
                                    lineNumber: 188,
                                    columnNumber: 29
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/components/BudgetGrid.tanstack.tsx",
                            lineNumber: 186,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                            children: table.getHeaderGroups().map((hg)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                    children: hg.headers.map((h)=>{
                                        const canResize = h.column.getCanResize();
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            colSpan: h.colSpan,
                                            style: {
                                                position: 'relative',
                                                background: 'var(--th-bg, #f7f9fb)',
                                                textAlign: 'center',
                                                fontWeight: 600,
                                                // Stronger header bottom divider
                                                borderBottom: `1px solid ${HEADER_DIVIDER}`,
                                                // Stronger vertical header lines (match body verticals)
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
                                                    lineNumber: 226,
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
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$grid$2f$VirtualRows$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                rows: table.getRowModel().rows,
                                rowHeight: 36,
                                overscan: 8,
                                scrollContainerRef: scrollRef,
                                visibleColumnCount: leafCols.length,
                                renderRow: (row)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                        children: row.getVisibleCells().map((cell)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                style: {
                                                    // Uniform, slightly lighter than header but matching V/H
                                                    borderBottom: `1px solid ${BODY_LINE}`,
                                                    borderRight: `1px solid ${BODY_LINE}`,
                                                    padding: '8px 10px',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    whiteSpace: 'nowrap',
                                                    textAlign: 'left',
                                                    background: '#fff'
                                                },
                                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$table$2f$build$2f$lib$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["flexRender"])(cell.column.columnDef.cell, cell.getContext())
                                            }, cell.id, false, {
                                                fileName: "[project]/components/BudgetGrid.tanstack.tsx",
                                                lineNumber: 262,
                                                columnNumber: 41
                                            }, void 0))
                                    }, row.id, false, {
                                        fileName: "[project]/components/BudgetGrid.tanstack.tsx",
                                        lineNumber: 260,
                                        columnNumber: 33
                                    }, void 0)
                            }, void 0, false, {
                                fileName: "[project]/components/BudgetGrid.tanstack.tsx",
                                lineNumber: 253,
                                columnNumber: 25
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/BudgetGrid.tanstack.tsx",
                            lineNumber: 252,
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
                                            textAlign: 'left',
                                            background: '#fbfcfd'
                                        },
                                        children: content
                                    }, col.id, false, {
                                        fileName: "[project]/components/BudgetGrid.tanstack.tsx",
                                        lineNumber: 291,
                                        columnNumber: 37
                                    }, this);
                                })
                            }, void 0, false, {
                                fileName: "[project]/components/BudgetGrid.tanstack.tsx",
                                lineNumber: 286,
                                columnNumber: 25
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/BudgetGrid.tanstack.tsx",
                            lineNumber: 285,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/BudgetGrid.tanstack.tsx",
                    lineNumber: 178,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/BudgetGrid.tanstack.tsx",
                lineNumber: 168,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/BudgetGrid.tanstack.tsx",
        lineNumber: 150,
        columnNumber: 9
    }, this);
}
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
// app/agm/budget/page.tsx
'use client';
;
;
;
;
;
/* ============================================================================
   DATA LOADER (PUBLIC -> served at /budgetLines.json)
   - Enforce exact path
   - No fallbacks
   - Clear surfaced errors
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
    const revenueCats = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"](()=>Array.from(new Set(rows.filter((r)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$grid$2f$columns$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mapBudgetType"])(r.type) === 'Revenue').map((r)=>r.category).filter(Boolean))).sort(), [
        rows
    ]);
    const expenseCats = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"](()=>Array.from(new Set(rows.filter((r)=>{
            const t = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$grid$2f$columns$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mapBudgetType"])(r.type);
            return t === 'Expense' || t === 'CapEx';
        }).map((r)=>r.category).filter(Boolean))).sort(), [
        rows
    ]);
    /* --------------------------------------------------------------------------
       FILTERING PIPELINE FOR CARDS + TOTALS (respects Community/Year/Qtr/Month)
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
       CATEGORY TOTAL SELECTORS — local state (restored working behavior)
       -------------------------------------------------------------------------- */ const [revCatPick, setRevCatPick] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"]('');
    const [expCatPick, setExpCatPick] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"]('');
    const revCatTotal = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"](()=>{
        if (!revCatPick) return 0;
        return filteredRows.filter((r)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$grid$2f$columns$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mapBudgetType"])(r.type) === 'Revenue' && r.category === revCatPick).reduce((sum, r)=>sum + Number(r.amount ?? 0), 0);
    }, [
        filteredRows,
        revCatPick
    ]);
    const expCatTotal = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"](()=>{
        if (!expCatPick) return 0;
        return filteredRows.filter((r)=>{
            const t = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$grid$2f$columns$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mapBudgetType"])(r.type);
            return (t === 'Expense' || t === 'CapEx') && r.category === expCatPick;
        }).reduce((sum, r)=>sum + Number(r.amount ?? 0), 0);
    }, [
        filteredRows,
        expCatPick
    ]);
    /* --------------------------------------------------------------------------
       SMALL UI PIECES
       -------------------------------------------------------------------------- */ const SmallCard = ({ title, value })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                    lineNumber: 198,
                    columnNumber: 13
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        fontSize: 22,
                        fontWeight: 600
                    },
                    children: value
                }, void 0, false, {
                    fileName: "[project]/app/agm/budget/page.tsx",
                    lineNumber: 199,
                    columnNumber: 13
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/agm/budget/page.tsx",
            lineNumber: 186,
            columnNumber: 9
        }, this);
    const Label = ({ children })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: {
                fontSize: 12,
                color: '#6b7a8a',
                fontWeight: 600,
                marginBottom: 4
            },
            children: children
        }, void 0, false, {
            fileName: "[project]/app/agm/budget/page.tsx",
            lineNumber: 204,
            columnNumber: 9
        }, this);
    /* --------------------------------------------------------------------------
       PAGE LAYOUT
       -------------------------------------------------------------------------- */ const CATEGORY_WIDTH = 420; // width of category dropdowns
    const RIGHT_PANEL_MAX = 540; // max width of right-hand column
    const COMPACT = 120; // compact width for Year/Quarter/Month
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
                                lineNumber: 228,
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
                                    border: '1px solid #e5e5e5'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "",
                                        children: "All"
                                    }, void 0, false, {
                                        fileName: "[project]/app/agm/budget/page.tsx",
                                        lineNumber: 246,
                                        columnNumber: 25
                                    }, this),
                                    allCommunities.map((c)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                            value: c,
                                            children: c
                                        }, c, false, {
                                            fileName: "[project]/app/agm/budget/page.tsx",
                                            lineNumber: 248,
                                            columnNumber: 29
                                        }, this))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/agm/budget/page.tsx",
                                lineNumber: 229,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/agm/budget/page.tsx",
                        lineNumber: 227,
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
                                        lineNumber: 269,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: 'grid',
                                            gridTemplateColumns: 'auto 120px',
                                            gap: 12
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                value: revCatPick,
                                                onChange: (e)=>setRevCatPick(e.target.value),
                                                style: {
                                                    width: CATEGORY_WIDTH,
                                                    padding: '8px 10px',
                                                    borderRadius: 8,
                                                    border: '1px solid #e5e5e5'
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: "",
                                                        children: "Pick category"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/agm/budget/page.tsx",
                                                        lineNumber: 281,
                                                        columnNumber: 37
                                                    }, this),
                                                    revenueCats.map((c)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: c,
                                                            children: c
                                                        }, `rev-${c}`, false, {
                                                            fileName: "[project]/app/agm/budget/page.tsx",
                                                            lineNumber: 283,
                                                            columnNumber: 41
                                                        }, this))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/agm/budget/page.tsx",
                                                lineNumber: 271,
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
                                                lineNumber: 288,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/agm/budget/page.tsx",
                                        lineNumber: 270,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/agm/budget/page.tsx",
                                lineNumber: 268,
                                columnNumber: 25
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/agm/budget/page.tsx",
                            lineNumber: 257,
                            columnNumber: 21
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/agm/budget/page.tsx",
                        lineNumber: 256,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/agm/budget/page.tsx",
                lineNumber: 217,
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
                                lineNumber: 318,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SmallCard, {
                                title: "TOTAL EXPENSE",
                                value: fmt(totals.exp)
                            }, void 0, false, {
                                fileName: "[project]/app/agm/budget/page.tsx",
                                lineNumber: 319,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SmallCard, {
                                title: "NET",
                                value: fmt(totals.net)
                            }, void 0, false, {
                                fileName: "[project]/app/agm/budget/page.tsx",
                                lineNumber: 320,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/agm/budget/page.tsx",
                        lineNumber: 317,
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
                                            lineNumber: 337,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                display: 'grid',
                                                gridTemplateColumns: 'auto 120px',
                                                gap: 12
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                    value: expCatPick,
                                                    onChange: (e)=>setExpCatPick(e.target.value),
                                                    style: {
                                                        width: CATEGORY_WIDTH,
                                                        padding: '8px 10px',
                                                        borderRadius: 8,
                                                        border: '1px solid #e5e5e5'
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: "",
                                                            children: "Pick category"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/agm/budget/page.tsx",
                                                            lineNumber: 349,
                                                            columnNumber: 37
                                                        }, this),
                                                        expenseCats.map((c)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: c,
                                                                children: c
                                                            }, `exp-${c}`, false, {
                                                                fileName: "[project]/app/agm/budget/page.tsx",
                                                                lineNumber: 351,
                                                                columnNumber: 41
                                                            }, this))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/agm/budget/page.tsx",
                                                    lineNumber: 339,
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
                                                    lineNumber: 356,
                                                    columnNumber: 33
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/agm/budget/page.tsx",
                                            lineNumber: 338,
                                            columnNumber: 29
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/agm/budget/page.tsx",
                                    lineNumber: 336,
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
                                                    lineNumber: 375,
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
                                                        border: '1px solid #e5e5e5'
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: "",
                                                            children: "All"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/agm/budget/page.tsx",
                                                            lineNumber: 392,
                                                            columnNumber: 37
                                                        }, this),
                                                        allYears.map((y)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: y,
                                                                children: y
                                                            }, y, false, {
                                                                fileName: "[project]/app/agm/budget/page.tsx",
                                                                lineNumber: 394,
                                                                columnNumber: 41
                                                            }, this))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/agm/budget/page.tsx",
                                                    lineNumber: 376,
                                                    columnNumber: 33
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/agm/budget/page.tsx",
                                            lineNumber: 374,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Label, {
                                                    children: "Quarter"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/agm/budget/page.tsx",
                                                    lineNumber: 402,
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
                                                        border: '1px solid #e5e5e5'
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: "",
                                                            children: "All"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/agm/budget/page.tsx",
                                                            lineNumber: 419,
                                                            columnNumber: 37
                                                        }, this),
                                                        allQuarters.map((q)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: q,
                                                                children: q
                                                            }, q, false, {
                                                                fileName: "[project]/app/agm/budget/page.tsx",
                                                                lineNumber: 421,
                                                                columnNumber: 41
                                                            }, this))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/agm/budget/page.tsx",
                                                    lineNumber: 403,
                                                    columnNumber: 33
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/agm/budget/page.tsx",
                                            lineNumber: 401,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Label, {
                                                    children: "Month"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/agm/budget/page.tsx",
                                                    lineNumber: 429,
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
                                                        border: '1px solid #e5e5e5'
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: "",
                                                            children: "All"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/agm/budget/page.tsx",
                                                            lineNumber: 446,
                                                            columnNumber: 37
                                                        }, this),
                                                        allMonths.map((m)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: m,
                                                                children: m
                                                            }, m, false, {
                                                                fileName: "[project]/app/agm/budget/page.tsx",
                                                                lineNumber: 448,
                                                                columnNumber: 41
                                                            }, this))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/agm/budget/page.tsx",
                                                    lineNumber: 430,
                                                    columnNumber: 33
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/agm/budget/page.tsx",
                                            lineNumber: 428,
                                            columnNumber: 29
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/agm/budget/page.tsx",
                                    lineNumber: 373,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/agm/budget/page.tsx",
                            lineNumber: 325,
                            columnNumber: 21
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/agm/budget/page.tsx",
                        lineNumber: 324,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/agm/budget/page.tsx",
                lineNumber: 308,
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
                        lineNumber: 467,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/agm/budget/page.tsx",
                lineNumber: 460,
                columnNumber: 13
            }, this),
            loading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    color: '#6b7a8a'
                },
                children: "Loading data…"
            }, void 0, false, {
                fileName: "[project]/app/agm/budget/page.tsx",
                lineNumber: 483,
                columnNumber: 25
            }, this),
            error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    color: 'crimson'
                },
                children: error
            }, void 0, false, {
                fileName: "[project]/app/agm/budget/page.tsx",
                lineNumber: 484,
                columnNumber: 23
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/agm/budget/page.tsx",
        lineNumber: 215,
        columnNumber: 9
    }, this);
}
``;
}),
];

//# sourceMappingURL=_1b275e90._.js.map