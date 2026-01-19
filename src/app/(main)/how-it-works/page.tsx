import React from "react";
import HowItWorksLayout from "@/components/main/howitworks/howItWorksLayout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How It Works | Optimus HS",
  description: "How It Works page of Optimus Health Solutions",
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
  keywords: [
    "How It Works",
    "Optimus Health Solutions",
    "How It Works Page",
    "How Optimus Health Solution Works",
    "How It Works Benefits",
  ],
  authors: [{ name: "Optimus Health Solutions" }],
  robots: "index, follow",
  openGraph: {
    title: "How It Works | Optimus HS",
    description: "How It Works page of Optimus Health Solutions",
    images: "/icon.svg",
  },
  twitter: {
    card: "summary_large_image",
    title: "How It Works | Optimus HS",
    description: "How It Works page of Optimus Health Solutions",
    images: "/icon.svg",
  },
  alternates: {
    canonical: "https://optimushs.com/how-it-works",
    languages: {
      "en": "https://optimushs.com/how-it-works",
      "es": "https://optimushs.com/how-it-works",
    },
  },
  category: "health",
  applicationName: "Optimus HS",
  publisher: "Optimus Health Solutions",
  creator: "Optimus Health Solutions",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

export default function page() {
  return (
    <div className="min-h-screen bg-white">
      <HowItWorksLayout />
    </div>
  );
}
