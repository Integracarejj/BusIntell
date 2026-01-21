module.exports = [
"[project]/components/grid/ToolbarFilters.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ToolbarFilters
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
;
function ToolbarFilters({ table, filters, setFilters, onClear, onExport, yearOptions = [
    "2024",
    "2025",
    "2026"
], typeOptions = [
    "expense",
    "revenue",
    "home office"
], communityColumnId = "community", typeColumnId = "type", categoryColumnId = "category", yearHelperColumnId = "__year" }) {
    // ----- helpers -----
    const getFilter = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"]((id)=>filters.find((f)=>f.id === id)?.value, [
        filters
    ]);
    const setFilter = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"]((id, value)=>{
        setFilters((old)=>{
            const others = old.filter((f)=>f.id !== id);
            if (value == null || Array.isArray(value) && value.length === 0) return others;
            return [
                ...others,
                {
                    id,
                    value
                }
            ];
        });
        // clear row selection when filters change
        table.resetRowSelection();
    }, [
        setFilters,
        table
    ]);
    // ----- current selections -----
    const selectedCommunities = getFilter(communityColumnId) ?? [];
    const selectedYear = getFilter(yearHelperColumnId) ?? null;
    const selectedType = getFilter(typeColumnId) ?? null;
    const selectedCategories = getFilter(categoryColumnId) ?? [];
    // ----- option derivation -----
    const communityOptions = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"](()=>{
        const set = new Set();
        table.getPreFilteredRowModel().rows.forEach((r)=>{
            const v = String(r.getValue(communityColumnId) ?? "");
            if (v) set.add(v);
        });
        return Array.from(set).sort((a, b)=>a.localeCompare(b)).map((v)=>({
                value: v,
                label: v
            }));
    }, [
        table,
        communityColumnId
    ]);
    const yearOpts = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"](()=>yearOptions.map((y)=>({
                value: y,
                label: y
            })), [
        yearOptions
    ]);
    const typeOpts = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"](()=>typeOptions.map((t)=>({
                value: t,
                label: t
            })), [
        typeOptions
    ]);
    // Category options reflect current (Community, Year, Type)
    const categoryOptions = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"](()=>{
        const rows = table.getPreFilteredRowModel().rows.filter((r)=>{
            const commPass = selectedCommunities.length === 0 || selectedCommunities.includes(String(r.getValue(communityColumnId) ?? ""));
            const typePass = !selectedType || String(r.getValue(typeColumnId) ?? "") === selectedType;
            const yr = String(r.getValue(yearHelperColumnId) ?? "");
            const yearPass = !selectedYear || yr === selectedYear;
            return commPass && typePass && yearPass;
        });
        const set = new Set();
        rows.forEach((rr)=>{
            const v = String(rr.getValue(categoryColumnId) ?? "");
            if (v) set.add(v);
        });
        return Array.from(set).sort((a, b)=>a.localeCompare(b)).map((v)=>({
                value: v,
                label: v
            }));
    }, [
        table,
        communityColumnId,
        typeColumnId,
        categoryColumnId,
        yearHelperColumnId,
        selectedCommunities,
        selectedType,
        selectedYear
    ]);
    const anyFilterActive = filters.length > 0;
    // ----- UI -----
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-wrap items-center gap-2 rounded-xl border border-slate-200 bg-white p-3 shadow-sm",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(MultiSelect, {
                "aria-label": "Filter by community",
                label: "Community",
                values: selectedCommunities,
                options: communityOptions,
                onChange: (vals)=>setFilter(communityColumnId, vals),
                className: "mr-1"
            }, void 0, false, {
                fileName: "[project]/components/grid/ToolbarFilters.tsx",
                lineNumber: 121,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SingleSelect, {
                "aria-label": "Filter by year",
                label: "Year",
                value: selectedYear,
                options: yearOpts,
                onChange: (val)=>setFilter(yearHelperColumnId, val),
                className: "mr-1"
            }, void 0, false, {
                fileName: "[project]/components/grid/ToolbarFilters.tsx",
                lineNumber: 131,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SingleSelect, {
                "aria-label": "Filter by budget type",
                label: "Budget Type",
                value: selectedType,
                options: typeOpts,
                onChange: (val)=>setFilter(typeColumnId, val),
                className: "mr-1"
            }, void 0, false, {
                fileName: "[project]/components/grid/ToolbarFilters.tsx",
                lineNumber: 141,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(MultiSelect, {
                "aria-label": "Filter by category",
                label: "Category",
                values: selectedCategories,
                options: categoryOptions,
                onChange: (vals)=>setFilter(categoryColumnId, vals),
                className: "mr-1"
            }, void 0, false, {
                fileName: "[project]/components/grid/ToolbarFilters.tsx",
                lineNumber: 151,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grow"
            }, void 0, false, {
                fileName: "[project]/components/grid/ToolbarFilters.tsx",
                lineNumber: 161,
                columnNumber: 13
            }, this),
            anyFilterActive && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "rounded-full bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600",
                children: [
                    filters.length,
                    " filter",
                    filters.length > 1 ? "s" : "",
                    " active"
                ]
            }, void 0, true, {
                fileName: "[project]/components/grid/ToolbarFilters.tsx",
                lineNumber: 165,
                columnNumber: 17
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                onClick: onClear,
                className: "rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500",
                children: "Clear Filters"
            }, void 0, false, {
                fileName: "[project]/components/grid/ToolbarFilters.tsx",
                lineNumber: 170,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                onClick: onExport,
                className: "rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500",
                children: "Export CSV"
            }, void 0, false, {
                fileName: "[project]/components/grid/ToolbarFilters.tsx",
                lineNumber: 177,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/grid/ToolbarFilters.tsx",
        lineNumber: 119,
        columnNumber: 9
    }, this);
}
/* ========================== Headless Inputs ========================== */ function useClickOutsideClose(onClose) {
    const ref = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"](null);
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"](()=>{
        const onDocClick = (e)=>{
            if (!ref.current) return;
            if (!ref.current.contains(e.target)) onClose();
        };
        const onEsc = (e)=>{
            if (e.key === "Escape") onClose();
        };
        document.addEventListener("mousedown", onDocClick);
        document.addEventListener("keydown", onEsc);
        return ()=>{
            document.removeEventListener("mousedown", onDocClick);
            document.removeEventListener("keydown", onEsc);
        };
    }, [
        onClose
    ]);
    return ref;
}
function SingleSelect({ label, value, options, onChange, className, "aria-label": ariaLabel }) {
    const [open, setOpen] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"](false);
    const ref = useClickOutsideClose(()=>setOpen(false));
    const current = options.find((o)=>o.value === value);
    const displayText = current ? current.label : label;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `relative ${className ?? ""}`,
        ref: ref,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                "aria-label": ariaLabel || label,
                onClick: ()=>setOpen((o)=>!o),
                className: "inline-flex min-w-[168px] items-center justify-between rounded-md border border-slate-300 bg-white px-2.5 py-1.5 text-sm text-slate-800 shadow-sm hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: `truncate ${current ? "" : "text-slate-500"}`,
                        children: displayText
                    }, void 0, false, {
                        fileName: "[project]/components/grid/ToolbarFilters.tsx",
                        lineNumber: 238,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Caret, {}, void 0, false, {
                        fileName: "[project]/components/grid/ToolbarFilters.tsx",
                        lineNumber: 239,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/grid/ToolbarFilters.tsx",
                lineNumber: 232,
                columnNumber: 13
            }, this),
            open && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                role: "listbox",
                className: "absolute z-40 mt-1 max-h-64 w-[min(280px,calc(100vw-2rem))] overflow-auto rounded-md border border-slate-200 bg-white p-1 shadow-lg",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: "w-full rounded px-2 py-1 text-left text-sm text-slate-700 hover:bg-slate-100",
                        onClick: ()=>{
                            onChange(null);
                            setOpen(false);
                        },
                        children: "All"
                    }, void 0, false, {
                        fileName: "[project]/components/grid/ToolbarFilters.tsx",
                        lineNumber: 243,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "my-1 h-px bg-slate-100"
                    }, void 0, false, {
                        fileName: "[project]/components/grid/ToolbarFilters.tsx",
                        lineNumber: 249,
                        columnNumber: 21
                    }, this),
                    options.map((opt)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            role: "option",
                            "aria-selected": opt.value === value,
                            className: `w-full rounded px-2 py-1 text-left text-sm hover:bg-slate-100 ${opt.value === value ? "bg-teal-50 text-teal-700" : "text-slate-700"}`,
                            onClick: ()=>{
                                onChange(opt.value);
                                setOpen(false);
                            },
                            children: opt.label
                        }, opt.value, false, {
                            fileName: "[project]/components/grid/ToolbarFilters.tsx",
                            lineNumber: 251,
                            columnNumber: 25
                        }, this))
                ]
            }, void 0, true, {
                fileName: "[project]/components/grid/ToolbarFilters.tsx",
                lineNumber: 242,
                columnNumber: 17
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/grid/ToolbarFilters.tsx",
        lineNumber: 231,
        columnNumber: 9
    }, this);
}
function MultiSelect({ label, values, options, onChange, searchable = true, className, "aria-label": ariaLabel }) {
    const [open, setOpen] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"](false);
    const [query, setQuery] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"]("");
    const ref = useClickOutsideClose(()=>setOpen(false));
    const display = values.length === 0 ? label : values.length <= 2 ? options.filter((o)=>values.includes(o.value)).map((o)=>o.label).join(", ") : `${values.length} selected`;
    const filtered = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"](()=>{
        if (!searchable || !query.trim()) return options;
        const q = query.toLowerCase();
        return options.filter((o)=>o.label.toLowerCase().includes(q));
    }, [
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `relative ${className ?? ""}`,
        ref: ref,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                "aria-label": ariaLabel || label,
                onClick: ()=>setOpen((o)=>!o),
                className: "inline-flex min-w-[220px] items-center justify-between rounded-md border border-slate-300 bg-white px-2.5 py-1.5 text-sm text-slate-800 shadow-sm hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: `truncate ${values.length === 0 ? "text-slate-500" : ""}`,
                        children: display
                    }, void 0, false, {
                        fileName: "[project]/components/grid/ToolbarFilters.tsx",
                        lineNumber: 317,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Caret, {}, void 0, false, {
                        fileName: "[project]/components/grid/ToolbarFilters.tsx",
                        lineNumber: 318,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/grid/ToolbarFilters.tsx",
                lineNumber: 311,
                columnNumber: 13
            }, this),
            open && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                role: "listbox",
                className: "absolute z-40 mt-1 max-h-72 w-[min(420px,calc(100vw-2rem))] overflow-auto rounded-md border border-slate-200 bg-white p-2 shadow-lg",
                children: [
                    searchable && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-2",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            autoFocus: true,
                            type: "text",
                            placeholder: "Search…",
                            value: query,
                            onChange: (e)=>setQuery(e.target.value),
                            className: "w-full rounded border border-slate-300 px-2 py-1 text-sm"
                        }, void 0, false, {
                            fileName: "[project]/components/grid/ToolbarFilters.tsx",
                            lineNumber: 324,
                            columnNumber: 29
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/grid/ToolbarFilters.tsx",
                        lineNumber: 323,
                        columnNumber: 25
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between px-1 pb-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-xs text-slate-500",
                                children: [
                                    options.length,
                                    " options"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/grid/ToolbarFilters.tsx",
                                lineNumber: 335,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-x-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "rounded bg-slate-100 px-2 py-0.5 text-xs hover:bg-slate-200",
                                        onClick: selectAll,
                                        children: "Select all"
                                    }, void 0, false, {
                                        fileName: "[project]/components/grid/ToolbarFilters.tsx",
                                        lineNumber: 337,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "rounded bg-slate-100 px-2 py-0.5 text-xs hover:bg-slate-200",
                                        onClick: clearAll,
                                        children: "Clear"
                                    }, void 0, false, {
                                        fileName: "[project]/components/grid/ToolbarFilters.tsx",
                                        lineNumber: 340,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/grid/ToolbarFilters.tsx",
                                lineNumber: 336,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/grid/ToolbarFilters.tsx",
                        lineNumber: 334,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                        className: "space-y-0.5",
                        children: filtered.map((opt)=>{
                            const checked = values.includes(opt.value);
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "flex cursor-pointer items-center gap-2 rounded px-2 py-1 text-sm hover:bg-slate-50",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "checkbox",
                                            className: "h-3.5 w-3.5 accent-teal-600",
                                            checked: checked,
                                            onChange: ()=>toggle(opt.value)
                                        }, void 0, false, {
                                            fileName: "[project]/components/grid/ToolbarFilters.tsx",
                                            lineNumber: 351,
                                            columnNumber: 41
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: checked ? "text-teal-700" : "text-slate-700",
                                            children: opt.label
                                        }, void 0, false, {
                                            fileName: "[project]/components/grid/ToolbarFilters.tsx",
                                            lineNumber: 357,
                                            columnNumber: 41
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/grid/ToolbarFilters.tsx",
                                    lineNumber: 350,
                                    columnNumber: 37
                                }, this)
                            }, opt.value, false, {
                                fileName: "[project]/components/grid/ToolbarFilters.tsx",
                                lineNumber: 349,
                                columnNumber: 33
                            }, this);
                        })
                    }, void 0, false, {
                        fileName: "[project]/components/grid/ToolbarFilters.tsx",
                        lineNumber: 345,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/grid/ToolbarFilters.tsx",
                lineNumber: 321,
                columnNumber: 17
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/grid/ToolbarFilters.tsx",
        lineNumber: 310,
        columnNumber: 9
    }, this);
}
function Caret() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        viewBox: "0 0 20 20",
        "aria-hidden": "true",
        className: "ml-2 h-4 w-4 text-slate-500",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            d: "M5.25 7.5l4.5 4.5 4.5-4.5",
            stroke: "currentColor",
            strokeWidth: "1.8",
            fill: "none",
            strokeLinecap: "round"
        }, void 0, false, {
            fileName: "[project]/components/grid/ToolbarFilters.tsx",
            lineNumber: 372,
            columnNumber: 13
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/grid/ToolbarFilters.tsx",
        lineNumber: 371,
        columnNumber: 9
    }, this);
}
}),
"[project]/components/grid/VirtualRows.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>VirtualRows
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$virtual$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-virtual/dist/esm/index.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$table$2f$build$2f$lib$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-table/build/lib/index.mjs [app-ssr] (ecmascript) <locals>");
// components/grid/VirtualRows.tsx
"use client";
;
;
;
;
function VirtualRows({ table, height = 720, rowClassName, toggleSelectOnRowClick = true, "aria-label": ariaLabel = "Virtualized grid body" }) {
    const parentRef = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"](null);
    const rows = table.getRowModel().rows;
    const virtualizer = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$virtual$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["useVirtualizer"])({
        count: rows.length,
        getScrollElement: ()=>parentRef.current,
        estimateSize: ()=>40,
        overscan: 8
    });
    const virtualItems = virtualizer.getVirtualItems();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: parentRef,
        className: "border-x border-b border-slate-200",
        style: {
            height,
            overflow: "auto",
            position: "relative"
        },
        "aria-label": ariaLabel,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: {
                height: virtualizer.getTotalSize(),
                position: "relative"
            },
            children: virtualItems.map((vi)=>{
                const row = rows[vi.index];
                // Only render visible, non-helper columns
                const visibleCells = row.getVisibleCells().filter((c)=>!c.column.columnDef?.meta?.hiddenHelper);
                const cls = rowClassName?.(vi.index) ?? `grid grid-cols-[repeat(var(--cols),minmax(140px,1fr))] border-b border-slate-100 px-2 text-sm ${row.getIsSelected() ? "bg-teal-50" : "bg-white"} hover:bg-slate-50`;
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: cls,
                    style: {
                        transform: `translateY(${vi.start}px)`,
                        ["--cols"]: visibleCells.length,
                        height: vi.size,
                        alignItems: "center"
                    },
                    onClick: ()=>toggleSelectOnRowClick && row.toggleSelected(),
                    children: visibleCells.map((cell)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "pr-2",
                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$table$2f$build$2f$lib$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["flexRender"])(cell.column.columnDef.cell, cell.getContext())
                        }, cell.id, false, {
                            fileName: "[project]/components/grid/VirtualRows.tsx",
                            lineNumber: 72,
                            columnNumber: 33
                        }, this))
                }, row.id, false, {
                    fileName: "[project]/components/grid/VirtualRows.tsx",
                    lineNumber: 60,
                    columnNumber: 25
                }, this);
            })
        }, void 0, false, {
            fileName: "[project]/components/grid/VirtualRows.tsx",
            lineNumber: 45,
            columnNumber: 13
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/grid/VirtualRows.tsx",
        lineNumber: 39,
        columnNumber: 9
    }, this);
}
}),
"[project]/components/grid/AmountCell.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AmountCell
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
;
function AmountCell({ getValue, row, table }) {
    const initial = getValue();
    const [editing, setEditing] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"](false);
    const [draft, setDraft] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"](typeof initial === "number" ? initial : initial == null ? "" : Number(initial));
    // Format helper (display only)
    const fmtUSD = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"]((n)=>new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            maximumFractionDigits: 0
        }).format(n), []);
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "text-right",
        children: editing ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
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
        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
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
}),
"[project]/components/grid/ColumnMenu.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ColumnMenu
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
// components/grid/ColumnMenu.tsx
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
;
;
function useOutsideClick(ref, onClickAway) {
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"](()=>{
        function handler(e) {
            const el = ref.current;
            if (!el) return;
            if (!el.contains(e.target)) onClickAway();
        }
        document.addEventListener("mousedown", handler);
        return ()=>document.removeEventListener("mousedown", handler);
    }, [
        onClickAway,
        ref
    ]);
}
function ColumnMenu({ table, column }) {
    const [open, setOpen] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"](false);
    const btnRef = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"](null);
    const popRef = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"](null);
    // Close on outside click
    useOutsideClick(popRef, ()=>setOpen(false));
    // Close on escape
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"](()=>{
        function onKey(e) {
            if (e.key === "Escape") setOpen(false);
        }
        document.addEventListener("keydown", onKey);
        return ()=>document.removeEventListener("keydown", onKey);
    }, []);
    const pinState = column.getIsPinned(); // 'left' | 'right' | false
    const isVisible = column.getIsVisible();
    const canSort = column.getCanSort();
    const hasFilter = Boolean(column.getFilterValue());
    // Auto-size via table.setColumnSizing()
    const autoSize = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"](()=>{
        const ctx = document.createElement("canvas").getContext("2d");
        if (!ctx) return;
        const computed = window.getComputedStyle(document.body);
        ctx.font = `${computed.fontSize} ${computed.fontFamily}`;
        const padding = 24;
        const sampleRows = table.getPrePaginationRowModel().rows.slice(0, 100);
        const measure = (txt)=>Math.ceil(ctx.measureText((txt ?? "").toString()).width);
        const headerLabel = typeof column.columnDef.header === "string" ? column.columnDef.header : column.id;
        const headerW = measure(headerLabel);
        const cellW = sampleRows.reduce((max, r)=>{
            const v = r.getValue(column.id);
            return Math.max(max, measure(v));
        }, 0);
        const desired = Math.max(headerW, cellW) + padding;
        const min = column.columnDef.minSize ?? 60;
        const max = column.columnDef.maxSize ?? 700;
        const clamped = Math.max(min, Math.min(desired, max));
        table.setColumnSizing((prev)=>({
                ...prev,
                [column.id]: clamped
            }));
    }, [
        column,
        table
    ]);
    const resetWidth = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"](()=>{
        // Reset to no explicit size; TanStack will use default size or CSS.
        table.setColumnSizing((prev)=>{
            const { [column.id]: _, ...rest } = prev || {};
            return rest;
        });
    }, [
        column.id,
        table
    ]);
    const togglePin = (side)=>{
        column.pin(side);
    };
    const toggleVisibility = ()=>column.toggleVisibility(!isVisible);
    const sortAsc = ()=>column.toggleSorting(true);
    const sortDesc = ()=>column.toggleSorting(false);
    const clearFilter = ()=>column.setFilterValue(undefined);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative inline-flex",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                ref: btnRef,
                type: "button",
                className: "ml-1 inline-flex h-6 w-6 items-center justify-center rounded hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500",
                "aria-haspopup": "menu",
                "aria-expanded": open,
                title: "Column menu",
                onClick: ()=>setOpen((o)=>!o),
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                    viewBox: "0 0 24 24",
                    className: "h-4 w-4 text-gray-600",
                    fill: "currentColor",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                            cx: "5",
                            cy: "12",
                            r: "2"
                        }, void 0, false, {
                            fileName: "[project]/components/grid/ColumnMenu.tsx",
                            lineNumber: 116,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                            cx: "12",
                            cy: "12",
                            r: "2"
                        }, void 0, false, {
                            fileName: "[project]/components/grid/ColumnMenu.tsx",
                            lineNumber: 117,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                            cx: "19",
                            cy: "12",
                            r: "2"
                        }, void 0, false, {
                            fileName: "[project]/components/grid/ColumnMenu.tsx",
                            lineNumber: 118,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/grid/ColumnMenu.tsx",
                    lineNumber: 115,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/grid/ColumnMenu.tsx",
                lineNumber: 106,
                columnNumber: 13
            }, this),
            open && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: popRef,
                role: "menu",
                className: "absolute right-0 z-50 mt-2 w-52 overflow-hidden rounded-md border border-gray-200 bg-white shadow-lg",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Section, {
                        label: String(column.columnDef.header ?? column.id)
                    }, void 0, false, {
                        fileName: "[project]/components/grid/ColumnMenu.tsx",
                        lineNumber: 128,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Item, {
                        onClick: toggleVisibility,
                        children: isVisible ? "Hide column" : "Show column"
                    }, void 0, false, {
                        fileName: "[project]/components/grid/ColumnMenu.tsx",
                        lineNumber: 130,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Separator, {}, void 0, false, {
                        fileName: "[project]/components/grid/ColumnMenu.tsx",
                        lineNumber: 134,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Item, {
                        onClick: ()=>togglePin("left"),
                        active: pinState === "left",
                        children: "Pin left"
                    }, void 0, false, {
                        fileName: "[project]/components/grid/ColumnMenu.tsx",
                        lineNumber: 136,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Item, {
                        onClick: ()=>togglePin("right"),
                        active: pinState === "right",
                        children: "Pin right"
                    }, void 0, false, {
                        fileName: "[project]/components/grid/ColumnMenu.tsx",
                        lineNumber: 139,
                        columnNumber: 21
                    }, this),
                    pinState && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Item, {
                        onClick: ()=>togglePin(false),
                        children: "Unpin"
                    }, void 0, false, {
                        fileName: "[project]/components/grid/ColumnMenu.tsx",
                        lineNumber: 142,
                        columnNumber: 34
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Separator, {}, void 0, false, {
                        fileName: "[project]/components/grid/ColumnMenu.tsx",
                        lineNumber: 144,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Item, {
                        onClick: sortAsc,
                        disabled: !canSort,
                        children: "Sort ascending"
                    }, void 0, false, {
                        fileName: "[project]/components/grid/ColumnMenu.tsx",
                        lineNumber: 146,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Item, {
                        onClick: sortDesc,
                        disabled: !canSort,
                        children: "Sort descending"
                    }, void 0, false, {
                        fileName: "[project]/components/grid/ColumnMenu.tsx",
                        lineNumber: 147,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Item, {
                        onClick: clearFilter,
                        disabled: !hasFilter,
                        children: "Clear filter"
                    }, void 0, false, {
                        fileName: "[project]/components/grid/ColumnMenu.tsx",
                        lineNumber: 148,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Separator, {}, void 0, false, {
                        fileName: "[project]/components/grid/ColumnMenu.tsx",
                        lineNumber: 150,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Item, {
                        onClick: autoSize,
                        children: "Auto‑size column"
                    }, void 0, false, {
                        fileName: "[project]/components/grid/ColumnMenu.tsx",
                        lineNumber: 152,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Item, {
                        onClick: resetWidth,
                        children: "Reset width"
                    }, void 0, false, {
                        fileName: "[project]/components/grid/ColumnMenu.tsx",
                        lineNumber: 153,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/grid/ColumnMenu.tsx",
                lineNumber: 123,
                columnNumber: 17
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/grid/ColumnMenu.tsx",
        lineNumber: 105,
        columnNumber: 9
    }, this);
}
function Section({ label }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "px-3 py-2 text-xs font-semibold uppercase tracking-wide text-gray-500",
        children: label
    }, void 0, false, {
        fileName: "[project]/components/grid/ColumnMenu.tsx",
        lineNumber: 162,
        columnNumber: 9
    }, this);
}
function Separator() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "my-1 h-px bg-gray-100"
    }, void 0, false, {
        fileName: "[project]/components/grid/ColumnMenu.tsx",
        lineNumber: 169,
        columnNumber: 12
    }, this);
}
function Item({ children, onClick, disabled, active }) {
    const base = "w-full px-3 py-2 text-left text-sm hover:bg-gray-50 focus:bg-gray-50 focus:outline-none";
    const styles = [
        base,
        disabled ? "cursor-not-allowed text-gray-300" : "text-gray-800",
        active ? "bg-gray-50 font-medium" : ""
    ].join(" ");
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        type: "button",
        className: styles,
        onClick: !disabled ? onClick : undefined,
        disabled: disabled,
        children: children
    }, void 0, false, {
        fileName: "[project]/components/grid/ColumnMenu.tsx",
        lineNumber: 191,
        columnNumber: 9
    }, this);
}
}),
"[project]/components/grid/export.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// components/grid/export.ts
/**
 * Lightweight export utilities. CSV works without extra deps.
 * XLSX tries to dynamically import 'xlsx' if available.
 */ __turbopack_context__.s([
    "exportRowsToCsv",
    ()=>exportRowsToCsv,
    "exportRowsToXlsx",
    ()=>exportRowsToXlsx
]);
function escapeCsv(value) {
    if (value === null || value === undefined) return "";
    const str = String(value);
    return /[",\n]/.test(str) ? `"${str.replace(/"/g, '""')}"` : str;
}
function exportRowsToCsv(rows, columns, fileName = "budget-grid.csv") {
    const colIds = columns.map((c)=>"accessorKey" in c && c.accessorKey ? String(c.accessorKey) : c.id ? String(c.id) : null).filter(Boolean);
    const header = colIds.join(",");
    const body = rows.map((r)=>colIds.map((k)=>escapeCsv(r[k] ?? "")).join(",")).join("\n");
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
async function exportRowsToXlsx(rows, columns, fileName = "budget-grid.xlsx") {
    try {
        const XLSX = await __turbopack_context__.A("[project]/node_modules/xlsx/xlsx.mjs [app-ssr] (ecmascript, async loader)"); // requires 'xlsx' to be installed
        const colIds = columns.map((c)=>"accessorKey" in c && c.accessorKey ? String(c.accessorKey) : c.id ? String(c.id) : null).filter(Boolean);
        const data = [
            colIds,
            ...rows.map((r)=>colIds.map((k)=>r[k] ?? ""))
        ];
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.aoa_to_sheet(data);
        XLSX.utils.book_append_sheet(wb, ws, "Budget");
        XLSX.writeFile(wb, fileName);
    } catch (err) {
        // Non-fatal if xlsx isn't present; CSV is still available.
        // eslint-disable-next-line no-console
        console.warn("[exportRowsToXlsx] 'xlsx' package not found. Install it with `npm i xlsx` to enable XLSX export.");
    }
}
}),
"[project]/components/grid/totals.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// components/grid/totals.ts
__turbopack_context__.s([
    "buildTotals",
    ()=>buildTotals
]);
function buildTotals(rows) {
    const totals = {};
    for (const row of rows){
        const values = row.getAllCells().map((c)=>({
                id: c.column.id,
                value: c.getValue()
            }));
        for (const { id, value } of values){
            if (typeof value === "number" && !isNaN(value)) {
                totals[id] = (totals[id] ?? 0) + value;
            }
        }
    }
    return totals;
}
}),
"[project]/components/grid/filters.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// components/grid/filters.ts
/**
 * Reusable filter functions & helpers for TanStack Table.
 */ __turbopack_context__.s([
    "equalsString",
    ()=>equalsString,
    "multiIncludesSome",
    ()=>multiIncludesSome,
    "parseYearFromPeriod",
    ()=>parseYearFromPeriod
]);
function multiIncludesSome(row, columnId, filterValue) {
    if (!Array.isArray(filterValue) || filterValue.length === 0) return true;
    const v = String(row.getValue(columnId) ?? "");
    return filterValue.includes(v);
}
function equalsString(row, columnId, filterValue) {
    if (!filterValue) return true;
    const v = String(row.getValue(columnId) ?? "");
    return v === String(filterValue);
}
function parseYearFromPeriod(period) {
    if (period == null) return null;
    const s = String(period);
    const y = s.slice(0, 4);
    return /^\d{4}$/.test(y) ? y : null;
}
}),
"[project]/components/grid/columns.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createBudgetColumns",
    ()=>createBudgetColumns
]);
// components/grid/columns.ts
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$grid$2f$AmountCell$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/grid/AmountCell.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$grid$2f$filters$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/grid/filters.tsx [app-ssr] (ecmascript)");
;
;
;
function createBudgetColumns() {
    return [
        {
            id: "community",
            accessorKey: "community",
            header: "Community",
            meta: {
                filterPlaceholder: "filter…"
            },
            filterFn: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$grid$2f$filters$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["multiIncludesSome"],
            enablePinning: true
        },
        {
            id: "type",
            accessorKey: "type",
            header: "Type",
            size: 130,
            filterFn: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$grid$2f$filters$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["equalsString"]
        },
        {
            id: "category",
            accessorKey: "category",
            header: "Category",
            filterFn: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$grid$2f$filters$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["multiIncludesSome"]
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
            accessorFn: (row)=>row.driver ?? row.driverTag ?? null
        },
        // Amount column: wrap AmountCell without JSX (this file is .ts)
        {
            id: "amount",
            accessorKey: "amount",
            header: "Amount",
            size: 140,
            cell: (ctx)=>/*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createElement(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$grid$2f$AmountCell$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                    // Narrow unknown -> number | null | undefined
                    getValue: ()=>ctx.getValue(),
                    row: ctx.row,
                    table: ctx.table
                })
        },
        // Hidden helper column for Year filtering (derived from period)
        {
            id: "__year",
            accessorFn: (row)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$grid$2f$filters$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["parseYearFromPeriod"])(row.period),
            header: "Year (hidden)",
            enableHiding: true,
            meta: {
                hiddenHelper: true
            },
            filterFn: (r, id, val)=>!val || String(r.getValue(id) ?? "") === String(val)
        }
    ];
}
``;
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
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$grid$2f$ToolbarFilters$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/grid/ToolbarFilters.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$grid$2f$VirtualRows$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/grid/VirtualRows.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$grid$2f$AmountCell$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/grid/AmountCell.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$grid$2f$ColumnMenu$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/grid/ColumnMenu.tsx [app-ssr] (ecmascript)");
// ───────────────────────────────────────────────────────────────────────────────
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$grid$2f$export$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/grid/export.ts [app-ssr] (ecmascript)");
// components/BudgetGrid.tanstack.tsx
"use client";
;
;
;
;
;
;
;
// ───────────────────────────────────────────────────────────────────────────────
// buildTotals: try real helper; otherwise a no‑op fallback so TS compiles
// ───────────────────────────────────────────────────────────────────────────────
let buildTotals;
try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const totalsMod = __turbopack_context__.r("[project]/components/grid/totals.ts [app-ssr] (ecmascript)");
    buildTotals = totalsMod.buildTotals;
} catch  {
    buildTotals = ()=>({});
}
;
const exportRowsToCsv = __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$grid$2f$export$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__.exportRowsToCsv ?? ((..._args)=>{});
function BudgetGrid({ rows, onRowsChange, className }) {
    // ── Table state
    const [sorting, setSorting] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"]([]);
    const [columnVisibility, setColumnVisibility] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"]({});
    const [columnPinning, setColumnPinning] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"]({
        left: [],
        right: []
    });
    const [columnSizing, setColumnSizing] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"]({});
    const [rowSelection, setRowSelection] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"]({});
    // ── Column filters (ToolbarFilters expects ColumnFilter[])
    const [filters, setFilters] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"]([]);
    const onClear = ()=>setFilters([]);
    // ── Resolve columns factory without forcing a rename in your columns.ts
    const columns = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"](()=>{
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const mod = __turbopack_context__.r("[project]/components/grid/columns.ts [app-ssr] (ecmascript)");
        const factory = mod.budgetColumns ?? mod.getColumns ?? mod.columns ?? mod.default;
        if (typeof factory === "function") {
            return factory({
                AmountCell: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$grid$2f$AmountCell$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
            });
        }
        if (Array.isArray(mod.default)) {
            return mod.default;
        }
        return [];
    }, []);
    // ── Table instance
    const table = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$table$2f$build$2f$lib$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["useReactTable"])({
        data: rows,
        columns,
        state: {
            sorting,
            columnVisibility,
            columnPinning,
            columnSizing,
            rowSelection,
            columnFilters: filters
        },
        enableColumnResizing: true,
        columnResizeMode: "onChange",
        // Models
        getCoreRowModel: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$table$2d$core$2f$build$2f$lib$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getCoreRowModel"])(),
        getFilteredRowModel: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$table$2d$core$2f$build$2f$lib$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getFilteredRowModel"])(),
        getFacetedUniqueValues: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$table$2d$core$2f$build$2f$lib$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getFacetedUniqueValues"])(),
        getFacetedRowModel: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$table$2d$core$2f$build$2f$lib$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getFacetedRowModel"])(),
        getSortedRowModel: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$table$2d$core$2f$build$2f$lib$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getSortedRowModel"])(),
        getExpandedRowModel: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$table$2d$core$2f$build$2f$lib$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getExpandedRowModel"])(),
        getPaginationRowModel: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$table$2d$core$2f$build$2f$lib$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getPaginationRowModel"])(),
        // Handlers
        onSortingChange: setSorting,
        onColumnVisibilityChange: setColumnVisibility,
        onColumnPinningChange: setColumnPinning,
        onColumnSizingChange: setColumnSizing,
        onRowSelectionChange: setRowSelection,
        onColumnFiltersChange: setFilters,
        // Inline editor path (AmountCell)
        meta: {
            commitAmount: (rowIndex, value)=>{
                if (!onRowsChange) return;
                const next = [
                    ...rows
                ];
                next[rowIndex].amount = value;
                onRowsChange(next);
            }
        },
        debugTable: false,
        debugHeaders: false,
        debugColumns: false
    });
    const totals = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"](()=>buildTotals(table.getFilteredRowModel().rows), [
        table
    ]);
    // ── Export CSV; try (table) signature, then (rows, columns)
    const exportCsv = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"](()=>{
        try {
            return exportRowsToCsv(table);
        } catch  {
            const data = table.getFilteredRowModel().rows.map((r)=>r.original);
            const cols = table.getAllLeafColumns().map((c)=>{
                const accessorFn = c.columnDef.accessorFn;
                return {
                    id: c.id,
                    header: c.columnDef.header,
                    accessorFn: accessorFn ?? ((row)=>row[c.id])
                };
            });
            return exportRowsToCsv(data, cols);
        }
    }, [
        table
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: [
            "flex h-full flex-col",
            className
        ].filter(Boolean).join(" "),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "border-b bg-white",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$grid$2f$ToolbarFilters$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                    table: table,
                    filters: filters,
                    setFilters: setFilters,
                    onClear: onClear,
                    onExport: exportCsv
                }, void 0, false, {
                    fileName: "[project]/components/BudgetGrid.tanstack.tsx",
                    lineNumber: 163,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/BudgetGrid.tanstack.tsx",
                lineNumber: 161,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative flex-1 overflow-hidden",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "h-full w-full overflow-auto",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                        className: "min-w-full border-separate border-spacing-0",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                className: "sticky top-0 z-10 bg-white",
                                children: table.getHeaderGroups().map((hg)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                        children: hg.headers.map((header)=>{
                                            const col = header.column;
                                            const pinned = col.getIsPinned();
                                            const style = {
                                                position: pinned ? "sticky" : undefined,
                                                // getStart/getAfter helpers might be untyped; use any to avoid version TS friction
                                                left: pinned === "left" ? col.getStart?.("left") : undefined,
                                                right: pinned === "right" ? col.getAfter?.("right") : undefined,
                                                zIndex: pinned ? 11 : undefined,
                                                width: col.getSize(),
                                                minWidth: col.columnDef.minSize ?? 60,
                                                maxWidth: col.columnDef.maxSize ?? 700
                                            };
                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                colSpan: header.colSpan,
                                                style: style,
                                                className: "whitespace-nowrap border-b border-gray-200 bg-white px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-gray-600",
                                                children: [
                                                    header.isPlaceholder ? null : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "relative flex items-center",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                className: "truncate",
                                                                onClick: col.getToggleSortingHandler(),
                                                                title: col.getIsSorted() === "asc" ? "Sort descending" : col.getIsSorted() === "desc" ? "Clear sort" : "Sort ascending",
                                                                children: [
                                                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$table$2f$build$2f$lib$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["flexRender"])(col.columnDef.header, header.getContext()),
                                                                    col.getIsSorted() && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "ml-1 text-gray-400",
                                                                        children: col.getIsSorted() === "asc" ? "▲" : "▼"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/BudgetGrid.tanstack.tsx",
                                                                        lineNumber: 215,
                                                                        columnNumber: 65
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/components/BudgetGrid.tanstack.tsx",
                                                                lineNumber: 202,
                                                                columnNumber: 57
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$grid$2f$ColumnMenu$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                                table: table,
                                                                column: col
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/BudgetGrid.tanstack.tsx",
                                                                lineNumber: 222,
                                                                columnNumber: 57
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/BudgetGrid.tanstack.tsx",
                                                        lineNumber: 201,
                                                        columnNumber: 53
                                                    }, this),
                                                    header.column.getCanResize() && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        onMouseDown: header.getResizeHandler(),
                                                        onTouchStart: header.getResizeHandler(),
                                                        className: "absolute right-0 top-0 h-full w-1 cursor-col-resize select-none touch-none"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/BudgetGrid.tanstack.tsx",
                                                        lineNumber: 228,
                                                        columnNumber: 53
                                                    }, this)
                                                ]
                                            }, header.id, true, {
                                                fileName: "[project]/components/BudgetGrid.tanstack.tsx",
                                                lineNumber: 194,
                                                columnNumber: 45
                                            }, this);
                                        })
                                    }, hg.id, false, {
                                        fileName: "[project]/components/BudgetGrid.tanstack.tsx",
                                        lineNumber: 178,
                                        columnNumber: 33
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/components/BudgetGrid.tanstack.tsx",
                                lineNumber: 176,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$grid$2f$VirtualRows$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    table: table
                                }, void 0, false, {
                                    fileName: "[project]/components/BudgetGrid.tanstack.tsx",
                                    lineNumber: 243,
                                    columnNumber: 29
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/BudgetGrid.tanstack.tsx",
                                lineNumber: 242,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tfoot", {
                                className: "sticky bottom-0 z-10 bg-white",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                    children: table.getAllLeafColumns().map((c)=>{
                                        const sum = totals[c.id];
                                        const pinned = c.getIsPinned();
                                        const style = {
                                            position: pinned ? "sticky" : undefined,
                                            left: pinned === "left" ? c.getStart?.("left") : undefined,
                                            right: pinned === "right" ? c.getAfter?.("right") : undefined,
                                            zIndex: pinned ? 11 : undefined,
                                            width: c.getSize(),
                                            minWidth: c.columnDef.minSize ?? 60,
                                            maxWidth: c.columnDef.maxSize ?? 700
                                        };
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            style: style,
                                            className: "border-t border-gray-200 px-3 py-2 text-right text-sm",
                                            children: typeof sum === "number" ? sum.toLocaleString() : ""
                                        }, c.id, false, {
                                            fileName: "[project]/components/BudgetGrid.tanstack.tsx",
                                            lineNumber: 262,
                                            columnNumber: 41
                                        }, this);
                                    })
                                }, void 0, false, {
                                    fileName: "[project]/components/BudgetGrid.tanstack.tsx",
                                    lineNumber: 248,
                                    columnNumber: 29
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/BudgetGrid.tanstack.tsx",
                                lineNumber: 247,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/BudgetGrid.tanstack.tsx",
                        lineNumber: 175,
                        columnNumber: 21
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/BudgetGrid.tanstack.tsx",
                    lineNumber: 174,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/BudgetGrid.tanstack.tsx",
                lineNumber: 173,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/BudgetGrid.tanstack.tsx",
        lineNumber: 159,
        columnNumber: 9
    }, this);
}
}),
];

//# sourceMappingURL=components_bf224773._.js.map