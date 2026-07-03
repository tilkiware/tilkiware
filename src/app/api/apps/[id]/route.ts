import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// PUT: Update an app
export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const body = await request.json();
        const { name, slug, description, category, rating, reviewCount, logoUrl, installUrl, features, pricing } = body;

        const updatedApp = await prisma.shopifyApp.update({
            where: { id },
            data: {
                name,
                slug,
                description,
                category,
                rating: rating ? parseFloat(rating) : undefined,
                reviewCount: reviewCount ? parseInt(reviewCount) : undefined,
                logoUrl,
                installUrl,
                features: features ? JSON.stringify(features) : undefined,
                pricing,
            },
        });

        const formattedApp = {
            ...updatedApp,
            features: JSON.parse(updatedApp.features),
        };

        return NextResponse.json(formattedApp);
    } catch (error) {
        console.error("PUT /api/apps error:", error);
        return NextResponse.json({ error: "Failed to update app" }, { status: 500 });
    }
}

// DELETE: Delete an app
export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        await prisma.shopifyApp.delete({
            where: { id },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("DELETE /api/apps error:", error);
        return NextResponse.json({ error: "Failed to delete app" }, { status: 500 });
    }
}
