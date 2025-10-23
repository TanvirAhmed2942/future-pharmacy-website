"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

interface OrderSummaryProps {
  formData: {
    email: string;
    contactNumber: string;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
  };
  onPrevious: () => void;
  onComplete: () => void;
}

export default function OrderSummary({
  formData,
  onPrevious,
  onComplete,
}: OrderSummaryProps) {
  return (
    <div className="px-6">
      <div className="flex items-center gap-3 mb-6">
        <Button
          onClick={onPrevious}
          variant="outline"
          size="sm"
          className="p-2"
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>
        <h2 className="text-2xl font-bold text-gray-900">
          Order summary/confirmation
        </h2>
      </div>

      <div className="space-y-4">
        {/* Contact and Delivery Details */}
        <div className="space-y-3">
          <div className="flex justify-between py-2 border-b border-gray-200">
            <span className="text-gray-600">Name:</span>
            <span className="font-medium">
              {formData.firstName} {formData.lastName}
            </span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-200">
            <span className="text-gray-600">Contact Number:</span>
            <span className="font-medium">{formData.contactNumber}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-200">
            <span className="text-gray-600">Pick up address:</span>
            <span className="font-medium">CVS Pharmacy Broadway</span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-200">
            <span className="text-gray-600">Deliver address:</span>
            <span className="font-medium">7th Avenue, New York, NY</span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-200">
            <span className="text-gray-600">Date:</span>
            <span className="font-medium">Today</span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-200">
            <span className="text-gray-600">Time:</span>
            <span className="font-medium">Now</span>
          </div>
        </div>

        {/* Price Details */}
        <div className="mt-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            Price Details
          </h3>
          <div className="space-y-2">
            <div className="flex justify-between py-2 border-b border-gray-200">
              <span className="text-gray-600">Delivery Fee:</span>
              <span className="font-medium">$7.99</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-200">
              <span className="text-gray-600">Service Fee:</span>
              <span className="font-medium">$1.09</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-200">
              <span className="text-gray-600">Processing Fee:</span>
              <span className="font-medium">$1.09</span>
            </div>
            <div className="flex justify-between py-2 border-b-2 border-gray-300">
              <span className="text-lg font-semibold text-gray-900">
                Total USD:
              </span>
              <span className="text-lg font-bold text-gray-900">$10.17</span>
            </div>
          </div>
        </div>

        {/* Legal Agreement Text */}
        <p className="text-sm text-gray-600">
          By clicking place order, you agree to Optimums Health Solutions{" "}
          <button className="text-peter hover:underline">
            Terms of Service
          </button>
          ,{" "}
          <button className="text-peter hover:underline">
            Payments Terms of service
          </button>{" "}
          and{" "}
          <button className="text-peter hover:underline">
            Nondiscrimination Policy
          </button>
          , and acknowledge the{" "}
          <button className="text-peter hover:underline">Privacy Policy</button>
          .
        </p>

        {/* Complete Payment Button */}
        <Button
          onClick={onComplete}
          className="w-full bg-peter hover:bg-peter-dark text-white py-3 rounded-lg font-semibold"
        >
          Complete Payment On Stripe
        </Button>
      </div>
    </div>
  );
}
