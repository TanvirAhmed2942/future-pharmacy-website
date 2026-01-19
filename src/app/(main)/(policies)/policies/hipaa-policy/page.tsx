import HipaaPolicy from "@/components/policies/hipaaPolicy";
import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "HIPAA Policy | Optimus HS",
  description: "HIPAA Policy page of Optimus Health Solutions",
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
  keywords: ["HIPAA Policy", "HIPAA", "Privacy", "Health Information", "Optimus Health Solutions"],
  authors: [{ name: "Optimus Health Solutions" }],
  robots: "index, follow",
  openGraph: {
    title: "HIPAA Policy | Optimus HS",
    description: "HIPAA Policy page of Optimus Health Solutions",
    images: "/icon.svg",
  },
  twitter: {
    card: "summary_large_image",
    title: "HIPAA Policy | Optimus HS",
    description: "HIPAA Policy page of Optimus Health Solutions",
    images: "/icon.svg",
  },
  alternates: {
    canonical: "https://optimushs.com/policies/hipaa-policy",
    languages: {
      "en": "https://optimushs.com/policies/hipaa-policy",
      "es": "https://optimushs.com/policies/hipaa-policy",
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
      <HipaaPolicy />
    </div>
  );
}

export default page;
