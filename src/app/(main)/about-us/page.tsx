import AboutUs from "@/components/main/aboutus/aboutUs";
import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Optimus HS",
  description: "About Us page of Optimus Health Solutions",
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
  keywords: ["About Us", "Optimus Health Solutions", "Our Mission", "Our Vision", "Our Values", "Our Story", "Our Team", "Our History", "Our Achievements", "Our Goals", "Our Objectives"],
  authors: [{ name: "Optimus Health Solutions" }],
  robots: "index, follow",
  openGraph: {
    title: "About Us | Optimus HS",
    description: "About Us page of Optimus Health Solutions",
    images: "/icon.svg",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us | Optimus HS",
    description: "About Us page of Optimus Health Solutions",
    images: "/icon.svg",
  },
  alternates: {
    canonical: "https://optimushs.com/about-us",
    languages: {
      "en": "https://optimushs.com/about-us",
      "es": "https://optimushs.com/about-us",
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
  return <AboutUs />;
}

export default page;
