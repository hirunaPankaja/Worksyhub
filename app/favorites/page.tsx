'use client';

import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { useFavorites } from '@/components/features/FavoritesProvider';
import { Heart, ArrowLeft, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function FavoritesPage() {
    const { favorites, toggleFavorite } = useFavorites();

    return (
        <div className="container mx-auto px-4 py-8 max-w-7xl">
            <div className="flex items-center gap-4 mb-8">
                <Link href="/">
                    <Button variant="ghost" size="icon">
                        <ArrowLeft className="w-5 h-5" />
                    </Button>
                </Link>
                <h1 className="text-3xl font-bold flex items-center gap-2">
                    <Heart className="w-8 h-8 text-red-500 fill-red-500" /> My Favorites
                </h1>
            </div>

            {favorites.length === 0 ? (
                <div className="text-center py-20 bg-muted/20 rounded-2xl border border-dashed border-border">
                    <Heart className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
                    <h2 className="text-xl font-semibold mb-2">No favorites yet</h2>
                    <p className="text-muted-foreground mb-6">
                        Mark tools as favorites to access them quickly here.
                    </p>
                    <Link href="/">
                        <Button>Explore Tools</Button>
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {favorites.map((fav) => (
                        <Card key={fav.href} className="p-5 hover:shadow-xl transition-all duration-300 border-l-4 border-l-primary group relative">
                            <Link href={fav.href} className="block h-full">
                                <div className="flex items-start justify-between mb-2">
                                    <div className="font-bold text-lg group-hover:text-primary transition-colors">
                                        {fav.name}
                                    </div>
                                </div>
                                <div className="text-sm text-muted-foreground mb-4">
                                    {fav.category}
                                </div>
                            </Link>

                            <Button
                                variant="ghost"
                                size="icon"
                                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10"
                                onClick={(e) => {
                                    e.preventDefault();
                                    toggleFavorite(fav);
                                }}
                            >
                                <Trash2 className="w-4 h-4" />
                            </Button>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
