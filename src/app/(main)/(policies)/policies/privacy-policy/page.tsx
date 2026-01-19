import PricacyPolicy from "@/components/policies/pricacyPolicy";
import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Optimus HS",
  description: "Privacy Policy page of Optimus Health Solutions",
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
  keywords: ["Privacy Policy", "Privacy", "Data Protection", "Optimus Health Solutions"],
  authors: [{ name: "Optimus Health Solutions" }],
  robots: "index, follow",
  openGraph: {
    title: "Privacy Policy | Optimus HS",
    description: "Privacy Policy page of Optimus Health Solutions",
    images: "/icon.svg",
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy | Optimus HS",
    description: "Privacy Policy page of Optimus Health Solutions",
    images: "/icon.svg",
  },
  alternates: {
    canonical: "https://optimushs.com/policies/privacy-policy",
    languages: {
      "en": "https://optimushs.com/policies/privacy-policy",
      "es": "https://optimushs.com/policies/privacy-policy",
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
      <PricacyPolicy />
    </div>
  );
}

export default page;
