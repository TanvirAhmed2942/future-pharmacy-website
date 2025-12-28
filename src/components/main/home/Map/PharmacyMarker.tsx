"use client";
import React from "react";
import { Marker, InfoWindow, OverlayView } from "@react-google-maps/api";
import { Pharmacy } from "./types";
import { PiMapPin } from "react-icons/pi";
import { Phone, Clock, X } from "lucide-react";
import Image from "next/image";
import { imgUrl } from "@/lib/img_url";
import { MdLocalHospital } from "react-icons/md";

interface PharmacyMarkerProps {
  pharmacy: Pharmacy;
  isSelected?: boolean;
  isInfoOpen?: boolean;
  onClick?: (pharmacy: Pharmacy) => void;
  onSelect?: (pharmacy: Pharmacy) => void;
  onInfoClose?: () => void;
}

function PharmacyMarker({
  pharmacy,
  isSelected = false,
  isInfoOpen = false,
  onClick,
  onSelect,
  onInfoClose,
}: PharmacyMarkerProps) {
  const handleClick = React.useCallback(
    (e: google.maps.MapMouseEvent) => {
      // Prevent event bubbling to map
      if (e) {
        if (typeof e.stop === "function") {
          e.stop();
        }
        if (e.domEvent) {
          e.domEvent.stopPropagation();
        }
      }
      onClick?.(pharmacy);
    },
    [onClick, pharmacy]
  );

  const handleClose = React.useCallback(() => {
    onInfoClose?.();
  }, [onInfoClose]);

  const handleSelect = React.useCallback(() => {
    onSelect?.(pharmacy);
    onInfoClose?.();
  }, [onSelect, pharmacy, onInfoClose]);

  // Memoize the overlay click handler
  const handleOverlayClick = React.useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      if (typeof window !== "undefined" && window.google) {
        const mockEvent = {
          stop: () => {},
          domEvent: e,
          latLng: new window.google.maps.LatLng(
            pharmacy.location.lat,
            pharmacy.location.lng
          ),
        } as unknown as google.maps.MapMouseEvent;
        handleClick(mockEvent);
      }
    },
    [handleClick, pharmacy.location]
  );

  // Memoize styles
  const overlayStyle = React.useMemo(
    () => ({
      display: "flex" as const,
      alignItems: "center" as const,
      justifyContent: "center" as const,
      transform: "translate(-50%, -100%)",
      marginTop: "-12px",
    }),
    []
  );

  const iconBgStyle = React.useMemo(
    () => ({
      backgroundColor: isSelected ? "#8f4487" : "#ef4444",
    }),
    [isSelected]
  );

  // Memoize icon component
  const IconComponent = React.useMemo(
    () => (
      <MdLocalHospital
        className="text-white"
        size={20}
        style={{ display: "block" }}
      />
    ),
    []
  );

  // Memoize the overlay content to prevent re-renders
  const OverlayContent = React.useMemo(
    () => (
      <div
        onClick={handleOverlayClick}
        className="cursor-pointer hover:scale-110 transition-transform"
        style={overlayStyle}
      >
        <div className="rounded-full p-1.5 shadow-lg" style={iconBgStyle}>
          {IconComponent}
        </div>
      </div>
    ),
    [handleOverlayClick, overlayStyle, iconBgStyle, IconComponent]
  );

  return (
    <>
      {/* Custom React Icon Marker using OverlayView */}
      {typeof window !== "undefined" && window.google && (
        <OverlayView
          position={pharmacy.location}
          mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
        >
          {OverlayContent}
        </OverlayView>
      )}
      {/* Invisible marker for click handling and InfoWindow */}
      <Marker
        position={pharmacy.location}
        icon={{
          path: window.google?.maps.SymbolPath.CIRCLE || "",
          scale: 0,
          fillOpacity: 0,
          strokeOpacity: 0,
        }}
        onClick={handleClick}
        title={pharmacy.name}
        visible={false}
      >
        {isInfoOpen && (
          <InfoWindow
            position={{
              lat: pharmacy.location.lat,
              lng: pharmacy.location.lng,
            }}
            onCloseClick={handleClose}
            options={
              typeof window !== "undefined" && window.google
                ? {
                    pixelOffset: new window.google.maps.Size(0, -10),
                  }
                : undefined
            }
          >
            <div className="relative  p-4  min-w-[260px]  bg-white rounded-lg shadow-md">
              {/* Custom close button (in addition to default InfoWindow close) */}
              <button
                onClick={handleClose}
                className="absolute top-2 right-2 p-1 rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Close"
              >
                <X className="w-4 h-4 mr-4 text-gray-500" />
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
    </>
  );
}

// Memoize the component to prevent unnecessary re-renders
export default React.memo(PharmacyMarker, (prevProps, nextProps) => {
  // Only re-render if these props change
  return (
    prevProps.pharmacy.id === nextProps.pharmacy.id &&
    prevProps.pharmacy.location.lat === nextProps.pharmacy.location.lat &&
    prevProps.pharmacy.location.lng === nextProps.pharmacy.location.lng &&
    prevProps.isSelected === nextProps.isSelected &&
    prevProps.isInfoOpen === nextProps.isInfoOpen
  );
});
