"use client";
import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import ContactDetails from "./ContactDetails";
import OrderSummary from "./OrderSummary";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import {
  selectIsLoggedIn,
  selectUser,
} from "@/store/slices/userSlice/userSlice";
import { useGetProfileQuery } from "@/store/Apis/profileApi/profileApi";
import {
  setCheckoutData,
  selectCheckoutData,
  clearCheckoutData,
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
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const currentUser = useAppSelector(selectUser);
  const { data: profile, refetch: refetchProfile } = useGetProfileQuery(
    undefined,
    {
      skip: !isLoggedIn, // Skip query if not logged in
    }
  );
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

  // Track previous user ID to detect user changes
  const [previousUserId, setPreviousUserId] = useState<string | null>(null);

  // Clear form and refetch profile when user changes
  useEffect(() => {
    const currentUserId = currentUser?._id || null;

    // If user ID changed, clear form immediately and refetch profile
    if (isLoggedIn && currentUserId && currentUserId !== previousUserId) {
      // Clear form immediately to avoid showing old data
      setFormData({
        email: "",
        contactNumber: "",
        firstName: "",
        lastName: "",
        dateOfBirth: "",
      });
      // Update previous user ID
      setPreviousUserId(currentUserId);
      // Force refetch to get fresh data for the new user
      refetchProfile();
    } else if (!isLoggedIn) {
      // Reset previous user ID on logout
      setPreviousUserId(null);
    } else if (isLoggedIn && currentUserId && !previousUserId) {
      // First time user logs in, set previous user ID
      setPreviousUserId(currentUserId);
    }
  }, [isLoggedIn, currentUser?._id, previousUserId, refetchProfile]);

  // Clear checkout data on logout or if it belongs to a different user
  useEffect(() => {
    const currentUserId = currentUser?._id || null;

    // If user logged out, clear all checkout data
    if (!isLoggedIn) {
      if (checkoutData.email || checkoutData.firstName || checkoutData.userId) {
        dispatch(clearCheckoutData());
        // Also manually clear all persisted checkout data from localStorage
        if (typeof window !== "undefined") {
          localStorage.removeItem("persist:checkout");
          localStorage.removeItem("persist:root");
          // Clear any other persist keys that might exist
          Object.keys(localStorage).forEach((key) => {
            if (key.startsWith("persist:")) {
              localStorage.removeItem(key);
            }
          });
        }
      }
      return;
    }

    // If user is logged in but checkout data belongs to a different user, clear it
    if (
      isLoggedIn &&
      currentUserId &&
      checkoutData.userId &&
      checkoutData.userId !== currentUserId
    ) {
      dispatch(clearCheckoutData());
      // Also manually clear persisted checkout data from localStorage
      if (typeof window !== "undefined") {
        localStorage.removeItem("persist:checkout");
      }
      return;
    }
  }, [
    currentUser?._id,
    isLoggedIn,
    checkoutData.userId,
    checkoutData.email,
    checkoutData.firstName,
    dispatch,
  ]);

  // Load form data: from checkout data (if belongs to user) OR from profile (if logged in) OR clear (if logged out)
  useEffect(() => {
    const currentUserId = currentUser?._id || null;

    // If user is logged out, clear form immediately
    if (!isLoggedIn) {
      setFormData({
        email: "",
        contactNumber: "",
        firstName: "",
        lastName: "",
        dateOfBirth: "",
      });
      return;
    }

    // If user is logged in
    if (isLoggedIn && currentUserId) {
      // Priority 1: Load from checkout data if it belongs to current user
      if (
        checkoutData.userId === currentUserId &&
        (checkoutData.email || checkoutData.firstName)
      ) {
        setFormData({
          email: checkoutData.email || "",
          contactNumber: checkoutData.contactNumber || "",
          firstName: checkoutData.firstName || "",
          lastName: checkoutData.lastName || "",
          dateOfBirth: checkoutData.dateOfBirth || "",
        });
        return;
      }

      // Priority 2: Load from profile if available (when no checkout data or checkout data cleared)
      // This will update immediately when profile data is available
      if (profile?.data) {
        setFormData({
          email: profile?.data?.email || "",
          contactNumber: profile?.data?.phone || "",
          firstName: profile?.data?.first_name || "",
          lastName: profile?.data?.last_name || "",
          dateOfBirth: parseDateOfBirth(profile?.data?.dateOfBirth || ""),
        });
        return;
      }

      // If profile is not loaded yet but user is logged in, clear form to avoid showing old data
      if (!profile?.data) {
        setFormData({
          email: "",
          contactNumber: "",
          firstName: "",
          lastName: "",
          dateOfBirth: "",
        });
      }
    }
  }, [
    isLoggedIn,
    currentUser?._id,
    profile?.data,
    checkoutData.userId,
    checkoutData.email,
    checkoutData.firstName,
    checkoutData.contactNumber,
    checkoutData.lastName,
    checkoutData.dateOfBirth,
  ]);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    // Save contact details to checkout slice before moving to next step
    const currentUserId = currentUser?._id || null;
    dispatch(
      setCheckoutData({
        userId: currentUserId,
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
