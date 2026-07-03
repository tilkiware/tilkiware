"use client";

import Link from "next/link";
import { useParams, notFound } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowLeft, Check, Star, ExternalLink, ShieldCheck, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";
import { useApp } from "@/context/AppContext";

export default function AppDetailPage() {
    const { t } = useLanguage();
    const { apps } = useApp();
    const params = useParams();
    const slug = params.slug as string;
    const app = apps.find((a) => a.slug === slug);

    const [activeScreenshot, setActiveScreenshot] = useState<string>("");

    useEffect(() => {
        if (app?.screenshots && app.screenshots.length > 0) {
            setActiveScreenshot(app.screenshots[0]);
        }
    }, [app?.screenshots]);

    if (!app) {
        notFound();
    }

    return (
        <div className="relative overflow-hidden min-h-screen">
            {/* Massive gold/orange glowing ambient gradient background */}
            <div className="absolute top-[-100px] left-[50%] -translate-x-1/2 h-[400px] w-[800px] rounded-full bg-brand/8 blur-[130px] pointer-events-none" />

            <div className="container mx-auto px-4 md:px-6 py-12 relative z-10">
                <Link href="/apps" className="inline-flex items-center text-sm text-white/50 hover:text-brand mb-8 transition-colors group">
                    <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" /> {t("detail.back")}
                </Link>

                <div className="grid lg:grid-cols-3 gap-12 items-start">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-10">
                        {/* Hero Header Area */}
                        <div className="flex flex-col sm:flex-row items-start gap-6 border-b border-white/5 pb-8">
                            <div className="h-28 w-28 flex-shrink-0 rounded-2xl bg-white/5 border border-white/10 shadow-[0_0_35px_rgba(255,90,31,0.12)] flex items-center justify-center text-5xl overflow-hidden shrink-0">
                                {app.logoUrl ? (
                                    <img src={app.logoUrl} alt={app.name} className="h-full w-full object-cover" />
                                ) : (
                                    <span className="text-white">🚀</span>
                                )}
                            </div>
                            <div className="space-y-3">
                                <div className="flex flex-wrap items-center gap-3">
                                    <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">{app.name}</h1>
                                    <span className="rounded-full border border-brand/20 bg-brand/10 px-3 py-1 text-xs font-semibold text-brand shadow-sm">
                                        {app.category}
                                    </span>
                                </div>
                                <p className="text-lg text-white/70 leading-relaxed">{app.description}</p>
                                <div className="flex flex-wrap items-center gap-6 text-sm">
                                    <div className="flex items-center text-yellow-400">
                                        <Star className="h-4.5 w-4.5 fill-yellow-400 mr-1.5" />
                                        <span className="font-bold">{app.rating}</span>
                                        <span className="text-white/40 ml-1.5">({app.reviewCount} {t("detail.reviews")})</span>
                                    </div>
                                    <div className="flex items-center text-brand font-semibold gap-1.5">
                                        <ShieldCheck className="h-4.5 w-4.5" />
                                        {t("detail.verified")}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Interactive Screenshot Gallery */}
                        {app.screenshots && app.screenshots.length > 0 ? (
                            <div className="space-y-4">
                                <h2 className="text-xl font-bold text-white tracking-tight">Ekran Görüntüleri / Screenshots</h2>
                                <div className="space-y-3">
                                    {/* Large Active Preview Screen */}
                                    <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-white/10 bg-black/60 shadow-2xl flex items-center justify-center">
                                        <img 
                                            src={activeScreenshot} 
                                            alt={`${app.name} Screenshot Active`} 
                                            className="h-full w-full object-cover transition-opacity duration-300"
                                        />
                                    </div>
                                    {/* Thumbnails Row */}
                                    <div className="flex items-center gap-3 overflow-x-auto py-1 scrollbar-thin">
                                        {app.screenshots.map((src, i) => (
                                            <button
                                                key={i}
                                                onClick={() => setActiveScreenshot(src)}
                                                onMouseEnter={() => setActiveScreenshot(src)}
                                                className={`relative h-14 aspect-video rounded-lg overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                                                    activeScreenshot === src 
                                                        ? "border-brand shadow-[0_0_10px_rgba(255,90,31,0.3)] scale-[1.03]" 
                                                        : "border-white/10 hover:border-brand/40 opacity-70 hover:opacity-100"
                                                }`}
                                            >
                                                <img src={src} alt="Thumbnail" className="h-full w-full object-cover" />
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            /* Visual Placeholder for Mock App Detail Screen */
                            <div className="space-y-4">
                                <h2 className="text-xl font-bold text-white tracking-tight">Ekran Görüntüleri / Screenshots</h2>
                                <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-white/5 bg-white/[0.01] flex flex-col items-center justify-center text-white/30 text-sm p-8 border-dashed">
                                    <HelpCircle className="h-10 w-10 text-white/10 mb-3 animate-pulse" />
                                    <span>Bu uygulama için henüz görsel yüklenmemiş.</span>
                                    <span className="text-xs text-white/20 mt-1">Yönetici panelinden ekran görüntüleri ekleyebilirsiniz.</span>
                                </div>
                            </div>
                        )}

                        {/* Key Features Cards Grid */}
                        <div className="space-y-6">
                            <h2 className="text-xl font-bold text-white tracking-tight">{t("detail.keyFeatures")}</h2>
                            <div className="grid gap-4 sm:grid-cols-2">
                                {app.features && app.features.length > 0 ? (
                                    app.features.map((feature, i) => (
                                        <div key={i} className="flex items-start gap-4 p-5 rounded-2xl border border-white/5 bg-white/[0.01] hover:border-brand/30 hover:bg-white/[0.03] transition-all duration-300 group shadow-sm">
                                            <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand/10 text-brand group-hover:bg-brand group-hover:text-white transition-all">
                                                <Check className="h-4.5 w-4.5" />
                                            </div>
                                            <span className="text-white/80 font-medium leading-relaxed">{feature}</span>
                                        </div>
                                    ))
                                ) : (
                                    <div className="col-span-2 text-white/50 text-sm">Hiç özellik eklenmemiş.</div>
                                )}
                            </div>
                        </div>

                        {/* About/Description Area */}
                        <div className="space-y-4">
                            <h2 className="text-xl font-bold text-white tracking-tight">{t("detail.about")}</h2>
                            <div className="prose prose-invert max-w-none text-white/70 leading-relaxed space-y-4">
                                <p>{t("detail.lorem1")}</p>
                                <p>{t("detail.lorem2")}</p>
                            </div>
                        </div>
                    </div>

                    {/* Floating Glassmorphic Sidebar */}
                    <div className="space-y-6 lg:sticky lg:top-24">
                        <div className="rounded-2xl border border-brand/20 bg-[#110f0d]/80 backdrop-blur-xl p-8 shadow-xl relative overflow-hidden">
                            {/* Decorative glow inside card */}
                            <div className="absolute top-0 right-0 h-24 w-24 rounded-full bg-brand/5 blur-2xl pointer-events-none" />

                            <div className="mb-6">
                                <span className="text-xs font-semibold text-white/40 uppercase tracking-wider">{t("detail.price")}</span>
                                <div className="text-3xl font-extrabold text-white mt-1 tracking-tight">{app.pricing || t("detail.free")}</div>
                            </div>

                            <div className="space-y-3 relative z-10">
                                <a href={app.installUrl || "#"} target="_blank" rel="noopener noreferrer" className="block w-full">
                                    <Button className="w-full h-12 text-base bg-fox-gradient hover:opacity-90 shadow-[0_0_20px_rgba(255,90,31,0.2)] hover:shadow-[0_0_25px_rgba(255,90,31,0.35)] transition-all cursor-pointer font-bold">
                                        {t("detail.install")}
                                    </Button>
                                </a>
                                <Button variant="outline" className="w-full h-12 border-white/10 text-white hover:border-brand/40 hover:bg-brand/10 hover:text-brand transition-all font-semibold">
                                    {t("detail.demo")} <ExternalLink className="ml-2 h-4 w-4" />
                                </Button>
                            </div>

                            <div className="mt-8 pt-8 border-t border-white/5 space-y-5">
                                <div>
                                    <span className="text-xs text-white/40 uppercase tracking-wider font-semibold block">{t("detail.support")}</span>
                                    <p className="text-sm text-white/80 mt-1.5 font-medium">support@tilkiware.com</p>
                                    <p className="text-sm text-brand hover:underline cursor-pointer mt-1 font-medium">{t("detail.docs")}</p>
                                </div>
                                <div>
                                    <span className="text-xs text-white/40 uppercase tracking-wider font-semibold block">Kategori / Category</span>
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        <span className="rounded-lg bg-white/5 border border-white/5 px-2.5 py-1 text-xs text-white/70 font-semibold">{app.category}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
