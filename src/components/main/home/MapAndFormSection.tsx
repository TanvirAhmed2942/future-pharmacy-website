"use client";
import React, { useState, useEffect } from "react";
import {
  MapPin,
  Calendar,
  Clock,
  // ShoppingCart,
  ChevronRight,
  ShoppingCart,
} from "lucide-react";
import { FaSortDown } from "react-icons/fa";
import { Card } from "@/components/ui/card";
import DatePickerModal from "@/components/ui/date-picker-modal";
import TimePickerModal from "@/components/ui/time-picker-modal";
import LocationPickerModal from "@/components/main/home/location-picker-modal";
import NewCustomerModal from "./checkUserStatusModal";
import { useAuth } from "@/userInfo.authProvide";
import { useRouter } from "next/navigation";
import { Label } from "@radix-ui/react-label";
import { useTranslations } from "next-intl";
import MapComponent from "./Map";
import GoogleMapsProvider from "./Map/GoogleMapsProvider";
import AddressAutocomplete from "./Map/AddressAutocomplete";
import { Location, Pharmacy } from "./Map/types";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  setPickupAddress,
  setDropoffAddress,
  setPickupLocation,
  setDropoffLocation,
  setZipCode,
  setCity,
  setState,
  setCurrentLocation,
} from "@/store/slices/mapSlice";
export default function MapAndFormSection() {
  const t = useTranslations("home.mapAndFormSection");
  const tForm = useTranslations("home.form");
  const dispatch = useAppDispatch();

  // Redux state
  const pickupAddress = useAppSelector((state) => state.map.pickupAddress);
  const dropoffAddress = useAppSelector((state) => state.map.dropoffAddress);
  const pickupLocationCoords = useAppSelector(
    (state) => state.map.pickupLocation
  );
  const dropoffLocationCoords = useAppSelector(
    (state) => state.map.dropoffLocation
  );
  const zipCode = useAppSelector((state) => state.map.zipCode);
  const city = useAppSelector((state) => state.map.city);
  const state = useAppSelector((state) => state.map.state);
  const currentLocation = useAppSelector((state) => state.map.currentLocation);

  // Local state for UI
  const [deliveryTime, setDeliveryTime] = useState("today");
  const [deliverySpeed, setDeliverySpeed] = useState("now");
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [isTimePickerOpen, setIsTimePickerOpen] = useState(false);
  const [isLocationPickerOpen, setIsLocationPickerOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string | undefined>(
    undefined
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const router = useRouter();
  const { isLoggedIn } = useAuth();

  // Parse location string to extract zipcode, city, state using geocoding
  useEffect(() => {
    const parseLocation = async () => {
      if (!currentLocation || typeof window === "undefined" || !window.google) {
        return;
      }

      // First try simple regex parsing
      const zipMatch = currentLocation.match(/\b\d{5}\b/);
      if (zipMatch) {
        dispatch(setZipCode(zipMatch[0]));
      }

      const cityStateMatch = currentLocation.match(
        /([^,]+),\s*([A-Z]{2})\s+\d{5}/
      );
      if (cityStateMatch) {
        dispatch(setCity(cityStateMatch[1].trim()));
        dispatch(setState(cityStateMatch[2].trim()));
      }

      // Also use geocoding to get more accurate location details
      try {
        const geocoder = new window.google.maps.Geocoder();
        geocoder.geocode({ address: currentLocation }, (results, status) => {
          if (status === "OK" && results && results[0]) {
            const addressComponents = results[0].address_components;

            // Extract zipcode
            const postalCode = addressComponents.find((component) =>
              component.types.includes("postal_code")
            );
            if (postalCode) {
              dispatch(setZipCode(postalCode.long_name));
            }

            // Extract city
            const cityComponent = addressComponents.find(
              (component) =>
                component.types.includes("locality") ||
                component.types.includes("sublocality") ||
                component.types.includes("sublocality_level_1")
            );
            if (cityComponent) {
              dispatch(setCity(cityComponent.long_name));
            }

            // Extract state
            const stateComponent = addressComponents.find((component) =>
              component.types.includes("administrative_area_level_1")
            );
            if (stateComponent) {
              dispatch(setState(stateComponent.short_name));
            }
          }
        });
      } catch (error) {
        console.error("Error geocoding location:", error);
      }
    };

    parseLocation();
  }, [currentLocation, dispatch]);

  const checkIsLoggedIn = () => {
    return isLoggedIn;
  };

  console.log("checkIsLoggedIn", checkIsLoggedIn());
  const handleRedirect = () => {
    if (checkIsLoggedIn()) {
      return router.push("/checkout-details");
    } else {
      setIsModalOpen(true);
    }
  };

  const handlePickupSelect = (location: Location, address: string) => {
    dispatch(setPickupAddress(address));
    dispatch(setPickupLocation(location));
  };

  const handleDropoffSelect = (location: Location, address: string) => {
    dispatch(setDropoffAddress(address));
    dispatch(setDropoffLocation(location));
  };

  const handlePharmacyClick = (pharmacy: Pharmacy) => {
    console.log("Pharmacy clicked:", pharmacy);
    // You can add modal or navigation logic here
  };

  return (
    <div className="flex flex-col lg:flex-row bg-gray-50 pt-4 sm:pt-8 lg:px-4 px-0 pb-4 sm:pb-8 gap-x-16 gap-y-4 sm:gap-y-8 ">
      {/* Left Section - Form */}
      <div className="w-full lg:w-1/2 px-4 lg:px-8 py-6 overflow-y-auto bg-white rounded-xl ">
        <div className="max-w-full">
          {/* Address Header */}
          <div className="mb-6">
            <div className="flex flex-col-reverse sm:flex-row items-center sm:items-start gap-2 text-sm text-gray-600 mb-4">
              <span className="flex items-center justify-start sm:justify-center gap-2">
                <MapPin className="w-4 h-4" />
                {currentLocation}
              </span>
              <button
                onClick={() => setIsLocationPickerOpen(true)}
                className="text-peter hover:text-peter-dark sm:ml-2 hover:underline cursor-pointer"
              >
                {t("changeCityOrZipCode")}
              </button>
            </div>
            <h1
              id="request-your-rx-delivered-in-minutes"
              className="hidden sm:block text-2xl lg:text-xl 2xl:text-2xl font-bold text-gray-900 "
            >
              {t("title")}
            </h1>
            <h1
              id="request-your-rx-delivered-in-minutes"
              className="block sm:hidden text-2xl lg:text-xl 2xl:text-2xl font-medium text-gray-900 text-center"
            >
              {t("titleforMobileView")}
            </h1>
          </div>

          {/* Pickup Location */}
          <div className="relative">
            <Card className="mb-4 p-4 border-2 border-gray-200 hover:border-[#be95be] cursor-pointer transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 w-10/12">
                  <div className="w-4.5 h-4 rounded-full bg-black"></div>
                  <GoogleMapsProvider>
                    <div className="w-full relative">
                      <AddressAutocomplete
                        value={pickupAddress}
                        onChange={(value) => dispatch(setPickupAddress(value))}
                        onSelect={handlePickupSelect}
                        placeholder={tForm("pickupLocation")}
                        className="bg-transparent border-none outline-none placeholder:text-gray-400 text-gray-700 w-full"
                        zipCode={zipCode}
                        city={city}
                        state={state}
                      />
                    </div>
                  </GoogleMapsProvider>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            </Card>

            {/* Drop-off Address */}
            <Card className="mb-6 p-4 border-2 border-gray-200 hover:border-[#be95be] cursor-pointer transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 w-10/12">
                  <div className="w-4 h-4 bg-peter flex items-center justify-center border border-black">
                    <span className="w-1 h-1 bg-black  z-10"></span>
                  </div>
                  <GoogleMapsProvider>
                    <div className="w-full relative">
                      <AddressAutocomplete
                        value={dropoffAddress}
                        onChange={(value) => dispatch(setDropoffAddress(value))}
                        onSelect={handleDropoffSelect}
                        placeholder={tForm("dropoffAddress")}
                        className="bg-transparent border-none outline-none placeholder:text-gray-400 text-gray-700 w-full"
                        zipCode={zipCode}
                        city={city}
                        state={state}
                      />
                    </div>
                  </GoogleMapsProvider>
                </div>
              </div>
            </Card>
            <div className="absolute top-14.5 left-6 border-l-3 border-gray-200 h-5 "></div>
          </div>
          {/* Delivery Time Options */}
          <div className="grid grid-cols-2 gap-4 mb-6 ">
            <div className="w-full flex flex-col items-start gap-2 ">
              <Label className="text-md text-gray-600">{tForm("date")}</Label>
              <button
                onClick={() => setIsDatePickerOpen(true)}
                className={`p-4 rounded-lg border-2 transition-all cursor-pointer hover:border-[#be95be] w-full ${
                  deliveryTime === "today"
                    ? "border-peter bg-peter/10"
                    : "border-gray-200 bg-white hover:border-gray-300"
                }`}
              >
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-gray-600" />
                  <span className="font-medium text-gray-900">
                    {selectedDate
                      ? selectedDate.toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })
                      : tForm("today")}
                  </span>
                </div>
              </button>
            </div>
            <div className="w-full flex flex-col items-start gap-2 ">
              <Label className="text-md text-gray-600">{tForm("time")}</Label>
              <button
                onClick={() => setIsTimePickerOpen(true)}
                className={`p-4 rounded-lg border-2 transition-all cursor-pointer hover:border-[#be95be] w-full ${
                  deliverySpeed === "now"
                    ? "border-peter bg-peter/10"
                    : "border-gray-200 bg-white hover:border-gray-300"
                }`}
              >
                <div className="flex items-center  justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-gray-600" />
                    <span className="font-medium text-gray-900">
                      {selectedTime
                        ? selectedTime.split(" - ")[0] // Show just the start time
                        : tForm("now")}
                    </span>
                  </div>

                  <FaSortDown className="w-4 h-4 text-gray-600 -mt-2" />
                </div>
              </button>
            </div>
          </div>

          {/* Checkout Button */}
          <button
            className="w-full bg-peter hover:bg-peter-dark text-white  h-12 rounded-lg text-lg font-semibold shadow-lg flex items-center justify-center gap-2 cursor-pointer"
            onClick={() => handleRedirect()}
          >
            <ShoppingCart className="w-5 h-5 mr-2" />
            {/* <p className="w-5 h-5 flex items-center justify-center mr-2">
              {useIcon({ name: "cart" })}
            </p> */}
            {/* <TiShoppingCart size={20} /> */}
            {tForm("checkoutRequest")}
          </button>

          {/* Pharmacy Suggestions */}
          <div className="mt-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              {t("pharmacySuggestions")}
            </h2>
            <div className="space-y-3">
              <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-red-500 mt-1" />

                  <div>
                    <h3 className="font-semibold text-gray-900">
                      CVS Pharmacy- Downtown
                    </h3>
                    <p className="text-sm text-gray-500">
                      123 main St, Newark, NJ 07102
                    </p>
                  </div>
                </div>
              </Card>
              <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-red-500 mt-1" />

                  <div>
                    <h3 className="font-semibold text-gray-900">
                      Walgreens - Medical Center
                    </h3>
                    <p className="text-sm text-gray-500">
                      123 main St, Newark, NJ 07102
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Right Section - Map - Visible on all devices */}
      <div className="flex w-full lg:w-1/2 px-4 md:px-0 relative rounded-xl h-[400px] sm:h-[450px] md:h-[500px] lg:h-auto lg:min-h-[600px]">
        <MapComponent
          pickupAddress={pickupAddress}
          dropoffAddress={dropoffAddress}
          zipCode={zipCode}
          city={city}
          state={state}
          onPharmacyClick={handlePharmacyClick}
          showRoute={!!pickupLocationCoords && !!dropoffLocationCoords}
          height="100%"
        />
      </div>

      {/* Date Picker Modal */}
      <DatePickerModal
        isOpen={isDatePickerOpen}
        onClose={() => setIsDatePickerOpen(false)}
        onDateSelect={(date) => {
          setSelectedDate(date);
          setDeliveryTime("today");
        }}
        selectedDate={selectedDate}
      />

      {/* Time Picker Modal */}
      <TimePickerModal
        isOpen={isTimePickerOpen}
        onClose={() => setIsTimePickerOpen(false)}
        onTimeSelect={(time) => {
          setSelectedTime(time);
          setDeliverySpeed("now");
        }}
        selectedTime={selectedTime}
        selectedDate={selectedDate}
      />

      {/* Location Picker Modal */}
      <LocationPickerModal
        isOpen={isLocationPickerOpen}
        onClose={() => setIsLocationPickerOpen(false)}
        onLocationSelect={(location) => {
          dispatch(setCurrentLocation(location));
        }}
        currentLocation={currentLocation}
      />

      {/* New Customer Modal */}
      <NewCustomerModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        description={t("modalDescription")}
      />
    </div>
  );
}
