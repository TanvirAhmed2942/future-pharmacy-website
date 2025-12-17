"use client";
import React from "react";
import { X, MapPin, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface CustomInfoWindowProps {
  name: string;
  address: string;
  onClose: () => void;
  onSelect?: () => void;
  googleMapsUrl?: string;
}

export default function CustomInfoWindow({
  name,
  address,
  onClose,
  onSelect,
  googleMapsUrl,
}: CustomInfoWindowProps) {
  return (
    <div
      className="relative"
      data-custom-info-window="true"
      style={{
        transform: "translate(-50%, -100%)",
        marginBottom: "-10px",
        zIndex: 1000002,
      }}
    >
      <Card className="p-4 min-w-[280px] max-w-xs bg-white rounded-lg shadow-lg border border-gray-200">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-start gap-2 flex-1">
            <MapPin className="w-5 h-5 text-peter mt-0.5 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-900 text-base mb-1 line-clamp-2">
                {name}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed line-clamp-2">
                {address}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="ml-2 p-1 hover:bg-gray-100 rounded-full transition-colors flex-shrink-0"
            aria-label="Close"
          >
            <X className="w-4 h-4 text-gray-500" />
          </button>
        </div>

        <div className="flex gap-2 mt-3">
          {onSelect && (
            <Button
              onClick={onSelect}
              size="sm"
              className="flex-1 bg-peter hover:bg-peter-dark text-white text-sm"
            >
              Select Location
            </Button>
          )}
          {googleMapsUrl && (
            <Button
              onClick={() =>
                window.open(googleMapsUrl, "_blank", "noopener,noreferrer")
              }
              variant="outline"
              size="sm"
              className="flex items-center gap-1 text-sm"
            >
              <ExternalLink className="w-3 h-3" />
              View
            </Button>
          )}
        </div>
      </Card>
      {/* Arrow pointing down */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full">
        <div className="w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-white"></div>
      </div>
    </div>
  );
}
