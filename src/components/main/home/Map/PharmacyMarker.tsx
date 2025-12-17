"use client";
import React from "react";
import { Marker, InfoWindow } from "@react-google-maps/api";
import { Pharmacy } from "./types";
import { PiMapPin } from "react-icons/pi";
import { Phone, Clock, X } from "lucide-react";
import Image from "next/image";
import { imgUrl } from "@/lib/img_url";

interface PharmacyMarkerProps {
  pharmacy: Pharmacy;
  isSelected?: boolean;
  isInfoOpen?: boolean;
  onClick?: (pharmacy: Pharmacy) => void;
  onSelect?: (pharmacy: Pharmacy) => void;
  onInfoClose?: () => void;
}

export default function PharmacyMarker({
  pharmacy,
  isSelected = false,
  isInfoOpen = false,
  onClick,
  onSelect,
  onInfoClose,
}: PharmacyMarkerProps) {
  const handleClick = (e: google.maps.MapMouseEvent) => {
    // Prevent event bubbling to map
    if (e) {
      if (typeof e.stop === "function") {
        e.stop();
      }
      if (e.domEvent) {
        e.domEvent.stopPropagation();
      }
    }
    console.log(
      "Pharmacy marker clicked:",
      pharmacy.name,
      "isInfoOpen:",
      isInfoOpen
    );
    onClick?.(pharmacy);
  };

  const handleClose = () => {
    onInfoClose?.();
  };

  const handleSelect = () => {
    onSelect?.(pharmacy);
    onInfoClose?.();
  };

  // Custom marker icon - improved appearance
  const markerIcon = React.useMemo(() => {
    if (typeof window === "undefined" || !window.google) {
      return undefined;
    }
    return {
      path: window.google.maps.SymbolPath.CIRCLE,
      scale: 10,
      fillColor: isSelected ? "#8f4487" : "#ef4444", // Purple (peter) for selected, red for others
      fillOpacity: 1,
      strokeColor: "#ffffff",
      strokeWeight: 3,
    };
  }, [isSelected]);

  // Debug: Log when isInfoOpen changes
  React.useEffect(() => {
    if (isInfoOpen) {
      console.log("InfoWindow should be open for:", pharmacy.name);
    }
  }, [isInfoOpen, pharmacy.name]);

  return (
    <Marker
      position={pharmacy.location}
      icon={markerIcon}
      onClick={handleClick}
      title={pharmacy.name}
    >
      {isInfoOpen && (
        <InfoWindow
          position={{ lat: pharmacy.location.lat, lng: pharmacy.location.lng }}
          onCloseClick={handleClose}
          options={
            typeof window !== "undefined" && window.google
              ? {
                  pixelOffset: new window.google.maps.Size(0, -10),
                }
              : undefined
          }
        >
          <div className="relative p-4 max-w-xs min-w-[260px] bg-white rounded-lg shadow-md overflow-hidden">
            {/* Custom close button (in addition to default InfoWindow close) */}
            <button
              onClick={handleClose}
              className="absolute top-2 right-2 p-1 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Close"
            >
              <X className="w-4 h-4 text-gray-500" />
            </button>
            <div className="flex items-center gap-2 mb-2">
              {pharmacy.logo && (
                <Image
                  src={imgUrl(pharmacy.logo)}
                  alt={pharmacy.name}
                  width={60}
                  height={60}
                  className="rounded"
                />
              )}
              <h3 className="font-bold text-gray-900 text-lg">
                {pharmacy.name}
              </h3>
            </div>
            <p className="text-sm text-gray-600 mb-3 leading-relaxed">
              {pharmacy.address}
            </p>
            <div className="space-y-2 mb-4">
              {pharmacy.phone && (
                <p className="text-sm text-gray-600 flex items-center gap-2">
                  <Phone className="w-4 h-4 text-red-500" />
                  {pharmacy.phone}
                </p>
              )}
              {pharmacy.hours && (
                <p className="text-sm text-gray-600 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-500" />
                  {pharmacy.hours}
                </p>
              )}
              {pharmacy.distance && (
                <p className="text-sm text-peter font-semibold flex items-center gap-2">
                  <PiMapPin className="w-4 h-4" />
                  {pharmacy.distance.toFixed(1)} miles away
                </p>
              )}
            </div>
            <button
              onClick={handleSelect}
              className="w-full mt-3 px-4 py-2 bg-peter text-white text-sm font-medium rounded-lg hover:bg-peter-dark transition-colors shadow-sm"
            >
              Select Pharmacy
            </button>
          </div>
        </InfoWindow>
      )}
    </Marker>
  );
}
