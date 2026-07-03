"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { translations, Language } from "@/lib/translations";

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [language, setLanguageState] = useState<Language>("tr"); // Default to Turkish
    const [isMounted, setIsMounted] = useState(false);

    // Load language preference from localStorage on mount
    useEffect(() => {
        const savedLang = localStorage.getItem("tilkiware-lang") as Language;
        if (savedLang === "en" || savedLang === "tr") {
            setLanguageState(savedLang);
        }
        setIsMounted(true);
    }, []);

    const setLanguage = (lang: Language) => {
        setLanguageState(lang);
        localStorage.setItem("tilkiware-lang", lang);
    };

    const t = (key: string): string => {
        const langDict = translations[language];
        // @ts-ignore
        const value = langDict[key];
        if (value) return value;

        // Fallback to English
        // @ts-ignore
        const fallbackValue = translations["en"][key];
        if (fallbackValue) return fallbackValue;

        // Fallback to key itself
        return key;
    };

    // Avoid layout shift/server hydration mismatch issues by only rendering client content after mounting
    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error("useLanguage must be used within a LanguageProvider");
    }
    return context;
}
