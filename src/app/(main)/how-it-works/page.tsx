import React from "react";
import HowItWorksLayout from "@/components/main/howitworks/howItWorksLayout";
import { metadata } from "@/lib/metadata";


metadata.title = "How It Works | Optimus Health Solutions";
metadata.description = "How It Works page of Optimus Health Solutions";
metadata.icons = {
  icon: "/icon.svg",
};
metadata.keywords = ["How It Works", "Optimus Health Solutions", "How It Works Page", "How Optimus Health Solution Works", "How It Works Benefits"];
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
  canonical: "https://optimushealthsolutions.com/how-it-works",
  languages: {
    "en": "https://optimushealthsolutions.com/how-it-works",
    "es": "https://optimushealthsolutions.com/how-it-works",
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
      <HowItWorksLayout />
    </div>
  );
}

export default page;
