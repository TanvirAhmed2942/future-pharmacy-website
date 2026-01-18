import BusinessLayout from "@/components/main/business/businessLayout";
import React from "react";
import { metadata } from "@/lib/metadata";

metadata.title = "Business | Optimus Health Solutions";
metadata.description = "Business page of Optimus Health Solutions";
metadata.icons = {
  icon: "/icon.svg",
};
metadata.keywords = ["Business", "Optimus Health Solutions", "Business Page", "Business Services", "Business Products", "Business Solutions", "Business Benefits", "Business Features" ];
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
  canonical: "https://optimushealthsolutions.com/business",
  languages: {
    "en": "https://optimushealthsolutions.com/business",
    "es": "https://optimushealthsolutions.com/business",
  },
};
metadata.category = "health";
metadata.applicationName = "Optimus Health Solutions";
metadata.publisher = "Optimus Health Solutions";
metadata.creator = "Optimus Health Solutions";
metadata.formatDetection = {
  email: false,
  address: false,
  telephone: false,
};
function page() {
  return (
    <div className="min-h-screen bg-white">
      <BusinessLayout />
    </div>
  );
}

export default page;
