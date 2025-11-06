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
import { ChevronDownIcon } from "lucide-react";
import { cn } from "@/lib/utils";

import React, { useState } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import CalendarModal from "./calendarModal";

type FormValues = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  dateOfBirth: Date | undefined; // Renamed from date to dateOfBirth

  // Pharmacy details
  pharmacyName: string;
  pharmacyPhone: string;
  pharmacyAddress: string;
  pharmacyCity: string;
  pharmacyState: string;
  pharmacyZipCode: string;

  // Service type
  serviceCategory: string;
  serviceType: string;

  // Appointment details
  appointmentDate: string;
  appointmentTime: string;
  appointmentAllTimes: string[];

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
      dateOfBirth: undefined,
      pharmacyName: "",
      pharmacyPhone: "",
      pharmacyAddress: "",
      pharmacyCity: "",
      pharmacyState: "",
      pharmacyZipCode: "",
      serviceCategory: "",
      serviceType: "",
      appointmentDate: "",
      appointmentTime: "",
      appointmentAllTimes: [],
      notes: "",
      consent: false,
    },
  });

  // State for calendar modal
  const [isCalendarModalOpen, setIsCalendarModalOpen] = useState(false);

  // Watch the service category to update available options in second dropdown
  const selectedCategory = watch("serviceCategory");
  const selectedDate = watch("appointmentDate");
  // const selectedTime = watch("appointmentTime");
  const selectedAllTimes = watch("appointmentAllTimes");

  // Reset service type when category changes
  React.useEffect(() => {
    if (selectedCategory) {
      setValue("serviceType", "");
    }
  }, [selectedCategory, setValue]);

  const handleSelectDateTime = ({
    date,
    time,
    allSelectedTimes,
  }: {
    date: string;
    time: string;
    allSelectedTimes?: string[];
  }) => {
    setValue("appointmentDate", date);
    setValue("appointmentTime", time);
    if (allSelectedTimes) {
      setValue("appointmentAllTimes", allSelectedTimes);
    }
    setIsCalendarModalOpen(false);
  };

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);
    // Process form submission
  };

  return (
    <div className="container mx-auto bg-white max-w-3xl mb-6">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 md:space-y-8 px-4"
      >
        <h2 className="text-2xl lg:text-3xl font-bold text-center text-peter font-inter mt-2 mb-4 lg:-mt-8 lg:mb-8 ">
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
                Pharmacy Phone
              </Label>
              <Input
                type="tel"
                id="pharmacyPhone"
                {...register("pharmacyPhone", {
                  pattern: {
                    value: /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
                    message: "Please enter a valid phone number",
                  },
                } as const)}
                placeholder="(XXX) XXX-XXXX"
                className="w-full mt-1"
              />
            </div>
          </div>
          <div className="mb-4">
            <Label
              htmlFor="pharmacyAddress"
              className="text-sm font-medium text-gray-700"
            >
              Pharmacy Address *
            </Label>
            <Input
              type="text"
              id="pharmacyAddress"
              {...register("pharmacyAddress", {
                required: "Pharmacy address is required",
              })}
              placeholder="Enter pharmacy address here..."
              className={cn(
                "w-full mt-1",
                errors.pharmacyAddress && "border-red-500"
              )}
            />
            {errors.pharmacyAddress && (
              <p className="text-red-500 text-xs mt-1">
                {errors.pharmacyAddress.message}
              </p>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <Label
                htmlFor="pharmacyCity"
                className="text-sm font-medium text-gray-700"
              >
                City
              </Label>
              <Input
                type="text"
                id="pharmacyCity"
                {...register("pharmacyCity", {
                  required: false,
                })}
                placeholder="Enter city name here..."
                className="w-full mt-1"
              />
            </div>
            <div>
              <Label
                htmlFor="pharmacyState"
                className="text-sm font-medium text-gray-700"
              >
                State
              </Label>
              <Input
                type="text"
                id="pharmacyState"
                {...register("pharmacyState", {
                  required: false,
                })}
                placeholder="Enter state name here..."
                className="w-full mt-1"
              />
            </div>
            <div>
              <Label
                htmlFor="pharmacyZipCode"
                className="text-sm font-medium text-gray-700"
              >
                Zip Code
              </Label>
              <Input
                type="text"
                id="pharmacyZipCode"
                {...register("pharmacyZipCode", {
                  required: false,
                })}
                placeholder="Enter zip code here..."
                className="w-full mt-1"
              />
            </div>
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
                      "w-full mt-1 h-10 text-[14px]",
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

          {/* Calendar  */}
          <div className="mb-4">
            <Label
              htmlFor="appointmentDateTime"
              className="text-sm font-medium text-gray-700"
            >
              Select Available Date & Time
            </Label>
            <Button
              type="button"
              variant={"outline"}
              onClick={() => setIsCalendarModalOpen(true)}
              className={cn(
                "w-full mt-1 justify-between font-normal text-left",
                !selectedDate && "text-muted-foreground"
              )}
            >
              {selectedDate &&
              selectedAllTimes &&
              selectedAllTimes.length > 0 ? (
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-700">
                    {selectedDate}
                  </span>
                  <div className="text-sm text-gray-500  max-h-16 overflow-y-auto pr-2">
                    {selectedAllTimes.length > 3 ? (
                      <>
                        {selectedAllTimes.slice(0, 2).map((time, index) => (
                          <span key={index}>
                            {time}
                            {index < 1 ? ", " : ""}
                          </span>
                        ))}
                        <span> and {selectedAllTimes.length - 2} more</span>
                      </>
                    ) : (
                      selectedAllTimes.map((time, index) => (
                        <span key={index}>
                          {time}
                          {index < selectedAllTimes.length - 1 ? ", " : ""}
                        </span>
                      ))
                    )}
                  </div>
                </div>
              ) : (
                <span>Date & Time</span>
              )}
              <ChevronDownIcon className="h-4 w-4 opacity-50" />
            </Button>
            {(errors.appointmentDate || errors.appointmentTime) && (
              <p className="text-red-500 text-xs mt-1">
                Please select a date and time
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

      {/* Calendar Modal */}
      <CalendarModal
        isOpen={isCalendarModalOpen}
        onClose={() => setIsCalendarModalOpen(false)}
        onSelectDateTime={handleSelectDateTime}
      />
    </div>
  );
}

export default ScheduleOnline;
