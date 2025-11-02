"use client";
import { useState, useCallback, useEffect, useRef } from "react";
import { motion } from "framer-motion";

const fade = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.5 },
};

export default function Home() {
  // Sticky header state
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lightbox with navigation
  type LightboxItem = { src: string; alt?: string };
  const [lightbox, setLightbox] = useState<{ items: LightboxItem[]; index: number } | null>(null);
  const openLightbox = useCallback((items: LightboxItem[], index: number) => setLightbox({ items, index }), []);
  const closeLightbox = useCallback(() => setLightbox(null), []);
  const nextLightbox = useCallback(() => setLightbox(l => (l ? { items: l.items, index: (l.index + 1) % l.items.length } : l)), []);
  const prevLightbox = useCallback(() => setLightbox(l => (l ? { items: l.items, index: (l.index - 1 + l.items.length) % l.items.length } : l)), []);

  // Data sources
  const galleryItems: LightboxItem[] = [
    { src: "/images/gallery/bina-1.png", alt: "Dış cephe render 1" },
    { src: "/images/gallery/bina-2.png", alt: "Dış cephe render 2" },
    { src: "/images/gallery/bina-3.png", alt: "Dış cephe render 3" },
    { src: "/images/gallery/bina-4.png", alt: "Dış cephe render 4" },
  ];
  const planItems_1_1: LightboxItem[] = [
    { src: "/images/plans/1+1-1.png", alt: "1+1 daire planı" },
  ];
  const planItems_2_1: LightboxItem[] = [
    { src: "/images/plans/2+1-1.png", alt: "2+1 daire planı" },
  ];
  const planItems_3_1: LightboxItem[] = [
    { src: "/images/plans/3+1-1.png", alt: "3+1 daire planı 1" },
    { src: "/images/plans/3+1-2.png", alt: "3+1 daire planı 2" },
  ];
  const floorItems: LightboxItem[] = [
    { src: "/images/floorplans/katplani-1.png", alt: "Kat planı 1" },
    { src: "/images/floorplans/katplani-2.png", alt: "Kat planı 2" },
  ];
  const locationItems: LightboxItem[] = [
    { src: "/images/konum/konum-1.png", alt: "Konum görseli 1" },
    { src: "/images/konum/konum-2.png", alt: "Konum görseli 2" },
  ];
  // Mobile gallery slider ref and controls
  const gallerySliderRef = useRef<HTMLDivElement | null>(null);
  const slidePrev = useCallback(() => {
    const el = gallerySliderRef.current;
    if (!el) return;
    el.scrollBy({ left: -el.clientWidth, behavior: "smooth" });
  }, []);
  const slideNext = useCallback(() => {
    const el = gallerySliderRef.current;
    if (!el) return;
    el.scrollBy({ left: el.clientWidth, behavior: "smooth" });
  }, []);
  return (
    <main className="pt-16">
      {/* Sticky Header */}
      <nav className={`fixed top-0 z-50 w-full transition-colors duration-300 ${scrolled ? "bg-[#0A2E50] text-white shadow-lg" : "bg-white/70 text-navy backdrop-blur"}`}>
        <div className="mx-auto max-w-6xl px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/images/logo/logo.png" alt="SS İzmir Mavi Ada Logo" className="h-9 w-auto rounded-md shadow-md" />
            <span className="font-heading text-sm sm:text-base">SS İZMİR MAVİ ADA</span>
          </div>
          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-3 text-sm">
            {[
              { href: "#hero", label: "Anasayfa" },
              { href: "#proje", label: "Proje" },
              { href: "#galeri", label: "Galeri" },
              { href: "#planlar", label: "Planlar" },
              { href: "#katplanlari", label: "Kat Planları" },
              { href: "#odeme-plani", label: "Ödeme Planı" },
              { href: "#konum", label: "Konum" },
              { href: "#iletisim", label: "İletişim" },
            ].map((l) => (
              <a key={l.href} href={l.href} className="rounded-full px-4 py-2 hover:bg-white/10 transition">
                {l.label}
              </a>
            ))}
          </div>
          {/* Mobile hamburger */}
          <button aria-label="Menüyü Aç/Kapat" aria-expanded={menuOpen} onClick={() => setMenuOpen((v) => !v)} className="md:hidden inline-flex items-center justify-center rounded-lg px-3 py-2 bg-blue text-white">
            ☰
          </button>
        </div>
        {/* Mobile menu (slide down) */}
        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: menuOpen ? "auto" : 0, opacity: menuOpen ? 1 : 0 }} className="md:hidden overflow-hidden">
          <div className="mx-auto max-w-6xl px-6 pb-3 grid grid-cols-2 gap-2 text-sm">
            {[
              { href: "#hero", label: "Anasayfa" },
              { href: "#proje", label: "Proje" },
              { href: "#galeri", label: "Galeri" },
              { href: "#planlar", label: "Planlar" },
              { href: "#katplanlari", label: "Kat Planları" },
              { href: "#odeme-plani", label: "Ödeme Planı" },
              { href: "#konum", label: "Konum" },
              { href: "#iletisim", label: "İletişim" },
            ].map((l) => (
              <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)} className="rounded-xl px-4 py-2 bg-white/20 hover:bg-white/30 transition">
                {l.label}
              </a>
            ))}
          </div>
        </motion.div>
      </nav>

      {/* Hero */}
      <motion.section id="hero" className="relative bg-navy" {...fade}>
        <div className="absolute inset-0 bg-[url('/images/hero/hero-1.png')] bg-cover bg-center opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A2E50]/80 via-[#0077B6]/60 to-[#00B4D8]/40" />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 py-20 sm:py-28 text-center">
          <img src="/images/logo/logo.png" alt="Logo" className="mx-auto h-12 w-auto sm:h-14" />
          <h1 className="mt-4 font-heading text-2xl sm:text-4xl md:text-5xl font-semibold">
            SS İZMİR MAVİ ADA – Menemen Yahşelli Konut Yapı Kooperatifi
          </h1>
          <p className="mx-auto mt-3 sm:mt-4 max-w-2xl text-white/85 text-sm sm:text-lg">
            2 blok, 10 kat, 1. sınıf malzeme ve işçilikle modern yaşam alanı
          </p>
          <div className="mt-6 sm:mt-8">
            <a href="#proje" className="inline-block w-full md:w-auto rounded-full bg-gradient-to-r from-[#0077B6] to-[#00B4D8] px-6 py-3 font-medium text-white shadow-md transition hover:scale-105 hover:shadow-[0_0_20px_rgba(0,180,216,0.6)]">
              Proje Detaylarını Gör
            </a>
          </div>
          <div className="mt-6 flex justify-center">
            <a href="#proje" className="inline-flex items-center gap-2 text-white/80 hover:text-white transition">
              <span>Keşfet</span>
              <span className="text-xl">↓</span>
            </a>
          </div>
        </div>
      </motion.section>

      

      {/* Proje Bilgileri */}
      <motion.section id="proje" className="bg-light-gray text-navy" {...fade}>
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-20">
          <div className="rounded-2xl bg-white shadow-md p-5 sm:p-10">
            <h2 className="font-heading text-2xl sm:text-3xl font-semibold">Proje Bilgileri</h2>
            <p className="mt-2 text-navy/80">
              SS İzmir Mavi Ada Konut Yapı Kooperatifi, İzmir Menemen Yahşelli Mah. 165 Ada 7 Parsel’de konumlanan, modern mimariye ve kooperatif güvencesine sahip 2 bloklu lüks yaşam projesidir. Her detayıyla konfor, güvenlik ve dayanıklılık esas alınarak tasarlanmıştır.
            </p>

            <h3 className="mt-8 font-heading text-xl font-semibold">Öne Çıkan Özellikler</h3>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                "2 blok (A ve B), her blok 10 katlı",
                "Her blokta çift hızlı asansör",
                "Açık otopark ve yürüyüş yolları",
                "Sığınak ve kapıcı dairesi",
                "Deprem yönetmeliğine uygun inşaat",
                "Isı ve ses yalıtımlı çatı ve dış duvarlar",
                "1. sınıf malzeme ve işçilik",
                "Güvenlik kamera sistemi",
                "Küpeşte krom nikel ve damperli cam balkonlar",
                "Yerden ısıtmalı doğalgaz tesisatı",
                "Merkezi anten ve dahili telefon altyapısı",
                "Isıcamlı PVC doğrama",
                "Salon ve odalar laminat parke",
                "Tavanlar kartonpiyer ve saten alçı boya",
                "Islak zeminlerde 1. sınıf seramik",
                "Hilton lavabo ve kaliteli vitrifiye",
                "Amerikan panel iç kapılar",
                "Çelik giriş kapısı",
                "Kapalı mutfak granit tezgâh",
                "Klima tesisatı hazır (cihaz hariç)",
              ].map((text, i) => (
                <div key={i} className="rounded-2xl shadow-md hover:shadow-lg bg-white border-l-4 border-[#0077B6] p-4 transition">
                  <span className="text-navy/85">{text}</span>
                </div>
              ))}
            </div>

            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { title: "A Blok", info: "10 kat her katta 6 daire – 2 asansör" },
                { title: "B Blok", info: "10 kat her katta 8 daire – 2 asansör" },
              ].map((b, i) => (
                <div key={i} className="rounded-2xl bg-light-gray p-6 shadow-md">
                  <div className="font-heading text-xl text-navy">{b.title}</div>
                  <p className="mt-1 text-navy/80">{b.info}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* Galeri */}
      <motion.section id="galeri" className="bg-navy" {...fade}>
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-20">
          <h2 className="font-heading text-2xl sm:text-3xl font-semibold text-center">Galeri</h2>
          <div className="mx-auto mt-2 w-16 border-b-2 border-[#D4AF37]" />

          {/* Mobile: tek tek kaydırmalı slider (scroll-snap) */}
          <div className="md:hidden relative mt-8">
            <div
              ref={gallerySliderRef}
              className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth gap-4"
            >
              {galleryItems.map((img, i) => (
                <button
                  key={i}
                  onClick={() => openLightbox(galleryItems, i)}
                  className="group flex-shrink-0 w-full snap-center rounded-2xl overflow-hidden bg-light-gray shadow-md focus:outline-none"
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="h-64 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </button>
              ))}
            </div>
            {/* Slider controls */}
            <div className="pointer-events-none absolute inset-y-0 left-0 right-0 flex items-center justify-between px-2">
              <button
                aria-label="Önceki görsel"
                onClick={slidePrev}
                className="pointer-events-auto rounded-full bg-white/20 p-2 text-white hover:bg-white/30"
              >
                ◀
              </button>
              <button
                aria-label="Sonraki görsel"
                onClick={slideNext}
                className="pointer-events-auto rounded-full bg-white/20 p-2 text-white hover:bg-white/30"
              >
                ▶
              </button>
            </div>
          </div>

          {/* Desktop: 2x2 grid */}
          <div className="hidden md:grid mt-8 grid-cols-2 gap-4">
            {galleryItems.map((img, i) => (
              <button
                key={i}
                onClick={() => openLightbox(galleryItems, i)}
                className="group rounded-2xl overflow-hidden bg-light-gray shadow-md focus:outline-none"
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="h-64 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </button>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Daire Planları */}
      <motion.section id="planlar" className="bg-light-gray text-navy" {...fade}>
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-20">
          <div className="rounded-2xl bg-white shadow-md p-5 sm:p-10">
            <h2 className="font-heading text-2xl sm:text-3xl font-semibold text-center">Daire Planları</h2>
            <div className="mx-auto mt-2 w-16 border-b-2 border-[#D4AF37]" />
            <p className="mt-2 text-navy/80">En Küçük 70 m² / En Büyük 128 m² • Toplam 149 daire → 1+1 (1 adet), 2+1 (118 adet), 3+1 (30 adet)</p>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* 1+1 */}
              <div className="bg-gradient-to-r from-[#0A2E50] via-[#0077B6] to-[#00B4D8] p-[1px] rounded-2xl hover:shadow-xl transition">
                <button className="w-full rounded-2xl bg-light-gray p-4 shadow-md transition-transform hover:scale-105 text-left" onClick={() => openLightbox(planItems_1_1, 0)}>
                  <span className="inline-block rounded-full bg-[#00B4D8]/15 text-[#00B4D8] text-xs px-3 py-1">1+1</span>
                  <img src="/images/plans/1+1-1.png" alt="1+1 daire planı" className="mt-2 h-40 w-full object-contain rounded-xl" />
                  <p className="mt-2 text-navy/80">70–90 m² • 1 adet</p>
                </button>
              </div>
              {/* 2+1 */}
              <div className="bg-gradient-to-r from-[#0A2E50] via-[#0077B6] to-[#00B4D8] p-[1px] rounded-2xl hover:shadow-xl transition">
                <button className="w-full rounded-2xl bg-light-gray p-4 shadow-md transition-transform hover:scale-105 text-left" onClick={() => openLightbox(planItems_2_1, 0)}>
                  <span className="inline-block rounded-full bg-[#0077B6]/15 text-[#0077B6] text-xs px-3 py-1">2+1</span>
                  <img src="/images/plans/2+1-1.png" alt="2+1 daire planı" className="mt-2 h-40 w-full object-contain rounded-xl" />
                  <p className="mt-2 text-navy/80">85–110 m² • 118 adet</p>
                </button>
              </div>
              {/* 3+1 */}
              <div className="bg-gradient-to-r from-[#0A2E50] via-[#0077B6] to-[#00B4D8] p-[1px] rounded-2xl hover:shadow-xl transition">
                <div className="rounded-2xl bg-light-gray p-4 shadow-md">
                  <span className="inline-block rounded-full bg-[#0A2E50]/15 text-[#0A2E50] text-xs px-3 py-1">3+1</span>
                  <div className="mt-2 grid grid-cols-2 gap-2">
                    {planItems_3_1.map((img, i) => (
                      <button key={i} onClick={() => openLightbox(planItems_3_1, i)} className="block">
                        <img src={img.src} alt={img.alt || "3+1 daire planı"} className="h-40 w-full object-contain rounded-xl transition-transform hover:scale-105" />
                      </button>
                    ))}
                  </div>
                  <p className="mt-2 text-navy/80">100–128 m² • 30 adet</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Kat Planları */}
      <motion.section id="katplanlari" className="bg-navy" {...fade}>
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-20">
          <h2 className="font-heading text-2xl sm:text-3xl font-semibold text-center">Kat Planları</h2>
          <div className="mx-auto mt-2 w-16 border-b-2 border-[#D4AF37]" />
          <p className="mt-2 text-white/80 text-center">Ayrıntılı Kat Planları</p>
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
            {floorItems.map((img, i) => (
              <button key={i} onClick={() => openLightbox(floorItems, i)} className="group block rounded-2xl overflow-hidden bg-light-gray shadow-md focus:outline-none">
                <img src={img.src} alt={img.alt} className="h-72 w-full object-contain transition-transform duration-300 group-hover:scale-105" />
              </button>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Ödeme Planı */}
      <motion.section id="odeme-plani" className="bg-[#F6F8FA]" {...fade}>
        <div className="max-w-5xl mx-auto py-16 px-4 text-center">
          <div className="bg-white shadow-md rounded-2xl p-8 md:p-10 transition-transform hover:scale-105">
            <h2 className="text-3xl font-bold text-[#0A2E50] text-center">Ödeme Planı</h2>
            <p className="text-lg text-center text-gray-600 mt-2">
              Kooperatif üyeleri, her ay 30.000 TL aidat ödemesi yapar. Bu ödemeler 2026 yılında gerçekleştirilecek Genel Kurula kadar devam edecektir.
            </p>
            <div className="bg-gradient-to-r from-[#0077B6] to-[#00B4D8] rounded-xl text-white p-6 mt-6 text-center">
              <h3 className="text-2xl md:text-3xl font-semibold">Aylık Aidat: 30.000 TL</h3>
              <p className="mt-1 text-sm md:text-base text-white/90">2026’daki Genel Kurul’a kadar geçerlidir.</p>
            </div>
            <div className="bg-amber-50 border border-amber-200 text-amber-800 rounded-xl p-4 mt-6">
              Aidat tutarları Genel Kurul kararlarına göre güncellenebilir. Detaylı ödeme koşulları kooperatif yönetimi tarafından duyurulmaktadır.
            </div>
            <a href="#iletisim" className="inline-block bg-gradient-to-r from-[#0077B6] to-[#00B4D8] text-white rounded-full px-6 py-3 mt-8 hover:brightness-110">
              Kooperatif İletişim ve Bilgi Al
            </a>
          </div>
        </div>
      </motion.section>

      {/* Konum */}
      <motion.section id="konum" className="bg-light-gray text-navy" {...fade}>
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-20">
          <div className="rounded-2xl bg-white shadow-md p-5 sm:p-10">
            <h2 className="font-heading text-2xl sm:text-3xl font-semibold text-center">Konum</h2>
            <div className="mx-auto mt-2 w-16 border-b-2 border-[#D4AF37]" />
            <p className="mt-2 text-navy/80">Yahşelli Mah. 165 Ada 7 Parsel – Menemen / İzmir</p>
            <p className="text-navy/70">Proje Menemen Yahşelli’de, Menemen Devlet Hastanesi’ne 700 m, İZBAN’a 1 km mesafede.</p>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {locationItems.map((img, i) => (
                <button key={i} onClick={() => openLightbox(locationItems, i)} className="group rounded-2xl overflow-hidden bg-light-gray shadow-md focus:outline-none">
                  <img src={img.src} alt={img.alt} className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* İletişim */}
      <motion.section id="iletisim" className="bg-[#0A2E50]" {...fade}>
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-20">
          <div className="rounded-2xl bg-[#0A2E50] p-5 sm:p-10 shadow-md text-white">
            <h2 className="font-heading text-2xl sm:text-3xl font-semibold text-center">İletişim</h2>
            <div className="mx-auto mt-2 w-16 border-b-2 border-[#D4AF37]" />
            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="rounded-xl shadow-md bg-white/10 hover:bg-white/15 transition p-5">
                <div className="font-heading flex items-center gap-2">📞 Telefon</div>
                <a href="tel:+905016103897" className="text-white/90 hover:underline">+90 501 610 38 97</a>
              </div>
              <div className="rounded-xl shadow-md bg-white/10 hover:bg-white/15 transition p-5">
                <div className="font-heading flex items-center gap-2">✉️ E-posta</div>
                <a href="mailto:ssizmirmaviadakoop@gmail.com" className="text-white/90 hover:underline">ssizmirmaviadakoop@gmail.com</a>
              </div>
              <div className="rounded-xl shadow-md bg-white/10 hover:bg-white/15 transition p-5">
                <div className="font-heading flex items-center gap-2">📍 Adres</div>
                <p className="text-white/90">Çobanoğlu Zeki Bey Cd. Halim Alanyalı İş Hanı No: 7/210 Konak – İzmir</p>
              </div>
            </div>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="rounded-xl shadow-md bg-white/10 hover:bg-white/15 transition p-5">
                <div className="font-heading">Vergi Dairesi</div>
                <p className="text-white/90">Kemeraltı VD 4381531582</p>
              </div>
              <div className="rounded-xl shadow-md bg-white/10 hover:bg-white/15 transition p-5">
                <div className="font-heading">MERSİS</div>
                <p className="text-white/90">0483153158200001</p>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Lightbox Modal */}
      {lightbox && (
        <div className="fixed inset-0 z-50 bg-[#0A2E50]/80 backdrop-blur-sm flex items-center justify-center p-4" role="dialog" aria-modal="true">
          <button onClick={closeLightbox} aria-label="Kapat" className="absolute right-4 top-4 rounded-full bg-white/20 p-2 text-white hover:bg-white/30">✕</button>
          <button onClick={prevLightbox} aria-label="Önceki" className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/20 p-2 text-white hover:bg-white/30">◀</button>
          <button onClick={nextLightbox} aria-label="Sonraki" className="absolute right-12 top-1/2 -translate-y-1/2 rounded-full bg-white/20 p-2 text-white hover:bg-white/30">▶</button>
          <div className="max-w-[95vw]">
            <img src={lightbox.items[lightbox.index].src} alt={lightbox.items[lightbox.index].alt || ""} className="max-w-[95vw] max-h-[80vh] object-contain" />
            {lightbox.items[lightbox.index].alt && (
              <div className="mt-3 text-center text-white/90 text-sm">{lightbox.items[lightbox.index].alt}</div>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-navy text-light-blue">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-6 text-center text-sm">
          © 2025 SS İZMİR MAVİ ADA Konut Yapı Kooperatifi
        </div>
      </footer>
    </main>
  );
}
