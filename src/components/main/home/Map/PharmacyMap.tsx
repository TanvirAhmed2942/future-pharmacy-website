"use client";
import React, { useCallback, useMemo, useState } from "react";
import { GoogleMap, Marker, DirectionsRenderer } from "@react-google-maps/api";
import { Location, Pharmacy } from "./types";
import PharmacyMarker from "./PharmacyMarker";

interface PharmacyMapProps {
  pickupLocation?: Location | null;
  dropoffLocation?: Location | null;
  pharmacies?: Pharmacy[];
  center?: Location;
  zoom?: number;
  logo?: string;
  name?: string;
  address?: string;
  phone?: string;
  hours?: string;
  distance?: number;
  onPharmacyClick?: (pharmacy: Pharmacy) => void;
  onPharmacySelect?: (pharmacy: Pharmacy) => void;
  showRoute?: boolean;
  onMapClick?: (location: Location, address: string) => void;
  selectionMode?: "pickup" | "dropoff" | null;
  onDistanceCalculated?: (distance: string, duration: string) => void;
}

const defaultCenter: Location = {
  lat: 40.7128,
  lng: -74.006,
};

const defaultZoom = 12;

export default function PharmacyMap({
  pickupLocation,
  dropoffLocation,
  pharmacies = [],
  center,
  zoom = defaultZoom,
  onPharmacyClick,
  onPharmacySelect,
  showRoute = false,
  onMapClick,
  selectionMode = null,
  onDistanceCalculated,
}: PharmacyMapProps) {
  const [directions, setDirections] =
    useState<google.maps.DirectionsResult | null>(null);
  const [selectedPharmacy, setSelectedPharmacy] = useState<Pharmacy | null>(
    null
  );

  // Calculate map center and bounds
  const mapCenter = useMemo(() => {
    if (center) return center;
    if (pickupLocation) return pickupLocation;
    if (dropoffLocation) return dropoffLocation;
    return defaultCenter;
  }, [center, pickupLocation, dropoffLocation]);

  const mapOptions = useMemo<google.maps.MapOptions>(
    () => ({
      disableDefaultUI: false,
      clickableIcons: true,
      scrollwheel: true,
      zoomControl: true,
      streetViewControl: false,
      mapTypeControl: false,
      fullscreenControl: true,
      draggableCursor: selectionMode ? "crosshair" : undefined,
    }),
    [selectionMode]
  );

  // Calculate bounds to fit all markers
  const bounds = useMemo(() => {
    if (typeof window === "undefined" || !window.google) return undefined;

    const bounds = new window.google.maps.LatLngBounds();

    if (pickupLocation) {
      bounds.extend(
        new window.google.maps.LatLng(pickupLocation.lat, pickupLocation.lng)
      );
    }
    if (dropoffLocation) {
      bounds.extend(
        new window.google.maps.LatLng(dropoffLocation.lat, dropoffLocation.lng)
      );
    }
    pharmacies.forEach((pharmacy) => {
      bounds.extend(
        new window.google.maps.LatLng(
          pharmacy.location.lat,
          pharmacy.location.lng
        )
      );
    });

    return bounds.isEmpty() ? undefined : bounds;
  }, [pickupLocation, dropoffLocation, pharmacies]);

  // Calculate route between pickup and dropoff
  const calculateRoute = useCallback(() => {
    if (!pickupLocation || !dropoffLocation || !window.google) return;

    const directionsService = new window.google.maps.DirectionsService();

    directionsService.route(
      {
        origin: new window.google.maps.LatLng(
          pickupLocation.lat,
          pickupLocation.lng
        ),
        destination: new window.google.maps.LatLng(
          dropoffLocation.lat,
          dropoffLocation.lng
        ),
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === "OK" && result) {
          setDirections(result);

          // Extract distance and duration from the route
          const route = result.routes[0];
          if (route && route.legs && route.legs[0]) {
            const leg = route.legs[0];
            const distance = leg.distance?.text || "";
            const duration = leg.duration?.text || "";

            // Call the callback with distance and duration
            onDistanceCalculated?.(distance, duration);
          }
        } else {
          console.error("Directions request failed:", status);
          // Clear distance on error
          onDistanceCalculated?.("", "");
        }
      }
    );
  }, [pickupLocation, dropoffLocation, onDistanceCalculated]);

  React.useEffect(() => {
    if (showRoute && pickupLocation && dropoffLocation) {
      calculateRoute();
    } else {
      setDirections(null);
      // Clear distance when route is not shown
      onDistanceCalculated?.("", "");
    }
  }, [
    showRoute,
    pickupLocation,
    dropoffLocation,
    calculateRoute,
    onDistanceCalculated,
  ]);

  const handlePharmacyClick = useCallback(
    (pharmacy: Pharmacy) => {
      setSelectedPharmacy(pharmacy);
      onPharmacyClick?.(pharmacy);
    },
    [onPharmacyClick]
  );

  const onLoad = useCallback(
    (map: google.maps.Map) => {
      if (bounds) {
        map.fitBounds(bounds);
        // Add padding to bounds
        const padding = 50;
        map.fitBounds(bounds, padding);
      }
    },
    [bounds]
  );

  // Handle map click to select location
  const handleMapClick = useCallback(
    (e: google.maps.MapMouseEvent) => {
      if (!onMapClick || !selectionMode || !e.latLng) return;

      const clickedLocation = e.latLng;

      // Reverse geocode to get the exact address location
      // Note: Geocoder is part of core Maps JavaScript API, doesn't need geometry/places libraries
      if (
        typeof window !== "undefined" &&
        window.google &&
        window.google.maps &&
        window.google.maps.Geocoder
      ) {
        try {
          const geocoder = new window.google.maps.Geocoder();
          // Create LatLng object for geocoding
          const latLng = new window.google.maps.LatLng(
            clickedLocation.lat(),
            clickedLocation.lng()
          );

          geocoder.geocode({ location: latLng }, (results, status) => {
            // Use the CLICKED coordinates for marker placement
            // Only use geocoding to get the address string
            const clickedLat = clickedLocation.lat();
            const clickedLng = clickedLocation.lng();

            if (
              status === window.google.maps.GeocoderStatus.OK &&
              results &&
              results[0]
            ) {
              const address = results[0].formatted_address;

              // Place marker at the exact clicked location
              const location: Location = {
                lat: clickedLat,
                lng: clickedLng,
                address: address,
              };

              console.log("Map click - Using clicked coordinates:", {
                lat: clickedLat,
                lng: clickedLng,
                address: address,
              });

              onMapClick(location, address);
            } else {
              // Fallback: use clicked coordinates if geocoding fails
              const location: Location = {
                lat: clickedLat,
                lng: clickedLng,
              };
              const fallbackAddress = `${location.lat.toFixed(
                6
              )}, ${location.lng.toFixed(6)}`;
              console.warn(
                "Geocoding failed, using clicked coordinates:",
                location
              );
              onMapClick(
                { ...location, address: fallbackAddress },
                fallbackAddress
              );
            }
          });
        } catch (error) {
          console.error("Geocoder error:", error);
          // Fallback: use clicked coordinates
          const location: Location = {
            lat: clickedLocation.lat(),
            lng: clickedLocation.lng(),
          };
          const fallbackAddress = `${location.lat.toFixed(
            6
          )}, ${location.lng.toFixed(6)}`;
          onMapClick(
            { ...location, address: fallbackAddress },
            fallbackAddress
          );
        }
      } else {
        console.error(
          "Google Maps Geocoder is not available. Make sure Geocoding API is enabled in Google Cloud Console."
        );
        // Fallback: use clicked coordinates
        const location: Location = {
          lat: clickedLocation.lat(),
          lng: clickedLocation.lng(),
        };
        const fallbackAddress = `${location.lat.toFixed(
          6
        )}, ${location.lng.toFixed(6)}`;
        onMapClick({ ...location, address: fallbackAddress }, fallbackAddress);
      }
    },
    [onMapClick, selectionMode]
  );
  {
    console.log("pharmacies//", pharmacies);
  }
  return (
    <GoogleMap
      mapContainerClassName={`w-full h-full rounded-xl ${
        selectionMode ? "cursor-crosshair" : ""
      }`}
      mapContainerStyle={{ width: "100%", height: "100%" }}
      center={mapCenter}
      zoom={zoom}
      options={mapOptions}
      onLoad={onLoad}
      onClick={selectionMode ? handleMapClick : undefined}
    >
      {/* Pickup Location Marker - "A" */}
      {pickupLocation && (
        <Marker
          position={pickupLocation}
          title="Pickup Location (A)"
          label={{
            text: "A",
            color: "#ffffff",
            fontSize: "14px",
            fontWeight: "bold",
          }}
        />
      )}

      {/* Dropoff Location Marker - "B" */}
      {dropoffLocation && (
        <Marker
          position={dropoffLocation}
          title="Dropoff Location (B)"
          label={{
            text: "B",
            color: "#ffffff",
            fontSize: "14px",
            fontWeight: "bold",
          }}
        />
      )}

      {/* Pharmacy Markers */}
      {pharmacies.map((pharmacy) => (
        <PharmacyMarker
          key={pharmacy.id}
          pharmacy={pharmacy}
          isSelected={selectedPharmacy?.id === pharmacy.id}
          onClick={handlePharmacyClick}
          onSelect={onPharmacySelect}
        />
      ))}

      {/* Route between pickup and dropoff */}
      {directions && <DirectionsRenderer directions={directions} />}
    </GoogleMap>
  );
}
