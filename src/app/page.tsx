import Home from "@/components/main/home/Home";
import React from "react";
import { metadata } from "@/lib/metadata";


metadata.title = "Home | Optimus Health Solutions";
metadata.description = "Home page of Optimus Health Solutions";
metadata.icons = {
  icon: "/icon.svg",
};
metadata.keywords = ["Home", "Optimus Health Solutions", "Home Page", "Landing Page", "Main Page" ,"Order Refill", "Schedule Appointment", "Transfer Prescription", "Refill Prescription", "Online Refill", "Online Schedule", "Online Transfer", "Online Refill Prescription", "Online Schedule Appointment", "Online Transfer Prescription" ];
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
  canonical: "https://optimushealthsolutions.com",
  languages: {
    "en": "https://optimushealthsolutions.com",
    "es": "https://optimushealthsolutions.com",
  },
};
metadata.category = "health";
metadata.applicationName = "Optimus Health Solutions";
metadata.publisher = "Optimus Health Solutions";
metadata.creator = "Optimus Health Solutions";

export default function page() {
  return (
    <div className="min-h-screen ">
      <Home />
    </div>
  );
}

