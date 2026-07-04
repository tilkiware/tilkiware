"use client";

import { useState } from "react";
import { Mail, Clock, Headphones, Send, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useLanguage } from "@/context/LanguageContext";
import { useApp } from "@/context/AppContext";

export default function ContactPage() {
    const { t, language } = useLanguage();
    const { contactPage } = useApp();
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitted(true);
    };

    const title = language === "tr" ? contactPage.titleTr : contactPage.titleEn;
    const description = language === "tr" ? contactPage.descTr : contactPage.descEn;
    const generalEmail = contactPage.extraEn || "hello@tilkiware.com";
    const supportEmail = contactPage.extraTr || "support@tilkiware.com";

    const infoCards = [
        { icon: Mail, title: t("contact.info.email.title"), value: generalEmail },
        { icon: Clock, title: t("contact.info.response.title"), value: t("contact.info.response.value") },
        { icon: Headphones, title: t("contact.info.support.title"), value: supportEmail },
    ];

    return (
        <div className="relative overflow-hidden min-h-screen">
            <div className="absolute top-[-80px] left-[50%] -translate-x-1/2 h-[400px] w-[700px] rounded-full bg-brand/8 blur-[130px] pointer-events-none" />

            <div className="container mx-auto px-4 md:px-6 py-16 md:py-24 relative z-10">
                {/* Hero Section */}
                <div className="max-w-3xl mx-auto text-center mb-16">
                    <div className="inline-flex items-center rounded-full border border-brand/20 bg-brand/5 px-3.5 py-1.5 text-xs font-bold text-[#ff9f1c] backdrop-blur-xl shadow-sm mb-6">
                        <span className="flex h-2 w-2 rounded-full bg-brand mr-2 animate-pulse shadow-[0_0_8px_#ff5a1f]"></span>
                        {t("contact.badge")}
                    </div>
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1] mb-6">
                        {title}
                    </h1>
                    <p className="text-lg text-white/60 leading-relaxed max-w-2xl mx-auto">
                        {description}
                    </p>
                </div>

                {/* Info Cards Row */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 mb-16">
                    {infoCards.map((card, i) => (
                        <div key={i} className="flex flex-col items-center justify-center p-6 rounded-2xl border border-white/5 bg-white/[0.01] backdrop-blur-sm hover:border-brand/30 hover:bg-white/[0.03] transition-all duration-300 group text-center">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-white/50 group-hover:bg-brand/10 group-hover:text-brand transition-all duration-300 mb-3">
                                <card.icon className="h-5 w-5" />
                            </div>
                            <span className="text-xs font-semibold text-white/40 uppercase tracking-wider">{card.title}</span>
                            <span className="text-sm font-bold text-white mt-1">{card.value}</span>
                        </div>
                    ))}
                </div>

                {/* Contact Form */}
                <div className="max-w-2xl mx-auto">
                    <div className="rounded-2xl border border-white/10 bg-[#110f0d]/80 backdrop-blur-xl p-8 md:p-10 shadow-xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 h-24 w-24 rounded-full bg-brand/5 blur-2xl pointer-events-none" />

                        {isSubmitted ? (
                            <div className="flex flex-col items-center justify-center py-12 text-center space-y-4">
                                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10 text-green-400 border border-green-500/20">
                                    <CheckCircle className="h-8 w-8" />
                                </div>
                                <p className="text-lg font-bold text-white">{t("contact.form.success")}</p>
                                <Button
                                    onClick={() => setIsSubmitted(false)}
                                    variant="outline"
                                    className="border-white/10 text-white/70 hover:border-brand/40 hover:text-brand mt-4"
                                >
                                    {t("contact.form.send")}
                                </Button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-white/70 block">{t("contact.form.name")}</label>
                                        <Input
                                            name="name"
                                            required
                                            className="bg-black/40 border-white/10 focus:border-brand/40 focus:ring-brand/40 text-white"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-white/70 block">{t("contact.form.email")}</label>
                                        <Input
                                            type="email"
                                            name="email"
                                            required
                                            className="bg-black/40 border-white/10 focus:border-brand/40 focus:ring-brand/40 text-white"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-white/70 block">{t("contact.form.subject")}</label>
                                    <Input
                                        name="subject"
                                        required
                                        className="bg-black/40 border-white/10 focus:border-brand/40 focus:ring-brand/40 text-white"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-white/70 block">{t("contact.form.message")}</label>
                                    <Textarea
                                        name="message"
                                        required
                                        className="bg-black/40 border-white/10 focus:border-brand/40 focus:ring-brand/40 text-white min-h-[140px]"
                                    />
                                </div>

                                <Button
                                    type="submit"
                                    className="w-full h-12 text-base bg-fox-gradient hover:opacity-90 shadow-[0_0_20px_rgba(255,90,31,0.2)] hover:shadow-[0_0_25px_rgba(255,90,31,0.35)] transition-all font-bold"
                                >
                                    <Send className="h-4 w-4 mr-2" />
                                    {t("contact.form.send")}
                                </Button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
