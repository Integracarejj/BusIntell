
// components/grid/VirtualRows.tsx
import * as React from 'react';

type VirtualRowsProps<T> = {
    /** All table rows (already filtered/sorted) in display order */
    rows: T[];
    /** Height of a single data row in pixels (estimate) */
    rowHeight?: number;
    /** Extra rows to render above/below the viewport */
    overscan?: number;
    /**
     * The scrollable container that wraps the <table>.
     * Widened to Element|null to accept HTMLDivElement refs without TS variance issues.
     */
    scrollContainerRef: React.RefObject<Element | null>;
    /** Number of visible (non-hidden) columns; used for spacer colSpan */
    visibleColumnCount: number;
    /** Render function for an individual data row as <tr>...</tr> */
    renderRow: (row: T, rowIndex: number) => React.ReactElement;
    /** Disable virtualization (debug or small datasets) */
    disableVirtual?: boolean;
};

/**
 * Table-safe virtualization for <tbody>:
 * - Renders only <tr>/<td> inside <tbody> (no <div>).
 * - Uses top/bottom spacer <tr> to preserve scroll height.
 * - SSR-safe: falls back to non-virtual on server / missing container metrics.
 */
export function VirtualRows<T>({
    rows,
    rowHeight = 36,
    overscan = 6,
    scrollContainerRef,
    visibleColumnCount,
    renderRow,
    disableVirtual,
}: VirtualRowsProps<T>) {
    const isServer = typeof window === 'undefined';
    const [viewport, setViewport] = React.useState({ scrollTop: 0, height: 0 });

    React.useEffect(() => {
        if (disableVirtual || isServer) return;
        // We widened the ref type; here we assert to HTMLElement at usage time
        const el = scrollContainerRef.current as HTMLElement | null;
        if (!el) return;

        const handle = () => {
            setViewport({
                scrollTop: el.scrollTop,
                height: el.clientHeight,
            });
        };
        handle();

        el.addEventListener('scroll', handle, { passive: true });
        const ro = new ResizeObserver(handle);
        ro.observe(el);

        return () => {
            el.removeEventListener('scroll', handle);
            ro.disconnect();
        };
    }, [scrollContainerRef, disableVirtual, isServer]);

    // If virtualization is disabled or we can't measure yet, render all rows
    if (disableVirtual || isServer || !scrollContainerRef.current || viewport.height === 0) {
        return <>{rows.map((row, i) => renderRow(row, i))}</>;
    }

    const total = rows.length;
    const estTotalHeight = total * rowHeight;

    const startIndex = Math.max(0, Math.floor(viewport.scrollTop / rowHeight) - overscan);
    const visibleCount = Math.ceil(viewport.height / rowHeight) + overscan * 2;
    const endIndex = Math.min(total, startIndex + visibleCount);

    const topPad = startIndex * rowHeight;
    const bottomPad = Math.max(0, estTotalHeight - topPad - (endIndex - startIndex) * rowHeight);

    return (
        <>
            {topPad > 0 && (
                <tr aria-hidden="true">
                    <td colSpan={visibleColumnCount} style={{ height: topPad, padding: 0, border: 'none' }} />
                </tr>
            )}

            {rows.slice(startIndex, endIndex).map((row, i) => renderRow(row, startIndex + i))}

            {bottomPad > 0 && (
                <tr aria-hidden="true">
                    <td colSpan={visibleColumnCount} style={{ height: bottomPad, padding: 0, border: 'none' }} />
                </tr>
            )}
        </>
    );
}

export default VirtualRows;
