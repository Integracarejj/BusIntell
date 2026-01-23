
// /components/AIInsightsPanel.tsx
'use client';

import React from 'react';
import { generateInsights } from './ai/insightsEngine';
import type { Insight, InsightsInput } from './ai/types';

export interface AIInsightsPanelProps extends InsightsInput {
    open: boolean;
    onClose: () => void;
    // Optional: title override
    title?: string;
}

/**
 * Right-side drawer (540px) that never blocks initial page render.
 * Safe for React 18 Strict Mode + Next.js hydration.
 */
export default function AIInsightsPanel(props: AIInsightsPanelProps) {
    const { open, onClose, title = 'AI Insights', ...input } = props;

    const [loading, setLoading] = React.useState<boolean>(false);
    const [insights, setInsights] = React.useState<Insight[]>([]);
    const [error, setError] = React.useState<string | null>(null);

    // Generate insights when panel opens or inputs change
    React.useEffect(() => {
        if (!open) return;

        const controller = new AbortController();
        setLoading(true);
        setError(null);

        generateInsights({ ...input, signal: controller.signal })
            .then((res) => {
                setInsights(res);
                setLoading(false);
            })
            .catch((err) => {
                if (err?.name === 'AbortError') return; // silent on abort
                setError(err?.message ?? 'Failed to generate insights.');
                setLoading(false);
            });

        return () => controller.abort();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open, input.rows, input.filteredRows, JSON.stringify(input.grouping), JSON.stringify(input.totals)]);

    // A11y: close on Escape
    React.useEffect(() => {
        if (!open) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [open, onClose]);

    return (
        <>
            {/* Overlay */}
            <div
                aria-hidden={!open}
                onClick={onClose}
                style={{
                    position: 'fixed',
                    inset: 0,
                    background: open ? 'rgba(0,0,0,0.35)' : 'transparent',
                    opacity: open ? 1 : 0,
                    pointerEvents: open ? 'auto' : 'none',
                    transition: 'opacity 150ms ease',
                    zIndex: 50
                }}
            />
            {/* Drawer */}
            <aside
                role="dialog"
                aria-modal="true"
                aria-label={title}
                style={{
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
                }}
            >
                {/* Header */}
                <div
                    style={{
                        padding: '16px 20px',
                        borderBottom: '1px solid #e5e7eb',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}
                >
                    <h2 style={{ fontSize: 18, fontWeight: 600, margin: 0 }}>{title}</h2>
                    <button
                        type="button"
                        aria-label="Close insights"
                        onClick={onClose}
                        style={{
                            appearance: 'none',
                            border: 0,
                            background: 'transparent',
                            cursor: 'pointer',
                            padding: 8,
                            borderRadius: 8
                        }}
                    >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path d="M18 6L6 18M6 6l12 12" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                    </button>
                </div>

                {/* Body */}
                <div style={{ padding: 16, overflow: 'auto' }}>
                    {loading && (
                        <div style={{ color: '#6b7280', fontSize: 14 }}>Generating insights…</div>
                    )}
                    {error && (
                        <div style={{ color: '#b91c1c', fontSize: 14 }}>Error: {error}</div>
                    )}
                    {!loading && !error && insights.length === 0 && (
                        <div style={{ color: '#6b7280', fontSize: 14 }}>No insights to display yet.</div>
                    )}
                    {!loading &&
                        !error &&
                        insights.map((ins) => (
                            <article
                                key={ins.id}
                                style={{
                                    border: '1px solid #e5e7eb',
                                    borderRadius: 8,
                                    padding: 12,
                                    marginBottom: 12
                                }}
                            >
                                <header style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <Badge type={ins.type} />
                                    <h3 style={{ fontSize: 15, fontWeight: 600, margin: 0 }}>{ins.title}</h3>
                                </header>
                                <p style={{ fontSize: 14, color: '#374151', marginTop: 8, marginBottom: 8 }}>
                                    {ins.description}
                                </p>
                                {ins.highlights?.length ? (
                                    <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13, color: '#111827' }}>
                                        {ins.highlights.map((h, i) => (
                                            <li key={i}>
                                                <strong>{h.label}:</strong> {String(h.value)} {h.unit ?? ''}
                                            </li>
                                        ))}
                                    </ul>
                                ) : null}
                            </article>
                        ))}
                </div>
            </aside>
        </>
    );
}

function Badge({ type }: { type: string }) {
    const map: Record<string, { bg: string; fg: string; label: string }> = {
        kpi_narrative: { bg: '#EEF2FF', fg: '#3730A3', label: 'KPI' },
        trend: { bg: '#ECFEFF', fg: '#155E75', label: 'Trend' },
        variance: { bg: '#FEF3C7', fg: '#92400E', label: 'Variance' },
        peer_comparison: { bg: '#F5F3FF', fg: '#6D28D9', label: 'Peer' },
        outlier: { bg: '#FEE2E2', fg: '#991B1B', label: 'Outlier' },
        recommendation: { bg: '#E0F2FE', fg: '#075985', label: 'Rec' }
    };
    const { bg, fg, label } = map[type] ?? { bg: '#F3F4F6', fg: '#374151', label: type };
    return (
        <span
            style={{
                background: bg,
                color: fg,
                fontSize: 12,
                fontWeight: 600,
                borderRadius: 999,
                padding: '2px 8px'
            }}
        >
            {label}
        </span>
    );
}
``
