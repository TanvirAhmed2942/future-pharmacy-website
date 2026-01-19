import TransferOnline from "@/components/main/transfer/online/transferOnline";
import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Transfer Prescription | Optimus HS",
  description: "Transfer your prescription online with Optimus Health Solutions",
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
  keywords: ["Transfer Prescription", "Online Transfer", "Prescription Transfer", "Optimus Health Solutions", "Pharmacy Transfer"],
  authors: [{ name: "Optimus Health Solutions" }],
  robots: "index, follow",
  openGraph: {
    title: "Transfer Prescription | Optimus HS",
    description: "Transfer your prescription online with Optimus Health Solutions",
    images: "/icon.svg",
  },
  twitter: {
    card: "summary_large_image",
    title: "Transfer Prescription | Optimus HS",
    description: "Transfer your prescription online with Optimus Health Solutions",
    images: "/icon.svg",
  },
  alternates: {
    canonical: "https://optimushs.com/transfer-prescription/online",
    languages: {
      "en": "https://optimushs.com/transfer-prescription/online",
      "es": "https://optimushs.com/transfer-prescription/online",
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
      <TransferOnline />
    </div>
  );
}

export default page;
