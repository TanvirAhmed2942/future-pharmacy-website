"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronDownIcon } from "lucide-react";
import { cn } from "@/lib/utils";

import React, { useState } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { useTranslations } from "next-intl";
import CalendarModal from "./calendarModal";
import Backbutton from "@/components/common/backbutton/backbutton";
import Image from "next/image";

type FormValues = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  dateOfBirth: Date | undefined; // Renamed from date to dateOfBirth

  // Pharmacy details
  pharmacyName: string;
  pharmacyPhone: string;
  pharmacyAddress: string;
  pharmacyCity: string;
  pharmacyState: string;
  pharmacyZipCode: string;

  // Service type
  serviceCategory: string;
  serviceType: string;
  otherService: string;
  otherVaccination: string;
  otherHealthScreening: string;

  // Appointment details
  appointmentDate: string;
  appointmentTime: string;
  appointmentAllTimes: string[];

  // Additional info
  notes: string;
  consent: boolean;
};

function ScheduleOnline() {
  const t = useTranslations("scheduleOnline");
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<FormValues>({
    defaultValues: {
      firstName: "",
      lastName: "",
      phoneNumber: "",
      dateOfBirth: undefined,
      pharmacyName: "",
      pharmacyPhone: "",
      pharmacyAddress: "",
      pharmacyCity: "",
      pharmacyState: "",
      pharmacyZipCode: "",
      serviceCategory: "",
      serviceType: "",
      otherService: "",
      otherVaccination: "",
      otherHealthScreening: "",
      appointmentDate: "",
      appointmentTime: "",
      appointmentAllTimes: [],
      notes: "",
      consent: false,
    },
  });

  // State for calendar modal
  const [isCalendarModalOpen, setIsCalendarModalOpen] = useState(false);

  // Watch the service category to update available options in second dropdown
  const selectedCategory = watch("serviceCategory");
  const selectedServiceType = watch("serviceType");
  const [selectedAppointmentDates, setSelectedAppointmentDates] = useState<
    Array<{ date: string; times: string[] }>
  >([]);

  // Reset service type and other service when category changes
  React.useEffect(() => {
    if (selectedCategory) {
      setValue("serviceType", "");
      setValue("otherService", "");
      setValue("otherVaccination", "");
      setValue("otherHealthScreening", "");
    }
  }, [selectedCategory, setValue]);

  // Reset otherVaccination when serviceType changes
  React.useEffect(() => {
    if (selectedServiceType && selectedServiceType !== "vaccinations_others") {
      setValue("otherVaccination", "");
    }
  }, [selectedServiceType, setValue]);

  // Reset otherHealthScreening when serviceType changes
  React.useEffect(() => {
    if (
      selectedServiceType &&
      selectedServiceType !== "health_screenings_others"
    ) {
      setValue("otherHealthScreening", "");
    }
  }, [selectedServiceType, setValue]);

  const handleSelectDateTime = (
    selectedDates: Array<{ date: string; times: string[] }>
  ) => {
    setValue(
      "appointmentDates" as keyof FormValues,
      selectedDates as unknown as FormValues[keyof FormValues]
    );
    setSelectedAppointmentDates(selectedDates);
    setIsCalendarModalOpen(false);
  };

  const handleRemoveDate = (dateToRemove: string) => {
    const updatedDates = selectedAppointmentDates.filter(
      (item) => item.date !== dateToRemove
    );
    setValue(
      "appointmentDates" as keyof FormValues,
      updatedDates as unknown as FormValues[keyof FormValues]
    );
    setSelectedAppointmentDates(updatedDates);
  };

  const handleRemoveTime = (date: string, timeToRemove: string) => {
    const updatedDates = selectedAppointmentDates
      .map((item) => {
        if (item.date === date) {
          const updatedTimes = item.times.filter(
            (time) => time !== timeToRemove
          );
          if (updatedTimes.length === 0) {
            return null; // Remove date if no times left
          }
          return { ...item, times: updatedTimes };
        }
        return item;
      })
      .filter(
        (item): item is { date: string; times: string[] } => item !== null
      );
    setValue(
      "appointmentDates" as keyof FormValues,
      updatedDates as unknown as FormValues[keyof FormValues]
    );
    setSelectedAppointmentDates(updatedDates);
  };

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);
    // Process form submission
  };

  return (
    <div className=" relative container mx-auto bg-white  mb-6">
      <div className="max-w-3xl mx-auto">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6 md:space-y-8 px-4"
        >
          <div className="flex  items-center justify-center mt-2 mb-4 lg:-mt-8 lg:mb-8 ">
            <Backbutton />
            <h2 className="text-2xl lg:text-3xl font-bold text-center text-peter font-inter mx-auto">
              {t("pageTitle")}
            </h2>
          </div>

          {/* Profile Info Section */}
          <div className="bg-white rounded-lg border p-6 shadow-sm">
            <h3 className="text-lg font-medium text-peter mb-4">
              {t("profileInfo.title")}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <Label
                  htmlFor="firstName"
                  className="text-sm font-medium text-gray-700"
                >
                  {t("profileInfo.firstName")} *
                </Label>
                <Input
                  type="text"
                  id="firstName"
                  {...register("firstName", {
                    required: t("profileInfo.firstNameRequired"),
                  })}
                  placeholder={t("profileInfo.firstNamePlaceholder")}
                  className={cn(
                    "w-full mt-1",
                    errors.firstName && "border-red-500"
                  )}
                />
                {errors.firstName && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.firstName.message}
                  </p>
                )}
              </div>
              <div>
                <Label
                  htmlFor="lastName"
                  className="text-sm font-medium text-gray-700"
                >
                  {t("profileInfo.lastName")} *
                </Label>
                <Input
                  type="text"
                  id="lastName"
                  {...register("lastName", {
                    required: t("profileInfo.lastNameRequired"),
                  })}
                  placeholder={t("profileInfo.lastNamePlaceholder")}
                  className={cn(
                    "w-full mt-1",
                    errors.lastName && "border-red-500"
                  )}
                />
                {errors.lastName && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.lastName.message}
                  </p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label
                  htmlFor="phoneNumber"
                  className="text-sm font-medium text-gray-700"
                >
                  {t("profileInfo.phoneNumber")} *
                </Label>
                <Input
                  type="tel"
                  id="phoneNumber"
                  {...register("phoneNumber", {
                    required: t("profileInfo.phoneNumberRequired"),
                    pattern: {
                      value:
                        /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
                      message: t("profileInfo.phoneNumberInvalid"),
                    },
                  })}
                  placeholder={t("profileInfo.phoneNumberPlaceholder")}
                  className={cn(
                    "w-full mt-1",
                    errors.phoneNumber && "border-red-500"
                  )}
                />
                {errors.phoneNumber && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.phoneNumber.message}
                  </p>
                )}
              </div>
              <div>
                <Label
                  htmlFor="dateOfBirth"
                  className="text-sm font-medium text-gray-700"
                >
                  {t("profileInfo.dateOfBirth")} *
                </Label>
                <Controller
                  control={control}
                  name="dateOfBirth"
                  rules={{ required: t("profileInfo.dateOfBirthRequired") }}
                  render={({ field }) => (
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          id="dateOfBirth"
                          variant={"outline"}
                          className={cn(
                            "w-full mt-1 justify-between font-normal",
                            !field.value && "text-muted-foreground",
                            errors.dateOfBirth && "border-red-500"
                          )}
                        >
                          {field.value ? (
                            // Format the date as MM/DD/YYYY
                            `${(field.value.getMonth() + 1)
                              .toString()
                              .padStart(2, "0")}/${field.value
                              .getDate()
                              .toString()
                              .padStart(2, "0")}/${field.value.getFullYear()}`
                          ) : (
                            <span>
                              {t("profileInfo.dateOfBirthPlaceholder")}
                            </span>
                          )}
                          <ChevronDownIcon className="h-4 w-4 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={(date) => {
                            // Prevent future dates
                            if (date && date <= new Date()) {
                              field.onChange(date);
                            }
                          }}
                          captionLayout="dropdown"
                          fromYear={1900}
                          toYear={new Date().getFullYear()}
                          disabled={(date) => date > new Date()}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  )}
                />
                {errors.dateOfBirth && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.dateOfBirth.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Pharmacy Information Section */}
          <div className="bg-white rounded-lg border p-6 shadow-sm">
            <h3 className="text-lg font-medium text-peter mb-4">
              {t("pharmacyInformation.title")}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <Label
                  htmlFor="pharmacyName"
                  className="text-sm font-medium text-gray-700"
                >
                  {t("pharmacyInformation.pharmacyName")} *
                </Label>
                <Input
                  type="text"
                  id="pharmacyName"
                  {...register("pharmacyName", {
                    required: t("pharmacyInformation.pharmacyNameRequired"),
                  })}
                  placeholder={t("pharmacyInformation.pharmacyNamePlaceholder")}
                  className={cn(
                    "w-full mt-1",
                    errors.pharmacyName && "border-red-500"
                  )}
                />
                {errors.pharmacyName && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.pharmacyName.message}
                  </p>
                )}
              </div>
              <div>
                <Label
                  htmlFor="pharmacyPhone"
                  className="text-sm font-medium text-gray-700"
                >
                  {t("pharmacyInformation.pharmacyPhone")}
                </Label>
                <Input
                  type="tel"
                  id="pharmacyPhone"
                  {...register("pharmacyPhone", {
                    pattern: {
                      value:
                        /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
                      message: t("pharmacyInformation.pharmacyPhoneInvalid"),
                    },
                  } as const)}
                  placeholder={t(
                    "pharmacyInformation.pharmacyPhonePlaceholder"
                  )}
                  className="w-full mt-1"
                />
              </div>
            </div>
            <div className="mb-4">
              <Label
                htmlFor="pharmacyAddress"
                className="text-sm font-medium text-gray-700"
              >
                {t("pharmacyInformation.pharmacyAddress")} *
              </Label>
              <Input
                type="text"
                id="pharmacyAddress"
                {...register("pharmacyAddress", {
                  required: t("pharmacyInformation.pharmacyAddressRequired"),
                })}
                placeholder={t(
                  "pharmacyInformation.pharmacyAddressPlaceholder"
                )}
                className={cn(
                  "w-full mt-1",
                  errors.pharmacyAddress && "border-red-500"
                )}
              />
              {errors.pharmacyAddress && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.pharmacyAddress.message}
                </p>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <Label
                  htmlFor="pharmacyCity"
                  className="text-sm font-medium text-gray-700"
                >
                  {t("pharmacyInformation.city")}
                </Label>
                <Input
                  type="text"
                  id="pharmacyCity"
                  {...register("pharmacyCity", {
                    required: false,
                  })}
                  placeholder={t("pharmacyInformation.cityPlaceholder")}
                  className="w-full mt-1"
                />
              </div>
              <div>
                <Label
                  htmlFor="pharmacyState"
                  className="text-sm font-medium text-gray-700"
                >
                  {t("pharmacyInformation.state")}
                </Label>
                <Input
                  type="text"
                  id="pharmacyState"
                  {...register("pharmacyState", {
                    required: false,
                  })}
                  placeholder={t("pharmacyInformation.statePlaceholder")}
                  className="w-full mt-1"
                />
              </div>
              <div>
                <Label
                  htmlFor="pharmacyZipCode"
                  className="text-sm font-medium text-gray-700"
                >
                  {t("pharmacyInformation.zipCode")}
                </Label>
                <Input
                  type="text"
                  id="pharmacyZipCode"
                  {...register("pharmacyZipCode", {
                    required: false,
                  })}
                  placeholder={t("pharmacyInformation.zipCodePlaceholder")}
                  className="w-full mt-1"
                />
              </div>
            </div>

            {/* Service Category Dropdown */}
            <div className="mb-4">
              <Label
                htmlFor="serviceCategory"
                className="text-sm font-medium text-gray-700"
              >
                {t("services.serviceCategory.label")}
              </Label>
              <Controller
                control={control}
                name="serviceCategory"
                rules={{ required: t("services.serviceCategory.required") }}
                render={({ field }) => (
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger
                      className={cn(
                        "w-full mt-1 h-10 text-[14px]",
                        errors.serviceCategory && "border-red-500"
                      )}
                    >
                      <SelectValue
                        placeholder={t("services.serviceCategory.placeholder")}
                      />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="vaccinations">
                        {t("services.serviceCategory.vaccinations")}
                      </SelectItem>
                      <SelectItem value="health_screenings">
                        {t("services.serviceCategory.health_screenings")}
                      </SelectItem>
                      <SelectItem value="service_type_others">
                        {t("services.serviceCategory.others")}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.serviceCategory && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.serviceCategory.message}
                </p>
              )}
            </div>

            {/* Specific Service Dropdown - Conditionally shown based on category */}
            {selectedCategory && selectedCategory !== "service_type_others" && (
              <div className="mb-4">
                <Label
                  htmlFor="serviceType"
                  className="text-sm font-medium text-gray-700"
                >
                  {selectedCategory === "vaccinations"
                    ? t("services.serviceType.vaccinations.label")
                    : t("services.serviceType.health_screenings.label")}
                </Label>
                <Controller
                  control={control}
                  name="serviceType"
                  rules={{
                    required:
                      selectedCategory === "vaccinations"
                        ? t("services.serviceType.vaccinations.required")
                        : t("services.serviceType.health_screenings.required"),
                  }}
                  render={({ field }) => (
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger
                        className={cn(
                          "w-full mt-1 h-10 text-[14px]",
                          errors.serviceType && "border-red-500"
                        )}
                      >
                        <SelectValue
                          placeholder={
                            selectedCategory === "vaccinations"
                              ? t(
                                  "services.serviceType.vaccinations.placeholder"
                                )
                              : t(
                                  "services.serviceType.health_screenings.placeholder"
                                )
                          }
                        />
                      </SelectTrigger>
                      <SelectContent>
                        {selectedCategory === "vaccinations" ? (
                          <>
                            <SelectItem value="flu">
                              {t("services.serviceType.vaccinations.flu")}
                            </SelectItem>
                            <SelectItem value="covid">
                              {t("services.serviceType.vaccinations.covid")}
                            </SelectItem>
                            <SelectItem value="shingles">
                              {t("services.serviceType.vaccinations.shingles")}
                            </SelectItem>
                            <SelectItem value="vaccinations_others">
                              {t("services.serviceType.vaccinations.others")}
                            </SelectItem>
                          </>
                        ) : (
                          <>
                            <SelectItem value="blood_pressure">
                              {t(
                                "services.serviceType.health_screenings.blood_pressure"
                              )}
                            </SelectItem>
                            <SelectItem value="cholesteric">
                              {t(
                                "services.serviceType.health_screenings.cholesteric"
                              )}
                            </SelectItem>
                            <SelectItem value="diabetes">
                              {t(
                                "services.serviceType.health_screenings.diabetes"
                              )}
                            </SelectItem>
                            <SelectItem value="health_screenings_others">
                              {t(
                                "services.serviceType.health_screenings.others"
                              )}
                            </SelectItem>
                          </>
                        )}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.serviceType && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.serviceType.message}
                  </p>
                )}
              </div>
            )}

            {/* Other Vaccination Input - Shown when "vaccinations_others" is selected */}
            {selectedCategory === "vaccinations" &&
              selectedServiceType === "vaccinations_others" && (
                <div className="mb-4">
                  <Label
                    htmlFor="otherVaccination"
                    className="text-sm font-medium text-gray-700"
                  >
                    {t("services.serviceType.otherVaccination.label")} *
                  </Label>
                  <Input
                    type="text"
                    id="otherVaccination"
                    {...register("otherVaccination", {
                      required: t(
                        "services.serviceType.otherVaccination.required"
                      ),
                    })}
                    placeholder={t(
                      "services.serviceType.otherVaccination.placeholder"
                    )}
                    className={cn(
                      "w-full mt-1",
                      errors.otherVaccination && "border-red-500"
                    )}
                  />
                  {errors.otherVaccination && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.otherVaccination.message}
                    </p>
                  )}
                </div>
              )}

            {/* Other Health Screening Input - Shown when "health_screenings_others" is selected */}
            {selectedCategory === "health_screenings" &&
              selectedServiceType === "health_screenings_others" && (
                <div className="mb-4">
                  <Label
                    htmlFor="otherHealthScreening"
                    className="text-sm font-medium text-gray-700"
                  >
                    {t("services.serviceType.otherHealthScreening.label")} *
                  </Label>
                  <Input
                    type="text"
                    id="otherHealthScreening"
                    {...register("otherHealthScreening", {
                      required: t(
                        "services.serviceType.otherHealthScreening.required"
                      ),
                    })}
                    placeholder={t(
                      "services.serviceType.otherHealthScreening.placeholder"
                    )}
                    className={cn(
                      "w-full mt-1",
                      errors.otherHealthScreening && "border-red-500"
                    )}
                  />
                  {errors.otherHealthScreening && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.otherHealthScreening.message}
                    </p>
                  )}
                </div>
              )}

            {/* Other Service Input - Shown when "Others" is selected */}
            {selectedCategory === "service_type_others" && (
              <div className="mb-4">
                <Label
                  htmlFor="otherService"
                  className="text-sm font-medium text-gray-700"
                >
                  {t("services.serviceType.otherService.label")} *
                </Label>
                <Input
                  type="text"
                  id="otherService"
                  {...register("otherService", {
                    required: t("services.serviceType.otherService.required"),
                  })}
                  placeholder={t(
                    "services.serviceType.otherService.placeholder"
                  )}
                  className={cn(
                    "w-full mt-1",
                    errors.otherService && "border-red-500"
                  )}
                />
                {errors.otherService && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.otherService.message}
                  </p>
                )}
              </div>
            )}

            {/* Calendar  */}
            <div className="mb-4">
              <Label
                htmlFor="appointmentDateTime"
                className="text-sm font-medium text-gray-700"
              >
                {t("appointment.label")}
              </Label>
              <Button
                type="button"
                variant={"outline"}
                onClick={() => setIsCalendarModalOpen(true)}
                className={cn(
                  "w-full mt-1 justify-between font-normal text-left",
                  (!selectedAppointmentDates ||
                    selectedAppointmentDates.length === 0) &&
                    "text-muted-foreground"
                )}
              >
                {selectedAppointmentDates &&
                selectedAppointmentDates.length > 0 ? (
                  <span className="text-sm font-medium text-gray-700">
                    {selectedAppointmentDates.length}{" "}
                    {selectedAppointmentDates.length === 1
                      ? t("appointment.datesSelected")
                      : t("appointment.datesSelectedPlural")}{" "}
                  </span>
                ) : (
                  <span>{t("appointment.placeholder")}</span>
                )}
                <ChevronDownIcon className="h-4 w-4 opacity-50" />
              </Button>

              {/* Display selected dates and times */}
              {selectedAppointmentDates &&
                Array.isArray(selectedAppointmentDates) &&
                selectedAppointmentDates.length > 0 && (
                  <div className="mt-3 space-y-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
                    {selectedAppointmentDates.map(
                      (
                        appointment: { date: string; times: string[] },
                        index: number
                      ) => (
                        <div
                          key={index}
                          className="bg-white p-3 rounded-md border border-gray-300"
                        >
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex-1">
                              <h4 className="text-sm font-semibold text-gray-900 mb-1">
                                {appointment.date}
                              </h4>
                              <div className="flex flex-wrap gap-2">
                                {appointment.times.map(
                                  (time: string, timeIndex: number) => (
                                    <div
                                      key={timeIndex}
                                      className="inline-flex items-center gap-1 px-2 py-1 bg-peter/10 text-peter rounded-md text-xs"
                                    >
                                      <span>{time}</span>
                                      <button
                                        type="button"
                                        onClick={() =>
                                          handleRemoveTime(
                                            appointment.date,
                                            time
                                          )
                                        }
                                        className="ml-1 hover:text-red-600 transition-colors"
                                        aria-label={`Remove ${time}`}
                                      >
                                        ×
                                      </button>
                                    </div>
                                  )
                                )}
                              </div>
                            </div>
                            <button
                              type="button"
                              onClick={() => handleRemoveDate(appointment.date)}
                              className="ml-2 text-red-600 hover:text-red-800 text-sm font-medium"
                              aria-label={`Remove ${appointment.date}`}
                            >
                              {t("appointment.remove")}
                            </button>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                )}

              {(!selectedAppointmentDates ||
                selectedAppointmentDates.length === 0) && (
                <p className="text-red-500 text-xs mt-1">
                  {t("appointment.required")}
                </p>
              )}
            </div>

            <Label
              htmlFor="notes"
              className="text-sm font-medium text-gray-700 block mb-2"
            >
              {t("additionalNotes.label")}
            </Label>
            <Textarea
              id="notes"
              {...register("notes")}
              placeholder={t("additionalNotes.placeholder")}
              className="w-full h-24"
            />
          </div>

          {/* Consent Section */}
          <div className="bg-[#f3ecf3] rounded-lg border border-[#d2b5d2] p-6">
            <div className="flex items-start">
              <Controller
                control={control}
                name="consent"
                rules={{ required: t("consent.required") }}
                render={({ field }) => (
                  <Checkbox
                    id="consent"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className={
                      errors.consent
                        ? "border-red-500 mt-0.5"
                        : "border-[#d2b5d2] mt-0.5"
                    }
                  />
                )}
              />
              <label htmlFor="consent" className="ml-2 text-xs text-gray-700">
                {t("consent.label")}
              </label>
            </div>
            {errors.consent && (
              <p className="text-red-500 text-xs mt-1 ml-6">
                {errors.consent.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full bg-peter hover:bg-peter-dark text-white py-3 rounded-md font-medium"
          >
            {t("submitButton")}
          </Button>
        </form>
      </div>
      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center pointer-events-none">
        <Image
          src="/watermark.webp"
          alt="Schedule Online"
          width={1000}
          height={1000}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-contain opacity-30 w-full xl:w-[85%] 2xl:w-[95%] h-full"
        />
      </div>

      {/* Calendar Modal */}
      <CalendarModal
        isOpen={isCalendarModalOpen}
        onClose={() => setIsCalendarModalOpen(false)}
        onSelectDateTime={handleSelectDateTime}
        initialSelectedDates={selectedAppointmentDates || []}
      />
    </div>
  );
}

export default ScheduleOnline;
