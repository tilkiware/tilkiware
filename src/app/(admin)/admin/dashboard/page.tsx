"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Package, Star, TrendingUp } from "lucide-react";
import { useApp } from "@/context/AppContext";

export default function DashboardPage() {
    const { apps } = useApp();

    // Dynamically calculate metrics
    const totalApps = apps.length;
    const totalReviews = apps.reduce((sum, app) => sum + app.reviewCount, 0);
    const averageRating = totalApps > 0 
        ? (apps.reduce((sum, app) => sum + app.rating, 0) / totalApps).toFixed(1) 
        : "0.0";
    
    // Simulate active users and estimated monthly revenue dynamically
    const simulatedActiveUsers = totalApps > 0
        ? `${((totalApps * 7.4) + 4.5).toFixed(1)}k`
        : "0";
    const simulatedRevenue = totalApps > 0
        ? `$${((totalApps * 1950) + 1200).toLocaleString()}`
        : "$0";

    const stats = [
        { label: "Toplam Uygulama / Total Apps", value: totalApps.toString(), icon: Package, change: "+1 bu ay / from last month" },
        { label: "Toplam İnceleme / Total Reviews", value: totalReviews.toLocaleString(), icon: Star, change: "+15% bu ay / from last month" },
        { label: "Aktif Kullanıcılar / Active Users", value: simulatedActiveUsers, icon: Users, change: "+5% bu ay / from last month" },
        { label: "Tahmini Ciro / Revenue Est.", value: simulatedRevenue, icon: TrendingUp, change: "+8% bu ay / from last month" },
    ];

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-white tracking-tight">Gösterge Paneli / Dashboard</h1>
                <p className="text-white/50 text-sm mt-1">Uygulama ekosisteminizin genel durumuna ve metriklerine göz atın.</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat, i) => (
                    <Card key={i} glass className="border-white/5 bg-white/[0.02]">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-semibold text-white/70">
                                {stat.label}
                            </CardTitle>
                            <stat.icon className="h-4.5 w-4.5 text-brand" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-white tracking-tight">{stat.value}</div>
                            {/* Average rating indicator helper */}
                            {stat.label.includes("Total Apps") && (
                                <p className="text-xs text-white/40 mt-1">Ortalama Puan: <strong className="text-brand">{averageRating} ★</strong></p>
                            )}
                            {!stat.label.includes("Total Apps") && (
                                <p className="text-xs text-white/40 mt-1">{stat.change}</p>
                            )}
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card glass className="col-span-4 border-white/5 bg-white/[0.02]">
                    <CardHeader>
                        <CardTitle className="text-white font-bold text-lg">Haftalık Ziyaret Grafiği / Weekly Visits</CardTitle>
                    </CardHeader>
                    <CardContent className="pl-2">
                        <div className="h-[220px] flex flex-col items-center justify-center text-white/20 border border-dashed border-white/5 rounded-xl bg-black/10 m-4 mt-0">
                            <TrendingUp className="h-8 w-8 text-brand/35 mb-2 animate-bounce" />
                            <span className="text-sm">Analitik Grafiği (Database Entegrasyonunda Aktifleşir)</span>
                        </div>
                    </CardContent>
                </Card>
                
                <Card glass className="col-span-3 border-white/5 bg-white/[0.02]">
                    <CardHeader>
                        <CardTitle className="text-white font-bold text-lg">Son Aktivite / Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {[
                                { title: "Yeni Uygulama Yayınlandı", time: "10 dakika önce", color: "bg-brand" },
                                { title: "İnceleme Puanı Alındı (+5 Yıldız)", time: "1 saat önce", color: "bg-green-500" },
                                { title: "Uygulama Bilgileri Güncellendi", time: "3 saat önce", color: "bg-yellow-500" }
                            ].map((activity, i) => (
                                <div key={i} className="flex items-center gap-4 hover:bg-white/[0.01] p-2 rounded-lg transition-colors">
                                    <div className={`h-2 w-2 rounded-full ${activity.color}`}></div>
                                    <div className="flex-1 space-y-0.5">
                                        <p className="text-sm font-medium leading-none text-white/90">{activity.title}</p>
                                        <p className="text-xs text-white/40">{activity.time}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
