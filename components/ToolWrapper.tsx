'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import { Home, ChevronRight, Share2, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useFavorites } from '@/components/features/FavoritesProvider';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

interface ToolWrapperProps {
    title: string;
    description: string;
    children: ReactNode;
    category?: string;
    relatedTools?: { name: string; href: string }[];
}

export function ToolWrapper({
    title,
    description,
    children,
    category = 'Tools',
    relatedTools = [
        { name: 'Basic Calculator', href: '/basic-calculator' },
        { name: 'Scientific Calculator', href: '/scientific-calculator' },
        { name: 'BMI Calculator', href: '/bmi-calculator' },
        { name: 'EMI Calculator', href: '/emi-calculator' },
    ],
}: ToolWrapperProps) {
    const pathname = usePathname();
    const { isFavorite, toggleFavorite } = useFavorites();
    const isFav = isFavorite(pathname);

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: title,
                text: description,
                url: window.location.href,
            }).catch(console.error);
        } else {
            navigator.clipboard.writeText(window.location.href);
            // Ideally show toast here
        }
    };

    return (
        <div className="space-y-8 animate-fade-in">
            {/* --- Breadcrumbs --- */}
            <nav className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Link href="/" className="hover:text-primary transition-colors">
                    <Home className="w-4 h-4" />
                </Link>
                <ChevronRight className="w-4 h-4" />
                <span className="font-medium text-foreground">{title}</span>
            </nav>

            {/* --- Hero Section --- */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/5 via-primary/10 to-background border border-primary/10 p-8 md:p-12 text-center space-y-4">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                    <svg
                        width="200"
                        height="200"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1"
                        className="w-48 h-48 rotate-12"
                    >
                        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                    </svg>
                </div>

                <motion.h1
                    className="text-4xl md:text-5xl font-black tracking-tight text-foreground relative z-10"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                >
                    {title}
                </motion.h1>
                <motion.p
                    className="text-lg text-muted-foreground max-w-2xl mx-auto relative z-10"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                >
                    {description}
                </motion.p>

                <motion.div
                    className="flex items-center justify-center gap-2 pt-4 relative z-10"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => toggleFavorite({ name: title, href: pathname, category })}
                        className={isFav ? "text-red-500 hover:text-red-600 border-red-200 bg-red-50 dark:bg-red-900/10" : ""}
                    >
                        <Heart className={`w-4 h-4 mr-2 ${isFav ? "fill-current" : ""}`} />
                        {isFav ? "Favorited" : "Add to Favorites"}
                    </Button>
                    <Button variant="ghost" size="sm" onClick={handleShare}>
                        <Share2 className="w-4 h-4 mr-2" />
                        Share
                    </Button>
                </motion.div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* --- Main Tool Area --- */}
                <div className="lg:col-span-8 space-y-8">
                    <Card className="glass-card overflow-hidden border-t-4 border-t-primary">
                        <div className="p-6 md:p-8">
                            {children}
                        </div>
                    </Card>
                </div>

                {/* --- Sidebar --- */}
                <div className="lg:col-span-4 space-y-6">
                    <div className="sticky top-24 space-y-6">
                        <Card className="bg-muted/30 border-none shadow-none">
                            <div className="p-6 space-y-4">
                                <h3 className="font-semibold text-foreground flex items-center gap-2">
                                    <span className="w-1 h-6 bg-primary rounded-full"></span>
                                    You Might Also Like
                                </h3>
                                <div className="space-y-2">
                                    {relatedTools.map((tool) => (
                                        <Link
                                            key={tool.href}
                                            href={tool.href}
                                            className="block p-3 rounded-lg bg-background hover:bg-accent border border-transparent hover:border-border transition-all group"
                                        >
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                                                    {tool.name}
                                                </span>
                                                <ChevronRight className="w-4 h-4 text-muted-foreground/50 group-hover:translate-x-1 transition-transform" />
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </Card>

                        {/* Ad Placeholder or Promo */}
                        <div className="rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 p-6 text-white text-center">
                            <p className="font-bold text-lg mb-2">Free Tools Forever</p>
                            <p className="text-indigo-100 text-sm">
                                Enjoying WorksyHub? improved precision & privacy.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
