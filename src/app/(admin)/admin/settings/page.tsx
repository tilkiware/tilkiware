"use client";

import { useState } from "react";
import { Save, Upload, Trash2, Plus, ArrowRight, Settings, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useApp } from "@/context/AppContext";
import { AppSettings, PageContent } from "@/lib/types";

export default function AdminSettingsPage() {
    const { apps, settings, updateSettings, aboutPage, contactPage, updatePage } = useApp();
    
    // Tab state
    const [activeTab, setActiveTab] = useState<"general" | "pages">("general");

    // General Settings states
    const [featuredCount, setFeaturedCount] = useState(settings.featuredCount);
    const [socialTwitter, setSocialTwitter] = useState(settings.socialTwitter);
    const [socialGithub, setSocialGithub] = useState(settings.socialGithub);
    const [socialLinkedin, setSocialLinkedin] = useState(settings.socialLinkedin);
    const [socialGlobe, setSocialGlobe] = useState(settings.socialGlobe);
    const [slideshowList, setSlideshowList] = useState(settings.slideshow || []);
    const [newSlideImage, setNewSlideImage] = useState("");
    const [newSlideAppSlug, setNewSlideAppSlug] = useState("");

    // About Page states
    const [aboutTitleTr, setAboutTitleTr] = useState(aboutPage.titleTr);
    const [aboutTitleEn, setAboutTitleEn] = useState(aboutPage.titleEn);
    const [aboutDescTr, setAboutDescTr] = useState(aboutPage.descTr);
    const [aboutDescEn, setAboutDescEn] = useState(aboutPage.descEn);
    const [aboutExtraTr, setAboutExtraTr] = useState(aboutPage.extraTr || "");
    const [aboutExtraEn, setAboutExtraEn] = useState(aboutPage.extraEn || "");

    // Contact Page states
    const [contactTitleTr, setContactTitleTr] = useState(contactPage.titleTr);
    const [contactTitleEn, setContactTitleEn] = useState(contactPage.titleEn);
    const [contactDescTr, setContactDescTr] = useState(contactPage.descTr);
    const [contactDescEn, setContactDescEn] = useState(contactPage.descEn);
    const [contactExtraTr, setContactExtraTr] = useState(contactPage.extraTr || "");
    const [contactExtraEn, setContactExtraEn] = useState(contactPage.extraEn || "");

    const handleSlideImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setNewSlideImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleAddSlide = () => {
        if (!newSlideImage) {
            alert("Lütfen slayt görseli seçin.");
            return;
        }
        if (!newSlideAppSlug) {
            alert("Lütfen hedeflenecek uygulamayı seçin.");
            return;
        }

        const newSlide = {
            id: Math.random().toString(),
            imageUrl: newSlideImage,
            appSlug: newSlideAppSlug
        };

        setSlideshowList([...slideshowList, newSlide]);
        setNewSlideImage("");
        setNewSlideAppSlug("");
    };

    const handleDeleteSlide = (id: string) => {
        setSlideshowList(slideshowList.filter(s => s.id !== id));
    };

    const handleSaveGeneralSettings = async (e: React.FormEvent) => {
        e.preventDefault();
        
        const updatedSettings: AppSettings = {
            featuredCount: Number(featuredCount),
            socialTwitter,
            socialGithub,
            socialLinkedin,
            socialGlobe,
            slideshow: slideshowList
        };

        await updateSettings(updatedSettings);
        alert("Genel ayarlar başarıyla kaydedildi!");
    };

    const handleSavePageSettings = async (e: React.FormEvent) => {
        e.preventDefault();

        // 1. Update About Page
        const updatedAbout: PageContent = {
            slug: "about",
            titleTr: aboutTitleTr,
            titleEn: aboutTitleEn,
            descTr: aboutDescTr,
            descEn: aboutDescEn,
            extraTr: aboutExtraTr,
            extraEn: aboutExtraEn
        };
        await updatePage("about", updatedAbout);

        // 2. Update Contact Page
        const updatedContact: PageContent = {
            slug: "contact",
            titleTr: contactTitleTr,
            titleEn: contactTitleEn,
            descTr: contactDescTr,
            descEn: contactDescEn,
            extraTr: contactExtraTr,
            extraEn: contactExtraEn
        };
        await updatePage("contact", updatedContact);

        alert("Sayfa içerikleri başarıyla kaydedildi!");
    };

    return (
        <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
                        <Settings className="h-8 w-8 text-brand" /> Sistem Ayarları / System Settings
                    </h1>
                    <p className="text-white/50 text-sm mt-1">Uygulama genel ayarlarını, slaytları ve dinamik sayfa içeriklerini yönetin.</p>
                </div>

                {/* Glass Tab Selector */}
                <div className="flex items-center rounded-xl bg-white/[0.03] p-1 border border-white/10 shrink-0 self-start sm:self-auto">
                    <button
                        onClick={() => setActiveTab("general")}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all duration-300 cursor-pointer ${
                            activeTab === "general"
                                ? "bg-brand text-white shadow-[0_0_12px_rgba(255,90,31,0.3)]"
                                : "text-white/50 hover:text-white/80"
                        }`}
                    >
                        <Settings className="h-3.5 w-3.5" /> Genel & Slaytlar
                    </button>
                    <button
                        onClick={() => setActiveTab("pages")}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all duration-300 cursor-pointer ${
                            activeTab === "pages"
                                ? "bg-brand text-white shadow-[0_0_12px_rgba(255,90,31,0.3)]"
                                : "text-white/50 hover:text-white/80"
                        }`}
                    >
                        <FileText className="h-3.5 w-3.5" /> Sayfa Yönetimi
                    </button>
                </div>
            </div>

            {activeTab === "general" ? (
                <form onSubmit={handleSaveGeneralSettings} className="space-y-8">
                    <div className="grid gap-6 md:grid-cols-2">
                        {/* General display limits & socials */}
                        <Card glass className="border-white/5 bg-white/[0.02] flex flex-col justify-between">
                            <CardHeader>
                                <CardTitle className="text-white text-lg font-bold">Görünüm Ayarları / Display Configs</CardTitle>
                                <CardDescription className="text-white/50">Ana sayfada ve alt kısımda yer alan temel parametreler.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-white/70 block">
                                        Öne Çıkan Uygulama Sayısı / Featured Apps Limit
                                    </label>
                                    <Input
                                        type="number"
                                        min={1}
                                        max={20}
                                        value={featuredCount}
                                        onChange={(e) => setFeaturedCount(Number(e.target.value))}
                                        className="bg-black/40 border-white/10 text-white focus:border-brand/40 focus:ring-brand/40"
                                    />
                                    <span className="text-[10px] text-white/30">Ana sayfada kaç uygulamanın listeleneceğini belirler.</span>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-white/70 block">X (Twitter) Linki</label>
                                    <Input
                                        type="url"
                                        value={socialTwitter}
                                        onChange={(e) => setSocialTwitter(e.target.value)}
                                        className="bg-black/40 border-white/10 text-white focus:border-brand/40"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-white/70 block">GitHub Linki</label>
                                    <Input
                                        type="url"
                                        value={socialGithub}
                                        onChange={(e) => setSocialGithub(e.target.value)}
                                        className="bg-black/40 border-white/10 text-white focus:border-brand/40"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-white/70 block">LinkedIn Linki</label>
                                        <Input
                                            type="url"
                                            value={socialLinkedin}
                                            onChange={(e) => setSocialLinkedin(e.target.value)}
                                            className="bg-black/40 border-white/10 text-white focus:border-brand/40"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-white/70 block">Website Linki</label>
                                        <Input
                                            type="url"
                                            value={socialGlobe}
                                            onChange={(e) => setSocialGlobe(e.target.value)}
                                            className="bg-black/40 border-white/10 text-white focus:border-brand/40"
                                        />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Slideshow Slide Builder */}
                        <Card glass className="border-white/5 bg-white/[0.02]">
                            <CardHeader>
                                <CardTitle className="text-white text-lg font-bold">Yeni Slayt Ekle / Add Slide</CardTitle>
                                <CardDescription className="text-white/50">Ana sayfadaki slayt gösterisi (slideshow) için yeni görseller yükleyin.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-white/70 block">Slayt Banner Görseli</label>
                                    <div className="flex items-center gap-4">
                                        <div className="h-16 aspect-video rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-2xl overflow-hidden shrink-0">
                                            {newSlideImage ? (
                                                <img src={newSlideImage} alt="Slide Preview" className="h-full w-full object-cover" />
                                            ) : (
                                                <span className="text-white/20 text-xs">Banner</span>
                                            )}
                                        </div>
                                        <label className="cursor-pointer bg-white/5 hover:bg-white/10 border border-white/10 hover:border-brand/40 hover:text-brand rounded-lg px-4 py-2 text-sm text-white/80 hover:text-white transition-all font-medium inline-flex items-center gap-2">
                                            <Upload className="h-4 w-4" /> Banner Yükle
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleSlideImageChange}
                                                className="hidden"
                                            />
                                        </label>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-white/70 block">Yönlendirilecek Uygulama (Target App)</label>
                                    <select
                                        value={newSlideAppSlug}
                                        onChange={(e) => setNewSlideAppSlug(e.target.value)}
                                        className="w-full rounded-md border border-white/10 bg-black/40 pl-3 pr-10 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-brand/40 focus:border-brand/40 transition-all duration-300"
                                    >
                                        <option value="" disabled className="bg-stone-900 text-white/30">Uygulama seçin / Select App...</option>
                                        {apps.map((app) => (
                                            <option key={app.id} value={app.slug} className="bg-stone-900 text-white">
                                                {app.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <Button
                                    type="button"
                                    onClick={handleAddSlide}
                                    className="w-full border border-white/10 bg-white/5 text-white hover:border-brand/40 hover:bg-brand/10 hover:text-brand font-semibold transition-all mt-2 cursor-pointer"
                                >
                                    <Plus className="h-4 w-4 mr-2" /> Listeye Slayt Ekle
                                </Button>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Slideshow List */}
                    <Card glass className="border-white/5 bg-white/[0.02]">
                        <CardHeader>
                            <CardTitle className="text-white text-lg font-bold">Aktif Slayt Gösterisi Listesi / Slides List</CardTitle>
                            <CardDescription className="text-white/50">Yayınlanan slaytlar. Görsellerin üzerine tıklayınca belirlenen detay sayfası açılır.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                                {slideshowList.map((slide) => (
                                    <div key={slide.id} className="relative rounded-xl overflow-hidden border border-white/10 bg-black/50 group flex flex-col justify-between">
                                        <div className="aspect-video w-full relative overflow-hidden bg-black/40">
                                            <img src={slide.imageUrl} alt="Slide Item" className="h-full w-full object-cover" />
                                            <button
                                                type="button"
                                                onClick={() => handleDeleteSlide(slide.id)}
                                                className="absolute top-2 right-2 h-7 w-7 rounded-lg bg-black/80 hover:bg-red-500/20 text-white/60 hover:text-red-500 border border-white/10 flex items-center justify-center transition-all cursor-pointer"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        </div>
                                        <div className="p-3 bg-black/40 border-t border-white/5 flex items-center justify-between text-xs text-white/60 font-semibold">
                                            <span>Hedef: {slide.appSlug}</span>
                                            <ArrowRight className="h-3.5 w-3.5 text-brand" />
                                        </div>
                                    </div>
                                ))}
                                {slideshowList.length === 0 && (
                                    <div className="col-span-full border border-dashed border-white/10 rounded-xl py-12 text-center text-white/40 text-sm">
                                        Slayt eklenmemiş. Ana sayfada slayt gösterisi gizlenecektir.
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Submit bar */}
                    <div className="flex justify-end pt-4">
                        <Button type="submit" className="bg-fox-gradient hover:opacity-90 shadow-[0_0_20px_rgba(255,90,31,0.25)] font-bold text-white h-11 px-8 cursor-pointer">
                            <Save className="h-4.5 w-4.5 mr-2" /> Değişiklikleri Kaydet
                        </Button>
                    </div>
                </form>
            ) : (
                <form onSubmit={handleSavePageSettings} className="space-y-8 animate-fade-in">
                    <div className="grid gap-6 md:grid-cols-2">
                        {/* About Page Management */}
                        <Card glass className="border-white/5 bg-white/[0.02]">
                            <CardHeader>
                                <CardTitle className="text-white text-lg font-bold">Hakkımızda Sayfası / About Page</CardTitle>
                                <CardDescription className="text-white/50">Hakkımızda sayfa içeriğini ve misyonunu güncelleyin.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-xs font-semibold text-white/70 block">Başlık (TR)</label>
                                        <Input
                                            value={aboutTitleTr}
                                            onChange={(e) => setAboutTitleTr(e.target.value)}
                                            required
                                            className="bg-black/40 border-white/10 text-white focus:border-brand/40"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-semibold text-white/70 block">Title (EN)</label>
                                        <Input
                                            value={aboutTitleEn}
                                            onChange={(e) => setAboutTitleEn(e.target.value)}
                                            required
                                            className="bg-black/40 border-white/10 text-white focus:border-brand/40"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-semibold text-white/70 block">Açıklama (TR)</label>
                                    <Textarea
                                        value={aboutDescTr}
                                        onChange={(e) => setAboutDescTr(e.target.value)}
                                        required
                                        className="bg-black/40 border-white/10 text-white focus:border-brand/40 min-h-[90px] text-sm"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-semibold text-white/70 block">Description (EN)</label>
                                    <Textarea
                                        value={aboutDescEn}
                                        onChange={(e) => setAboutDescEn(e.target.value)}
                                        required
                                        className="bg-black/40 border-white/10 text-white focus:border-brand/40 min-h-[90px] text-sm"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-semibold text-white/70 block">Misyonumuz (TR)</label>
                                    <Textarea
                                        value={aboutExtraTr}
                                        onChange={(e) => setAboutExtraTr(e.target.value)}
                                        className="bg-black/40 border-white/10 text-white focus:border-brand/40 min-h-[80px] text-sm"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-semibold text-white/70 block">Our Mission (EN)</label>
                                    <Textarea
                                        value={aboutExtraEn}
                                        onChange={(e) => setAboutExtraEn(e.target.value)}
                                        className="bg-black/40 border-white/10 text-white focus:border-brand/40 min-h-[80px] text-sm"
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        {/* Contact Page Management */}
                        <Card glass className="border-white/5 bg-white/[0.02]">
                            <CardHeader>
                                <CardTitle className="text-white text-lg font-bold">İletişim Sayfası / Contact Page</CardTitle>
                                <CardDescription className="text-white/50">İletişim sayfasının başlık, açıklama ve e-posta adreslerini güncelleyin.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-xs font-semibold text-white/70 block">Başlık (TR)</label>
                                        <Input
                                            value={contactTitleTr}
                                            onChange={(e) => setContactTitleTr(e.target.value)}
                                            required
                                            className="bg-black/40 border-white/10 text-white focus:border-brand/40"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-semibold text-white/70 block">Title (EN)</label>
                                        <Input
                                            value={contactTitleEn}
                                            onChange={(e) => setContactTitleEn(e.target.value)}
                                            required
                                            className="bg-black/40 border-white/10 text-white focus:border-brand/40"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-semibold text-white/70 block">Açıklama (TR)</label>
                                    <Textarea
                                        value={contactDescTr}
                                        onChange={(e) => setContactDescTr(e.target.value)}
                                        required
                                        className="bg-black/40 border-white/10 text-white focus:border-brand/40 min-h-[90px] text-sm"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-semibold text-white/70 block">Description (EN)</label>
                                    <Textarea
                                        value={contactDescEn}
                                        onChange={(e) => setContactDescEn(e.target.value)}
                                        required
                                        className="bg-black/40 border-white/10 text-white focus:border-brand/40 min-h-[90px] text-sm"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-xs font-semibold text-white/70 block">Destek E-postası (Support Email)</label>
                                        <Input
                                            type="email"
                                            value={contactExtraTr}
                                            onChange={(e) => setContactExtraTr(e.target.value)}
                                            className="bg-black/40 border-white/10 text-white focus:border-brand/40"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-semibold text-white/70 block">Genel İletişim E-postası (General Email)</label>
                                        <Input
                                            type="email"
                                            value={contactExtraEn}
                                            onChange={(e) => setContactExtraEn(e.target.value)}
                                            className="bg-black/40 border-white/10 text-white focus:border-brand/40"
                                        />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Submit bar */}
                    <div className="flex justify-end pt-4">
                        <Button type="submit" className="bg-fox-gradient hover:opacity-90 shadow-[0_0_20px_rgba(255,90,31,0.25)] font-bold text-white h-11 px-8 cursor-pointer">
                            <Save className="h-4.5 w-4.5 mr-2" /> Sayfa İçeriklerini Kaydet
                        </Button>
                    </div>
                </form>
            )}
        </div>
    );
}
