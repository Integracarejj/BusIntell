
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

/**
 * ======== Sticky Home + Handle Placement (easy to tweak) ========
 * These are viewport-fixed so they never drift as the sidebar expands/collapses.
 * Adjust the constants to nudge positioning without touching layout code.
 */
export const HOME_TOP_CLASS = "top-2";
export const HOME_LEFT_CLASS = "left-2";
// Place the handle *under* the home icon, aligned to the same left edge:
export const HANDLE_TOP_CLASS = "top-14";
export const HANDLE_LEFT_CLASS = "left-2";

// Visual sizes
const HOME_ICON_SIZE = "h-8 w-8";  // Home icon size
const HANDLE_SIZE = "h-7 w-7";     // Smaller so it fits nicely inside collapsed rail

/** Simple class joiner (no extra deps) */
function cx(...classes: Array<string | false | null | undefined>) {
    return classes.filter(Boolean).join(" ");
}

/** Inline SVG icons (no extra deps) */
function IconGrid({ className }: { className?: string }) {
    return (
        <svg viewBox="0 0 20 20" fill="currentColor" className={className} aria-hidden="true">
            <path d="M3 3h6v6H3V3zm8 0h6v6h-6V3zM3 11h6v6H3v-6zm8 0h6v6h-6v-6z" />
        </svg>
    );
}
function IconTable({ className }: { className?: string }) {
    return (
        <svg viewBox="0 0 20 20" fill="currentColor" className={className} aria-hidden="true">
            <path d="M3 4a2 2 0 012-2h10a2 2 0 012 2v2H3V4zm0 4h16v3H3V8zm0 5h16v1a2 2 0 01-2 2H5a2 2 0 01-2-2v-1z" />
        </svg>
    );
}
function IconTrendUp({ className }: { className?: string }) {
    return (
        <svg viewBox="0 0 20 20" fill="currentColor" className={className} aria-hidden="true">
            <path d="M3 14a1 1 0 100 2h14a1 1 0 100-2H3zm2.293-5.707a1 1 0 011.414 0L9 10.586l3.293-3.293A1 1 0 0113 7h3a1 1 0 110 2h-2.586l-3.707 3.707a1 1 0 01-1.414 0L6 9.414l-.293.293a1 1 0 11-1.414-1.414z" />
        </svg>
    );
}
function IconLayers({ className }: { className?: string }) {
    return (
        <svg viewBox="0 0 20 20" fill="currentColor" className={className} aria-hidden="true">
            <path d="M10 2l8 4-8 4-8-4 8-4zm-6.928 8.629L10 14l6.928-3.371A1 1 0 0017 9.764l-7 3.4-7-3.4a1 1 0 00-.928 1.865zM3.072 13.63L10 17l6.928-3.371a1 1 0 10-.928-1.865L10 14.8l-6-3a1 1 0 10-.928 1.829z" />
        </svg>
    );
}
function IconLightbulb({ className }: { className?: string }) {
    return (
        <svg viewBox="0 0 20 20" fill="currentColor" className={className} aria-hidden="true">
            <path d="M10 2a6 6 0 00-3.75 10.68c.42.33.75.97.75 1.57V15a1 1 0 001 1h4a1 1 0 001-1v-.75c0-.6.33-1.24.75-1.57A6 6 0 0010 2zm-2 14a1 1 0 100 2h4a1 1 0 100-2H8z" />
        </svg>
    );
}

/** Nav model */
const NAV_ITEMS = [
    { label: "Overview", href: "/", icon: IconGrid },
    { label: "Budget", href: "/agm/budget", icon: IconTable },
    { label: "Forecast", href: "/agm/forecast", icon: IconTrendUp },
    { label: "Rollups", href: "/agm/rollups", icon: IconLayers },
    { label: "Insights", href: "/agm/insights", icon: IconLightbulb }, // role toggle lives just below
] as const;

type Role = "AGM" | "Executive";

export default function Sidebar() {
    const pathname = usePathname();

    // Collapsed by default (persisted)
    const [collapsed, setCollapsed] = useState<boolean>(true);

    // Single, app-wide role (persisted)
    const [role, setRole] = useState<Role>("AGM");

    // ---- hydrate from localStorage ----
    useEffect(() => {
        try {
            const savedCollapsed = localStorage.getItem("bi.sidebar.collapsed");
            if (savedCollapsed !== null) setCollapsed(savedCollapsed === "true");
            const savedRole = localStorage.getItem("bi.role");
            if (savedRole === "Executive" || savedRole === "AGM") setRole(savedRole);
        } catch { }
    }, []);

    // ---- persist ----
    useEffect(() => {
        try {
            localStorage.setItem("bi.sidebar.collapsed", String(collapsed));
        } catch { }
    }, [collapsed]);

    useEffect(() => {
        try {
            localStorage.setItem("bi.role", role);
            window.dispatchEvent(new CustomEvent("bi:roleChanged", { detail: { role } }));
        } catch { }
    }, [role]);

    const collapseAria = useMemo(
        () => (collapsed ? "Expand sidebar" : "Collapse sidebar"),
        [collapsed]
    );

    // Wider collapsed rail so controls sit *inside* it
    const railWidthCollapsed = "w-20";

    return (
        <>
            {/* ======= Sticky HOME button (top-left, above teal header) ======= */}
            <div className={cx("fixed z-50", HOME_TOP_CLASS, HOME_LEFT_CLASS, "pointer-events-auto")}>
                <Link
                    href="/"
                    aria-label="Go home"
                    className={cx(
                        "inline-flex items-center justify-center rounded-md bg-white",
                        "shadow ring-1 ring-slate-200 hover:bg-slate-50",
                        "focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2",
                        "transition-colors"
                    )}
                >
                    {/* PNG asset from /public */}
                    <img
                        src="/money-management.png"
                        alt=""
                        width={32}
                        height={32}
                        className={HOME_ICON_SIZE}
                        draggable={false}
                    />
                </Link>
            </div>

            {/* ======= Sticky collapse/expand handle (under home, inside rail) ======= */}
            <div className={cx("fixed z-50", HANDLE_TOP_CLASS, HANDLE_LEFT_CLASS, "pointer-events-auto")}>
                <button
                    type="button"
                    aria-label={collapseAria}
                    onClick={() => setCollapsed((c) => !c)}
                    className={cx(
                        "inline-flex items-center justify-center rounded-md bg-white",
                        `${HANDLE_SIZE} shadow ring-1 ring-slate-200 hover:bg-slate-50`,
                        "focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2",
                        "transition-colors"
                    )}
                >
                    <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className="h-4 w-4 text-slate-700">
                        {collapsed ? (
                            // "Expand" → point right
                            <path
                                fillRule="evenodd"
                                d="M7.22 4.22a.75.75 0 011.06 0l5 5a.75.75 0 010 1.06l-5 5a.75.75 0 01-1.06-1.06L11.44 10 7.22 5.28a.75.75 0 010-1.06z"
                                clipRule="evenodd"
                            />
                        ) : (
                            // "Collapse" → point left
                            <path
                                fillRule="evenodd"
                                d="M12.78 15.78a.75.75 0 01-1.06 0l-5-5a.75.75 0 010-1.06l5-5a.75.75 0 111.06 1.06L8.56 10l4.22 4.22a.75.75 0 010 1.06z"
                                clipRule="evenodd"
                            />
                        )}
                    </svg>
                </button>
            </div>

            {/* ======= Sidebar rail ======= */}
            <aside
                className={cx(
                    "relative z-40 h-full border-r border-slate-200 bg-white",
                    "transition-[width] duration-200 ease-in-out",
                    collapsed ? railWidthCollapsed : "w-64"
                )}
                aria-label="Primary"
            >
                {/* Extra top padding so fixed buttons don't overlap; extra bottom padding to clear any bottom overlays */}
                <nav className="flex h-full flex-col overflow-y-auto pt-24 pb-28">
                    <ul className="px-2">
                        {NAV_ITEMS.map((item) => {
                            const active =
                                item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
                            const Icon = item.icon;
                            return (
                                <li key={item.href} className="my-1">
                                    <Link
                                        href={item.href}
                                        className={cx(
                                            "group flex items-center rounded-md px-2 py-2 text-sm font-medium",
                                            "focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2",
                                            active
                                                ? "bg-teal-600 text-white"
                                                : "text-slate-700 hover:bg-slate-100"
                                        )}
                                        aria-current={active ? "page" : undefined}
                                    >
                                        {/* Icon shows in both states; label hides when collapsed */}
                                        <Icon
                                            className={cx(
                                                "h-5 w-5 shrink-0",
                                                active ? "text-white" : "text-slate-500 group-hover:text-slate-700"
                                            )}
                                        />
                                        <span className={cx("ml-3", collapsed && "sr-only")}>{item.label}</span>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>

                    {/* === Single Role Toggle (only here) === */}
                    <div className="mt-auto px-2 pt-4">
                        {collapsed ? (
                            <button
                                type="button"
                                aria-label={
                                    role === "AGM"
                                        ? "Current role AGM. Activate to switch to Executive."
                                        : "Current role Executive. Activate to switch to AGM."
                                }
                                title={`Role: ${role}`}
                                onClick={() => setRole((r) => (r === "AGM" ? "Executive" : "AGM"))}
                                className={cx(
                                    "w-full rounded-md px-2 py-2 text-xs font-semibold",
                                    "bg-slate-100 text-slate-800 hover:bg-slate-200",
                                    "focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2",
                                    "relative z-40"
                                )}
                            >
                                {role}
                            </button>
                        ) : (
                            <div className="flex flex-col gap-1 relative z-40">
                                <label htmlFor="bi-role" className="text-xs font-semibold text-slate-600">
                                    Role
                                </label>
                                <select
                                    id="bi-role"
                                    aria-label="Select role"
                                    value={role}
                                    onChange={(e) => setRole(e.target.value as Role)}
                                    className={cx(
                                        "rounded-md border border-slate-300 bg-white px-2 py-2 text-sm",
                                        "text-slate-800 hover:border-slate-400",
                                        "focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2"
                                    )}
                                >
                                    <option value="AGM">AGM</option>
                                    <option value="Executive">Executive</option>
                                </select>
                            </div>
                        )}
                    </div>
                </nav>
            </aside>
        </>
    );
}
``
