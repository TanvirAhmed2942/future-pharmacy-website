"use client";
import React, { useState, useEffect } from "react";
import { MapPin, History } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "../../ui/input";

interface LocationPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLocationSelect: (location: string) => void;
  currentLocation: string;
}

export default function LocationPickerModal({
  isOpen,
  onClose,
  onLocationSelect,
  currentLocation,
}: LocationPickerModalProps) {
  const [newLocation, setNewLocation] = useState("");
  const [locationHistory, setLocationHistory] = useState<string[]>([]);

  // Load location history from localStorage on component mount
  useEffect(() => {
    const savedHistory = localStorage.getItem("locationHistory");
    if (savedHistory) {
      setLocationHistory(JSON.parse(savedHistory));
    }
  }, []);

  const handleLocationSubmit = () => {
    if (newLocation.trim()) {
      // Update current location
      onLocationSelect(newLocation.trim());

      // Add to history (avoid duplicates)
      const updatedHistory = [
        newLocation.trim(),
        ...locationHistory.filter((loc) => loc !== newLocation.trim()),
      ].slice(0, 5); // Keep only last 5 locations

      setLocationHistory(updatedHistory);
      localStorage.setItem("locationHistory", JSON.stringify(updatedHistory));

      onClose();
    }
  };

  const handleHistorySelect = (location: string) => {
    setNewLocation(location);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-white rounded-xl shadow-2xl border-0 p-0">
        {/* Header */}
        <DialogHeader className="p-6 border-b">
          <DialogTitle className="text-xl font-bold text-gray-900">
            Change City or Zip Code
          </DialogTitle>
          <p className="text-sm text-gray-600 mt-2">
            Enter your city, state, or ZIP code to update your location.
          </p>
        </DialogHeader>

        <div className="px-6 py-4">
          {/* Current Location */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-700 mb-2">
              Current Location
            </h3>
            <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
              <MapPin className="w-4 h-4 text-gray-500" />
              <span className="text-gray-900">{currentLocation}</span>
            </div>
          </div>

          {/* New Location Input */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-700 mb-3">
              New Location
            </h3>
            <Input
              type="text"
              placeholder="Enter city, state, or ZIP code"
              value={newLocation}
              onChange={(e) => setNewLocation(e.target.value)}
              className="w-full h-12 border-2 border-gray-200 focus:border-peter focus:ring-peter/20"
            />
          </div>

          {/* Location History */}
          {locationHistory.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                <History className="w-4 h-4" />
                Recent Locations
              </h3>
              <div className="space-y-2 max-h-20 overflow-y-auto">
                {locationHistory.map((location, index) => (
                  <Card
                    key={index}
                    onClick={() => handleHistorySelect(location)}
                    className="p-3 cursor-pointer hover:bg-gray-50 transition-colors border-gray-200 hover:border-peter"
                  >
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-900">{location}</span>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Action buttons */}
        <div className="flex gap-3 p-6 border-t">
          <Button
            onClick={onClose}
            variant="outline"
            className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </Button>
          <Button
            onClick={handleLocationSubmit}
            className="flex-1 bg-peter hover:bg-peter-dark text-white"
            disabled={!newLocation.trim()}
          >
            Update Location
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
