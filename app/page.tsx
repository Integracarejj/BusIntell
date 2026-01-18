
// app/page.tsx
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Dashboard | Budget Intelligence",
    description:
        "Role-aware dashboard for AGM and Executive views: insights, rollups, and forecast entry points.",
};

type Card = {
    title: string;
    description: string;
    href: string;
    badge?: string;
    testId?: string;
};

const cards: Card[] = [
    {
        title: "Budget Updater",
        description:
            "Open an editable grid to review and update budget line items.",
        href: "/agm/budget",
        badge: "AGM",
        testId: "card-budget",
    },
    {
        title: "Spend Overview",
        description:
            "Community spend vs. plan with quick drill-through to attention items.",
        href: "/agm/insights",
        badge: "AGM",
        testId: "card-spend",
    },
    {
        title: "Variance Alerts",
        description:
            "Exception-first view to prioritize month-end conversations.",
        href: "/agm/rollups",
        badge: "AGM",
        testId: "card-variance",
    },
    {
        title: "Forecast Summary",
        description: "Workspace to adjust assumptions and scenarios.",
        href: "/agm/forecast",
        badge: "AGM",
        testId: "card-forecast",
    },

];

export default function Page() {
    return (
        <div className="space-y-6">
            {/* Title/description were moved to Header. The gradient band below header has been removed. */}

            {/* 4-across card grid on desktop with a little more vertical presence */}
            <section
                aria-label="Quick entry points"
                className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4"
            >
                {cards.map(({ title, description, href, badge, testId }) => (
                    <Link
                        key={title}
                        href={href}
                        data-testid={testId}
                        className={[
                            "group relative block rounded-xl border border-slate-200 bg-white p-6 shadow-sm",
                            "transition-all duration-200 hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-md",
                            "focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500",
                            // Make them a bit taller for presence
                            "min-h-[140px]",
                        ].join(" ")}
                        aria-label={`${title}: ${description}`}
                    >
                        <div className="flex items-start justify-between">
                            <h3 className="font-medium text-slate-900">{title}</h3>
                            {badge ? (
                                <span className="rounded-full bg-slate-50 px-2 py-0.5 text-xs font-medium text-slate-500 ring-1 ring-slate-200">
                                    {badge}
                                </span>
                            ) : null}
                        </div>
                        <p className="mt-2 text-sm leading-6 text-slate-600">
                            {description}
                        </p>
                        <svg
                            viewBox="0 0 20 20"
                            fill="none"
                            className="absolute right-4 top-5 h-5 w-5 text-slate-300 transition-colors group-hover:text-indigo-400"
                            aria-hidden="true"
                        >
                            <path
                                d="M7.5 4l5 6-5 6"
                                stroke="currentColor"
                                strokeWidth={1.8}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </Link>
                ))}
            </section>

            {/* Keep the quick links row per your request */}
            <nav aria-label="AGM quick links" className="pt-2">
                <ul className="flex flex-wrap gap-3 text-sm">
                    <li>
                        <Link
                            href="/agm/budget"
                            className="rounded-md border border-slate-200 bg-white px-3 py-1.5 text-slate-700 shadow-sm transition hover:border-indigo-200 hover:text-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                        >
                            Go to Budget
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/agm/forecast"
                            className="rounded-md border border-slate-200 bg-white px-3 py-1.5 text-slate-700 shadow-sm transition hover:border-indigo-200 hover:text-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                        >
                            Go to Forecast
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/agm/rollups"
                            className="rounded-md border border-slate-200 bg-white px-3 py-1.5 text-slate-700 shadow-sm transition hover:border-indigo-200 hover:text-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                        >
                            Go to Rollups
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/agm/insights"
                            className="rounded-md border border-slate-200 bg-white px-3 py-1.5 text-slate-700 shadow-sm transition hover:border-indigo-200 hover:text-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                        >
                            Go to Insights
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
}
