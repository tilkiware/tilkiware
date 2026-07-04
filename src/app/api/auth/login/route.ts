import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { email, password } = body;

        if (!email || !password) {
            return NextResponse.json({ error: "Email ve şifre gereklidir" }, { status: 400 });
        }

        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            return NextResponse.json({ error: "Geçersiz kullanıcı adı veya şifre" }, { status: 401 });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return NextResponse.json({ error: "Geçersiz kullanıcı adı veya şifre" }, { status: 401 });
        }

        // Create a simple session token (base64 of id:email:timestamp)
        const sessionToken = Buffer.from(`${user.id}:${user.email}:${Date.now()}`).toString("base64");

        const response = NextResponse.json({
            success: true,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
            },
        });

        // Set HttpOnly cookie for secure session
        response.cookies.set("tilkiware-session", sessionToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
            maxAge: 60 * 60 * 24 * 7, // 7 days
        });

        return response;
    } catch (error) {
        console.error("POST /api/auth/login error:", error);
        return NextResponse.json({ error: "Kimlik doğrulama hatası oluştu" }, { status: 500 });
    }
}
