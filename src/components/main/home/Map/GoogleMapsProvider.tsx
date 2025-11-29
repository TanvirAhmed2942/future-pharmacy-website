"use client";
import React from "react";
import { LoadScript } from "@react-google-maps/api";

const libraries: ("places" | "drawing" | "geometry" | "visualization")[] = [
  "places",
  "geometry",
  "drawing",
];

interface GoogleMapsProviderProps {
  children: React.ReactNode;
}

export default function GoogleMapsProvider({
  children,
}: GoogleMapsProviderProps) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";

  if (!apiKey) {
    console.warn(
      "Google Maps API key is not set. Please add NEXT_PUBLIC_GOOGLE_MAPS_API_KEY to your .env.local file"
    );
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-xl">
        <p className="text-gray-500">Google Maps API key not configured</p>
      </div>
    );
  }

  return (
    <LoadScript googleMapsApiKey={apiKey} libraries={libraries}>
      {children}
    </LoadScript>
  );
}
