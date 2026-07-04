import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET: Fetch all page contents
export async function GET() {
    try {
        const pages = await prisma.pageContent.findMany();
        return NextResponse.json(pages);
    } catch (error) {
        console.error("GET /api/pages error:", error);
        return NextResponse.json({ error: "Failed to fetch page contents" }, { status: 500 });
    }
}
