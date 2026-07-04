import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET: Fetch single page content
export async function GET(request: Request, { params }: { params: Promise<{ slug: string }> }) {
    try {
        const { slug } = await params;
        const page = await prisma.pageContent.findUnique({
            where: { slug },
        });

        if (!page) {
            return NextResponse.json({ error: "Page not found" }, { status: 404 });
        }

        return NextResponse.json(page);
    } catch (error) {
        console.error("GET /api/pages/[slug] error:", error);
        return NextResponse.json({ error: "Failed to fetch page content" }, { status: 500 });
    }
}

// PUT: Update page content
export async function PUT(request: Request, { params }: { params: Promise<{ slug: string }> }) {
    try {
        const { slug } = await params;
        const body = await request.json();
        const { titleTr, titleEn, descTr, descEn, extraTr, extraEn } = body;

        const updatedPage = await prisma.pageContent.update({
            where: { slug },
            data: {
                titleTr,
                titleEn,
                descTr,
                descEn,
                extraTr,
                extraEn,
            },
        });

        return NextResponse.json(updatedPage);
    } catch (error) {
        console.error("PUT /api/pages/[slug] error:", error);
        return NextResponse.json({ error: "Failed to update page content" }, { status: 500 });
    }
}
