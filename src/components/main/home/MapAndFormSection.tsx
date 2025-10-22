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

export default function MapAndFormSection() {
  const [pickupLocation, setPickupLocation] = useState("");
  const [dropoffAddress, setDropoffAddress] = useState("");
  const [deliveryTime, setDeliveryTime] = useState("today");
  const [deliverySpeed, setDeliverySpeed] = useState("now");

  return (
    <div className="flex bg-gray-50 py-16 gap-16">
      {/* Left Section - Form */}
      <div className="w-full lg:w-1/2 p-8 overflow-y-auto bg-white rounded-xl ">
        <div className="max-w-xl">
          {/* Address Header */}
          <div className="mb-6">
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
              <MapPin className="w-4 h-4" />
              <span>1901 Thornridge Cir. Shiloh, Hawaii US</span>
              <button className="text-peter hover:text-peter-dark ml-2">
                Change City or Zip Code
              </button>
            </div>
            <h1 className="text-3xl font-bold text-gray-900">
              Request Your Prescription Delivery
            </h1>
          </div>

          {/* Pickup Location */}
          <Card className="mb-4 p-4 border-2 border-gray-200 hover:border-[#be95be] cursor-pointer transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-black"></div>
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
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-peter"></div>
                <input
                  type="text"
                  placeholder="Drop-off address"
                  value={dropoffAddress}
                  onChange={(e) => setDropoffAddress(e.target.value)}
                  className="text-gray-700 bg-transparent border-none outline-none placeholder:text-gray-400 w-full"
                />
              </div>
            </div>
          </Card>

          {/* Delivery Time Options */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <button
              onClick={() => setDeliveryTime("today")}
              className={`p-4 rounded-lg border-2 transition-all ${
                deliveryTime === "today"
                  ? "border-peter bg-peter/10"
                  : "border-gray-200 bg-white hover:border-gray-300"
              }`}
            >
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-gray-600" />
                <span className="font-medium text-gray-900">Today</span>
              </div>
            </button>
            <button
              onClick={() => setDeliverySpeed("now")}
              className={`p-4 rounded-lg border-2 transition-all ${
                deliverySpeed === "now"
                  ? "border-peter bg-peter/10"
                  : "border-gray-200 bg-white hover:border-gray-300"
              }`}
            >
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-gray-600" />
                <span className="font-medium text-gray-900">Now</span>
              </div>
            </button>
          </div>

          {/* Checkout Button */}
          <Button className="w-full bg-peter hover:bg-peter-dark text-white py-6 rounded-lg text-lg font-semibold shadow-lg">
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
      <div className="hidden lg:block w-1/2 relative rounded-xl">
        <iframe
          src="https://www.openstreetmap.org/export/embed.html?bbox=-74.2097%2C40.7014%2C-74.1497%2C40.7614&layer=mapnik&marker=40.7314,-74.1794"
          className="w-full h-full border-0 rounded-xl"
          title="Map of Newark, NJ"
        />
      </div>
    </div>
  );
}
