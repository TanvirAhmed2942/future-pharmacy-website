import ScheduleOnline from "@/components/main/schedule/online/scheduleOnline";
import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Schedule Appointment | Optimus HS",
  description: "Schedule your pharmacy appointment online with Optimus Health Solutions",
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
  keywords: ["Schedule Appointment", "Online Schedule", "Pharmacy Appointment", "Optimus Health Solutions", "Book Appointment"],
  authors: [{ name: "Optimus Health Solutions" }],
  robots: "index, follow",
  openGraph: {
    title: "Schedule Appointment | Optimus HS",
    description: "Schedule your pharmacy appointment online with Optimus Health Solutions",
    images: "/icon.svg",
  },
  twitter: {
    card: "summary_large_image",
    title: "Schedule Appointment | Optimus HS",
    description: "Schedule your pharmacy appointment online with Optimus Health Solutions",
    images: "/icon.svg",
  },
  alternates: {
    canonical: "https://optimushs.com/schedule-now/online",
    languages: {
      "en": "https://optimushs.com/schedule-now/online",
      "es": "https://optimushs.com/schedule-now/online",
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
    <div className="min-h-screen bg-white  py-4 md:py-16">
      <ScheduleOnline />
    </div>
  );
}

export default page;
