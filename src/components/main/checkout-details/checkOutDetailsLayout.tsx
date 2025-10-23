"use client";
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import ContactDetails from "./ContactDetails";
import OrderSummary from "./OrderSummary";

export default function CheckOutDetailsLayout() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    contactNumber: "",
    firstName: "",
    lastName: "",
    dateOfBirth: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
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

  const handleClose = () => {
    // Reset form and navigate back
    setCurrentStep(1);
    setFormData({
      email: "",
      contactNumber: "",
      firstName: "",
      lastName: "",
      dateOfBirth: "",
    });
    // You can add navigation logic here to go back to previous page
    // For example: router.back() or router.push('/')
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
