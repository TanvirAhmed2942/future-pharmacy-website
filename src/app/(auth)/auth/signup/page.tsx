import { metadata } from "@/lib/metadata";
import Signup from "@/components/auth/signup/signup";
import React from "react";


metadata.title = "Signup | Optimus Health Solutions";
metadata.description = "Signup to your account to continue";
metadata.icons = {
  icon: "/icon.svg",
};
metadata.keywords = ["Signup", "Optimus Health Solutions", "Create Account", "Register Account", "Create Profile"];
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
  canonical: "https://optimushealthsolutions.com/signup",
  languages: {
    "en": "https://optimushealthsolutions.com/signup",
    "es": "https://optimushealthsolutions.com/signup",
  },
};
metadata.category = "health";
metadata.applicationName = "Optimus Health Solutions";
metadata.publisher = "Optimus Health Solutions";
metadata.creator = "Optimus Health Solutions";

function page() {
  return (
    <div className="w-full min-h-screen bg-transparent lg:bg-gray-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <Signup />
    </div>
  );
}

export default page;
