import AboutUs from "@/components/main/aboutus/aboutUs";
import React from "react";
import { metadata } from "@/lib/metadata";


metadata.title = "About Us | Optimus Health Solutions";
metadata.description = "About Us page of Optimus Health Solutions";
metadata.icons = {
  icon: "/icon.svg",
};
metadata.keywords = ["About Us", "Optimus Health Solutions" , "Our Mission", "Our Vision", "Our Values", "Our Story", "Our Team", "Our History", "Our Achievements", "Our Goals", "Our Objectives", "Our Mission", "Our Vision", "Our Values", "Our Story", "Our Team", "Our History", "Our Achievements", "Our Goals", "Our Objectives"];
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
  canonical: "https://optimushealthsolutions.com/about-us",
  languages: {
    "en": "https://optimushealthsolutions.com/about-us",
    "es": "https://optimushealthsolutions.com/about-us",
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
  return <AboutUs />;
}

export default page;
