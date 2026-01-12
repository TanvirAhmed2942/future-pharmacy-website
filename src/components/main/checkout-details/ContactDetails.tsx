"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTranslations } from "next-intl";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronDownIcon } from "lucide-react";
import Backbutton from "@/components/common/backbutton/backbutton";

// Format date as mm/dd/yyyy
const formatDateDisplay = (dateStr: string): string => {
  if (!dateStr) return "";

  try {
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return "";

    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const year = date.getFullYear();

    return `${month}/${day}/${year}`;
  } catch {
    return "";
  }
};

interface ContactDetailsProps {
  formData: {
    email: string;
    contactNumber: string;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
  };
  onInputChange: (field: string, value: string) => void;
  onNext: () => void;
}

export default function ContactDetails({
  formData,
  onInputChange,
  onNext,
}: ContactDetailsProps) {
  const t = useTranslations("contactDetails");
  const [errors, setErrors] = useState<{
    email?: string;
    contactNumber?: string;
    firstName?: string;
    lastName?: string;
    dateOfBirth?: string;
  }>({});

  const validateForm = (): boolean => {
    const newErrors: typeof errors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email address is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.contactNumber.trim()) {
      newErrors.contactNumber = "Contact number is required";
    }

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (!formData.dateOfBirth.trim()) {
      newErrors.dateOfBirth = "Date of birth is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextClick = () => {
    if (validateForm()) {
      onNext();
    }
  };

  const handleFieldChange = (field: string, value: string) => {
    onInputChange(field, value);
    // Clear error for this field when user starts typing
    if (errors[field as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <div className="p-6 relative min-h-[600px]">
      <div className="flex items-center gap-2 mb-6 relative z-20">
        <Backbutton />
        <h2 className="text-2xl font-bold text-gray-900 ">{t("title")}</h2>
      </div>

      <div className="space-y-4 relative z-20">
        {/* Email Address */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            {t("emailAddress.label")}
          </label>
          <Input
            type="email"
            placeholder={t("emailAddress.placeholder")}
            value={formData.email}
            onChange={(e) => handleFieldChange("email", e.target.value)}
            className={`w-full ${errors.email ? "border-red-500" : ""}`}
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email}</p>
          )}
        </div>

        {/* Contact Number */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            {t("contactNumber.label")}
          </label>
          <Input
            type="tel"
            placeholder={t("contactNumber.placeholder")}
            value={formData.contactNumber}
            onChange={(e) => handleFieldChange("contactNumber", e.target.value)}
            className={`w-full ${errors.contactNumber ? "border-red-500" : ""}`}
          />
          {errors.contactNumber && (
            <p className="text-red-500 text-xs mt-1">{errors.contactNumber}</p>
          )}
        </div>

        {/* Legal Name */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            {t("legalName.label")}
          </label>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Input
                type="text"
                placeholder={t("legalName.firstNamePlaceholder")}
                value={formData.firstName}
                onChange={(e) => handleFieldChange("firstName", e.target.value)}
                className={errors.firstName ? "border-red-500" : ""}
              />
              {errors.firstName && (
                <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>
              )}
            </div>
            <div>
              <Input
                type="text"
                placeholder={t("legalName.lastNamePlaceholder")}
                value={formData.lastName}
                onChange={(e) => handleFieldChange("lastName", e.target.value)}
                className={errors.lastName ? "border-red-500" : ""}
              />
              {errors.lastName && (
                <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
              )}
            </div>
          </div>
        </div>

        {/* Date of Birth */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            {t("dateOfBirth.label")}
          </label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={`w-full justify-between text-left font-normal ${
                  errors.dateOfBirth ? "border-red-500" : ""
                }`}
              >
                {formData.dateOfBirth &&
                formatDateDisplay(formData.dateOfBirth) ? (
                  formatDateDisplay(formData.dateOfBirth)
                ) : (
                  <span className="text-muted-foreground">
                    {t("dateOfBirth.placeholder")}
                  </span>
                )}
                <ChevronDownIcon className="ml-auto h-4 w-4 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={
                  formData.dateOfBirth
                    ? new Date(formData.dateOfBirth)
                    : undefined
                }
                defaultMonth={new Date()} // Start at current month
                onSelect={(date) => {
                  // Prevent future dates - compare dates without time
                  if (date) {
                    const today = new Date();
                    today.setHours(23, 59, 59, 999); // End of today
                    const selectedDate = new Date(date);
                    selectedDate.setHours(0, 0, 0, 0);

                    // Only allow dates that are today or in the past
                    if (selectedDate <= today) {
                      handleFieldChange("dateOfBirth", date.toISOString());
                    }
                  }
                }}
                captionLayout="dropdown"
                fromYear={1900}
                toYear={new Date().getFullYear()}
                toDate={new Date()} // Set maximum date to today - prevents navigation to future dates
                disabled={(date) => {
                  // Disable future dates (dates after today)
                  const today = new Date();
                  today.setHours(23, 59, 59, 999); // End of today
                  const checkDate = new Date(date);
                  checkDate.setHours(0, 0, 0, 0);
                  return checkDate > today;
                }}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          {errors.dateOfBirth && (
            <p className="text-red-500 text-xs mt-1">{errors.dateOfBirth}</p>
          )}
        </div>

        {/* Instructional Text */}
        <p className="text-sm text-gray-600">
          {t("instructionalText.text")}{" "}
          {/* <button className="text-peter hover:underline">
            {t("instructionalText.addPreferredName")}
          </button> */}
        </p>

        {/* Terms and Conditions */}
        <p className="text-sm text-gray-600">
          {t("termsAndConditions.text")}{" "}
          <button className="text-peter hover:underline">
            {t("termsAndConditions.termsOfService")}
          </button>
          ,{" "}
          {/* <button className="text-peter hover:underline">
            {t("termsAndConditions.paymentsTermsOfService")}
          </button>{" "} */}
          {/* {t("termsAndConditions.and")}{" "} */}
          {/* <button className="text-peter hover:underline">
            {t("termsAndConditions.nondiscriminationPolicy")}
          </button> */}
          {t("termsAndConditions.acknowledge")}{" "}
          <button className="text-peter hover:underline">
            {t("termsAndConditions.privacyPolicy")}
          </button>
          .
        </p>

        {/* Agree and Continue Button */}
        <Button
          onClick={handleNextClick}
          className="w-full bg-peter hover:bg-peter-dark text-white py-3 rounded-lg font-semibold"
        >
          {t("agreeAndContinue")}
        </Button>
      </div>

      {/* Watermark */}
      <div className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none z-0">
        <Image
          src="/watermark.webp"
          alt="watermark"
          width={1000}
          height={1000}
          className="object-contain w-60 h-60 -rotate-45 opacity-100"
        />
      </div>
    </div>
  );
}
