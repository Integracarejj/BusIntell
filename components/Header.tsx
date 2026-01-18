
// components/Header.tsx
// Server Component (no "use client" needed — no browser-only code here)

export default function Header() {
    return (
        <header
            className="
        sticky top-0 z-30
        bg-teal-500 text-white
        shadow-md backdrop-blur-sm
        border-b border-teal-600/40
      "
        >
            <div className="flex items-center justify-between px-6 py-4">
                {/* Title & subline */}
                <div className="min-w-0">
                    <h1 className="truncate text-lg font-semibold leading-6 text-white">
                        Budget Intelligence Prototype
                    </h1>
                    <p className="mt-0.5 hidden text-xs text-teal-50/90 sm:block">
                        AGM & Executive views with insights, rollups, and forecasting.
                    </p>
                </div>

                {/* Right utilities — intentionally empty per your feedback (Alpha removed) */}
                <div aria-hidden className="h-5 w-5 opacity-0" />
            </div>
        </header>
    );
}
