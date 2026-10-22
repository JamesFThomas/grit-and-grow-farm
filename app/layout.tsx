import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { NavBar } from "@/components/shared/NavBar/NavBar";
import { Footer } from "@/components/shared/Footer/Footer";

const display = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["600", "700"],
});

const body = Inter({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Grit and Grow Farm",
  description:
    "A small family farm in Byram, Mississippi growing heirloom vegetables, herbs, honey, and mushrooms naturally.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>
        <NavBar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
