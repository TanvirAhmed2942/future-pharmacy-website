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

import React from "react";
import {
  useForm,
  useFieldArray,
  Controller,
  SubmitHandler,
} from "react-hook-form";

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

function TransferOnline() {
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
    <div className="container mx-auto bg-white py-8 max-w-3xl">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 px-4">
        <h2 className="text-2xl font-bold text-center text-peter font-inter mb-2">
          Transfer Your Prescription
        </h2>

        {/* Personal Information Section */}
        <div className="bg-white rounded-lg border p-6 shadow-sm">
          <h3 className="text-lg font-medium text-peter mb-4">
            Personal Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <Label
                htmlFor="firstName"
                className="text-sm font-medium text-gray-700"
              >
                First Name *
              </Label>
              <Input
                type="text"
                id="firstName"
                {...register("firstName", {
                  required: "First name is required",
                })}
                placeholder="Enter your first name here..."
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
                Last Name *
              </Label>
              <Input
                type="text"
                id="lastName"
                {...register("lastName", {
                  required: "Last name is required",
                })}
                placeholder="Enter your last name here..."
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
                Phone Number *
              </Label>
              <Input
                type="tel"
                id="phoneNumber"
                {...register("phoneNumber", {
                  required: "Phone number is required",
                  pattern: {
                    value: /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
                    message: "Please enter a valid phone number",
                  },
                })}
                placeholder="(XXX) XXX-XXXX"
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
                Date of Birth *
              </Label>
              <Controller
                control={control}
                name="dateOfBirth"
                rules={{ required: "Date of birth is required" }}
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
                          <span>Select date (MM/DD/YYYY)</span>
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
            Pharmacy Information
          </h3>

          <h4 className="text-md font-medium text-peter mb-2">
            Previous Pharmacy
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <Label
                htmlFor="previousPharmacyName"
                className="text-sm font-medium text-gray-700"
              >
                Previous Pharmacy Name *
              </Label>
              <Input
                type="text"
                id="previousPharmacyName"
                {...register("previousPharmacyName", {
                  required: "Previous pharmacy name is required",
                })}
                placeholder="e.g. CVS, Walgreens, etc."
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
                Previous Pharmacy Phone *
              </Label>
              <Input
                type="tel"
                id="previousPharmacyPhone"
                {...register("previousPharmacyPhone", {
                  required: "Previous pharmacy phone is required",
                  pattern: {
                    value: /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
                    message: "Please enter a valid phone number",
                  },
                })}
                placeholder="(XXX) XXX-XXXX"
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
              Previous Pharmacy Address
            </Label>
            <Input
              type="text"
              id="previousPharmacyAddress"
              {...register("previousPharmacyAddress")}
              placeholder="Enter pharmacy address here..."
              className="w-full mt-1"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <Label
                htmlFor="previousPharmacyCity"
                className="text-sm font-medium text-gray-700"
              >
                City *
              </Label>
              <Input
                type="text"
                id="previousPharmacyCity"
                {...register("previousPharmacyCity", {
                  required: "City is required",
                })}
                placeholder="Enter city name here..."
                className={cn(
                  "w-full mt-1",
                  errors.previousPharmacyCity && "border-red-500"
                )}
              />
              {errors.previousPharmacyCity && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.previousPharmacyCity.message}
                </p>
              )}
            </div>
            <div>
              <Label
                htmlFor="previousPharmacyState"
                className="text-sm font-medium text-gray-700"
              >
                State *
              </Label>
              <Input
                type="text"
                id="previousPharmacyState"
                {...register("previousPharmacyState", {
                  required: "State is required",
                })}
                placeholder="Enter state name here..."
                className={cn(
                  "w-full mt-1",
                  errors.previousPharmacyState && "border-red-500"
                )}
              />
              {errors.previousPharmacyState && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.previousPharmacyState.message}
                </p>
              )}
            </div>
            <div>
              <Label
                htmlFor="previousPharmacyZipCode"
                className="text-sm font-medium text-gray-700"
              >
                Zip Code *
              </Label>
              <Input
                type="text"
                id="previousPharmacyZipCode"
                {...register("previousPharmacyZipCode", {
                  required: "Zip code is required",
                  pattern: {
                    value: /^\d{5}(-\d{4})?$/,
                    message: "Please enter a valid zip code",
                  },
                })}
                placeholder="Enter zip code here..."
                className={cn(
                  "w-full mt-1",
                  errors.previousPharmacyZipCode && "border-red-500"
                )}
              />
              {errors.previousPharmacyZipCode && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.previousPharmacyZipCode.message}
                </p>
              )}
            </div>
          </div>

          {/* New Pharmacy Information */}
          <h4 className="text-md font-medium text-peter mb-2">New Pharmacy</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <Label
                htmlFor="newPharmacyName"
                className="text-sm font-medium text-gray-700"
              >
                New Pharmacy Name *
              </Label>
              <Input
                type="text"
                id="newPharmacyName"
                {...register("newPharmacyName", {
                  required: "New pharmacy name is required",
                })}
                placeholder="e.g. CVS, Walgreens, etc."
                className={cn(
                  "w-full mt-1",
                  errors.newPharmacyName && "border-red-500"
                )}
              />
              {errors.newPharmacyName && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.newPharmacyName.message}
                </p>
              )}
            </div>
            <div>
              <Label
                htmlFor="newPharmacyPhone"
                className="text-sm font-medium text-gray-700"
              >
                New Pharmacy Phone *
              </Label>
              <Input
                type="tel"
                id="newPharmacyPhone"
                {...register("newPharmacyPhone", {
                  required: "New pharmacy phone is required",
                  pattern: {
                    value: /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
                    message: "Please enter a valid phone number",
                  },
                })}
                placeholder="(XXX) XXX-XXXX"
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
              New Pharmacy Address
            </Label>
            <Input
              type="text"
              id="newPharmacyAddress"
              {...register("newPharmacyAddress")}
              placeholder="Enter pharmacy address here..."
              className="w-full mt-1"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div>
              <Label
                htmlFor="newPharmacyCity"
                className="text-sm font-medium text-gray-700"
              >
                City *
              </Label>
              <Input
                type="text"
                id="newPharmacyCity"
                {...register("newPharmacyCity", {
                  required: "City is required",
                })}
                placeholder="Enter city name here..."
                className={cn(
                  "w-full mt-1",
                  errors.newPharmacyCity && "border-red-500"
                )}
              />
              {errors.newPharmacyCity && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.newPharmacyCity.message}
                </p>
              )}
            </div>
            <div>
              <Label
                htmlFor="newPharmacyState"
                className="text-sm font-medium text-gray-700"
              >
                State *
              </Label>
              <Input
                type="text"
                id="newPharmacyState"
                {...register("newPharmacyState", {
                  required: "State is required",
                })}
                placeholder="Enter state name here..."
                className={cn(
                  "w-full mt-1",
                  errors.newPharmacyState && "border-red-500"
                )}
              />
              {errors.newPharmacyState && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.newPharmacyState.message}
                </p>
              )}
            </div>
            <div>
              <Label
                htmlFor="newPharmacyZipCode"
                className="text-sm font-medium text-gray-700"
              >
                Zip Code *
              </Label>
              <Input
                type="text"
                id="newPharmacyZipCode"
                {...register("newPharmacyZipCode", {
                  required: "Zip code is required",
                  pattern: {
                    value: /^\d{5}(-\d{4})?$/,
                    message: "Please enter a valid zip code",
                  },
                })}
                placeholder="Enter zip code here..."
                className={cn(
                  "w-full mt-1",
                  errors.newPharmacyZipCode && "border-red-500"
                )}
              />
              {errors.newPharmacyZipCode && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.newPharmacyZipCode.message}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Prescriptions Section */}
        <div className="bg-white rounded-lg border p-6 shadow-sm">
          <div className="flex items-start ">
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
              className="mr-2 mt-1 text-gray-400"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            <h3 className="text-lg font-medium text-peter">Prescriptions</h3>
          </div>
          <div className="mb-4 text-sm text-gray-600">
            <p className="text-xs text-gray-600 italic">
              Add the medication name and/or Rx number for all medications
              you&apos;d like to transfer
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
            <label htmlFor="transferAll" className="ml-2 text-sm text-gray-700">
              Transfer all of my medications
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
                  Medication Name
                </Label>
                <Input
                  type="text"
                  id={`medications.${index}.name`}
                  {...register(`medications.${index}.name` as const)}
                  placeholder="Enter your medication name here..."
                  className="w-full mt-1"
                />
              </div>
              <div>
                <Label
                  htmlFor={`medications.${index}.rxNumber`}
                  className="text-sm font-medium text-gray-700"
                >
                  Rx Number
                </Label>
                <Input
                  type="text"
                  id={`medications.${index}.rxNumber`}
                  {...register(`medications.${index}.rxNumber` as const)}
                  placeholder="Enter your Rx number here..."
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
            + ADD ANOTHER MEDICATION
          </Button>
        </div>

        {/* Additional Information Section */}
        <div className="bg-white rounded-lg border p-6 shadow-sm">
          <h3 className="text-lg font-medium text-peter mb-4">
            Additional Information
          </h3>

          <Label
            htmlFor="notes"
            className="text-sm font-medium text-gray-700 block mb-2"
          >
            Additional Notes or Special Instructions for the pharmacy
          </Label>
          <Textarea
            id="notes"
            {...register("notes")}
            placeholder="Any special instructions, allergies, or additional information we should know..."
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
                required: "You must consent to transfer your prescriptions",
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
              I consent to Optimus Health Solutions contacting my current
              pharmacy to transfer my prescriptions and understand that this
              process may take 1-3 business days.
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
          className="w-full bg-peter hover:bg-peter-dark text-white py-3 rounded-md font-medium"
        >
          Submit Transfer Request
        </Button>
      </form>
    </div>
  );
}

export default TransferOnline;
