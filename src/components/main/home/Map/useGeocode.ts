"use client";
import { useState, useCallback } from "react";
import { Location } from "./types";

export function useGeocode() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const geocodeAddress = useCallback(
    async (address: string): Promise<Location | null> => {
      if (!address || typeof window === "undefined" || !window.google) {
        return null;
      }

      setLoading(true);
      setError(null);

      try {
        const geocoder = new window.google.maps.Geocoder();

        return new Promise((resolve) => {
          geocoder.geocode({ address }, (results, status) => {
            setLoading(false);

            if (status === "OK" && results && results[0]) {
              const location = results[0].geometry.location;
              resolve({
                lat: location.lat(),
                lng: location.lng(),
                address: results[0].formatted_address,
              });
            } else {
              setError(`Geocoding failed: ${status}`);
              resolve(null);
            }
          });
        });
      } catch (err) {
        setLoading(false);
        setError(err instanceof Error ? err.message : "Geocoding failed");
        return null;
      }
    },
    []
  );

  const reverseGeocode = useCallback(
    async (location: Location): Promise<string | null> => {
      if (typeof window === "undefined" || !window.google) {
        return null;
      }

      setLoading(true);
      setError(null);

      try {
        const geocoder = new window.google.maps.Geocoder();

        return new Promise((resolve) => {
          geocoder.geocode(
            { location: new window.google.maps.LatLng(location.lat, location.lng) },
            (results, status) => {
              setLoading(false);

              if (status === "OK" && results && results[0]) {
                resolve(results[0].formatted_address);
              } else {
                setError(`Reverse geocoding failed: ${status}`);
                resolve(null);
              }
            }
          );
        });
      } catch (err) {
        setLoading(false);
        setError(err instanceof Error ? err.message : "Reverse geocoding failed");
        return null;
      }
    },
    []
  );

  const geocodeByZipCode = useCallback(
    async (zipCode: string): Promise<Location | null> => {
      return geocodeAddress(zipCode);
    },
    [geocodeAddress]
  );

  const geocodeByCityState = useCallback(
    async (city: string, state: string): Promise<Location | null> => {
      return geocodeAddress(`${city}, ${state}`);
    },
    [geocodeAddress]
  );

  return {
    geocodeAddress,
    reverseGeocode,
    geocodeByZipCode,
    geocodeByCityState,
    loading,
    error,
  };
}

