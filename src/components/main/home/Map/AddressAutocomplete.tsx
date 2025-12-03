"use client";
import React, { useRef, useState } from "react";
import { Location } from "./types";
import { PiMapPin } from "react-icons/pi";

interface AddressAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  onSelect: (location: Location, address: string) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  zipCode?: string;
  city?: string;
  state?: string;
}

interface AutocompleteSuggestion {
  place_id: string;
  description: string;
  structured_formatting: {
    main_text: string;
    secondary_text: string;
  };
}

export default function AddressAutocomplete({
  value,
  onChange,
  onSelect,
  placeholder = "Enter address",
  className = "",
  disabled = false,
  zipCode,
  city,
  state,
}: AddressAutocompleteProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [suggestions, setSuggestions] = useState<AutocompleteSuggestion[]>([]);

  const getPredictions = (
    input: string,
    locationBias?: { lat: number; lng: number }
  ) => {
    if (
      typeof window === "undefined" ||
      !window.google ||
      !window.google.maps ||
      !window.google.maps.places ||
      !window.google.maps.places.AutocompleteService
    ) {
      console.warn("Google Maps Places API not loaded");
      return;
    }

    const service = new window.google.maps.places.AutocompleteService();
    const requestOptions: google.maps.places.AutocompletionRequest = {
      input,
      componentRestrictions: { country: "us" },
      // Don't restrict types - let Google return all relevant results
      // We'll prioritize addresses in the UI
    };

    // Add location bias if we have coordinates
    if (locationBias) {
      const radius = 80467; // ~50 miles in meters
      requestOptions.locationBias = `circle:${radius}@${locationBias.lat},${locationBias.lng}`;
    }

    service.getPlacePredictions(requestOptions, (predictions, status) => {
      console.log("Autocomplete response:", {
        status,
        predictionsCount: predictions?.length || 0,
      });

      if (
        status === window.google.maps.places.PlacesServiceStatus.OK &&
        predictions &&
        predictions.length > 0
      ) {
        // Show all geocode results (which includes addresses)
        // Limit to 8 results for better UX
        const resultsToShow = predictions.slice(0, 8);

        setSuggestions(
          resultsToShow.map((p) => ({
            place_id: p.place_id,
            description: p.description,
            structured_formatting: {
              main_text: p.structured_formatting.main_text,
              secondary_text: p.structured_formatting.secondary_text,
            },
          }))
        );
        setShowSuggestions(true);
        console.log("Suggestions set:", resultsToShow.length);
      } else {
        // Log error for debugging
        if (
          status !== window.google.maps.places.PlacesServiceStatus.ZERO_RESULTS
        ) {
          console.warn("Autocomplete error:", status);
        }
        setSuggestions([]);
        setShowSuggestions(false);
      }
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onChange(newValue);
    setSelectedIndex(-1);

    // Get predictions for suggestions dropdown (minimum 2 characters)
    if (newValue.length >= 2) {
      // Check if Google Maps is available
      if (
        typeof window === "undefined" ||
        !window.google ||
        !window.google.maps ||
        !window.google.maps.places ||
        !window.google.maps.places.AutocompleteService
      ) {
        console.warn("Google Maps Places API not available yet");
        setSuggestions([]);
        setShowSuggestions(false);
        return;
      }
      // If we have location context, geocode it first to get coordinates for bias
      if (zipCode || (city && state)) {
        const locationBias =
          zipCode || (city && state ? `${city}, ${state}` : "");

        if (locationBias) {
          const geocoder = new window.google.maps.Geocoder();
          geocoder.geocode({ address: locationBias }, (results, status) => {
            if (status === "OK" && results && results[0]?.geometry?.location) {
              const location = results[0].geometry.location;
              getPredictions(newValue, {
                lat: location.lat(),
                lng: location.lng(),
              });
            } else {
              // Fallback: get predictions without location bias
              getPredictions(newValue);
            }
          });
        } else {
          getPredictions(newValue);
        }
      } else {
        // No location context - get predictions without bias
        getPredictions(newValue);
      }
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSelect = async (placeId: string, description: string) => {
    onChange(description);
    setShowSuggestions(false);

    // Get place details to get coordinates
    if (typeof window !== "undefined" && window.google) {
      const service = new window.google.maps.places.PlacesService(
        document.createElement("div")
      );

      service.getDetails(
        {
          placeId,
          fields: ["geometry", "formatted_address"],
        },
        (place, status) => {
          if (
            status === window.google.maps.places.PlacesServiceStatus.OK &&
            place?.geometry?.location
          ) {
            const location: Location = {
              lat: place.geometry.location.lat(),
              lng: place.geometry.location.lng(),
              address: place.formatted_address || description,
            };
            onSelect(location, place.formatted_address || description);
          }
        }
      );
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showSuggestions || suggestions.length === 0) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
        break;
      case "Enter":
        e.preventDefault();
        if (selectedIndex >= 0 && selectedIndex < suggestions.length) {
          handleSelect(
            suggestions[selectedIndex].place_id,
            suggestions[selectedIndex].description
          );
        }
        break;
      case "Escape":
        setShowSuggestions(false);
        break;
    }
  };

  const handleFocus = () => {
    if (suggestions.length > 0) {
      setShowSuggestions(true);
    }
  };

  const handleBlur = () => {
    // Delay to allow click events on suggestions
    setTimeout(() => setShowSuggestions(false), 200);
  };

  return (
    <div className="relative w-full">
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder={placeholder}
        disabled={disabled}
        className={`w-full bg-transparent border-none outline-none placeholder:text-gray-400 ${className} ${
          disabled ? "cursor-not-allowed" : ""
        }`}
      />
      {showSuggestions && suggestions.length > 0 && (
        <ul className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
          {suggestions.map((suggestion, index) => (
            <li
              key={suggestion.place_id}
              onClick={() =>
                handleSelect(suggestion.place_id, suggestion.description)
              }
              className={`px-4 py-2 cursor-pointer hover:bg-gray-100 transition-colors ${
                index === selectedIndex ? "bg-peter/10" : ""
              }`}
            >
              <div className="flex items-start gap-2">
                <span className="text-gray-800 mt-1">
                  <PiMapPin />
                </span>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {suggestion.structured_formatting.main_text}
                  </p>
                  <p className="text-xs text-gray-500">
                    {suggestion.structured_formatting.secondary_text}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
      {showSuggestions && suggestions.length === 0 && value.length >= 2 && (
        <ul className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg">
          <li className="px-4 py-2 text-sm text-gray-500">No results found</li>
        </ul>
      )}
    </div>
  );
}
