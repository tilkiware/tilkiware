const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

const initialApps = [
    {
        name: "PixelPop",
        slug: "pixelpop",
        description: "Create beautiful popups and banners to grow your email list and boost sales across your store.",
        category: "Marketing",
        rating: 4.8,
        reviewCount: 1240,
        logoUrl: "",
        installUrl: "#",
        features: JSON.stringify(["Exit intent technology", "Customizable templates", "Email integration"]),
        pricing: "Free plan available"
    },
    {
        name: "ReviewMaster",
        slug: "reviewmaster",
        description: "Collect photo and video reviews to build trust and increase conversion rates with social proof.",
        category: "Conversion",
        rating: 4.9,
        reviewCount: 850,
        logoUrl: "",
        installUrl: "#",
        features: JSON.stringify(["Photo reviews", "Review request emails", "Google Snippets"]),
        pricing: "$9.99/month"
    },
    {
        name: "ShipSwift",
        slug: "shipswift",
        description: "Automate your shipping process, print labels in bulk, and track orders in real-time.",
        category: "Shipping",
        rating: 4.7,
        reviewCount: 2300,
        logoUrl: "",
        installUrl: "#",
        features: JSON.stringify(["Bulk label printing", "Real-time tracking", "Discounted rates"]),
        pricing: "$19.99/month"
    },
    {
        name: "ThemeGenie",
        slug: "themenie",
        description: "AI-powered theme customization to make your store stand out without writing code.",
        category: "Store Design",
        rating: 4.6,
        reviewCount: 420,
        logoUrl: "",
        installUrl: "#",
        features: JSON.stringify(["AI Design Assistant", "Drag & Drop", "Mobile Responsive"]),
        pricing: "$29.99/month"
    },
    {
        name: "SalesBoost",
        slug: "salesboost",
        description: "Increase average order value with one-click upsells and cross-sell offers.",
        category: "Conversion",
        rating: 4.9,
        reviewCount: 1540,
        logoUrl: "",
        installUrl: "#",
        features: JSON.stringify(["One-click Upsell", "In-cart offers", "A/B Testing"]),
        pricing: "$14.99/month"
    },
    {
        name: "DataWhiz",
        slug: "datawhiz",
        description: "Advanced analytics dashboard to track your store's performance and customer behavior.",
        category: "Analytics",
        rating: 4.8,
        reviewCount: 670,
        logoUrl: "",
        installUrl: "#",
        features: JSON.stringify(["Real-time data", "Custom Reports", "Profit tracking"]),
        pricing: "$49.99/month"
    }
];

async function main() {
    console.log("Starting database seeding...");

    // 1. Clean existing records
    await prisma.user.deleteMany({});
    await prisma.slideshowItem.deleteMany({});
    await prisma.appSettings.deleteMany({});
    await prisma.shopifyApp.deleteMany({});
    await prisma.pageContent.deleteMany({});

    // 2. Create Admin user
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash("tilki123", salt);
    const adminUser = await prisma.user.create({
        data: {
            email: "admin@tilkiware.com",
            password: hashedPassword,
            name: "Admin"
        }
    });
    console.log(`Admin user created: ${adminUser.email}`);

    // 3. Create Shopify Apps
    for (const app of initialApps) {
        await prisma.shopifyApp.create({
            data: app
        });
    }
    console.log(`${initialApps.length} applications seeded.`);

    // 4. Create App Settings with default slideshow slides
    const settings = await prisma.appSettings.create({
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
        }
    });
    console.log("Default application settings and slideshow slides seeded.");

    // 5. Create Page Contents
    await prisma.pageContent.create({
        data: {
            slug: "about",
            titleTr: "Premium Shopify Deneyimleri Yaratıyoruz",
            titleEn: "Crafting Premium Shopify Experiences",
            descTr: "TilkiWare, satıcıların işlerini büyütmelerine yardımcı olan yüksek performanslı Shopify uygulamaları geliştiren tutkulu bir geliştirici ekibidir.",
            descEn: "TilkiWare is a team of passionate developers building high-performance Shopify applications that help merchants grow their businesses.",
            extraTr: "Her Shopify satıcısının premium, performans odaklı araçlara erişimi hak ettiğine inanıyoruz. Misyonumuz, karmaşık e-ticaret ihtiyaçları ile basit, zarif çözümler arasındaki boşluğu kapatmaktır.",
            extraEn: "We believe every Shopify merchant deserves access to premium, performance-optimized tools. Our mission is to bridge the gap between complex e-commerce needs and simple, elegant solutions."
        }
    });
    await prisma.pageContent.create({
        data: {
            slug: "contact",
            titleTr: "Birlikte Bir Şeyler İnşa Edelim",
            titleEn: "Let's Build Something Together",
            descTr: "Bir sorunuz, özellik isteğiniz veya işbirliği fikriniz mi var? Sizden haber almak isteriz.",
            descEn: "Have a question, feature request, or partnership idea? We'd love to hear from you.",
            extraTr: "support@tilkiware.com",
            extraEn: "hello@tilkiware.com"
        }
    });
    console.log("About and Contact pages content seeded.");

    console.log("Seeding completed successfully!");
}

main()
    .catch((e) => {
        console.error("Seeding failed:", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
