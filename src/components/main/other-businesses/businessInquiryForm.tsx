"use client";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

interface FormValues {
  name: string;
  emailAddress: string;
  phoneNumber: string;
  organizationName: string;
  organizationType: string;
  organizationWebsite: string;
  regionOfInterest: string;
  message: string;
}

function BusinessInquiryForm() {
  const tOtherBusinesses = useTranslations("otherBusinesses.businessInquiryForm");
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
      organizationName: "",
      organizationType: "",
      organizationWebsite: "",
      regionOfInterest: "",
      message: "",
    },
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log("Form submitted:", data);
    // Handle form submission logic here
  };

  return (
    <div className="bg-white py-10 px-4 md:px-8">
      <div className="max-w-2xl mx-auto">
        <Card className="border shadow-sm">
          <CardContent className="pt-6 pb-6">
            <h2 className="text-xl font-semibold text-center mb-6">
              {tOtherBusinesses("form.formTitle")}
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Name Field */}
              <div>
                <Label htmlFor="name" className="text-sm text-gray-700">
                  {tOtherBusinesses("form.fullName")}
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder={tOtherBusinesses("form.fullNamePlaceholder")}
                  className={cn(
                    "mt-1 bg-gray-50",
                    errors.name && "border-red-500"
                  )}
                  {...register("name", {
                    required: tOtherBusinesses("form.fullNameRequired"),
                    minLength: {
                      value: 2,
                      message: tOtherBusinesses("form.fullNameMinLength"),
                    },
                  })}
                />
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Email Address and Phone Number - Two Column Layout */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label
                    htmlFor="emailAddress"
                    className="text-sm text-gray-700"
                  >
                    {tOtherBusinesses("form.emailAddress")}
                  </Label>
                  <Input
                    id="emailAddress"
                    type="email"
                    placeholder={tOtherBusinesses("form.emailAddressPlaceholder")}
                    className={cn(
                      "mt-1 bg-gray-50",
                      errors.emailAddress && "border-red-500"
                    )}
                    {...register("emailAddress", {
                      required: tOtherBusinesses("form.emailAddressRequired"),
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: tOtherBusinesses("form.emailAddressInvalid"),
                      },
                    })}
                  />
                  {errors.emailAddress && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.emailAddress.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label
                    htmlFor="phoneNumber"
                    className="text-sm text-gray-700"
                  >
                    {tOtherBusinesses("form.phoneNumber")}
                  </Label>
                  <Input
                    id="phoneNumber"
                    type="tel"
                    placeholder={tOtherBusinesses("form.phoneNumberPlaceholder")}
                    className={cn(
                      "mt-1 bg-gray-50",
                      errors.phoneNumber && "border-red-500"
                    )}
                    {...register("phoneNumber", {
                      required: tOtherBusinesses("form.phoneNumberRequired"),
                      pattern: {
                        value:
                          /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
                        message: tOtherBusinesses("form.phoneNumberInvalid"),
                      },
                    })}
                  />
                  {errors.phoneNumber && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.phoneNumber.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Organization Name Field */}
              <div>
                <Label
                  htmlFor="organizationName"
                  className="text-sm text-gray-700"
                >
                  {tOtherBusinesses("form.organizationName")}
                </Label>
                <Input
                  id="organizationName"
                  type="text"
                  placeholder={tOtherBusinesses("form.organizationNamePlaceholder")}
                  className={cn(
                    "mt-1 bg-gray-50",
                    errors.organizationName && "border-red-500"
                  )}
                  {...register("organizationName", {
                    required: tOtherBusinesses("form.organizationNameRequired"),
                    minLength: {
                      value: 2,
                      message: tOtherBusinesses("form.organizationNameMinLength"),
                    },
                  })}
                />
                {errors.organizationName && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.organizationName.message}
                  </p>
                )}
              </div>

              {/* Organization Type Field */}
              <div>
                <Label
                  htmlFor="organizationType"
                  className="text-sm text-gray-700"
                >
                  {tOtherBusinesses("form.organizationType")}
                </Label>
                <Controller
                  name="organizationType"
                  control={control}
                  rules={{ required: tOtherBusinesses("form.organizationTypeRequired") }}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger
                        className={cn(
                          "mt-1 bg-gray-50 text-[14px]",
                          errors.organizationType && "border-red-500"
                        )}
                      >
                        <SelectValue placeholder={tOtherBusinesses("form.organizationTypePlaceholder")} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="employers">Employers</SelectItem>
                        <SelectItem value="health-plans">
                          Health Plans
                        </SelectItem>
                        <SelectItem value="providers-health-systems">
                          Providers/Health Systems
                        </SelectItem>
                        <SelectItem value="mocs">MOCs</SelectItem>
                        <SelectItem value="acos">ACOs</SelectItem>
                        <SelectItem value="others">Others</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.organizationType && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.organizationType.message}
                  </p>
                )}
              </div>

              {/* Add Organization Website Field */}
              <div>
                <Label
                  htmlFor="organizationWebsite"
                  className="text-sm text-gray-700"
                >
                  {tOtherBusinesses("form.website")}
                </Label>
                <Input
                  id="organizationWebsite"
                  type="url"
                  placeholder={tOtherBusinesses("form.websitePlaceholder")}
                  className={cn(
                    "mt-1 bg-gray-50",
                    errors.organizationWebsite && "border-red-500"
                  )}
                  {...register("organizationWebsite", {
                    pattern: {
                      value:
                        /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
                      message: tOtherBusinesses("form.websiteInvalid"),
                    },
                  })}
                />
                {errors.organizationWebsite && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.organizationWebsite.message}
                  </p>
                )}
              </div>

              {/* Region of Interest Field */}
              <div>
                <Label
                  htmlFor="regionOfInterest"
                  className="text-sm text-gray-700"
                >
                  {tOtherBusinesses("form.regionOfInterest")}
                </Label>
                <Input
                  id="regionOfInterest"
                  type="text"
                  placeholder={tOtherBusinesses("form.regionOfInterestPlaceholder")}
                  className={cn(
                    "mt-1 bg-gray-50",
                    errors.regionOfInterest && "border-red-500"
                  )}
                  {...register("regionOfInterest", {
                    required: tOtherBusinesses("form.regionOfInterestRequired"),
                    minLength: {
                      value: 2,
                      message: tOtherBusinesses("form.regionOfInterestMinLength"),
                    },
                  })}
                />
                {errors.regionOfInterest && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.regionOfInterest.message}
                  </p>
                )}
              </div>

              {/* Your Message Field */}
              <div>
                <Label htmlFor="message" className="text-sm text-gray-700">
                  {tOtherBusinesses("form.message")}
                </Label>
                <Textarea
                  id="message"
                  placeholder={tOtherBusinesses("form.messagePlaceholder")}
                  className={cn(
                    "mt-1 bg-gray-50 min-h-[100px]",
                    errors.message && "border-red-500"
                  )}
                  {...register("message", {
                    required: tOtherBusinesses("form.messageRequired"),
                    minLength: {
                      value: 10,
                      message: tOtherBusinesses("form.messageMinLength"),
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
                className="w-full bg-peter hover:bg-peter-dark text-white py-2 cursor-pointer"
              >
                {tOtherBusinesses("form.submitButton")}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default BusinessInquiryForm;
