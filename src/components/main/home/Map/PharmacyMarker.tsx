"use client";
import React from "react";
import { Marker, InfoWindow } from "@react-google-maps/api";
import { Pharmacy } from "./types";

interface PharmacyMarkerProps {
  pharmacy: Pharmacy;
  isSelected?: boolean;
  onClick?: (pharmacy: Pharmacy) => void;
}

export default function PharmacyMarker({
  pharmacy,
  isSelected = false,
  onClick,
}: PharmacyMarkerProps) {
  const [showInfo, setShowInfo] = React.useState(false);

  const handleClick = () => {
    setShowInfo(true);
    onClick?.(pharmacy);
  };

  const handleClose = () => {
    setShowInfo(false);
  };

  // Custom marker icon - you can customize this
  const markerIcon = React.useMemo(() => {
    if (typeof window === "undefined" || !window.google) {
      return undefined;
    }
    return {
      path: window.google.maps.SymbolPath.CIRCLE,
      scale: 8,
      fillColor: isSelected ? "#9333ea" : "#ef4444", // Purple for selected, red for others
      fillOpacity: 1,
      strokeColor: "#ffffff",
      strokeWeight: 2,
    };
  }, [isSelected]);

  return (
    <>
      <Marker
        position={pharmacy.location}
        icon={markerIcon}
        onClick={handleClick}
        title={pharmacy.name}
      />
      {showInfo && (
        <InfoWindow position={pharmacy.location} onCloseClick={handleClose}>
          <div className="p-2 max-w-xs">
            <h3 className="font-bold text-gray-900 mb-1">{pharmacy.name}</h3>
            <p className="text-sm text-gray-600 mb-2">{pharmacy.address}</p>
            {pharmacy.phone && (
              <p className="text-sm text-gray-600 mb-1">📞 {pharmacy.phone}</p>
            )}
            {pharmacy.hours && (
              <p className="text-sm text-gray-600 mb-1">🕐 {pharmacy.hours}</p>
            )}
            {pharmacy.distance && (
              <p className="text-sm text-peter font-semibold">
                📍 {pharmacy.distance.toFixed(1)} miles away
              </p>
            )}
            <button
              onClick={() => {
                // Handle pharmacy selection
                console.log("Selected pharmacy:", pharmacy);
              }}
              className="mt-2 px-3 py-1 bg-peter text-white text-sm rounded hover:bg-peter-dark transition-colors"
            >
              Select Pharmacy
            </button>
          </div>
        </InfoWindow>
      )}
    </>
  );
}
