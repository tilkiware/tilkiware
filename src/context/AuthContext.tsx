"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface User {
    email: string;
    name?: string | null;
}

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<boolean>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState(true);

    // On mount, verify session via server-side cookie check
    useEffect(() => {
        const verifySession = async () => {
            try {
                const res = await fetch("/api/auth/me");
                if (res.ok) {
                    const data = await res.json();
                    if (data.authenticated) {
                        setUser({ email: data.user.email, name: data.user.name });
                        setIsAuthenticated(true);
                    }
                }
            } catch (error) {
                console.error("Session verification failed:", error);
            } finally {
                setIsLoading(false);
            }
        };

        verifySession();
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
                    setUser({ email: data.user.email, name: data.user.name });
                    setIsAuthenticated(true);
                    return true;
                }
            }
        } catch (error) {
            console.error("Login API request failed:", error);
        }

        return false;
    };

    const logout = async () => {
        try {
            await fetch("/api/auth/logout", { method: "POST" });
        } catch (error) {
            console.error("Logout API request failed:", error);
        }
        setUser(null);
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, isLoading, login, logout }}>
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
