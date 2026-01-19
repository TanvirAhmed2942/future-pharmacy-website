import RefillOnline from "@/components/main/refill/online/refillOnline";
import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Refill Prescription | Optimus HS",
  description: "Refill your prescription online with Optimus Health Solutions",
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
  keywords: ["Refill Prescription", "Online Refill", "Prescription Refill", "Optimus Health Solutions", "Pharmacy Refill"],
  authors: [{ name: "Optimus Health Solutions" }],
  robots: "index, follow",
  openGraph: {
    title: "Refill Prescription | Optimus HS",
    description: "Refill your prescription online with Optimus Health Solutions",
    images: "/icon.svg",
  },
  twitter: {
    card: "summary_large_image",
    title: "Refill Prescription | Optimus HS",
    description: "Refill your prescription online with Optimus Health Solutions",
    images: "/icon.svg",
  },
  alternates: {
    canonical: "https://optimushs.com/refill-prescription/online",
    languages: {
      "en": "https://optimushs.com/refill-prescription/online",
      "es": "https://optimushs.com/refill-prescription/online",
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
    <div className="min-h-screen bg-white  py-4 md:py-16">
      <RefillOnline />
    </div>
  );
}

export default page;
