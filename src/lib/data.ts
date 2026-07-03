import { ShopifyApp, Category } from "./types";

export const categories: Category[] = [
    { id: "1", name: "Marketing", slug: "marketing" },
    { id: "2", name: "Store Design", slug: "store-design" },
    { id: "3", name: "Conversion", slug: "conversion" },
    { id: "4", name: "Shipping", slug: "shipping" },
    { id: "5", name: "Analytics", slug: "analytics" },
];

export const apps: ShopifyApp[] = [
    {
        id: "1",
        name: "PixelPop",
        slug: "pixelpop",
        description: "Create beautiful popups and banners to grow your email list and boost sales across your store.",
        category: "Marketing",
        rating: 4.8,
        reviewCount: 1240,
        logoUrl: "", // Use placeholder
        installUrl: "#",
        features: ["Exit intent technology", "Customizable templates", "Email integration"],
        pricing: "Free plan available"
    },
    {
        id: "2",
        name: "ReviewMaster",
        slug: "reviewmaster",
        description: "Collect photo and video reviews to build trust and increase conversion rates with social proof.",
        category: "Conversion",
        rating: 4.9,
        reviewCount: 850,
        logoUrl: "",
        installUrl: "#",
        features: ["Photo reviews", "Review request emails", "Google Snippets"],
        pricing: "$9.99/month"
    },
    {
        id: "3",
        name: "ShipSwift",
        slug: "shipswift",
        description: "Automate your shipping process, print labels in bulk, and track orders in real-time.",
        category: "Shipping",
        rating: 4.7,
        reviewCount: 2300,
        logoUrl: "",
        installUrl: "#",
        features: ["Bulk label printing", "Real-time tracking", "Discounted rates"],
        pricing: "$19.99/month"
    },
    {
        id: "4",
        name: "ThemeGenie",
        slug: "themenie",
        description: "AI-powered theme customization to make your store stand out without writing code.",
        category: "Store Design",
        rating: 4.6,
        reviewCount: 420,
        logoUrl: "",
        installUrl: "#",
        features: ["AI Design Assistant", "Drag & Drop", "Mobile Responsive"],
        pricing: "$29.99/month"
    },
    {
        id: "5",
        name: "SalesBoost",
        slug: "salesboost",
        description: "Increase average order value with one-click upsells and cross-sell offers.",
        category: "Conversion",
        rating: 4.9,
        reviewCount: 1540,
        logoUrl: "",
        installUrl: "#",
        features: ["One-click Upsell", "In-cart offers", "A/B Testing"],
        pricing: "$14.99/month"
    },
    {
        id: "6",
        name: "DataWhiz",
        slug: "datawhiz",
        description: "Advanced analytics dashboard to track your store's performance and customer behavior.",
        category: "Analytics",
        rating: 4.8,
        reviewCount: 670,
        logoUrl: "",
        installUrl: "#",
        features: ["Real-time data", "Custom Reports", "Profit tracking"],
        pricing: "$49.99/month"
    }
];
