"use client";
import React from "react";
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
              Interest Form
            </CardTitle>
            <p className="text-gray-600 text-sm md:text-base max-w-6xl  mx-auto text-center ">
              Complete the Interest Form and we&apos;ll contact you to schedule
              for a brief onboarding call to walk you through the process
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Pharmacy Name and Pharmacy Address - Two Column Layout */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="pharmacyName" className="text-sm font-medium">
                    Pharmacy Name
                  </Label>
                  <Input
                    id="pharmacyName"
                    type="text"
                    placeholder="Enter your pharmacy name here..."
                    className={cn(
                      "bg-gray-50",
                      errors.pharmacyName && "border-red-500"
                    )}
                    {...register("pharmacyName", {
                      required: "Pharmacy name is required",
                      minLength: {
                        value: 2,
                        message: "Pharmacy name must be at least 2 characters",
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
                    Pharmacy Address
                  </Label>
                  <Input
                    id="pharmacyAddress"
                    type="text"
                    placeholder="Enter your pharmacy address here..."
                    className={cn(
                      "bg-gray-50",
                      errors.pharmacyAddress && "border-red-500"
                    )}
                    {...register("pharmacyAddress", {
                      required: "Pharmacy address is required",
                      minLength: {
                        value: 5,
                        message: "Address must be at least 5 characters",
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

              {/* Contact Person and Title - Two Column Layout */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="contactPerson"
                    className="text-sm font-medium"
                  >
                    Contact Person
                  </Label>
                  <Input
                    id="contactPerson"
                    type="text"
                    placeholder="Enter your contact person here..."
                    className={cn(
                      "bg-gray-50",
                      errors.contactPerson && "border-red-500"
                    )}
                    {...register("contactPerson", {
                      required: "Contact person is required",
                      minLength: {
                        value: 2,
                        message:
                          "Contact person name must be at least 2 characters",
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
                    Title
                  </Label>
                  <Input
                    id="title"
                    type="text"
                    placeholder="Enter your title here..."
                    className={cn(
                      "bg-gray-50",
                      errors.title && "border-red-500"
                    )}
                    {...register("title", {
                      required: "Title is required",
                      minLength: {
                        value: 2,
                        message: "Title must be at least 2 characters",
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
                  Years in Business
                </Label>
                <Controller
                  name="experienceBusiness"
                  control={control}
                  rules={{ required: "Experience business is required" }}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger
                        className={cn(
                          "bg-gray-50",
                          errors.experienceBusiness && "border-red-500"
                        )}
                      >
                        <SelectValue placeholder="Select your years in business here..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1-5">1-5 years</SelectItem>
                        <SelectItem value="6-10">6-10 years</SelectItem>
                        <SelectItem value="11-20">11-20 years</SelectItem>
                        <SelectItem value="20+">20+ years</SelectItem>
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
                  Your Message
                </Label>
                <Textarea
                  id="message"
                  placeholder="Type your message here..."
                  className={cn(
                    "bg-gray-50 min-h-[100px]",
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
                className="w-full bg-peter hover:bg-peter-dark text-white h-10 text-base font-medium"
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

export default PharmacyRegForm;
