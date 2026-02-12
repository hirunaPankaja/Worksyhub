'use client';

import { SetStateAction, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Search, Calculator, Heart, Clock, Zap, Shield, Users, TrendingUp, Star, ArrowRight, Ruler, Lock, Image, QrCode, FileText, Timer, Globe, Percent, Wallet, Calendar, Baby } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useFavorites } from '@/components/features/FavoritesProvider';
import { useHistory } from '@/components/features/HistoryTracker';

import { allTools } from '@/lib/tools';


export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const { favorites } = useFavorites();
  const { history } = useHistory();

  const filteredTools = allTools.filter(tool =>
    tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tool.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const popularTools = allTools.filter(t => t.badge);
  const otherTools = allTools.filter(t => !t.badge);

  return (
    <div className="space-y-16">

      {/* Hero Section - SEO Optimized */}
      <section className="relative text-center py-16 md:py-24 overflow-hidden">
        {/* Abstract Background Shapes */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl -z-10 animate-pulse" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6 max-w-4xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/20 to-purple-500/20 text-primary text-sm font-bold border border-primary/30">
            <TrendingUp className="w-4 h-4" />
            <span>🔥 1M+ Calculations Done This Month</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-black tracking-tight text-foreground leading-tight">
            Free Online <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-500">Calculators</span> & Tools
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            <strong>100% Free</strong> • <strong>No Signup</strong> • <strong>Instant Results</strong><br />
            Calculate BMI, convert units, generate passwords & QR codes in seconds!
          </p>

          <div className="relative max-w-lg mx-auto pt-4">
            <Input
              className="h-14 pl-14 pr-6 rounded-full shadow-xl border-2 border-primary/20 bg-background/90 backdrop-blur-xl transition-all focus:scale-105 focus:border-primary text-lg"
              placeholder="Search tools... (e.g. BMI, converter, password)"
              value={searchQuery}
              onChange={(e: { target: { value: SetStateAction<string>; }; }) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 mt-2 text-primary w-6 h-6" />
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center gap-6 pt-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-green-500" />
              <span>100% Private</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-yellow-500" />
              <span>Lightning Fast</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-purple-500" />
              <span>No Ads</span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Favorites & History (Personalized) */}
      {(favorites.length > 0 || history.length > 0) && (
        <section className="grid md:grid-cols-2 gap-8">
          {favorites.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Heart className="w-5 h-5 text-red-500 fill-red-500" /> Your Favorites
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {favorites.map((fav) => (
                  <Link key={fav.href} href={fav.href}>
                    <Card className="p-4 hover:shadow-md transition-all border-l-4 border-l-primary cursor-pointer hover:scale-[1.02]">
                      <div className="font-medium">{fav.name}</div>
                      <div className="text-xs text-muted-foreground">{fav.category}</div>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {history.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Clock className="w-5 h-5 text-blue-500" /> Recently Used
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {history.map((item) => (
                  <Link key={item.href} href={item.href}>
                    <Card className="p-4 hover:shadow-md transition-all border-l-4 border-l-secondary cursor-pointer hover:scale-[1.02]">
                      <div className="font-medium">{item.title}</div>
                      <div className="text-xs text-muted-foreground">Last used just now</div>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </section>
      )}

      {/* Popular Tools Section */}
      {!searchQuery && (
        <section className="space-y-8">
          <div className="flex items-center gap-3">
            <TrendingUp className="w-6 h-6 text-primary" />
            <h2 className="text-3xl font-bold tracking-tight">🔥 Most Popular Tools</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularTools.map((tool, index) => (
              <motion.div
                key={tool.href}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                viewport={{ once: true }}
              >
                <Link href={tool.href} className="group h-full block">
                  <Card className="h-full p-6 hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-primary/30 bg-gradient-to-br from-card via-card to-primary/5 group-hover:-translate-y-2 relative overflow-hidden">
                    {tool.badge && (
                      <div className="absolute top-3 right-3 px-2 py-1 text-xs font-bold rounded-full bg-gradient-to-r from-primary/20 to-purple-500/20 text-primary">
                        {tool.badge}
                      </div>
                    )}
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/10 to-purple-500/10 group-hover:from-primary/20 group-hover:to-purple-500/20 flex items-center justify-center mb-4 text-primary transition-all group-hover:scale-110">
                      <tool.icon className="w-7 h-7" />
                    </div>
                    <h3 className="font-bold text-xl mb-2 group-hover:text-primary transition-colors">{tool.name}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{tool.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">{tool.category}</span>
                      <span className="text-xs text-green-600 font-medium">{tool.searches}</span>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* All Tools Grid */}
      <section className="space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">
            {searchQuery ? 'Search Results' : 'All Free Tools'}
          </h2>
          <div className="text-sm text-muted-foreground bg-muted px-4 py-2 rounded-full font-medium">
            {filteredTools.length} tools available
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {(searchQuery ? filteredTools : otherTools).map((tool, index) => (
            <motion.div
              key={tool.href}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.03 }}
              viewport={{ once: true }}
            >
              <Link href={tool.href} className="group h-full block">
                <Card className="h-full p-5 hover:shadow-xl transition-all duration-300 border-transparent hover:border-primary/20 bg-gradient-to-br from-card to-secondary/20 group-hover:-translate-y-1">
                  <div className="w-12 h-12 rounded-xl bg-primary/5 group-hover:bg-primary/10 flex items-center justify-center mb-4 text-primary transition-colors">
                    <tool.icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">{tool.name}</h3>
                  <p className="text-sm text-muted-foreground">{tool.description}</p>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>

        {filteredTools.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-xl text-muted-foreground">
              No tools found matching "{searchQuery}"
            </p>
            <p className="text-muted-foreground mt-2">Try "BMI", "converter", or "password"</p>
          </div>
        )}
      </section>

      {/* Features Grid */}
      <section className="grid md:grid-cols-3 gap-8 py-12 border-t">
        {[
          { icon: Shield, title: "100% Private", desc: "All calculations happen in your browser. Your data never leaves your device. Zero tracking." },
          { icon: Zap, title: "Lightning Fast", desc: "Instant results with no server calls. Works offline once loaded. Mobile optimized." },
          { icon: Users, title: "Free Forever", desc: "No subscriptions, no hidden fees, no signup required. Free for everyone, always." },
        ].map((feature, i) => (
          <div key={i} className="text-center space-y-4 p-6">
            <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/10 to-purple-500/10 flex items-center justify-center text-primary">
              <feature.icon className="w-8 h-8" />
            </div>
            <h3 className="font-bold text-xl">{feature.title}</h3>
            <p className="text-muted-foreground">{feature.desc}</p>
          </div>
        ))}
      </section>

      {/* SEO Content Section */}
      <section className="border-t pt-12 space-y-8">
        <h2 className="text-3xl font-bold text-center">Why Use WorksyHub Online Tools?</h2>
        <div className="prose prose-lg dark:prose-invert max-w-4xl mx-auto text-muted-foreground">
          <p>
            <strong>WorksyHub</strong> is your one-stop destination for free online calculators and tools. Whether you need to <strong>calculate your BMI</strong>, <strong>generate a secure password</strong>, <strong>create a QR code</strong>, or <strong>convert units</strong>, we've got you covered with fast, accurate, and privacy-focused tools.
          </p>
          <p>
            Unlike other websites, our tools work <strong>100% in your browser</strong> – no data is ever sent to servers. This means your calculations are private, instant, and work even offline. We don't show ads, don't require signup, and never track your usage.
          </p>
          <h3 className="text-xl font-bold text-foreground">Popular Free Tools:</h3>
          <ul>
            <li><Link href="/bmi-calculator" className="font-bold hover:text-primary transition-colors">BMI Calculator</Link> - Calculate your Body Mass Index and understand your health status</li>
            <li><Link href="/age-calculator" className="font-bold hover:text-primary transition-colors">Age Calculator</Link> - Find out exactly how old you are in years, months, and days</li>
            <li><Link href="/percentage-calculator" className="font-bold hover:text-primary transition-colors">Percentage Calculator</Link> - Calculate percentages, discounts, tips, and more</li>
            <li><Link href="/password-generator" className="font-bold hover:text-primary transition-colors">Password Generator</Link> - Create strong, uncrackable passwords instantly</li>
            <li><Link href="/qr-code-generator" className="font-bold hover:text-primary transition-colors">QR Code Generator</Link> - Generate free QR codes for URLs, text, WiFi, and more</li>
            <li><Link href="/unit-converter" className="font-bold hover:text-primary transition-colors">Unit Converter</Link> - Convert length, weight, temperature, and other units</li>
          </ul>
          <p>
            All tools are mobile-friendly, work on any device, and deliver results in milliseconds. Start using our free calculators today – no download required!
          </p>
        </div>
      </section>

    </div>
  );
}