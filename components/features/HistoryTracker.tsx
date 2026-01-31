'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export interface HistoryItem {
    href: string;
    title: string;
    timestamp: number;
}

const HISTORY_KEY = 'worksyhub-history';

export function useHistory() {
    const [history, setHistory] = useState<HistoryItem[]>([]);

    useEffect(() => {
        const saved = localStorage.getItem(HISTORY_KEY);
        if (saved) {
            try {
                setHistory(JSON.parse(saved));
            } catch (e) {
                console.error(e);
            }
        }
    }, []);

    const addToHistory = (href: string, title: string) => {
        // Basic validation to avoid non-content pages
        if (href === '/' || href.includes('search')) return;

        setHistory((prev) => {
            const filtered = prev.filter((item) => item.href !== href);
            const newItem: HistoryItem = { href, title, timestamp: Date.now() };
            const newHistory = [newItem, ...filtered].slice(0, 5); // Keep last 5
            localStorage.setItem(HISTORY_KEY, JSON.stringify(newHistory));
            return newHistory;
        });
    };

    return { history, addToHistory };
}

export function HistoryTracker() {
    const pathname = usePathname();
    const { addToHistory } = useHistory();

    useEffect(() => {
        // Attempt to derive a "Title" from the pathname since we don't have access to page title easily
        // e.g., /bmi-calculator -> BMI Calculator
        if (pathname && pathname !== '/') {
            const title = pathname
                .replace('/', '')
                .split('-')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ');

            addToHistory(pathname, title);
        }
    }, [pathname]);

    return null; // Logic only
}
