// app/executive/page.tsx
import React from "react";

export default function ExecLanding() {
    return (
        <div className="space-y-6">
            {/* Portfolio Table Placeholder */}
            <div className="bg-white shadow rounded p-4">
                <h2 className="text-gray-700 font-semibold mb-2">Portfolio</h2>
                <table className="w-full table-auto text-left">
                    <thead>
                        <tr>
                            {["Community", "Revenue", "Expense", "NOI", "Margin"].map((col) => (
                                <th key={col} className="px-2 py-1 border-b text-gray-500">{col}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="px-2 py-1">Clearfield</td>
                            <td className="px-2 py-1">$12M</td>
                            <td className="px-2 py-1">$10M</td>
                            <td className="px-2 py-1">$2M</td>
                            <td className="px-2 py-1">16%</td>
                        </tr>
                        <tr>
                            <td className="px-2 py-1">Oak Ridge</td>
                            <td className="px-2 py-1">$10M</td>
                            <td className="px-2 py-1">$9M</td>
                            <td className="px-2 py-1">$1M</td>
                            <td className="px-2 py-1">10%</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {/* Insights Placeholder */}
            <div className="bg-white shadow rounded p-4">
                <h2 className="text-gray-700 font-semibold mb-2">AI Insights</h2>
                <p className="text-gray-600">NOI declined $1M vs budget due to utilities and labor costs.</p>
            </div>
        </div>
    );
}
