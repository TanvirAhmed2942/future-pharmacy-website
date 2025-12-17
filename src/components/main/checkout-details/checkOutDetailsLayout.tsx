"use client";
import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import ContactDetails from "./ContactDetails";
import OrderSummary from "./OrderSummary";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { selectIsLoggedIn } from "@/store/slices/userSlice/userSlice";
import { useGetProfileQuery } from "@/store/Apis/profileApi/profileApi";
import {
  setCheckoutData,
  selectCheckoutData,
} from "@/store/slices/checkoutSlice";

// Parse date from "dd-mm-yyyy" format to ISO string
const parseDateOfBirth = (dateStr: string): string => {
  if (!dateStr) return "";

  // Check if it's already in ISO format
  if (dateStr.includes("T") || /^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
    return dateStr;
  }

  // Parse "dd-mm-yyyy" format
  const parts = dateStr.split("-");
  if (parts.length === 3) {
    const [day, month, year] = parts;
    // Create ISO date string: yyyy-mm-dd
    return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
  }

  return dateStr;
};

export default function CheckOutDetailsLayout() {
  const { data: profile } = useGetProfileQuery();
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const dispatch = useAppDispatch();
  const checkoutData = useAppSelector(selectCheckoutData);
  const [currentStep, setCurrentStep] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    contactNumber: "",
    firstName: "",
    lastName: "",
    dateOfBirth: "",
  });

  // Load contact details from persisted checkout data if available
  useEffect(() => {
    if (checkoutData.email || checkoutData.firstName) {
      setFormData({
        email: checkoutData.email || "",
        contactNumber: checkoutData.contactNumber || "",
        firstName: checkoutData.firstName || "",
        lastName: checkoutData.lastName || "",
        dateOfBirth: checkoutData.dateOfBirth || "",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run on mount

  // Prepopulate form data if user is logged in (only if not already loaded from checkout data)
  useEffect(() => {
    if (
      isLoggedIn &&
      profile?.data &&
      !checkoutData.email &&
      !checkoutData.firstName
    ) {
      setFormData({
        email: profile?.data?.email || "",
        contactNumber: profile?.data?.phone || "",
        firstName: profile?.data?.first_name || "",
        lastName: profile?.data?.last_name || "",
        dateOfBirth: parseDateOfBirth(profile?.data?.dateOfBirth || ""),
      });
    }
  }, [isLoggedIn, profile?.data, checkoutData.email, checkoutData.firstName]);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    // Save contact details to checkout slice before moving to next step
    dispatch(
      setCheckoutData({
        email: formData.email,
        contactNumber: formData.contactNumber,
        firstName: formData.firstName,
        lastName: formData.lastName,
        dateOfBirth: formData.dateOfBirth,
      })
    );

    setIsAnimating(true);
    setTimeout(() => {
      setCurrentStep(2);
      setIsAnimating(false);
    }, 300);
  };

  const handlePrevious = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentStep(1);
      setIsAnimating(false);
    }, 300);
  };

  const handleComplete = () => {
    // Handle payment completion
    console.log("Payment completed with data:", formData);
    // You can add navigation logic here or close the modal
    // For now, we'll just log the completion
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <Card className="bg-white rounded-xl shadow-lg relative overflow-hidden">
          <div className="relative">
            {/* Contact Details Form */}
            <div
              className={`transition-all duration-300 ${
                currentStep === 1
                  ? "translate-x-0 opacity-100 block"
                  : isAnimating
                  ? "-translate-x-full opacity-0 absolute inset-0"
                  : "-translate-x-full opacity-0 absolute inset-0"
              }`}
            >
              <ContactDetails
                formData={formData}
                onInputChange={handleInputChange}
                onNext={handleNext}
              />
            </div>

            {/* Order Summary Form */}
            <div
              className={`transition-all duration-300 ${
                currentStep === 2
                  ? "translate-x-0 opacity-100 block"
                  : isAnimating
                  ? "translate-x-full opacity-0 absolute inset-0"
                  : "translate-x-full opacity-0 absolute inset-0"
              }`}
            >
              <OrderSummary
                formData={formData}
                onPrevious={handlePrevious}
                onComplete={handleComplete}
              />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
