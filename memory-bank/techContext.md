# Teknik Bağlam (Tech Context)

## Teknoloji Yığını
- **Frontend Framework**: Next.js 15.1.6 (App Router)
- **Dil**: TypeScript v5
- **Stil**: TailwindCSS v4
- **İkonlar**: Lucide React v0.469
- **Animasyon**: Framer Motion v11
- **Yardımcı Araçlar**: `clsx`, `tailwind-merge`

## Geliştirme Ortamı
- **Node.js**: Gerekli (LTS önerilir).
- **Paket Yöneticisi**: npm.
- **İşletim Sistemi**: Windows (Proje `c:\Users\root\tilkiware\www` dizininde).

## Proje Yapısı
```
src/
  app/
    (public)/       # Navbar/Footer içeren halka açık sayfalar
    (admin)/        # Sidebar içeren admin sayfaları
  components/
    ui/             # Temel UI bileşenleri
    layout/         # Düzen bileşenleri
    features/       # Özelliğe özgü bileşenler
  lib/
    data.ts         # Mock veriler
    types.ts        # TypeScript tanımları
    utils.ts        # Yardımcı fonksiyonlar
```

## Kısıtlamalar
- **Veri Kalıcılığı**: Şu anda yok. Sayfa yenilendiğinde veya yönlendirmede veriler sıfırlanır. İşlevsellik istemci tarafı durumuyla sınırlıdır.
- **Kimlik Doğrulama (Auth)**: Predefined demo bilgileri (`admin@tilkiware.com` / `tilki123`) kullanılarak client-side localStorage tabanlı simülasyon. Gerçek server-side güvenlik uygulanmadı.
- **Derleme (Build)**: Standart Next.js derleme mimarisi.

## Veritabanı ve Kimlik Doğrulama Geçişi (Database & Auth Migration Guide)

Uygulamayı canlı bir sunucuya kurduğunuzda, mock verileri ve kimlik doğrulama sistemini gerçek bir veritabanına bağlamak için takip etmeniz gereken teknik adımlar aşağıdadır:

### 1. Veritabanı Seçimi ve Kurulumu
Proje için **PostgreSQL** ve barındırma kolaylığı açısından **Supabase** veya **Neon.tech** önerilir. ORM aracı olarak **Prisma** veya **Drizzle ORM** tercih edilebilir.

#### Gerekli Paketlerin Kurulumu:
```bash
npm install @prisma/client next-auth
npm install -D prisma
```

### 2. Veritabanı Şeması (Schema Design)
`prisma/schema.prisma` dosyasında şu tabloları tanımlayın:

```prisma
// Kullanıcı Tablosu (Admin Girişi için)
model User {
  id        String   @id @default(uuid())
  email     String   @unique
  password  String   // bcrypt ile hashlenmiş şifre
  name      String?
  createdAt DateTime @default(now())
}

// Shopify Uygulamaları Tablosu
model ShopifyApp {
  id          String   @id @default(uuid())
  name        String
  slug        String   @unique
  description String
  category    String
  rating      Float    @default(5.0)
  reviewCount Int      @default(0)
  logoUrl     String   // DB'de base64 veya CDN URL olarak saklanır
  installUrl  String
  features    String[]
  pricing     String
  createdAt   DateTime @default(now())
}

// Genel Ayarlar Tablosu (Featured limit, sosyal ağlar)
model AppSettings {
  id             String          @id @default("settings")
  featuredCount  Int             @default(3)
  socialTwitter  String?
  socialGithub   String?
  socialLinkedin String?
  socialGlobe    String?
  slideshow      SlideshowItem[]
}

// Slayt Görselleri Tablosu
model SlideshowItem {
  id         String      @id @default(uuid())
  imageUrl   String      // CDN veya Cloudinary URL'i
  appSlug    String
  settingsId String
  settings   AppSettings @relation(fields: [settingsId], references: [id], onDelete: Cascade)
}
```

### 3. Server-Side Kimlik Doğrulama Entegrasyonu (NextAuth.js)
`src/app/api/auth/[...nextauth]/route.ts` dosyasını oluşturup `CredentialsProvider` tanımlayın:

```typescript
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        
        // Veritabanından kullanıcıyı çek
        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        });
        
        if (!user) return null;
        
        // Şifre kontrolü
        const isPasswordValid = await bcrypt.compare(credentials.password, user.password);
        if (!isPasswordValid) return null;
        
        return { id: user.id, email: user.email, name: user.name };
      }
    })
  ],
  pages: {
    signIn: "/admin/login",
  },
  session: {
    strategy: "jwt",
  }
});

export { handler as GET, handler as POST };
```

### 4. Admin Sayfalarında Route Koruması (Middleware)
Next.js middleware kullanarak `(admin)` sayfalarını sunucu tarafında koruyun. `src/middleware.ts` dosyası:

```typescript
import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/admin/login",
  },
});

export const config = {
  matcher: ["/admin/:path*"], // Tüm admin sayfalarını korur
};
```

### 5. Görsel ve Dosya Yükleme (Media Storage)
Base64 verilerini veritabanında saklamak yerine, resimleri **Cloudinary** veya **Supabase Storage** API'lerine yükleyip dönen CDN linkini (`logoUrl`) veritabanına kaydetmek en iyi yaklaşımdır.

### 6. İstemci Hafızasından (LocalStorage) Sunucu Veritabanına Geçiş

Uygulama yerel tarayıcı hafızasını (`localStorage`) kullanmaktadır. Bu durum, her tarayıcının ve ziyaretçinin farklı bir veri kümesi görmesine yol açar (Örn: Chrome'da slaytların boş görünmesi). Canlı sunucu ortamında tüm ziyaretçilerin aynı verileri (slaytlar, uygulamalar, sosyal linkler vb.) görmesi için istemci hafızasından veritabanına geçiş yapılmalıdır:

#### A. API Uç Noktalarının (Route Handlers) Oluşturulması:
Aşağıdaki gibi Next.js API rotaları (`Route Handlers`) yazılarak veritabanı CRUD işlemleri sunucu tarafında yönetilmelidir:

*   `src/app/api/apps/route.ts` (Tüm uygulamaları listelemek ve yeni uygulama eklemek için `GET` / `POST`)
*   `src/app/api/apps/[id]/route.ts` (Seçilen uygulamayı silmek veya güncellemek için `PUT` / `DELETE`)
*   `src/app/api/settings/route.ts` (Vitrin ayarlarını ve slaytları çekmek/güncellemek için `GET` / `PUT`)

#### B. Ayarlar API'si İçin Örnek Route Handler (`src/app/api/settings/route.ts`):
```typescript
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Ayarları Getir
export async function GET() {
  try {
    const settings = await prisma.appSettings.findFirst({
      include: { slideshow: true }
    });
    
    if (!settings) {
      // Eğer ayar kaydı yoksa varsayılan ayarlarla oluştur
      const defaultSettings = await prisma.appSettings.create({
        data: {
          featuredCount: 3,
          socialTwitter: "https://twitter.com",
          slideshow: {
            create: [
              { imageUrl: "https://images.unsplash.com/...", appSlug: "pixelpop" }
            ]
          }
        },
        include: { slideshow: true }
      });
      return NextResponse.json(defaultSettings);
    }
    
    return NextResponse.json(settings);
  } catch (error) {
    return NextResponse.json({ error: "Ayarlar yüklenemedi" }, { status: 500 });
  }
}

// Ayarları Güncelle
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { featuredCount, socialTwitter, socialGithub, socialLinkedin, socialGlobe, slideshow } = body;
    
    // Mevcut ayarı güncelle veya oluştur
    const updated = await prisma.appSettings.upsert({
      where: { id: "settings" },
      update: {
        featuredCount,
        socialTwitter,
        socialGithub,
        socialLinkedin,
        socialGlobe,
        // Slaytları yeniden oluştur
        slideshow: {
          deleteMany: {},
          create: slideshow.map((slide: any) => ({
            imageUrl: slide.imageUrl,
            appSlug: slide.appSlug
          }))
        }
      },
      create: {
        id: "settings",
        featuredCount,
        socialTwitter,
        socialGithub,
        socialLinkedin,
        socialGlobe,
        slideshow: {
          create: slideshow.map((slide: any) => ({
            imageUrl: slide.imageUrl,
            appSlug: slide.appSlug
          }))
        }
      },
      include: { slideshow: true }
    });
    
    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: "Güncelleme başarısız" }, { status: 500 });
  }
}
```

#### C. AppContext / AppProvider Güncellemesi (`src/context/AppContext.tsx`):
Context yapısı `localStorage` yerine sunucu API'lerine istek atacak şekilde güncellenmelidir:

```typescript
// Örnek güncelleme:
export function AppProvider({ children }: { children: React.ReactNode }) {
    const [apps, setApps] = useState<ShopifyApp[]>([]);
    const [settings, setSettings] = useState<AppSettings>(defaultSettings);

    useEffect(() => {
        // API'den uygulamaları ve ayarları çek
        async function loadInitialData() {
            const appsResponse = await fetch("/api/apps");
            const appsData = await appsResponse.json();
            setApps(appsData);

            const settingsResponse = await fetch("/api/settings");
            const settingsData = await settingsResponse.json();
            setSettings(settingsData);
        }
        loadInitialData();
    }, []);

    const addApp = async (newApp: ShopifyApp) => {
        const res = await fetch("/api/apps", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newApp)
        });
        const savedApp = await res.json();
        setApps([...apps, savedApp]);
    };
    
    // updateApp, deleteApp ve updateSettings fonksiyonları da 
    // benzer şekilde API istekleri ile güncellenmelidir.
}
```

#### D. SEO ve Server-Side Rendering (SSR) Avantajı:
İstemci tarafında çalışan `localStorage` yerine verileri API veya Server Action'lar yardımıyla sunucuda çekip Next.js Server Components (`Page` dosyaları) seviyesinde sayfalara prop olarak geçirmek, arama motorlarının (Google, Bing) slaytları ve uygulama listesini anında görmesini sağlar. Bu sayede projenin **SEO skoru ve yüklenme hızı maksimum seviyeye** çıkar.

