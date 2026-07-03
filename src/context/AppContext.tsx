"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { apps as initialApps } from "@/lib/data";
import { ShopifyApp, AppSettings } from "@/lib/types";

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

interface AppContextType {
    apps: ShopifyApp[];
    addApp: (app: ShopifyApp) => Promise<void>;
    updateApp: (app: ShopifyApp) => Promise<void>;
    deleteApp: (id: string) => Promise<void>;
    settings: AppSettings;
    updateSettings: (settings: AppSettings) => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
    const [apps, setApps] = useState<ShopifyApp[]>([]);
    const [settings, setSettings] = useState<AppSettings>(defaultSettings);
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

    // Hydration mismatch prevention
    if (!isMounted) {
        return null;
    }

    return (
        <AppContext.Provider value={{ apps, addApp, updateApp, deleteApp, settings, updateSettings }}>
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
