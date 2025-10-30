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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

import React from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";

type FormValues = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  date: Date | undefined;

  // Pharmacy details
  pharmacyName: string;
  pharmacyPhone: string;
  pharmacyAddress: string;

  // Service type
  serviceCategory: string;
  serviceType: string;

  // Additional info
  notes: string;
  consent: boolean;
};

function ScheduleOnline() {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<FormValues>({
    defaultValues: {
      firstName: "",
      lastName: "",
      phoneNumber: "",
      date: undefined,
      pharmacyName: "",
      pharmacyPhone: "",
      pharmacyAddress: "",
      serviceCategory: "",
      serviceType: "",
      notes: "",
      consent: false,
    },
  });

  // Watch the service category to update available options in second dropdown
  const selectedCategory = watch("serviceCategory");

  // Reset service type when category changes
  React.useEffect(() => {
    if (selectedCategory) {
      setValue("serviceType", "");
    }
  }, [selectedCategory, setValue]);

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);
    // Process form submission
  };

  return (
    <div className="container mx-auto bg-white py-8 max-w-3xl">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 px-4">
        <h2 className="text-2xl font-bold text-center text-peter font-inter mb-2">
          Schedule Your Prescription
        </h2>

        {/* Profile Info Section */}
        <div className="bg-white rounded-lg border p-6 shadow-sm">
          <h3 className="text-lg font-medium text-peter mb-4">Profile Info</h3>
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
                Date *
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
          <div className="mb-4">
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
              placeholder="Street address, city, state, Zip"
              className="w-full mt-1"
            />
          </div>

          {/* Service Category Dropdown */}
          <div className="mb-4">
            <Label
              htmlFor="serviceCategory"
              className="text-sm font-medium text-gray-700"
            >
              Services Type
            </Label>
            <Controller
              control={control}
              name="serviceCategory"
              rules={{ required: "Please select a service category" }}
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger
                    className={cn(
                      "w-full mt-1",
                      errors.serviceCategory && "border-red-500"
                    )}
                  >
                    <SelectValue placeholder="Services Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="vaccinations">Vaccinations</SelectItem>
                    <SelectItem value="health_screenings">
                      Health Screenings
                    </SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.serviceCategory && (
              <p className="text-red-500 text-xs mt-1">
                {errors.serviceCategory.message}
              </p>
            )}
          </div>

          {/* Specific Service Dropdown - Conditionally shown based on category */}
          {selectedCategory && (
            <div className="mb-4">
              <Label
                htmlFor="serviceType"
                className="text-sm font-medium text-gray-700"
              >
                {selectedCategory === "vaccinations"
                  ? "Vaccinations"
                  : "Health Screenings"}
              </Label>
              <Controller
                control={control}
                name="serviceType"
                rules={{ required: "Please select a specific service" }}
                render={({ field }) => (
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger
                      className={cn(
                        "w-full mt-1",
                        errors.serviceType && "border-red-500"
                      )}
                    >
                      <SelectValue
                        placeholder={`Select ${
                          selectedCategory === "vaccinations"
                            ? "vaccination"
                            : "screening"
                        } type`}
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {selectedCategory === "vaccinations" ? (
                        <>
                          <SelectItem value="flu">Flu</SelectItem>
                          <SelectItem value="covid">Covid</SelectItem>
                          <SelectItem value="shingles">Shingles</SelectItem>
                        </>
                      ) : (
                        <>
                          <SelectItem value="blood_pressure">
                            Blood Pressure
                          </SelectItem>
                          <SelectItem value="cholesteric">
                            Cholesteric
                          </SelectItem>
                          <SelectItem value="diabetes">Diabetes</SelectItem>
                        </>
                      )}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.serviceType && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.serviceType.message}
                </p>
              )}
            </div>
          )}

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

        {/* Consent Section */}
        <div className="bg-[#f3ecf3] rounded-lg border border-[#d2b5d2] p-6">
          <div className="flex items-start">
            <Controller
              control={control}
              name="consent"
              rules={{ required: "You must consent to proceed" }}
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
              process may take 1-3 business days. *
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
          Submit Schedule Request
        </Button>
      </form>
    </div>
  );
}

export default ScheduleOnline;
