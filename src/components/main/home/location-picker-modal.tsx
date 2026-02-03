"use client";
import React, { useState, useEffect } from "react";
import { MapPin, History, Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "../../ui/input";
import { useGetZipcodeMutation } from "@/store/Apis/zipcodeApi/zipcodeApi";
interface LocationPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLocationSelect: (location: string) => void;
  currentLocation: string;
  /** When provided, called on Update Location; if it returns success: false, error message is shown in modal. */
  onUpdateLocation?: (
    newLocation: string
  ) => Promise<{ success: boolean; message?: string }>;
}

export default function LocationPickerModal({
  isOpen,
  onClose,
  onLocationSelect,
  currentLocation,
  onUpdateLocation,
}: LocationPickerModalProps) {
  const [newLocation, setNewLocation] = useState("");
  const [locationHistory, setLocationHistory] = useState<string[]>([]);
  const [zipcodeError, setZipcodeError] = useState("");
  const [isRequestService, setIsRequestService] = useState(false);
  const [requestSubmitted, setRequestSubmitted] = useState(false);
  const [email, setEmail] = useState("");
  const [getZipcodeMutation, { isLoading: isSubmittingZipcode }] =
    useGetZipcodeMutation();

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const handleRequestService = () => {
    setIsRequestService(true);
  };

  const handleRequestServiceSubmit = async () => {
    if (!email.trim()) return;
    if (!validateEmail(email.trim())) return;
    const zipToRequest = newLocation.trim();
    if (!zipToRequest) return;
    try {
      const result = await getZipcodeMutation({
        zipCode: zipToRequest,
        email: email.trim(),
      }).unwrap();
      if (result.success) {
        setRequestSubmitted(true);
      } else {
        setZipcodeError(result.message ?? "Something went wrong.");
      }
    } catch {
      setZipcodeError("Something went wrong. Please try again.");
    }
  };

  const handleRetryWithAnotherZipcode = () => {
    setZipcodeError("");
    setIsRequestService(false);
    setRequestSubmitted(false);
    setNewLocation("");
    setEmail("");
  };

  // Load location history from localStorage on component mount
  useEffect(() => {
    const savedHistory = localStorage.getItem("locationHistory");
    if (savedHistory) {
      setLocationHistory(JSON.parse(savedHistory));
    }
  }, []);

  // Clear error and request state when modal closes
  useEffect(() => {
    if (!isOpen) {
      setZipcodeError("");
      setRequestSubmitted(false);
      setIsRequestService(false);
      setEmail("");
    }
  }, [isOpen]);

  const handleLocationSubmit = async () => {
    if (!newLocation.trim()) return;

    setZipcodeError("");

    if (onUpdateLocation) {
      const result = await onUpdateLocation(newLocation.trim());
      if (!result.success) {
        setZipcodeError(
          result.message ?? "Check your zipcode now"
        );
        return;
      }
    }

    onLocationSelect(newLocation.trim());

    const updatedHistory = [
      newLocation.trim(),
      ...locationHistory.filter((loc) => loc !== newLocation.trim()),
    ].slice(0, 5);
    setLocationHistory(updatedHistory);
    localStorage.setItem("locationHistory", JSON.stringify(updatedHistory));

    onClose();
  };

  const handleHistorySelect = (location: string) => {
    setNewLocation(location);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-white rounded-xl shadow-2xl border-0 p-0">
        {/* Header */}
        <DialogHeader className="p-6 border-b">
          <DialogTitle
            className={`text-xl font-bold text-gray-900 ${requestSubmitted ? "text-center" : ""
              }`}
          >
            {requestSubmitted
              ? "Thank you for choosing Optimus Health Solutions"
              : zipcodeError && isRequestService
                ? "Get early access"
                : zipcodeError
                  ? `ZIP code detected: ${newLocation || "—"}`
                  : "Change Zip Code"}
          </DialogTitle>
          {!requestSubmitted &&
            zipcodeError &&
            isRequestService && (
              <p className="text-sm text-gray-600 mt-2">
                Enter your email to get notified when we arrive
              </p>
            )}
          {!zipcodeError && (
            <p className="text-sm text-gray-600 mt-2">
              Enter your ZIP code to update your location.
            </p>
          )}
        </DialogHeader>


        {zipcodeError ? (
          <div className="px-6 py-4 space-y-4">
            {requestSubmitted ? (
              <>
                <div className="mb-4 p-3 rounded-lg border border-green-200 bg-green-50 text-sm text-green-700">
                  You will be notified as soon as we arrive!
                </div>
                <div className="flex gap-3">
                  <Button
                    onClick={handleRetryWithAnotherZipcode}
                    variant="outline"
                    className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50"
                  >
                    Retry with another zipcode
                  </Button>
                  <Button
                    onClick={onClose}
                    className="flex-1 bg-peter hover:bg-peter-dark text-white"
                  >
                    Close
                  </Button>
                </div>
              </>
            ) : (
              <>
                {!isRequestService && (
                  <div className="mb-4 p-3 text-center rounded-lg border border-red-200 bg-red-50 text-sm text-red-600">
                    {zipcodeError === "This zip code is not exist in our coverage area!" ? "This ZIP code is currently outside our coverage area, but we'reexpanding quickly." : zipcodeError}
                    <br />
                  </div>
                )}
                {isRequestService && (
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full h-12 border-2 border-gray-200 focus:border-peter focus:ring-peter/20"
                  />
                )}
                <Button
                  onClick={
                    isRequestService
                      ? handleRequestServiceSubmit
                      : handleRequestService
                  }
                  disabled={
                    isRequestService &&
                    (!email.trim() || !validateEmail(email.trim()))
                  }
                  className="w-full bg-peter hover:bg-peter-dark text-white disabled:opacity-50"
                >
                  {isSubmittingZipcode
                    ? <><p className="flex items-center justify-center gap-2">Submitting...<Loader className="animate-spin size-4 text-white" /></p></>
                    : isRequestService
                      ? "Submit"
                      : "Request Service in this Zip code"}
                </Button>
              </>
            )}
          </div>
        ) : (
          <div className="px-6 py-2">


            {/* Current Location */}
            <div className="mb-4">
              <h3 className="text-sm font-medium text-gray-700 mb-2">
                Current Location
              </h3>
              <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                <MapPin className="w-4 h-4 text-gray-500" />
                <span className="text-gray-900">{currentLocation}</span>
              </div>
            </div>

            {/* New Location Input */}
            <div className="mb-4">
              <h3 className="text-sm font-medium text-gray-700 mb-3">
                New Location
              </h3>
              <Input
                type="text"
                placeholder="Enter ZIP code"
                value={newLocation}
                onChange={(e) => setNewLocation(e.target.value)}
                className="w-full h-12 border-2 border-gray-200 focus:border-peter focus:ring-peter/20"
              />
            </div>

            {/* Location History */}
            {locationHistory.length > 0 && (
              <div className="mb-4">
                <h3 className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                  <History className="w-4 h-4" />
                  Recent Locations
                </h3>
                <div className="space-y-2 max-h-40 overflow-y-auto">
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
        )}


        {/* Action buttons */}
        {zipcodeError ? null : (
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
          </div>)}
      </DialogContent>
    </Dialog>
  );
}
