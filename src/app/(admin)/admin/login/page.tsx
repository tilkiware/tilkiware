"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

export default function AdminLoginPage() {
    const { login } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        try {
            const success = await login(email, password);
            if (!success) {
                setError("Geçersiz e-posta adresi veya şifre.");
            }
        } catch (err) {
            setError("Giriş yapılırken bir sorun oluştu.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Card glass className="w-full max-w-md border-brand/20 bg-[#110f0d]/90 shadow-2xl backdrop-blur-md">
            <CardHeader className="flex flex-col items-center text-center pb-2">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5 border border-white/10 p-2.5 mb-4 shadow-[0_0_15px_rgba(255,90,31,0.1)]">
                    <img src="/logo.png" alt="TilkiWare Logo" className="h-full w-full object-contain" />
                </div>
                <CardTitle className="text-2xl font-bold tracking-tight text-white">
                    <span className="text-brand">Tilki</span>Ware Admin
                </CardTitle>
                <CardDescription className="text-white/50 text-sm mt-1">
                    Geliştirici paneline erişmek için bilgilerinizi girin
                </CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
                <form onSubmit={handleSubmit} className="space-y-4">
                    {error && (
                        <div className="flex items-center gap-2 rounded-lg bg-red-500/10 border border-red-500/20 p-3 text-sm text-red-400">
                            <AlertCircle className="h-4 w-4 shrink-0" />
                            <span>{error}</span>
                        </div>
                    )}

                    <div className="space-y-2">
                        <label htmlFor="email" className="text-xs font-semibold text-white/60 tracking-wide uppercase">
                            E-posta Adresi
                        </label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="admin@tilkiware.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="bg-black/40 border-white/10 focus:border-brand/50 focus:ring-brand/40 h-11 text-white placeholder:text-white/20"
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="password" className="text-xs font-semibold text-white/60 tracking-wide uppercase">
                            Şifre
                        </label>
                        <Input
                            id="password"
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="bg-black/40 border-white/10 focus:border-brand/50 focus:ring-brand/40 h-11 text-white placeholder:text-white/20"
                        />
                    </div>

                    <Button
                        type="submit"
                        disabled={isLoading}
                        className="w-full h-11 bg-fox-gradient hover:opacity-90 shadow-[0_0_20px_rgba(255,90,31,0.2)] hover:shadow-[0_0_25px_rgba(255,90,31,0.35)] transition-all duration-300 font-semibold text-white text-base mt-2"
                    >
                        {isLoading ? "Giriş Yapılıyor..." : "Giriş Yap"}
                    </Button>
                </form>

                <div className="mt-6 border-t border-white/5 pt-4 text-center">
                    <span className="text-xs text-white/30">
                        Demo Bilgileri: <strong className="text-brand/80">admin@tilkiware.com</strong> / <strong className="text-brand/80">tilki123</strong>
                    </span>
                </div>
            </CardContent>
        </Card>
    );
}
