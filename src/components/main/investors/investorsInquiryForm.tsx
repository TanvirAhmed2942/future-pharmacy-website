"use client";
import React from "react";
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
  const {
    register,
    handleSubmit,
    control,
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
          Complete form to express interest
        </h1>

        {/* Form Card */}
        <div id="bg video">
          <Card className="shadow-2xl bg-white/95 backdrop-blur-sm">
            <CardHeader className="space-y-1 pb-6">
              <CardTitle className="text-2xl font-bold text-gray-900">
                Inquiry Form
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Full Name */}
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="text-sm font-medium">
                    Full Name
                  </Label>
                  <Input
                    id="fullName"
                    type="text"
                    placeholder="Enter your name here..."
                    className={cn(
                      "bg-gray-50",
                      errors.fullName && "border-red-500"
                    )}
                    {...register("fullName", {
                      required: "Full name is required",
                      minLength: {
                        value: 2,
                        message: "Full name must be at least 2 characters",
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
                    Email Address
                  </Label>
                  <Input
                    id="emailAddress"
                    type="email"
                    placeholder="Enter your email address here..."
                    className={cn(
                      "bg-gray-50",
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

                {/* Phone Number */}
                <div className="space-y-2">
                  <Label htmlFor="phoneNumber" className="text-sm font-medium">
                    Phone Number
                  </Label>
                  <Input
                    id="phoneNumber"
                    type="tel"
                    placeholder="Enter your phone number here..."
                    className={cn(
                      "bg-gray-50",
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

                {/* Organization Name and Organization Type - Two Column Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor="organizationName"
                      className="text-sm font-medium"
                    >
                      Organization Name
                    </Label>
                    <Input
                      id="organizationName"
                      type="text"
                      placeholder="Enter your organization name here..."
                      className={cn(
                        "bg-gray-50",
                        errors.organizationName && "border-red-500"
                      )}
                      {...register("organizationName", {
                        required: "Organization name is required",
                        minLength: {
                          value: 2,
                          message:
                            "Organization name must be at least 2 characters",
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
                      Organization Type
                    </Label>
                    <Input
                      id="organizationType"
                      type="text"
                      placeholder="Enter your organization type here..."
                      className={cn(
                        "bg-gray-50",
                        errors.organizationType && "border-red-500"
                      )}
                      {...register("organizationType", {
                        required: "Organization type is required",
                        minLength: {
                          value: 2,
                          message:
                            "Organization type must be at least 2 characters",
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
                      Website (optional)
                    </Label>
                    <Input
                      id="website"
                      type="url"
                      placeholder="Enter your website here..."
                      className={cn(
                        "bg-gray-50",
                        errors.website && "border-red-500"
                      )}
                      {...register("website", {
                        pattern: {
                          value:
                            /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
                          message: "Invalid website URL format",
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
                      Years of Investment Experience
                    </Label>
                    <Controller
                      name="yearsOfInvestmentExperience"
                      control={control}
                      rules={{
                        required: "Years of investment experience is required",
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
                            <SelectValue placeholder="Select investment experience" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1-3">1-3 years</SelectItem>
                            <SelectItem value="4-7">4-7 years</SelectItem>
                            <SelectItem value="8-12">8-12 years</SelectItem>
                            <SelectItem value="12+">12+ years</SelectItem>
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
                    Your Message
                  </Label>
                  <Textarea
                    id="message"
                    placeholder="Type your message here..."
                    className={cn(
                      "bg-gray-50 min-h-[120px] resize-none",
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
    </div>
  );
}

export default InvestorsInquiryForm;
