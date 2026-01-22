import Login from "@/components/auth/login/login";
import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login | Optimus HS",
  description: "Login to your account to continue",
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
  keywords: ["Login", "Optimus HS"],
  authors: [{ name: "Optimus Health Solutions" }],
  robots: "index, follow",
  openGraph: {
    title: "Login | Optimus HS",
    description: "Login to your account to continue",
    images: "/icon.svg",
  },
  twitter: {
    card: "summary_large_image",
    title: "Login | Optimus HS",
    description: "Login to your account to continue",
    images: "/icon.svg",
  },
  alternates: {
    canonical: "https://optimushs.com/auth/login",
    languages: {
      "en": "https://optimushs.com/auth/login",
      "es": "https://optimushs.com/auth/login",
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
    <div className="w-full  bg-transparent lg:bg-gray-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <Login />
    </div>
  );
}

export default page;
