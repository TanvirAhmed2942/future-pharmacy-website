import React from "react";
import OtherBusinessLayout from "@/components/main/other-businesses/otherBusinessLayout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Other Businesses | Optimus HS",
  description: "Other Businesses page of Optimus Health Solutions",
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
  keywords: ["Other Businesses", "Optimus Health Solutions", "Business Services", "Business Solutions", "Business Benefits"],
  authors: [{ name: "Optimus Health Solutions" }],
  robots: "index, follow",
  openGraph: {
    title: "Other Businesses | Optimus HS",
    description: "Other Businesses page of Optimus Health Solutions",
    images: "/icon.svg",
  },
  twitter: {
    card: "summary_large_image",
    title: "Other Businesses | Optimus HS",
    description: "Other Businesses page of Optimus Health Solutions",
    images: "/icon.svg",
  },
  alternates: {
    canonical: "https://optimushs.com/other-businesses",
    languages: {
      "en": "https://optimushs.com/other-businesses",
      "es": "https://optimushs.com/other-businesses",
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
      <OtherBusinessLayout />
    </div>
  );
}

export default page;
