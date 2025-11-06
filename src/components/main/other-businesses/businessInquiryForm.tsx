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
              Business Inquiry Form
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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

              {/* Email Address and Phone Number - Two Column Layout */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label
                    htmlFor="emailAddress"
                    className="text-sm text-gray-700"
                  >
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
                <div>
                  <Label
                    htmlFor="phoneNumber"
                    className="text-sm text-gray-700"
                  >
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
              </div>

              {/* Organization Name Field */}
              <div>
                <Label
                  htmlFor="organizationName"
                  className="text-sm text-gray-700"
                >
                  Organization name
                </Label>
                <Input
                  id="organizationName"
                  type="text"
                  placeholder="Select your organization name..."
                  className={cn(
                    "mt-1 bg-gray-50",
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

              {/* Organization Type Field */}
              <div>
                <Label
                  htmlFor="organizationType"
                  className="text-sm text-gray-700"
                >
                  Organization Type
                </Label>
                <Controller
                  name="organizationType"
                  control={control}
                  rules={{ required: "Organization type is required" }}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger
                        className={cn(
                          "mt-1 bg-gray-50 text-[14px]",
                          errors.organizationType && "border-red-500"
                        )}
                      >
                        <SelectValue placeholder="Enter your organization type here..." />
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
                  Add Organization Website
                </Label>
                <Input
                  id="organizationWebsite"
                  type="url"
                  placeholder="Add your organization website name..."
                  className={cn(
                    "mt-1 bg-gray-50",
                    errors.organizationWebsite && "border-red-500"
                  )}
                  {...register("organizationWebsite", {
                    pattern: {
                      value:
                        /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
                      message: "Invalid website URL format",
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
                  Region of Interest <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="regionOfInterest"
                  type="text"
                  placeholder="e.g., NJ, NY Metro, PA"
                  className={cn(
                    "mt-1 bg-gray-50",
                    errors.regionOfInterest && "border-red-500"
                  )}
                  {...register("regionOfInterest", {
                    required: "Region of interest is required",
                    minLength: {
                      value: 2,
                      message:
                        "Region of interest must be at least 2 characters",
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
                className="w-full bg-peter hover:bg-peter-dark text-white py-2 cursor-pointer"
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

export default BusinessInquiryForm;
