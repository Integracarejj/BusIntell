
// components/Sidebar.tsx
"use client";

import { useState } from "react";
import ToggleRole from "./ToggleRole";

type Role = "AGM" | "Executive";

export default function Sidebar() {
    const [role, setRole] = useState<Role>("AGM");

    const agmLinks = ["Overview", "Budget", "Forecast", "Rollups", "Insights"];
    const execLinks = ["Portfolio", "Variance", "Trends", "Insights"];
    const links = role === "Executive" ? execLinks : agmLinks;

    return (
        <aside className="w-64 bg-slate-900 text-slate-100 flex flex-col">
            {/* Logo / Title */}
            <div className="px-6 py-4 text-xl font-semibold border-b border-slate-700">
                Budget Intelligence
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 py-6 space-y-2">
                {links.map((item) => (
                    <a
                        key={item}
                        href="#"
                        className="block rounded-md px-3 py-2 text-sm hover:bg-slate-800 transition"
                    >
                        {item}
                    </a>
                ))}
            </nav>

            {/* Role Toggle */}
            <div className="px-4 py-4 border-t border-slate-700">
                <ToggleRole role={role} setRole={setRole} />
            </div>
        </aside>
    );
}
