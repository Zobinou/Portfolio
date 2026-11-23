import type { Metadata, Viewport } from "next";
import { connection } from "next/server";
import { Inter, Poppins } from "next/font/google";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import LenisProvider from "@/components/animations/LenisProvider";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import "@/style/globals.css";

export const instant = false;

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Niritsiafoy Lantosoa | Frontend Developer",
  description:"Portfolio de Niritsiafoy Lantosoa, développeuse frontend spécialisée en React.js.",
  icons: "/public/favicon.jpg"
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8fafc" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0e1a" },
  ],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await connection();

  return (
    <html
      lang="fr"
      suppressHydrationWarning
      className={`${inter.variable} ${poppins.variable}`}
    >
      <body className="min-h-screen antialiased">
        <ThemeProvider>
          <LenisProvider>
            <Header />
            <main className="min-h-screen">{children}</main>
            <Footer />
          </LenisProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}