
'use client';

import * as React from 'react';
import type { ColumnFiltersState } from '@tanstack/react-table';
import BudgetGrid from '../../../components/BudgetGrid.tanstack';
import AIInsightsPanel from '../../../components/AIInsightsPanel';
import type { BudgetRow as AIBudgetRow, Totals as AITotals } from '../../../components/ai/types';
import {
    BudgetRow,
    deriveYear,
    deriveQuarterLabel,
    deriveMonthLabel,
    mapBudgetType,
} from '../../../components/grid/columns';

/* ============================================================================
   DATA LOADER (PUBLIC -> served at /budgetLines.json)
   ============================================================================ */
const DATA_URL = '/budgetLines.json' as const;

async function loadRows(): Promise<BudgetRow[]> {
    const res = await fetch(DATA_URL, { cache: 'no-store' });
    if (!res.ok) throw new Error(`Failed to load ${DATA_URL} (HTTP ${res.status})`);

    const json: unknown = await res.json();
    if (!Array.isArray(json)) {
        throw new Error(`Unexpected JSON shape from ${DATA_URL}`);
    }

    return json.map((r): BudgetRow => ({
        ...r,
        community: String((r as any).community ?? ''),
        category: String((r as any).category ?? ''),
        subCategory: String((r as any).subCategory ?? ''), // normalize
        period: String((r as any).period ?? ''),
        type: String((r as any).type ?? ''),
        amount: Number((r as any).amount ?? 0),
    }));
}

/* ============================================================================
   Tiny UI helpers
   ============================================================================ */
const Label = ({ children }: { children: React.ReactNode }) => (
    <div style={{ fontSize: 12, color: '#6b7a8a', fontWeight: 600, marginBottom: 4 }}>{children}</div>
);

const SmallCard = ({ title, value }: { title: string; value: string }) => (
    <div
        style={{
            background: '#fff',
            border: '1px solid #e9eef1',
            borderRadius: 10,
            padding: '10px 12px',
            display: 'flex',
            flexDirection: 'column',
            gap: 4,
            minHeight: 64,
        }}
    >
        <div style={{ fontSize: 11, color: '#7a8a99' }}>{title}</div>
        <div style={{ fontSize: 22, fontWeight: 600 }}>{value}</div>
    </div>
);

/* ============================================================================
   GROUPED MULTI-SELECT (Option C) — safe for Next.js hydration
   ============================================================================ */
type GroupedOptions = Array<{ group: string; items: string[] }>;

function MultiSelectGrouped({
    placeholder,
    groups,
    selected,
    onChange,
    width,
}: {
    placeholder: string;
    groups: GroupedOptions;
    selected: Set<string>;
    onChange: (next: Set<string>) => void;
    width: number;
}) {
    const [open, setOpen] = React.useState(false);
    const containerRef = React.useRef<HTMLDivElement | null>(null);

    const toggleItem = React.useCallback(
        (item: string) => {
            const next = new Set(selected);
            next.has(item) ? next.delete(item) : next.add(item);
            onChange(next);
        },
        [selected, onChange]
    );

    const toggleGroup = React.useCallback(
        (items: string[]) => {
            const next = new Set(selected);
            const allSelected = items.every((i) => next.has(i));
            if (allSelected) items.forEach((i) => next.delete(i));
            else items.forEach((i) => next.add(i));
            onChange(next);
        },
        [selected, onChange]
    );

    React.useEffect(() => {
        if (!open) return;
        const handle = (e: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener('mousedown', handle);
        return () => document.removeEventListener('mousedown', handle);
    }, [open]);

    const summary = React.useMemo(() => {
        const count = selected.size;
        if (count === 0) return placeholder;
        if (count <= 2) return Array.from(selected).join(', ');
        return `${count} selected`;
    }, [selected, placeholder]);

    return (
        <div ref={containerRef} style={{ position: 'relative', width }}>
            <button
                type="button"
                onClick={() => setOpen((o) => !o)}
                style={{
                    width: '100%',
                    padding: '8px 10px',
                    borderRadius: 8,
                    border: '1px solid #e5e5e5',
                    background: '#fff',
                    textAlign: 'left',
                }}
                aria-haspopup="listbox"
                aria-expanded={open}
            >
                {summary}
            </button>

            {open && (
                <div
                    role="listbox"
                    style={{
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
                        padding: 10,
                    }}
                >
                    {groups.map(({ group, items }) => {
                        const allSelected = items.every((i) => selected.has(i));
                        const someSelected = items.some((i) => selected.has(i));
                        return (
                            <div
                                key={group}
                                style={{ paddingBottom: 10, marginBottom: 10, borderBottom: '1px solid #f0f3f6' }}
                            >
                                <label style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                                    <input
                                        type="checkbox"
                                        checked={allSelected}
                                        ref={(el) => {
                                            if (el) el.indeterminate = !allSelected && someSelected;
                                        }}
                                        onChange={() => toggleGroup(items)}
                                    />
                                    <span style={{ fontWeight: 700, fontSize: 12, color: '#334155' }}>{group}</span>
                                </label>

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4 }}>
                                    {items.map((item) => (
                                        <label key={item} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13 }}>
                                            <input type="checkbox" checked={selected.has(item)} onChange={() => toggleItem(item)} />
                                            {item}
                                        </label>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

/* ============================================================================
   PAGE COMPONENT
   ============================================================================ */
export default function AgmBudgetPage() {
    const [rows, setRows] = React.useState<BudgetRow[]>([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState<string | null>(null);

    React.useEffect(() => {
        let alive = true;
        (async () => {
            try {
                const data = await loadRows();
                if (!alive) return;
                setRows(data);
                if (data.length === 0) setError('No data found at /budgetLines.json');
            } catch (err: any) {
                if (!alive) return;
                setError(err?.message || 'Failed to load /budgetLines.json');
            } finally {
                if (alive) setLoading(false);
            }
        })();
        return () => {
            alive = false;
        };
    }, []);

    /* --------------------------------------------------------------------------
       SHARED FILTER STATE (for Community / Year / Quarter / Month)
       -------------------------------------------------------------------------- */
    const [filters, setFilters] = React.useState<ColumnFiltersState>([]);
    const get = (id: string) => filters.find((f) => f.id === id)?.value ?? '';
    const selected = {
        community: get('community') as string,
        year: (get('year') as number) || '',
        quarter: get('quarter') as string,
        month: get('month') as string,
        budgetType: get('budgetType') as string,
        category: get('category') as string,
    };

    /* --------------------------------------------------------------------------
       OPTIONS (derived from data)
       -------------------------------------------------------------------------- */
    const allCommunities = React.useMemo(
        () => Array.from(new Set(rows.map((r) => r.community).filter(Boolean))).sort(),
        [rows]
    );
    const allYears = React.useMemo(
        () => Array.from(new Set(rows.map((r) => deriveYear(r.period)).filter(Boolean))).sort() as number[],
        [rows]
    );
    const allQuarters = React.useMemo(
        () => Array.from(new Set(rows.map((r) => deriveQuarterLabel(r.period)).filter(Boolean))).sort(),
        [rows]
    );
    const allMonths = React.useMemo(
        () => Array.from(new Set(rows.map((r) => deriveMonthLabel(r.period)).filter(Boolean))).sort(),
        [rows]
    );

    // Revenue subcategories (for the Revenue totals picker)
    const revenueSubcats = React.useMemo(
        () =>
            Array.from(
                new Set(
                    rows
                        .filter((r) => mapBudgetType(r.type) === 'Revenue')
                        .map((r) => (typeof r.subCategory === 'string' ? r.subCategory : ''))
                        .filter((s) => s.length > 0)
                )
            ).sort(),
        [rows]
    );

    // EXPENSE GROUPING — Hybrid (A): use dash prefix if present, else use category (C)
    const expenseGroups = React.useMemo<GroupedOptions>(() => {
        const map = new Map<string, Set<string>>();

        for (const r of rows) {
            const t = mapBudgetType(r.type);
            if (t === 'Expense' || t === 'CapEx') {
                const sub = typeof r.subCategory === 'string' ? r.subCategory.trim() : '';
                if (!sub) continue;

                const dashIdx = sub.indexOf('-');
                const byPrefix = dashIdx > 0 ? sub.slice(0, dashIdx).trim() : '';
                const fallbackCat = String(r.category ?? '').trim() || (t === 'CapEx' ? 'CapEx' : 'Expense');

                const group = byPrefix || fallbackCat;

                if (!map.has(group)) map.set(group, new Set<string>());
                map.get(group)!.add(sub);
            }
        }

        return Array.from(map.entries())
            .map(([group, set]) => ({ group, items: Array.from(set) }))
            .sort((a, b) => a.group.localeCompare(b.group));
    }, [rows]);

    const revenueGroups: GroupedOptions = React.useMemo(
        () => (revenueSubcats.length ? [{ group: 'Revenue', items: revenueSubcats }] : []),
        [revenueSubcats]
    );

    /* --------------------------------------------------------------------------
       FILTERED ROWS for cards & totals (respects Community/Year/Qtr/Month)
       -------------------------------------------------------------------------- */
    const filteredRows = React.useMemo(() => {
        return rows.filter((r) => {
            if (selected.community && r.community !== selected.community) return false;
            const y = deriveYear(r.period);
            if (selected.year && y !== selected.year) return false;
            const q = deriveQuarterLabel(r.period);
            if (selected.quarter && q !== selected.quarter) return false;
            const m = deriveMonthLabel(r.period);
            if (selected.month && m !== selected.month) return false;
            const bt = mapBudgetType(r.type);
            if (selected.budgetType && bt !== selected.budgetType) return false;
            if (selected.category && r.category !== selected.category) return false;
            return true;
        });
    }, [rows, selected]);

    /* --------------------------------------------------------------------------
       KPI CARDS (Revenue, Expense, Net)
       -------------------------------------------------------------------------- */
    const totals = React.useMemo(() => {
        let rev = 0,
            exp = 0;
        for (const r of filteredRows) {
            const amt = Number(r.amount ?? 0);
            const bt = mapBudgetType(r.type);
            if (bt === 'Revenue') rev += amt;
            else if (bt === 'Expense' || bt === 'CapEx') exp += amt;
        }
        return { rev, exp, net: rev - exp };
    }, [filteredRows]);

    const fmt = (n: number) =>
        Intl.NumberFormat(undefined, {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: 0,
        }).format(n || 0);

    /* --------------------------------------------------------------------------
       CATEGORY TOTAL SELECTORS — grouped multi-select
       -------------------------------------------------------------------------- */
    const [revSel, setRevSel] = React.useState<Set<string>>(new Set());
    const [expSel, setExpSel] = React.useState<Set<string>>(new Set());

    const revCatTotal = React.useMemo(() => {
        if (!revSel.size) return 0;
        return filteredRows
            .filter((r) => mapBudgetType(r.type) === 'Revenue' && revSel.has(String(r.subCategory)))
            .reduce((sum, r) => sum + Number(r.amount ?? 0), 0);
    }, [filteredRows, revSel]);

    const expCatTotal = React.useMemo(() => {
        if (!expSel.size) return 0;
        return filteredRows
            .filter((r) => {
                const t = mapBudgetType(r.type);
                return (t === 'Expense' || t === 'CapEx') && expSel.has(String(r.subCategory));
            })
            .reduce((sum, r) => sum + Number(r.amount ?? 0), 0);
    }, [filteredRows, expSel]);

    /* --------------------------------------------------------------------------
       AI: state + totals in required shape + STRICT-MODE SAFE grouping
       -------------------------------------------------------------------------- */
    const [aiOpen, setAiOpen] = React.useState(false);
    const [groupingKeys, setGroupingKeys] = React.useState<string[]>([]);

    // Normalize rows for AI types: ensure shapes match AIBudgetRow exactly
    const aiRows = React.useMemo<AIBudgetRow[]>(
        () =>
            rows.map((r) => ({
                community: String(r.community ?? ''),
                category: String(r.category ?? ''),
                subCategory: typeof r.subCategory === 'string' ? r.subCategory : '',
                budgetMethod: (r as any).budgetMethod ?? undefined,
                driver: (r as any).driver ?? undefined,
                driverTag: (r as any).driverTag ?? undefined,
                glCode: (r as any).glCode ?? null, // AI type allows null
                period: String(r.period ?? ''),
                type: String(r.type ?? ''),
                amount: (r as any).amount ?? 0, // normalize to number for AI
            })),
        [rows]
    );

    const aiFilteredRows = React.useMemo<AIBudgetRow[]>(
        () =>
            filteredRows.map((r) => ({
                community: String(r.community ?? ''),
                category: String(r.category ?? ''),
                subCategory: typeof r.subCategory === 'string' ? r.subCategory : '',
                budgetMethod: (r as any).budgetMethod ?? undefined,
                driver: (r as any).driver ?? undefined,
                driverTag: (r as any).driverTag ?? undefined,
                glCode: (r as any).glCode ?? null,
                period: String(r.period ?? ''),
                type: String(r.type ?? ''),
                amount: (r as any).amount ?? 0,
            })),
        [filteredRows]
    );

    // Build AI totals with correct shape
    const aiTotals: AITotals = React.useMemo(() => {
        const byCategory = new Map<string, number>();
        const byCommunity = new Map<string, number>();
        let revenue = 0;
        let expense = 0;

        for (const r of filteredRows) {
            const amt = Number(r.amount ?? 0);
            const bt = mapBudgetType(r.type);
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
            byCommunity: Object.fromEntries(byCommunity),
        };
    }, [filteredRows]);

    // --- SAFETY: Only allow setState after the page has mounted ---
    // Use layout effect to ensure the guard is set before child effects fire
    const mountedRef = React.useRef(false);
    React.useLayoutEffect(() => {
        mountedRef.current = true;
        return () => {
            mountedRef.current = false;
        };
    }, []);

    const handleGroupingAfterRender = React.useCallback((keys: string[]) => {
        if (!mountedRef.current) return;

        requestAnimationFrame(() => {
            if (mountedRef.current) {
                setGroupingKeys(keys);
            }
        });
    }, []);

    // Guarded, setState-compatible signature to match BudgetGrid's expectation
    const handleFiltersChange = React.useCallback(
        (updater: ColumnFiltersState | ((old: ColumnFiltersState) => ColumnFiltersState)) => {
            if (!mountedRef.current) return;
            setFilters((prev) => (typeof updater === 'function' ? (updater as any)(prev) : updater));
        },
        []
    );

    const CATEGORY_WIDTH = 420;
    const RIGHT_PANEL_MAX = 540;
    const COMPACT = 120;

    return (
        <main style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 6 }}>
            {/* ROW 1: Community | Right column (AI button + Revenue/Expense totals + Y/Q/M) */}
            <section
                style={{
                    display: 'grid',
                    gridTemplateColumns: '280px 1fr',
                    columnGap: 220,
                    alignItems: 'start',
                    marginBottom: 6,
                }}
            >
                {/* LEFT: Community + KPI cards */}
                <div>
                    <Label>Community</Label>
                    <select
                        value={selected.community}
                        onChange={(e) =>
                            setFilters((prev: ColumnFiltersState) => {
                                const v = e.target.value || '';
                                const next = prev.filter((f) => f.id !== 'community');
                                if (v) next.push({ id: 'community', value: v });
                                return next;
                            })
                        }
                        style={{
                            width: '100%',
                            padding: '8px 10px',
                            borderRadius: 8,
                            border: '1px solid #e5e5e5',
                            background: '#fff',
                        }}
                    >
                        <option value="">All</option>
                        {allCommunities.map((c) => (
                            <option key={c} value={c}>
                                {c}
                            </option>
                        ))}
                    </select>

                    {/* KPI Cards */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 0 }}>
                        <SmallCard title="TOTAL REVENUE" value={fmt(totals.rev)} />
                        <SmallCard title="TOTAL EXPENSE" value={fmt(totals.exp)} />
                        <SmallCard title="NET" value={fmt(totals.net)} />
                    </div>
                </div>

                {/* RIGHT: AI button (pinned), category totals, and Y/Q/M */}
                <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                    <div
                        style={{
                            width: '100%',
                            maxWidth: RIGHT_PANEL_MAX,
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 18,
                            marginTop: 0,
                            position: 'relative', // pin AI button relative to this container
                            paddingTop: 32, // space for the pinned button
                        }}
                    >
                        {/* AI button pinned to far-right */}
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'flex-end',
                                width: '100%',
                                position: 'absolute',
                                top: 0,
                                right: 0,
                                paddingRight: 8,
                                paddingTop: 4,
                            }}
                        >
                            <button
                                type="button"
                                onClick={() => setAiOpen((v) => !v)}
                                aria-pressed={aiOpen}
                                aria-label="Open AI insights"
                                title="Open AI insights"
                                style={{
                                    appearance: 'none',
                                    border: '1px solid #e5e7eb',
                                    background: aiOpen ? '#111827' : '#fff',
                                    color: aiOpen ? '#fff' : '#111827',
                                    borderRadius: 8,
                                    padding: '6px 10px',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: 8,
                                    cursor: 'pointer',
                                }}
                            >
                                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path d="M5 3l1.5 3.5L10 8l-3.5 1.5L5 13l-1.5-3.5L0 8l3.5-1.5L5 3zm11 2l2 5 5 2-5 2-2 5-2-5-5-2 5-2 2-5z" />
                                </svg>
                                <span style={{ fontSize: 14, fontWeight: 600 }}>AI</span>
                            </button>
                        </div>

                        {/* Revenue Category Totals */}
                        <div>
                            <Label>Revenue Category Totals</Label>
                            <div style={{ display: 'grid', gridTemplateColumns: 'auto 120px', gap: 12 }}>
                                <MultiSelectGrouped
                                    placeholder="Pick category"
                                    groups={revenueGroups}
                                    selected={revSel}
                                    onChange={setRevSel}
                                    width={CATEGORY_WIDTH}
                                />
                                <div
                                    style={{
                                        border: '1px solid #e5e5e5',
                                        borderRadius: 8,
                                        padding: '8px 10px',
                                        textAlign: 'right',
                                        background: '#fff',
                                        fontWeight: 600,
                                        width: 120,
                                    }}
                                >
                                    {fmt(revCatTotal)}
                                </div>
                            </div>
                        </div>

                        {/* Expense Category Totals */}
                        <div>
                            <Label>Expense Category Totals</Label>
                            <div style={{ display: 'grid', gridTemplateColumns: 'auto 120px', gap: 12 }}>
                                <MultiSelectGrouped
                                    placeholder="Pick category"
                                    groups={expenseGroups}
                                    selected={expSel}
                                    onChange={setExpSel}
                                    width={CATEGORY_WIDTH}
                                />
                                <div
                                    style={{
                                        border: '1px solid #e5e5e5',
                                        borderRadius: 8,
                                        padding: '8px 10px',
                                        textAlign: 'right',
                                        background: '#fff',
                                        fontWeight: 600,
                                        width: 120,
                                    }}
                                >
                                    {fmt(expCatTotal)}
                                </div>
                            </div>
                        </div>

                        {/* Year / Quarter / Month */}
                        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 12, flexWrap: 'wrap' }}>
                            <div>
                                <Label>Year</Label>
                                <select
                                    value={String(selected.year || '')}
                                    onChange={(e) =>
                                        setFilters((f: ColumnFiltersState) => {
                                            const next = f.filter((x) => x.id !== 'year');
                                            if (e.target.value) next.push({ id: 'year', value: Number(e.target.value) });
                                            return next;
                                        })
                                    }
                                    style={{
                                        width: 120,
                                        padding: '8px 10px',
                                        borderRadius: 8,
                                        border: '1px solid #e5e5e5',
                                        background: '#fff',
                                    }}
                                >
                                    <option value="">All</option>
                                    {allYears.map((y) => (
                                        <option key={y} value={y}>
                                            {y}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <Label>Quarter</Label>
                                <select
                                    value={selected.quarter}
                                    onChange={(e) =>
                                        setFilters((f: ColumnFiltersState) => {
                                            const next = f.filter((x) => x.id !== 'quarter');
                                            if (e.target.value) next.push({ id: 'quarter', value: e.target.value });
                                            return next;
                                        })
                                    }
                                    style={{
                                        width: 120,
                                        padding: '8px 10px',
                                        borderRadius: 8,
                                        border: '1px solid #e5e5e5',
                                        background: '#fff',
                                    }}
                                >
                                    <option value="">All</option>
                                    {allQuarters.map((q) => (
                                        <option key={q} value={q}>
                                            {q}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <Label>Month</Label>
                                <select
                                    value={selected.month}
                                    onChange={(e) =>
                                        setFilters((f: ColumnFiltersState) => {
                                            const next = f.filter((x) => x.id !== 'month');
                                            if (e.target.value) next.push({ id: 'month', value: e.target.value });
                                            return next;
                                        })
                                    }
                                    style={{
                                        width: 120,
                                        padding: '8px 10px',
                                        borderRadius: 8,
                                        border: '1px solid #e5e5e5',
                                        background: '#fff',
                                    }}
                                >
                                    <option value="">All</option>
                                    {allMonths.map((m) => (
                                        <option key={m} value={m}>
                                            {m}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* GRID (toolbar row hidden via CSS to keep space for future icons) */}
            <div id="grid-wrapper" style={{ marginTop: -10 }}>
                <style jsx>{`
          #grid-wrapper .grid-toolbar {
            display: none !important;
          }
        `}</style>

                <BudgetGrid
                    rows={rows}
                    filters={filters}
                    onFiltersChange={handleFiltersChange}
                    onUpdateAmount={(rowIndex: number, newValue: number) =>
                        setRows((prev) => {
                            if (rowIndex < 0 || rowIndex >= prev.length) return prev;
                            const next = prev.slice();
                            next[rowIndex] = { ...next[rowIndex], amount: newValue };
                            return next;
                        })
                    }
                    toolbarIds={[]}
                    // SAFE: emitted by child after render; parent guards against pre-mount updates
                    onGroupingAfterRender={handleGroupingAfterRender}
                />
            </div>

            {loading && <div style={{ color: '#6b7a8a' }}>Loading data…</div>}
            {error && <div style={{ color: 'crimson' }}>{error}</div>}

            {/* AI Drawer (540px) — non-blocking, hydration-safe */}
            <AIInsightsPanel
                open={aiOpen}
                onClose={() => setAiOpen(false)}
                rows={aiRows}
                filteredRows={aiFilteredRows}
                grouping={{ keys: groupingKeys }}
                totals={aiTotals}
            />
        </main>
    );
}
