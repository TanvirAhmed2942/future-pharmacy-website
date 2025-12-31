"use client";
import React, { useState, useEffect, useRef } from "react";
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

  // Use refs to track latest values for cleanup function
  const checkoutDataRef = useRef(checkoutData);
  const isLoggedInRef = useRef(isLoggedIn);

  // Update refs whenever values change
  useEffect(() => {
    checkoutDataRef.current = checkoutData;
    isLoggedInRef.current = isLoggedIn;
  }, [checkoutData, isLoggedIn]);

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

  // Clear guest checkout data when user is logged in
  // This runs FIRST and IMMEDIATELY whenever user is logged in
  useEffect(() => {
    const currentUserId = currentUser?._id || null;

    // If user is logged in, clear any guest checkout data (userId === null)
    if (isLoggedIn && currentUserId) {
      // Check if there's any guest data (userId is null) OR data from different user
      const hasGuestData =
        checkoutData.userId === null &&
        (checkoutData.email ||
          checkoutData.firstName ||
          checkoutData.pickupAddress ||
          checkoutData.dropoffAddress);

      const hasDifferentUserData =
        checkoutData.userId &&
        checkoutData.userId !== currentUserId &&
        (checkoutData.email ||
          checkoutData.firstName ||
          checkoutData.pickupAddress ||
          checkoutData.dropoffAddress);

      if (hasGuestData || hasDifferentUserData) {
        // Clear form data immediately to prevent showing guest/different user data
        setFormData({
          email: "",
          contactNumber: "",
          firstName: "",
          lastName: "",
          dateOfBirth: "",
        });
        // Clear checkout data from Redux
        dispatch(clearCheckoutData());
        // Also manually clear persisted checkout data from localStorage
        if (typeof window !== "undefined") {
          localStorage.removeItem("persist:checkout");
        }
      }
    }
  }, [
    isLoggedIn,
    currentUser?._id,
    checkoutData.userId,
    checkoutData.email,
    checkoutData.firstName,
    checkoutData.pickupAddress,
    checkoutData.dropoffAddress,
    dispatch,
  ]);

  // Load form data: For logged-in users, ALWAYS prioritize profile data
  // For guests, load from checkout data
  useEffect(() => {
    const currentUserId = currentUser?._id || null;

    // PRIORITY 1: If user is logged in, ALWAYS load from profile first (never from guest checkout data)
    if (isLoggedIn && currentUserId) {
      // If profile data is available, use it
      if (profile?.data) {
        setFormData({
          email: profile.data.email || "",
          contactNumber: profile.data.phone || "",
          firstName: profile.data.first_name || "",
          lastName: profile.data.last_name || "",
          dateOfBirth: parseDateOfBirth(profile.data.dateOfBirth || ""),
        });
        return;
      }

      // If profile is not loaded yet, only load from checkout data if it belongs to this user
      // NEVER load guest data (userId === null) for logged-in users
      if (
        checkoutData.userId === currentUserId &&
        (checkoutData.email || checkoutData.firstName)
      ) {
        // This user's own checkout data (from a previous session)
        setFormData({
          email: checkoutData.email || "",
          contactNumber: checkoutData.contactNumber || "",
          firstName: checkoutData.firstName || "",
          lastName: checkoutData.lastName || "",
          dateOfBirth: checkoutData.dateOfBirth || "",
        });
        return;
      }

      // If profile not loaded and no valid checkout data, keep form empty until profile loads
      if (!profile?.data) {
        setFormData({
          email: "",
          contactNumber: "",
          firstName: "",
          lastName: "",
          dateOfBirth: "",
        });
        return;
      }
    }

    // PRIORITY 2: For guests, load from checkout data if available
    if (!isLoggedIn && checkoutData.userId === null) {
      if (checkoutData.email || checkoutData.firstName) {
        setFormData({
          email: checkoutData.email || "",
          contactNumber: checkoutData.contactNumber || "",
          firstName: checkoutData.firstName || "",
          lastName: checkoutData.lastName || "",
          dateOfBirth: checkoutData.dateOfBirth || "",
        });
        return;
      }
    }

    // PRIORITY 3: If no data available, start with empty form
    if (!checkoutData.email && !checkoutData.firstName) {
      setFormData({
        email: "",
        contactNumber: "",
        firstName: "",
        lastName: "",
        dateOfBirth: "",
      });
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
    // The setCheckoutData reducer automatically merges, so we only need to update contact details
    // All existing checkout data (pickup/dropoff addresses, distance, date, time, etc.) will be preserved
    const currentUserId = currentUser?._id || null;

    // Merge contact details with existing checkout data
    // The reducer will merge this with existing state, preserving all pickup/dropoff data
    dispatch(
      setCheckoutData({
        userId: currentUserId,
        email: formData.email,
        contactNumber: formData.contactNumber,
        firstName: formData.firstName,
        lastName: formData.lastName,
        dateOfBirth: formData.dateOfBirth,
        // Explicitly preserve critical fields to ensure they're not lost
        pickupAddress: checkoutData.pickupAddress,
        dropoffAddress: checkoutData.dropoffAddress,
        pickupLocation: checkoutData.pickupLocation,
        dropoffLocation: checkoutData.dropoffLocation,
        selectedDate: checkoutData.selectedDate,
        selectedTime: checkoutData.selectedTime,
        distance: checkoutData.distance,
        duration: checkoutData.duration,
        zipCode: checkoutData.zipCode,
        city: checkoutData.city,
        state: checkoutData.state,
        selectedPharmacyId: checkoutData.selectedPharmacyId,
        isPartnerPharmacy: checkoutData.isPartnerPharmacy,
      })
    );

    setIsAnimating(true);
    setTimeout(() => {
      setCurrentStep(2);
      setIsAnimating(false);
    }, 300);
  };

  const handlePrevious = () => {
    // Reload form data from checkout data when going back
    const currentUserId = currentUser?._id || null;
    if (checkoutData.email || checkoutData.firstName) {
      // For guests: only reload if userId is null
      // For logged-in users: only reload if userId matches currentUserId
      if (
        (!isLoggedIn && checkoutData.userId === null) ||
        (isLoggedIn && currentUserId && checkoutData.userId === currentUserId)
      ) {
        setFormData({
          email: checkoutData.email || "",
          contactNumber: checkoutData.contactNumber || "",
          firstName: checkoutData.firstName || "",
          lastName: checkoutData.lastName || "",
          dateOfBirth: checkoutData.dateOfBirth || "",
        });
      }
    }

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

  // Clear guest checkout data when guest navigates away from checkout-details page
  // This does NOT apply to logged-in users
  useEffect(() => {
    // Cleanup function: Clear guest checkout data when component unmounts (user navigates away)
    return () => {
      // Use refs to get latest values at cleanup time
      const currentCheckoutData = checkoutDataRef.current;
      const currentIsLoggedIn = isLoggedInRef.current;

      // Only clear for guests (not logged in) when component unmounts
      if (!currentIsLoggedIn) {
        if (
          currentCheckoutData.userId === null &&
          (currentCheckoutData.email ||
            currentCheckoutData.firstName ||
            currentCheckoutData.pickupAddress ||
            currentCheckoutData.dropoffAddress)
        ) {
          dispatch(clearCheckoutData());
          // Also manually clear persisted checkout data from localStorage
          if (typeof window !== "undefined") {
            localStorage.removeItem("persist:checkout");
          }
        }
      }
    };
  }, [dispatch]);

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
