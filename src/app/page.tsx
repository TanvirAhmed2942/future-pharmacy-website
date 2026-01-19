import Home from "@/components/main/home/Home";
import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home | Optimus HS",
  description: "Home page of Optimus Health Solutions",
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
  keywords: ["Home", "Optimus Health Solutions", "Home Page", "Landing Page", "Main Page" ,"Order Refill", "Schedule Appointment", "Transfer Prescription", "Refill Prescription", "Online Refill", "Online Schedule", "Online Transfer", "Online Refill Prescription", "Online Schedule Appointment", "Online Transfer Prescription" ],
  authors: [{ name: "Optimus Health Solutions" }],
  robots: "index, follow",
  openGraph: {
    title: "Home | Optimus Health Solutions",
    description: "Home page of Optimus Health Solutions",
    images: "/icon.svg",
  },
  twitter: {
    card: "summary_large_image",
    title: "Home | Optimus Health Solutions",
    description: "Home page of Optimus Health Solutions",
    images: "/icon.svg",
  },
  alternates: {
    canonical: "https://optimushs.com",
    languages: {
      "en": "https://optimushs.com",
      "es": "https://optimushs.com",
    },
  },
  category: "health",
  applicationName: "Optimus Health Solutions",
  publisher: "Optimus Health Solutions",
  creator: "Optimus Health Solutions",
};

export default function page() {
  return (
    <div className="min-h-screen ">
      <Home />
    </div>
  );
}

