"use client";

import Link from "next/link";
import { Star, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShopifyApp } from "@/lib/types";
import { useLanguage } from "@/context/LanguageContext";

interface AppCardProps {
    app: ShopifyApp;
}

export function AppCard({ app }: AppCardProps) {
    const { t } = useLanguage();

    return (
        <Link href={`/apps/${app.slug}`} className="block h-full">
            <Card glass className="group overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:bg-white/10 h-full flex flex-col justify-between">
                <CardContent className="p-6 flex flex-col justify-between h-full">
                    <div>
                        <div className="mb-4 flex items-start justify-between">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-white/20 to-white/5 text-2xl shadow-inner overflow-hidden">
                                {app.logoUrl ? (
                                    <img src={app.logoUrl} alt={app.name} className="h-full w-full object-cover" />
                                ) : (
                                    <span className="text-white">🚀</span>
                                )}
                            </div>
                            <div className="flex items-center gap-1 rounded-full bg-white/5 px-2 py-1 text-xs font-medium text-yellow-400">
                                <Star className="h-3 w-3 fill-yellow-400" />
                                <span>{app.rating}</span>
                                <span className="text-white/40">({app.reviewCount})</span>
                            </div>
                        </div>

                        <div className="mb-2">
                            <span className="text-xs font-medium text-brand">{app.category}</span>
                            <h3 className="mt-1 text-lg font-bold text-white group-hover:text-[#ff9f1c] transition-colors">
                                {app.name}
                            </h3>
                        </div>

                        <p className="mb-6 text-sm text-white/60 line-clamp-2">
                            {app.description}
                        </p>
                    </div>

                    <div className="flex items-center justify-between mt-auto gap-4 pt-4 border-t border-white/5">
                        <span className="text-xs font-bold text-white/60 bg-white/5 border border-white/10 px-2.5 py-1 rounded-lg">
                            {app.pricing || t("detail.free")}
                        </span>
                        <Button variant="ghost" size="sm" className="text-white/60 group-hover:text-brand transition-all p-0 hover:bg-transparent flex items-center gap-1 font-semibold text-xs cursor-pointer">
                            {t("card.viewDetails")} <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </Link>
    );
}
