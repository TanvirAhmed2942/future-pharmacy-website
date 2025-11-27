"use client";
import React from "react";
import Image from "next/image";
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
import { useTranslations } from "next-intl";
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
  const tForm = useTranslations("earnAsDriver.formSection.form");
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
        <Card className="border shadow-2xl bg-white  backdrop-blur-sm opacity-85">
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold text-center mb-6">
              {tForm("formTitle")}
            </h2>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-4 relative"
            >
              {/* Name Field */}
              <div>
                <Label htmlFor="name" className="text-sm text-gray-700">
                  {tForm("name")}
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder={tForm("namePlaceholder")}
                  className={cn(
                    "mt-1 bg-gray-50",
                    errors.name && "border-red-500"
                  )}
                  {...register("name", {
                    required: tForm("nameRequired"),
                    minLength: {
                      value: 2,
                      message: tForm("nameMinLength"),
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
                  {tForm("emailAddress")}
                </Label>
                <Input
                  id="emailAddress"
                  type="email"
                  placeholder={tForm("emailAddressPlaceholder")}
                  className={cn(
                    "mt-1 bg-gray-50",
                    errors.emailAddress && "border-red-500"
                  )}
                  {...register("emailAddress", {
                    required: tForm("emailAddressRequired"),
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: tForm("emailAddressInvalid"),
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
                  {tForm("phoneNumber")}
                </Label>
                <Input
                  id="phoneNumber"
                  type="tel"
                  placeholder={tForm("phoneNumberPlaceholder")}
                  className={cn(
                    "mt-1 bg-gray-50",
                    errors.phoneNumber && "border-red-500"
                  )}
                  {...register("phoneNumber", {
                    required: tForm("phoneNumberRequired"),
                    pattern: {
                      value:
                        /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
                      message: tForm("phoneNumberInvalid"),
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
                    {tForm("city")}
                  </Label>
                  <Input
                    id="city"
                    type="text"
                    placeholder={tForm("cityPlaceholder")}
                    className={cn(
                      "mt-1 bg-gray-50",
                      errors.city && "border-red-500"
                    )}
                    {...register("city", {
                      required: tForm("cityRequired"),
                      minLength: {
                        value: 2,
                        message: tForm("cityMinLength"),
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
                    {tForm("zipCode")}
                  </Label>
                  <Input
                    id="zipCode"
                    type="text"
                    placeholder={tForm("zipCodePlaceholder")}
                    className={cn(
                      "mt-1 bg-gray-50",
                      errors.zipCode && "border-red-500"
                    )}
                    {...register("zipCode", {
                      required: tForm("zipCodeRequired"),
                      pattern: {
                        value: /^\d{5}(-\d{4})?$/,
                        message: tForm("zipCodeInvalid"),
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
                    {tForm("vehicleType")}
                  </Label>
                  <Controller
                    name="vehicleType"
                    control={control}
                    rules={{ required: tForm("vehicleTypeRequired") }}
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
                          <SelectValue
                            placeholder={tForm("vehicleTypePlaceholder")}
                          />
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
                    {tForm("yearsWithLicense")}
                  </Label>
                  <Controller
                    name="yearsWithLicense"
                    control={control}
                    rules={{
                      required: tForm("yearsWithLicenseRequired"),
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
                          <SelectValue
                            placeholder={tForm("yearsWithLicensePlaceholder")}
                          />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="2-5">
                            2-5 {tForm("years")}
                          </SelectItem>
                          <SelectItem value="6-10">
                            6-10 {tForm("years")}
                          </SelectItem>
                          <SelectItem value="11-20">
                            11-20 {tForm("years")}
                          </SelectItem>
                          <SelectItem value="20+">
                            20+ {tForm("years")}
                          </SelectItem>
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
                  {tForm("message")}
                </Label>
                <Textarea
                  id="message"
                  placeholder={tForm("messagePlaceholder")}
                  className={cn(
                    "mt-1 bg-gray-50 min-h-[100px]",
                    errors.message && "border-red-500"
                  )}
                  {...register("message", {
                    required: tForm("messageRequired"),
                    minLength: {
                      value: 10,
                      message: tForm("messageMinLength"),
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
                {tForm("submitButton")}
              </Button>

              {/* Watermark */}
              <div className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none z-10">
                <Image
                  src="/watermark.webp"
                  alt="watermark"
                  width={1000}
                  height={1000}
                  className="object-contain w-60 h-60 xl:w-80 xl:h-80 -rotate-45 opacity-100"
                />
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default DriverRegForm;
