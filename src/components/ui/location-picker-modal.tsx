"use client";
import React, { useState } from "react";
import { MapPin, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "./input";

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
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPharmacy, setSelectedPharmacy] = useState<string | null>(null);

  // Mock pharmacy suggestions based on search query
  const getPharmacySuggestions = () => {
    if (!searchQuery.trim()) return [];

    const query = searchQuery.toLowerCase();

    // Mock data - in real app, this would be API call
    const allPharmacies = [
      {
        id: "1",
        name: "CVS Pharmacy - Downtown",
        address: "123 Main St, Newark, NJ 07102",
        distance: "0.3 miles",
      },
      {
        id: "2",
        name: "Walgreens - Medical Center",
        address: "456 Oak Ave, Newark, NJ 07103",
        distance: "0.5 miles",
      },
      {
        id: "3",
        name: "Rite Aid - University Heights",
        address: "789 Pine St, Newark, NJ 07104",
        distance: "0.8 miles",
      },
      {
        id: "4",
        name: "CVS Pharmacy - Central",
        address: "321 Broadway, New York, NY 10001",
        distance: "1.2 miles",
      },
      {
        id: "5",
        name: "Walgreens - Times Square",
        address: "789 7th Ave, New York, NY 10019",
        distance: "1.5 miles",
      },
      {
        id: "6",
        name: "Rite Aid - Brooklyn",
        address: "456 Flatbush Ave, Brooklyn, NY 11225",
        distance: "2.1 miles",
      },
    ];

    // Filter pharmacies based on search query
    return allPharmacies.filter(
      (pharmacy) =>
        pharmacy.name.toLowerCase().includes(query) ||
        pharmacy.address.toLowerCase().includes(query) ||
        pharmacy.address.toLowerCase().includes(query.replace(/\s+/g, ""))
    );
  };

  const pharmacySuggestions = getPharmacySuggestions();

  const handlePharmacySelect = (pharmacy: { id: string }) => {
    setSelectedPharmacy(pharmacy.id);
  };

  const handleUpdateLocation = () => {
    if (selectedPharmacy) {
      const pharmacy = pharmacySuggestions.find(
        (p) => p.id === selectedPharmacy
      );
      if (pharmacy) {
        onLocationSelect(pharmacy.address);
        onClose();
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg bg-white rounded-xl shadow-2xl border-0 p-0">
        {/* Header */}
        <DialogHeader className="p-6 border-b">
          <DialogTitle className="text-xl font-bold text-gray-900">
            Select Your City
          </DialogTitle>
          <p className="text-sm text-gray-600 mt-2">
            Choose your city to see available pharmacy locations and delivery
            options.
          </p>
        </DialogHeader>

        <div className="px-6">
          {/* Current Location */}
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Current Location
            </h3>
            <p className="text-gray-700">{currentLocation}</p>
          </div>

          {/* New Location Search */}
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              New Location
            </h3>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                type="text"
                placeholder="City or ZIP Code"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 h-12 pr-4 py-3 border-2 border-peter rounded-lg focus:outline-none focus:ring-2 focus:ring-peter/20 focus:border-peter transition-colors"
              />
            </div>
          </div>

          {/* Pharmacy Suggestions */}
          {searchQuery.trim() && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Pharmacy Suggestions
              </h3>
              {pharmacySuggestions.length > 0 ? (
                <ScrollArea className="h-[200px]">
                  <div className="space-y-3 pr-4">
                    {pharmacySuggestions.map((pharmacy) => (
                      <Card
                        key={pharmacy.id}
                        onClick={() => handlePharmacySelect(pharmacy)}
                        className={`p-4 cursor-pointer transition-all hover:shadow-md ${
                          selectedPharmacy === pharmacy.id
                            ? "border-[#8d4585]] bg-[#f3ecf3] "
                            : "border-gray-200 hover:border-[#8d4585]"
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <MapPin className="w-5 h-5 text-red-500 mt-1 flex-shrink-0" />
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900">
                              {pharmacy.name}
                            </h4>
                            <p className="text-sm text-gray-600 mb-1">
                              {pharmacy.address}
                            </p>
                            <p className="text-xs text-gray-500">
                              {pharmacy.distance} away
                            </p>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </ScrollArea>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <MapPin className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                  <p>No pharmacies found for &quot;{searchQuery}&quot;</p>
                  <p className="text-sm">Try a different city or ZIP code</p>
                </div>
              )}
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
            onClick={handleUpdateLocation}
            className="flex-1 bg-peter hover:bg-peter-dark text-white"
            disabled={!selectedPharmacy}
          >
            Update Location
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
