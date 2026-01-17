
// app/agm/forecast/page.tsx
export default function AgmForecastPage() {
    return (
        <div className="space-y-3">
            <h1 className="text-xl font-semibold text-slate-900">Forecast</h1>
            <p className="text-sm text-slate-600">
                Workspace for what-if and adjustments. (Scaffold)
            </p>
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <p className="text-sm text-slate-600">
                    Hook up sliders and inline AI tips as you define the model.
                </p>
            </div>
        </div>
    );
}
