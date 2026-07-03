"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Twitter, Github, Linkedin, Globe, ArrowUp, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";
import { useApp } from "@/context/AppContext";

export function Footer() {
    const { t } = useLanguage();
    const { settings } = useApp();
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [showBackToTop, setShowBackToTop] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setShowBackToTop(window.scrollY > 300);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleSubscribe = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubscribed(true);
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const socialLinks = [
        { icon: Twitter, href: settings.socialTwitter || "#" },
        { icon: Github, href: settings.socialGithub || "#" },
        { icon: Linkedin, href: settings.socialLinkedin || "#" },
        { icon: Globe, href: settings.socialGlobe || "#" }
    ];

    return (
        <footer className="border-t border-white/5 bg-black/60 backdrop-blur-xl mt-auto relative overflow-hidden">
            {/* Background ambient glow in footer */}
            <div className="absolute bottom-[-100px] left-[10%] h-[200px] w-[400px] rounded-full bg-brand/5 blur-[80px] pointer-events-none" />

            <div className="container mx-auto py-16 px-4 md:px-6 relative z-10">
                <div className="grid grid-cols-1 gap-12 md:grid-cols-5">
                    {/* Brand column */}
                    <div className="md:col-span-2 flex flex-col gap-5">
                        <Link href="/" className="flex items-center gap-2.5 group">
                            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 border border-white/10 group-hover:border-brand/40 group-hover:bg-brand/10 transition-all duration-300 p-1.5">
                                <img src="/logo.png" alt="TilkiWare Logo" className="h-full w-full object-contain" />
                            </div>
                            <span className="text-lg font-bold tracking-tight text-white transition-colors duration-300">
                                <span className="text-brand group-hover:text-[#ff9f1c] transition-colors">Tilki</span>Ware
                            </span>
                        </Link>
                        <p className="text-sm text-white/50 leading-relaxed max-w-sm">
                            {t("footer.description")}
                        </p>
                        {/* Social Media icons */}
                        <div className="flex items-center gap-3 mt-2">
                            {socialLinks.map((social, i) => (
                                <a
                                    key={i}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex h-8.5 w-8.5 items-center justify-center rounded-lg bg-white/5 border border-white/5 text-white/50 hover:text-brand hover:border-brand/40 hover:bg-brand/10 hover:-translate-y-1 hover:scale-105 hover:shadow-[0_0_15px_rgba(255,90,31,0.25)] transition-all duration-300 shadow-sm"
                                >
                                    <social.icon className="h-4.5 w-4.5" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Navigation Columns */}
                    <div>
                        <h3 className="mb-4 text-xs font-semibold text-white tracking-wider uppercase">{t("footer.title.product")}</h3>
                        <ul className="space-y-2.5 text-sm">
                            {[
                                { name: t("footer.link.all"), path: "/apps" },
                                { name: t("footer.link.feat"), path: "#" },
                                { name: t("footer.link.new"), path: "#" }
                            ].map((link, i) => (
                                <li key={i}>
                                    <Link href={link.path} className="group flex items-center gap-0.5 text-white/50 hover:text-brand hover:translate-x-1 transition-all duration-300">
                                        <span>{link.name}</span>
                                        <ChevronRight className="h-3 w-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="mb-4 text-xs font-semibold text-white tracking-wider uppercase">{t("footer.title.company")}</h3>
                        <ul className="space-y-2.5 text-sm">
                            {[
                                { name: t("footer.link.about"), path: "/about" },
                                { name: t("footer.link.careers"), path: "#" },
                                { name: t("nav.contact"), path: "/contact" }
                            ].map((link, i) => (
                                <li key={i}>
                                    <Link href={link.path} className="group flex items-center gap-0.5 text-white/50 hover:text-brand hover:translate-x-1 transition-all duration-300">
                                        <span>{link.name}</span>
                                        <ChevronRight className="h-3 w-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Newsletter Subscription column */}
                    <div className="flex flex-col gap-4">
                        <h3 className="text-xs font-semibold text-white tracking-wider uppercase">Bülten / Newsletter</h3>
                        
                        {isSubscribed ? (
                            <div className="rounded-xl border border-green-500/20 bg-green-500/5 p-4 text-center space-y-2 flex flex-col items-center justify-center h-28 animate-pulse">
                                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500/20 text-green-400 text-sm font-bold">✓</span>
                                <span className="text-xs font-bold text-green-400">
                                    {t("tr") === "tr" ? "Kayıt Başarılı!" : "Subscribed!"}
                                </span>
                            </div>
                        ) : (
                            <>
                                <p className="text-xs text-white/50 leading-relaxed">
                                    {t("tr") === "tr" ? "Yeni uygulamalar ve güncellemelerden haberdar olun." : "Get updates on new Shopify apps and features."}
                                </p>
                                <form onSubmit={handleSubscribe} className="flex gap-2 mt-1">
                                    <Input 
                                        type="email" 
                                        required
                                        placeholder="e-posta adresi / email..." 
                                        className="bg-black/40 border-white/10 focus:border-brand/40 focus:ring-brand/40 text-xs h-9.5 text-white" 
                                    />
                                    <Button 
                                        type="submit"
                                        size="sm" 
                                        className="bg-fox-gradient hover:opacity-90 text-xs px-3 font-semibold h-9.5 cursor-pointer shrink-0"
                                    >
                                        {t("tr") === "tr" ? "Kayıt Ol" : "Join"}
                                    </Button>
                                </form>
                            </>
                        )}
                    </div>
                </div>

                <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 md:flex-row text-xs text-white/40">
                    <p>{t("footer.copyright")}</p>
                    <div className="flex items-center gap-6">
                        <Link href="#" className="hover:text-white transition-colors">{t("footer.link.privacy")}</Link>
                        <Link href="#" className="hover:text-white transition-colors">{t("footer.link.terms")}</Link>
                    </div>
                </div>
            </div>

            {/* Floating Back to Top Button */}
            {showBackToTop && (
                <button
                    onClick={scrollToTop}
                    className="fixed bottom-6 right-6 h-10 w-10 rounded-full border border-brand/20 bg-brand/10 hover:bg-brand/20 text-brand backdrop-blur-md flex items-center justify-center hover:scale-110 shadow-lg shadow-brand/[0.05] hover:shadow-[0_0_15px_rgba(255,90,31,0.25)] transition-all duration-300 z-50 cursor-pointer animate-fade-in"
                >
                    <ArrowUp className="h-4.5 w-4.5" />
                </button>
            )}
        </footer>
    );
}
