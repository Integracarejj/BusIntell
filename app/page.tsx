export default function Page() {
    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-800">
                Budget Intelligence Prototype
            </h2>

            <p className="text-gray-600 max-w-2xl">
                Use the role toggle in the sidebar to switch between AGM and
                Executive perspectives. This dashboard will surface insights,
                rollups, and forecasts tailored to each role.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {["Spend Overview", "Variance Alerts", "Forecast Summary"].map(
                    (card) => (
                        <div
                            key={card}
                            className="rounded-lg bg-white p-6 shadow-sm border border-gray-200"
                        >
                            <h3 className="font-medium text-gray-800">{card}</h3>
                            <p className="mt-2 text-sm text-gray-600">
                                Placeholder content for upcoming metrics and visuals.
                            </p>
                        </div>
                    )
                )}
            </div>
        </div>
    );
}
