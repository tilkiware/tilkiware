"use client";

import { Zap, Users, Lightbulb, Shield, Package, Star, TrendingUp, Clock } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useApp } from "@/context/AppContext";

export default function AboutPage() {
    const { t, language } = useLanguage();
    const { aboutPage } = useApp();

    const values = [
        { icon: Zap, title: t("about.value1.title"), desc: t("about.value1.desc") },
        { icon: Users, title: t("about.value2.title"), desc: t("about.value2.desc") },
        { icon: Lightbulb, title: t("about.value3.title"), desc: t("about.value3.desc") },
        { icon: Shield, title: t("about.value4.title"), desc: t("about.value4.desc") },
    ];

    const stats = [
        { value: "50+", label: t("about.stats.apps"), icon: Package },
        { value: "10k+", label: t("about.stats.merchants"), icon: Users },
        { value: "4.9k", label: t("about.stats.reviews"), icon: Star },
        { value: "99.9%", label: t("about.stats.uptime"), icon: TrendingUp },
    ];

    const title = language === "tr" ? aboutPage.titleTr : aboutPage.titleEn;
    const description = language === "tr" ? aboutPage.descTr : aboutPage.descEn;
    const mission = language === "tr" ? aboutPage.extraTr : aboutPage.extraEn;

    return (
        <div className="relative overflow-hidden min-h-screen">
            {/* Ambient background */}
            <div className="absolute top-[-80px] left-[50%] -translate-x-1/2 h-[400px] w-[700px] rounded-full bg-brand/8 blur-[130px] pointer-events-none" />

            <div className="container mx-auto px-4 md:px-6 py-16 md:py-24 relative z-10">
                {/* Hero Section */}
                <div className="max-w-3xl mx-auto text-center mb-20">
                    <div className="inline-flex items-center rounded-full border border-brand/20 bg-brand/5 px-3.5 py-1.5 text-xs font-bold text-[#ff9f1c] backdrop-blur-xl shadow-sm mb-6">
                        <span className="flex h-2 w-2 rounded-full bg-brand mr-2 animate-pulse shadow-[0_0_8px_#ff5a1f]"></span>
                        {t("about.badge")}
                    </div>

                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1] mb-6">
                        {title}
                    </h1>
                    <p className="text-lg text-white/60 leading-relaxed max-w-2xl mx-auto">
                        {description}
                    </p>
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-20">
                    {stats.map((stat, i) => (
                        <div key={i} className="flex flex-col items-center justify-center p-6 rounded-2xl border border-white/5 bg-white/[0.01] backdrop-blur-sm hover:border-brand/30 hover:bg-white/[0.03] transition-all duration-300 group text-center">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-white/50 group-hover:bg-brand/10 group-hover:text-brand transition-all duration-300 mb-3">
                                <stat.icon className="h-5 w-5" />
                            </div>
                            <span className="text-3xl font-extrabold text-white tracking-tight">{stat.value}</span>
                            <span className="text-sm font-semibold text-white/80 mt-1">{stat.label}</span>
                        </div>
                    ))}
                </div>

                {/* Mission Section */}
                {mission && (
                    <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-8 md:p-12 backdrop-blur-md mb-20 relative overflow-hidden">
                        <div className="absolute top-0 right-0 h-40 w-40 rounded-full bg-brand/5 blur-[60px] pointer-events-none" />
                        <div className="max-w-3xl relative z-10">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand/10 text-brand">
                                    <Clock className="h-5 w-5" />
                                </div>
                                <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">{t("about.mission.title")}</h2>
                            </div>
                            <p className="text-white/60 leading-relaxed text-base md:text-lg">
                                {mission}
                            </p>
                        </div>
                    </div>
                )}

                {/* Values Grid */}
                <div className="mb-20">
                    <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight text-center mb-12">
                        {t("eco.title")}
                    </h2>
                    <div className="grid gap-6 sm:grid-cols-2">
                        {values.map((value, i) => (
                            <div key={i} className="flex gap-4 p-6 rounded-2xl border border-white/5 bg-white/[0.01] hover:border-brand/30 hover:bg-white/[0.03] transition-all duration-300 group">
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand/10 text-brand group-hover:bg-brand group-hover:text-white transition-all shrink-0">
                                    <value.icon className="h-5 w-5" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-white mb-1">{value.title}</h3>
                                    <p className="text-sm text-white/50 leading-relaxed">{value.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Team/Brand Showcase */}
                <div className="rounded-3xl border border-brand/20 bg-[#110f0d]/90 p-8 md:p-12 text-center relative overflow-hidden">
                    <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
                        backgroundImage: `linear-gradient(to right, #ff5a1f 1px, transparent 1px), linear-gradient(to bottom, #ff5a1f 1px, transparent 1px)`,
                        backgroundSize: '24px 24px'
                    }}></div>
                    <div className="absolute inset-0 bg-gradient-to-b from-brand/10 via-transparent to-transparent pointer-events-none" />
                    
                    <div className="relative z-10">
                        <div className="flex h-20 w-20 mx-auto items-center justify-center rounded-2xl bg-white/5 border border-white/10 p-3 mb-6">
                            <img src="/logo.png" alt="TilkiWare Logo" className="h-full w-full object-contain" />
                        </div>
                        <h2 className="text-3xl font-extrabold text-white mb-3">TilkiWare</h2>
                        <p className="text-white/50 max-w-lg mx-auto leading-relaxed">
                            {t("footer.description")}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
