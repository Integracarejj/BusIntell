(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/components/BudgetGrid.tanstack.tsx [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

const e = new Error("Could not parse module '[project]/components/BudgetGrid.tanstack.tsx'\n\nExpected '</', got '#'");
e.code = 'MODULE_UNPARSABLE';
throw e;
}),
"[project]/components/ai/insightsEngine.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// /components/ai/insightsEngine.ts
// Non-UI "engine": accepts data, returns structured insight objects.
// Mocked for now, designed to be replaced with real analytics or LLM calls.
__turbopack_context__.s([
    "generateInsights",
    ()=>generateInsights
]);
function fmtCurrency(n) {
    const v = Number.isFinite(n) ? n : 0;
    return v.toLocaleString(undefined, {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}
function safeSum(rows) {
    return rows.reduce((acc, r)=>acc + (typeof r.amount === 'number' ? r.amount : 0), 0);
}
function topCategories(input, limit = 3) {
    const byCat = new Map();
    for (const r of input.filteredRows){
        if (!r.category) continue;
        const val = typeof r.amount === 'number' ? r.amount : 0;
        byCat.set(r.category, (byCat.get(r.category) ?? 0) + val);
    }
    return [
        ...byCat.entries()
    ].map(([category, value])=>({
            category,
            value
        })).sort((a, b)=>Math.abs(b.value) - Math.abs(a.value)).slice(0, limit);
}
function guessYOY(input) {
    // Heuristic YOY using period strings (YYYY-MM). If period not present, returns null.
    const byYear = new Map();
    for (const r of input.filteredRows){
        let yr = r.year;
        if (!yr && r.period && /^\d{4}-\d{2}$/.test(r.period)) {
            yr = Number(r.period.slice(0, 4));
        }
        if (!yr) continue;
        const amt = typeof r.amount === 'number' ? r.amount : 0;
        byYear.set(yr, (byYear.get(yr) ?? 0) + amt);
    }
    if (byYear.size < 2) return null;
    const years = [
        ...byYear.keys()
    ].sort();
    const latest = years[years.length - 1];
    const prev = years[years.length - 2];
    const curVal = byYear.get(latest) ?? 0;
    const prevVal = byYear.get(prev) ?? 0;
    const delta = curVal - prevVal;
    const pct = prevVal !== 0 ? delta / prevVal : 0;
    return {
        delta,
        pct
    };
}
async function generateInsights(input) {
    // Respect cancellation
    if (input.signal?.aborted) return [];
    // Keep it non-blocking: tiny delay simulates async work without blocking UI
    await new Promise((resolve, reject)=>{
        const t = setTimeout(resolve, 10);
        input.signal?.addEventListener('abort', ()=>{
            clearTimeout(t);
            reject(new DOMException('Aborted', 'AbortError'));
        });
    });
    const insights = [];
    // 1) KPI narrative
    insights.push({
        id: 'kpi-1',
        type: 'kpi_narrative',
        title: 'KPI overview',
        description: `Revenue ${fmtCurrency(input.totals.revenue)}, Expense ${fmtCurrency(input.totals.expense)}, Net ${fmtCurrency(input.totals.net)}.`,
        severity: 'info',
        // format highlights as strings; no extra "USD" unit needed
        highlights: [
            {
                label: 'Revenue',
                value: fmtCurrency(input.totals.revenue)
            },
            {
                label: 'Expense',
                value: fmtCurrency(input.totals.expense)
            },
            {
                label: 'Net',
                value: fmtCurrency(input.totals.net)
            }
        ]
    });
    // 2) Top categories by absolute value in-current filter context
    const top3 = topCategories(input, 3);
    if (top3.length) {
        insights.push({
            id: 'top-cat',
            type: 'trend',
            title: 'Top categories by spend/revenue (filtered scope)',
            description: top3.map((c, i)=>`${i + 1}. ${c.category}: ${fmtCurrency(c.value)}`).join(' · '),
            severity: 'info',
            highlights: top3.map((c)=>({
                    label: c.category,
                    value: fmtCurrency(c.value)
                }))
        });
    }
    // 3) Simple outlier (row-level) — largest absolute single line in the filter
    const largest = [
        ...input.filteredRows
    ].filter((r)=>typeof r.amount === 'number').sort((a, b)=>Math.abs(b.amount ?? 0) - Math.abs(a.amount ?? 0))[0];
    if (largest && typeof largest.amount === 'number') {
        insights.push({
            id: 'outlier-1',
            type: 'outlier',
            title: 'Largest single line item',
            description: `${largest.community ?? '—'} · ${largest.category ?? '—'}${largest.subCategory ? ` – ${largest.subCategory}` : ''}: ${fmtCurrency(largest.amount)}`,
            severity: 'warning',
            context: {
                community: largest.community,
                category: largest.category,
                subCategory: largest.subCategory
            },
            highlights: [
                {
                    label: 'Amount',
                    value: fmtCurrency(largest.amount)
                }
            ]
        });
    }
    // 4) YOY variance (heuristic)
    const yoy = guessYOY(input);
    if (yoy) {
        insights.push({
            id: 'yoy-1',
            type: 'variance',
            title: 'Year-over-year change (filtered scope)',
            description: `Δ ${fmtCurrency(yoy.delta)} (${(yoy.pct * 100).toFixed(1)}%) vs prior year.`,
            severity: Math.abs(yoy.pct) > 0.05 ? 'warning' : 'info',
            highlights: [
                {
                    label: 'Δ (absolute)',
                    value: fmtCurrency(yoy.delta)
                },
                {
                    label: 'Δ (percent)',
                    value: `${(yoy.pct * 100).toFixed(1)}%`
                }
            ]
        });
    }
    // 5) Recommendation (stub)
    const totalFiltered = safeSum(input.filteredRows);
    insights.push({
        id: 'rec-1',
        type: 'recommendation',
        title: 'Quick follow-up',
        description: totalFiltered < 0 ? 'Consider reviewing expense categories with the steepest QOQ growth for potential reductions.' : 'Consider spotlighting top-performing revenue categories for this quarter in the AGM review.',
        severity: 'info'
    });
    return insights;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/AIInsightsPanel.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AIInsightsPanel
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ai$2f$insightsEngine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ai/insightsEngine.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
// /components/AIInsightsPanel.tsx
'use client';
;
;
function AIInsightsPanel(props) {
    _s();
    const { open, onClose, title = 'AI Insights', ...input } = props;
    const [loading, setLoading] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useState(false);
    const [insights, setInsights] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useState([]);
    const [error, setError] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useState(null);
    // Generate insights when panel opens or inputs change
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useEffect({
        "AIInsightsPanel.useEffect": ()=>{
            if (!open) return;
            const controller = new AbortController();
            setLoading(true);
            setError(null);
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ai$2f$insightsEngine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["generateInsights"])({
                ...input,
                signal: controller.signal
            }).then({
                "AIInsightsPanel.useEffect": (res)=>{
                    setInsights(res);
                    setLoading(false);
                }
            }["AIInsightsPanel.useEffect"]).catch({
                "AIInsightsPanel.useEffect": (err)=>{
                    if (err?.name === 'AbortError') return; // silent on abort
                    setError(err?.message ?? 'Failed to generate insights.');
                    setLoading(false);
                }
            }["AIInsightsPanel.useEffect"]);
            return ({
                "AIInsightsPanel.useEffect": ()=>controller.abort()
            })["AIInsightsPanel.useEffect"];
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }
    }["AIInsightsPanel.useEffect"], [
        open,
        input.rows,
        input.filteredRows,
        JSON.stringify(input.grouping),
        JSON.stringify(input.totals)
    ]);
    // A11y: close on Escape
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useEffect({
        "AIInsightsPanel.useEffect": ()=>{
            if (!open) return;
            const onKey = {
                "AIInsightsPanel.useEffect.onKey": (e)=>{
                    if (e.key === 'Escape') onClose();
                }
            }["AIInsightsPanel.useEffect.onKey"];
            window.addEventListener('keydown', onKey);
            return ({
                "AIInsightsPanel.useEffect": ()=>window.removeEventListener('keydown', onKey)
            })["AIInsightsPanel.useEffect"];
        }
    }["AIInsightsPanel.useEffect"], [
        open,
        onClose
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                "aria-hidden": !open,
                onClick: onClose,
                style: {
                    position: 'fixed',
                    inset: 0,
                    background: open ? 'rgba(0,0,0,0.35)' : 'transparent',
                    opacity: open ? 1 : 0,
                    pointerEvents: open ? 'auto' : 'none',
                    transition: 'opacity 150ms ease',
                    zIndex: 50
                }
            }, void 0, false, {
                fileName: "[project]/components/AIInsightsPanel.tsx",
                lineNumber: 63,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
                role: "dialog",
                "aria-modal": "true",
                "aria-label": title,
                style: {
                    position: 'fixed',
                    top: 0,
                    right: 0,
                    height: '100%',
                    width: 540,
                    maxWidth: '100vw',
                    background: '#fff',
                    boxShadow: 'rgba(0, 0, 0, 0.2) 0px 0px 20px',
                    transform: open ? 'translateX(0)' : 'translateX(100%)',
                    transition: 'transform 200ms ease',
                    zIndex: 51,
                    display: 'flex',
                    flexDirection: 'column'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            padding: '16px 20px',
                            borderBottom: '1px solid #e5e7eb',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                style: {
                                    fontSize: 18,
                                    fontWeight: 600,
                                    margin: 0
                                },
                                children: title
                            }, void 0, false, {
                                fileName: "[project]/components/AIInsightsPanel.tsx",
                                lineNumber: 107,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                "aria-label": "Close insights",
                                onClick: onClose,
                                style: {
                                    appearance: 'none',
                                    border: 0,
                                    background: 'transparent',
                                    cursor: 'pointer',
                                    padding: 8,
                                    borderRadius: 8
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                    width: "18",
                                    height: "18",
                                    viewBox: "0 0 24 24",
                                    fill: "none",
                                    stroke: "currentColor",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        d: "M18 6L6 18M6 6l12 12",
                                        strokeWidth: "2",
                                        strokeLinecap: "round"
                                    }, void 0, false, {
                                        fileName: "[project]/components/AIInsightsPanel.tsx",
                                        lineNumber: 122,
                                        columnNumber: 29
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/AIInsightsPanel.tsx",
                                    lineNumber: 121,
                                    columnNumber: 25
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/AIInsightsPanel.tsx",
                                lineNumber: 108,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/AIInsightsPanel.tsx",
                        lineNumber: 98,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            padding: 16,
                            overflow: 'auto'
                        },
                        children: [
                            loading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    color: '#6b7280',
                                    fontSize: 14
                                },
                                children: "Generating insights…"
                            }, void 0, false, {
                                fileName: "[project]/components/AIInsightsPanel.tsx",
                                lineNumber: 130,
                                columnNumber: 25
                            }, this),
                            error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    color: '#b91c1c',
                                    fontSize: 14
                                },
                                children: [
                                    "Error: ",
                                    error
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/AIInsightsPanel.tsx",
                                lineNumber: 133,
                                columnNumber: 25
                            }, this),
                            !loading && !error && insights.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    color: '#6b7280',
                                    fontSize: 14
                                },
                                children: "No insights to display yet."
                            }, void 0, false, {
                                fileName: "[project]/components/AIInsightsPanel.tsx",
                                lineNumber: 136,
                                columnNumber: 25
                            }, this),
                            !loading && !error && insights.map((ins)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                                    style: {
                                        border: '1px solid #e5e7eb',
                                        borderRadius: 8,
                                        padding: 12,
                                        marginBottom: 12
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                                            style: {
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: 8
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Badge, {
                                                    type: ins.type
                                                }, void 0, false, {
                                                    fileName: "[project]/components/AIInsightsPanel.tsx",
                                                    lineNumber: 151,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    style: {
                                                        fontSize: 15,
                                                        fontWeight: 600,
                                                        margin: 0
                                                    },
                                                    children: ins.title
                                                }, void 0, false, {
                                                    fileName: "[project]/components/AIInsightsPanel.tsx",
                                                    lineNumber: 152,
                                                    columnNumber: 37
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/AIInsightsPanel.tsx",
                                            lineNumber: 150,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            style: {
                                                fontSize: 14,
                                                color: '#374151',
                                                marginTop: 8,
                                                marginBottom: 8
                                            },
                                            children: ins.description
                                        }, void 0, false, {
                                            fileName: "[project]/components/AIInsightsPanel.tsx",
                                            lineNumber: 154,
                                            columnNumber: 33
                                        }, this),
                                        ins.highlights?.length ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                            style: {
                                                margin: 0,
                                                paddingLeft: 18,
                                                fontSize: 13,
                                                color: '#111827'
                                            },
                                            children: ins.highlights.map((h, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                            children: [
                                                                h.label,
                                                                ":"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/components/AIInsightsPanel.tsx",
                                                            lineNumber: 161,
                                                            columnNumber: 49
                                                        }, this),
                                                        " ",
                                                        String(h.value),
                                                        " ",
                                                        h.unit ?? ''
                                                    ]
                                                }, i, true, {
                                                    fileName: "[project]/components/AIInsightsPanel.tsx",
                                                    lineNumber: 160,
                                                    columnNumber: 45
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/components/AIInsightsPanel.tsx",
                                            lineNumber: 158,
                                            columnNumber: 37
                                        }, this) : null
                                    ]
                                }, ins.id, true, {
                                    fileName: "[project]/components/AIInsightsPanel.tsx",
                                    lineNumber: 141,
                                    columnNumber: 29
                                }, this))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/AIInsightsPanel.tsx",
                        lineNumber: 128,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/AIInsightsPanel.tsx",
                lineNumber: 77,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true);
}
_s(AIInsightsPanel, "74OjxnYC9mqgYLQYy0y2NBFL5Jw=");
_c = AIInsightsPanel;
function Badge({ type }) {
    const map = {
        kpi_narrative: {
            bg: '#EEF2FF',
            fg: '#3730A3',
            label: 'KPI'
        },
        trend: {
            bg: '#ECFEFF',
            fg: '#155E75',
            label: 'Trend'
        },
        variance: {
            bg: '#FEF3C7',
            fg: '#92400E',
            label: 'Variance'
        },
        peer_comparison: {
            bg: '#F5F3FF',
            fg: '#6D28D9',
            label: 'Peer'
        },
        outlier: {
            bg: '#FEE2E2',
            fg: '#991B1B',
            label: 'Outlier'
        },
        recommendation: {
            bg: '#E0F2FE',
            fg: '#075985',
            label: 'Rec'
        }
    };
    const { bg, fg, label } = map[type] ?? {
        bg: '#F3F4F6',
        fg: '#374151',
        label: type
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        style: {
            background: bg,
            color: fg,
            fontSize: 12,
            fontWeight: 600,
            borderRadius: 999,
            padding: '2px 8px'
        },
        children: label
    }, void 0, false, {
        fileName: "[project]/components/AIInsightsPanel.tsx",
        lineNumber: 185,
        columnNumber: 9
    }, this);
}
_c1 = Badge;
``;
var _c, _c1;
__turbopack_context__.k.register(_c, "AIInsightsPanel");
__turbopack_context__.k.register(_c1, "Badge");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
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
"[project]/app/agm/budget/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AgmBudgetPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/styled-jsx/style.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$BudgetGrid$2e$tanstack$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/BudgetGrid.tanstack.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$AIInsightsPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/AIInsightsPanel.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$grid$2f$columns$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/grid/columns.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
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
    if (!Array.isArray(json)) {
        throw new Error(`Unexpected JSON shape from ${DATA_URL}`);
    }
    return json.map((r)=>({
            ...r,
            community: String(r.community ?? ''),
            category: String(r.category ?? ''),
            subCategory: String(r.subCategory ?? ''),
            period: String(r.period ?? ''),
            type: String(r.type ?? ''),
            amount: Number(r.amount ?? 0)
        }));
}
/* ============================================================================
   Tiny UI helpers
   ============================================================================ */ const Label = ({ children })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            fontSize: 12,
            color: '#6b7a8a',
            fontWeight: 600,
            marginBottom: 4
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/app/agm/budget/page.tsx",
        lineNumber: 46,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
_c = Label;
const SmallCard = ({ title, value })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    fontSize: 11,
                    color: '#7a8a99'
                },
                children: title
            }, void 0, false, {
                fileName: "[project]/app/agm/budget/page.tsx",
                lineNumber: 62,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    fontSize: 22,
                    fontWeight: 600
                },
                children: value
            }, void 0, false, {
                fileName: "[project]/app/agm/budget/page.tsx",
                lineNumber: 63,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/app/agm/budget/page.tsx",
        lineNumber: 50,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
_c1 = SmallCard;
function MultiSelectGrouped({ placeholder, groups, selected, onChange, width }) {
    _s();
    const [open, setOpen] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](false);
    const containerRef = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"](null);
    const toggleItem = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"]({
        "MultiSelectGrouped.useCallback[toggleItem]": (item)=>{
            const next = new Set(selected);
            next.has(item) ? next.delete(item) : next.add(item);
            onChange(next);
        }
    }["MultiSelectGrouped.useCallback[toggleItem]"], [
        selected,
        onChange
    ]);
    const toggleGroup = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"]({
        "MultiSelectGrouped.useCallback[toggleGroup]": (items)=>{
            const next = new Set(selected);
            const allSelected = items.every({
                "MultiSelectGrouped.useCallback[toggleGroup].allSelected": (i)=>next.has(i)
            }["MultiSelectGrouped.useCallback[toggleGroup].allSelected"]);
            if (allSelected) items.forEach({
                "MultiSelectGrouped.useCallback[toggleGroup]": (i)=>next.delete(i)
            }["MultiSelectGrouped.useCallback[toggleGroup]"]);
            else items.forEach({
                "MultiSelectGrouped.useCallback[toggleGroup]": (i)=>next.add(i)
            }["MultiSelectGrouped.useCallback[toggleGroup]"]);
            onChange(next);
        }
    }["MultiSelectGrouped.useCallback[toggleGroup]"], [
        selected,
        onChange
    ]);
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"]({
        "MultiSelectGrouped.useEffect": ()=>{
            if (!open) return;
            const handle = {
                "MultiSelectGrouped.useEffect.handle": (e)=>{
                    if (containerRef.current && !containerRef.current.contains(e.target)) {
                        setOpen(false);
                    }
                }
            }["MultiSelectGrouped.useEffect.handle"];
            document.addEventListener('mousedown', handle);
            return ({
                "MultiSelectGrouped.useEffect": ()=>document.removeEventListener('mousedown', handle)
            })["MultiSelectGrouped.useEffect"];
        }
    }["MultiSelectGrouped.useEffect"], [
        open
    ]);
    const summary = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"]({
        "MultiSelectGrouped.useMemo[summary]": ()=>{
            const count = selected.size;
            if (count === 0) return placeholder;
            if (count <= 2) return Array.from(selected).join(', ');
            return `${count} selected`;
        }
    }["MultiSelectGrouped.useMemo[summary]"], [
        selected,
        placeholder
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: containerRef,
        style: {
            position: 'relative',
            width
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
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
                lineNumber: 128,
                columnNumber: 13
            }, this),
            open && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            paddingBottom: 10,
                            marginBottom: 10,
                            borderBottom: '1px solid #f0f3f6'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                style: {
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 8,
                                    marginBottom: 6
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "checkbox",
                                        checked: allSelected,
                                        ref: (el)=>{
                                            if (el) el.indeterminate = !allSelected && someSelected;
                                        },
                                        onChange: ()=>toggleGroup(items)
                                    }, void 0, false, {
                                        fileName: "[project]/app/agm/budget/page.tsx",
                                        lineNumber: 172,
                                        columnNumber: 37
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            fontWeight: 700,
                                            fontSize: 12,
                                            color: '#334155'
                                        },
                                        children: group
                                    }, void 0, false, {
                                        fileName: "[project]/app/agm/budget/page.tsx",
                                        lineNumber: 180,
                                        columnNumber: 37
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/agm/budget/page.tsx",
                                lineNumber: 171,
                                columnNumber: 33
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: 'grid',
                                    gridTemplateColumns: '1fr 1fr',
                                    gap: 4
                                },
                                children: items.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        style: {
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 6,
                                            fontSize: 13
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "checkbox",
                                                checked: selected.has(item),
                                                onChange: ()=>toggleItem(item)
                                            }, void 0, false, {
                                                fileName: "[project]/app/agm/budget/page.tsx",
                                                lineNumber: 186,
                                                columnNumber: 45
                                            }, this),
                                            item
                                        ]
                                    }, item, true, {
                                        fileName: "[project]/app/agm/budget/page.tsx",
                                        lineNumber: 185,
                                        columnNumber: 41
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/app/agm/budget/page.tsx",
                                lineNumber: 183,
                                columnNumber: 33
                            }, this)
                        ]
                    }, group, true, {
                        fileName: "[project]/app/agm/budget/page.tsx",
                        lineNumber: 167,
                        columnNumber: 29
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/app/agm/budget/page.tsx",
                lineNumber: 146,
                columnNumber: 17
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/agm/budget/page.tsx",
        lineNumber: 127,
        columnNumber: 9
    }, this);
}
_s(MultiSelectGrouped, "nfgW9jLC4oq/uH+niYVsYb5jxpQ=");
_c2 = MultiSelectGrouped;
function AgmBudgetPage() {
    _s1();
    const [rows, setRows] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"]([]);
    const [loading, setLoading] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](true);
    const [error, setError] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](null);
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"]({
        "AgmBudgetPage.useEffect": ()=>{
            let alive = true;
            ({
                "AgmBudgetPage.useEffect": async ()=>{
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
                }
            })["AgmBudgetPage.useEffect"]();
            return ({
                "AgmBudgetPage.useEffect": ()=>{
                    alive = false;
                }
            })["AgmBudgetPage.useEffect"];
        }
    }["AgmBudgetPage.useEffect"], []);
    /* --------------------------------------------------------------------------
       SHARED FILTER STATE (for Community / Year / Quarter / Month)
       -------------------------------------------------------------------------- */ const [filters, setFilters] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"]([]);
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
       -------------------------------------------------------------------------- */ const allCommunities = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"]({
        "AgmBudgetPage.useMemo[allCommunities]": ()=>Array.from(new Set(rows.map({
                "AgmBudgetPage.useMemo[allCommunities]": (r)=>r.community
            }["AgmBudgetPage.useMemo[allCommunities]"]).filter(Boolean))).sort()
    }["AgmBudgetPage.useMemo[allCommunities]"], [
        rows
    ]);
    const allYears = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"]({
        "AgmBudgetPage.useMemo[allYears]": ()=>Array.from(new Set(rows.map({
                "AgmBudgetPage.useMemo[allYears]": (r)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$grid$2f$columns$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["deriveYear"])(r.period)
            }["AgmBudgetPage.useMemo[allYears]"]).filter(Boolean))).sort()
    }["AgmBudgetPage.useMemo[allYears]"], [
        rows
    ]);
    const allQuarters = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"]({
        "AgmBudgetPage.useMemo[allQuarters]": ()=>Array.from(new Set(rows.map({
                "AgmBudgetPage.useMemo[allQuarters]": (r)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$grid$2f$columns$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["deriveQuarterLabel"])(r.period)
            }["AgmBudgetPage.useMemo[allQuarters]"]).filter(Boolean))).sort()
    }["AgmBudgetPage.useMemo[allQuarters]"], [
        rows
    ]);
    const allMonths = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"]({
        "AgmBudgetPage.useMemo[allMonths]": ()=>Array.from(new Set(rows.map({
                "AgmBudgetPage.useMemo[allMonths]": (r)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$grid$2f$columns$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["deriveMonthLabel"])(r.period)
            }["AgmBudgetPage.useMemo[allMonths]"]).filter(Boolean))).sort()
    }["AgmBudgetPage.useMemo[allMonths]"], [
        rows
    ]);
    // Revenue subcategories (for the Revenue totals picker)
    const revenueSubcats = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"]({
        "AgmBudgetPage.useMemo[revenueSubcats]": ()=>Array.from(new Set(rows.filter({
                "AgmBudgetPage.useMemo[revenueSubcats]": (r)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$grid$2f$columns$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mapBudgetType"])(r.type) === 'Revenue'
            }["AgmBudgetPage.useMemo[revenueSubcats]"]).map({
                "AgmBudgetPage.useMemo[revenueSubcats]": (r)=>typeof r.subCategory === 'string' ? r.subCategory : ''
            }["AgmBudgetPage.useMemo[revenueSubcats]"]).filter({
                "AgmBudgetPage.useMemo[revenueSubcats]": (s)=>s.length > 0
            }["AgmBudgetPage.useMemo[revenueSubcats]"]))).sort()
    }["AgmBudgetPage.useMemo[revenueSubcats]"], [
        rows
    ]);
    // EXPENSE GROUPING — Hybrid (A): use dash prefix if present, else use category (C)
    const expenseGroups = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"]({
        "AgmBudgetPage.useMemo[expenseGroups]": ()=>{
            const map = new Map();
            for (const r of rows){
                const t = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$grid$2f$columns$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mapBudgetType"])(r.type);
                if (t === 'Expense' || t === 'CapEx') {
                    const sub = typeof r.subCategory === 'string' ? r.subCategory.trim() : '';
                    if (!sub) continue;
                    const dashIdx = sub.indexOf('-');
                    const byPrefix = dashIdx > 0 ? sub.slice(0, dashIdx).trim() : '';
                    const fallbackCat = String(r.category ?? '').trim() || (t === 'CapEx' ? 'CapEx' : 'Expense');
                    const group = byPrefix || fallbackCat;
                    if (!map.has(group)) map.set(group, new Set());
                    map.get(group).add(sub);
                }
            }
            return Array.from(map.entries()).map({
                "AgmBudgetPage.useMemo[expenseGroups]": ([group, set])=>({
                        group,
                        items: Array.from(set)
                    })
            }["AgmBudgetPage.useMemo[expenseGroups]"]).sort({
                "AgmBudgetPage.useMemo[expenseGroups]": (a, b)=>a.group.localeCompare(b.group)
            }["AgmBudgetPage.useMemo[expenseGroups]"]);
        }
    }["AgmBudgetPage.useMemo[expenseGroups]"], [
        rows
    ]);
    const revenueGroups = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"]({
        "AgmBudgetPage.useMemo[revenueGroups]": ()=>revenueSubcats.length ? [
                {
                    group: 'Revenue',
                    items: revenueSubcats
                }
            ] : []
    }["AgmBudgetPage.useMemo[revenueGroups]"], [
        revenueSubcats
    ]);
    /* --------------------------------------------------------------------------
       FILTERED ROWS for cards & totals (respects Community/Year/Qtr/Month)
       -------------------------------------------------------------------------- */ const filteredRows = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"]({
        "AgmBudgetPage.useMemo[filteredRows]": ()=>{
            return rows.filter({
                "AgmBudgetPage.useMemo[filteredRows]": (r)=>{
                    if (selected.community && r.community !== selected.community) return false;
                    const y = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$grid$2f$columns$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["deriveYear"])(r.period);
                    if (selected.year && y !== selected.year) return false;
                    const q = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$grid$2f$columns$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["deriveQuarterLabel"])(r.period);
                    if (selected.quarter && q !== selected.quarter) return false;
                    const m = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$grid$2f$columns$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["deriveMonthLabel"])(r.period);
                    if (selected.month && m !== selected.month) return false;
                    const bt = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$grid$2f$columns$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mapBudgetType"])(r.type);
                    if (selected.budgetType && bt !== selected.budgetType) return false;
                    if (selected.category && r.category !== selected.category) return false;
                    return true;
                }
            }["AgmBudgetPage.useMemo[filteredRows]"]);
        }
    }["AgmBudgetPage.useMemo[filteredRows]"], [
        rows,
        selected
    ]);
    /* --------------------------------------------------------------------------
       KPI CARDS (Revenue, Expense, Net)
       -------------------------------------------------------------------------- */ const totals = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"]({
        "AgmBudgetPage.useMemo[totals]": ()=>{
            let rev = 0, exp = 0;
            for (const r of filteredRows){
                const amt = Number(r.amount ?? 0);
                const bt = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$grid$2f$columns$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mapBudgetType"])(r.type);
                if (bt === 'Revenue') rev += amt;
                else if (bt === 'Expense' || bt === 'CapEx') exp += amt;
            }
            return {
                rev,
                exp,
                net: rev - exp
            };
        }
    }["AgmBudgetPage.useMemo[totals]"], [
        filteredRows
    ]);
    const fmt = (n)=>Intl.NumberFormat(undefined, {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: 0
        }).format(n || 0);
    /* --------------------------------------------------------------------------
       CATEGORY TOTAL SELECTORS — grouped multi-select
       -------------------------------------------------------------------------- */ const [revSel, setRevSel] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](new Set());
    const [expSel, setExpSel] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](new Set());
    const revCatTotal = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"]({
        "AgmBudgetPage.useMemo[revCatTotal]": ()=>{
            if (!revSel.size) return 0;
            return filteredRows.filter({
                "AgmBudgetPage.useMemo[revCatTotal]": (r)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$grid$2f$columns$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mapBudgetType"])(r.type) === 'Revenue' && revSel.has(String(r.subCategory))
            }["AgmBudgetPage.useMemo[revCatTotal]"]).reduce({
                "AgmBudgetPage.useMemo[revCatTotal]": (sum, r)=>sum + Number(r.amount ?? 0)
            }["AgmBudgetPage.useMemo[revCatTotal]"], 0);
        }
    }["AgmBudgetPage.useMemo[revCatTotal]"], [
        filteredRows,
        revSel
    ]);
    const expCatTotal = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"]({
        "AgmBudgetPage.useMemo[expCatTotal]": ()=>{
            if (!expSel.size) return 0;
            return filteredRows.filter({
                "AgmBudgetPage.useMemo[expCatTotal]": (r)=>{
                    const t = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$grid$2f$columns$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mapBudgetType"])(r.type);
                    return (t === 'Expense' || t === 'CapEx') && expSel.has(String(r.subCategory));
                }
            }["AgmBudgetPage.useMemo[expCatTotal]"]).reduce({
                "AgmBudgetPage.useMemo[expCatTotal]": (sum, r)=>sum + Number(r.amount ?? 0)
            }["AgmBudgetPage.useMemo[expCatTotal]"], 0);
        }
    }["AgmBudgetPage.useMemo[expCatTotal]"], [
        filteredRows,
        expSel
    ]);
    /* --------------------------------------------------------------------------
       AI: state + totals in required shape + STRICT-MODE SAFE grouping
       -------------------------------------------------------------------------- */ const [aiOpen, setAiOpen] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](false);
    const [groupingKeys, setGroupingKeys] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"]([]);
    // Normalize rows for AI types: ensure shapes match AIBudgetRow exactly
    const aiRows = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"]({
        "AgmBudgetPage.useMemo[aiRows]": ()=>rows.map({
                "AgmBudgetPage.useMemo[aiRows]": (r)=>({
                        community: String(r.community ?? ''),
                        category: String(r.category ?? ''),
                        subCategory: typeof r.subCategory === 'string' ? r.subCategory : '',
                        budgetMethod: r.budgetMethod ?? undefined,
                        driver: r.driver ?? undefined,
                        driverTag: r.driverTag ?? undefined,
                        glCode: r.glCode ?? null,
                        period: String(r.period ?? ''),
                        type: String(r.type ?? ''),
                        amount: r.amount ?? 0
                    })
            }["AgmBudgetPage.useMemo[aiRows]"])
    }["AgmBudgetPage.useMemo[aiRows]"], [
        rows
    ]);
    const aiFilteredRows = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"]({
        "AgmBudgetPage.useMemo[aiFilteredRows]": ()=>filteredRows.map({
                "AgmBudgetPage.useMemo[aiFilteredRows]": (r)=>({
                        community: String(r.community ?? ''),
                        category: String(r.category ?? ''),
                        subCategory: typeof r.subCategory === 'string' ? r.subCategory : '',
                        budgetMethod: r.budgetMethod ?? undefined,
                        driver: r.driver ?? undefined,
                        driverTag: r.driverTag ?? undefined,
                        glCode: r.glCode ?? null,
                        period: String(r.period ?? ''),
                        type: String(r.type ?? ''),
                        amount: r.amount ?? 0
                    })
            }["AgmBudgetPage.useMemo[aiFilteredRows]"])
    }["AgmBudgetPage.useMemo[aiFilteredRows]"], [
        filteredRows
    ]);
    // Build AI totals with correct shape
    const aiTotals = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"]({
        "AgmBudgetPage.useMemo[aiTotals]": ()=>{
            const byCategory = new Map();
            const byCommunity = new Map();
            let revenue = 0;
            let expense = 0;
            for (const r of filteredRows){
                const amt = Number(r.amount ?? 0);
                const bt = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$grid$2f$columns$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mapBudgetType"])(r.type);
                if (bt === 'Revenue') revenue += amt;
                else if (bt === 'Expense' || bt === 'CapEx') expense += amt;
                const cat = String(r.category ?? 'Uncategorized');
                const comm = String(r.community ?? '—');
                byCategory.set(cat, (byCategory.get(cat) ?? 0) + amt);
                byCommunity.set(comm, (byCommunity.get(comm) ?? 0) + amt);
            }
            return {
                revenue,
                expense,
                net: revenue - expense,
                byCategory: Object.fromEntries(byCategory),
                byCommunity: Object.fromEntries(byCommunity)
            };
        }
    }["AgmBudgetPage.useMemo[aiTotals]"], [
        filteredRows
    ]);
    // --- SAFETY: Only allow setState after the page has mounted ---
    // Use layout effect to ensure the guard is set before child effects fire
    const mountedRef = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"](false);
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLayoutEffect"]({
        "AgmBudgetPage.useLayoutEffect": ()=>{
            mountedRef.current = true;
            return ({
                "AgmBudgetPage.useLayoutEffect": ()=>{
                    mountedRef.current = false;
                }
            })["AgmBudgetPage.useLayoutEffect"];
        }
    }["AgmBudgetPage.useLayoutEffect"], []);
    const handleGroupingAfterRender = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"]({
        "AgmBudgetPage.useCallback[handleGroupingAfterRender]": (keys)=>{
            if (!mountedRef.current) return;
            requestAnimationFrame({
                "AgmBudgetPage.useCallback[handleGroupingAfterRender]": ()=>{
                    if (mountedRef.current) {
                        setGroupingKeys(keys);
                    }
                }
            }["AgmBudgetPage.useCallback[handleGroupingAfterRender]"]);
        }
    }["AgmBudgetPage.useCallback[handleGroupingAfterRender]"], []);
    // Guarded, setState-compatible signature to match BudgetGrid's expectation
    const handleFiltersChange = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"]({
        "AgmBudgetPage.useCallback[handleFiltersChange]": (updater)=>{
            if (!mountedRef.current) return;
            setFilters({
                "AgmBudgetPage.useCallback[handleFiltersChange]": (prev)=>typeof updater === 'function' ? updater(prev) : updater
            }["AgmBudgetPage.useCallback[handleFiltersChange]"]);
        }
    }["AgmBudgetPage.useCallback[handleFiltersChange]"], []);
    const CATEGORY_WIDTH = 420;
    const RIGHT_PANEL_MAX = 540;
    const COMPACT = 120;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        style: {
            padding: 16,
            display: 'flex',
            flexDirection: 'column',
            gap: 6
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                style: {
                    display: 'grid',
                    gridTemplateColumns: '280px 1fr',
                    columnGap: 220,
                    alignItems: 'start',
                    marginBottom: 6
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Label, {
                                children: "Community"
                            }, void 0, false, {
                                fileName: "[project]/app/agm/budget/page.tsx",
                                lineNumber: 487,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
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
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "",
                                        children: "All"
                                    }, void 0, false, {
                                        fileName: "[project]/app/agm/budget/page.tsx",
                                        lineNumber: 506,
                                        columnNumber: 25
                                    }, this),
                                    allCommunities.map((c)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                            value: c,
                                            children: c
                                        }, c, false, {
                                            fileName: "[project]/app/agm/budget/page.tsx",
                                            lineNumber: 508,
                                            columnNumber: 29
                                        }, this))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/agm/budget/page.tsx",
                                lineNumber: 488,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: 10,
                                    marginTop: 0
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SmallCard, {
                                        title: "TOTAL REVENUE",
                                        value: fmt(totals.rev)
                                    }, void 0, false, {
                                        fileName: "[project]/app/agm/budget/page.tsx",
                                        lineNumber: 516,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SmallCard, {
                                        title: "TOTAL EXPENSE",
                                        value: fmt(totals.exp)
                                    }, void 0, false, {
                                        fileName: "[project]/app/agm/budget/page.tsx",
                                        lineNumber: 517,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SmallCard, {
                                        title: "NET",
                                        value: fmt(totals.net)
                                    }, void 0, false, {
                                        fileName: "[project]/app/agm/budget/page.tsx",
                                        lineNumber: 518,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/agm/budget/page.tsx",
                                lineNumber: 515,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/agm/budget/page.tsx",
                        lineNumber: 486,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: 'flex',
                            justifyContent: 'flex-start'
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                width: '100%',
                                maxWidth: RIGHT_PANEL_MAX,
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 18,
                                marginTop: 0,
                                position: 'relative',
                                paddingTop: 32
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        display: 'flex',
                                        justifyContent: 'flex-end',
                                        width: '100%',
                                        position: 'absolute',
                                        top: 0,
                                        right: 0,
                                        paddingRight: 8,
                                        paddingTop: 4
                                    },
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: ()=>setAiOpen((v)=>!v),
                                        "aria-pressed": aiOpen,
                                        "aria-label": "Open AI insights",
                                        title: "Open AI insights",
                                        style: {
                                            appearance: 'none',
                                            border: '1px solid #e5e7eb',
                                            background: aiOpen ? '#111827' : '#fff',
                                            color: aiOpen ? '#fff' : '#111827',
                                            borderRadius: 8,
                                            padding: '6px 10px',
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            gap: 8,
                                            cursor: 'pointer'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                width: "16",
                                                height: "16",
                                                fill: "currentColor",
                                                viewBox: "0 0 24 24",
                                                "aria-hidden": "true",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                    d: "M5 3l1.5 3.5L10 8l-3.5 1.5L5 13l-1.5-3.5L0 8l3.5-1.5L5 3zm11 2l2 5 5 2-5 2-2 5-2-5-5-2 5-2 2-5z"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/agm/budget/page.tsx",
                                                    lineNumber: 569,
                                                    columnNumber: 37
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/app/agm/budget/page.tsx",
                                                lineNumber: 568,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    fontSize: 14,
                                                    fontWeight: 600
                                                },
                                                children: "AI"
                                            }, void 0, false, {
                                                fileName: "[project]/app/agm/budget/page.tsx",
                                                lineNumber: 571,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/agm/budget/page.tsx",
                                        lineNumber: 549,
                                        columnNumber: 29
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/agm/budget/page.tsx",
                                    lineNumber: 537,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Label, {
                                            children: "Revenue Category Totals"
                                        }, void 0, false, {
                                            fileName: "[project]/app/agm/budget/page.tsx",
                                            lineNumber: 577,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                display: 'grid',
                                                gridTemplateColumns: 'auto 120px',
                                                gap: 12
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MultiSelectGrouped, {
                                                    placeholder: "Pick category",
                                                    groups: revenueGroups,
                                                    selected: revSel,
                                                    onChange: setRevSel,
                                                    width: CATEGORY_WIDTH
                                                }, void 0, false, {
                                                    fileName: "[project]/app/agm/budget/page.tsx",
                                                    lineNumber: 579,
                                                    columnNumber: 33
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                                                    lineNumber: 586,
                                                    columnNumber: 33
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/agm/budget/page.tsx",
                                            lineNumber: 578,
                                            columnNumber: 29
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/agm/budget/page.tsx",
                                    lineNumber: 576,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Label, {
                                            children: "Expense Category Totals"
                                        }, void 0, false, {
                                            fileName: "[project]/app/agm/budget/page.tsx",
                                            lineNumber: 604,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                display: 'grid',
                                                gridTemplateColumns: 'auto 120px',
                                                gap: 12
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MultiSelectGrouped, {
                                                    placeholder: "Pick category",
                                                    groups: expenseGroups,
                                                    selected: expSel,
                                                    onChange: setExpSel,
                                                    width: CATEGORY_WIDTH
                                                }, void 0, false, {
                                                    fileName: "[project]/app/agm/budget/page.tsx",
                                                    lineNumber: 606,
                                                    columnNumber: 33
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                                                    lineNumber: 613,
                                                    columnNumber: 33
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/agm/budget/page.tsx",
                                            lineNumber: 605,
                                            columnNumber: 29
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/agm/budget/page.tsx",
                                    lineNumber: 603,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        display: 'flex',
                                        alignItems: 'flex-end',
                                        gap: 12,
                                        flexWrap: 'wrap'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Label, {
                                                    children: "Year"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/agm/budget/page.tsx",
                                                    lineNumber: 632,
                                                    columnNumber: 33
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
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
                                                        width: 120,
                                                        padding: '8px 10px',
                                                        borderRadius: 8,
                                                        border: '1px solid #e5e5e5',
                                                        background: '#fff'
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: "",
                                                            children: "All"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/agm/budget/page.tsx",
                                                            lineNumber: 650,
                                                            columnNumber: 37
                                                        }, this),
                                                        allYears.map((y)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: y,
                                                                children: y
                                                            }, y, false, {
                                                                fileName: "[project]/app/agm/budget/page.tsx",
                                                                lineNumber: 652,
                                                                columnNumber: 41
                                                            }, this))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/agm/budget/page.tsx",
                                                    lineNumber: 633,
                                                    columnNumber: 33
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/agm/budget/page.tsx",
                                            lineNumber: 631,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Label, {
                                                    children: "Quarter"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/agm/budget/page.tsx",
                                                    lineNumber: 660,
                                                    columnNumber: 33
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
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
                                                        width: 120,
                                                        padding: '8px 10px',
                                                        borderRadius: 8,
                                                        border: '1px solid #e5e5e5',
                                                        background: '#fff'
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: "",
                                                            children: "All"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/agm/budget/page.tsx",
                                                            lineNumber: 678,
                                                            columnNumber: 37
                                                        }, this),
                                                        allQuarters.map((q)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: q,
                                                                children: q
                                                            }, q, false, {
                                                                fileName: "[project]/app/agm/budget/page.tsx",
                                                                lineNumber: 680,
                                                                columnNumber: 41
                                                            }, this))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/agm/budget/page.tsx",
                                                    lineNumber: 661,
                                                    columnNumber: 33
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/agm/budget/page.tsx",
                                            lineNumber: 659,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Label, {
                                                    children: "Month"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/agm/budget/page.tsx",
                                                    lineNumber: 688,
                                                    columnNumber: 33
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
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
                                                        width: 120,
                                                        padding: '8px 10px',
                                                        borderRadius: 8,
                                                        border: '1px solid #e5e5e5',
                                                        background: '#fff'
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: "",
                                                            children: "All"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/agm/budget/page.tsx",
                                                            lineNumber: 706,
                                                            columnNumber: 37
                                                        }, this),
                                                        allMonths.map((m)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: m,
                                                                children: m
                                                            }, m, false, {
                                                                fileName: "[project]/app/agm/budget/page.tsx",
                                                                lineNumber: 708,
                                                                columnNumber: 41
                                                            }, this))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/agm/budget/page.tsx",
                                                    lineNumber: 689,
                                                    columnNumber: 33
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/agm/budget/page.tsx",
                                            lineNumber: 687,
                                            columnNumber: 29
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/agm/budget/page.tsx",
                                    lineNumber: 630,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/agm/budget/page.tsx",
                            lineNumber: 524,
                            columnNumber: 21
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/agm/budget/page.tsx",
                        lineNumber: 523,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/agm/budget/page.tsx",
                lineNumber: 476,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                id: "grid-wrapper",
                style: {
                    marginTop: -10
                },
                className: "jsx-a8a0ba75cb7ee073",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        id: "a8a0ba75cb7ee073",
                        children: "#grid-wrapper.jsx-a8a0ba75cb7ee073 .grid-toolbar.jsx-a8a0ba75cb7ee073{display:none!important}"
                    }, void 0, false, void 0, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$BudgetGrid$2e$tanstack$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        rows: rows,
                        filters: filters,
                        onFiltersChange: handleFiltersChange,
                        onUpdateAmount: (rowIndex, newValue)=>setRows((prev)=>{
                                if (rowIndex < 0 || rowIndex >= prev.length) return prev;
                                const next = prev.slice();
                                next[rowIndex] = {
                                    ...next[rowIndex],
                                    amount: newValue
                                };
                                return next;
                            }),
                        toolbarIds: [],
                        // SAFE: emitted by child after render; parent guards against pre-mount updates
                        onGroupingAfterRender: handleGroupingAfterRender
                    }, void 0, false, {
                        fileName: "[project]/app/agm/budget/page.tsx",
                        lineNumber: 727,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/agm/budget/page.tsx",
                lineNumber: 720,
                columnNumber: 13
            }, this),
            loading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    color: '#6b7a8a'
                },
                children: "Loading data…"
            }, void 0, false, {
                fileName: "[project]/app/agm/budget/page.tsx",
                lineNumber: 745,
                columnNumber: 25
            }, this),
            error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    color: 'crimson'
                },
                children: error
            }, void 0, false, {
                fileName: "[project]/app/agm/budget/page.tsx",
                lineNumber: 746,
                columnNumber: 23
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$AIInsightsPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                open: aiOpen,
                onClose: ()=>setAiOpen(false),
                rows: aiRows,
                filteredRows: aiFilteredRows,
                grouping: {
                    keys: groupingKeys
                },
                totals: aiTotals
            }, void 0, false, {
                fileName: "[project]/app/agm/budget/page.tsx",
                lineNumber: 749,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/agm/budget/page.tsx",
        lineNumber: 474,
        columnNumber: 9
    }, this);
}
_s1(AgmBudgetPage, "C9KphcpNW0dkVFf8o6JofZa945E=");
_c3 = AgmBudgetPage;
var _c, _c1, _c2, _c3;
__turbopack_context__.k.register(_c, "Label");
__turbopack_context__.k.register(_c1, "SmallCard");
__turbopack_context__.k.register(_c2, "MultiSelectGrouped");
__turbopack_context__.k.register(_c3, "AgmBudgetPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/node_modules/next/dist/compiled/client-only/index.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

}),
"[project]/node_modules/styled-jsx/dist/index/index.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
__turbopack_context__.r("[project]/node_modules/next/dist/compiled/client-only/index.js [app-client] (ecmascript)");
var React = __turbopack_context__.r("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
function _interopDefaultLegacy(e) {
    return e && typeof e === 'object' && 'default' in e ? e : {
        'default': e
    };
}
var React__default = /*#__PURE__*/ _interopDefaultLegacy(React);
/*
Based on Glamor's sheet
https://github.com/threepointone/glamor/blob/667b480d31b3721a905021b26e1290ce92ca2879/src/sheet.js
*/ function _defineProperties(target, props) {
    for(var i = 0; i < props.length; i++){
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}
function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
}
var isProd = typeof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"] !== "undefined" && __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env && ("TURBOPACK compile-time value", "development") === "production";
var isString = function(o) {
    return Object.prototype.toString.call(o) === "[object String]";
};
var StyleSheet = /*#__PURE__*/ function() {
    function StyleSheet(param) {
        var ref = param === void 0 ? {} : param, _name = ref.name, name = _name === void 0 ? "stylesheet" : _name, _optimizeForSpeed = ref.optimizeForSpeed, optimizeForSpeed = _optimizeForSpeed === void 0 ? isProd : _optimizeForSpeed;
        invariant$1(isString(name), "`name` must be a string");
        this._name = name;
        this._deletedRulePlaceholder = "#" + name + "-deleted-rule____{}";
        invariant$1(typeof optimizeForSpeed === "boolean", "`optimizeForSpeed` must be a boolean");
        this._optimizeForSpeed = optimizeForSpeed;
        this._serverSheet = undefined;
        this._tags = [];
        this._injected = false;
        this._rulesCount = 0;
        var node = typeof window !== "undefined" && document.querySelector('meta[property="csp-nonce"]');
        this._nonce = node ? node.getAttribute("content") : null;
    }
    var _proto = StyleSheet.prototype;
    _proto.setOptimizeForSpeed = function setOptimizeForSpeed(bool) {
        invariant$1(typeof bool === "boolean", "`setOptimizeForSpeed` accepts a boolean");
        invariant$1(this._rulesCount === 0, "optimizeForSpeed cannot be when rules have already been inserted");
        this.flush();
        this._optimizeForSpeed = bool;
        this.inject();
    };
    _proto.isOptimizeForSpeed = function isOptimizeForSpeed() {
        return this._optimizeForSpeed;
    };
    _proto.inject = function inject() {
        var _this = this;
        invariant$1(!this._injected, "sheet already injected");
        this._injected = true;
        if (typeof window !== "undefined" && this._optimizeForSpeed) {
            this._tags[0] = this.makeStyleTag(this._name);
            this._optimizeForSpeed = "insertRule" in this.getSheet();
            if (!this._optimizeForSpeed) {
                if ("TURBOPACK compile-time truthy", 1) {
                    console.warn("StyleSheet: optimizeForSpeed mode not supported falling back to standard mode.");
                }
                this.flush();
                this._injected = true;
            }
            return;
        }
        this._serverSheet = {
            cssRules: [],
            insertRule: function(rule, index) {
                if (typeof index === "number") {
                    _this._serverSheet.cssRules[index] = {
                        cssText: rule
                    };
                } else {
                    _this._serverSheet.cssRules.push({
                        cssText: rule
                    });
                }
                return index;
            },
            deleteRule: function(index) {
                _this._serverSheet.cssRules[index] = null;
            }
        };
    };
    _proto.getSheetForTag = function getSheetForTag(tag) {
        if (tag.sheet) {
            return tag.sheet;
        }
        // this weirdness brought to you by firefox
        for(var i = 0; i < document.styleSheets.length; i++){
            if (document.styleSheets[i].ownerNode === tag) {
                return document.styleSheets[i];
            }
        }
    };
    _proto.getSheet = function getSheet() {
        return this.getSheetForTag(this._tags[this._tags.length - 1]);
    };
    _proto.insertRule = function insertRule(rule, index) {
        invariant$1(isString(rule), "`insertRule` accepts only strings");
        if (typeof window === "undefined") {
            if (typeof index !== "number") {
                index = this._serverSheet.cssRules.length;
            }
            this._serverSheet.insertRule(rule, index);
            return this._rulesCount++;
        }
        if (this._optimizeForSpeed) {
            var sheet = this.getSheet();
            if (typeof index !== "number") {
                index = sheet.cssRules.length;
            }
            // this weirdness for perf, and chrome's weird bug
            // https://stackoverflow.com/questions/20007992/chrome-suddenly-stopped-accepting-insertrule
            try {
                sheet.insertRule(rule, index);
            } catch (error) {
                if ("TURBOPACK compile-time truthy", 1) {
                    console.warn("StyleSheet: illegal rule: \n\n" + rule + "\n\nSee https://stackoverflow.com/q/20007992 for more info");
                }
                return -1;
            }
        } else {
            var insertionPoint = this._tags[index];
            this._tags.push(this.makeStyleTag(this._name, rule, insertionPoint));
        }
        return this._rulesCount++;
    };
    _proto.replaceRule = function replaceRule(index, rule) {
        if (this._optimizeForSpeed || typeof window === "undefined") {
            var sheet = typeof window !== "undefined" ? this.getSheet() : this._serverSheet;
            if (!rule.trim()) {
                rule = this._deletedRulePlaceholder;
            }
            if (!sheet.cssRules[index]) {
                // @TBD Should we throw an error?
                return index;
            }
            sheet.deleteRule(index);
            try {
                sheet.insertRule(rule, index);
            } catch (error) {
                if ("TURBOPACK compile-time truthy", 1) {
                    console.warn("StyleSheet: illegal rule: \n\n" + rule + "\n\nSee https://stackoverflow.com/q/20007992 for more info");
                }
                // In order to preserve the indices we insert a deleteRulePlaceholder
                sheet.insertRule(this._deletedRulePlaceholder, index);
            }
        } else {
            var tag = this._tags[index];
            invariant$1(tag, "old rule at index `" + index + "` not found");
            tag.textContent = rule;
        }
        return index;
    };
    _proto.deleteRule = function deleteRule(index) {
        if (typeof window === "undefined") {
            this._serverSheet.deleteRule(index);
            return;
        }
        if (this._optimizeForSpeed) {
            this.replaceRule(index, "");
        } else {
            var tag = this._tags[index];
            invariant$1(tag, "rule at index `" + index + "` not found");
            tag.parentNode.removeChild(tag);
            this._tags[index] = null;
        }
    };
    _proto.flush = function flush() {
        this._injected = false;
        this._rulesCount = 0;
        if (typeof window !== "undefined") {
            this._tags.forEach(function(tag) {
                return tag && tag.parentNode.removeChild(tag);
            });
            this._tags = [];
        } else {
            // simpler on server
            this._serverSheet.cssRules = [];
        }
    };
    _proto.cssRules = function cssRules() {
        var _this = this;
        if (typeof window === "undefined") {
            return this._serverSheet.cssRules;
        }
        return this._tags.reduce(function(rules, tag) {
            if (tag) {
                rules = rules.concat(Array.prototype.map.call(_this.getSheetForTag(tag).cssRules, function(rule) {
                    return rule.cssText === _this._deletedRulePlaceholder ? null : rule;
                }));
            } else {
                rules.push(null);
            }
            return rules;
        }, []);
    };
    _proto.makeStyleTag = function makeStyleTag(name, cssString, relativeToTag) {
        if (cssString) {
            invariant$1(isString(cssString), "makeStyleTag accepts only strings as second parameter");
        }
        var tag = document.createElement("style");
        if (this._nonce) tag.setAttribute("nonce", this._nonce);
        tag.type = "text/css";
        tag.setAttribute("data-" + name, "");
        if (cssString) {
            tag.appendChild(document.createTextNode(cssString));
        }
        var head = document.head || document.getElementsByTagName("head")[0];
        if (relativeToTag) {
            head.insertBefore(tag, relativeToTag);
        } else {
            head.appendChild(tag);
        }
        return tag;
    };
    _createClass(StyleSheet, [
        {
            key: "length",
            get: function get() {
                return this._rulesCount;
            }
        }
    ]);
    return StyleSheet;
}();
function invariant$1(condition, message) {
    if (!condition) {
        throw new Error("StyleSheet: " + message + ".");
    }
}
function hash(str) {
    var _$hash = 5381, i = str.length;
    while(i){
        _$hash = _$hash * 33 ^ str.charCodeAt(--i);
    }
    /* JavaScript does bitwise operations (like XOR, above) on 32-bit signed
   * integers. Since we want the results to be always positive, convert the
   * signed int to an unsigned by doing an unsigned bitshift. */ return _$hash >>> 0;
}
var stringHash = hash;
var sanitize = function(rule) {
    return rule.replace(/\/style/gi, "\\/style");
};
var cache = {};
/**
 * computeId
 *
 * Compute and memoize a jsx id from a basedId and optionally props.
 */ function computeId(baseId, props) {
    if (!props) {
        return "jsx-" + baseId;
    }
    var propsToString = String(props);
    var key = baseId + propsToString;
    if (!cache[key]) {
        cache[key] = "jsx-" + stringHash(baseId + "-" + propsToString);
    }
    return cache[key];
}
/**
 * computeSelector
 *
 * Compute and memoize dynamic selectors.
 */ function computeSelector(id, css) {
    var selectoPlaceholderRegexp = /__jsx-style-dynamic-selector/g;
    // Sanitize SSR-ed CSS.
    // Client side code doesn't need to be sanitized since we use
    // document.createTextNode (dev) and the CSSOM api sheet.insertRule (prod).
    if (typeof window === "undefined") {
        css = sanitize(css);
    }
    var idcss = id + css;
    if (!cache[idcss]) {
        cache[idcss] = css.replace(selectoPlaceholderRegexp, id);
    }
    return cache[idcss];
}
function mapRulesToStyle(cssRules, options) {
    if (options === void 0) options = {};
    return cssRules.map(function(args) {
        var id = args[0];
        var css = args[1];
        return /*#__PURE__*/ React__default["default"].createElement("style", {
            id: "__" + id,
            // Avoid warnings upon render with a key
            key: "__" + id,
            nonce: options.nonce ? options.nonce : undefined,
            dangerouslySetInnerHTML: {
                __html: css
            }
        });
    });
}
var StyleSheetRegistry = /*#__PURE__*/ function() {
    function StyleSheetRegistry(param) {
        var ref = param === void 0 ? {} : param, _styleSheet = ref.styleSheet, styleSheet = _styleSheet === void 0 ? null : _styleSheet, _optimizeForSpeed = ref.optimizeForSpeed, optimizeForSpeed = _optimizeForSpeed === void 0 ? false : _optimizeForSpeed;
        this._sheet = styleSheet || new StyleSheet({
            name: "styled-jsx",
            optimizeForSpeed: optimizeForSpeed
        });
        this._sheet.inject();
        if (styleSheet && typeof optimizeForSpeed === "boolean") {
            this._sheet.setOptimizeForSpeed(optimizeForSpeed);
            this._optimizeForSpeed = this._sheet.isOptimizeForSpeed();
        }
        this._fromServer = undefined;
        this._indices = {};
        this._instancesCounts = {};
    }
    var _proto = StyleSheetRegistry.prototype;
    _proto.add = function add(props) {
        var _this = this;
        if (undefined === this._optimizeForSpeed) {
            this._optimizeForSpeed = Array.isArray(props.children);
            this._sheet.setOptimizeForSpeed(this._optimizeForSpeed);
            this._optimizeForSpeed = this._sheet.isOptimizeForSpeed();
        }
        if (typeof window !== "undefined" && !this._fromServer) {
            this._fromServer = this.selectFromServer();
            this._instancesCounts = Object.keys(this._fromServer).reduce(function(acc, tagName) {
                acc[tagName] = 0;
                return acc;
            }, {});
        }
        var ref = this.getIdAndRules(props), styleId = ref.styleId, rules = ref.rules;
        // Deduping: just increase the instances count.
        if (styleId in this._instancesCounts) {
            this._instancesCounts[styleId] += 1;
            return;
        }
        var indices = rules.map(function(rule) {
            return _this._sheet.insertRule(rule);
        }) // Filter out invalid rules
        .filter(function(index) {
            return index !== -1;
        });
        this._indices[styleId] = indices;
        this._instancesCounts[styleId] = 1;
    };
    _proto.remove = function remove(props) {
        var _this = this;
        var styleId = this.getIdAndRules(props).styleId;
        invariant(styleId in this._instancesCounts, "styleId: `" + styleId + "` not found");
        this._instancesCounts[styleId] -= 1;
        if (this._instancesCounts[styleId] < 1) {
            var tagFromServer = this._fromServer && this._fromServer[styleId];
            if (tagFromServer) {
                tagFromServer.parentNode.removeChild(tagFromServer);
                delete this._fromServer[styleId];
            } else {
                this._indices[styleId].forEach(function(index) {
                    return _this._sheet.deleteRule(index);
                });
                delete this._indices[styleId];
            }
            delete this._instancesCounts[styleId];
        }
    };
    _proto.update = function update(props, nextProps) {
        this.add(nextProps);
        this.remove(props);
    };
    _proto.flush = function flush() {
        this._sheet.flush();
        this._sheet.inject();
        this._fromServer = undefined;
        this._indices = {};
        this._instancesCounts = {};
    };
    _proto.cssRules = function cssRules() {
        var _this = this;
        var fromServer = this._fromServer ? Object.keys(this._fromServer).map(function(styleId) {
            return [
                styleId,
                _this._fromServer[styleId]
            ];
        }) : [];
        var cssRules = this._sheet.cssRules();
        return fromServer.concat(Object.keys(this._indices).map(function(styleId) {
            return [
                styleId,
                _this._indices[styleId].map(function(index) {
                    return cssRules[index].cssText;
                }).join(_this._optimizeForSpeed ? "" : "\n")
            ];
        }) // filter out empty rules
        .filter(function(rule) {
            return Boolean(rule[1]);
        }));
    };
    _proto.styles = function styles(options) {
        return mapRulesToStyle(this.cssRules(), options);
    };
    _proto.getIdAndRules = function getIdAndRules(props) {
        var css = props.children, dynamic = props.dynamic, id = props.id;
        if (dynamic) {
            var styleId = computeId(id, dynamic);
            return {
                styleId: styleId,
                rules: Array.isArray(css) ? css.map(function(rule) {
                    return computeSelector(styleId, rule);
                }) : [
                    computeSelector(styleId, css)
                ]
            };
        }
        return {
            styleId: computeId(id),
            rules: Array.isArray(css) ? css : [
                css
            ]
        };
    };
    /**
   * selectFromServer
   *
   * Collects style tags from the document with id __jsx-XXX
   */ _proto.selectFromServer = function selectFromServer() {
        var elements = Array.prototype.slice.call(document.querySelectorAll('[id^="__jsx-"]'));
        return elements.reduce(function(acc, element) {
            var id = element.id.slice(2);
            acc[id] = element;
            return acc;
        }, {});
    };
    return StyleSheetRegistry;
}();
function invariant(condition, message) {
    if (!condition) {
        throw new Error("StyleSheetRegistry: " + message + ".");
    }
}
var StyleSheetContext = /*#__PURE__*/ React.createContext(null);
StyleSheetContext.displayName = "StyleSheetContext";
function createStyleRegistry() {
    return new StyleSheetRegistry();
}
function StyleRegistry(param) {
    var configuredRegistry = param.registry, children = param.children;
    var rootRegistry = React.useContext(StyleSheetContext);
    var ref = React.useState({
        "StyleRegistry.useState[ref]": function() {
            return rootRegistry || configuredRegistry || createStyleRegistry();
        }
    }["StyleRegistry.useState[ref]"]), registry = ref[0];
    return /*#__PURE__*/ React__default["default"].createElement(StyleSheetContext.Provider, {
        value: registry
    }, children);
}
function useStyleRegistry() {
    return React.useContext(StyleSheetContext);
}
// Opt-into the new `useInsertionEffect` API in React 18, fallback to `useLayoutEffect`.
// https://github.com/reactwg/react-18/discussions/110
var useInsertionEffect = React__default["default"].useInsertionEffect || React__default["default"].useLayoutEffect;
var defaultRegistry = typeof window !== "undefined" ? createStyleRegistry() : undefined;
function JSXStyle(props) {
    var registry = defaultRegistry ? defaultRegistry : useStyleRegistry();
    // If `registry` does not exist, we do nothing here.
    if (!registry) {
        return null;
    }
    if (typeof window === "undefined") {
        registry.add(props);
        return null;
    }
    useInsertionEffect({
        "JSXStyle.useInsertionEffect": function() {
            registry.add(props);
            return ({
                "JSXStyle.useInsertionEffect": function() {
                    registry.remove(props);
                }
            })["JSXStyle.useInsertionEffect"];
        // props.children can be string[], will be striped since id is identical
        }
    }["JSXStyle.useInsertionEffect"], [
        props.id,
        String(props.dynamic)
    ]);
    return null;
}
JSXStyle.dynamic = function(info) {
    return info.map(function(tagInfo) {
        var baseId = tagInfo[0];
        var props = tagInfo[1];
        return computeId(baseId, props);
    }).join(" ");
};
exports.StyleRegistry = StyleRegistry;
exports.createStyleRegistry = createStyleRegistry;
exports.style = JSXStyle;
exports.useStyleRegistry = useStyleRegistry;
}),
"[project]/node_modules/styled-jsx/style.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

module.exports = __turbopack_context__.r("[project]/node_modules/styled-jsx/dist/index/index.js [app-client] (ecmascript)").style;
}),
]);

//# sourceMappingURL=_1d09005a._.js.map