"use client";
import React from "react";
import Image from "next/image";
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
import { useSubmitInterestOtherBusinessMutation } from "@/store/Apis/businessApi/businessApi";
import useShowToast from "@/hooks/useShowToast";

interface FormValues {
  name: string;
  emailAddress: string;
  phoneNumber: string;
  organizationName: string;
  organizationType: string;
  otherOrganizationType: string;
  organizationWebsite: string;
  regionOfInterest: string;
  message: string;
}

function BusinessInquiryForm() {
  const tOtherBusinesses = useTranslations(
    "otherBusinesses.businessInquiryForm"
  );
  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      name: "",
      emailAddress: "",
      phoneNumber: "",
      organizationName: "",
      organizationType: "",
      otherOrganizationType: "",
      organizationWebsite: "",
      regionOfInterest: "",
      message: "",
    },
  });

  const selectedOrganizationType = watch("organizationType");

  const [submitInterestOtherBusiness, { isLoading }] =
    useSubmitInterestOtherBusinessMutation();
  const { showSuccess, showError } = useShowToast();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      // Transform form data to match API format
      // If "others" is selected, use the value from otherOrganizationType
      const organizationType =
        data.organizationType === "others"
          ? data.otherOrganizationType
          : data.organizationType;

      const submitData = {
        name: data.name,
        phone: data.phoneNumber,
        email: data.emailAddress,
        organizationName: data.organizationName,
        organizationType: organizationType,
        organizationWebsite: data.organizationWebsite,
        region: data.regionOfInterest,
        message: data.message,
      };

      const response = await submitInterestOtherBusiness(submitData).unwrap();

      if (response.success) {
        showSuccess({
          message:
            response.message || "Business inquiry submitted successfully!",
        });
        // Reset form to initial state
        reset({
          name: "",
          emailAddress: "",
          phoneNumber: "",
          organizationName: "",
          organizationType: "",
          otherOrganizationType: "",
          organizationWebsite: "",
          regionOfInterest: "",
          message: "",
        });
      } else {
        showError({
          message:
            response.error ||
            response.message ||
            "Failed to submit business inquiry",
        });
      }
    } catch (error: unknown) {
      // Handle RTK Query error
      let errorMessage =
        "An error occurred while submitting the business inquiry";

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
          className="w-full h-full object-cover scale-110 opacity-60 blur-[2px]"
        >
          <source src="/videos/other_business.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {/* Overlay for better form readability */}
        <div className="absolute inset-0 bg-black/40 z-10"></div>
      </div>

      {/* Content Container - Centered */}
      <div className="relative z-20 w-full max-w-2xl mx-auto">
        <Card className="border shadow-2xl bg-white opacity-85 backdrop-blur-sm">
          <CardContent className="pt-6 pb-6">
            <h2 className="text-xl font-semibold text-center mb-6">
              {tOtherBusinesses("form.formTitle")}
            </h2>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-4 relative"
            >
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
                    placeholder={tOtherBusinesses(
                      "form.emailAddressPlaceholder"
                    )}
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
                    placeholder={tOtherBusinesses(
                      "form.phoneNumberPlaceholder"
                    )}
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
                  placeholder={tOtherBusinesses(
                    "form.organizationNamePlaceholder"
                  )}
                  className={cn(
                    "mt-1 bg-gray-50",
                    errors.organizationName && "border-red-500"
                  )}
                  {...register("organizationName", {
                    required: tOtherBusinesses("form.organizationNameRequired"),
                    minLength: {
                      value: 2,
                      message: tOtherBusinesses(
                        "form.organizationNameMinLength"
                      ),
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
                  rules={{
                    required: tOtherBusinesses("form.organizationTypeRequired"),
                  }}
                  render={({ field }) => (
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                        // Clear otherOrganizationType when switching away from "others"
                        if (value !== "others") {
                          setValue("otherOrganizationType", "");
                        }
                      }}
                      value={field.value}
                    >
                      <SelectTrigger
                        className={cn(
                          "mt-1 bg-gray-50 text-[14px]",
                          errors.organizationType && "border-red-500"
                        )}
                      >
                        <SelectValue
                          placeholder={tOtherBusinesses(
                            "form.organizationTypePlaceholder"
                          )}
                        />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="employers">Employers</SelectItem>
                        <SelectItem value="health-plans">
                          Health Plans
                        </SelectItem>
                        <SelectItem value="providers-health-systems">
                          Providers/Health Systems
                        </SelectItem>
                        <SelectItem value="mcos">Health Plans/MCOs</SelectItem>
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

              {/* Other Organization Type Field - Only shown when "others" is selected */}
              {selectedOrganizationType === "others" && (
                <div>
                  <Label
                    htmlFor="otherOrganizationType"
                    className="text-sm text-gray-700"
                  >
                    {tOtherBusinesses("form.specifyOther") || "Please specify"}
                  </Label>
                  <Input
                    id="otherOrganizationType"
                    type="text"
                    placeholder={
                      tOtherBusinesses("form.specifyOtherPlaceholder") ||
                      "Enter organization type..."
                    }
                    className={cn(
                      "mt-1 bg-gray-50",
                      errors.otherOrganizationType && "border-red-500"
                    )}
                    {...register("otherOrganizationType", {
                      required:
                        selectedOrganizationType === "others"
                          ? tOtherBusinesses("form.specifyOtherRequired") ||
                            "Please specify the organization type"
                          : false,
                      minLength: {
                        value: 2,
                        message:
                          tOtherBusinesses("form.specifyOtherMinLength") ||
                          "Must be at least 2 characters",
                      },
                    })}
                  />
                  {errors.otherOrganizationType && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.otherOrganizationType.message}
                    </p>
                  )}
                </div>
              )}

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
                  placeholder={tOtherBusinesses(
                    "form.regionOfInterestPlaceholder"
                  )}
                  className={cn(
                    "mt-1 bg-gray-50",
                    errors.regionOfInterest && "border-red-500"
                  )}
                  {...register("regionOfInterest", {
                    required: tOtherBusinesses("form.regionOfInterestRequired"),
                    minLength: {
                      value: 2,
                      message: tOtherBusinesses(
                        "form.regionOfInterestMinLength"
                      ),
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
                disabled={isLoading}
                className="w-full bg-peter hover:bg-peter-dark text-white py-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading
                  ? "Submitting..."
                  : tOtherBusinesses("form.submitButton")}
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

export default BusinessInquiryForm;
