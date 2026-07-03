"use client";

import { useState } from "react";
import { Plus, Pencil, Trash2, Search, Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useApp } from "@/context/AppContext";
import { ShopifyApp } from "@/lib/types";

export default function AdminAppsPage() {
    const { apps, addApp, updateApp, deleteApp } = useApp();
    const [searchQuery, setSearchQuery] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [currentApp, setCurrentApp] = useState<ShopifyApp | null>(null);
    const [logoPreview, setLogoPreview] = useState<string>("");
    const [screenshotsPreviews, setScreenshotsPreviews] = useState<string[]>([]);

    const filteredApps = apps.filter((app) =>
        app.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleDelete = (id: string) => {
        if (confirm("Uygulamayı silmek istediğinizden emin misiniz?")) {
            deleteApp(id);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setLogoPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleScreenshotsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            const filesArray = Array.from(files);
            const loadedScreenshots: string[] = [];
            let loadedCount = 0;

            filesArray.forEach((file) => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    loadedScreenshots.push(reader.result as string);
                    loadedCount++;
                    if (loadedCount === filesArray.length) {
                        setScreenshotsPreviews((prev) => [...prev, ...loadedScreenshots]);
                    }
                };
                reader.readAsDataURL(file);
            });
        }
    };

    const removeScreenshot = (indexToRemove: number) => {
        setScreenshotsPreviews(screenshotsPreviews.filter((_, i) => i !== indexToRemove));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        
        // Parse features
        const featuresRaw = formData.get("features") as string;
        const features = featuresRaw 
            ? featuresRaw.split(",").map(f => f.trim()).filter(Boolean) 
            : [];

        const updatedApp: ShopifyApp = {
            id: currentApp ? currentApp.id : Math.random().toString(),
            name: formData.get("name") as string,
            slug: (formData.get("name") as string).toLowerCase().replace(/\s+/g, "-"),
            description: formData.get("description") as string,
            category: formData.get("category") as string,
            rating: currentApp ? currentApp.rating : 5.0,
            reviewCount: currentApp ? currentApp.reviewCount : 0,
            logoUrl: logoPreview, // base64
            installUrl: (formData.get("installUrl") as string) || "#",
            pricing: (formData.get("pricing") as string) || "Free plan available",
            features: features,
            screenshots: screenshotsPreviews, // Save screenshot array of base64
        };

        if (currentApp) {
            updateApp(updatedApp);
        } else {
            addApp(updatedApp);
        }
        setIsEditing(false);
    };

    const openEditModal = (app: ShopifyApp) => {
        setCurrentApp(app);
        setLogoPreview(app.logoUrl || "");
        setScreenshotsPreviews(app.screenshots || []);
        setIsEditing(true);
    };

    const openAddModal = () => {
        setCurrentApp(null);
        setLogoPreview("");
        setScreenshotsPreviews([]);
        setIsEditing(true);
    };

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-white tracking-tight">Uygulama Yönetimi</h1>
                    <p className="text-white/50 text-sm mt-1">TilkiWare vitrinindeki uygulamaları ekleyin, düzenleyin ve silin.</p>
                </div>
                <Button onClick={openAddModal} className="bg-fox-gradient hover:opacity-90 shadow-[0_0_15px_rgba(255,90,31,0.2)] font-semibold text-white">
                    <Plus className="mr-2 h-4 w-4" /> Yeni Uygulama Ekle
                </Button>
            </div>

            <Card glass className="border-white/5 bg-white/[0.02]">
                <CardHeader className="pb-4">
                    <div className="relative w-full max-w-sm">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/50" />
                        <Input
                            placeholder="Uygulamalarda ara..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-9 bg-black/40 border-white/10 focus:border-brand/40 focus:ring-brand/40"
                        />
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="rounded-xl border border-white/10 overflow-hidden bg-black/20">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-white/5 text-white/60 uppercase text-xs tracking-wider">
                                <tr>
                                    <th className="px-5 py-3.5 font-semibold">Uygulama Adı</th>
                                    <th className="px-5 py-3.5 font-semibold">Kategori</th>
                                    <th className="px-5 py-3.5 font-semibold">Derecelendirme</th>
                                    <th className="px-5 py-3.5 font-semibold">Görseller / Screens</th>
                                    <th className="px-5 py-3.5 font-semibold text-right">İşlemler</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5 text-white/80">
                                {filteredApps.map((app) => (
                                    <tr key={app.id} className="hover:bg-white/[0.02] transition-colors">
                                        <td className="px-5 py-4 font-semibold text-white flex items-center gap-3">
                                            <div className="h-9 w-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-lg overflow-hidden shrink-0">
                                                {app.logoUrl ? (
                                                    <img src={app.logoUrl} alt={app.name} className="h-full w-full object-cover" />
                                                ) : (
                                                    <span>🚀</span>
                                                )}
                                            </div>
                                            {app.name}
                                        </td>
                                        <td className="px-5 py-4">{app.category}</td>
                                        <td className="px-5 py-4">{app.rating} ({app.reviewCount})</td>
                                        <td className="px-5 py-4 text-white/60">
                                            {app.screenshots ? `${app.screenshots.length} Görsel` : "0 Görsel"}
                                        </td>
                                        <td className="px-5 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <Button variant="ghost" size="icon" className="h-8 w-8 text-white/60 hover:text-brand hover:bg-white/5" onClick={() => openEditModal(app)}>
                                                    <Pencil className="h-4.5 w-4.5" />
                                                </Button>
                                                <Button variant="ghost" size="icon" className="h-8 w-8 text-red-400 hover:text-red-300 hover:bg-red-500/10" onClick={() => handleDelete(app.id)}>
                                                    <Trash2 className="h-4.5 w-4.5" />
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {filteredApps.length === 0 && (
                                    <tr>
                                        <td colSpan={5} className="px-5 py-12 text-center text-white/40">
                                            Uygulama bulunamadı.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>

            {isEditing && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 overflow-y-auto">
                    <Card glass className="w-full max-w-xl border-white/10 bg-[#0c0a09]/95 shadow-2xl my-8">
                        <CardHeader>
                            <CardTitle className="text-white text-xl font-bold">{currentApp ? "Uygulamayı Düzenle" : "Yeni Uygulama Ekle"}</CardTitle>
                            <CardDescription className="text-white/50">Uygulama vitrini detaylarını güncelleyin.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form className="space-y-4" onSubmit={handleSubmit}>
                                {/* Logo File Upload */}
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-white/70 block">Uygulama Logosu</label>
                                    <div className="flex items-center gap-4">
                                        <div className="h-16 w-16 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-2xl overflow-hidden shrink-0">
                                            {logoPreview ? (
                                                <img src={logoPreview} alt="Logo Önizleme" className="h-full w-full object-cover" />
                                            ) : (
                                                <span className="text-white/40">🦊</span>
                                            )}
                                        </div>
                                        <label className="cursor-pointer bg-white/5 hover:bg-white/10 border border-white/10 hover:border-brand/40 hover:text-brand rounded-lg px-4 py-2 text-sm text-white/80 hover:text-white transition-all font-medium inline-flex items-center gap-2">
                                            <Upload className="h-4 w-4" /> Logo Yükle
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleFileChange}
                                                className="hidden"
                                            />
                                        </label>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label htmlFor="name" className="text-sm font-medium text-white/70">Uygulama Adı</label>
                                        <Input id="name" name="name" defaultValue={currentApp?.name} required className="bg-black/40 border-white/10 focus:border-brand/40 focus:ring-brand/40" />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="category" className="text-sm font-medium text-white/70">Kategori</label>
                                        <Input id="category" name="category" defaultValue={currentApp?.category} required className="bg-black/40 border-white/10 focus:border-brand/40 focus:ring-brand/40" />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label htmlFor="pricing" className="text-sm font-medium text-white/70">Fiyatlandırma</label>
                                        <Input id="pricing" name="pricing" defaultValue={currentApp?.pricing} placeholder="Örn: Free plan available" className="bg-black/40 border-white/10 focus:border-brand/40 focus:ring-brand/40" />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="installUrl" className="text-sm font-medium text-white/70">Shopify App Store Linki</label>
                                        <Input id="installUrl" name="installUrl" defaultValue={currentApp?.installUrl} placeholder="Örn: https://apps.shopify.com/..." className="bg-black/40 border-white/10 focus:border-brand/40 focus:ring-brand/40" />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="features" className="text-sm font-medium text-white/70">Öne Çıkan Özellikler (Virgülle Ayırın)</label>
                                    <Input 
                                        id="features" 
                                        name="features" 
                                        defaultValue={currentApp?.features?.join(", ")} 
                                        placeholder="Örn: Exit intent, Customizable templates, Email integration" 
                                        className="bg-black/40 border-white/10 focus:border-brand/40 focus:ring-brand/40"
                                    />
                                </div>

                                {/* Screenshots File Upload */}
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-white/70 block">Uygulama Ekran Görüntüleri / Screenshots</label>
                                    
                                    {screenshotsPreviews.length > 0 && (
                                        <div className="grid grid-cols-4 gap-2 border border-white/5 rounded-xl p-3 bg-black/40 max-h-[160px] overflow-y-auto mb-2">
                                            {screenshotsPreviews.map((src, i) => (
                                                <div key={i} className="relative aspect-video rounded-lg overflow-hidden border border-white/10 bg-black/50 group">
                                                    <img src={src} alt="Önizleme" className="h-full w-full object-cover" />
                                                    <button
                                                        type="button"
                                                        onClick={() => removeScreenshot(i)}
                                                        className="absolute inset-0 bg-black/80 flex items-center justify-center text-xs text-red-400 opacity-0 group-hover:opacity-100 transition-opacity font-bold"
                                                    >
                                                        <X className="h-4 w-4 mr-1" /> Sil
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    <label className="cursor-pointer bg-white/5 hover:bg-white/10 border border-white/10 hover:border-brand/40 hover:text-brand rounded-lg px-4 py-2 text-sm text-white/80 hover:text-white transition-all font-medium inline-flex items-center gap-2">
                                        <Upload className="h-4 w-4" /> Görsel Ekle
                                        <input
                                            type="file"
                                            accept="image/*"
                                            multiple
                                            onChange={handleScreenshotsChange}
                                            className="hidden"
                                        />
                                    </label>
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="description" className="text-sm font-medium text-white/70">Açıklama</label>
                                    <Textarea
                                        id="description"
                                        name="description"
                                        defaultValue={currentApp?.description}
                                        required
                                        className="bg-black/40 border-white/10 focus:border-brand/40 focus:ring-brand/40 min-h-[100px]"
                                    />
                                </div>

                                <div className="flex justify-end gap-2 mt-6">
                                    <Button type="button" variant="ghost" onClick={() => setIsEditing(false)} className="text-white/70 hover:bg-white/5">İptal</Button>
                                    <Button type="submit" className="bg-fox-gradient hover:opacity-90 font-semibold text-white">Değişiklikleri Kaydet</Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            )}
        </div>
    );
}
