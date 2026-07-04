"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Settings, LogOut, Package, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";

const sidebarItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/admin/dashboard" },
    { icon: Package, label: "Apps", href: "/admin/apps" },
    { icon: Settings, label: "Settings", href: "/admin/settings" },
];

interface AdminSidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

export function AdminSidebar({ isOpen, onClose }: AdminSidebarProps) {
    const pathname = usePathname();
    const { logout } = useAuth();

    return (
        <>
            {/* Mobile Sidebar Backdrop */}
            {isOpen && (
                <div 
                    className="fixed inset-0 z-40 bg-black/60 backdrop-blur-xs lg:hidden"
                    onClick={onClose}
                />
            )}

            <aside 
                className={cn(
                    "fixed left-0 top-0 bottom-0 z-50 w-64 border-r border-white/5 bg-[#0c0a09]/98 lg:bg-black/50 backdrop-blur-xl transition-transform duration-300 lg:translate-x-0",
                    isOpen ? "translate-x-0" : "-translate-x-full"
                )}
            >
                <div className="flex h-16 items-center justify-between border-b border-white/5 px-6">
                    <div className="flex items-center gap-2.5 font-bold text-white">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 border border-white/10 p-1.5">
                            <img src="/logo.png" alt="TilkiWare Logo" className="h-full w-full object-contain" />
                        </div>
                        <span>
                            <span className="text-brand">Tilki</span>Ware <span className="text-xs font-normal text-white/40 ml-1">Admin</span>
                        </span>
                    </div>

                    {/* Close Button on Mobile */}
                    <button 
                        onClick={onClose}
                        className="lg:hidden p-1.5 rounded-lg border border-white/10 text-white/70 hover:text-white hover:border-white/20 transition-all cursor-pointer"
                    >
                        <X className="h-4 w-4" />
                    </button>
                </div>

                <div className="flex flex-col justify-between h-[calc(100vh-64px)] p-4">
                    <nav className="space-y-1">
                        {sidebarItems.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={onClose}
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
                        onClick={() => {
                            onClose();
                            logout();
                        }}
                        className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-white/60 hover:bg-red-500/10 hover:text-red-500 transition-colors w-full text-left cursor-pointer"
                    >
                        <LogOut className="h-4 w-4" />
                        Logout
                    </button>
                </div>
            </aside>
        </>
    );
}
