import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "SS İZMİR MAVİ ADA – Menemen Yahşelli Konut Yapı Kooperatifi",
  description:
    "İzmir Menemen’de lüks standartlarda 2 bloklu modern yaşam projesi.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body className={`${inter.variable} ${manrope.variable} antialiased font-sans bg-navy text-white scroll-smooth`}>
        {children}
      </body>
    </html>
  );
}
