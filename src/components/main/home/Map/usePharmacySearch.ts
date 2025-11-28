"use client";
import { useState, useCallback, useEffect } from "react";
import { Pharmacy, Location } from "./types";

// Mock pharmacy data - Replace with your actual pharmacy data source
const mockPharmacies: Pharmacy[] = [
  {
    id: "1",
    name: "CVS Pharmacy - Downtown",
    location: { lat: 40.7357, lng: -74.1724 },
    address: "123 Main St, Newark, NJ 07102",
    phone: "(973) 555-0100",
    hours: "Mon-Fri: 8AM-9PM",
  },
  {
    id: "2",
    name: "Walgreens - Medical Center",
    location: { lat: 40.7411, lng: -74.1745 },
    address: "456 Broad St, Newark, NJ 07102",
    phone: "(973) 555-0200",
    hours: "Mon-Sun: 7AM-10PM",
  },
  {
    id: "3",
    name: "Rite Aid - University Heights",
    location: { lat: 40.7289, lng: -74.1701 },
    address: "789 Market St, Newark, NJ 07102",
    phone: "(973) 555-0300",
    hours: "Mon-Sat: 9AM-8PM",
  },
];

// Calculate distance between two points using Haversine formula
function calculateDistance(
  loc1: Location,
  loc2: Location
): number {
  const R = 3959; // Earth's radius in miles
  const dLat = ((loc2.lat - loc1.lat) * Math.PI) / 180;
  const dLon = ((loc2.lng - loc1.lng) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((loc1.lat * Math.PI) / 180) *
      Math.cos((loc2.lat * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export function usePharmacySearch() {
  const [pharmacies, setPharmacies] = useState<Pharmacy[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchPharmacies = useCallback(
    async (center: Location, radiusMiles: number = 10): Promise<Pharmacy[]> => {
      setLoading(true);
      setError(null);

      try {
        // In a real app, you would call your API here
        // For now, we'll filter mock data by distance
        const nearbyPharmacies = mockPharmacies
          .map((pharmacy) => ({
            ...pharmacy,
            distance: calculateDistance(center, pharmacy.location),
          }))
          .filter((pharmacy) => pharmacy.distance <= radiusMiles)
          .sort((a, b) => (a.distance || 0) - (b.distance || 0));

        setPharmacies(nearbyPharmacies);
        setLoading(false);
        return nearbyPharmacies;
      } catch (err) {
        setLoading(false);
        setError(err instanceof Error ? err.message : "Failed to search pharmacies");
        return [];
      }
    },
    []
  );

  const searchPharmaciesByLocation = useCallback(
    async (location: Location | null, radiusMiles: number = 10) => {
      if (!location) {
        setPharmacies([]);
        return;
      }
      await searchPharmacies(location, radiusMiles);
    },
    [searchPharmacies]
  );

  return {
    pharmacies,
    searchPharmacies,
    searchPharmaciesByLocation,
    loading,
    error,
  };
}

