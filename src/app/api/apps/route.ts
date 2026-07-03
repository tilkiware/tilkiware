import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET: Fetch all apps
export async function GET() {
    try {
        const dbApps = await prisma.shopifyApp.findMany({
            orderBy: { createdAt: "desc" },
        });

        // Parse features back into string[]
        const formattedApps = dbApps.map((app) => ({
            ...app,
            features: JSON.parse(app.features),
        }));

        return NextResponse.json(formattedApps);
    } catch (error) {
        console.error("GET /api/apps error:", error);
        return NextResponse.json({ error: "Failed to fetch apps" }, { status: 500 });
    }
}

// POST: Add new app
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, slug, description, category, rating, reviewCount, logoUrl, installUrl, features, pricing } = body;

        if (!name || !slug) {
            return NextResponse.json({ error: "Name and Slug are required" }, { status: 400 });
        }

        const newApp = await prisma.shopifyApp.create({
            data: {
                name,
                slug,
                description: description || "",
                category: category || "",
                rating: rating ? parseFloat(rating) : 5.0,
                reviewCount: reviewCount ? parseInt(reviewCount) : 0,
                logoUrl: logoUrl || "",
                installUrl: installUrl || "",
                features: JSON.stringify(features || []),
                pricing: pricing || "Free plan available",
            },
        });

        const formattedApp = {
            ...newApp,
            features: JSON.parse(newApp.features),
        };

        return NextResponse.json(formattedApp, { status: 201 });
    } catch (error) {
        console.error("POST /api/apps error:", error);
        return NextResponse.json({ error: "Failed to create app" }, { status: 500 });
    }
}
