"use client";
import React from "react";
import Image from "next/image";
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
  email: string;
  phone: string;
  subject: string;
  otherSubject: string;
  message: string;
}
function ManContactUs() {
  const t = useTranslations("home.formSection");
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
    <section
      className="relative min-h-screen flex flex-col lg:flex-row mt-8 lg:mt-28 "
      id="contact-us"
    >
      {/* Layer 1: Blurred Background Image */}
      <div
        className="absolute inset-0 w-full h-full z-0"
        style={{
          backgroundImage: `url("/test2.webp")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
          backgroundBlendMode: "multiply",
          backgroundColor: "rgba(0, 0, 0, 0.3)",
          opacity: 0.3,
          filter: "blur(4px)",
          WebkitFilter: "blur(4px)",
        }}
      />

      {/* Layer 2: Mobile Image - Visible on mobile, hidden on desktop */}
      <div className="lg:hidden relative z-10 w-full h-64 sm:h-80 md:h-96 overflow-hidden ">
        <Image
          src="/test9.png"
          alt="Contact form image"
          fill
          className="object-contain absolute inset-0 w-full h-full mt-4 ml-4 "
          style={{
            objectPosition: "center center",
            transform: "scale(0.9)",
          }}
          priority
          sizes="100vw"
        />
      </div>

      {/* Layer 3: Left Side with Sharp test.png and diagonal cut - Desktop only */}
      <div className="hidden lg:block relative z-10 w-full lg:w-1/2 min-h-screen overflow-hidden ">
        {/* Sharp image with diagonal cut using Next.js Image */}
        <div className="absolute inset-0 w-full h-full xl:ml-16 2xl:ml-20">
          <Image
            src="/test9.png"
            alt="Contact form image"
            fill
            className="object-cover absolute inset-0 w-full h-full lg:-ml-20 2xl:-ml-10"
            style={{
              objectPosition: "25% center",
            }}
            priority
            sizes="(max-width: 1024px) 0vw, (max-width: 1280px) 50vw, (max-width: 1536px) 50vw, 50vw"
          />
        </div>
      </div>

      {/* Layer 4: Form Section - Right Side / Full Width on Mobile */}
      <div className="relative z-20 w-full lg:w-1/2 flex items-start sm:items-center justify-center min-h-screen lg:min-h-full py-0 sm:py-4 lg:py-12 px-4 sm:px-6 lg:px-12 ">
        <div className="w-full max-w-lg sm:max-w-xl">
          <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 md:p-10">
            <div className="mb-6">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2 sm:mb-3">
                {t("formTitle")}
              </h2>
              <p className="text-gray-600 text-sm sm:text-base">
                {t("formDescription")}
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
                    {t("fullName")}
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder={t("fullNamePlaceholder")}
                    className={cn(
                      "bg-gray-50 placeholder:text-xs sm:placeholder:text-[14px] h-10 sm:h-11 text-sm",
                      errors.name && "border-red-500"
                    )}
                    {...register("name", {
                      required: t("fullNameRequired"),
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
                    {t("emailAddress")}
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder={t("emailAddressPlaceholder")}
                    className={cn(
                      "bg-gray-50 placeholder:text-xs sm:placeholder:text-[14px] h-10 sm:h-11 text-sm",
                      errors.email && "border-red-500"
                    )}
                    {...register("email", {
                      required: t("emailAddressRequired"),
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: t("emailAddressInvalid"),
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
                    {t("phoneNumber")}
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder={t("phoneNumberPlaceholder")}
                    className={cn(
                      "bg-gray-50 placeholder:text-xs sm:placeholder:text-[14px] h-10 sm:h-11 text-sm",
                      errors.phone && "border-red-500"
                    )}
                    {...register("phone", {
                      required: false,
                      pattern: {
                        value:
                          /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
                          message: t("phoneNumberInvalid"),
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
                    {t("subject")}
                  </Label>
                  <Controller
                    name="subject"
                    control={control}
                    rules={{ required: t("subjectRequired") }}
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
                          <SelectValue placeholder={t("subjectPlaceholder")} />
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
                    {t("otherspecify")}
                  </Label>
                  <Input
                    id="otherSubject"
                    type="text"
                    placeholder={t("otherspecifyPlaceholder")}
                    className={cn(
                      "bg-gray-50 placeholder:text-xs sm:placeholder:text-[14px] h-10 sm:h-11 text-sm",
                      errors.otherSubject && "border-red-500"
                    )}
                    {...register("otherSubject", {
                      required:
                        selectedSubject === "other"
                          ? t("otherspecifyRequired")
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
                  {t("message")}
                </Label>
                <Textarea
                  id="message"
                  placeholder={t("messagePlaceholder")}
                  className={cn(
                    "bg-gray-50 placeholder:text-xs sm:placeholder:text-[14px] min-h-[100px] sm:min-h-[120px] resize-none text-sm",
                    errors.message && "border-red-500"
                  )}
                  rows={4}
                  {...register("message", {
                    required: t("messageRequired"),
                    minLength: {
                      value: 10,
                      message: t("messageMinLength"),
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
                  {t("submitButton")}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ManContactUs;
