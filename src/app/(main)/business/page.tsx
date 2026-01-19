import BusinessLayout from "@/components/main/business/businessLayout";
import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Business | Optimus HS",
  description: "Business page of Optimus Health Solutions",
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
  keywords: ["Business", "Optimus Health Solutions", "Business Page", "Business Services", "Business Products", "Business Solutions", "Business Benefits", "Business Features"],
  authors: [{ name: "Optimus Health Solutions" }],
  robots: "index, follow",
  openGraph: {
    title: "Business | Optimus HS",
    description: "Business page of Optimus Health Solutions",
    images: "/icon.svg",
  },
  twitter: {
    card: "summary_large_image",
    title: "Business | Optimus HS",
    description: "Business page of Optimus Health Solutions",
    images: "/icon.svg",
  },
  alternates: {
    canonical: "https://optimushs.com/business",
    languages: {
      "en": "https://optimushs.com/business",
      "es": "https://optimushs.com/business",
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
function page() {
  return (
    <div className="min-h-screen bg-white">
      <BusinessLayout />
    </div>
  );
}

export default page;
