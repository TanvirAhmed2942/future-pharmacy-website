"use client";
import React, { useState } from "react";
import {
  MapPin,
  Calendar,
  Clock,
  ShoppingCart,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import DatePickerModal from "@/components/ui/date-picker-modal";
import TimePickerModal from "@/components/ui/time-picker-modal";
import LocationPickerModal from "@/components/ui/location-picker-modal";
import NewCustomerModal from "./checkUserStatusModal";
import { useAuth } from "@/userInfo.authProvide";
import { useRouter } from "next/navigation";
export default function MapAndFormSection() {
  const [pickupLocation, setPickupLocation] = useState("");
  const [dropoffAddress, setDropoffAddress] = useState("");
  const [deliveryTime, setDeliveryTime] = useState("today");
  const [deliverySpeed, setDeliverySpeed] = useState("now");
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [isTimePickerOpen, setIsTimePickerOpen] = useState(false);
  const [isLocationPickerOpen, setIsLocationPickerOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string | undefined>(
    undefined
  );
  const [currentLocation, setCurrentLocation] = useState(
    "1901 Thornridge Cir. Shiloh, Hawaii 81063"
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const router = useRouter();
  const { isLoggedIn } = useAuth();

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

  return (
    <div className="flex bg-gray-50 pt-8 pb-16 gap-16">
      {/* Left Section - Form */}
      <div className="w-full lg:w-1/2 px-4 lg:px-8 py-6 overflow-y-auto bg-white rounded-xl ">
        <div className="max-w-xl">
          {/* Address Header */}
          <div className="mb-6">
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
              <MapPin className="w-4 h-4" />
              <span>{currentLocation}</span>
              <button
                onClick={() => setIsLocationPickerOpen(true)}
                className="text-peter hover:text-peter-dark ml-2 hover:underline cursor-pointer"
              >
                Change City or Zip Code
              </button>
            </div>
            <h1 className="text-3xl font-bold text-gray-900">
              Request Your Prescription Delivery
            </h1>
          </div>

          {/* User Info Display */}
          {/* <div className="mb-6 p-4 bg-gray-50 rounded-lg border">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              User Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <div>
                <span className="font-medium text-gray-700">Name:</span>
                <span className="ml-2 text-gray-600">{user.name}</span>
              </div>
              <div>
                <span className="font-medium text-gray-700">Email:</span>
                <span className="ml-2 text-gray-600">{user.email}</span>
              </div>
              <div>
                <span className="font-medium text-gray-700">Phone:</span>
                <span className="ml-2 text-gray-600">{user.phone}</span>
              </div>
              <div>
                <span className="font-medium text-gray-700">Address:</span>
                <span className="ml-2 text-gray-600">{user.address}</span>
              </div>
              <div>
                <span className="font-medium text-gray-700">City:</span>
                <span className="ml-2 text-gray-600">
                  {user.city}, {user.state} {user.zip}
                </span>
              </div>
              <div>
                <span className="font-medium text-gray-700">Status:</span>
                <span
                  className={`ml-2 px-2 py-1 rounded-full text-xs ${
                    isLoggedIn
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {isLoggedIn ? "Logged In" : "Not Logged In"}
                </span>
              </div>
            </div>
          </div> */}

          {/* Pickup Location */}
          <div className="relative">
            <Card className="mb-4 p-4 border-2 border-gray-200 hover:border-[#be95be] cursor-pointer transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 w-10/12">
                  <div className="w-4.5 h-4 rounded-full bg-black"></div>
                  <input
                    type="text"
                    placeholder="Pickup Location"
                    value={pickupLocation}
                    onChange={(e) => setPickupLocation(e.target.value)}
                    className="text-gray-700 bg-transparent border-none outline-none placeholder:text-gray-400 w-full"
                  />
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
                  <input
                    type="text"
                    placeholder="Drop-off address"
                    value={dropoffAddress}
                    onChange={(e) => setDropoffAddress(e.target.value)}
                    className="text-gray-700 bg-transparent border-none outline-none placeholder:text-gray-400 w-full "
                  />
                </div>
              </div>
            </Card>
            <div className="absolute top-14.5 left-6 border-l-3 border-gray-200 h-5 "></div>
          </div>
          {/* Delivery Time Options */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <button
              onClick={() => setIsDatePickerOpen(true)}
              className={`p-4 rounded-lg border-2 transition-all cursor-pointer hover:border-[#be95be] ${
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
                    : "Today"}
                </span>
              </div>
            </button>
            <button
              onClick={() => setIsTimePickerOpen(true)}
              className={`p-4 rounded-lg border-2 transition-all cursor-pointer hover:border-[#be95be] ${
                deliverySpeed === "now"
                  ? "border-peter bg-peter/10"
                  : "border-gray-200 bg-white hover:border-gray-300"
              }`}
            >
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-gray-600" />
                <span className="font-medium text-gray-900">
                  {selectedTime
                    ? selectedTime.split(" - ")[0] // Show just the start time
                    : "Now"}
                </span>
              </div>
            </button>
          </div>

          {/* Checkout Button */}
          <Button
            className="w-full bg-peter hover:bg-peter-dark text-white py-6 rounded-lg text-lg font-semibold shadow-lg"
            onClick={() => handleRedirect()}
          >
            <ShoppingCart className="w-5 h-5 mr-2" />
            Checkout Request
          </Button>

          {/* Pharmacy Suggestions */}
          <div className="mt-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Pharmacy Suggestions
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

      {/* Right Section - Map */}
      <div className="hidden lg:block md:w-1/2  relative rounded-xl">
        <iframe
          src="https://www.openstreetmap.org/export/embed.html?bbox=-74.2097%2C40.7014%2C-74.1497%2C40.7614&layer=mapnik&marker=40.7314,-74.1794"
          className="w-full h-full border-0 rounded-xl"
          title="Map of Newark, NJ"
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
          setCurrentLocation(location);
        }}
        currentLocation={currentLocation}
      />

      {/* New Customer Modal */}
      <NewCustomerModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        description="Create a Optimus health Solutions account for faster checkout later. No time right now? No problem. You can check out as guest."
      />
    </div>
  );
}
