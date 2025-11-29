"use client";
import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronDownIcon } from "lucide-react";
import Backbutton from "@/components/common/backbutton/backbutton";

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
  return (
    <div className="p-6 relative min-h-[600px]">
      <div className="flex items-center gap-2 mb-6 relative z-20">
        <Backbutton />
        <h2 className="text-2xl font-bold text-gray-900 ">Contact Details</h2>
      </div>

      <div className="space-y-4 relative z-20">
        {/* Email Address */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            E-mail Address
          </label>
          <Input
            type="email"
            placeholder="We'll email you trip confirmation and receipts."
            value={formData.email}
            onChange={(e) => onInputChange("email", e.target.value)}
            className="w-full"
          />
        </div>

        {/* Contact Number */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            Contact Number
          </label>
          <Input
            type="tel"
            placeholder="We'll contact you with delivery status."
            value={formData.contactNumber}
            onChange={(e) => onInputChange("contactNumber", e.target.value)}
            className="w-full"
          />
        </div>

        {/* Legal Name */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            Legal Name
          </label>
          <div className="grid grid-cols-2 gap-3">
            <Input
              type="text"
              placeholder="First name on ID"
              value={formData.firstName}
              onChange={(e) => onInputChange("firstName", e.target.value)}
            />
            <Input
              type="text"
              placeholder="Last name on ID"
              value={formData.lastName}
              onChange={(e) => onInputChange("lastName", e.target.value)}
            />
          </div>
        </div>

        {/* Date of Birth */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            Date of Birth
          </label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-between text-left font-normal"
              >
                {formData.dateOfBirth ? (
                  `${(new Date(formData.dateOfBirth).getMonth() + 1)
                    .toString()
                    .padStart(2, "0")}/${new Date(formData.dateOfBirth)
                    .getDate()
                    .toString()
                    .padStart(2, "0")}/${new Date(
                    formData.dateOfBirth
                  ).getFullYear()}`
                ) : (
                  <span className="text-muted-foreground">
                    Select date (MM/DD/YYYY)
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
                onSelect={(date) => {
                  // Prevent future dates
                  if (date && date <= new Date()) {
                    onInputChange(
                      "dateOfBirth",
                      date ? date.toISOString() : ""
                    );
                  }
                }}
                captionLayout="dropdown"
                fromYear={1900}
                toYear={new Date().getFullYear()}
                disabled={(date) => date > new Date()}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Instructional Text */}
        <p className="text-sm text-gray-600">
          To sign up, you need to be name on your government ID. If you go by
          another name, you can{" "}
          <button className="text-peter hover:underline">
            add a preferred first name
          </button>
          .
        </p>

        {/* Terms and Conditions */}
        <p className="text-sm text-gray-600">
          By selecting agree and continue, I agree to Optimums health Solutions{" "}
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

        {/* Agree and Continue Button */}
        <Button
          onClick={onNext}
          className="w-full bg-peter hover:bg-peter-dark text-white py-3 rounded-lg font-semibold"
        >
          Agree and Continue
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
