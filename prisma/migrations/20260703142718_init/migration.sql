-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "ShopifyApp" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "rating" REAL NOT NULL DEFAULT 5.0,
    "reviewCount" INTEGER NOT NULL DEFAULT 0,
    "logoUrl" TEXT NOT NULL,
    "installUrl" TEXT NOT NULL,
    "features" TEXT NOT NULL,
    "pricing" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "AppSettings" (
    "id" TEXT NOT NULL PRIMARY KEY DEFAULT 'settings',
    "featuredCount" INTEGER NOT NULL DEFAULT 3,
    "socialTwitter" TEXT,
    "socialGithub" TEXT,
    "socialLinkedin" TEXT,
    "socialGlobe" TEXT
);

-- CreateTable
CREATE TABLE "SlideshowItem" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "imageUrl" TEXT NOT NULL,
    "appSlug" TEXT NOT NULL,
    "settingsId" TEXT NOT NULL,
    CONSTRAINT "SlideshowItem_settingsId_fkey" FOREIGN KEY ("settingsId") REFERENCES "AppSettings" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "ShopifyApp_slug_key" ON "ShopifyApp"("slug");
