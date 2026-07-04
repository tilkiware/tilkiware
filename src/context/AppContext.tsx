"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { ShopifyApp, AppSettings, PageContent } from "@/lib/types";

const defaultSettings: AppSettings = {
    featuredCount: 3,
    socialTwitter: "https://twitter.com",
    socialGithub: "https://github.com",
    socialLinkedin: "https://linkedin.com",
    socialGlobe: "https://tilkiware.com",
    slideshow: [
        {
            id: "default-slide-1",
            imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop",
            appSlug: "pixelpop"
        },
        {
            id: "default-slide-2",
            imageUrl: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=1200&auto=format&fit=crop",
            appSlug: "reviewmaster"
        }
    ]
};

const defaultAboutPage: PageContent = {
    slug: "about",
    titleTr: "Premium Shopify Deneyimleri Yaratıyoruz",
    titleEn: "Crafting Premium Shopify Experiences",
    descTr: "TilkiWare, satıcıların işlerini büyütmelerine yardımcı olan yüksek performanslı Shopify uygulamaları geliştiren tutkulu bir geliştirici ekibidir.",
    descEn: "TilkiWare is a team of passionate developers building high-performance Shopify applications that help merchants grow their businesses.",
    extraTr: "Her Shopify satıcısının premium, performans odaklı araçlara erişimi hak ettiğine inanıyoruz. Misyonumuz, karmaşık e-ticaret ihtiyaçları ile basit, zarif çözümler arasındaki boşluğu kapatmaktır.",
    extraEn: "We believe every Shopify merchant deserves access to premium, performance-optimized tools. Our mission is to bridge the gap between complex e-commerce needs and simple, elegant solutions."
};

const defaultContactPage: PageContent = {
    slug: "contact",
    titleTr: "Birlikte Bir Şeyler İnşa Edelim",
    titleEn: "Let's Build Something Together",
    descTr: "Bir sorunuz, özellik isteğiniz veya işbirliği fikriniz mi var? Sizden haber almak isteriz.",
    descEn: "Have a question, feature request, or partnership idea? We'd love to hear from you.",
    extraTr: "support@tilkiware.com",
    extraEn: "hello@tilkiware.com"
};

interface AppContextType {
    apps: ShopifyApp[];
    addApp: (app: ShopifyApp) => Promise<void>;
    updateApp: (app: ShopifyApp) => Promise<void>;
    deleteApp: (id: string) => Promise<void>;
    settings: AppSettings;
    updateSettings: (settings: AppSettings) => Promise<void>;
    aboutPage: PageContent;
    contactPage: PageContent;
    updatePage: (slug: string, pageData: PageContent) => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
    const [apps, setApps] = useState<ShopifyApp[]>([]);
    const [settings, setSettings] = useState<AppSettings>(defaultSettings);
    const [aboutPage, setAboutPage] = useState<PageContent>(defaultAboutPage);
    const [contactPage, setContactPage] = useState<PageContent>(defaultContactPage);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        const loadData = async () => {
            try {
                const appsRes = await fetch("/api/apps");
                if (appsRes.ok) {
                    const appsData = await appsRes.json();
                    setApps(appsData);
                }

                const settingsRes = await fetch("/api/settings");
                if (settingsRes.ok) {
                    const settingsData = await settingsRes.json();
                    setSettings(settingsData);
                }

                const pagesRes = await fetch("/api/pages");
                if (pagesRes.ok) {
                    const pagesData = await pagesRes.json();
                    const about = pagesData.find((p: any) => p.slug === "about");
                    const contact = pagesData.find((p: any) => p.slug === "contact");
                    if (about) setAboutPage(about);
                    if (contact) setContactPage(contact);
                }
            } catch (error) {
                console.error("Failed to load backend data:", error);
            } finally {
                setIsMounted(true);
            }
        };

        loadData();
    }, []);

    const addApp = async (newApp: ShopifyApp) => {
        try {
            const res = await fetch("/api/apps", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newApp),
            });
            if (res.ok) {
                const savedApp = await res.json();
                setApps((prev) => [savedApp, ...prev]);
            }
        } catch (error) {
            console.error("Error adding app:", error);
        }
    };

    const updateApp = async (updatedApp: ShopifyApp) => {
        try {
            const res = await fetch(`/api/apps/${updatedApp.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedApp),
            });
            if (res.ok) {
                const savedApp = await res.json();
                setApps((prev) => prev.map((a) => (a.id === savedApp.id ? savedApp : a)));
            }
        } catch (error) {
            console.error("Error updating app:", error);
        }
    };

    const deleteApp = async (id: string) => {
        try {
            const res = await fetch(`/api/apps/${id}`, {
                method: "DELETE",
            });
            if (res.ok) {
                setApps((prev) => prev.filter((a) => a.id !== id));
            }
        } catch (error) {
            console.error("Error deleting app:", error);
        }
    };

    const updateSettings = async (newSettings: AppSettings) => {
        try {
            const res = await fetch("/api/settings", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newSettings),
            });
            if (res.ok) {
                const savedSettings = await res.json();
                setSettings(savedSettings);
            }
        } catch (error) {
            console.error("Error updating settings:", error);
        }
    };

    const updatePage = async (slug: string, pageData: PageContent) => {
        try {
            const res = await fetch(`/api/pages/${slug}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(pageData),
            });
            if (res.ok) {
                const savedPage = await res.json();
                if (slug === "about") setAboutPage(savedPage);
                if (slug === "contact") setContactPage(savedPage);
            }
        } catch (error) {
            console.error(`Error updating page ${slug}:`, error);
        }
    };

    // Hydration mismatch prevention
    if (!isMounted) {
        return null;
    }

    return (
        <AppContext.Provider value={{ 
            apps, 
            addApp, 
            updateApp, 
            deleteApp, 
            settings, 
            updateSettings,
            aboutPage,
            contactPage,
            updatePage
        }}>
            {children}
        </AppContext.Provider>
    );
}

export function useApp() {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error("useApp must be used within an AppProvider");
    }
    return context;
}
