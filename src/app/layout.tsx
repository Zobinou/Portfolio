import type { Metadata, Viewport } from "next";
import { connection } from "next/server";
import { Inter, Poppins } from "next/font/google";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import LenisProvider from "@/components/animations/LenisProvider";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BabylonScene from "@/components/3d/BabylonScene";
import "@/style/globals.css";

export const instant = false;

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"], variable: "--font-poppins", display: "swap" });

export const metadata: Metadata = {
  title: "Niritsiafoy Lantosoa | Frontend Developer",
  description: "Portfolio de Niritsiafoy Lantosoa, développeuse frontend spécialisée en React.js.",
  icons: {
    icon: "/public/favicon.jpg",
    apple: "/public/favicon.jpg",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8fafc" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0e1a" },
  ],
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  await connection();

  return (
    <html lang="fr" suppressHydrationWarning className={`${inter.variable} ${poppins.variable}`}>
      <body className="min-h-screen antialiased">
        <ThemeProvider>
          <LenisProvider>
            <div className="fixed inset-0 -z-10 pointer-events-none opacity-60 dark:opacity-40">
              <BabylonScene />
            </div>

            <div className="fixed inset-0 -z-10 bg-bg-primary/50 backdrop-blur-[2px] pointer-events-none" />

            <div className="relative z-10 flex min-h-screen flex-col">
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
          </LenisProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}