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
  onPharmacyClick?: (pharmacy: Pharmacy) => void;
  showRoute?: boolean;
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
  showRoute = false,
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
    }),
    []
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
        } else {
          console.error("Directions request failed:", status);
        }
      }
    );
  }, [pickupLocation, dropoffLocation]);

  React.useEffect(() => {
    if (showRoute && pickupLocation && dropoffLocation) {
      calculateRoute();
    } else {
      setDirections(null);
    }
  }, [showRoute, pickupLocation, dropoffLocation, calculateRoute]);

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

  return (
    <GoogleMap
      mapContainerClassName="w-full h-full rounded-xl"
      mapContainerStyle={{ width: "100%", height: "100%" }}
      center={mapCenter}
      zoom={zoom}
      options={mapOptions}
      onLoad={onLoad}
    >
      {/* Pickup Location Marker */}
      {pickupLocation && (
        <Marker
          position={pickupLocation}
          icon={{
            path: window.google?.maps?.SymbolPath?.CIRCLE || "",
            scale: 10,
            fillColor: "#10b981", // Green for pickup
            fillOpacity: 1,
            strokeColor: "#ffffff",
            strokeWeight: 3,
          }}
          title="Pickup Location"
          label={{
            text: "P",
            color: "#ffffff",
            fontSize: "12px",
            fontWeight: "bold",
          }}
        />
      )}

      {/* Dropoff Location Marker */}
      {dropoffLocation && (
        <Marker
          position={dropoffLocation}
          icon={{
            path: window.google?.maps?.SymbolPath?.CIRCLE || "",
            scale: 10,
            fillColor: "#9333ea", // Purple for dropoff
            fillOpacity: 1,
            strokeColor: "#ffffff",
            strokeWeight: 3,
          }}
          title="Dropoff Location"
          label={{
            text: "D",
            color: "#ffffff",
            fontSize: "12px",
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
        />
      ))}

      {/* Route between pickup and dropoff */}
      {directions && <DirectionsRenderer directions={directions} />}
    </GoogleMap>
  );
}
