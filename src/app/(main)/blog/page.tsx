import BlogLayout from "@/components/main/blog/blogLayout";
import React from "react";
import { metadata } from "@/lib/metadata";


metadata.title = "Blog | Optimus Health Solutions";
metadata.description = "Blog page of Optimus Health Solutions";
metadata.icons = {
  icon: "/icon.svg",
};
metadata.keywords = ["Blog", "Optimus Health Solutions", "Blog Page", "Blog Posts", "Blog Articles", "Blog Categories", "Blog Tags", "Blog Search" ];
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
  canonical: "https://optimushealthsolutions.com/blog",
  languages: {
    "en": "https://optimushealthsolutions.com/blog",
    "es": "https://optimushealthsolutions.com/blog",
  },
};
metadata.category = "health";
metadata.applicationName = "Optimus Health Solutions";
metadata.publisher = "Optimus Health Solutions";
metadata.creator = "Optimus Health Solutions";

function page() {
  return <BlogLayout />;
}

export default page;
