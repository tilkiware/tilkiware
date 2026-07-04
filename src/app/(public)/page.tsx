"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, Sparkles, Zap, ShieldCheck, HelpCircle, Users, Package, Star, DollarSign, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AppCard } from "@/components/features/AppCard";
import { useLanguage } from "@/context/LanguageContext";
import { useApp } from "@/context/AppContext";

export default function Home() {
  const { t, language } = useLanguage();
  const { apps, settings } = useApp();
  
  // Dynamic featured limit
  const featuredApps = apps.slice(0, settings.featuredCount || 3);

  // Slideshow State
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  
  // Teaser interactive state
  const [couponRevealed, setCouponRevealed] = useState(false);

  useEffect(() => {
    if (settings.slideshow && settings.slideshow.length > 1) {
      const timer = setInterval(() => {
        setActiveSlideIndex((prev) => (prev + 1) % settings.slideshow.length);
      }, 5000); // 5s Autoplay
      return () => clearInterval(timer);
    }
  }, [settings.slideshow]);

  const handlePrevSlide = (e: React.MouseEvent) => {
    e.preventDefault();
    if (settings.slideshow && settings.slideshow.length > 0) {
      setActiveSlideIndex((prev) => (prev - 1 + settings.slideshow.length) % settings.slideshow.length);
    }
  };

  const handleNextSlide = (e: React.MouseEvent) => {
    e.preventDefault();
    if (settings.slideshow && settings.slideshow.length > 0) {
      setActiveSlideIndex((prev) => (prev + 1) % settings.slideshow.length);
    }
  };

  // Ecosystem item mapping using dynamic translation keys
  const ecosystemItems = [
    { title: t("eco.feat1.title"), desc: t("eco.feat1.desc"), icon: Sparkles },
    { title: t("eco.feat2.title"), desc: t("eco.feat2.desc"), icon: Zap },
    { title: t("eco.feat3.title"), desc: t("eco.feat3.desc"), icon: ShieldCheck },
    { title: t("eco.feat4.title"), desc: t("eco.feat4.desc"), icon: HelpCircle }
  ];

  return (
    <div className="flex flex-col gap-24 py-12 md:py-20 relative overflow-hidden">
      {/* Background glowing gradients */}
      <div className="absolute top-[5%] left-[5%] h-[350px] w-[350px] rounded-full bg-brand/5 blur-[120px] pointer-events-none" />
      <div className="absolute top-[40%] right-[5%] h-[400px] w-[400px] rounded-full bg-[#ff9f1c]/3 blur-[140px] pointer-events-none" />

      {/* Hero Section (Two-Column Layout) */}
      <section className="container mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Left Column - Copywriting */}
          <div className="lg:col-span-7 flex flex-col items-start text-left gap-6">
            <div className="inline-flex items-center rounded-full border border-brand/20 bg-brand/5 px-3.5 py-1.5 text-xs font-bold text-[#ff9f1c] backdrop-blur-xl shadow-sm">
              <span className="flex h-2 w-2 rounded-full bg-brand mr-2 animate-pulse shadow-[0_0_8px_#ff5a1f]"></span>
              {t("hero.badge")}
            </div>

            <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl text-white leading-[1.1] pb-1">
              {language === "tr" ? (
                <>
                  Shopify Mağazanızı <br className="hidden sm:inline" />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand via-[#ff9f1c] to-white">Premium</span> Uygulamalarla Yükseltin
                </>
              ) : (
                <>
                  Elevate Your Shopify Store with <br className="hidden sm:inline" />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand via-[#ff9f1c] to-white">Premium</span> Apps
                </>
              )}
            </h1>

            <p className="text-lg text-white/60 max-w-[640px] leading-relaxed">
              {t("hero.description")}
            </p>

            <div className="flex flex-wrap items-center gap-4 mt-2">
              <Link href="/apps">
                <Button size="lg" className="h-12 px-8 text-base bg-fox-gradient hover:opacity-90 shadow-[0_0_20px_rgba(255,90,31,0.25)] hover:shadow-[0_0_25px_rgba(255,90,31,0.45)] transition-all duration-300 font-bold">
                  {t("hero.cta.browse")}
                </Button>
              </Link>
              <Link href="/about">
                <Button variant="outline" size="lg" className="h-12 px-8 text-base border-white/10 hover:border-brand/40 hover:bg-brand/10 hover:text-brand transition-all duration-300 font-semibold">
                  {t("hero.cta.learn")}
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Column - Premium Dashboard Mockup UI */}
          <div className="lg:col-span-5 relative w-full flex justify-center">
            {/* Ambient logo glow behind card */}
            <div className="absolute inset-0 bg-brand/10 blur-[80px] rounded-full pointer-events-none" />

            <div className="w-full max-w-[420px] rounded-2xl border border-white/10 bg-[#110f0d]/90 p-5 shadow-2xl backdrop-blur-xl relative hover:border-brand/35 transition-all duration-500 group">
              {/* Mockup Header */}
              <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-4">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-red-500/80"></div>
                  <div className="h-3 w-3 rounded-full bg-yellow-500/80"></div>
                  <div className="h-3 w-3 rounded-full bg-green-500/80"></div>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] font-bold text-white/40 uppercase tracking-widest bg-white/5 px-2 py-0.5 rounded border border-white/5">
                  <span className="flex h-1.5 w-1.5 rounded-full bg-brand animate-pulse"></span>
                  Live Monitor
                </div>
              </div>

              {/* Mockup Body Content */}
              <div className="space-y-4">
                {/* Analytics Stat widget */}
                <div className="bg-white/[0.02] border border-white/5 rounded-xl p-3.5 flex items-center justify-between">
                  <div className="space-y-1">
                    <span className="text-[10px] font-semibold text-white/40 uppercase tracking-wider block">Günlük Satışlar / Daily Sales</span>
                    <span className="text-xl font-extrabold text-white tracking-tight">$3,842.50</span>
                  </div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand/10 text-brand">
                    <DollarSign className="h-5 w-5" />
                  </div>
                </div>

                {/* Simulated Graph Widget */}
                <div className="bg-white/[0.02] border border-white/5 rounded-xl p-3.5 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-semibold text-white/40 uppercase tracking-wider block">Dönüşüm Oranı / Conversion Rate</span>
                    <span className="text-xs font-bold text-green-400">+4.8%</span>
                  </div>
                  {/* CSS simulated line/bar chart */}
                  <div className="h-20 flex items-end gap-2.5 pt-2">
                    {[35, 55, 45, 65, 85, 70, 95].map((height, i) => (
                      <div key={i} className="flex-1 bg-white/10 rounded-t-sm relative group/bar hover:bg-brand/20 transition-all cursor-pointer" style={{ height: `${height}%` }}>
                        <div className={`absolute inset-0 bg-fox-gradient rounded-t-sm transition-opacity duration-300 ${i === 6 ? "opacity-100" : "opacity-0 group-hover/bar:opacity-100"}`}></div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Overlap notification card */}
                <div className="bg-white/[0.03] border border-brand/20 shadow-[0_0_15px_rgba(255,90,31,0.08)] rounded-xl p-3 flex items-center gap-3 transform translate-x-2 translate-y-1 border-l-4 border-l-brand hover:translate-x-0 transition-transform duration-300">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand/15 text-brand shrink-0 text-sm">
                    🦊
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-white leading-tight">PixelPop Active</p>
                    <p className="text-[10px] text-white/50 truncate">Email list grows by +12 users today.</p>
                  </div>
                  <span className="text-[9px] font-semibold text-white/30 uppercase tracking-wider shrink-0">Just Now</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats/Trust Section */}
      <section className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: t("stats.users"), value: "10k+", icon: Users, desc: "Aktif Satıcı / Active Merchants" },
            { label: t("stats.rating"), value: "4.9/5", icon: Star, desc: "Ortalama Puan / Average Rating" },
            { label: t("stats.custom"), value: "50+", icon: Package, desc: "Özel Uygulamalar / Apps Built" },
            { label: t("stats.support"), value: "24/7", icon: HelpCircle, desc: "Destek Süresi / Support SLA" },
          ].map((stat, i) => (
            <div key={i} className="flex flex-col items-center justify-center p-6 rounded-2xl border border-white/5 bg-white/[0.01] backdrop-blur-sm hover:border-brand/30 hover:bg-white/[0.03] transition-all duration-300 group text-center shadow-sm">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-white/50 group-hover:bg-brand/10 group-hover:text-brand transition-all duration-300 mb-3 shadow-inner">
                <stat.icon className="h-5 w-5" />
              </div>
              <span className="text-3xl font-extrabold text-white tracking-tight">{stat.value}</span>
              <span className="text-sm font-semibold text-white/80 mt-1">{stat.label}</span>
              <span className="text-[10px] text-white/40 mt-1">{stat.desc}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Apps Section */}
      <section className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-12">
          <div className="flex flex-col gap-2">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              {t("featured.title")}
            </h2>
            <p className="text-white/50 text-sm leading-relaxed">{t("featured.description")}</p>
          </div>
          <Link href="/apps">
            <Button variant="ghost" className="text-white/70 hover:text-brand hover:bg-white/5 font-semibold transition-all">
              {t("featured.viewAll")} <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-12">
          {featuredApps.map((app) => (
            <AppCard key={app.id} app={app} />
          ))}
        </div>

        {/* Dynamic Slideshow Section */}
        {settings.slideshow && settings.slideshow.length > 0 && (
          <div className="space-y-8 pt-16 border-t border-white/5">
            <div className="flex flex-col gap-2">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl flex items-center gap-2.5">
                <Sparkles className="h-6 w-6 text-brand" /> {t("showcase.title")}
              </h2>
              <p className="text-white/50 text-sm leading-relaxed">{t("showcase.description")}</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              {/* Left Column: Interactive Image Carousel */}
              <div className="lg:col-span-7 xl:col-span-8 relative rounded-2xl overflow-hidden border border-white/10 aspect-[16/9] lg:h-auto shadow-2xl bg-[#090807] group min-h-[220px] sm:min-h-[320px]">
                {/* Active Slide Image */}
                <div className="absolute inset-0 select-none">
                  <Link href={`/apps/${settings.slideshow[activeSlideIndex]?.appSlug}`}>
                    <img 
                      src={settings.slideshow[activeSlideIndex]?.imageUrl} 
                      alt="Slideshow Showcase" 
                      className="h-full w-full object-cover group-hover:scale-[1.01] transition-transform duration-700 cursor-pointer" 
                    />
                  </Link>
                  {/* Elegant dark bottom/side gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
                </div>

                {/* Prev/Next buttons (sleek circle triggers that pop on hover) */}
                {settings.slideshow.length > 1 && (
                  <>
                    <button 
                      onClick={handlePrevSlide} 
                      className="absolute left-4 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full bg-black/60 hover:bg-brand text-white flex items-center justify-center border border-white/10 hover:border-brand/40 opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer z-30"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button 
                      onClick={handleNextSlide} 
                      className="absolute right-4 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full bg-black/60 hover:bg-brand text-white flex items-center justify-center border border-white/10 hover:border-brand/40 opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer z-30"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>

                    {/* Slim Bar Indicator Dots (bottom-right) */}
                    <div className="absolute bottom-4 right-4 flex gap-1.5 z-20">
                      {settings.slideshow.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setActiveSlideIndex(idx)}
                          className={`h-1.5 rounded-full transition-all cursor-pointer ${
                            activeSlideIndex === idx 
                              ? "bg-brand w-6 shadow-[0_0_8px_#ff5a1f]" 
                              : "bg-white/20 w-3 hover:bg-white/50"
                          }`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* Right Column: Application Details Info Section */}
              {(() => {
                const targetApp = apps.find(a => a.slug === settings.slideshow[activeSlideIndex]?.appSlug);
                if (targetApp) {
                  return (
                    <div className="lg:col-span-5 xl:col-span-4 flex flex-col justify-between p-6 sm:p-8 rounded-2xl border border-white/10 bg-[#110f0d]/90 backdrop-blur-xl shadow-2xl hover:border-brand/35 transition-all duration-500 relative overflow-hidden group/info">
                      {/* Decorative corner glow */}
                      <div className="absolute -top-12 -right-12 h-24 w-24 rounded-full bg-brand/5 blur-[30px] pointer-events-none group-hover/info:bg-brand/10 transition-colors duration-500" />
                      
                      <div className="space-y-6">
                        {/* Logo & Category Row */}
                        <div className="flex items-center gap-4">
                          <div className="h-16 w-16 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-3xl shrink-0 overflow-hidden shadow-inner group-hover/info:border-brand/30 transition-all duration-300">
                            {targetApp.logoUrl ? (
                              <img src={targetApp.logoUrl} alt={targetApp.name} className="h-full w-full object-cover" />
                            ) : (
                              <span>🚀</span>
                            )}
                          </div>
                          <div className="space-y-1 min-w-0">
                            <span className="inline-flex items-center text-[10px] font-bold uppercase tracking-wider text-[#ff9f1c] bg-brand/5 border border-brand/20 px-2.5 py-0.5 rounded-full">
                              {targetApp.category}
                            </span>
                            <h4 className="text-xl font-black text-white truncate group-hover/info:text-[#ff9f1c] transition-colors">{targetApp.name}</h4>
                          </div>
                        </div>

                        {/* Ratings & Price */}
                        <div className="flex items-center justify-between border-y border-white/5 py-3">
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm font-bold text-white">{targetApp.rating}</span>
                            <span className="text-xs text-white/40">({targetApp.reviewCount})</span>
                          </div>
                          <div className="text-right">
                            <span className="text-xs text-white/40 block leading-none mb-1">{t("detail.price")}</span>
                            <span className="text-sm font-extrabold text-white">{targetApp.pricing}</span>
                          </div>
                        </div>

                        {/* Description & Features */}
                        <div className="space-y-4">
                          <p className="text-sm text-white/60 leading-relaxed line-clamp-3">
                            {targetApp.description}
                          </p>
                          {targetApp.features && targetApp.features.length > 0 && (
                            <div className="space-y-2 pt-1">
                              <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest block">
                                {t("detail.keyFeatures")}
                              </span>
                              <ul className="grid grid-cols-1 gap-1.5">
                                {targetApp.features.slice(0, 3).map((feat, i) => (
                                  <li key={i} className="text-xs text-white/70 flex items-center gap-2">
                                    <span className="h-1.5 w-1.5 rounded-full bg-brand shrink-0"></span>
                                    <span className="truncate">{feat}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* View Details Action Button */}
                      <div className="pt-6">
                        <Link href={`/apps/${targetApp.slug}`} className="block">
                          <Button className="w-full h-11 bg-fox-gradient hover:opacity-90 transition-all font-bold flex items-center justify-center gap-2 text-sm cursor-pointer shadow-[0_0_15px_rgba(255,90,31,0.15)]">
                            {t("card.viewDetails")} <ArrowRight className="h-4 w-4" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  );
                }
                return null;
              })()}
            </div>
          </div>
        )}
      </section>

      {/* Ecosystem Section */}
      <section className="container mx-auto px-4 md:px-6">
        <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-8 md:p-12 backdrop-blur-md relative overflow-hidden">
          <div className="grid md:grid-cols-12 gap-12 items-center">
            {/* Left side text info */}
            <div className="md:col-span-7 space-y-6">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">{t("eco.title")}</h2>
              
              <div className="grid gap-4 sm:grid-cols-2">
                {ecosystemItems.map((item, i) => (
                  <div key={i} className="flex gap-3 p-4 rounded-xl border border-white/5 bg-black/20 hover:border-brand/30 transition-all duration-300 group">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand/10 text-brand group-hover:bg-brand group-hover:text-white transition-all shrink-0">
                      <item.icon className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white mb-0.5">{item.title}</h4>
                      <p className="text-xs text-white/50 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right side floating teaser widget (Claim Discount Coupon Game) */}
            <div className="md:col-span-5 relative h-[320px] w-full rounded-2xl overflow-hidden bg-gradient-to-tr from-brand/15 to-[#ff9f1c]/10 border border-brand/25 flex flex-col items-center justify-center p-6 shadow-xl group">
              <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-15"></div>
              
              {/* Dynamic Background Circles */}
              <div className="absolute top-10 left-10 h-16 w-16 rounded-full bg-brand/10 blur-xl group-hover:scale-150 transition-transform duration-500"></div>
              <div className="absolute bottom-10 right-10 h-20 w-20 rounded-full bg-[#ff9f1c]/10 blur-xl group-hover:scale-150 transition-transform duration-500"></div>

              {/* Conversion Alert Ticker simulation */}
              <div className="w-full bg-black/45 border border-white/5 backdrop-blur-md rounded-xl p-3 mb-4 space-y-1 z-10 shadow-lg text-left">
                <div className="flex items-center justify-between text-[9px] font-bold text-brand uppercase tracking-wider">
                  <span>{t("booster.tag")}</span>
                  <span className="flex h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse"></span>
                </div>
                <p className="text-xs font-semibold text-white">PixelPop Popups</p>
                <p className="text-[10px] text-white/50 leading-snug">
                  {t("booster.desc1")}<strong className="text-green-400 font-bold">+27%</strong>{t("booster.desc2")}
                </p>
              </div>

              {/* Interactive Coupon reveal state */}
              {couponRevealed ? (
                <div className="glass p-5 rounded-xl border border-brand/40 shadow-2xl relative z-10 text-center animate-fade-in w-full bg-black/35">
                  <span className="text-xs text-white/40 uppercase tracking-widest block font-semibold">{t("booster.congrats")} / {t("booster.unlocked")}</span>
                  <div className="my-2.5 px-4 py-2 border-2 border-dashed border-brand/40 bg-brand/5 rounded-lg text-lg font-extrabold text-white tracking-widest shadow-inner inline-block">
                    FOXBOOST20
                  </div>
                  <span className="text-[10px] text-brand block font-bold">{t("booster.discountText")}</span>
                </div>
              ) : (
                <div className="glass p-5 rounded-xl border border-white/10 shadow-xl relative z-10 text-center w-full bg-black/20 hover:border-brand/40 transition-colors duration-300">
                  <h3 className="text-sm font-bold text-white mb-1.5">{t("booster.claimTitle")}</h3>
                  <p className="text-[10px] text-white/50 leading-relaxed mb-3">{t("booster.claimDesc")}</p>
                  <Button 
                    onClick={() => setCouponRevealed(true)}
                    size="sm" 
                    className="w-full bg-fox-gradient hover:opacity-90 text-[11px] font-bold h-8 cursor-pointer shadow-md"
                  >
                    {t("booster.btnReveal")}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 md:px-6 pb-12">
        <div className="flex flex-col items-center justify-center text-center gap-6 py-20 rounded-3xl border border-brand/20 relative overflow-hidden bg-[#110f0d]/90 shadow-2xl">
          {/* Simulated linear developer-grid background overlay */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
            backgroundImage: `linear-gradient(to right, #ff5a1f 1px, transparent 1px), linear-gradient(to bottom, #ff5a1f 1px, transparent 1px)`,
            backgroundSize: '24px 24px'
          }}></div>
          
          <div className="absolute inset-0 bg-gradient-to-b from-brand/10 via-transparent to-transparent pointer-events-none" />

          <h2 className="text-3xl font-extrabold text-white sm:text-5xl tracking-tight relative z-10">
            {t("cta.title")}
          </h2>
          <p className="text-lg text-white/60 max-w-[600px] leading-relaxed relative z-10">
            {t("cta.description")}
          </p>
          <div className="flex gap-4 mt-4 relative z-10">
            <Link href="/apps">
              <Button size="lg" className="bg-fox-gradient hover:opacity-90 shadow-[0_0_25px_rgba(255,90,31,0.35)] hover:shadow-[0_0_30px_rgba(255,90,31,0.5)] transition-all duration-300 font-bold h-12 px-8 text-base">
                {t("cta.button")}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
