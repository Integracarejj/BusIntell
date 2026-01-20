(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/components/BudgetGrid.tanstack.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>BudgetGrid
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
/**
 * BudgetGrid.tanstack.tsx — TanStack Table v8 + React Virtual
 * Toolbar retooled: Community (multi), Year (single), Budget Type (single),
 * Category (multi) + Clear Filters + Export CSV.
 * – Removes all Bulk Edit UI.
 * – Keeps: inline Amount editing, per-column text filters, virtualization,
 *   TOTAL (filtered) footer.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$table$2d$core$2f$build$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/table-core/build/lib/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$table$2f$build$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-table/build/lib/index.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$virtual$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-virtual/dist/esm/index.js [app-client] (ecmascript) <locals>");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature(), _s3 = __turbopack_context__.k.signature(), _s4 = __turbopack_context__.k.signature();
"use client";
;
;
;
// ---------- helpers ----------
const fmtUSD = (n)=>new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0
    }).format(n);
function exportRowsToCsv(rows, columns, fileName = "budget-grid.csv") {
    const colIds = columns.map((c)=>"accessorKey" in c && c.accessorKey ? String(c.accessorKey) : c.id ? String(c.id) : null).filter(Boolean);
    const esc = (s)=>{
        if (s === null || s === undefined) return "";
        const str = String(s);
        return /[",\n]/.test(str) ? `"${str.replace(/"/g, '""')}"` : str;
    };
    const header = colIds.join(",");
    const body = rows.map((r)=>colIds.map((k)=>{
            if (k === "amount") return esc(r[k] ?? "");
            return esc(r[k] ?? "");
        }).join(",")).join("\n");
    const csv = `${header}\n${body}`;
    const blob = new Blob([
        csv
    ], {
        type: "text/csv;charset=utf-8"
    });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(a.href);
}
// ---------- editable amount cell ----------
function AmountCell({ getValue, row, table }) {
    _s();
    const initial = getValue();
    const [editing, setEditing] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [draft, setDraft] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(typeof initial === "number" ? initial : initial == null ? "" : Number(initial));
    const commit = ()=>{
        const next = draft === "" ? null : Number(draft);
        table.options.meta?.updateRow?.(row.index, {
            amount: next
        });
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
                if (e.key === "Escape") setEditing(false);
            }
        }, void 0, false, {
            fileName: "[project]/components/BudgetGrid.tanstack.tsx",
            lineNumber: 121,
            columnNumber: 17
        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            className: "w-full text-right tabular-nums",
            onClick: ()=>setEditing(true),
            title: "Click to edit",
            children: typeof initial === "number" ? fmtUSD(initial) : "—"
        }, void 0, false, {
            fileName: "[project]/components/BudgetGrid.tanstack.tsx",
            lineNumber: 135,
            columnNumber: 17
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/BudgetGrid.tanstack.tsx",
        lineNumber: 119,
        columnNumber: 9
    }, this);
}
_s(AmountCell, "WHRZWq3xwn5HXUKdfPhkgGDrHO8=");
_c = AmountCell;
function useClickOutsideClose(onClose) {
    _s1();
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useEffect({
        "useClickOutsideClose.useEffect": ()=>{
            const onDocClick = {
                "useClickOutsideClose.useEffect.onDocClick": (e)=>{
                    if (!ref.current) return;
                    if (!ref.current.contains(e.target)) onClose();
                }
            }["useClickOutsideClose.useEffect.onDocClick"];
            const onEsc = {
                "useClickOutsideClose.useEffect.onEsc": (e)=>{
                    if (e.key === "Escape") onClose();
                }
            }["useClickOutsideClose.useEffect.onEsc"];
            document.addEventListener("mousedown", onDocClick);
            document.addEventListener("keydown", onEsc);
            return ({
                "useClickOutsideClose.useEffect": ()=>{
                    document.removeEventListener("mousedown", onDocClick);
                    document.removeEventListener("keydown", onEsc);
                }
            })["useClickOutsideClose.useEffect"];
        }
    }["useClickOutsideClose.useEffect"], [
        onClose
    ]);
    return ref;
}
_s1(useClickOutsideClose, "8uVE59eA/r6b92xF80p7sH8rXLk=");
function SingleSelect({ label, value, options, onChange, className, "aria-label": ariaLabel }) {
    _s2();
    const [open, setOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const ref = useClickOutsideClose({
        "SingleSelect.useClickOutsideClose[ref]": ()=>setOpen(false)
    }["SingleSelect.useClickOutsideClose[ref]"]);
    const current = options.find((o)=>o.value === value);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `relative ${className ?? ""}`,
        ref: ref,
        children: [
            label ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "sr-only",
                children: label
            }, void 0, false, {
                fileName: "[project]/components/BudgetGrid.tanstack.tsx",
                lineNumber: 191,
                columnNumber: 22
            }, this) : null,
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                "aria-label": ariaLabel || label,
                onClick: ()=>setOpen((o)=>!o),
                className: "inline-flex min-w-[168px] items-center justify-between rounded-md border border-slate-300 bg-white px-2.5 py-1.5 text-sm text-slate-800 shadow-sm hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "truncate",
                        children: current ? current.label : "All"
                    }, void 0, false, {
                        fileName: "[project]/components/BudgetGrid.tanstack.tsx",
                        lineNumber: 198,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                        viewBox: "0 0 20 20",
                        "aria-hidden": "true",
                        className: "ml-2 h-4 w-4 text-slate-500",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                            d: "M5.25 7.5l4.5 4.5 4.5-4.5",
                            stroke: "currentColor",
                            strokeWidth: "1.8",
                            fill: "none",
                            strokeLinecap: "round"
                        }, void 0, false, {
                            fileName: "[project]/components/BudgetGrid.tanstack.tsx",
                            lineNumber: 202,
                            columnNumber: 21
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/BudgetGrid.tanstack.tsx",
                        lineNumber: 201,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/BudgetGrid.tanstack.tsx",
                lineNumber: 192,
                columnNumber: 13
            }, this),
            open && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                role: "listbox",
                className: "absolute z-40 mt-1 max-h-64 w-[min(280px,calc(100vw-2rem))] overflow-auto rounded-md border border-slate-200 bg-white p-1 shadow-lg",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: "w-full rounded px-2 py-1 text-left text-sm text-slate-700 hover:bg-slate-100",
                        onClick: ()=>{
                            onChange(null);
                            setOpen(false);
                        },
                        children: "All"
                    }, void 0, false, {
                        fileName: "[project]/components/BudgetGrid.tanstack.tsx",
                        lineNumber: 210,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "my-1 h-px bg-slate-100"
                    }, void 0, false, {
                        fileName: "[project]/components/BudgetGrid.tanstack.tsx",
                        lineNumber: 216,
                        columnNumber: 21
                    }, this),
                    options.map((opt)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            role: "option",
                            "aria-selected": opt.value === value,
                            className: `w-full rounded px-2 py-1 text-left text-sm hover:bg-slate-100 ${opt.value === value ? "bg-teal-50 text-teal-700" : "text-slate-700"}`,
                            onClick: ()=>{
                                onChange(opt.value);
                                setOpen(false);
                            },
                            children: opt.label
                        }, opt.value, false, {
                            fileName: "[project]/components/BudgetGrid.tanstack.tsx",
                            lineNumber: 218,
                            columnNumber: 25
                        }, this))
                ]
            }, void 0, true, {
                fileName: "[project]/components/BudgetGrid.tanstack.tsx",
                lineNumber: 206,
                columnNumber: 17
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/BudgetGrid.tanstack.tsx",
        lineNumber: 190,
        columnNumber: 9
    }, this);
}
_s2(SingleSelect, "7NpOuong9QalW/zlcsgmzZigkzo=", false, function() {
    return [
        useClickOutsideClose
    ];
});
_c1 = SingleSelect;
function MultiSelect({ label, values, options, onChange, searchable = true, className, "aria-label": ariaLabel }) {
    _s3();
    const [open, setOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [query, setQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const ref = useClickOutsideClose({
        "MultiSelect.useClickOutsideClose[ref]": ()=>setOpen(false)
    }["MultiSelect.useClickOutsideClose[ref]"]);
    const display = values.length === 0 ? "All" : values.length <= 2 ? options.filter((o)=>values.includes(o.value)).map((o)=>o.label).join(", ") : `${values.length} selected`;
    const filtered = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "MultiSelect.useMemo[filtered]": ()=>{
            if (!searchable || !query.trim()) return options;
            const q = query.toLowerCase();
            return options.filter({
                "MultiSelect.useMemo[filtered]": (o)=>o.label.toLowerCase().includes(q)
            }["MultiSelect.useMemo[filtered]"]);
        }
    }["MultiSelect.useMemo[filtered]"], [
        options,
        searchable,
        query
    ]);
    const toggle = (val)=>{
        if (values.includes(val)) onChange(values.filter((v)=>v !== val));
        else onChange([
            ...values,
            val
        ]);
    };
    const selectAll = ()=>onChange(options.map((o)=>o.value));
    const clearAll = ()=>onChange([]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `relative ${className ?? ""}`,
        ref: ref,
        children: [
            label ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "sr-only",
                children: label
            }, void 0, false, {
                fileName: "[project]/components/BudgetGrid.tanstack.tsx",
                lineNumber: 280,
                columnNumber: 22
            }, this) : null,
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                "aria-label": ariaLabel || label,
                onClick: ()=>setOpen((o)=>!o),
                className: "inline-flex min-w-[220px] items-center justify-between rounded-md border border-slate-300 bg-white px-2.5 py-1.5 text-sm text-slate-800 shadow-sm hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "truncate",
                        children: display
                    }, void 0, false, {
                        fileName: "[project]/components/BudgetGrid.tanstack.tsx",
                        lineNumber: 287,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                        viewBox: "0 0 20 20",
                        "aria-hidden": "true",
                        className: "ml-2 h-4 w-4 text-slate-500",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                            d: "M5.25 7.5l4.5 4.5 4.5-4.5",
                            stroke: "currentColor",
                            strokeWidth: "1.8",
                            fill: "none",
                            strokeLinecap: "round"
                        }, void 0, false, {
                            fileName: "[project]/components/BudgetGrid.tanstack.tsx",
                            lineNumber: 289,
                            columnNumber: 21
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/BudgetGrid.tanstack.tsx",
                        lineNumber: 288,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/BudgetGrid.tanstack.tsx",
                lineNumber: 281,
                columnNumber: 13
            }, this),
            open && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                role: "listbox",
                className: "absolute z-40 mt-1 max-h-72 w-[min(420px,calc(100vw-2rem))] overflow-auto rounded-md border border-slate-200 bg-white p-2 shadow-lg",
                children: [
                    searchable && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-2",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            autoFocus: true,
                            type: "text",
                            placeholder: "Search…",
                            value: query,
                            onChange: (e)=>setQuery(e.target.value),
                            className: "w-full rounded border border-slate-300 px-2 py-1 text-sm"
                        }, void 0, false, {
                            fileName: "[project]/components/BudgetGrid.tanstack.tsx",
                            lineNumber: 299,
                            columnNumber: 29
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/BudgetGrid.tanstack.tsx",
                        lineNumber: 298,
                        columnNumber: 25
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between px-1 pb-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-xs text-slate-500",
                                children: [
                                    options.length,
                                    " options"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/BudgetGrid.tanstack.tsx",
                                lineNumber: 310,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-x-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "rounded bg-slate-100 px-2 py-0.5 text-xs hover:bg-slate-200",
                                        onClick: selectAll,
                                        children: "Select all"
                                    }, void 0, false, {
                                        fileName: "[project]/components/BudgetGrid.tanstack.tsx",
                                        lineNumber: 312,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "rounded bg-slate-100 px-2 py-0.5 text-xs hover:bg-slate-200",
                                        onClick: clearAll,
                                        children: "Clear"
                                    }, void 0, false, {
                                        fileName: "[project]/components/BudgetGrid.tanstack.tsx",
                                        lineNumber: 315,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/BudgetGrid.tanstack.tsx",
                                lineNumber: 311,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/BudgetGrid.tanstack.tsx",
                        lineNumber: 309,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                        className: "space-y-0.5",
                        children: filtered.map((opt)=>{
                            const checked = values.includes(opt.value);
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "flex cursor-pointer items-center gap-2 rounded px-2 py-1 text-sm hover:bg-slate-50",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "checkbox",
                                            className: "h-3.5 w-3.5 accent-teal-600",
                                            checked: checked,
                                            onChange: ()=>toggle(opt.value)
                                        }, void 0, false, {
                                            fileName: "[project]/components/BudgetGrid.tanstack.tsx",
                                            lineNumber: 326,
                                            columnNumber: 41
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: checked ? "text-teal-700" : "text-slate-700",
                                            children: opt.label
                                        }, void 0, false, {
                                            fileName: "[project]/components/BudgetGrid.tanstack.tsx",
                                            lineNumber: 332,
                                            columnNumber: 41
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/BudgetGrid.tanstack.tsx",
                                    lineNumber: 325,
                                    columnNumber: 37
                                }, this)
                            }, opt.value, false, {
                                fileName: "[project]/components/BudgetGrid.tanstack.tsx",
                                lineNumber: 324,
                                columnNumber: 33
                            }, this);
                        })
                    }, void 0, false, {
                        fileName: "[project]/components/BudgetGrid.tanstack.tsx",
                        lineNumber: 320,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/BudgetGrid.tanstack.tsx",
                lineNumber: 293,
                columnNumber: 17
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/BudgetGrid.tanstack.tsx",
        lineNumber: 279,
        columnNumber: 9
    }, this);
}
_s3(MultiSelect, "v2SsHTuEWY7FhWrrBUuXQqIRWTA=", false, function() {
    return [
        useClickOutsideClose
    ];
});
_c2 = MultiSelect;
function BudgetGrid({ rows }) {
    _s4();
    // local data
    const [data, setData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "BudgetGrid.useState": ()=>rows ?? []
    }["BudgetGrid.useState"]);
    const [sorting, setSorting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [filters, setFilters] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [rowSelection, setRowSelection] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const [columnVisibility, setColumnVisibility] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const [columnPinning, setColumnPinning] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        left: [],
        right: []
    });
    const [grouping, setGrouping] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    // ---- columns ----
    const columns = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "BudgetGrid.useMemo[columns]": ()=>{
            // custom filterFns for array-typed filters (community/category multi-select)
            const multiIncludesSome = {
                "BudgetGrid.useMemo[columns].multiIncludesSome": (row, columnId, filterValue)=>{
                    if (!Array.isArray(filterValue) || filterValue.length === 0) return true;
                    const v = String(row.getValue(columnId) ?? "");
                    return filterValue.includes(v);
                }
            }["BudgetGrid.useMemo[columns].multiIncludesSome"];
            const equalsString = {
                "BudgetGrid.useMemo[columns].equalsString": (row, columnId, filterValue)=>{
                    if (!filterValue) return true;
                    const v = String(row.getValue(columnId) ?? "");
                    return v === String(filterValue);
                }
            }["BudgetGrid.useMemo[columns].equalsString"];
            return [
                {
                    id: "community",
                    accessorKey: "community",
                    header: "Community",
                    meta: {
                        filterPlaceholder: "filter…"
                    },
                    filterFn: multiIncludesSome,
                    enablePinning: true
                },
                {
                    id: "type",
                    accessorKey: "type",
                    header: "Type",
                    size: 130,
                    filterFn: equalsString
                },
                {
                    id: "category",
                    accessorKey: "category",
                    header: "Category",
                    filterFn: multiIncludesSome
                },
                {
                    id: "subCategory",
                    accessorKey: "subCategory",
                    header: "Subcategory"
                },
                {
                    id: "period",
                    accessorKey: "period",
                    header: "Period",
                    size: 120
                },
                {
                    id: "glCode",
                    accessorKey: "glCode",
                    header: "GL Code",
                    size: 120
                },
                {
                    id: "budgetMethod",
                    accessorKey: "budgetMethod",
                    header: "Method",
                    size: 180
                },
                {
                    id: "driver",
                    header: "Driver",
                    accessorFn: {
                        "BudgetGrid.useMemo[columns]": (row)=>row.driver ?? row.driverTag ?? null
                    }["BudgetGrid.useMemo[columns]"]
                },
                {
                    id: "amount",
                    accessorKey: "amount",
                    header: "Amount",
                    cell: AmountCell,
                    size: 140
                },
                // A virtual "year" column used only for filtering from the Year dropdown.
                {
                    id: "__year",
                    accessorFn: {
                        "BudgetGrid.useMemo[columns]": (row)=>{
                            // parse from period (supports "YYYY" or "YYYY-MM")
                            const p = row.period;
                            if (p == null) return null;
                            const s = String(p);
                            const y = s.slice(0, 4);
                            return /^\d{4}$/.test(y) ? y : null;
                        }
                    }["BudgetGrid.useMemo[columns]"],
                    header: "Year (hidden)",
                    enableHiding: true,
                    meta: {
                        hiddenHelper: true
                    },
                    filterFn: {
                        "BudgetGrid.useMemo[columns]": (r, id, val)=>{
                            if (!val) return true;
                            const v = r.getValue(id);
                            return String(v ?? "") === String(val);
                        }
                    }["BudgetGrid.useMemo[columns]"]
                }
            ];
        }
    }["BudgetGrid.useMemo[columns]"], []);
    // table
    const table = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$table$2f$build$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["useReactTable"])({
        data,
        columns,
        getCoreRowModel: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$table$2d$core$2f$build$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCoreRowModel"])(),
        getFilteredRowModel: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$table$2d$core$2f$build$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getFilteredRowModel"])(),
        getSortedRowModel: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$table$2d$core$2f$build$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getSortedRowModel"])(),
        state: {
            sorting,
            columnFilters: filters,
            rowSelection,
            columnVisibility,
            columnPinning,
            grouping
        },
        onSortingChange: setSorting,
        onColumnFiltersChange: setFilters,
        onRowSelectionChange: setRowSelection,
        onColumnVisibilityChange: setColumnVisibility,
        onColumnPinningChange: setColumnPinning,
        onGroupingChange: setGrouping,
        enableRowSelection: true,
        meta: {
            updateRow: {
                "BudgetGrid.useReactTable[table]": (rowIndex, partial)=>{
                    setData({
                        "BudgetGrid.useReactTable[table]": (old)=>{
                            const next = old.slice();
                            next[rowIndex] = {
                                ...next[rowIndex],
                                ...partial
                            };
                            return next;
                        }
                    }["BudgetGrid.useReactTable[table]"]);
                }
            }["BudgetGrid.useReactTable[table]"]
        },
        getRowId: {
            "BudgetGrid.useReactTable[table]": (row)=>`${row.community ?? ""}${row.type ?? ""}${row.category ?? ""}${row.subCategory ?? ""}${row.period ?? ""}`
        }["BudgetGrid.useReactTable[table]"]
    });
    // ---------- toolbar derived options ----------
    // Pre-filtered options (so selection lists are derived from the dataset, not the filtered view),
    // but Category will be derived from the partially-filtered view (community/type/year applied) to stay relevant.
    const allCommunities = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "BudgetGrid.useMemo[allCommunities]": ()=>{
            const set = new Set();
            data.forEach({
                "BudgetGrid.useMemo[allCommunities]": (r)=>r.community && set.add(r.community)
            }["BudgetGrid.useMemo[allCommunities]"]);
            return Array.from(set).sort({
                "BudgetGrid.useMemo[allCommunities]": (a, b)=>a.localeCompare(b)
            }["BudgetGrid.useMemo[allCommunities]"]).map({
                "BudgetGrid.useMemo[allCommunities]": (v)=>({
                        value: v,
                        label: v
                    })
            }["BudgetGrid.useMemo[allCommunities]"]);
        }
    }["BudgetGrid.useMemo[allCommunities]"], [
        data
    ]);
    const yearOptions = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "BudgetGrid.useMemo[yearOptions]": ()=>[
                "2024",
                "2025",
                "2026"
            ].map({
                "BudgetGrid.useMemo[yearOptions]": (y)=>({
                        value: y,
                        label: y
                    })
            }["BudgetGrid.useMemo[yearOptions]"])
    }["BudgetGrid.useMemo[yearOptions]"], []);
    const typeOptions = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "BudgetGrid.useMemo[typeOptions]": ()=>[
                "expense",
                "revenue",
                "home office"
            ].map({
                "BudgetGrid.useMemo[typeOptions]": (t)=>({
                        value: t,
                        label: t
                    })
            }["BudgetGrid.useMemo[typeOptions]"])
    }["BudgetGrid.useMemo[typeOptions]"], []);
    // read helpers from filters
    const getFilter = (id)=>filters.find((f)=>f.id === id)?.value;
    // current values
    const selectedCommunities = getFilter("community") ?? [];
    const selectedYear = getFilter("__year") ?? null;
    const selectedType = getFilter("type") ?? null;
    const selectedCategories = getFilter("category") ?? [];
    // For Category options, reflect current Community/Year/Type filters to keep the list relevant.
    const categoryOptions = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "BudgetGrid.useMemo[categoryOptions]": ()=>{
            // Build a transient filtered view that applies community/year/type only.
            const rowsForOptions = table.getPreFilteredRowModel().rows.filter({
                "BudgetGrid.useMemo[categoryOptions].rowsForOptions": (r)=>{
                    const communityPass = selectedCommunities.length === 0 || selectedCommunities.includes(String(r.getValue("community") ?? ""));
                    const typePass = !selectedType || String(r.getValue("type") ?? "") === selectedType;
                    const yr = ({
                        "BudgetGrid.useMemo[categoryOptions].rowsForOptions.yr": ()=>{
                            const p = r.original.period;
                            const s = p == null ? "" : String(p);
                            const y = /^\d{4}/.test(s) ? s.slice(0, 4) : "";
                            return y;
                        }
                    })["BudgetGrid.useMemo[categoryOptions].rowsForOptions.yr"]();
                    const yearPass = !selectedYear || yr === selectedYear;
                    return communityPass && typePass && yearPass;
                }
            }["BudgetGrid.useMemo[categoryOptions].rowsForOptions"]);
            const set = new Set();
            rowsForOptions.forEach({
                "BudgetGrid.useMemo[categoryOptions]": (rr)=>{
                    const v = String(rr.getValue("category") ?? "");
                    if (v) set.add(v);
                }
            }["BudgetGrid.useMemo[categoryOptions]"]);
            return Array.from(set).sort({
                "BudgetGrid.useMemo[categoryOptions]": (a, b)=>a.localeCompare(b)
            }["BudgetGrid.useMemo[categoryOptions]"]).map({
                "BudgetGrid.useMemo[categoryOptions]": (v)=>({
                        value: v,
                        label: v
                    })
            }["BudgetGrid.useMemo[categoryOptions]"]);
        }
    }["BudgetGrid.useMemo[categoryOptions]"], [
        table,
        selectedCommunities,
        selectedType,
        selectedYear
    ]);
    // ---------- toolbar actions ----------
    const setFilter = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "BudgetGrid.useCallback[setFilter]": (id, value)=>{
            setFilters({
                "BudgetGrid.useCallback[setFilter]": (old)=>{
                    const others = old.filter({
                        "BudgetGrid.useCallback[setFilter].others": (f)=>f.id !== id
                    }["BudgetGrid.useCallback[setFilter].others"]);
                    if (value == null || Array.isArray(value) && value.length === 0) return others;
                    return [
                        ...others,
                        {
                            id,
                            value
                        }
                    ];
                }
            }["BudgetGrid.useCallback[setFilter]"]);
            // Clear selection whenever filters change
            setRowSelection({});
        }
    }["BudgetGrid.useCallback[setFilter]"], []);
    const onCommunitiesChange = (vals)=>setFilter("community", vals);
    const onYearChange = (val)=>setFilter("__year", val);
    const onTypeChange = (val)=>setFilter("type", val);
    const onCategoriesChange = (vals)=>setFilter("category", vals);
    const clearAllFilters = ()=>setFilters([]);
    const exportCsv = ()=>{
        const rows = table.getRowModel().rows.map((r)=>r.original);
        exportRowsToCsv(rows, columns);
    };
    // ---------- virtualization ----------
    const parentRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const virtualizer = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$virtual$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["useVirtualizer"])({
        count: table.getRowModel().rows.length,
        getScrollElement: {
            "BudgetGrid.useVirtualizer[virtualizer]": ()=>parentRef.current
        }["BudgetGrid.useVirtualizer[virtualizer]"],
        estimateSize: {
            "BudgetGrid.useVirtualizer[virtualizer]": ()=>40
        }["BudgetGrid.useVirtualizer[virtualizer]"],
        overscan: 8
    });
    const virtualItems = virtualizer.getVirtualItems();
    // TOTAL (filtered)
    const totalFiltered = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "BudgetGrid.useMemo[totalFiltered]": ()=>{
            let sum = 0;
            for (const r of table.getFilteredRowModel().rows){
                const v = r.original.amount;
                if (typeof v === "number") sum += v;
            }
            return sum;
        }
    }["BudgetGrid.useMemo[totalFiltered]"], [
        table,
        data,
        filters,
        sorting,
        grouping
    ]);
    // ---------- render ----------
    const anyFilterActive = filters.length > 0;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        "aria-label": "Budget grid",
        className: "space-y-3",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-wrap items-center gap-2 rounded-xl border border-slate-200 bg-white p-3 shadow-sm",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MultiSelect, {
                        "aria-label": "Filter by community",
                        label: "Community",
                        values: selectedCommunities,
                        options: allCommunities,
                        onChange: onCommunitiesChange,
                        className: "mr-1"
                    }, void 0, false, {
                        fileName: "[project]/components/BudgetGrid.tanstack.tsx",
                        lineNumber: 593,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SingleSelect, {
                        "aria-label": "Filter by year",
                        label: "Year",
                        value: selectedYear,
                        options: yearOptions,
                        onChange: onYearChange,
                        className: "mr-1"
                    }, void 0, false, {
                        fileName: "[project]/components/BudgetGrid.tanstack.tsx",
                        lineNumber: 603,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SingleSelect, {
                        "aria-label": "Filter by budget type",
                        label: "Budget Type",
                        value: selectedType,
                        options: typeOptions,
                        onChange: onTypeChange,
                        className: "mr-1"
                    }, void 0, false, {
                        fileName: "[project]/components/BudgetGrid.tanstack.tsx",
                        lineNumber: 613,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MultiSelect, {
                        "aria-label": "Filter by category",
                        label: "Category",
                        values: selectedCategories,
                        options: categoryOptions,
                        onChange: onCategoriesChange,
                        className: "mr-1"
                    }, void 0, false, {
                        fileName: "[project]/components/BudgetGrid.tanstack.tsx",
                        lineNumber: 623,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grow"
                    }, void 0, false, {
                        fileName: "[project]/components/BudgetGrid.tanstack.tsx",
                        lineNumber: 633,
                        columnNumber: 17
                    }, this),
                    anyFilterActive && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "rounded-full bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600",
                        children: [
                            filters.length,
                            " filter",
                            filters.length > 1 ? "s" : "",
                            " active"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/BudgetGrid.tanstack.tsx",
                        lineNumber: 637,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: clearAllFilters,
                        className: "rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500",
                        children: "Clear Filters"
                    }, void 0, false, {
                        fileName: "[project]/components/BudgetGrid.tanstack.tsx",
                        lineNumber: 643,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: exportCsv,
                        className: "rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500",
                        children: "Export CSV"
                    }, void 0, false, {
                        fileName: "[project]/components/BudgetGrid.tanstack.tsx",
                        lineNumber: 650,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/BudgetGrid.tanstack.tsx",
                lineNumber: 591,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "rounded-t-lg border-x border-t border-slate-200 bg-slate-50",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-[repeat(var(--cols),minmax(140px,1fr))] px-2 py-2 text-xs font-semibold text-slate-600",
                    style: {
                        ["--cols"]: table.getAllColumns().filter((c)=>c.getIsVisible() && !c.columnDef?.meta?.hiddenHelper).length
                    },
                    children: table.getFlatHeaders().map((header)=>{
                        // Hide helper column from header row
                        if (header.column.columnDef?.meta?.hiddenHelper) return null;
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "pr-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    className: "inline-flex items-center gap-1 hover:text-slate-900",
                                    onClick: header.column.getToggleSortingHandler(),
                                    title: "Click to sort",
                                    children: [
                                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$table$2f$build$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["flexRender"])(header.column.columnDef.header, header.getContext()),
                                        {
                                            asc: " ↑",
                                            desc: " ↓"
                                        }[header.column.getIsSorted()] ?? null
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/BudgetGrid.tanstack.tsx",
                                    lineNumber: 670,
                                    columnNumber: 33
                                }, this),
                                header.column.getCanFilter() && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-1",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        className: "w-full rounded border border-slate-300 px-1.5 py-1 text-xs",
                                        placeholder: header.column.columnDef.meta?.filterPlaceholder ?? "filter…",
                                        value: header.column.getFilterValue() ?? "",
                                        onChange: (e)=>header.column.setFilterValue(e.target.value)
                                    }, void 0, false, {
                                        fileName: "[project]/components/BudgetGrid.tanstack.tsx",
                                        lineNumber: 684,
                                        columnNumber: 41
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/BudgetGrid.tanstack.tsx",
                                    lineNumber: 683,
                                    columnNumber: 37
                                }, this)
                            ]
                        }, header.id, true, {
                            fileName: "[project]/components/BudgetGrid.tanstack.tsx",
                            lineNumber: 669,
                            columnNumber: 29
                        }, this);
                    })
                }, void 0, false, {
                    fileName: "[project]/components/BudgetGrid.tanstack.tsx",
                    lineNumber: 661,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/BudgetGrid.tanstack.tsx",
                lineNumber: 660,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: parentRef,
                className: "border-x border-b border-slate-200",
                style: {
                    height: 720,
                    overflow: "auto",
                    position: "relative"
                },
                "aria-label": "Budget TanStack Grid",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        height: virtualizer.getTotalSize(),
                        position: "relative"
                    },
                    children: virtualItems.map((vi)=>{
                        const row = table.getRowModel().rows[vi.index];
                        // compute visible columns count excluding the hidden helper
                        const visibleCols = row.getVisibleCells().filter((c)=>!c.column.columnDef?.meta?.hiddenHelper);
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: `grid grid-cols-[repeat(var(--cols),minmax(140px,1fr))] border-b border-slate-100 px-2 text-sm ${row.getIsSelected() ? "bg-teal-50" : "bg-white"} hover:bg-slate-50`,
                            style: {
                                transform: `translateY(${vi.start}px)`,
                                ["--cols"]: visibleCols.length,
                                height: vi.size,
                                alignItems: "center"
                            },
                            onClick: ()=>row.toggleSelected(),
                            children: visibleCols.map((cell)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "pr-2",
                                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$table$2f$build$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["flexRender"])(cell.column.columnDef.cell, cell.getContext())
                                }, cell.id, false, {
                                    fileName: "[project]/components/BudgetGrid.tanstack.tsx",
                                    lineNumber: 723,
                                    columnNumber: 37
                                }, this))
                        }, row.id, false, {
                            fileName: "[project]/components/BudgetGrid.tanstack.tsx",
                            lineNumber: 711,
                            columnNumber: 29
                        }, this);
                    })
                }, void 0, false, {
                    fileName: "[project]/components/BudgetGrid.tanstack.tsx",
                    lineNumber: 705,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/BudgetGrid.tanstack.tsx",
                lineNumber: 699,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "rounded-b-lg border border-teal-200 bg-teal-50 px-3 py-2 text-sm font-semibold text-teal-800",
                children: [
                    "TOTAL (filtered): ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "tabular-nums",
                        children: fmtUSD(totalFiltered)
                    }, void 0, false, {
                        fileName: "[project]/components/BudgetGrid.tanstack.tsx",
                        lineNumber: 735,
                        columnNumber: 35
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/BudgetGrid.tanstack.tsx",
                lineNumber: 734,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/BudgetGrid.tanstack.tsx",
        lineNumber: 589,
        columnNumber: 9
    }, this);
}
_s4(BudgetGrid, "quvOKPbHwNLtBnTDJ+7Ll36UlRo=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$table$2f$build$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["useReactTable"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$virtual$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["useVirtualizer"]
    ];
});
_c3 = BudgetGrid;
var _c, _c1, _c2, _c3;
__turbopack_context__.k.register(_c, "AmountCell");
__turbopack_context__.k.register(_c1, "SingleSelect");
__turbopack_context__.k.register(_c2, "MultiSelect");
__turbopack_context__.k.register(_c3, "BudgetGrid");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=components_BudgetGrid_tanstack_tsx_f9dd33f0._.js.map