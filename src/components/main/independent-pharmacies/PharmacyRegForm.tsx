"use client";
import React from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  pharmacyName: string;
  pharmacyAddress: string;
  phoneNumber: string;
  emailAddress: string;
  contactPerson: string;
  title: string;
  experienceBusiness: string;
  message: string;
}

function PharmacyRegForm() {
  const tForm = useTranslations("independentPharmacies.formSection.form");
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      pharmacyName: "",
      pharmacyAddress: "",
      phoneNumber: "",
      emailAddress: "",
      contactPerson: "",
      title: "",
      experienceBusiness: "",
      message: "",
    },
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log("Form submitted:", data);
    // Handle form submission logic here
  };

  return (
    <div className="  py-16  px-4 md:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Form Card */}
        <Card className="shadow-lg">
          <CardHeader className="space-y-1 pb-6">
            <CardTitle className="text-2xl font-bold text-gray-900 text-center">
              {tForm("formTitle")}
            </CardTitle>
            <p className="text-gray-600 text-sm md:text-base max-w-6xl  mx-auto text-center ">
              {tForm("formDescription")}
            </p>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-6 relative"
            >
              {/* Pharmacy Name and Pharmacy Address - Two Column Layout */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="pharmacyName" className="text-sm font-medium">
                    {tForm("pharmacyName")}
                  </Label>
                  <Input
                    id="pharmacyName"
                    type="text"
                    placeholder={tForm("placeholders.pharmacyName")}
                    className={cn(
                      "bg-gray-50",
                      errors.pharmacyName && "border-red-500"
                    )}
                    {...register("pharmacyName", {
                      required: tForm("placeholders.pharmacyNameRequired"),
                      minLength: {
                        value: 2,
                        message: tForm("placeholders.pharmacyNameMinLength"),
                      },
                    })}
                  />
                  {errors.pharmacyName && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.pharmacyName.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="pharmacyAddress"
                    className="text-sm font-medium"
                  >
                    {tForm("pharmacyAddress")}
                  </Label>
                  <Input
                    id="pharmacyAddress"
                    type="text"
                    placeholder={tForm("placeholders.pharmacyAddress")}
                    className={cn(
                      "bg-gray-50",
                      errors.pharmacyAddress && "border-red-500"
                    )}
                    {...register("pharmacyAddress", {
                      required: tForm("placeholders.pharmacyAddressRequired"),
                      minLength: {
                        value: 5,
                        message: tForm("placeholders.pharmacyAddressMinLength"),
                      },
                    })}
                  />
                  {errors.pharmacyAddress && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.pharmacyAddress.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Phone Number */}
              <div className="space-y-2">
                <Label htmlFor="phoneNumber" className="text-sm font-medium">
                  {tForm("phoneNumber")}
                </Label>
                <Input
                  id="phoneNumber"
                  type="tel"
                  placeholder={tForm("placeholders.phoneNumber")}
                  className={cn(
                    "bg-gray-50",
                    errors.phoneNumber && "border-red-500"
                  )}
                  {...register("phoneNumber", {
                    required: tForm("placeholders.phoneNumberRequired"),
                    pattern: {
                      value:
                        /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
                      message: tForm("placeholders.phoneNumberInvalid"),
                    },
                  })}
                />
                {errors.phoneNumber && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.phoneNumber.message}
                  </p>
                )}
              </div>

              {/* Email Address */}
              <div className="space-y-2">
                <Label htmlFor="emailAddress" className="text-sm font-medium">
                  {tForm("emailAddress")}
                </Label>
                <Input
                  id="emailAddress"
                  type="email"
                  placeholder={tForm("placeholders.emailAddress")}
                  className={cn(
                    "bg-gray-50",
                    errors.emailAddress && "border-red-500"
                  )}
                  {...register("emailAddress", {
                    required: tForm("placeholders.emailAddressRequired"),
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: tForm("placeholders.emailAddressInvalid"),
                    },
                  })}
                />
                {errors.emailAddress && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.emailAddress.message}
                  </p>
                )}
              </div>

              {/* Contact Person and Title - Two Column Layout */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="contactPerson"
                    className="text-sm font-medium"
                  >
                    {tForm("contactPerson")}
                  </Label>
                  <Input
                    id="contactPerson"
                    type="text"
                    placeholder={tForm("placeholders.contactPerson")}
                    className={cn(
                      "bg-gray-50",
                      errors.contactPerson && "border-red-500"
                    )}
                    {...register("contactPerson", {
                      required: tForm("placeholders.contactPersonRequired"),
                      minLength: {
                        value: 2,
                        message: tForm("placeholders.contactPersonMinLength"),
                      },
                    })}
                  />
                  {errors.contactPerson && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.contactPerson.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-sm font-medium">
                    {tForm("title")}
                  </Label>
                  <Input
                    id="title"
                    type="text"
                    placeholder={tForm("placeholders.title")}
                    className={cn(
                      "bg-gray-50",
                      errors.title && "border-red-500"
                    )}
                    {...register("title", {
                      required: tForm("placeholders.titleRequired"),
                      minLength: {
                        value: 2,
                        message: tForm("placeholders.titleMinLength"),
                      },
                    })}
                  />
                  {errors.title && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.title.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Experience Business Dropdown */}
              <div className="space-y-2">
                <Label
                  htmlFor="experienceBusiness"
                  className="text-sm font-medium"
                >
                  {tForm("experienceBusiness")}
                </Label>
                <Controller
                  name="experienceBusiness"
                  control={control}
                  rules={{
                    required: tForm("placeholders.experienceBusinessRequired"),
                  }}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger
                        className={cn(
                          "bg-gray-50",
                          errors.experienceBusiness && "border-red-500"
                        )}
                      >
                        <SelectValue
                          placeholder={tForm("placeholders.experienceBusiness")}
                        />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1-5">
                          {tForm("options.years1-5")}
                        </SelectItem>
                        <SelectItem value="6-10">
                          {tForm("options.years6-10")}
                        </SelectItem>
                        <SelectItem value="11-20">
                          {tForm("options.years11-20")}
                        </SelectItem>
                        <SelectItem value="20+">
                          {tForm("options.years20+")}
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.experienceBusiness && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.experienceBusiness.message}
                  </p>
                )}
              </div>

              {/* Your Message */}
              <div className="space-y-2">
                <Label htmlFor="message" className="text-sm font-medium">
                  {tForm("message")}
                </Label>
                <Textarea
                  id="message"
                  placeholder={tForm("placeholders.message")}
                  className={cn(
                    "bg-gray-50 min-h-[100px]",
                    errors.message && "border-red-500"
                  )}
                  {...register("message", {
                    required: tForm("placeholders.messageRequired"),
                    minLength: {
                      value: 10,
                      message: tForm("placeholders.messageMinLength"),
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
                className="w-full bg-peter hover:bg-peter-dark text-white h-10 text-base font-medium"
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

export default PharmacyRegForm;
