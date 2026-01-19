import EarnAsDriverLayout from "@/components/main/earnasdriver/businessLayout";
import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Earn as Driver | Optimus HS",
  description: "Earn as Driver page of Optimus Health Solutions",
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
  keywords: ["Earn as Driver", "Optimus Health Solutions", "Earn as Driver Page", "Earn as Driver Services", "Earn as Driver Benefits", "Earn as Driver Features", "Delivery Driver", "Delivery Services", "Delivery Benefits", "Delivery Features"],
  authors: [{ name: "Optimus Health Solutions" }],
  robots: "index, follow",
  openGraph: {
    title: "Earn as Driver | Optimus HS",
    description: "Earn as Driver page of Optimus Health Solutions",
    images: "/icon.svg",
  },
  twitter: {
    card: "summary_large_image",
    title: "Earn as Driver | Optimus HS",
    description: "Earn as Driver page of Optimus Health Solutions",
    images: "/icon.svg",
  },
  alternates: {
    canonical: "https://optimushs.com/earn-as-driver",
    languages: {
      "en": "https://optimushs.com/earn-as-driver",
      "es": "https://optimushs.com/earn-as-driver",
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
      <EarnAsDriverLayout />
    </div>
  );
}

export default page;
