"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronDownIcon } from "lucide-react";
import { cn } from "@/lib/utils";

import React, { useEffect, useState } from "react";
import {
  useForm,
  useFieldArray,
  Controller,
  SubmitHandler,
} from "react-hook-form";
import { useTranslations } from "next-intl";
import Backbutton from "@/components/common/backbutton/backbutton";
import useIcon from "@/hooks/useIcon";
import Image from "next/image";
import {
  useCreateTransferRequestMutation,
  type TransferRequest,
} from "@/store/Apis/refillTransferScheduleApi/refillTransferScheduleApi";
import useShowToast from "@/hooks/useShowToast";
import { useAppSelector } from "@/store/hooks";
import {
  selectIsLoggedIn,
  selectUser,
} from "@/store/slices/userSlice/userSlice";
import { useGetProfileQuery } from "@/store/Apis/profileApi/profileApi";

type MedicationInput = {
  id: number;
  name: string;
  rxNumber: string;
};

type FormValues = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  dateOfBirth: Date | undefined; // Renamed from date to dateOfBirth for clarity

  // Previous pharmacy details
  previousPharmacyName: string;
  previousPharmacyPhone: string;
  previousPharmacyAddress: string;
  previousPharmacyCity: string;
  previousPharmacyState: string;
  previousPharmacyZipCode: string;

  // New pharmacy details
  newPharmacyName: string;
  newPharmacyPhone: string;
  newPharmacyAddress: string;
  newPharmacyCity: string;
  newPharmacyState: string;
  newPharmacyZipCode: string;

  medications: MedicationInput[];
  transferAll: boolean;
  notes: string;
  consent: boolean;
};

// Parse date from "dd-mm-yyyy" or ISO format to Date object
const parseDateOfBirth = (dateStr: string | undefined): Date | undefined => {
  if (!dateStr) return undefined;

  try {
    // Try parsing as ISO date first
    const isoDate = new Date(dateStr);
    if (!isNaN(isoDate.getTime())) {
      return isoDate;
    }

    // Try parsing "dd-mm-yyyy" format
    if (dateStr.includes("-") && !dateStr.includes("T")) {
      const parts = dateStr.split("-");
      if (parts.length === 3) {
        const [day, month, year] = parts;
        const date = new Date(
          parseInt(year),
          parseInt(month) - 1,
          parseInt(day)
        );
        if (!isNaN(date.getTime())) {
          return date;
        }
      }
    }
  } catch {
    // Return undefined if parsing fails
  }

  return undefined;
};

function TransferOnline() {
  const t = useTranslations("transferOnline");
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const currentUser = useAppSelector(selectUser);
  const { data: profile, refetch: refetchProfile } = useGetProfileQuery(
    undefined,
    {
      skip: !isLoggedIn, // Skip query if not logged in
    }
  );
  const {
    register,
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      firstName: "",
      lastName: "",
      phoneNumber: "",
      dateOfBirth: undefined,
      previousPharmacyName: "",
      previousPharmacyPhone: "",
      previousPharmacyAddress: "",
      previousPharmacyCity: "",
      previousPharmacyState: "",
      previousPharmacyZipCode: "",
      newPharmacyName: "",
      newPharmacyPhone: "",
      newPharmacyAddress: "",
      newPharmacyCity: "",
      newPharmacyState: "",
      newPharmacyZipCode: "",
      medications: [{ id: 1, name: "", rxNumber: "" }],
      transferAll: false,
      notes: "",
      consent: false,
    },
  });

  const [createTransferRequest, { isLoading }] =
    useCreateTransferRequestMutation();
  const { showSuccess, showError } = useShowToast();
  const { fields, append } = useFieldArray({
    control,
    name: "medications",
  });

  // Track previous user ID to detect user changes
  const [previousUserId, setPreviousUserId] = useState<string | null>(null);

  // Clear form and refetch profile when user changes
  useEffect(() => {
    const currentUserId = currentUser?._id || null;

    // If user ID changed, clear personal info immediately and refetch profile
    if (isLoggedIn && currentUserId && currentUserId !== previousUserId) {
      // Clear personal info immediately to avoid showing old data
      setValue("firstName", "");
      setValue("lastName", "");
      setValue("phoneNumber", "");
      setValue("dateOfBirth", undefined);
      // Update previous user ID
      setPreviousUserId(currentUserId);
      // Force refetch to get fresh data for the new user
      refetchProfile();
    } else if (!isLoggedIn) {
      // Reset previous user ID on logout
      setPreviousUserId(null);
      // Clear personal info if user logs out (for guests)
      setValue("firstName", "");
      setValue("lastName", "");
      setValue("phoneNumber", "");
      setValue("dateOfBirth", undefined);
    } else if (isLoggedIn && currentUserId && !previousUserId) {
      // First time user logs in, set previous user ID
      setPreviousUserId(currentUserId);
    }
  }, [isLoggedIn, currentUser?._id, previousUserId, refetchProfile, setValue]);

  // Pre-populate personal information if user is logged in
  useEffect(() => {
    if (isLoggedIn && profile?.data) {
      // Populate personal information fields from profile
      if (profile.data.first_name) {
        setValue("firstName", profile.data.first_name);
      }
      if (profile.data.last_name) {
        setValue("lastName", profile.data.last_name);
      }
      if (profile.data.phone) {
        setValue("phoneNumber", profile.data.phone);
      }

      // Parse and set date of birth
      const dob = parseDateOfBirth(profile.data.dateOfBirth);
      if (dob) {
        setValue("dateOfBirth", dob);
      }
    }
  }, [isLoggedIn, profile?.data, setValue]);

  const addMedication = () => {
    const newId =
      fields.length > 0 ? Math.max(...fields.map((m) => m.id)) + 1 : 1;
    append({ id: newId, name: "", rxNumber: "" });
  };

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      // Validate consent
      if (!data.consent) {
        showError({
          message:
            t("consent.required") ||
            "You must consent to transfer your prescriptions",
        });
        return;
      }

      // Filter and validate medications
      const validMedications = data.medications.filter(
        (med) => med.name.trim() !== "" || med.rxNumber.trim() !== ""
      );

      // Ensure at least one medication is provided
      if (validMedications.length === 0) {
        showError({
          message:
            "Please add at least one medication to your transfer request.",
        });
        return;
      }

      // Format date of birth to YYYY-MM-DD
      const formattedDateOfBirth = data.dateOfBirth
        ? `${data.dateOfBirth.getFullYear()}-${String(
            data.dateOfBirth.getMonth() + 1
          ).padStart(2, "0")}-${String(data.dateOfBirth.getDate()).padStart(
            2,
            "0"
          )}`
        : "";

      // Transform form data to API format
      const transferRequest: TransferRequest = {
        requiestType: "transfer", // Note: keeping typo as per API requirement
        personalInfo: {
          first_name: data.firstName,
          last_name: data.lastName,
          phone: data.phoneNumber,
          dateOfBirth: formattedDateOfBirth,
        },
        pharmacyInfo: {
          // Previous pharmacy fields
          name: data.previousPharmacyName || undefined,
          phone: data.previousPharmacyPhone || undefined,
          city: data.previousPharmacyCity || undefined,
          state: data.previousPharmacyState || undefined,
          zipCode: data.previousPharmacyZipCode || undefined,
          // New pharmacy fields
          newPharmacyName: data.newPharmacyName || undefined,
          newPharmacyPhone: data.newPharmacyPhone || undefined,
          newPharmacyAddress: data.newPharmacyAddress || undefined,
          newPharmacyCity: data.newPharmacyCity || undefined,
          newPharmacyState: data.newPharmacyState || undefined,
          newPharmacyZipCode: data.newPharmacyZipCode || undefined,
        },
        medicationList: validMedications.map((med) => ({
          medicationName: med.name,
          rxNumber: med.rxNumber,
        })),
        additionalNotes: data.notes || undefined,
      };

      const response = await createTransferRequest(transferRequest).unwrap();

      if (response.success) {
        showSuccess({
          message:
            response.message || "Transfer request submitted successfully!",
        });
        // Reset form to initial state
        reset({
          firstName: "",
          lastName: "",
          phoneNumber: "",
          dateOfBirth: undefined,
          previousPharmacyName: "",
          previousPharmacyPhone: "",
          previousPharmacyAddress: "",
          previousPharmacyCity: "",
          previousPharmacyState: "",
          previousPharmacyZipCode: "",
          newPharmacyName: "",
          newPharmacyPhone: "",
          newPharmacyAddress: "",
          newPharmacyCity: "",
          newPharmacyState: "",
          newPharmacyZipCode: "",
          medications: [{ id: 1, name: "", rxNumber: "" }],
          transferAll: false,
          notes: "",
          consent: false,
        });
      } else {
        showError({
          message:
            response.error ||
            response.message ||
            "Failed to submit transfer request",
        });
      }
    } catch (error: unknown) {
      // Handle RTK Query error
      let errorMessage =
        "An error occurred while submitting the transfer request";

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
    <div className=" relative container mx-auto bg-white  mb-6">
      <div className="max-w-3xl mx-auto">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6 md:space-y-8 px-4"
        >
          <div className="flex  items-center justify-center mt-2 mb-4 lg:-mt-8 lg:mb-8 ">
            <Backbutton />
            <h2 className="text-2xl lg:text-3xl font-bold text-center text-peter font-inter mx-auto">
              {t("pageTitle")}
            </h2>
          </div>

          {/* Personal Information Section */}
          <div className="bg-white rounded-lg border p-6 shadow-sm">
            <h3 className="text-lg font-medium text-peter mb-4">
              {t("personalInformation.title")}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <Label
                  htmlFor="firstName"
                  className="text-sm font-medium text-gray-700"
                >
                  {t("personalInformation.firstName")} *
                </Label>
                <Input
                  type="text"
                  id="firstName"
                  {...register("firstName", {
                    required: t("personalInformation.firstNameRequired"),
                  })}
                  placeholder={t("personalInformation.firstNamePlaceholder")}
                  className={cn(
                    "w-full mt-1",
                    errors.firstName && "border-red-500"
                  )}
                />
                {errors.firstName && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.firstName.message}
                  </p>
                )}
              </div>
              <div>
                <Label
                  htmlFor="lastName"
                  className="text-sm font-medium text-gray-700"
                >
                  {t("personalInformation.lastName")} *
                </Label>
                <Input
                  type="text"
                  id="lastName"
                  {...register("lastName", {
                    required: t("personalInformation.lastNameRequired"),
                  })}
                  placeholder={t("personalInformation.lastNamePlaceholder")}
                  className={cn(
                    "w-full mt-1",
                    errors.lastName && "border-red-500"
                  )}
                />
                {errors.lastName && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.lastName.message}
                  </p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label
                  htmlFor="phoneNumber"
                  className="text-sm font-medium text-gray-700"
                >
                  {t("personalInformation.phoneNumber")} *
                </Label>
                <Input
                  type="tel"
                  id="phoneNumber"
                  {...register("phoneNumber", {
                    required: t("personalInformation.phoneNumberRequired"),
                    validate: (value) => {
                      // Check if the value contains at least one digit
                      if (!/\d/.test(value)) {
                        return (
                          t("personalInformation.phoneNumberInvalid") ||
                          "Phone number must contain numbers"
                        );
                      }
                      return true;
                    },
                  })}
                  placeholder={t("personalInformation.phoneNumberPlaceholder")}
                  className={cn(
                    "w-full mt-1",
                    errors.phoneNumber && "border-red-500"
                  )}
                />
                {errors.phoneNumber && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.phoneNumber.message}
                  </p>
                )}
              </div>
              <div>
                <Label
                  htmlFor="dateOfBirth"
                  className="text-sm font-medium text-gray-700"
                >
                  {t("personalInformation.dateOfBirth")} *
                </Label>
                <Controller
                  control={control}
                  name="dateOfBirth"
                  rules={{
                    required: t("personalInformation.dateOfBirthRequired"),
                  }}
                  render={({ field }) => (
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          id="dateOfBirth"
                          variant={"outline"}
                          className={cn(
                            "w-full mt-1 justify-between font-normal",
                            !field.value && "text-muted-foreground",
                            errors.dateOfBirth && "border-red-500"
                          )}
                        >
                          {field.value ? (
                            // Format the date as MM/DD/YYYY
                            `${(field.value.getMonth() + 1)
                              .toString()
                              .padStart(2, "0")}/${field.value
                              .getDate()
                              .toString()
                              .padStart(2, "0")}/${field.value.getFullYear()}`
                          ) : (
                            <span>
                              {t("personalInformation.dateOfBirthPlaceholder")}
                            </span>
                          )}
                          <ChevronDownIcon className="h-4 w-4 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={(date) => {
                            // Prevent future dates
                            if (date && date <= new Date()) {
                              field.onChange(date);
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
                  )}
                />
                {errors.dateOfBirth && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.dateOfBirth.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Previous Pharmacy Information Section */}
          <div className="bg-white rounded-lg border p-6 shadow-sm">
            <h3 className="text-lg font-medium text-peter mb-4">
              {t("pharmacyInformation.title")}
            </h3>

            <h4 className="text-md font-medium text-peter mb-2">
              {t("pharmacyInformation.previousPharmacy.title")}
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <Label
                  htmlFor="previousPharmacyName"
                  className="text-sm font-medium text-gray-700"
                >
                  {t("pharmacyInformation.previousPharmacy.pharmacyName")} *
                </Label>
                <Input
                  type="text"
                  id="previousPharmacyName"
                  {...register("previousPharmacyName", {
                    required: t(
                      "pharmacyInformation.previousPharmacy.pharmacyNameRequired"
                    ),
                  })}
                  placeholder={t(
                    "pharmacyInformation.previousPharmacy.pharmacyNamePlaceholder"
                  )}
                  className={cn(
                    "w-full mt-1",
                    errors.previousPharmacyName && "border-red-500"
                  )}
                />
                {errors.previousPharmacyName && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.previousPharmacyName.message}
                  </p>
                )}
              </div>
              <div>
                <Label
                  htmlFor="previousPharmacyPhone"
                  className="text-sm font-medium text-gray-700"
                >
                  {t("pharmacyInformation.previousPharmacy.pharmacyPhone")}
                </Label>
                <Input
                  type="tel"
                  id="previousPharmacyPhone"
                  {...register("previousPharmacyPhone", {
                    validate: (value) => {
                      // Only validate if value is provided, and check if it contains at least one digit
                      if (value && value.trim() !== "" && !/\d/.test(value)) {
                        return (
                          t(
                            "pharmacyInformation.previousPharmacy.pharmacyPhoneInvalid"
                          ) || "Phone number must contain numbers"
                        );
                      }
                      return true;
                    },
                  })}
                  placeholder={t(
                    "pharmacyInformation.previousPharmacy.pharmacyPhonePlaceholder"
                  )}
                  className={cn(
                    "w-full mt-1",
                    errors.previousPharmacyPhone && "border-red-500"
                  )}
                />
                {errors.previousPharmacyPhone && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.previousPharmacyPhone.message}
                  </p>
                )}
              </div>
            </div>
            <div className="mb-4">
              <Label
                htmlFor="previousPharmacyAddress"
                className="text-sm font-medium text-gray-700"
              >
                {t("pharmacyInformation.previousPharmacy.pharmacyAddress")}
              </Label>
              <Input
                type="text"
                id="previousPharmacyAddress"
                {...register("previousPharmacyAddress")}
                placeholder={t(
                  "pharmacyInformation.previousPharmacy.pharmacyAddressPlaceholder"
                )}
                className="w-full mt-1"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div>
                <Label
                  htmlFor="previousPharmacyCity"
                  className="text-sm font-medium text-gray-700"
                >
                  {t("pharmacyInformation.previousPharmacy.city")}
                </Label>
                <Input
                  type="text"
                  id="previousPharmacyCity"
                  {...register("previousPharmacyCity", {
                    required: false,
                  })}
                  placeholder={t(
                    "pharmacyInformation.previousPharmacy.cityPlaceholder"
                  )}
                  className="w-full mt-1"
                />
              </div>
              <div>
                <Label
                  htmlFor="previousPharmacyState"
                  className="text-sm font-medium text-gray-700"
                >
                  {t("pharmacyInformation.previousPharmacy.state")}
                </Label>
                <Input
                  type="text"
                  id="previousPharmacyState"
                  {...register("previousPharmacyState", {
                    required: false,
                  })}
                  placeholder={t(
                    "pharmacyInformation.previousPharmacy.statePlaceholder"
                  )}
                  className="w-full mt-1"
                />
              </div>
              <div>
                <Label
                  htmlFor="previousPharmacyZipCode"
                  className="text-sm font-medium text-gray-700"
                >
                  {t("pharmacyInformation.previousPharmacy.zipCode")}
                </Label>
                <Input
                  type="text"
                  id="previousPharmacyZipCode"
                  {...register("previousPharmacyZipCode", {
                    required: false,
                  })}
                  placeholder={t(
                    "pharmacyInformation.previousPharmacy.zipCodePlaceholder"
                  )}
                  className="w-full mt-1"
                />
              </div>
            </div>

            {/* New Pharmacy Information */}
            <h4 className="text-md font-medium text-peter mb-2">
              {t("pharmacyInformation.newPharmacy.title")}
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <Label
                  htmlFor="newPharmacyName"
                  className="text-sm font-medium text-gray-700"
                >
                  {t("pharmacyInformation.newPharmacy.pharmacyName")}
                </Label>
                <Input
                  type="text"
                  id="newPharmacyName"
                  {...register("newPharmacyName")}
                  placeholder={t(
                    "pharmacyInformation.newPharmacy.pharmacyNamePlaceholder"
                  )}
                  className="w-full mt-1"
                />
              </div>
              <div>
                <Label
                  htmlFor="newPharmacyPhone"
                  className="text-sm font-medium text-gray-700"
                >
                  {t("pharmacyInformation.newPharmacy.pharmacyPhone")}
                </Label>
                <Input
                  type="tel"
                  id="newPharmacyPhone"
                  {...register("newPharmacyPhone", {
                    validate: (value) => {
                      // Only validate if value is provided, and check if it contains at least one digit
                      if (value && value.trim() !== "" && !/\d/.test(value)) {
                        return (
                          t(
                            "pharmacyInformation.newPharmacy.pharmacyPhoneInvalid"
                          ) || "Phone number must contain numbers"
                        );
                      }
                      return true;
                    },
                  })}
                  placeholder={t(
                    "pharmacyInformation.newPharmacy.pharmacyPhonePlaceholder"
                  )}
                  className={cn(
                    "w-full mt-1",
                    errors.newPharmacyPhone && "border-red-500"
                  )}
                />
                {errors.newPharmacyPhone && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.newPharmacyPhone.message}
                  </p>
                )}
              </div>
            </div>
            <div>
              <Label
                htmlFor="newPharmacyAddress"
                className="text-sm font-medium text-gray-700"
              >
                {t("pharmacyInformation.newPharmacy.pharmacyAddress")}
              </Label>
              <Input
                type="text"
                id="newPharmacyAddress"
                {...register("newPharmacyAddress")}
                placeholder={t(
                  "pharmacyInformation.newPharmacy.pharmacyAddressPlaceholder"
                )}
                className="w-full mt-1"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div>
                <Label
                  htmlFor="newPharmacyCity"
                  className="text-sm font-medium text-gray-700"
                >
                  {t("pharmacyInformation.newPharmacy.city")}
                </Label>
                <Input
                  type="text"
                  id="newPharmacyCity"
                  {...register("newPharmacyCity", {
                    required: false,
                  })}
                  placeholder={t(
                    "pharmacyInformation.newPharmacy.cityPlaceholder"
                  )}
                  className="w-full mt-1"
                />
              </div>
              <div>
                <Label
                  htmlFor="newPharmacyState"
                  className="text-sm font-medium text-gray-700"
                >
                  {t("pharmacyInformation.newPharmacy.state")}
                </Label>
                <Input
                  type="text"
                  id="newPharmacyState"
                  {...register("newPharmacyState", {
                    required: false,
                  })}
                  placeholder={t(
                    "pharmacyInformation.newPharmacy.statePlaceholder"
                  )}
                  className="w-full mt-1"
                />
              </div>
              <div>
                <Label
                  htmlFor="newPharmacyZipCode"
                  className="text-sm font-medium text-gray-700"
                >
                  {t("pharmacyInformation.newPharmacy.zipCode")}
                </Label>
                <Input
                  type="text"
                  id="newPharmacyZipCode"
                  {...register("newPharmacyZipCode", {
                    required: false,
                  })}
                  placeholder={t(
                    "pharmacyInformation.newPharmacy.zipCodePlaceholder"
                  )}
                  className="w-full mt-1"
                />
              </div>
            </div>
          </div>

          {/* Prescriptions Section */}
          <div className="bg-white rounded-lg border p-6 shadow-sm">
            <div className="flex items-center ">
              {useIcon({ name: "medication" })}
              <h3 className="text-lg font-medium text-peter ml-2">
                {t("prescriptions.title")}
              </h3>
            </div>
            <div className="mb-4 text-sm text-gray-600">
              <p className="text-xs text-gray-600 italic">
                {t("prescriptions.instruction")}
              </p>
            </div>

            <div className="mb-4 flex items-center">
              <Controller
                control={control}
                name="transferAll"
                render={({ field }) => (
                  <Checkbox
                    id="transferAll"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                )}
              />
              <label
                htmlFor="transferAll"
                className="ml-2 text-sm text-gray-700"
              >
                {t("prescriptions.transferAll")}
              </label>
            </div>

            {fields.map((field, index) => (
              <div
                key={field.id}
                className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4"
              >
                <div>
                  <Label
                    htmlFor={`medications.${index}.name`}
                    className="text-sm font-medium text-gray-700"
                  >
                    {t("prescriptions.medicationName")}
                  </Label>
                  <Input
                    type="text"
                    id={`medications.${index}.name`}
                    {...register(`medications.${index}.name` as const)}
                    placeholder={t("prescriptions.medicationNamePlaceholder")}
                    className="w-full mt-1"
                  />
                </div>
                <div>
                  <Label
                    htmlFor={`medications.${index}.rxNumber`}
                    className="text-sm font-medium text-gray-700"
                  >
                    {t("prescriptions.rxNumber")}
                  </Label>
                  <Input
                    type="text"
                    id={`medications.${index}.rxNumber`}
                    {...register(`medications.${index}.rxNumber` as const)}
                    placeholder={t("prescriptions.rxNumberPlaceholder")}
                    className="w-full mt-1"
                  />
                </div>
              </div>
            ))}

            <Button
              type="button"
              onClick={addMedication}
              variant="outline"
              className="border-peter text-peter hover:bg-peter/10"
            >
              {t("prescriptions.addAnother")}
            </Button>
          </div>

          {/* Additional Information Section */}
          <div className="bg-white rounded-lg border p-6 shadow-sm">
            <h3 className="text-lg font-medium text-peter mb-4">
              {t("additionalInformation.title")}
            </h3>

            <Label
              htmlFor="notes"
              className="text-sm font-medium text-gray-700 block mb-2"
            >
              {t("additionalInformation.notesLabel")}
            </Label>
            <Textarea
              id="notes"
              {...register("notes")}
              placeholder={t("additionalInformation.notesPlaceholder")}
              className="w-full h-24"
            />
          </div>

          {/* Consent Section */}
          <div className="bg-[#f3ecf3] rounded-lg border border-[#d2b5d2] p-6">
            <div className="flex items-start ">
              <Controller
                control={control}
                name="consent"
                rules={{
                  required: t("consent.required"),
                }}
                render={({ field }) => (
                  <Checkbox
                    id="consent"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className={
                      errors.consent
                        ? "border-red-500 mt-0.5"
                        : "border-[#d2b5d2] mt-0.5"
                    }
                  />
                )}
              />
              <label htmlFor="consent" className="ml-2 text-xs text-gray-700">
                {t("consent.label")}
              </label>
            </div>
            {errors.consent && (
              <p className="text-red-500 text-xs mt-1 ml-6">
                {errors.consent.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-peter hover:bg-peter-dark text-white py-3 rounded-md font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? t("submitting") : t("submitButton")}
          </Button>
        </form>
      </div>
      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center pointer-events-none">
        <Image
          src="/watermark.webp"
          alt="Transfer Online"
          width={1000}
          height={1000}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-contain opacity-30 w-full xl:w-[85%] 2xl:w-[95%] h-full"
        />
      </div>
    </div>
  );
}

export default TransferOnline;
