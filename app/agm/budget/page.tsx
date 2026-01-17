
// app/agm/budget/page.tsx
export default function AgmBudgetPage() {
    return (
        <div className="space-y-3">
            <h1 className="text-xl font-semibold text-slate-900">Budget</h1>
            <p className="text-sm text-slate-600">
                Editable grid for monthly/annual amounts. (Scaffold)
            </p>
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <p className="text-sm text-slate-600">
                    Plug in <code>BudgetGrid</code> and <code>Header</code> here when
                    data mocks are ready.
                </p>
            </div>
        </div>
    );
}
