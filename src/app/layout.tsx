import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ToastProvider } from "@/context/ToastContext";
import { CompareProvider } from "@/context/CompareContext";
import { SavedProvider } from "@/context/SavedContext";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ToastContainer } from "@/components/common/Toast";
import { StickyCompareBar } from "@/components/compare/StickyCompareBar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CampusCompare - Discover, Compare, and Choose Colleges with Confidence",
  description: "Explore colleges, compare fees, placements, and ratings, and make a smarter, data-driven decision about your education.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      data-scroll-behavior="smooth"
    >
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900">
        <ToastProvider>
          <CompareProvider>
            <SavedProvider>
              <Navbar />
              <main className="flex-grow flex flex-col">
                {children}
              </main>
              <Footer />
              <StickyCompareBar />
              <ToastContainer />
            </SavedProvider>
          </CompareProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
