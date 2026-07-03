"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, ShoppingBag, Settings, LogOut, Package } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";

const sidebarItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/admin/dashboard" },
    { icon: Package, label: "Apps", href: "/admin/apps" },
    { icon: Settings, label: "Settings", href: "/admin/settings" },
];

export function AdminSidebar() {
    const pathname = usePathname();
    const { logout } = useAuth();

    return (
        <aside className="fixed left-0 top-0 bottom-0 z-40 w-64 border-r border-white/5 bg-black/50 backdrop-blur-xl">
            <div className="flex h-16 items-center border-b border-white/5 px-6">
                <div className="flex items-center gap-2.5 font-bold text-white">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 border border-white/10 p-1.5">
                        <img src="/logo.png" alt="TilkiWare Logo" className="h-full w-full object-contain" />
                    </div>
                    <span>
                        <span className="text-brand">Tilki</span>Ware <span className="text-xs font-normal text-white/40 ml-1">Admin</span>
                    </span>
                </div>
            </div>

            <div className="flex flex-col justify-between h-[calc(100vh-64px)] p-4">
                <nav className="space-y-1">
                    {sidebarItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-300 border",
                                    isActive
                                        ? "bg-brand/10 border-brand/20 text-brand"
                                        : "border-transparent text-white/60 hover:bg-white/5 hover:text-white"
                                )}
                            >
                                <item.icon className="h-4 w-4" />
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>

                <button 
                    onClick={logout}
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-white/60 hover:bg-red-500/10 hover:text-red-500 transition-colors w-full text-left"
                >
                    <LogOut className="h-4 w-4" />
                    Logout
                </button>
            </div>
        </aside>
    );
}
