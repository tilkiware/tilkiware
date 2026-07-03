"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AdminSidebar } from "@/components/layout/AdminSidebar";
import { useAuth } from "@/context/AuthContext";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const router = useRouter();
    const { isAuthenticated } = useAuth();
    const [isLoading, setIsLoading] = useState(true);

    const isLoginPage = pathname === "/admin/login";

    useEffect(() => {
        if (!isAuthenticated && !isLoginPage) {
            router.push("/admin/login");
        } else if (isAuthenticated && isLoginPage) {
            router.push("/admin/dashboard");
        } else {
            setIsLoading(false);
        }
    }, [isAuthenticated, isLoginPage, router]);

    // Keep page hidden or show blank until auth status check redirects if needed
    if (isLoading) {
        return (
            <div className="min-h-screen bg-[#050505] flex items-center justify-center text-white/50 text-sm">
                Loading...
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

    return (
        <div className="min-h-screen bg-[#090807] text-white">
            <AdminSidebar />
            <main className="ml-64 p-8 min-h-screen">
                {children}
            </main>
        </div>
    );
}
