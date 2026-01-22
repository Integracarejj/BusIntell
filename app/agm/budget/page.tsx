
// app/agm/budget/page.tsx
'use client';

import * as React from 'react';
import type { ColumnFiltersState } from '@tanstack/react-table';
import BudgetGrid from '../../../components/BudgetGrid.tanstack';
import {
    BudgetRow,
    deriveYear,
    deriveQuarterLabel,
    deriveMonthLabel,
    mapBudgetType,
} from '../../../components/grid/columns';

/* ============================================================================
   DATA LOADER (PUBLIC -> served at /budgetLines.json)
   - Enforce exact path
   - No fallbacks
   - Clear surfaced errors
   ============================================================================ */
const DATA_URL = '/budgetLines.json' as const;

async function loadRows(): Promise<BudgetRow[]> {
    const res = await fetch(DATA_URL, { cache: 'no-store' });
    if (!res.ok) throw new Error(`Failed to load ${DATA_URL} (HTTP ${res.status})`);
    const json = await res.json();
    if (!Array.isArray(json)) throw new Error(`Unexpected JSON shape from ${DATA_URL}`);
    return json as BudgetRow[];
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
   GROUPED MULTI-SELECT (Option C)
   - Renders a button + popover with grouped checkboxes
   - Controlled via Set<string> of selected items
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
    const containerRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        function onDocClick(e: MouseEvent) {
            if (!containerRef.current) return;
            if (!containerRef.current.contains(e.target as Node)) setOpen(false);
        }
        document.addEventListener('mousedown', onDocClick);
        return () => document.removeEventListener('mousedown', onDocClick);
    }, []);

    const summary = React.useMemo(() => {
        const count = selected.size;
        if (count === 0) return placeholder;
        if (count <= 2) return Array.from(selected).join(', ');
        return `${count} selected`;
    }, [selected, placeholder]);

    const toggleItem = (item: string) => {
        const next = new Set(selected);
        if (next.has(item)) next.delete(item);
        else next.add(item);
        onChange(next);
    };

    const toggleGroup = (items: string[]) => {
        const allSelected = items.every((i) => selected.has(i));
        const next = new Set(selected);
        if (allSelected) items.forEach((i) => next.delete(i));
        else items.forEach((i) => next.add(i));
        onChange(next);
    };

    return (
        <div ref={containerRef} style={{ position: 'relative', width }}>
            <button
                type="button"
                onClick={() => setOpen((v) => !v)}
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
                        width: 'max(260px, 100%)',
                        maxHeight: 320,
                        overflow: 'auto',
                        background: '#fff',
                        border: '1px solid #e5e5e5',
                        borderRadius: 8,
                        boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
                        padding: 10,
                    }}
                >
                    {groups.map(({ group, items }) => {
                        const allInGroupSelected = items.every((i) => selected.has(i));
                        const anyInGroupSelected = items.some((i) => selected.has(i));
                        return (
                            <div key={group} style={{ paddingBottom: 10, marginBottom: 10, borderBottom: '1px solid #f0f3f6' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                                    <input
                                        type="checkbox"
                                        checked={allInGroupSelected}
                                        ref={(el) => {
                                            if (el) el.indeterminate = !allInGroupSelected && anyInGroupSelected;
                                        }}
                                        onChange={() => toggleGroup(items)}
                                        id={`grp-${group}`}
                                    />
                                    <label htmlFor={`grp-${group}`} style={{ fontWeight: 700, fontSize: 12, color: '#334155' }}>
                                        {group}
                                    </label>
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4 }}>
                                    {items.map((item) => (
                                        <label key={item} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13 }}>
                                            <input type="checkbox" checked={selected.has(item)} onChange={() => toggleItem(item)} /> {item}
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
                        .map((r) => r.subCategory)
                        .filter(Boolean)
                )
            ).sort(),
        [rows]
    );

    // Expense-like: group subcategories under their categories (Labor/Operations/Marketing/CapEx)
    const expenseGroups = React.useMemo(() => {
        const map = new Map<string, Set<string>>();
        rows.forEach((r) => {
            const t = mapBudgetType(r.type);
            if (t === 'Expense' || t === 'CapEx') {
                const group = String(r.category || '').trim() || (t === 'CapEx' ? 'CapEx' : 'Expense');
                if (!map.has(group)) map.set(group, new Set<string>());
                if (r.subCategory) map.get(group)!.add(r.subCategory);
            }
        });
        return Array.from(map.entries())
            .map(([group, set]) => ({ group, items: Array.from(set).sort() }))
            .sort((a, b) => a.group.localeCompare(b.group));
    }, [rows]);

    const revenueGroups: GroupedOptions = React.useMemo(
        () => (revenueSubcats.length ? [{ group: 'Revenue', items: revenueSubcats.filter((s): s is string => s !== undefined) }] : []),
        [revenueSubcats]
    );

    /* --------------------------------------------------------------------------
       FILTERING PIPELINE FOR CARDS + TOTALS (respects Community/Year/Qtr/Month)
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
       CATEGORY TOTAL SELECTORS — grouped multi-select (Option C)
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
       PAGE LAYOUT
       -------------------------------------------------------------------------- */
    const CATEGORY_WIDTH = 420; // width of category dropdowns
    const RIGHT_PANEL_MAX = 540; // max width of right-hand column
    const COMPACT = 120; // compact width for Year/Quarter/Month

    return (
        <main style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 14 }}>
            {/* ROW 1: Community (left) | RIGHT PANEL (Revenue totals row moved up) */}
            <section
                style={{
                    display: 'grid',
                    gridTemplateColumns: '280px 1fr',
                    columnGap: 220,
                    alignItems: 'center',
                    marginBottom: 6,
                }}
            >
                {/* Community */}
                <div>
                    <Label>Community</Label>
                    <select
                        value={selected.community}
                        onChange={(e) =>
                            setFilters((prev) => {
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
                </div>

                {/* RIGHT COLUMN — Revenue Category Totals (grouped multi-select) */}
                <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                    <div
                        style={{
                            width: '100%',
                            maxWidth: RIGHT_PANEL_MAX,
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 18,
                            marginTop: -4, // subtle lift
                        }}
                    >
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
                    </div>
                </div>
            </section>

            {/* ROW 2: KPI Cards (left) | Expense totals + Y/Q/M row (right) */}
            <section
                style={{
                    display: 'grid',
                    gridTemplateColumns: '280px 1fr',
                    columnGap: 220,
                    alignItems: 'start',
                }}
            >
                {/* KPI Cards lifted closer under Community */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: -6 }}>
                    <SmallCard title="TOTAL REVENUE" value={fmt(totals.rev)} />
                    <SmallCard title="TOTAL EXPENSE" value={fmt(totals.exp)} />
                    <SmallCard title="NET" value={fmt(totals.net)} />
                </div>

                {/* Right column contents */}
                <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                    <div
                        style={{
                            width: '100%',
                            maxWidth: RIGHT_PANEL_MAX,
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 18,
                            marginTop: -10,
                        }}
                    >
                        {/* Expense Category Totals — grouped multi-select by category groups */}
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

                        {/* Year / Quarter / Month (compact row) */}
                        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 12, flexWrap: 'wrap' }}>
                            <div>
                                <Label>Year</Label>
                                <select
                                    value={String(selected.year || '')}
                                    onChange={(e) =>
                                        setFilters((f) => {
                                            const next = f.filter((x) => x.id !== 'year');
                                            if (e.target.value) next.push({ id: 'year', value: Number(e.target.value) });
                                            return next;
                                        })
                                    }
                                    style={{
                                        width: COMPACT,
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
                                        setFilters((f) => {
                                            const next = f.filter((x) => x.id !== 'quarter');
                                            if (e.target.value) next.push({ id: 'quarter', value: e.target.value });
                                            return next;
                                        })
                                    }
                                    style={{
                                        width: COMPACT,
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
                                        setFilters((f) => {
                                            const next = f.filter((x) => x.id !== 'month');
                                            if (e.target.value) next.push({ id: 'month', value: e.target.value });
                                            return next;
                                        })
                                    }
                                    style={{
                                        width: COMPACT,
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

            {/* GRID (toolbar row hidden; keep component intact for future grouping UI) */}
            <div id="grid-wrapper" style={{ marginTop: -10 }}>
                <style jsx>{`
          #grid-wrapper .grid-toolbar {
            display: none !important;
          }
        `}</style>

                <BudgetGrid
                    rows={rows}
                    filters={filters}
                    onFiltersChange={setFilters}
                    onUpdateAmount={(rowIndex, newValue) =>
                        setRows((prev) => {
                            if (rowIndex < 0 || rowIndex >= prev.length) return prev;
                            const next = prev.slice();
                            next[rowIndex] = { ...next[rowIndex], amount: newValue };
                            return next;
                        })
                    }
                    toolbarIds={[]} // nothing rendered; toolbar hidden by CSS anyway
                />
            </div>

            {loading && <div style={{ color: '#6b7a8a' }}>Loading data…</div>}
            {error && <div style={{ color: 'crimson' }}>{error}</div>}
        </main>
    );
}

