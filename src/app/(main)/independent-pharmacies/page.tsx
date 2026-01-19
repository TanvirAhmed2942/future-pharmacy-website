import IndependentPharmciesLayout from "@/components/main/independent-pharmacies/IndependentPharmciesLayout";
import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Independent Pharmacies | Optimus HS",
  description: "Independent Pharmacies page of Optimus Health Solutions",
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
  keywords: ["Independent Pharmacies", "Optimus Health Solutions", "Local Pharmacies", "Pharmacy Services", "Pharmacy Benefits", "Community Pharmacies"],
  authors: [{ name: "Optimus Health Solutions" }],
  robots: "index, follow",
  openGraph: {
    title: "Independent Pharmacies | Optimus HS",
    description: "Independent Pharmacies page of Optimus Health Solutions",
    images: "/icon.svg",
  },
  twitter: {
    card: "summary_large_image",
    title: "Independent Pharmacies | Optimus HS",
    description: "Independent Pharmacies page of Optimus Health Solutions",
    images: "/icon.svg",
  },
  alternates: {
    canonical: "https://optimushs.com/independent-pharmacies",
    languages: {
      "en": "https://optimushs.com/independent-pharmacies",
      "es": "https://optimushs.com/independent-pharmacies",
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
  return <IndependentPharmciesLayout />;
}

export default page;
