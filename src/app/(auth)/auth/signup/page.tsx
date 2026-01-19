import Signup from "@/components/auth/signup/signup";
import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Signup | Optimus HS",
  description: "Signup to your account to continue",
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
  keywords: ["Signup", "Optimus Health Solutions", "Create Account", "Register Account", "Create Profile"],
  authors: [{ name: "Optimus Health Solutions" }],
  robots: "index, follow",
  openGraph: {
    title: "Signup | Optimus HS",
    description: "Signup to your account to continue",
    images: "/icon.svg",
  },
  twitter: {
    card: "summary_large_image",
    title: "Signup | Optimus HS",
    description: "Signup to your account to continue",
    images: "/icon.svg",
  },
  alternates: {
    canonical: "https://optimushs.com/auth/signup",
    languages: {
      "en": "https://optimushs.com/auth/signup",
      "es": "https://optimushs.com/auth/signup",
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
    <div className="w-full min-h-screen bg-transparent lg:bg-gray-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <Signup />
    </div>
  );
}

export default page;
