"use client";
import React from "react";
import { Marker, InfoWindow } from "@react-google-maps/api";
import { Pharmacy } from "./types";
import { PiMapPin } from "react-icons/pi";
import { Phone, Clock } from "lucide-react";

interface PharmacyMarkerProps {
  pharmacy: Pharmacy;
  isSelected?: boolean;
  onClick?: (pharmacy: Pharmacy) => void;
  onSelect?: (pharmacy: Pharmacy) => void;
}

export default function PharmacyMarker({
  pharmacy,
  isSelected = false,
  onClick,
  onSelect,
}: PharmacyMarkerProps) {
  const [showInfo, setShowInfo] = React.useState(false);

  const handleClick = () => {
    setShowInfo(true);
    onClick?.(pharmacy);
  };

  const handleClose = () => {
    setShowInfo(false);
  };

  const handleSelect = () => {
    onSelect?.(pharmacy);
    setShowInfo(false);
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
          <div className="p-4 max-w-xs min-w-[280px] bg-white rounded-lg shadow-md">
            <h3 className="font-bold text-gray-900 text-lg mb-2">
              {pharmacy.name}
            </h3>
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
    </>
  );
}
