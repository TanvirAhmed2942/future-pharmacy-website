import TermsOfService from "@/components/policies/termsOfService";
import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | Optimus HS",
  description: "Terms of Service page of Optimus Health Solutions",
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
  keywords: ["Terms of Service", "Terms", "Service Agreement", "Optimus Health Solutions"],
  authors: [{ name: "Optimus Health Solutions" }],
  robots: "index, follow",
  openGraph: {
    title: "Terms of Service | Optimus HS",
    description: "Terms of Service page of Optimus Health Solutions",
    images: "/icon.svg",
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms of Service | Optimus HS",
    description: "Terms of Service page of Optimus Health Solutions",
    images: "/icon.svg",
  },
  alternates: {
    canonical: "https://optimushs.com/policies/terms-of-service",
    languages: {
      "en": "https://optimushs.com/policies/terms-of-service",
      "es": "https://optimushs.com/policies/terms-of-service",
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
      <TermsOfService />
    </div>
  );
}

export default page;
