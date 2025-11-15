"use client";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { cn } from "@/lib/utils";

interface FormValues {
  name: string;
  emailAddress: string;
  phoneNumber: string;
  city: string;
  zipCode: string;
  vehicleType: string;
  yearsWithLicense: string;
  message: string;
}

function DriverRegForm() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      name: "",
      emailAddress: "",
      phoneNumber: "",
      city: "",
      zipCode: "",
      vehicleType: "",
      yearsWithLicense: "",
      message: "",
    },
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log("Form submitted:", data);
    // Handle form submission logic here
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center py-12 px-4 md:px-8 overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 w-full h-full z-0">
        <video
          autoPlay
          loop
          muted
          preload="auto"
          playsInline
          className="w-full h-full object-cover scale-110 opacity-60 blur-[2px]"
        >
          <source src="/videos/driver_1.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {/* Overlay for better form readability */}
        <div className="absolute inset-0 bg-black/40 z-10"></div>
      </div>

      {/* Content Container - Centered */}
      <div className="relative z-20 w-full max-w-2xl mx-auto">
        <Card className="border shadow-2xl bg-white/95  backdrop-blur-sm">
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold text-center mb-6">
              Apply to become a Driver
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ">
              {/* Name Field */}
              <div>
                <Label htmlFor="name" className="text-sm text-gray-700">
                  Name
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your name here..."
                  className={cn(
                    "mt-1 bg-gray-50",
                    errors.name && "border-red-500"
                  )}
                  {...register("name", {
                    required: "Name is required",
                    minLength: {
                      value: 2,
                      message: "Name must be at least 2 characters",
                    },
                  })}
                />
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Email Address Field */}
              <div>
                <Label htmlFor="emailAddress" className="text-sm text-gray-700">
                  Email Address
                </Label>
                <Input
                  id="emailAddress"
                  type="email"
                  placeholder="Enter your email address here..."
                  className={cn(
                    "mt-1 bg-gray-50",
                    errors.emailAddress && "border-red-500"
                  )}
                  {...register("emailAddress", {
                    required: "Email address is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                />
                {errors.emailAddress && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.emailAddress.message}
                  </p>
                )}
              </div>

              {/* Phone Number Field */}
              <div>
                <Label htmlFor="phoneNumber" className="text-sm text-gray-700">
                  Phone Number
                </Label>
                <Input
                  id="phoneNumber"
                  type="tel"
                  placeholder="Enter your phone number here..."
                  className={cn(
                    "mt-1 bg-gray-50",
                    errors.phoneNumber && "border-red-500"
                  )}
                  {...register("phoneNumber", {
                    required: "Phone number is required",
                    pattern: {
                      value:
                        /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
                      message: "Invalid phone number format",
                    },
                  })}
                />
                {errors.phoneNumber && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.phoneNumber.message}
                  </p>
                )}
              </div>

              {/* City and Zip Code - Two Column Layout */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="city" className="text-sm text-gray-700">
                    City
                  </Label>
                  <Input
                    id="city"
                    type="text"
                    placeholder="Enter your city name here..."
                    className={cn(
                      "mt-1 bg-gray-50",
                      errors.city && "border-red-500"
                    )}
                    {...register("city", {
                      required: "City is required",
                      minLength: {
                        value: 2,
                        message: "City name must be at least 2 characters",
                      },
                    })}
                  />
                  {errors.city && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.city.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="zipCode" className="text-sm text-gray-700">
                    Zip Code
                  </Label>
                  <Input
                    id="zipCode"
                    type="text"
                    placeholder="Enter your zip code here..."
                    className={cn(
                      "mt-1 bg-gray-50",
                      errors.zipCode && "border-red-500"
                    )}
                    {...register("zipCode", {
                      required: "Zip code is required",
                      pattern: {
                        value: /^\d{5}(-\d{4})?$/,
                        message: "Invalid zip code format",
                      },
                    })}
                  />
                  {errors.zipCode && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.zipCode.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Vehicle Type and Years with Driver's License - Two Column Layout */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label
                    htmlFor="vehicleType"
                    className="text-sm text-gray-700"
                  >
                    Vehicle Type
                  </Label>
                  <Controller
                    name="vehicleType"
                    control={control}
                    rules={{ required: "Vehicle type is required" }}
                    render={({ field }) => (
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger
                          className={cn(
                            "mt-1 bg-gray-50 text-[14px]",
                            errors.vehicleType && "border-red-500"
                          )}
                        >
                          <SelectValue placeholder="Select your vehicle type here..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="car">Car</SelectItem>
                          <SelectItem value="e-bike">E-bike</SelectItem>
                          <SelectItem value="motorbike">Motorbike</SelectItem>
                          <SelectItem value="scooter">Scooter</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.vehicleType && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.vehicleType.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label
                    htmlFor="yearsWithLicense"
                    className="text-sm text-gray-700"
                  >
                    Years with Driver&apos;s License
                  </Label>
                  <Controller
                    name="yearsWithLicense"
                    control={control}
                    rules={{
                      required: "Years with driver's license is required",
                    }}
                    render={({ field }) => (
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger
                          className={cn(
                            "mt-1 bg-gray-50 text-[14px]",
                            errors.yearsWithLicense && "border-red-500"
                          )}
                        >
                          <SelectValue placeholder="Select driver's license years" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="2-5">2-5 years</SelectItem>
                          <SelectItem value="6-10">6-10 years</SelectItem>
                          <SelectItem value="11-20">11-20 years</SelectItem>
                          <SelectItem value="20+">20+ years</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.yearsWithLicense && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.yearsWithLicense.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Message Field */}
              <div>
                <Label htmlFor="message" className="text-sm text-gray-700">
                  Your Message
                </Label>
                <Textarea
                  id="message"
                  placeholder="Type your message here..."
                  className={cn(
                    "mt-1 bg-gray-50 min-h-[100px]",
                    errors.message && "border-red-500"
                  )}
                  {...register("message", {
                    required: "Message is required",
                    minLength: {
                      value: 10,
                      message: "Message must be at least 10 characters",
                    },
                  })}
                />
                {errors.message && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.message.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full bg-peter hover:bg-peter-dark text-white h-10 text-base font-medium cursor-pointer"
              >
                Submit Interest
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default DriverRegForm;
