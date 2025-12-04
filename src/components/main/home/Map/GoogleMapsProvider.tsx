"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { useLoadScript } from "@react-google-maps/api";

const libraries: ("places" | "drawing" | "geometry" | "visualization")[] = [
  "places",
  "geometry",
  "drawing",
];

interface GoogleMapsContextType {
  isLoaded: boolean;
  loadError: Error | undefined;
}

const GoogleMapsContext = createContext<GoogleMapsContextType | undefined>(
  undefined
);

interface GoogleMapsProviderProps {
  children: React.ReactNode;
}

// Check if Google Maps is already loaded
const isGoogleMapsLoaded = () => {
  return typeof window !== "undefined" && window.google && window.google.maps;
};

export default function GoogleMapsProvider({
  children,
}: GoogleMapsProviderProps) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";
  const [alreadyLoaded, setAlreadyLoaded] = useState(false);

  // Check if already loaded on mount
  useEffect(() => {
    if (isGoogleMapsLoaded()) {
      setAlreadyLoaded(true);
    }
  }, []);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: apiKey,
    libraries,
    id: "google-maps-script", // Unique ID to prevent duplicate loading
    preventGoogleFontsLoading: true,
  });

  if (!apiKey) {
    console.warn(
      "Google Maps API key is not set. Please add NEXT_PUBLIC_GOOGLE_MAPS_API_KEY to your .env.local file"
    );
  }

  // If already loaded or just loaded, maps are ready
  const mapsReady = alreadyLoaded || isLoaded;

  // Always render children, but provide loading state through context
  // This allows the form to render while the map loads
  return (
    <GoogleMapsContext.Provider value={{ isLoaded: mapsReady, loadError }}>
      {children}
    </GoogleMapsContext.Provider>
  );
}

export function useGoogleMaps() {
  const context = useContext(GoogleMapsContext);
  if (context === undefined) {
    throw new Error("useGoogleMaps must be used within GoogleMapsProvider");
  }
  return context;
}
