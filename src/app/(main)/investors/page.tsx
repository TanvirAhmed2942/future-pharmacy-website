"use client";

import React from "react";
import InvestorsLayout from "@/components/main/investors/investorsLayout";
import { metadata } from "@/lib/metadata";

metadata.title = "Investors | Optimus Health Solutions";
metadata.description = "Investors page of Optimus Health Solutions";
metadata.icons = {
  icon: "/icon.svg",
};
metadata.keywords = ["Investors", "Optimus Health Solutions", "Investors Page", "Investors Services", "Investors Benefits", "Invest in Optimus Health Solutions","Investors Inquiry", "Investors Inquiry Form", "Investors Relations","Pharmacy for Future"];
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
  canonical: "https://optimushealthsolutions.com/investors",
  languages: {
    "en": "https://optimushealthsolutions.com/investors",
    "es": "https://optimushealthsolutions.com/investors",
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
      <InvestorsLayout />
    </div>
  );
}

export default page;
