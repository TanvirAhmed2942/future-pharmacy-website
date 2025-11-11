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
import { useForm, Controller } from "react-hook-form";
import { cn } from "@/lib/utils";

function Test() {
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      otherSubject: "",
      message: "",
    },
  });

  const selectedSubject = watch("subject");

  const onSubmit = (data) => {
    console.log("Message sent:", data);
    // Handle form submission logic here
  };

  return (
    <section className="relative min-h-screen flex flex-col lg:flex-row ">
      {/* Layer 1: Blurred Background Image */}
      <div
        className="absolute inset-0 w-full h-full z-0  "
        style={{
          backgroundImage: `url("/test2.webp")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
          opacity: 0.4,
          //   filter: "blur(px)",
          //   WebkitFilter: "blur(4px)",
        }}
      />

      {/* Layer 2: Left Side with Sharp test.png and diagonal cut - Hidden on mobile */}
      <div className="hidden lg:block relative z-10 w-full lg:w-1/2 min-h-80 ">
        {/* Sharp image with diagonal cut */}
        <div
          className="absolute inset-0 w-full h-full "
          style={{
            clipPath: "polygon(0% 0%, 59% 0%, 100% 33%, 100% 100%, 0 100%)",
            backgroundImage: `url("/test9.png")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            imageResolution: "100% 100%",
            backgroundRepeat: "no-repeat",
          }}
        />
      </div>

      {/* Layer 3: Form Section - Right Side / Full Width on Mobile */}
      <div className="relative z-20 w-full lg:w-1/2 flex items-center justify-center min-h-screen lg:min-h-full py-8 sm:py-12 px-4 sm:px-6 lg:px-12">
        <div className="w-full max-w-lg sm:max-w-xl">
          <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 md:p-10">
            <div className="mb-6">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2 sm:mb-3">
                Send Us a Message
              </h2>
              <p className="text-gray-600 text-sm sm:text-base">
                We'd love to hear from you — get in touch anytime.
              </p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Name and Email Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="name"
                    className="text-sm sm:text-base font-medium"
                  >
                    Your Name
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your name here..."
                    className={cn(
                      "bg-gray-50 placeholder:text-xs sm:placeholder:text-[14px] h-10 sm:h-11 text-sm",
                      errors.name && "border-red-500"
                    )}
                    {...register("name", {
                      required: "Name is required",
                    })}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.name.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="email"
                    className="text-sm sm:text-base font-medium"
                  >
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email here..."
                    className={cn(
                      "bg-gray-50 placeholder:text-xs sm:placeholder:text-[14px] h-10 sm:h-11 text-sm",
                      errors.email && "border-red-500"
                    )}
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address",
                      },
                    })}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Phone and Subject Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="phone"
                    className="text-sm sm:text-base font-medium"
                  >
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="Enter phone number here..."
                    className={cn(
                      "bg-gray-50 placeholder:text-xs sm:placeholder:text-[14px] h-10 sm:h-11 text-sm",
                      errors.phone && "border-red-500"
                    )}
                    {...register("phone", {
                      required: false,
                      pattern: {
                        value:
                          /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
                        message: "Invalid phone number format",
                      },
                    })}
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.phone.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="subject"
                    className="text-sm sm:text-base font-medium"
                  >
                    Subject
                  </Label>
                  <Controller
                    name="subject"
                    control={control}
                    rules={{ required: "Subject is required" }}
                    render={({ field }) => (
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger
                          className={cn(
                            "bg-gray-50 placeholder:text-xs sm:placeholder:text-[14px] h-10 sm:h-11 text-xs sm:text-[14px]",
                            errors.subject && "border-red-500"
                          )}
                        >
                          <SelectValue placeholder="Select Subject" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="general">
                            General Inquiry
                          </SelectItem>
                          <SelectItem value="prescription">
                            Prescription Question
                          </SelectItem>
                          <SelectItem value="delivery">
                            Delivery Issue
                          </SelectItem>
                          <SelectItem value="partnership">
                            Partnership Opportunity
                          </SelectItem>
                          <SelectItem value="support">
                            Technical Support
                          </SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.subject && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.subject.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Other Subject Field (conditional) */}
              {selectedSubject === "other" && (
                <div className="space-y-2">
                  <Label
                    htmlFor="otherSubject"
                    className="text-sm sm:text-base font-medium"
                  >
                    Please Specify
                  </Label>
                  <Input
                    id="otherSubject"
                    type="text"
                    placeholder="Please specify your subject..."
                    className={cn(
                      "bg-gray-50 placeholder:text-xs sm:placeholder:text-[14px] h-10 sm:h-11 text-sm",
                      errors.otherSubject && "border-red-500"
                    )}
                    {...register("otherSubject", {
                      required:
                        selectedSubject === "other"
                          ? "Please specify your subject"
                          : false,
                    })}
                  />
                  {errors.otherSubject && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.otherSubject.message}
                    </p>
                  )}
                </div>
              )}

              {/* Message */}
              <div className="space-y-2">
                <Label
                  htmlFor="message"
                  className="text-sm sm:text-base font-medium"
                >
                  Your Message
                </Label>
                <Textarea
                  id="message"
                  placeholder="Type your message here..."
                  className={cn(
                    "bg-gray-50 placeholder:text-xs sm:placeholder:text-[14px] min-h-[100px] sm:min-h-[120px] resize-none text-sm",
                    errors.message && "border-red-500"
                  )}
                  rows={4}
                  {...register("message", {
                    required: "Message is required",
                    minLength: {
                      value: 10,
                      message: "Message should be at least 10 characters",
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
              <div className="flex justify-start pt-2">
                <Button
                  type="submit"
                  className="bg-[#8A4D9F] hover:bg-[#7A3D8F] text-white px-6 sm:px-10 py-3 sm:py-6 text-sm sm:text-base font-medium rounded-md transition-colors w-full sm:w-auto"
                >
                  Send Message
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Test;
