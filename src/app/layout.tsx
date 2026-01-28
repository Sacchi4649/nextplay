import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollRestoration from "@/components/ScrollRestoration";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NextPlay - Discover Free-to-Play Games",
  description: "Discover and explore the best free-to-play games. Browse hundreds of F2P titles, save your favorites, and stay updated with gaming news.",
  keywords: ["free to play", "f2p games", "gaming", "mmorpg", "shooter", "moba"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        variables: {
          colorPrimary: "#a855f7",
          colorBackground: "#1f1f2e",
          colorInputBackground: "#0a0a0f",
          colorInputText: "#ffffff",
          colorText: "#ffffff",
          colorTextSecondary: "#a1a1aa",
          colorNeutral: "#ffffff",
        },
        elements: {
          userButtonPopoverCard: {
            backgroundColor: "#1f1f2e",
            border: "1px solid #3f3f50",
          },
          userButtonPopoverActionButton: {
            color: "#ffffff",
            "&:hover": {
              backgroundColor: "#2a2a3e",
              color: "#a855f7",
            },
          },
          userButtonPopoverActionButtonText: {
            color: "#ffffff",
          },
          userButtonPopoverActionButtonIcon: {
            color: "#a1a1aa",
          },
          userButtonPopoverFooter: {
            borderTop: "1px solid #3f3f50",
          },
          userPreviewMainIdentifier: {
            color: "#ffffff",
          },
          userPreviewSecondaryIdentifier: {
            color: "#a1a1aa",
          },
        },
      }}
    >
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <ScrollRestoration />
          <Navbar />
          <main className="min-h-screen pt-16">
            {children}
          </main>
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
