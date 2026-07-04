export interface ShopifyApp {
    id: string;
    name: string;
    slug: string;
    description: string;
    category: string;
    rating: number;
    reviewCount: number;
    logoUrl: string;
    installUrl: string;
    features?: string[];
    pricing?: string;
    screenshots?: string[];
}

export interface Category {
    id: string;
    name: string;
    slug: string;
}

export interface AppSettings {
    featuredCount: number;
    socialTwitter: string;
    socialGithub: string;
    socialLinkedin: string;
    socialGlobe: string;
    slideshow: {
        id: string;
        imageUrl: string;
        appSlug: string;
    }[];
}

export interface PageContent {
    slug: string;
    titleTr: string;
    titleEn: string;
    descTr: string;
    descEn: string;
    extraTr?: string | null;
    extraEn?: string | null;
}
