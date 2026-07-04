import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";

export async function GET() {
    try {
        const cookieStore = await cookies();
        const sessionCookie = cookieStore.get("tilkiware-session");

        if (!sessionCookie || !sessionCookie.value) {
            return NextResponse.json({ authenticated: false }, { status: 401 });
        }

        // Decode the session token
        const decoded = Buffer.from(sessionCookie.value, "base64").toString("utf-8");
        const [userId, email] = decoded.split(":");

        if (!userId || !email) {
            return NextResponse.json({ authenticated: false }, { status: 401 });
        }

        // Verify user exists in DB
        const user = await prisma.user.findUnique({
            where: { id: userId },
        });

        if (!user || user.email !== email) {
            return NextResponse.json({ authenticated: false }, { status: 401 });
        }

        return NextResponse.json({
            authenticated: true,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
            },
        });
    } catch (error) {
        console.error("GET /api/auth/me error:", error);
        return NextResponse.json({ authenticated: false }, { status: 401 });
    }
}
