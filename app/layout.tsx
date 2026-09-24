import type { Metadata } from "next";
import localFont from "next/font/local";
import { site } from "@/src/data/site";
import "./globals.css";
const sans = localFont({
  src: [
    {
      path: "../public/fonts/be-vietnam-pro.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/be-vietnam-pro-bold.ttf",
      weight: "800",
      style: "normal",
    },
  ],
  variable: "--font-sans",
  display: "swap",
});
const serif = localFont({
  src: [
    {
      path: "../public/fonts/playfair-display.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/playfair-display-italic.ttf",
      weight: "400",
      style: "italic",
    },
  ],
  variable: "--font-serif",
  display: "swap",
});
export const metadata: Metadata = {
  title: `${site.title} | ${site.subtitle}`,
  description: site.description,
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" className={`${sans.variable} ${serif.variable}`}>
      <body>{children}</body>
    </html>
  );
}
