"use client";
import React, { useEffect, useState } from "react";
import PharmacyMap from "./PharmacyMap";
import { Location, Pharmacy } from "./types";
import { useGeocode } from "./useGeocode";
import { usePharmacySearch } from "./usePharmacySearch";
import { useGoogleMaps } from "./GoogleMapsProvider";

interface MapComponentProps {
  pickupAddress?: string;
  dropoffAddress?: string;
  pickupLocation?: Location | null;
  dropoffLocation?: Location | null;
  zipCode?: string;
  city?: string;
  state?: string;
  pharmacies?: Pharmacy[]; // externally provided pharmacy list
  onPharmacyClick?: (pharmacy: Pharmacy) => void;
  onPharmacySelect?: (pharmacy: Pharmacy) => void;
  showRoute?: boolean;
  height?: string;
  onPickupSelect?: (location: Location, address: string) => void;
  onDropoffSelect?: (location: Location, address: string) => void;
  selectionMode?: "pickup" | "dropoff" | null;
  onDistanceCalculated?: (distance: string, duration: string) => void;
}

export default function MapComponent({
  pickupAddress,
  dropoffAddress,
  pickupLocation: pickupLocationProp,
  dropoffLocation: dropoffLocationProp,
  zipCode,
  city,
  state,
  pharmacies: pharmaciesProp,
  onPharmacyClick,
  onPharmacySelect,
  showRoute = false,
  height = "100%",
  onPickupSelect,
  onDropoffSelect,
  selectionMode = null,
  onDistanceCalculated,
}: MapComponentProps) {
  const [pickupLocation, setPickupLocation] = useState<Location | null>(
    pickupLocationProp || null
  );
  const [dropoffLocation, setDropoffLocation] = useState<Location | null>(
    dropoffLocationProp || null
  );
  const [mapCenter, setMapCenter] = useState<Location | null>(null);
  const { geocodeAddress, geocodeByZipCode, geocodeByCityState } = useGeocode();
  const {
    pharmacies,
    searchPharmaciesByLocation,
    loading: pharmacyLoading,
  } = usePharmacySearch();

  // Initial load: search pharmacies with default center if no location provided
  useEffect(() => {
    const defaultCenter: Location = {
      lat: 40.7128,
      lng: -74.006,
    };

    // If no location context is provided, use default center and search pharmacies
    if (!zipCode && !city && !state && !pickupAddress && !dropoffAddress) {
      setMapCenter(defaultCenter);
      searchPharmaciesByLocation(defaultCenter);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run once on mount

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
  }, [
    zipCode,
    city,
    state,
    geocodeByZipCode,
    geocodeByCityState,
    searchPharmaciesByLocation,
  ]);

  // Update pickup location from prop (when selected from map) or geocode from address
  useEffect(() => {
    if (pickupLocationProp) {
      // Use the location directly from prop (selected from map)
      setPickupLocation(pickupLocationProp);
      if (!mapCenter) {
        setMapCenter(pickupLocationProp);
        searchPharmaciesByLocation(pickupLocationProp);
      }
    } else if (pickupAddress) {
      // Geocode the address string (when typed in)
      const geocodePickup = async () => {
        const location = await geocodeAddress(pickupAddress);
        setPickupLocation(location);
        if (location && !mapCenter) {
          setMapCenter(location);
          searchPharmaciesByLocation(location);
        }
      };
      geocodePickup();
    } else {
      setPickupLocation(null);
    }
  }, [
    pickupAddress,
    pickupLocationProp,
    geocodeAddress,
    mapCenter,
    searchPharmaciesByLocation,
  ]);

  // Update dropoff location from prop (when selected from map) or geocode from address
  useEffect(() => {
    if (dropoffLocationProp) {
      // Use the location directly from prop (selected from map)
      setDropoffLocation(dropoffLocationProp);
      if (!mapCenter && !pickupLocation) {
        setMapCenter(dropoffLocationProp);
        searchPharmaciesByLocation(dropoffLocationProp);
      }
    } else if (dropoffAddress) {
      // Geocode the address string (when typed in)
      const geocodeDropoff = async () => {
        const location = await geocodeAddress(dropoffAddress);
        setDropoffLocation(location);
        if (location && !mapCenter && !pickupLocation) {
          setMapCenter(location);
          searchPharmaciesByLocation(location);
        }
      };
      geocodeDropoff();
    } else {
      setDropoffLocation(null);
    }
  }, [
    dropoffAddress,
    dropoffLocationProp,
    geocodeAddress,
    mapCenter,
    pickupLocation,
    searchPharmaciesByLocation,
  ]);

  const { isLoaded: mapsLoaded, loadError: mapsError } = useGoogleMaps();

  // Prefer external pharmacies if provided
  const pharmaciesToRender = pharmaciesProp ?? pharmacies;

  return (
    <div
      style={{ height: height === "100%" ? "100%" : height }}
      className="w-full h-full rounded-xl overflow-hidden relative"
    >
      {!mapsLoaded && !mapsError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-xl z-10">
          <p className="text-gray-500">Loading Google Maps...</p>
        </div>
      )}
      {mapsError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-xl z-10">
          <p className="text-red-500">
            Error loading Google Maps: {mapsError.message}
          </p>
        </div>
      )}
      {mapsLoaded && (
        <PharmacyMap
          pickupLocation={pickupLocation}
          dropoffLocation={dropoffLocation}
          pharmacies={pharmaciesToRender}
          center={mapCenter || undefined}
          onPharmacyClick={onPharmacyClick}
          onPharmacySelect={onPharmacySelect}
          showRoute={showRoute}
          onMapClick={(location, address) => {
            if (selectionMode === "pickup" && onPickupSelect) {
              // Update local state immediately for instant marker display
              setPickupLocation(location);
              onPickupSelect(location, address);
            } else if (selectionMode === "dropoff" && onDropoffSelect) {
              // Update local state immediately for instant marker display
              setDropoffLocation(location);
              onDropoffSelect(location, address);
            }
          }}
          selectionMode={selectionMode}
          onDistanceCalculated={onDistanceCalculated}
        />
      )}
      {pharmacyLoading && mapsLoaded && (
        <div className="absolute top-4 right-4 bg-white px-4 py-2 rounded-lg shadow-lg z-10">
          <p className="text-sm text-gray-600">Loading pharmacies...</p>
        </div>
      )}
    </div>
  );
}
