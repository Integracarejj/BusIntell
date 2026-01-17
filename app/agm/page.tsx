// app/agm/page.tsx
import React from "react";

export default function AGMLanding() {
    return (
        <div className="space-y-6">
            <div className="grid grid-cols-3 gap-6">
                {/* At-a-Glance Metrics */}
                {["Total Revenue", "Total Expense", "NOI"].map((metric) => (
                    <div key={metric} className="bg-white shadow rounded p-4">
                        <h2 className="text-gray-500 text-sm">{metric}</h2>
                        <p className="text-2xl font-bold">$0</p>
                    </div>
                ))}
            </div>

            {/* Quick Actions */}
            <div className="bg-white shadow rounded p-4">
                <h2 className="text-gray-700 font-semibold mb-2">Quick Actions</h2>
                <div className="space-x-2">
                    {["Adjust Budget", "Create Forecast", "Explain Variance"].map((action) => (
                        <button
                            key={action}
                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                            {action}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
