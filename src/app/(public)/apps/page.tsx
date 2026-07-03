"use client";

import { useState } from "react";
import { AppCard } from "@/components/features/AppCard";
import { categories } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useApp } from "@/context/AppContext";

export default function AppsPage() {
    const { t } = useLanguage();
    const { apps } = useApp();
    const [activeCategory, setActiveCategory] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");

    const filteredApps = apps.filter((app) => {
        const matchesCategory = activeCategory === "All" || app.category === activeCategory;
        const matchesSearch = app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            app.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="container mx-auto px-4 md:px-6 py-12">
            <div className="flex flex-col gap-8">
                <div className="flex flex-col gap-4">
                    <h1 className="text-4xl font-bold tracking-tight text-white">{t("catalog.title")}</h1>
                    <p className="text-xl text-white/60">{t("catalog.description")}</p>
                </div>

                {/* Filters & Search */}
                <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between sticky top-20 z-40 py-4 bg-black/80 backdrop-blur-xl border-b border-white/5 -mx-4 px-4 md:mx-0 md:px-0 md:bg-transparent md:border-none md:static">
                    <div className="flex flex-wrap gap-2">
                        <Button
                            variant={activeCategory === "All" ? "default" : "outline"}
                            size="sm"
                            onClick={() => setActiveCategory("All")}
                            className={activeCategory === "All" ? "bg-fox-gradient shadow-[0_0_10px_rgba(255,90,31,0.2)] hover:opacity-90 border-none" : "border-white/10 text-white hover:border-brand/30 hover:bg-brand/5 hover:text-brand transition-colors"}
                        >
                            {t("catalog.tab.all")}
                        </Button>
                        {categories.map((cat) => (
                            <Button
                                key={cat.id}
                                variant={activeCategory === cat.name ? "default" : "outline"}
                                size="sm"
                                onClick={() => setActiveCategory(cat.name)}
                                className={activeCategory === cat.name ? "bg-fox-gradient shadow-[0_0_10px_rgba(255,90,31,0.2)] hover:opacity-90 border-none" : "border-white/10 text-white hover:border-brand/30 hover:bg-brand/5 hover:text-brand transition-colors"}
                            >
                                {cat.name}
                            </Button>
                        ))}
                    </div>

                    <div className="relative w-full md:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/50" />
                        <input
                            type="text"
                            placeholder={t("catalog.search.placeholder")}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full rounded-md border border-white/10 bg-white/5 pl-9 pr-4 py-2 text-sm text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-brand/40 focus:border-brand/40 transition-all duration-300"
                        />
                    </div>
                </div>

                {/* Results */}
                {filteredApps.length > 0 ? (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {filteredApps.map((app) => (
                            <AppCard key={app.id} app={app} />
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                        <div className="text-4xl mb-4">🦊</div>
                        <h3 className="text-xl font-bold text-white">{t("catalog.noResults")}</h3>
                        <p className="text-white/50 mt-2">{t("catalog.adjustSearch")}</p>
                        <Button
                            variant="link"
                            onClick={() => { setActiveCategory("All"); setSearchQuery(""); }}
                            className="mt-4 text-brand hover:text-[#ff9f1c]"
                        >
                            {t("catalog.clearFilters")}
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}
