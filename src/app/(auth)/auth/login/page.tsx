import { metadata } from "@/lib/metadata";
import Login from "@/components/auth/login/login";
import React from "react";


metadata.title = "Login | Optimus Health Solutions";
metadata.description = "Login to your account to continue";
metadata.icons = {
  icon: "/icon.svg",
};
metadata.keywords = ["Login", "Optimus Health Solutions"];
metadata.authors = [{ name: "Optimus Health Solutions" }];
metadata.robots = "index, follow";
metadata.openGraph = {
  title: metadata.title,
  description: metadata.description,
  images: "/icon.svg",
};
metadata.twitter = {
  card: "summary_large_image",
  title: metadata.title,
  description: metadata.description,
  images: "/icon.svg",
};
metadata.alternates = {
  canonical: "https://optimushealthsolutions.com/login",
  languages: {
    "en": "https://optimushealthsolutions.com/login",
    "es": "https://optimushealthsolutions.com/login",
  },
};

metadata.category = "health";
metadata.applicationName = "Optimus Health Solutions";
metadata.publisher = "Optimus Health Solutions";
metadata.creator = "Optimus Health Solutions";


function page() {
  return (
    <div className="w-full min-h-screen bg-transparent lg:bg-gray-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <Login />
    </div>
  );
}

export default page;
