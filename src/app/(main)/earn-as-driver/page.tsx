import EarnAsDriverLayout from "@/components/main/earnasdriver/businessLayout";
import React from "react";
import { metadata } from "@/lib/metadata";


metadata.title = "Earn as Driver | Optimus Health Solutions";
metadata.description = "Earn as Driver page of Optimus Health Solutions";
metadata.icons = {
  icon: "/icon.svg",
};
metadata.keywords = ["Earn as Driver", "Optimus Health Solutions", "Earn as Driver Page", "Earn as Driver Services", "Earn as Driver Benefits", "Earn as Driver Features","Delivery Driver", "Delivery Services", "Delivery Benefits", "Delivery Features"];
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
  canonical: "https://optimushealthsolutions.com/earn-as-driver",
  languages: {
    "en": "https://optimushealthsolutions.com/earn-as-driver",
    "es": "https://optimushealthsolutions.com/earn-as-driver",
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
      <EarnAsDriverLayout />
    </div>
  );
}

export default page;
