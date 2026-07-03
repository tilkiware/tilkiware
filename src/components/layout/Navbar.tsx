"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export function Navbar() {
    const { language, setLanguage, t } = useLanguage();
    const pathname = usePathname();
    
    const [scrollProgress, setScrollProgress] = useState(0);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
            if (totalHeight > 0) {
                setScrollProgress((window.scrollY / totalHeight) * 100);
            }
            setIsScrolled(window.scrollY > 20);
        };

        window.addEventListener("scroll", handleScroll);
        // Run once on mount
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Check if the current nav item is active
    const isActive = (path: string) => {
        if (path === "/") {
            return pathname === "/";
        }
        return pathname.startsWith(path);
    };

    return (
        <header 
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                isScrolled 
                    ? "border-b border-brand/10 bg-[#090807]/90 backdrop-blur-2xl shadow-[0_4px_30px_rgba(0,0,0,0.4)] shadow-brand/[0.01]" 
                    : "border-b border-white/5 bg-black/40 backdrop-blur-xl"
            }`}
        >
            {/* Top Scroll Progress Indicator */}
            <div 
                className="absolute top-0 left-0 h-[2px] bg-fox-gradient shadow-[0_0_10px_#ff5a1f] transition-all duration-75 pointer-events-none" 
                style={{ width: `${scrollProgress}%` }}
            />

            <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
                <Link href="/" className="flex items-center gap-2.5 group">
                    <div className="flex h-9.5 w-9.5 items-center justify-center rounded-xl bg-white/[0.03] border border-white/10 group-hover:border-brand/40 group-hover:bg-brand/10 group-hover:rotate-6 transition-all duration-300 p-1.5 shadow-md">
                        <img src="/logo.png" alt="TilkiWare Logo" className="h-full w-full object-contain" />
                    </div>
                    <span className="text-lg font-bold tracking-tight text-white transition-colors duration-300">
                        <span className="text-brand group-hover:text-[#ff9f1c] transition-colors">Tilki</span>Ware
                    </span>
                </Link>

                <nav className="hidden md:flex items-center gap-8">
                    {[
                        { name: t("nav.home"), path: "/" },
                        { name: t("nav.apps"), path: "/apps" },
                        { name: t("nav.about"), path: "/about" },
                        { name: t("nav.contact"), path: "/contact" }
                    ].map((item) => {
                        const active = isActive(item.path);
                        return (
                            <Link 
                                key={item.path} 
                                href={item.path} 
                                className={`text-sm font-semibold transition-all duration-300 relative py-1 flex flex-col items-center ${
                                    active 
                                        ? "text-brand" 
                                        : "text-white/60 hover:text-white"
                                }`}
                            >
                                <span>{item.name}</span>
                                <span className={`absolute bottom-[-6px] h-1.5 w-1.5 rounded-full bg-brand shadow-[0_0_8px_#ff5a1f] transition-all duration-300 ${
                                    active ? "opacity-100 scale-100" : "opacity-0 scale-50"
                                }`} />
                            </Link>
                        );
                    })}
                </nav>

                <div className="flex items-center gap-4">
                    {/* Premium Capsule Language Selector */}
                    <div className="flex items-center rounded-full bg-white/[0.04] p-0.5 border border-white/10 shadow-inner">
                        <button
                            onClick={() => setLanguage("tr")}
                            className={`px-3.5 py-1 rounded-full text-[10px] font-extrabold tracking-wider transition-all duration-300 cursor-pointer ${
                                language === "tr"
                                    ? "bg-brand text-white shadow-[0_0_10px_rgba(255,90,31,0.4)]"
                                    : "text-white/40 hover:text-white/80"
                            }`}
                        >
                            TR
                        </button>
                        <button
                            onClick={() => setLanguage("en")}
                            className={`px-3.5 py-1 rounded-full text-[10px] font-extrabold tracking-wider transition-all duration-300 cursor-pointer ${
                                language === "en"
                                    ? "bg-brand text-white shadow-[0_0_10px_rgba(255,90,31,0.4)]"
                                    : "text-white/40 hover:text-white/80"
                            }`}
                        >
                            EN
                        </button>
                    </div>

                    <Link href="/admin/dashboard">
                        <Button variant="ghost" size="sm" className="hidden md:flex text-white/70 hover:text-brand hover:bg-white/5 transition-all">
                            {t("nav.adminLogin")}
                        </Button>
                    </Link>
                    <Button variant="glass" size="sm" className="hidden md:flex hover:border-brand/40 hover:bg-brand/10 hover:text-brand hover:shadow-[0_0_15px_rgba(255,90,31,0.15)] transition-all duration-300">
                        {t("nav.getStarted")}
                    </Button>
                    <Button variant="ghost" size="icon" className="md:hidden text-white/70 hover:text-brand">
                        <Menu className="h-5 w-5" />
                    </Button>
                </div>
            </div>
        </header>
    );
}
