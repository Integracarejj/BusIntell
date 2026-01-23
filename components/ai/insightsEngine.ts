
// /components/ai/insightsEngine.ts
// Non-UI "engine": accepts data, returns structured insight objects.
// Mocked for now, designed to be replaced with real analytics or LLM calls.

import type { InsightsInput, Insight, BudgetRow } from './types';

function fmtCurrency(n: number): string {
    const v = Number.isFinite(n) ? n : 0;
    return v.toLocaleString(undefined, {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}

function safeSum(rows: BudgetRow[]): number {
    return rows.reduce((acc, r) => acc + (typeof r.amount === 'number' ? r.amount : 0), 0);
}

function topCategories(input: InsightsInput, limit = 3): Array<{ category: string; value: number }> {
    const byCat = new Map<string, number>();
    for (const r of input.filteredRows) {
        if (!r.category) continue;
        const val = typeof r.amount === 'number' ? r.amount : 0;
        byCat.set(r.category, (byCat.get(r.category) ?? 0) + val);
    }
    return [...byCat.entries()]
        .map(([category, value]) => ({ category, value }))
        .sort((a, b) => Math.abs(b.value) - Math.abs(a.value))
        .slice(0, limit);
}

function guessYOY(input: InsightsInput): { delta: number; pct: number } | null {
    // Heuristic YOY using period strings (YYYY-MM). If period not present, returns null.
    const byYear = new Map<number, number>();
    for (const r of input.filteredRows) {
        let yr: number | undefined = r.year;
        if (!yr && r.period && /^\d{4}-\d{2}$/.test(r.period)) {
            yr = Number(r.period.slice(0, 4));
        }
        if (!yr) continue;
        const amt = typeof r.amount === 'number' ? r.amount : 0;
        byYear.set(yr, (byYear.get(yr) ?? 0) + amt);
    }
    if (byYear.size < 2) return null;
    const years = [...byYear.keys()].sort();
    const latest = years[years.length - 1];
    const prev = years[years.length - 2];
    const curVal = byYear.get(latest) ?? 0;
    const prevVal = byYear.get(prev) ?? 0;
    const delta = curVal - prevVal;
    const pct = prevVal !== 0 ? delta / prevVal : 0;
    return { delta, pct };
}

export async function generateInsights(input: InsightsInput): Promise<Insight[]> {
    // Respect cancellation
    if (input.signal?.aborted) return [];

    // Keep it non-blocking: tiny delay simulates async work without blocking UI
    await new Promise<void>((resolve, reject) => {
        const t = setTimeout(resolve, 10);
        input.signal?.addEventListener('abort', () => {
            clearTimeout(t);
            reject(new DOMException('Aborted', 'AbortError'));
        });
    });

    const insights: Insight[] = [];

    // 1) KPI narrative
    insights.push({
        id: 'kpi-1',
        type: 'kpi_narrative',
        title: 'KPI overview',
        description: `Revenue ${fmtCurrency(input.totals.revenue)}, Expense ${fmtCurrency(
            input.totals.expense
        )}, Net ${fmtCurrency(input.totals.net)}.`,
        severity: 'info',
        // format highlights as strings; no extra "USD" unit needed
        highlights: [
            { label: 'Revenue', value: fmtCurrency(input.totals.revenue) },
            { label: 'Expense', value: fmtCurrency(input.totals.expense) },
            { label: 'Net', value: fmtCurrency(input.totals.net) }
        ]
    });

    // 2) Top categories by absolute value in-current filter context
    const top3 = topCategories(input, 3);
    if (top3.length) {
        insights.push({
            id: 'top-cat',
            type: 'trend',
            title: 'Top categories by spend/revenue (filtered scope)',
            description: top3
                .map((c, i) => `${i + 1}. ${c.category}: ${fmtCurrency(c.value)}`)
                .join(' · '),
            severity: 'info',
            highlights: top3.map((c) => ({ label: c.category, value: fmtCurrency(c.value) }))
        });
    }

    // 3) Simple outlier (row-level) — largest absolute single line in the filter
    const largest = [...input.filteredRows]
        .filter((r) => typeof r.amount === 'number')
        .sort((a, b) => Math.abs((b.amount ?? 0)) - Math.abs((a.amount ?? 0)))[0];
    if (largest && typeof largest.amount === 'number') {
        insights.push({
            id: 'outlier-1',
            type: 'outlier',
            title: 'Largest single line item',
            description: `${largest.community ?? '—'} · ${largest.category ?? '—'}${largest.subCategory ? ` – ${largest.subCategory}` : ''
                }: ${fmtCurrency(largest.amount)}`,
            severity: 'warning',
            context: { community: largest.community, category: largest.category, subCategory: largest.subCategory },
            highlights: [{ label: 'Amount', value: fmtCurrency(largest.amount) }]
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
                { label: 'Δ (absolute)', value: fmtCurrency(yoy.delta) },
                { label: 'Δ (percent)', value: `${(yoy.pct * 100).toFixed(1)}%` }
            ]
        });
    }

    // 5) Recommendation (stub)
    const totalFiltered = safeSum(input.filteredRows);
    insights.push({
        id: 'rec-1',
        type: 'recommendation',
        title: 'Quick follow-up',
        description:
            totalFiltered < 0
                ? 'Consider reviewing expense categories with the steepest QOQ growth for potential reductions.'
                : 'Consider spotlighting top-performing revenue categories for this quarter in the AGM review.',
        severity: 'info'
    });

    return insights;
}
