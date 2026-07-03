"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface User {
    email: string;
}

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<boolean>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        // Load auth status from localStorage on mount
        const savedAuth = localStorage.getItem("tilkiware-auth");
        const savedUserEmail = localStorage.getItem("tilkiware-user-email");
        if (savedAuth === "true" && savedUserEmail) {
            setUser({ email: savedUserEmail });
            setIsAuthenticated(true);
        }
        setIsMounted(true);
    }, []);

    const login = async (email: string, password: string): Promise<boolean> => {
        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            if (res.ok) {
                const data = await res.json();
                if (data.success) {
                    setUser({ email: data.user.email });
                    setIsAuthenticated(true);
                    localStorage.setItem("tilkiware-auth", "true");
                    localStorage.setItem("tilkiware-user-email", data.user.email);
                    return true;
                }
            }
        } catch (error) {
            console.error("Login API request failed:", error);
        }

        return false;
    };

    const logout = () => {
        setUser(null);
        setIsAuthenticated(false);
        localStorage.removeItem("tilkiware-auth");
        localStorage.removeItem("tilkiware-user-email");
    };

    // Avoid hydration issues
    if (!isMounted) {
        return null;
    }

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
