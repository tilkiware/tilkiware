# Aktif Bağlam (Active Context)

## Mevcut Durum
Proje başarıyla başlatıldı, derlendi ve doğrulandı. Hem halka açık web sitesi hem de admin paneli, mock (sahte) verilerle tam işlevseldir. Proje adı "TilkiWare" olarak güncellendi ve kök dizine taşındı.

## Son Değişiklikler
- **Koleksiyon Vitrini (Featured Showcase) Yenilemesi**: Ana sayfada yer alan ve önceden tek bir resim alanı olan Koleksiyon Vitrini, modern SaaS standartlarına uygun bir 2 sütunlu ızgara (grid) yerleşimine dönüştürüldü:
  - **Sol Sütun**: İnteraktif ve otomatik geçişli geniş ekran slayt gösterisi (slideshow) ve önceki/sonraki kontrolleri.
  - **Sağ Sütun**: Aktif slayta ait uygulamanın logosunu, kategorisini, ismini, fiyatını, puanlama bilgisini, temel özelliklerini ve detay sayfasınagidiş butonunu içeren premium cam efektli (glassmorphic) bilgi kartı.
- **Çoklu Dil Çevirisi ve Dil Uyumu İyileştirmeleri**: Sitedeki tüm hardcoded/iki dilli metinler dil durumuna duyarlı hale getirildi:
  - **Kahraman (Hero) Başlığı**: Seçili dile göre dinamik olarak Türkçe veya İngilizce şeklinde biçimlendirilip "Premium" vurgusu korunarak görüntülenecek şekilde güncellendi.
  - **Satış Artırıcı (Sales Booster)**: Sağ alttaki kupon kazanma oyunundaki tüm Türkçe ve İngilizce metinler `translations.ts` dosyasına taşınarak dil seçimine tam duyarlı hale getirildi.
- **Yönetici Ayarları Sayfası (`/admin/settings`)**: Öne çıkan uygulama sayısı limitini, footer sosyal ağ adreslerini (Twitter, GitHub, LinkedIn, Globe) ve vitrin slayt görsellerini (görsel yükleme + hedef uygulama seçimi) yönetebilen gelişmiş bir ayarlar paneli oluşturuldu.
  - **Navbar (İnteraktif)**: Kaydırma ilerleme çubuğu (scroll progress), kaydırıldığında dinamikleşen parlayan sınır çizgileri, logo hover rotasyonları ve aktif sayfa için parlayan alt-nokta (under-dot) göstergeleri eklendi.
  - **Footer (İnteraktif)**: Başarılı e-posta kayıtlarında beliren yeşil onay kutusu animasyonu, hover durumunda kayan ve sağa ok çıkaran linkler, ışıyan sosyal butonlar ve sağ altta belirerek yukarı yumuşak geçiş sağlayan "Yukarı Git" butonu eklendi.
  - **Uygulama Detay Sayfası**: Büyük arka plan ışıma efekti, parlayan logo çerçevesi, tıklama veya üzerine gelmeyle anında değişen **interaktif ekran görüntüleri galerisi**, madde listesinden kart ızgarasına (grid) dönüştürülen özellikler bölümü ve transparan floating buton/fiyat paneli.
- **Veri Kalıcılığı ve AppContext**: İstemci tarafında veri kalıcılığını çözmek için `AppContext` ve `AppProvider` mimarisi kuruldu. Eklenen/düzenlenen uygulamalar `localStorage` (`tilkiware-apps`) üzerinde önbelleğe alınarak saklanır.
- **Detaylı Ekran Görüntüleri (Screenshots)**: Uygulama modeline `screenshots` alanı eklendi. Admin CRUD panelinde çoklu dosya yükleyici yardımıyla seçilen görseller base64 verisi olarak kaydedilir ve detay sayfasında (`AppDetailPage`) şık bir görsel galerisi şeklinde listelenir.
- **Navigasyon İyileştirmesi**: Ziyaretçilerin kart üzerindeki eylem butonunun haricinde doğrudan kartın herhangi bir yerine tıklayarak detay sayfasına geçiş yapabilmesi sağlandı.
- **Gösterge Paneli Metrikleri**: Admin paneli gösterge panelindeki (Dashboard) istatistik kartları (Toplam Uygulama, İnceleme Sayısı, Ortalama Puan, Gelir Tahmini) dinamik hale getirildi.
- **Çoklu Dil Desteği (Localization)**: Türkçe (`tr`) ve İngilizce (`en`) dil seçeneği eklendi. `LanguageContext` ve `LanguageProvider` ile tarayıcı yerel hafızasında (localStorage) saklanan dil tercihi yönetimi sağlandı. Navbar'a dil değiştirme geçiş butonu (TR / EN) eklendi ve tüm halka açık bileşenler ile sayfalar (`Home`, `Apps`, `AppCard`, `AppDetailPage`) bu sisteme uyarlandı.
- **Markalama ve Tasarım**: "Tilki" ismine uygun olarak turuncu/amber renk teması (Fox Theme), gölgeli arka plan degradeleri ve özel tasarım geometrik tilki logosu (`public/logo.png`) entegre edildi.
- **Proje Yapısı**: `(public)` ve `(admin)` rota gruplarına sahip Next.js 15 (Next.js 16.x'e güncellendi) uygulaması oluşturuldu.
- **Yeniden Yapılandırma**: Proje dosyaları `shopify-showcase` klasöründen `www` kök dizinine taşındı.
- **Stil**: Özel koyu tema değişkenleri, turuncu/amber gradyanları (`.text-fox-gradient`, `.bg-fox-gradient`) ve glassmorphism yardımcıları (`.glass`, `.glass-card`) ile TailwindCSS v4 yapılandırıldı.
- **Bileşenler**: Yeniden kullanılabilir UI bileşenleri ve özellik bileşenleri (`AppCard`, `Navbar`, `AdminSidebar`) yeni tasarıma uyarlandı.

## Sonraki Adımlar
- **İyileştirme**: Framer Motion kullanarak daha fazla etkileşimli animasyon ekle.
- **Kimlik Doğrulama**: Gerekirse mock auth yerine gerçek kimlik doğrulama (örn. NextAuth.js/Clerk) entegre et.
- **Backend / Veritabanı**: Bellek içi mock veri yerine gerçek bir veritabanına (PostgreSQL/Supabase) bağlan.
- **Test**: Birim ve entegrasyon testleri ekle (Jest/Playwright).

## Aktif Kararlar
- **Mock Veri**: Bu prototip aşamasında basitlik ve taşınabilirlik için `src/lib/data.ts` kullanılmasına karar verildi. Yeniden yüklemede veriler sıfırlanır.
- **Stil**: Premium hissi için "sadece koyu mod" (dark mode only) kuralına sadık kalındı.
- **İkonlar**: Tutarlı ikonografi için `lucide-react` kullanılıyor.
