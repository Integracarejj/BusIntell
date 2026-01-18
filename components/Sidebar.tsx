
// components/Sidebar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const nav = [
    { label: "Overview", href: "/" },
    { label: "Budget", href: "/agm/budget" },
    { label: "Forecast", href: "/agm/forecast" },
    { label: "Rollups", href: "/agm/rollups" },
    { label: "Insights", href: "/agm/insights" },
];

export default function Sidebar() {
    const pathname = usePathname();
    const [expanded, setExpanded] = useState(false); // collapsed by default
    const toggle = () => setExpanded((e) => !e);

    const baseItem =
        "mb-1 block rounded-md px-3 py-2 text-sm transition focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500";
    const on = "bg-white/10 text-white";
    const off = "text-slate-300 hover:bg-white/5 hover:text-white";

    return (
        <aside
            className={[
                "group relative flex h-full flex-col border-r border-slate-200 bg-slate-950/95 text-slate-100",
                "transition-[width] duration-200",
                expanded ? "w-64" : "w-16",
            ].join(" ")}
        >
            {/* Handle to expand/collapse */}
            <button
                onClick={toggle}
                aria-label={expanded ? "Collapse sidebar" : "Expand sidebar"}
                aria-expanded={expanded}
                className="absolute -right-3 top-16 z-10 rounded-full bg-white p-1.5 text-slate-600 shadow ring-1 ring-slate-200 hover:text-indigo-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
            >
                {/* chevron-left (rotates when collapsed) */}
                <svg
                    viewBox="0 0 20 20"
                    fill="none"
                    className={`h-4 w-4 transition-transform ${expanded ? "" : "rotate-180"}`}
                    aria-hidden="true"
                >
                    <path
                        d="M12.5 4l-5 6 5 6"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </button>

            {/* Brand/title (hidden when collapsed) */}
            <div
                className={[
                    "px-3 pb-2 pt-4 text-lg font-semibold tracking-tight",
                    "transition-opacity duration-150",
                    expanded ? "opacity-100" : "opacity-0",
                ].join(" ")}
                aria-hidden={!expanded}
            >
                Budget Intelligence
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-2 py-2">
                {nav.map((item) => {
                    const active =
                        item.href === "/"
                            ? pathname === "/"
                            : pathname.startsWith(item.href);

                    // When collapsed, show first letter as a badge + tooltip via title
                    const collapsedLabel = item.label.slice(0, 1);

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`${baseItem} ${active ? on : off} ${expanded ? "" : "px-2 text-center"
                                }`}
                            title={!expanded ? item.label : undefined}
                        >
                            {expanded ? item.label : collapsedLabel}
                        </Link>
                    );
                })}
            </nav>

            {/* Role toggle area */}
            <div className="border-t border-white/10 p-3">
                {expanded ? <RoleToggle /> : <RoleBadge />}
            </div>
        </aside>
    );
}

function RoleToggle() {
    const [role, setRole] = useState<"AGM" | "Executive">("AGM");
    return (
        <div className="flex items-center justify-between gap-3">
            <span className="text-xs font-medium text-slate-300">Role</span>
            <select
                className="rounded border border-white/10 bg-slate-900/60 px-2 py-1 text-xs text-slate-100 shadow-sm outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                value={role}
                onChange={(e) => setRole(e.target.value as "AGM" | "Executive")}
            >
                <option value="AGM">AGM</option>
                <option value="Executive">Executive</option>
            </select>
        </div>
    );
}

function RoleBadge() {
    // Same source of truth as RoleToggle; for now just "AGM" visual until we wire shared state.
    const role: "AGM" | "Executive" = "AGM";
    const abbr = role === "AGM" ? "AGM" : "EX";
    return (
        <span className="block text-center text-[10px] font-semibold text-slate-300">
            {abbr}
        </span>
    );
}
