
// /components/AIIconButton.tsx
'use client';

import React from 'react';

export function AIIconButton({
    pressed,
    onClick,
    label = 'Open AI insights'
}: {
    pressed?: boolean;
    onClick: () => void;
    label?: string;
}) {
    return (
        <button
            type="button"
            aria-pressed={pressed ? 'true' : 'false'}
            aria-label={label}
            onClick={onClick}
            style={{
                appearance: 'none',
                border: '1px solid #e5e7eb',
                background: pressed ? '#111827' : '#fff',
                color: pressed ? '#fff' : '#111827',
                borderRadius: 8,
                padding: '6px 10px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                cursor: 'pointer'
            }}
        >
            <SparklesIcon />
            <span style={{ fontSize: 14, fontWeight: 600 }}>AI</span>
        </button>
    );
}

function SparklesIcon() {
    return (
        <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M5 3l1.5 3.5L10 8l-3.5 1.5L5 13l-1.5-3.5L0 8l3.5-1.5L5 3zm11 2l2 5 5 2-5 2-2 5-2-5-5-2 5-2 2-5z" />
        </svg>
    );
}
