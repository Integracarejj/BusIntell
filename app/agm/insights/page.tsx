
// app/agm/insights/page.tsx
export default function AgmInsightsPage() {
    return (
        <div className="space-y-3">
            <h1 className="text-xl font-semibold text-slate-900">Insights</h1>
            <p className="text-sm text-slate-600">
                Narrative+visuals for AGM attention and actions. (Scaffold)
            </p>
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <p className="text-sm text-slate-600">
                    Later: use <code>InsightCard</code> with mocked AI output from{' '}
                    <code>lib/ai.ts</code>.
                </p>
            </div>
        </div>
    );
}
