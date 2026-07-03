# Sistem Desenleri (System Patterns)

## Mimari
- **Framework**: Next.js 15 (App Router).
- **Rota Grupları**:
    - `(public)`: Herkese açık rotalar (Ana Sayfa, Uygulamalar).
    - `(admin)`: Korumalı/Admin rotaları (Dashboard, Yönetim).
    - Endişelerin ayrılması (Separation of concerns): Düzenlerin (Navbar/Footer vs Sidebar) ayrı olmasını sağlar.

## Bileşen Mimarisi
- **UI (Atomlar)**: `src/components/ui` (Button, Card, Input). Düşük seviyeli, durumsuz (stateless), yeniden kullanılabilir.
- **Özellikler (Moleküller/Organizmalar)**: `src/components/features` (AppCard). İş mantığına özgü.
- **Düzen (Layout)**: `src/components/layout` (Navbar, Sidebar). Global yapısal bileşenler.

## Veri Akışı
- **Durum Yönetimi (State Management)**:
    - **Public**: Statik üretim + İstemci tarafı filtreleme (React `useState`).
    - **Admin**: CRUD işlemleri için yerel durum yönetimi (`AdminAppsPage` içinde React `useState`).
- **Veri Kaynağı**: `src/lib/data.ts`, başlangıç verileri için tek doğruluk kaynağı (source of truth) olarak hareket eder.

## Tasarım Desenleri
- **Glassmorphism**: Modern bir his için yoğun `backdrop-blur`, `bg-white/5` ve beyaz kenarlık kullanımı.
- **Fox Temalı Markalama (Fox Theme)**: Proje ismine ("TilkiWare") uygun olarak, marka kimliğini temsil eden turuncu (`#ff5a1f`) ve amber (`#ff9f1c`) renk tonları kullanılmıştır.
- **Kompozisyon**: Karmaşık sayfaları daha küçük, yeniden kullanılabilir parçalardan oluşturma (örn. Ana Sayfa ve Uygulamalar sayfalarında kullanılan `AppCard`).
- **Duyarlı Izgara (Responsive Grid)**: Uyarlanabilir düzenler için CSS Grid (`grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`) kullanımı.

## Temel Kararlar
- **Tailwind v4**: Daha iyi performans ve basitleştirilmiş yapılandırma (CSS içinde `@theme` bloğu) için en son sürüm kullanılıyor.
- **Mock CRUD**: Gösterim amaçlı olarak tamamen istemci tarafında (client-side) uygulandı. Değişiklikler geçicidir.
