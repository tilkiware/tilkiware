"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import { AdminSidebar } from "@/components/layout/AdminSidebar";
import { useAuth } from "@/context/AuthContext";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const router = useRouter();
    const { isAuthenticated, isLoading } = useAuth();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const isLoginPage = pathname === "/admin/login";

    useEffect(() => {
        if (isLoading) return;
        
        if (!isAuthenticated && !isLoginPage) {
            router.push("/admin/login");
        } else if (isAuthenticated && isLoginPage) {
            router.push("/admin/dashboard");
        }
    }, [isAuthenticated, isLoading, isLoginPage, router]);

    // Close sidebar on path change
    useEffect(() => {
        setIsSidebarOpen(false);
    }, [pathname]);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-[#050505] flex items-center justify-center">
                <div className="flex flex-col items-center gap-3">
                    <div className="h-8 w-8 rounded-full border-2 border-brand/30 border-t-brand animate-spin" />
                    <span className="text-white/40 text-sm">Oturum doğrulanıyor...</span>
                </div>
            </div>
        );
    }

    if (isLoginPage) {
        return (
            <div className="min-h-screen bg-[#050505] flex items-center justify-center p-4">
                {children}
            </div>
        );
    }

    if (!isAuthenticated) {
        return null;
    }

    return (
        <div className="min-h-screen bg-[#090807] text-white">
            {/* Mobile Top Bar */}
            <header className="lg:hidden fixed top-0 left-0 right-0 h-16 border-b border-white/5 bg-[#090807]/90 backdrop-blur-md z-30 px-4 flex items-center justify-between">
                <div className="flex items-center gap-2.5 font-bold">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 border border-white/10 p-1">
                        <img src="/logo.png" alt="TilkiWare Logo" className="h-full w-full object-contain" />
                    </div>
                    <span className="text-sm">
                        <span className="text-brand">Tilki</span>Ware <span className="text-xs font-normal text-white/40 ml-1">Admin</span>
                    </span>
                </div>

                <button 
                    onClick={() => setIsSidebarOpen(true)}
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white/70 hover:text-brand hover:border-brand/40 transition-all cursor-pointer"
                >
                    <Menu className="h-5 w-5" />
                </button>
            </header>

            <AdminSidebar 
                isOpen={isSidebarOpen} 
                onClose={() => setIsSidebarOpen(false)} 
            />

            {/* Added pt-16 on mobile to push content below the top bar */}
            <main className="lg:ml-64 p-4 md:p-8 pt-20 lg:pt-8 min-h-screen">
                {children}
            </main>
        </div>
    );
}
