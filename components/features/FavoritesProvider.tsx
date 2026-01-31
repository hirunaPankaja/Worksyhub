'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { allTools } from '@/lib/tools';

type FavoriteItem = {
    name: string;
    href: string;
    category: string;
};

interface FavoritesContextType {
    favorites: FavoriteItem[];
    toggleFavorite: (item: FavoriteItem) => void;
    isFavorite: (href: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
    const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        // Load from local storage
        const saved = localStorage.getItem('worksyhub-favorites');
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                // Filter out invalid tools that no longer exist
                const validFavorites = parsed.filter((fav: FavoriteItem) =>
                    allTools.some(tool => tool.href === fav.href)
                );

                // If we filtered anything out, update local storage immediately
                if (validFavorites.length !== parsed.length) {
                    localStorage.setItem('worksyhub-favorites', JSON.stringify(validFavorites));
                }

                setFavorites(validFavorites);
            } catch (e) {
                console.error('Failed to parse favorites', e);
            }
        }
        setMounted(true);
    }, []);

    useEffect(() => {
        if (mounted) {
            localStorage.setItem('worksyhub-favorites', JSON.stringify(favorites));
        }
    }, [favorites, mounted]);

    const toggleFavorite = (item: FavoriteItem) => {
        setFavorites((prev) => {
            const exists = prev.find((f) => f.href === item.href);
            if (exists) {
                return prev.filter((f) => f.href !== item.href);
            }
            return [...prev, item];
        });
    };

    const isFavorite = (href: string) => {
        return favorites.some((f) => f.href === href);
    };

    return (
        <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
            {children}
        </FavoritesContext.Provider>
    );
}

export function useFavorites() {
    const context = useContext(FavoritesContext);
    if (context === undefined) {
        throw new Error('useFavorites must be used within a FavoritesProvider');
    }
    return context;
}
