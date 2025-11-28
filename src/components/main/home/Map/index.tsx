"use client";
import React, { useEffect, useState } from "react";
import GoogleMapsProvider from "./GoogleMapsProvider";
import PharmacyMap from "./PharmacyMap";
import { Location, Pharmacy } from "./types";
import { useGeocode } from "./useGeocode";
import { usePharmacySearch } from "./usePharmacySearch";

interface MapComponentProps {
  pickupAddress?: string;
  dropoffAddress?: string;
  zipCode?: string;
  city?: string;
  state?: string;
  onPharmacyClick?: (pharmacy: Pharmacy) => void;
  showRoute?: boolean;
  height?: string;
}

export default function MapComponent({
  pickupAddress,
  dropoffAddress,
  zipCode,
  city,
  state,
  onPharmacyClick,
  showRoute = false,
  height = "100%",
}: MapComponentProps) {
  const [pickupLocation, setPickupLocation] = useState<Location | null>(null);
  const [dropoffLocation, setDropoffLocation] = useState<Location | null>(null);
  const [mapCenter, setMapCenter] = useState<Location | null>(null);
  const { geocodeAddress, geocodeByZipCode, geocodeByCityState } = useGeocode();
  const { pharmacies, searchPharmaciesByLocation, loading: pharmacyLoading } =
    usePharmacySearch();

  // Update map center based on zipCode, city, or state
  useEffect(() => {
    const updateLocation = async () => {
      if (zipCode) {
        const location = await geocodeByZipCode(zipCode);
        if (location) {
          setMapCenter(location);
          searchPharmaciesByLocation(location);
        }
      } else if (city && state) {
        const location = await geocodeByCityState(city, state);
        if (location) {
          setMapCenter(location);
          searchPharmaciesByLocation(location);
        }
      }
    };

    updateLocation();
  }, [zipCode, city, state, geocodeByZipCode, geocodeByCityState, searchPharmaciesByLocation]);

  // Geocode pickup address
  useEffect(() => {
    const geocodePickup = async () => {
      if (pickupAddress) {
        const location = await geocodeAddress(pickupAddress);
        setPickupLocation(location);
        if (location && !mapCenter) {
          setMapCenter(location);
          searchPharmaciesByLocation(location);
        }
      } else {
        setPickupLocation(null);
      }
    };

    geocodePickup();
  }, [pickupAddress, geocodeAddress, mapCenter, searchPharmaciesByLocation]);

  // Geocode dropoff address
  useEffect(() => {
    const geocodeDropoff = async () => {
      if (dropoffAddress) {
        const location = await geocodeAddress(dropoffAddress);
        setDropoffLocation(location);
        if (location && !mapCenter && !pickupLocation) {
          setMapCenter(location);
          searchPharmaciesByLocation(location);
        }
      } else {
        setDropoffLocation(null);
      }
    };

    geocodeDropoff();
  }, [dropoffAddress, geocodeAddress, mapCenter, pickupLocation, searchPharmaciesByLocation]);

  return (
    <div style={{ height }} className="w-full rounded-xl overflow-hidden">
      <GoogleMapsProvider>
        <PharmacyMap
          pickupLocation={pickupLocation}
          dropoffLocation={dropoffLocation}
          pharmacies={pharmacies}
          center={mapCenter || undefined}
          onPharmacyClick={onPharmacyClick}
          showRoute={showRoute}
        />
      </GoogleMapsProvider>
      {pharmacyLoading && (
        <div className="absolute top-4 right-4 bg-white px-4 py-2 rounded-lg shadow-lg">
          <p className="text-sm text-gray-600">Loading pharmacies...</p>
        </div>
      )}
    </div>
  );
}

