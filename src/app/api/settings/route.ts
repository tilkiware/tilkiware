import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET: Fetch app settings and slideshow list
export async function GET() {
    try {
        let settings = await prisma.appSettings.findFirst({
            include: { slideshow: true },
        });

        if (!settings) {
            // Create default settings if not exists
            settings = await prisma.appSettings.create({
                data: {
                    id: "settings",
                    featuredCount: 3,
                    socialTwitter: "https://twitter.com",
                    socialGithub: "https://github.com",
                    socialLinkedin: "https://linkedin.com",
                    socialGlobe: "https://tilkiware.com",
                    slideshow: {
                        create: [
                            {
                                imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop",
                                appSlug: "pixelpop"
                            },
                            {
                                imageUrl: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=1200&auto=format&fit=crop",
                                appSlug: "reviewmaster"
                            }
                        ]
                    }
                },
                include: { slideshow: true },
            });
        }

        return NextResponse.json(settings);
    } catch (error) {
        console.error("GET /api/settings error:", error);
        return NextResponse.json({ error: "Failed to fetch settings" }, { status: 500 });
    }
}

// PUT: Update app settings
export async function PUT(request: Request) {
    try {
        const body = await request.json();
        const { featuredCount, socialTwitter, socialGithub, socialLinkedin, socialGlobe, slideshow } = body;

        const updatedSettings = await prisma.appSettings.upsert({
            where: { id: "settings" },
            update: {
                featuredCount: featuredCount ? parseInt(featuredCount) : 3,
                socialTwitter: socialTwitter || "",
                socialGithub: socialGithub || "",
                socialLinkedin: socialLinkedin || "",
                socialGlobe: socialGlobe || "",
                slideshow: {
                    deleteMany: {}, // Clear old slides
                    create: (slideshow || []).map((slide: any) => ({
                        imageUrl: slide.imageUrl,
                        appSlug: slide.appSlug,
                    })),
                },
            },
            create: {
                id: "settings",
                featuredCount: featuredCount ? parseInt(featuredCount) : 3,
                socialTwitter: socialTwitter || "",
                socialGithub: socialGithub || "",
                socialLinkedin: socialLinkedin || "",
                socialGlobe: socialGlobe || "",
                slideshow: {
                    create: (slideshow || []).map((slide: any) => ({
                        imageUrl: slide.imageUrl,
                        appSlug: slide.appSlug,
                    })),
                },
            },
            include: { slideshow: true },
        });

        return NextResponse.json(updatedSettings);
    } catch (error) {
        console.error("PUT /api/settings error:", error);
        return NextResponse.json({ error: "Failed to update settings" }, { status: 500 });
    }
}
