"use client";
import React from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { useSubmitInterestInvestorMutation } from "@/store/Apis/businessApi/businessApi";
import useShowToast from "@/hooks/useShowToast";
import { Loader } from "lucide-react";

interface FormValues {
  fullName: string;
  emailAddress: string;
  phoneNumber: string;
  organizationName: string;
  website: string;
  organizationType: string;
  yearsOfInvestmentExperience: string;
  message: string;
}

function InvestorsInquiryForm() {
  const tInvestorsInquiryForm = useTranslations(
    "investors.investorsInquiryForm"
  );
  const tForm = useTranslations("investors.investorsInquiryForm.form");
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      fullName: "",
      emailAddress: "",
      phoneNumber: "",
      organizationName: "",
      website: "",
      organizationType: "",
      yearsOfInvestmentExperience: "",
      message: "",
    },
  });

  const [submitInterestInvestor, { isLoading }] =
    useSubmitInterestInvestorMutation();
  const { showSuccess, showError } = useShowToast();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      // Transform form data to match API format
      const submitData = {
        name: data.fullName,
        phone: data.phoneNumber,
        email: data.emailAddress,
        organizationName: data.organizationName,
        organizationType: data.organizationType,
        website: data.website,
        yearOfInvestmentExperience: data.yearsOfInvestmentExperience,
        message: data.message,
      };

      const response = await submitInterestInvestor(submitData).unwrap();

      if (response.success) {
        showSuccess({
          message:
            response.message || "Investor inquiry submitted successfully!",
        });
        // Reset form to initial state
        reset({
          fullName: "",
          emailAddress: "",
          phoneNumber: "",
          organizationName: "",
          website: "",
          organizationType: "",
          yearsOfInvestmentExperience: "",
          message: "",
        });
      } else {
        showError({
          message:
            response.error ||
            response.message ||
            "Failed to submit investor inquiry",
        });
      }
    } catch (error: unknown) {
      // Handle RTK Query error
      let errorMessage =
        "An error occurred while submitting the investor inquiry";

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
    <div className="relative min-h-screen flex items-center justify-center py-12 px-4 md:px-8 overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 w-full h-full z-0">
        <video
          autoPlay
          loop
          muted
          preload="auto"
          playsInline
          className="w-full h-full object-cover opacity-60 blur-[2px]"
        >
          <source src="/videos/investor.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {/* Overlay for better form readability */}
        <div className="absolute inset-0 bg-black/40 z-10"></div>
      </div>

      {/* Content Container - Centered */}
      <div className="relative z-20 w-full max-w-2xl mx-auto">
        {/* Page Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-center text-white mb-8 md:mb-12 drop-shadow-lg">
          {tInvestorsInquiryForm("Headline")}
        </h1>

        {/* Form Card */}
        <div id="bg video">
          <Card className="shadow-2xl bg-white opacity-85 backdrop-blur-sm">
            <CardHeader className="space-y-1 pb-6">
              <CardTitle className="text-2xl font-bold text-gray-900">
                {tForm("formTitle")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-6 relative"
              >
                {/* Full Name */}
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="text-sm font-medium">
                    {tForm("fullName")}
                  </Label>
                  <Input
                    id="fullName"
                    type="text"
                    placeholder={tForm("fullNamePlaceholder")}
                    className={cn(
                      "bg-gray-50",
                      errors.fullName && "border-red-500"
                    )}
                    {...register("fullName", {
                      required: tForm("fullNameRequired"),
                      minLength: {
                        value: 2,
                        message: tForm("fullNameMinLength"),
                      },
                    })}
                  />
                  {errors.fullName && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.fullName.message}
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
                    placeholder={tForm("emailAddressPlaceholder")}
                    className={cn(
                      "bg-gray-50",
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

                {/* Phone Number */}
                <div className="space-y-2">
                  <Label htmlFor="phoneNumber" className="text-sm font-medium">
                    {tForm("phoneNumber")}
                  </Label>
                  <Input
                    id="phoneNumber"
                    type="tel"
                    placeholder={tForm("phoneNumberPlaceholder")}
                    className={cn(
                      "bg-gray-50",
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

                {/* Organization Name and Organization Type - Two Column Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor="organizationName"
                      className="text-sm font-medium"
                    >
                      {tForm("organizationName")}
                    </Label>
                    <Input
                      id="organizationName"
                      type="text"
                      placeholder={tForm("organizationNamePlaceholder")}
                      className={cn(
                        "bg-gray-50",
                        errors.organizationName && "border-red-500"
                      )}
                      {...register("organizationName", {
                        required: tForm("organizationNameRequired"),
                        minLength: {
                          value: 2,
                          message: tForm("organizationNameMinLength"),
                        },
                      })}
                    />
                    {errors.organizationName && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.organizationName.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="organizationType"
                      className="text-sm font-medium"
                    >
                      {tForm("organizationType")}
                    </Label>
                    <Input
                      id="organizationType"
                      type="text"
                      placeholder={tForm("organizationTypePlaceholder")}
                      className={cn(
                        "bg-gray-50",
                        errors.organizationType && "border-red-500"
                      )}
                      {...register("organizationType", {
                        required: tForm("organizationTypeRequired"),
                        minLength: {
                          value: 2,
                          message: tForm("organizationTypeMinLength"),
                        },
                      })}
                    />
                    {errors.organizationType && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.organizationType.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Website and Years of Investment Experience - Two Column Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="website" className="text-sm font-medium">
                      {tForm("website")}
                    </Label>
                    <Input
                      id="website"
                      type="url"
                      placeholder={tForm("websitePlaceholder")}
                      className={cn(
                        "bg-gray-50",
                        errors.website && "border-red-500"
                      )}
                      {...register("website", {
                        pattern: {
                          value:
                            /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
                          message: tForm("websiteInvalid"),
                        },
                      })}
                    />
                    {errors.website && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.website.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="yearsOfInvestmentExperience"
                      className="text-sm font-medium"
                    >
                      {tForm("yearsOfInvestmentExperience")}
                    </Label>
                    <Controller
                      name="yearsOfInvestmentExperience"
                      control={control}
                      rules={{
                        required: tForm("yearsOfInvestmentExperienceRequired"),
                      }}
                      render={({ field }) => (
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger
                            className={cn(
                              "bg-gray-50 text-[14px]",
                              errors.yearsOfInvestmentExperience &&
                              "border-red-500"
                            )}
                          >
                            <SelectValue
                              placeholder={tForm(
                                "yearsOfInvestmentExperiencePlaceholder"
                              )}
                            />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1-3">
                              1-3 {tForm("years")}
                            </SelectItem>
                            <SelectItem value="4-7">
                              4-7 {tForm("years")}
                            </SelectItem>
                            <SelectItem value="8-12">
                              8-12 {tForm("years")}
                            </SelectItem>
                            <SelectItem value="12+">
                              12+ {tForm("years")}
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                    {errors.yearsOfInvestmentExperience && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.yearsOfInvestmentExperience.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Your Message */}
                <div className="space-y-2">
                  <Label htmlFor="message" className="text-sm font-medium">
                    {tForm("message")}
                  </Label>
                  <Textarea
                    id="message"
                    placeholder={tForm("messagePlaceholder")}
                    className={cn(
                      "bg-gray-50 min-h-[120px] resize-none",
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
                  disabled={isLoading}
                  className="w-full bg-peter hover:bg-peter-dark text-white h-10 text-base font-medium cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? <><p className="flex items-center justify-center gap-2">Submitting...<Loader className="animate-spin size-4 text-white" /></p></> : tForm("submitButton")}
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
    </div>
  );
}

export default InvestorsInquiryForm;
