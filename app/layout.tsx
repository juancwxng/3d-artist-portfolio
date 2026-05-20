import type { Metadata } from "next";
import { Playfair_Display, Jost } from "next/font/google";
import "./globals.css";
import { siteTitle, siteDescription } from "@/data/portfolio";
import PremiumEffects from "@/components/ui/PremiumEffects";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400"],
  style: ["italic", "normal"],
  variable: "--font-playfair",
  display: "swap",
});

const jost = Jost({
  subsets: ["latin"],
  weight: ["300", "400"],
  variable: "--font-jost",
  display: "swap",
});

export const metadata: Metadata = {
  title: siteTitle,
  description: siteDescription,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${jost.variable}`}
      style={
        {
          "--font-cormorant": "var(--font-playfair)",
          "--font-dm-sans": "var(--font-jost)",
        } as React.CSSProperties
      }
    >
      <body>
        <PremiumEffects />
        {children}
      </body>
    </html>
  );
}
