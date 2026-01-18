
// components/Header.tsx
// Server Component (no "use client" needed)
export default function Header() {
    return (
        <header
            className="
        sticky top-0 z-30
        border-b border-slate-200/70 bg-white/80 backdrop-blur
        shadow-[0_1px_0_0_rgba(0,0,0,0.03)]
      "
        >
            {/* Subtle gradient ribbon */}
            <div
                className="
          h-6 w-full
          bg-gradient-to-r from-indigo-50 via-white to-emerald-50
        "
                aria-hidden="true"
            />

            {/* Title row */}
            <div className="flex items-center justify-between px-6 py-3">
                <div className="min-w-0">
                    <h1 className="truncate text-lg font-semibold leading-6 text-slate-900">
                        Budget Intelligence Prototype
                    </h1>
                    <p className="mt-0.5 hidden text-xs text-slate-500 sm:block">
                        AGM & Executive views with insights, rollups, and forecasting.
                    </p>
                </div>

                {/* Right-side utilities (reserved for later) */}
                <div className="flex items-center gap-2">
                    {/* Placeholder for future actions (e.g., role, search, profile) */}
                    <span className="hidden rounded-full bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600 sm:inline-block">
                        Alpha
                    </span>
                </div>
            </div>
        </header>
    );
}
``
