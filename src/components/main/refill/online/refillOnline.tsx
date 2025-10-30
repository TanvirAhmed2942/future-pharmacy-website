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
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
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
  date: Date | undefined;
  pharmacyName: string;
  pharmacyPhone: string;
  pharmacyAddress: string;
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
      date: undefined,
      pharmacyName: "",
      pharmacyPhone: "",
      pharmacyAddress: "",
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
    <div className="container mx-auto bg-white py-8 max-w-3xl">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 px-4">
        <h2 className="text-2xl font-bold text-center text-peter font-inter">
          Refill Your Prescription
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
                htmlFor="date"
                className="text-sm font-medium text-gray-700"
              >
                Date of Birth *
              </Label>
              <Controller
                control={control}
                name="date"
                rules={{ required: "Date is required" }}
                render={({ field }) => (
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "relative w-full mt-1 justify-start text-left font-normal",
                          !field.value && "text-muted-foreground",
                          errors.date && "border-red-500"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                )}
              />
              {errors.date && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.date.message}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Pharmacy Information Section */}
        <div className="bg-white rounded-lg border p-6 shadow-sm">
          <h3 className="text-lg font-medium text-peter mb-4">
            Pharmacy Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <Label
                htmlFor="pharmacyName"
                className="text-sm font-medium text-gray-700"
              >
                Pharmacy Name *
              </Label>
              <Input
                type="text"
                id="pharmacyName"
                {...register("pharmacyName", {
                  required: "Pharmacy name is required",
                })}
                placeholder="e.g. CVS, Walgreens, etc."
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
                Pharmacy Phone *
              </Label>
              <Input
                type="tel"
                id="pharmacyPhone"
                {...register("pharmacyPhone", {
                  required: "Pharmacy phone is required",
                  pattern: {
                    value: /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
                    message: "Please enter a valid phone number",
                  },
                })}
                placeholder="(XXX) XXX-XXXX"
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
          <div>
            <Label
              htmlFor="pharmacyAddress"
              className="text-sm font-medium text-gray-700"
            >
              Pharmacy Address
            </Label>
            <Input
              type="text"
              id="pharmacyAddress"
              {...register("pharmacyAddress")}
              placeholder="Street address, city, state, ZIP"
              className="w-full mt-1"
            />
          </div>
        </div>

        {/* Delivery Details Section */}
        <div className="bg-white rounded-lg border p-6 shadow-sm">
          <h3 className="text-lg font-medium text-peter mb-4">
            Delivery Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <Label
                htmlFor="deliveryAddress"
                className="text-sm font-medium text-gray-700"
              >
                Delivery Address *
              </Label>
              <Input
                type="text"
                id="deliveryAddress"
                {...register("deliveryAddress", {
                  required: "Delivery address is required",
                })}
                placeholder="Enter delivery address here..."
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
                Apt/Unit
              </Label>
              <Input
                type="text"
                id="aptUnit"
                {...register("aptUnit")}
                placeholder="Enter apt/unit here..."
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
                City *
              </Label>
              <Input
                type="text"
                id="city"
                {...register("city", {
                  required: "City is required",
                })}
                placeholder="Enter city name here..."
                className={cn("w-full mt-1", errors.city && "border-red-500")}
              />
              {errors.city && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.city.message}
                </p>
              )}
            </div>
            <div>
              <Label
                htmlFor="state"
                className="text-sm font-medium text-gray-700"
              >
                State *
              </Label>
              <Input
                type="text"
                id="state"
                {...register("state", {
                  required: "State is required",
                })}
                placeholder="Enter state name here..."
                className={cn("w-full mt-1", errors.state && "border-red-500")}
              />
              {errors.state && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.state.message}
                </p>
              )}
            </div>
            <div>
              <Label
                htmlFor="zipCode"
                className="text-sm font-medium text-gray-700"
              >
                Zip Code *
              </Label>
              <Input
                type="text"
                id="zipCode"
                {...register("zipCode", {
                  required: "Zip code is required",
                  pattern: {
                    value: /^\d{5}(-\d{4})?$/,
                    message: "Please enter a valid zip code",
                  },
                })}
                placeholder="Enter zip code here..."
                className={cn(
                  "w-full mt-1",
                  errors.zipCode && "border-red-500"
                )}
              />
              {errors.zipCode && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.zipCode.message}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Medication List Section */}
        <div className="bg-white rounded-lg border p-6 shadow-sm">
          <h3 className="text-lg font-medium text-peter ">Medication List</h3>
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
            <p>
              Add the medication name and/or Rx number (or at least one is
              required to refill)
            </p>
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
              Refill all of my medications
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

        {/* Additional Notes Section */}
        <div className="bg-white rounded-lg border p-6 shadow-sm">
          <Label
            htmlFor="notes"
            className="text-sm font-medium text-gray-700 block mb-2"
          >
            Additional Notes or Special Instructions
          </Label>
          <Textarea
            id="notes"
            {...register("notes")}
            placeholder="Any special instructions, allergies, or additional information we should know..."
            className="w-full h-24"
          />
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full bg-peter hover:bg-peter-dark text-white py-3 rounded-md font-medium"
        >
          Submit Refill Request
        </Button>
      </form>
    </div>
  );
}

export default RefillOnline;
