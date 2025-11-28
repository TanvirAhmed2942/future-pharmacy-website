"use client";
import React, { useRef, useEffect, useState } from "react";
import { Location } from "./types";

interface AddressAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  onSelect: (location: Location, address: string) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
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
}: AddressAutocompleteProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [suggestions, setSuggestions] = useState<AutocompleteSuggestion[]>([]);
  const [ready, setReady] = useState(false);

  // Initialize Google Places Autocomplete
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.google &&
      inputRef.current &&
      !autocompleteRef.current
    ) {
      const autocomplete = new window.google.maps.places.Autocomplete(
        inputRef.current,
        {
          componentRestrictions: { country: "us" },
          fields: ["place_id", "geometry", "formatted_address"],
        }
      );

      const placeChangedHandler = () => {
        const place = autocomplete.getPlace();
        if (place.geometry?.location) {
          const location: Location = {
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
            address: place.formatted_address || value,
          };
          onSelect(location, place.formatted_address || value);
          setShowSuggestions(false);
        }
      };

      autocomplete.addListener("place_changed", placeChangedHandler);

      autocompleteRef.current = autocomplete;
      setReady(true);
    }

    return () => {
      if (autocompleteRef.current && typeof window !== "undefined" && window.google) {
        window.google.maps.event.clearInstanceListeners(autocompleteRef.current);
        autocompleteRef.current = null;
      }
    };
  }, [onSelect, value]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onChange(newValue);
    setSelectedIndex(-1);

    // Get predictions for suggestions dropdown
    if (newValue.length > 2 && typeof window !== "undefined" && window.google) {
      const service = new window.google.maps.places.AutocompleteService();
      service.getPlacePredictions(
        {
          input: newValue,
          componentRestrictions: { country: "us" },
        },
        (predictions, status) => {
          if (
            status === window.google.maps.places.PlacesServiceStatus.OK &&
            predictions
          ) {
            setSuggestions(
              predictions.map((p) => ({
                place_id: p.place_id,
                description: p.description,
                structured_formatting: {
                  main_text: p.structured_formatting.main_text,
                  secondary_text: p.structured_formatting.secondary_text,
                },
              }))
            );
            setShowSuggestions(true);
          } else {
            setSuggestions([]);
            setShowSuggestions(false);
          }
        }
      );
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
        disabled={disabled || !ready}
        className={`w-full bg-transparent border-none outline-none placeholder:text-gray-400 ${className} ${
          disabled || !ready ? "cursor-not-allowed" : ""
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
                <span className="text-gray-400 mt-1">📍</span>
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
      {showSuggestions && suggestions.length === 0 && value.length > 2 && (
        <ul className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg">
          <li className="px-4 py-2 text-sm text-gray-500">No results found</li>
        </ul>
      )}
    </div>
  );
}

