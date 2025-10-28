import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "bootstrap/dist/css/bootstrap-grid.min.css";
import "./globals.css";
import { Providers } from "@/components/Providers";
import WhatsAppButton from "@/components/WhatsAppButton";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FiveTech | Inovação e Tecnologia",
  description: "Consultoria especializada em desenvolvimento de sistemas, IA, automação e transformação digital.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>{children}</Providers>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
