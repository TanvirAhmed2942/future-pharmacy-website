"use client";
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon, Loader, Upload, X } from "lucide-react";
import Image from "next/image";
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
} from "@/store/Apis/profileApi/profileApi";
import useShowToast from "@/hooks/useShowToast";
import { useDateOfBirthValidation } from "@/hooks/useDateOfBirthValidation";
import { imgUrl } from "@/lib/img_url";
import { cn } from "@/lib/utils";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";

interface ProfileInfoEditModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function ProfileInfoEditModal({ isOpen, onClose }: ProfileInfoEditModalProps) {
  const { data: profile } = useGetProfileQuery();
  const [updateProfileMutation, { isLoading }] = useUpdateProfileMutation();
  const { showSuccess, showError } = useShowToast();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    gender: "",
    dateOfBirth: "" as string,
    profile: "" as string,
  });
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [profileImagePreview, setProfileImagePreview] = useState<string | null>(
    null
  );
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
  const [dateOfBirthError, setDateOfBirthError] = useState<string | undefined>();
  const { getDateOfBirthError } = useDateOfBirthValidation();

  // Populate form data when profile data loads or modal opens
  useEffect(() => {
    if (profile?.data && isOpen) {
      setFormData({
        firstName: profile.data.first_name || "",
        lastName: profile.data.last_name || "",
        email: profile.data.email || "",
        phone: profile.data.phone || "",
        gender: profile.data.gender || "",
        dateOfBirth: profile.data.dateOfBirth || "",
        profile: profile.data.profile || "",
      });

      // Set profile image preview
      if (profile.data.profile) {
        const imageUrl = imgUrl(profile.data.profile);
        // Only set preview if imgUrl returns a valid non-empty string
        setProfileImagePreview(
          imageUrl && imageUrl.trim() !== "" ? imageUrl : null
        );
      } else {
        setProfileImagePreview(null);
      }
      setProfileImageFile(null);

      // Parse date string to Date object for calendar
      if (profile.data.dateOfBirth) {
        try {
          // Try parsing different date formats
          const dateStr = profile.data.dateOfBirth;
          let parsedDate: Date | undefined;

          // Try DD-MM-YYYY format
          if (dateStr.includes("-")) {
            const parts = dateStr.split("-");
            if (parts.length === 3) {
              parsedDate = new Date(
                parseInt(parts[2]),
                parseInt(parts[1]) - 1,
                parseInt(parts[0])
              );
            }
          } else if (dateStr.includes("/")) {
            // Try DD/MM/YYYY format (backward compatibility)
            const parts = dateStr.split("/");
            if (parts.length === 3) {
              parsedDate = new Date(
                parseInt(parts[2]),
                parseInt(parts[1]) - 1,
                parseInt(parts[0])
              );
            }
          } else {
            // Try ISO format or other standard formats
            parsedDate = new Date(dateStr);
          }

          // Validate date
          if (parsedDate && !isNaN(parsedDate.getTime())) {
            setSelectedDate(parsedDate);
          }
        } catch (error) {
          console.warn("Failed to parse date:", error);
        }
      } else {
        setSelectedDate(undefined);
      }
    } else if (!isOpen) {
      // Reset form when modal closes
      setProfileImagePreview(null);
      setProfileImageFile(null);
      setSelectedDate(undefined);
      setDateOfBirthError(undefined);
    }
  }, [profile?.data, isOpen]);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        showError({ message: "Please select a valid image file" });
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        showError({ message: "Image size should be less than 5MB" });
        return;
      }

      setProfileImageFile(file);

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setProfileImageFile(null);
    setProfileImagePreview(null);
    setFormData((prev) => ({ ...prev, profile: "" }));
  };

  const handleSave = async () => {
    // Validation
    if (!formData.firstName || !formData.lastName) {
      showError({ message: "First name and last name are required" });
      return;
    }

    if (formData.phone.trim() && !isValidPhoneNumber(formData.phone)) {
      showError({ message: "Please enter a valid phone number" });
      return;
    }

    if (formData.dateOfBirth) {
      const dateStr = formData.dateOfBirth;
      let isoStr: string;
      if (dateStr.includes("-") && dateStr.split("-").length === 3) {
        const [day, month, year] = dateStr.split("-");
        isoStr = new Date(
          parseInt(year, 10),
          parseInt(month, 10) - 1,
          parseInt(day, 10)
        ).toISOString();
      } else {
        isoStr = dateStr;
      }
      const dateError = getDateOfBirthError(isoStr);
      if (dateError) {
        setDateOfBirthError(dateError);
        showError({ message: dateError });
        return;
      }
    }
    setDateOfBirthError(undefined);

    try {
      const response = await updateProfileMutation({
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone,
        gender: formData.gender,
        dateOfBirth: formData.dateOfBirth,
        profile: formData.profile,
        profileFile: profileImageFile || undefined,
      }).unwrap();

      if (response.success) {
        showSuccess({
          message: response.message || "Profile updated successfully!",
        });
        onClose();
      } else {
        showError({
          message:
            response.error || response.message || "Failed to update profile",
        });
      }
    } catch (error: unknown) {
      // Handle RTK Query error
      let errorMessage = "An error occurred while updating profile";

      if (error && typeof error === "object") {
        if ("data" in error && error.data && typeof error.data === "object") {
          const data = error.data as { message?: string; error?: string };
          errorMessage = data.message || data.error || errorMessage;
        } else if ("message" in error && typeof error.message === "string") {
          errorMessage = error.message;
        }
      }

      showError({ message: errorMessage });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl bg-white rounded-xl shadow-2xl border-0 p-0">
        <DialogHeader className="p-6 pb-4">
          <DialogTitle className="text-2xl font-bold text-gray-900">
            Edit info
          </DialogTitle>

        </DialogHeader>

        <div className="px-6 pb-6">
          {/* Profile Picture Upload */}
          <div className="space-y-2 mb-6">
            <Label className="text-sm font-medium text-gray-700">
              Profile Picture
            </Label>
            <div className="flex items-center gap-4">
              {/* Profile Image Preview */}
              <div className="relative">
                {profileImagePreview ? (
                  <div className="relative">
                    <Image
                      src={profileImagePreview}
                      alt="Profile preview"
                      width={200}
                      height={200}
                      quality={100}
                      className="w-24 h-24 rounded-full object-cover border-2 border-gray-200"
                      defaultValue={"/testimonials/user_avatar.jpg"}
                      onError={() => setProfileImagePreview("/testimonials/user_avatar.jpg")}
                      unoptimized={true}
                    />
                    {profileImageFile && (
                      <button
                        type="button"
                        onClick={handleRemoveImage}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                        disabled={isLoading}
                      >
                        <X className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                ) : (
                  <div className="w-24 h-24 rounded-full bg-gray-100 border-2 border-gray-200 flex items-center justify-center">
                    <Upload className="h-8 w-8 text-gray-400" />
                  </div>
                )}
              </div>

              {/* Upload Button */}
              <div className="flex-1">
                <input
                  type="file"
                  id="profileImage"
                  accept="image/*"
                  onChange={handleImageChange}
                  disabled={isLoading}
                  className="hidden"
                />
                <Label
                  htmlFor="profileImage"
                  className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Upload className="h-4 w-4" />
                  <span className="text-sm font-medium text-gray-700">
                    {profileImageFile ? "Change Image" : "Upload Image"}
                  </span>
                </Label>
                <p className="text-xs text-gray-500 mt-1">
                  JPG, PNG or GIF. Max size 5MB
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* First Name */}
            <div className="space-y-2">
              <Label
                htmlFor="firstName"
                className="text-sm font-medium text-gray-700"
              >
                First Name
              </Label>
              <Input
                id="firstName"
                value={formData.firstName}
                onChange={(e) => handleInputChange("firstName", e.target.value)}
                disabled={isLoading}
                className="bg-gray-50 border-gray-200 focus:border-peter focus:ring-peter disabled:opacity-50"
              />
            </div>

            {/* Last Name */}
            <div className="space-y-2">
              <Label
                htmlFor="lastName"
                className="text-sm font-medium text-gray-700"
              >
                Last Name
              </Label>
              <Input
                id="lastName"
                value={formData.lastName}
                onChange={(e) => handleInputChange("lastName", e.target.value)}
                disabled={isLoading}
                className="bg-gray-50 border-gray-200 focus:border-peter focus:ring-peter disabled:opacity-50"
              />
            </div>

            {/* Email Address - Read Only */}
            <div className="space-y-2 md:col-span-2">
              <Label
                htmlFor="email"
                className="text-sm font-medium text-gray-700"
              >
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                className="bg-gray-100 border-gray-200 text-gray-500 cursor-not-allowed"
                readOnly
              />
            </div>

            {/* Phone Number */}
            <div className="space-y-2">
              <Label
                htmlFor="phone"
                className="text-sm font-medium text-gray-700"
              >
                Phone Number
              </Label>
              <PhoneInput
                id="phone"
                defaultCountry="US"
                international
                placeholder="Enter phone number"
                value={formData.phone || undefined}
                onChange={(val) => handleInputChange("phone", val ?? "")}
                disabled={isLoading}
                className={cn(
                  "PhoneInput flex h-9 w-full min-w-0 rounded-md border border-gray-200 bg-gray-50 pl-2 pr-0 shadow-xs transition-[color,box-shadow] outline-none focus-within:border-peter focus-within:ring-peter focus-within:ring-[3px] disabled:opacity-50",
                  "[&_.PhoneInputCountry]:bg-transparent [&_.PhoneInputInput]:border-0 [&_.PhoneInputInput]:bg-transparent [&_.PhoneInputInput]:focus-visible:ring-0 [&_.PhoneInputInput]:outline-none"
                )}
                numberInputProps={{
                  className: cn(
                    "flex h-9 w-full min-w-0 flex-1 rounded-r-md border-0 bg-transparent px-3 py-1 text-sm outline-none placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0"
                  ),
                }}
                inputComponent={Input}
              />
            </div>

            {/* Gender */}
            <div className="space-y-2">
              <Label
                htmlFor="gender"
                className="text-sm font-medium text-gray-700"
              >
                Gender
              </Label>
              <Select
                value={formData.gender}
                onValueChange={(value) => handleInputChange("gender", value)}
                disabled={isLoading}
              >
                <SelectTrigger className="bg-gray-50 border-gray-200 focus:border-peter focus:ring-peter h-9 disabled:opacity-50">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Date of Birth */}
            <div className="space-y-2 md:col-span-2">
              <Label
                htmlFor="dateOfBirth"
                className="text-sm font-medium text-gray-700"
              >
                Date of Birth
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    disabled={isLoading}
                    className={`w-full justify-start text-left font-normal bg-gray-50 border-gray-200 hover:bg-gray-50 disabled:opacity-50 ${dateOfBirthError ? "border-red-500" : ""}`}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {selectedDate ? (
                      selectedDate.toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })
                    ) : (
                      <span className="text-muted-foreground">Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={(date) => {
                      setSelectedDate(date);
                      if (date) {
                        // Format as DD-MM-YYYY for API
                        const day = date.getDate().toString().padStart(2, "0");
                        const month = (date.getMonth() + 1)
                          .toString()
                          .padStart(2, "0");
                        const year = date.getFullYear();
                        handleInputChange(
                          "dateOfBirth",
                          `${day}-${month}-${year}`
                        );
                        const dateError = getDateOfBirthError(
                          date.toISOString()
                        );
                        setDateOfBirthError(dateError);
                      } else {
                        handleInputChange("dateOfBirth", "");
                        setDateOfBirthError(undefined);
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
              {dateOfBirthError && (
                <p className="text-red-500 text-xs mt-1">{dateOfBirthError}</p>
              )}
              <p className="text-xs italic text-gray-500 mt-1">
                * Age must be at least 13 years old.
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 mt-6">
            <Button
              variant="outline"
              onClick={onClose}
              disabled={isLoading}
              className="px-6 py-2 text-peter border-peter hover:bg-peter hover:text-peter-dark disabled:opacity-50"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={isLoading}
              className="px-6 py-2 bg-peter hover:bg-peter-dark text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? <><p className="flex items-center justify-center gap-2">Saving...<Loader className="animate-spin size-4 text-white" /></p></> : "Save Changes"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ProfileInfoEditModal;
