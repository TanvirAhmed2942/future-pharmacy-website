import React from "react";
import InvestorsLayout from "@/components/main/investors/investorsLayout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Investors | Optimus HS",
  description: "Investors page of Optimus Health Solutions",
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
  keywords: ["Investors", "Optimus Health Solutions", "Investors Page", "Investors Services", "Investors Benefits", "Invest in Optimus Health Solutions", "Investors Inquiry", "Investors Inquiry Form", "Investors Relations", "Pharmacy for Future"],
  authors: [{ name: "Optimus Health Solutions" }],
  robots: "index, follow",
  openGraph: {
    title: "Investors | Optimus HS",
    description: "Investors page of Optimus Health Solutions",
    images: "/icon.svg",
  },
  twitter: {
    card: "summary_large_image",
    title: "Investors | Optimus HS",
    description: "Investors page of Optimus Health Solutions",
    images: "/icon.svg",
  },
  alternates: {
    canonical: "https://optimushs.com/investors",
    languages: {
      "en": "https://optimushs.com/investors",
      "es": "https://optimushs.com/investors",
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
      <InvestorsLayout />
    </div>
  );
}

export default page;
