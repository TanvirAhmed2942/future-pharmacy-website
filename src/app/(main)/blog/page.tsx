import BlogLayout from "@/components/main/blog/blogLayout";
import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | Optimus HS",
  description: "Blog page of Optimus Health Solutions",
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
  keywords: ["Blog", "Optimus Health Solutions", "Blog Page", "Blog Posts", "Blog Articles", "Blog Categories", "Blog Tags", "Blog Search"],
  authors: [{ name: "Optimus Health Solutions" }],
  robots: "index, follow",
  openGraph: {
    title: "Blog | Optimus HS",
    description: "Blog page of Optimus Health Solutions",
    images: "/icon.svg",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | Optimus HS",
    description: "Blog page of Optimus Health Solutions",
    images: "/icon.svg",
  },
  alternates: {
    canonical: "https://optimushs.com/blog",
    languages: {
      "en": "https://optimushs.com/blog",
      "es": "https://optimushs.com/blog",
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
  return <BlogLayout />;
}

export default page;
