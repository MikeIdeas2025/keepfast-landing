import { ReactNode } from "react";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import PostHogProvider from "@/components/PostHogProvider";
import CookieBanner from "@/components/CookieBanner";
import "./globals.css";

const font = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Keepfa.st - AI-Powered Churn Prevention for SaaS",
  description:
    "Stop SaaS churn before it happens. AI-powered health scores, churn radar, and actionable insights for indie founders and micro-SaaS. Track user signals, predict risk, and save MRR.",
  keywords: [
    "churn prevention",
    "customer retention",
    "SaaS churn",
    "AI churn prediction",
    "user health score",
    "indie hackers",
    "micro-SaaS",
    "retention analytics",
    "churn radar",
    "customer analytics",
  ],
  authors: [{ name: "Keepfa.st" }],
  creator: "Keepfa.st",
  publisher: "Keepfa.st",
  applicationName: "Keepfa.st",
  category: "SaaS",
  openGraph: {
    title: "Keepfa.st - Stop SaaS Churn Before It Happens",
    description:
      "AI-powered health scores and churn radar for indie founders. Track signals, predict risk, and save MRR.",
    type: "website",
    siteName: "Keepfa.st",
    locale: "en_US",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Keepfa.st - AI-Powered Churn Prevention for SaaS",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Keepfa.st - AI Churn Prevention",
    description:
      "Track user signals, predict churn risk, and save MRR with AI-powered insights.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/icon.svg", type: "image/svg+xml", sizes: "any" },
    ],
    apple: [
      { url: "/icon.svg", sizes: "180x180", type: "image/svg+xml" },
    ],
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" data-theme="light" className={font.className}>
      <body>
        <PostHogProvider />
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 4000,
            style: {
              background: "#363636",
              color: "#fff",
            },
            success: {
              iconTheme: {
                primary: "#FFB800",
                secondary: "#fff",
              },
            },
          }}
        />
        {children}
        <CookieBanner />
      </body>
    </html>
  );
}
