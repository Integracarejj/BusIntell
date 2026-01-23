
// /components/ai/types.ts
// Typed contracts for the AI layer. Keeps UI + engine decoupled.

export type Money = number;

export interface BudgetRow {
    id?: string;
    type: 'revenue' | 'expense' | string;
    community: string;
    category: string;
    subCategory?: string | null;
    glCode?: string | null;
    period?: string; // e.g., "2026-01"
    year?: number;
    quarter?: string;
    month?: string;
    amount: number | null; // some mocks use null for TBD cells
    driver?: string | null;
    driverTag?: string | null;
    costBucket?: 'Operations' | 'Labor' | 'CapEx' | string;
}

export interface Totals {
    revenue: number;
    expense: number;
    net: number;
    byCategory: Record<string, number>;
    byType?: Record<string, number>;
    byCommunity?: Record<string, number>;
}

export interface GroupingSelection {
    // The columns currently grouped by, in order (e.g., ["community", "category"])
    keys: string[];
}

export type InsightType =
    | 'kpi_narrative'
    | 'trend'
    | 'variance'
    | 'peer_comparison'
    | 'outlier'
    | 'recommendation';

export interface Insight {
    id: string;
    type: InsightType;
    title: string;
    description: string;
    severity?: 'info' | 'warning' | 'critical';
    context?: Record<string, unknown>;
    highlights?: Array<{ label: string; value: number | string; unit?: string }>;
}

export interface InsightsInput {
    rows: BudgetRow[];
    filteredRows: BudgetRow[];
    grouping: GroupingSelection;
    totals: Totals;
    signal?: AbortSignal;
}
