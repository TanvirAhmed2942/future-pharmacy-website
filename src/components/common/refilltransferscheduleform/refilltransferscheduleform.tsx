"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface RefillTransferScheduleFormProps {
  isOpen: boolean;
  onClose: () => void;
  onNext: (data: FormData) => void;
}

interface FormData {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  countryCode: string;
  dateOfBirth: string;
}

const countryCodes = [
  { code: "+1", country: "US" },
  { code: "+44", country: "UK" },
  { code: "+353", country: "IE" },
  { code: "+49", country: "DE" },
  { code: "+33", country: "FR" },
  { code: "+39", country: "IT" },
  { code: "+34", country: "ES" },
  { code: "+31", country: "NL" },
  { code: "+32", country: "BE" },
  { code: "+41", country: "CH" },
];

function RefillTransferScheduleForm({
  isOpen,
  onClose,
  onNext,
}: RefillTransferScheduleFormProps) {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    countryCode: "+353",
    dateOfBirth: "",
  });

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleNext = () => {
    onNext(formData);
  };

  const formatDateOfBirth = (value: string) => {
    // Remove all non-digits
    const digits = value.replace(/\D/g, "");

    // Format as dd/mm/yyyy
    if (digits.length <= 2) {
      return digits;
    } else if (digits.length <= 4) {
      return `${digits.slice(0, 2)}/${digits.slice(2)}`;
    } else {
      return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(
        4,
        8
      )}`;
    }
  };

  const handleDateOfBirthChange = (value: string) => {
    const formatted = formatDateOfBirth(value);
    setFormData((prev) => ({
      ...prev,
      dateOfBirth: formatted,
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl bg-white rounded-xl shadow-2xl border-0 p-0">
        <DialogHeader className="p-6 pb-4">
          <DialogTitle className="text-xl font-bold text-gray-900 text-center">
            Personal Information
          </DialogTitle>
        </DialogHeader>

        <div className="px-6 pb-6">
          <div className="grid grid-cols-2 gap-4 mb-4">
            {/* First Name */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-900">
                First Name
              </label>
              <Input
                type="text"
                placeholder="Enter your first name here..."
                value={formData.firstName}
                onChange={(e) => handleInputChange("firstName", e.target.value)}
                className="h-12 bg-gray-50 border-gray-200 focus:border-purple-500 focus:ring-purple-500/20"
              />
            </div>

            {/* Last Name */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-900">
                Last Name
              </label>
              <Input
                type="text"
                placeholder="Enter your last name here..."
                value={formData.lastName}
                onChange={(e) => handleInputChange("lastName", e.target.value)}
                className="h-12 bg-gray-50 border-gray-200 focus:border-purple-500 focus:ring-purple-500/20"
              />
            </div>
          </div>

          {/* Phone Number */}
          <div className="space-y-2 mb-4">
            <label className="text-sm font-semibold text-gray-900">
              Phone Number
            </label>
            <div className="flex">
              <Select
                value={formData.countryCode}
                onValueChange={(value) =>
                  handleInputChange("countryCode", value)
                }
              >
                <SelectTrigger className="w-24 h-12 bg-gray-50 border-gray-200 rounded-r-none border-r-0 focus:border-purple-500 focus:ring-purple-500/20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {countryCodes.map((country) => (
                    <SelectItem key={country.code} value={country.code}>
                      {country.code}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input
                type="tel"
                placeholder="Phone Number"
                value={formData.phoneNumber}
                onChange={(e) =>
                  handleInputChange("phoneNumber", e.target.value)
                }
                className="h-12 bg-gray-50 border-gray-200 rounded-l-none border-l-0 focus:border-peter focus:ring-peter/20"
              />
            </div>
          </div>

          {/* Date of Birth */}
          <div className="space-y-2 mb-6">
            <label className="text-sm font-semibold text-gray-900">
              Date of Birth
            </label>
            <Input
              type="text"
              placeholder="dd/mm/yyyy"
              value={formData.dateOfBirth}
              onChange={(e) => handleDateOfBirthChange(e.target.value)}
              maxLength={10}
              className="h-12 bg-gray-50 border-gray-200 focus:border-peter focus:ring-peter/20"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 justify-end">
            <Button
              onClick={onClose}
              variant="outline"
              className="px-6 py-2 bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
            >
              Cancel
            </Button>
            <Button
              onClick={handleNext}
              className="px-6 py-2 bg-peter text-white hover:bg-peter-dark"
            >
              Next
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default RefillTransferScheduleForm;
