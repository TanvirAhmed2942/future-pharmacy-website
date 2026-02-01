"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useTranslations } from "next-intl";
import { ClosedAnimation } from "../lottieanimation/closed";
interface TimePickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTimeSelect: (time: string) => void;
  selectedTime?: string;
  selectedDate?: Date;
}

export default function TimePickerModal({
  isOpen,
  onClose,
  onTimeSelect,
  selectedTime,
  selectedDate,
}: TimePickerModalProps) {
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(selectedTime || "");
  const t = useTranslations("home.timePickerModal");

  // Helper function to format time with AM/PM
  const formatTime = (hour: number, minute: number) => {
    const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
    const ampm = hour >= 12 ? "PM" : "AM";
    return `${displayHour}:${minute.toString().padStart(2, "0")} ${ampm}`;
  };

  // Generate slots for a time range (30-minute intervals, 29-min duration for display)
  const generateSlotsForRange = (
    startHour: number,
    endHour: number
  ): string[] => {
    const slots: string[] = [];
    for (let hour = startHour; hour < endHour; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const endMinute = minute + 29;
        const endH = endMinute >= 60 ? hour + 1 : hour;
        const finalEndMinute = endMinute >= 60 ? endMinute - 60 : endMinute;

        const startTime = formatTime(hour, minute);
        const endTime = formatTime(endH, finalEndMinute);
        slots.push(`${startTime} - ${endTime}`);
      }
    }
    return slots;
  };

  // Generate time slots based on selected day:
  // Monday–Friday: 8am–7pm | Saturday: 10am–4pm | Sunday: Closed
  const generateTimeSlots = () => {
    const day = selectedDate ? selectedDate.getDay() : 1; // 0=Sun, 1=Mon, ..., 6=Sat; default Mon if no date

    if (day === 0) {
      return {
        morningSlots: [] as string[],
        afternoonSlots: [] as string[],
        eveningSlots: [] as string[],
        isClosed: true,
      };
    }

    if (day === 6) {
      // Saturday: 10am–4pm (morning 10–12, afternoon 12–4)
      return {
        morningSlots: generateSlotsForRange(10, 12),
        afternoonSlots: generateSlotsForRange(12, 16),
        eveningSlots: [] as string[],
        isClosed: false,
      };
    }

    // Monday–Friday: 8am–7pm
    return {
      morningSlots: generateSlotsForRange(8, 12),
      afternoonSlots: generateSlotsForRange(12, 16),
      eveningSlots: generateSlotsForRange(16, 19),
      isClosed: false,
    };
  };

  const {
    morningSlots,
    afternoonSlots,
    eveningSlots,
    isClosed,
  } = generateTimeSlots();

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    });
  };

  // Check if a time slot is disabled
  const isTimeSlotDisabled = (timeSlot: string): boolean => {
    if (!selectedDate) return false;

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const selected = new Date(selectedDate);
    selected.setHours(0, 0, 0, 0);

    // If selected date is in the past, disable ALL slots
    if (selected.getTime() < today.getTime()) {
      return true;
    }

    // If selected date is in the future, enable ALL slots
    if (selected.getTime() > today.getTime()) {
      return false;
    }

    // If selected date is today, disable only past time slots
    // Parse the time slot to get both start and end times
    // Format: "6:00 AM - 6:29 AM"
    const timeMatch = timeSlot.match(
      /^(\d{1,2}):(\d{2})\s+(AM|PM)\s+-\s+(\d{1,2}):(\d{2})\s+(AM|PM)/
    );
    if (!timeMatch) return false;

    // Parse start time
    let startHour = parseInt(timeMatch[1]);
    const startMinute = parseInt(timeMatch[2]);
    const startAmpm = timeMatch[3];

    // Parse end time
    let endHour = parseInt(timeMatch[4]);
    const endMinute = parseInt(timeMatch[5]);
    const endAmpm = timeMatch[6];

    // Convert start time to 24-hour format
    if (startAmpm === "PM" && startHour !== 12) {
      startHour += 12;
    } else if (startAmpm === "AM" && startHour === 12) {
      startHour = 0;
    }

    // Convert end time to 24-hour format
    if (endAmpm === "PM" && endHour !== 12) {
      endHour += 12;
    } else if (endAmpm === "AM" && endHour === 12) {
      endHour = 0;
    }

    // Create date objects for the time slot start and end times
    const slotStartTime = new Date();
    slotStartTime.setHours(startHour, startMinute, 0, 0);
    slotStartTime.setSeconds(0, 0);

    const slotEndTime = new Date();
    slotEndTime.setHours(endHour, endMinute, 0, 0);
    slotEndTime.setSeconds(0, 0);

    // Get current time
    const now = new Date();
    now.setSeconds(0, 0); // Reset seconds and milliseconds for accurate comparison

    // Disable only if the current time is AFTER the slot end time
    // This means:
    // - If current time is within the slot (start <= now <= end): ENABLE (user is in this time)
    // - If current time is before the slot start: ENABLE (future slot)
    // - If current time is after the slot end: DISABLE (past slot)
    // Example: if current time is 11:45 AM:
    // - 11:30 AM - 11:59 AM: enabled (11:45 is within this range)
    // - 11:00 AM - 11:29 AM: disabled (end 11:29 < 11:45)
    // - 12:00 PM - 12:29 PM: enabled (start 12:00 > 11:45)
    return now > slotEndTime;
  };

  const handleTimeSlotClick = (timeSlot: string) => {
    if (!isTimeSlotDisabled(timeSlot)) {
      setSelectedTimeSlot(timeSlot);
    }
  };

  const handleConfirm = () => {
    if (selectedTimeSlot) {
      onTimeSelect(selectedTimeSlot);
      onClose();
    }
  };

  const renderTimeSlots = (slots: string[], sectionName: string) => {
    return (
      <div className="mb-4 sm:mb-6">
        <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-3">
          {sectionName}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-2.5">
          {slots.map((slot, index) => {
            const isDisabled = isTimeSlotDisabled(slot);
            return (
              <button
                key={`${sectionName}-${index}`}
                onClick={() => handleTimeSlotClick(slot)}
                disabled={isDisabled}
                className={`p-2.5 sm:p-3 rounded-lg border-2 transition-all text-xs sm:text-sm font-medium ${isDisabled
                  ? "border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed opacity-50"
                  : selectedTimeSlot === slot
                    ? "border-peter bg-peter text-white hover:bg-peter-dark"
                    : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
                  }`}
              >
                {slot}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[95vw] max-w-[95vw] sm:max-w-lg md:max-w-xl lg:max-w-2xl bg-white rounded-xl shadow-2xl border-0 p-0 max-h-[90vh] sm:max-h-[85vh] lg:max-h-[80vh] overflow-hidden">
        {/* Header */}
        {isClosed ? (
          <DialogHeader className="p-3 sm:p-4 border-b text-left">
            <DialogTitle className="text-lg sm:text-xl font-bold text-gray-900 text-left">
              {t("descriptionClosed")}
            </DialogTitle>
          </DialogHeader>
        ) : (
          <DialogHeader className="p-3 sm:p-4 border-b">
            <DialogTitle className="text-lg sm:text-xl font-bold text-gray-900">
              {t("title")}
            </DialogTitle>
          </DialogHeader>
        )}

        {/* Delivery date info */}
        {isClosed ? (
          null
        ) : (
          <div className="px-4 sm:px-6 py-2 bg-gray-50">
            <p className="text-xs sm:text-sm text-gray-600">
              {t("description")}{" "}
              <span className="font-semibold text-peter">
                {selectedDate ? formatDate(selectedDate) : "Tuesday, July 23"}
              </span>
            </p>
          </div>
        )}

        {/* Time slots with scroll area */}
        <ScrollArea className="h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px] max-h-[50vh] sm:max-h-[45vh] lg:max-h-[40vh]">
          <div className="p-4 sm:p-5 lg:p-6">
            {isClosed ? (
              // <p className="text-center text-gray-600 py-8 font-medium">
              //   {t("closed")}
              // </p>

              <ClosedAnimation />
            ) : (
              <>
                {morningSlots.length > 0 &&
                  renderTimeSlots(morningSlots, t("morning"))}
                {afternoonSlots.length > 0 &&
                  renderTimeSlots(afternoonSlots, t("afternoon"))}
                {eveningSlots.length > 0 &&
                  renderTimeSlots(eveningSlots, t("evening"))}
              </>
            )}
          </div>
        </ScrollArea>

        {/* Action buttons */}

        {isClosed ? (
          null
        ) : (
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 p-4 sm:p-5 lg:p-6 border-t">
            <Button
              onClick={onClose}
              variant="outline"
              className="w-full sm:flex-1 border-gray-300 text-gray-700 hover:bg-gray-50 text-sm sm:text-base py-2.5 sm:py-2"
            >
              {t("cancel")}
            </Button>
            <Button
              onClick={handleConfirm}
              className="w-full sm:flex-1 bg-peter hover:bg-peter-dark text-white text-sm sm:text-base py-2.5 sm:py-2"
              disabled={!selectedTimeSlot}
            >
              {t("confirmTime")}
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}


