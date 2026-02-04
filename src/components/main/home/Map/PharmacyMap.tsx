"use client";
import React, { useCallback, useMemo, useState } from "react";
import { GoogleMap, Marker, DirectionsRenderer } from "@react-google-maps/api";
import { Location, Pharmacy } from "./types";
import PharmacyMarker from "./PharmacyMarker";
// import { Map as MapIcon } from "lucide-react";

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

// New York (10001) – initial default center
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
  const mapRef = React.useRef<google.maps.Map | null>(null);
  const hasInitializedBounds = React.useRef(false);

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
      center: mapCenter,
      zoom: defaultZoom,
      restriction: {
        latLngBounds: {
          north: 49.38,
          south: 24.52,
          west: -125.0,
          east: -66.93,
        },
        strictBounds: false,
      },
      isFractionalZoomEnabled: true,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      colorScheme: google.maps.ColorScheme.FOLLOW_SYSTEM,
      scrollwheel: true,
      zoomControl: true,
      gestureHandling: "greedy",
      zoomAnimation: true,
      streetViewControl: true,
      mapTypeControl: true,
      fullscreenControl: true,
      draggableCursor: selectionMode ? "crosshair" : undefined,
    }),
    [selectionMode, mapCenter]
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
      // console.log("handlePharmacyClick called with:", pharmacy.name);
      // Toggle: if same pharmacy is clicked, close it; otherwise open it 
      setSelectedPharmacy((prev) => {
        if (prev?.id === pharmacy.id) {
          // console.log("Closing info window for:", pharmacy.name);
          return null;
        } else {
          // console.log("Opening info window for:", pharmacy.name);
          return pharmacy;
        }
      });
      onPharmacyClick?.(pharmacy);
    },
    [onPharmacyClick]
  );

  const handleInfoClose = useCallback(() => {
    setSelectedPharmacy(null);
  }, []);

  const onLoad = useCallback(
    (map: google.maps.Map) => {
      mapRef.current = map;
      // Only fit bounds on initial load or when bounds actually change (not on every pan/zoom)
      if (bounds && !hasInitializedBounds.current) {
        map.fitBounds(bounds);
        // Add padding to bounds
        const padding = 50;
        map.fitBounds(bounds, padding);
        hasInitializedBounds.current = true;
      }

    },
    [bounds]
  );

  // Show Street View at a given location (map center, pickup, dropoff, or first pharmacy)
  const showStreetViewAt = useCallback(
    (location: Location | undefined) => {
      const map = mapRef.current;
      if (!map || !location || typeof window === "undefined" || !window.google)
        return;
      const streetView = map.getStreetView();
      if (!streetView) return;
      streetView.setPosition(
        new window.google.maps.LatLng(location.lat, location.lng)
      );
      streetView.setVisible(true);
    },
    []
  );

  // const handleStreetViewClick = useCallback(() => {
  //   const location =
  //     pickupLocation ?? dropoffLocation ?? mapCenter ?? defaultCenter;
  //   showStreetViewAt(location);
  // }, [pickupLocation, dropoffLocation, mapCenter, showStreetViewAt]);

  // Update bounds only when locations or pharmacies actually change (not on map pan/zoom)
  React.useEffect(() => {
    if (mapRef.current && bounds && hasInitializedBounds.current) {
      // Only update if bounds have meaningfully changed (locations/pharmacies changed)
      // Don't update on every pan/zoom
      const padding = 50;
      mapRef.current.fitBounds(bounds, padding);
    }
  }, [bounds]);

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

              //  console.log("Map click - Using clicked coordinates:", {
              //   lat: clickedLat,
              //   lng: clickedLng,
              //   address: address,
              // });

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
              // console.warn(
              // "Geocoding failed, using clicked coordinates:",
              location
              // );
              onMapClick(
                { ...location, address: fallbackAddress },
                fallbackAddress
              );
            }
          });
        } catch (error) {
          // console.error("Geocoder error:", error);
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
        // console.error(
        // "Google Maps Geocoder is not available. Make sure Geocoding API is enabled in Google Cloud Console."
        // );
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
  // Debug: Log selected pharmacy
  React.useEffect(() => {
    // console.log("Selected pharmacy changed:", selectedPharmacy);
  }, [selectedPharmacy]);

  return (
    <div className="relative w-full h-full">
      <GoogleMap
        mapContainerClassName={`w-full h-full rounded-xl ${selectionMode ? "cursor-crosshair" : ""
          }`}
        mapContainerStyle={{ width: "100%", height: "100%" }}
        center={mapCenter}
        zoom={defaultZoom}
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
            isInfoOpen={selectedPharmacy?.id === pharmacy.id}
            onClick={handlePharmacyClick}
            onSelect={onPharmacySelect}
            onInfoClose={handleInfoClose}
            onStreetViewClick={showStreetViewAt}
          />
        ))}

        {/* Route between pickup and dropoff */}
        {directions && <DirectionsRenderer directions={directions} />}
      </GoogleMap>
    </div>
  );
}
