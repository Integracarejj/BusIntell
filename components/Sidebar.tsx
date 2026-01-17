
// components/Sidebar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const nav = [
    { label: "Overview", href: "/" },
    { label: "Budget", href: "/agm/budget" },
    { label: "Forecast", href: "/agm/forecast" },
    { label: "Rollups", href: "/agm/rollups" },
    { label: "Insights", href: "/agm/insights" },
];

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="flex h-full w-64 flex-col border-r border-slate-200 bg-slate-950/95 text-slate-100">
            <div className="px-4 pb-2 pt-4 text-lg font-semibold tracking-tight">
                Budget Intelligence
            </div>

            <nav className="flex-1 px-2 py-2">
                {nav.map((item) => {
                    const active =
                        item.href === "/"
                            ? pathname === "/"
                            : pathname.startsWith(item.href);
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={clsx(
                                "mb-1 block rounded-md px-3 py-2 text-sm transition",
                                "focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500",
                                active
                                    ? "bg-white/10 text-white"
                                    : "text-slate-300 hover:bg-white/5 hover:text-white"
                            )}
                        >
                            {item.label}
                        </Link>
                    );
                })}
            </nav>

            {/* Role toggle area placeholder remains; we can wire it next */}
            <div className="border-t border-white/10 p-3 text-xs text-slate-400">
                Role toggle here
            </div>
        </aside>
    );
}
