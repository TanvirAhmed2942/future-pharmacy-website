"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { ChevronDownIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

import React from "react";
import {
  useForm,
  useFieldArray,
  Controller,
  SubmitHandler,
} from "react-hook-form";
import { useTranslations } from "next-intl";
import Backbutton from "@/components/common/backbutton/backbutton";
import Image from "next/image";

type MedicationInput = {
  id: number;
  name: string;
  rxNumber: string;
};

type FormValues = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  dateOfBirth: Date | undefined; // Changed back to Date for the calendar
  pharmacyName: string;
  pharmacyPhone?: string;
  pharmacyAddress: string;
  pharmacyCity?: string; // Added for pharmacy city
  pharmacyState?: string; // Added for pharmacy state
  pharmacyZipCode?: string; // Added for pharmacy zip code
  deliveryAddress: string;
  aptUnit: string;
  city: string;
  state: string;
  zipCode: string;
  medications: MedicationInput[];
  refillAll: boolean;
  notes: string;
};

function RefillOnline() {
  const t = useTranslations("refillOnline");
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      firstName: "",
      lastName: "",
      phoneNumber: "",
      dateOfBirth: undefined,
      pharmacyName: "",
      pharmacyPhone: "",
      pharmacyAddress: "",
      pharmacyCity: "",
      pharmacyState: "",
      pharmacyZipCode: "",
      deliveryAddress: "",
      aptUnit: "",
      city: "",
      state: "",
      zipCode: "",
      medications: [{ id: 1, name: "", rxNumber: "" }],
      refillAll: false,
      notes: "",
    },
  });

  const { fields, append } = useFieldArray({
    control,
    name: "medications",
  });

  const addMedication = () => {
    const newId =
      fields.length > 0 ? Math.max(...fields.map((m) => m.id)) + 1 : 1;
    append({ id: newId, name: "", rxNumber: "" });
  };

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);
    // Process form submission
  };

  return (
    <div className=" relative container mx-auto bg-white mb-6 mt-4 md:mt-0 ">
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
                    pattern: {
                      value:
                        /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
                      message: t("personalInformation.phoneNumberInvalid"),
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

          {/* Pharmacy Information Section */}
          <div className="bg-white rounded-lg border p-6 shadow-sm">
            <h3 className="text-lg font-medium text-peter mb-4">
              {t("pharmacyInformation.title")}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <Label
                  htmlFor="pharmacyName"
                  className="text-sm font-medium text-gray-700"
                >
                  {t("pharmacyInformation.pharmacyName")} *
                </Label>
                <Input
                  type="text"
                  id="pharmacyName"
                  {...register("pharmacyName", {
                    required: t("pharmacyInformation.pharmacyNameRequired"),
                  })}
                  placeholder={t("pharmacyInformation.pharmacyNamePlaceholder")}
                  className={cn(
                    "w-full mt-1",
                    errors.pharmacyName && "border-red-500"
                  )}
                />
                {errors.pharmacyName && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.pharmacyName.message}
                  </p>
                )}
              </div>
              <div>
                <Label
                  htmlFor="pharmacyPhone"
                  className="text-sm font-medium text-gray-700"
                >
                  {t("pharmacyInformation.pharmacyPhone")}
                </Label>
                <Input
                  type="tel"
                  id="pharmacyPhone"
                  {...register("pharmacyPhone", {
                    pattern: {
                      value:
                        /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
                      message: t("pharmacyInformation.pharmacyPhoneInvalid"),
                    },
                  })}
                  placeholder={t(
                    "pharmacyInformation.pharmacyPhonePlaceholder"
                  )}
                  className={cn(
                    "w-full mt-1",
                    errors.pharmacyPhone && "border-red-500"
                  )}
                />
                {errors.pharmacyPhone && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.pharmacyPhone.message}
                  </p>
                )}
              </div>
            </div>
            <div className="mt-2">
              <Label
                htmlFor="pharmacyAddress"
                className="text-sm font-medium text-gray-700"
              >
                {t("pharmacyInformation.pharmacyAddress")}
              </Label>
              <Input
                type="text"
                id="pharmacyAddress"
                {...register("pharmacyAddress")}
                placeholder={t(
                  "pharmacyInformation.pharmacyAddressPlaceholder"
                )}
                className="w-full mt-1"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div>
                <Label
                  htmlFor="pharmacyCity"
                  className="text-sm font-medium text-gray-700"
                >
                  {t("pharmacyInformation.city")}
                </Label>
                <Input
                  type="text"
                  id="pharmacyCity"
                  {...register("pharmacyCity")}
                  placeholder={t("pharmacyInformation.cityPlaceholder")}
                  className="w-full mt-1"
                />
              </div>
              <div>
                <Label
                  htmlFor="pharmacyState"
                  className="text-sm font-medium text-gray-700"
                >
                  {t("pharmacyInformation.state")}
                </Label>
                <Input
                  type="text"
                  id="pharmacyState"
                  {...register("pharmacyState")}
                  placeholder={t("pharmacyInformation.statePlaceholder")}
                  className="w-full mt-1"
                />
              </div>
              <div>
                <Label
                  htmlFor="pharmacyZipCode"
                  className="text-sm font-medium text-gray-700"
                >
                  {t("pharmacyInformation.zipCode")}
                </Label>
                <Input
                  type="text"
                  id="pharmacyZipCode"
                  {...register("pharmacyZipCode", {
                    pattern: {
                      value: /^\d{5}(-\d{4})?$/,
                      message: t("pharmacyInformation.zipCodeInvalid"),
                    },
                  })}
                  placeholder={t("pharmacyInformation.zipCodePlaceholder")}
                  className="w-full mt-1"
                />
              </div>
            </div>
          </div>

          {/* Delivery Details Section */}
          <div className="bg-white rounded-lg border p-6 shadow-sm">
            <h3 className="text-lg font-medium text-peter mb-4">
              {t("deliveryDetails.title")}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <Label
                  htmlFor="deliveryAddress"
                  className="text-sm font-medium text-gray-700"
                >
                  {t("deliveryDetails.deliveryAddress")} *
                </Label>
                <Input
                  type="text"
                  id="deliveryAddress"
                  {...register("deliveryAddress", {
                    required: t("deliveryDetails.deliveryAddressRequired"),
                  })}
                  placeholder={t("deliveryDetails.deliveryAddressPlaceholder")}
                  className={cn(
                    "w-full mt-1",
                    errors.deliveryAddress && "border-red-500"
                  )}
                />
                {errors.deliveryAddress && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.deliveryAddress.message}
                  </p>
                )}
              </div>
              <div>
                <Label
                  htmlFor="aptUnit"
                  className="text-sm font-medium text-gray-700"
                >
                  {t("deliveryDetails.aptUnit")}
                </Label>
                <Input
                  type="text"
                  id="aptUnit"
                  {...register("aptUnit")}
                  placeholder={t("deliveryDetails.aptUnitPlaceholder")}
                  className="w-full mt-1"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label
                  htmlFor="city"
                  className="text-sm font-medium text-gray-700"
                >
                  {t("deliveryDetails.city")}
                </Label>
                <Input
                  type="text"
                  id="city"
                  {...register("city", { required: false })}
                  placeholder={t("deliveryDetails.cityPlaceholder")}
                  className="w-full mt-1"
                />
              </div>
              <div>
                <Label
                  htmlFor="state"
                  className="text-sm font-medium text-gray-700"
                >
                  {t("deliveryDetails.state")}
                </Label>
                <Input
                  type="text"
                  id="state"
                  {...register("state", { required: false })}
                  placeholder={t("deliveryDetails.statePlaceholder")}
                  className="w-full mt-1"
                />
              </div>
              <div>
                <Label
                  htmlFor="zipCode"
                  className="text-sm font-medium text-gray-700"
                >
                  {t("deliveryDetails.zipCode")}
                </Label>
                <Input
                  type="text"
                  id="zipCode"
                  {...register("zipCode", { required: false })}
                  placeholder={t("deliveryDetails.zipCodePlaceholder")}
                  className="w-full mt-1"
                />
              </div>
            </div>
          </div>

          {/* Medication List Section */}
          <div className="bg-white rounded-lg border p-6 shadow-sm">
            <h3 className="text-lg font-medium text-peter ">
              {t("medicationList.title")}
            </h3>
            {/* <div className="mb-4 flex items-start gap-2 text-sm text-gray-600 italic">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mt-1 text-gray-400"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            <p>Add the medication... right under &quot;Medication List&quot;</p>
          </div> */}
            <div className="mb-4 text-xs text-gray-600 italic">
              <p>{t("medicationList.instruction")}</p>
            </div>

            <div className="mb-4 flex items-center">
              <Controller
                control={control}
                name="refillAll"
                render={({ field }) => (
                  <Checkbox
                    id="refillAll"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                )}
              />
              <label htmlFor="refillAll" className="ml-2 text-sm text-gray-700">
                {t("medicationList.refillAll")}
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
                    {t("medicationList.medicationName")}
                  </Label>
                  <Input
                    type="text"
                    id={`medications.${index}.name`}
                    {...register(`medications.${index}.name` as const)}
                    placeholder={t("medicationList.medicationNamePlaceholder")}
                    className="w-full mt-1"
                  />
                </div>
                <div>
                  <Label
                    htmlFor={`medications.${index}.rxNumber`}
                    className="text-sm font-medium text-gray-700"
                  >
                    {t("medicationList.rxNumber")}
                  </Label>
                  <Input
                    type="text"
                    id={`medications.${index}.rxNumber`}
                    {...register(`medications.${index}.rxNumber` as const)}
                    placeholder={t("medicationList.rxNumberPlaceholder")}
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
              {t("medicationList.addAnother")}
            </Button>
          </div>

          {/* Additional Notes Section */}
          <div className="bg-white rounded-lg border p-6 shadow-sm">
            <Label
              htmlFor="notes"
              className="text-sm font-medium text-gray-700 block mb-2"
            >
              {t("additionalNotes.title")}
            </Label>
            <Textarea
              id="notes"
              {...register("notes")}
              placeholder={t("additionalNotes.placeholder")}
              className="w-full h-24"
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full bg-peter hover:bg-peter-dark text-white py-3 rounded-md font-medium"
          >
            {t("submitButton")}
          </Button>
        </form>
      </div>

      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center pointer-events-none">
        <Image
          src="/watermark.webp"
          alt="Refill Online"
          width={1000}
          height={1000}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-contain opacity-30 w-full xl:w-[85%] 2xl:w-[95%] h-full"
        />
      </div>
    </div>
  );
}

export default RefillOnline;
