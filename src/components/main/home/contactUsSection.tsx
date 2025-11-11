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
  email: string;
  phone: string;
  subject: string;
  otherSubject?: string;
  message: string;
}

function ContactUsSection() {
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<FormValues>({
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

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log("Message sent:", data);
    // Handle form submission logic here
  };

  return (
    <section className="  py-8 md:py-16">
      <div className="container mx-auto px-4 md:px-4">
        {/* Send Us a Message Form */}
        <div id="contact-us" className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-peter mb-8">
            Send Us a Message
          </h2>

          <Card className="shadow-lg p-2 border-gray-200 bg-white ">
            <CardContent className="p-6">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Name and Email Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-base font-medium">
                      Your Name
                    </Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Enter your name here..."
                      className={cn(
                        "bg-gray-50 placeholder:text-[14px] h-11",
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
                    <Label htmlFor="email" className="text-base font-medium">
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email here..."
                      className={cn(
                        "bg-gray-50 placeholder:text-[14px] h-11",
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-base font-medium">
                      Phone Number
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="Enter phone number here..."
                      className={cn(
                        "bg-gray-50 placeholder:text-[14px] h-11",
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
                    <Label htmlFor="subject" className="text-base font-medium">
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
                              "bg-gray-50 placeholder:text-[14px] h-11 text-[14px]",
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
                      className="text-base font-medium"
                    >
                      Please Specify
                    </Label>
                    <Input
                      id="otherSubject"
                      type="text"
                      placeholder="Please specify your subject..."
                      className={cn(
                        "bg-gray-50 placeholder:text-[14px] h-11",
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
                  <Label htmlFor="message" className="text-base font-medium">
                    Your Message
                  </Label>
                  <Textarea
                    id="message"
                    placeholder="Type your message here..."
                    className={cn(
                      "bg-gray-50 placeholder:text-[14px] min-h-[120px] resize-none",
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
                <div className="flex justify-center ">
                  <Button
                    type="submit"
                    className="bg-peter hover:bg-peter-dark text-white px-8 py-4 text-base font-medium"
                  >
                    Send Message
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

export default ContactUsSection;
