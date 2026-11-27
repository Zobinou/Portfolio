
import type { Metadata, Viewport } from "next";
import { connection } from "next/server";
import { Inter, Poppins } from "next/font/google";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import LenisProvider from "@/components/animations/LenisProvider";
import ConditionalShell from "@/components/layout/ConditionalShell";
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
  title: "Zo Lantosoa | Data, technologie et innovation numérique",
  description:
    "Portfolio de Zo Lantosoa, Data, technologie et innovation numérique",
  icons: {
    icon: [
      {
        url: "/favicon.jpeg",
        type: "image/jpeg",
      },
    ],
    shortcut: "/favicon.jpeg",
    apple: [
      {
        url: "/favicon.jpeg",
        type: "image/jpeg",
      },
    ],
  },
};

export const viewport: Viewport = {
  themeColor: [
    {
      media: "(prefers-color-scheme: light)",
      color: "#f8fafc",
    },
    {
      media: "(prefers-color-scheme: dark)",
      color: "#0a0e1a",
    },
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
            <ConditionalShell>
              {children}
            </ConditionalShell>
          </LenisProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}