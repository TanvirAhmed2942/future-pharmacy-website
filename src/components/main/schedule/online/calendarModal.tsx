import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface DateTimePickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectDateTime: (data: {
    date: string;
    time: string;
    allSelectedTimes?: string[];
  }) => void;
}

const CalendarModal: React.FC<DateTimePickerModalProps> = ({
  isOpen,
  onClose,
  onSelectDateTime,
}) => {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 3, 24)); // April 2025
  const [selectedDate, setSelectedDate] = useState(24);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedTimes, setSelectedTimes] = useState<string[]>([]);

  // Generate time slots for full 24 hours starting from 6:00 AM with 30-minute intervals
  const generateTimeSlots = () => {
    const slots = [];
    const startHour = 6; // 6 AM
    // We'll generate 24 hours worth of slots (48 slots)
    const totalSlots = 48;

    // Generate slots in order, from 6 AM to 5:30 AM the next day
    for (let i = 0; i < totalSlots; i++) {
      // Calculate the hour (0-23) and minute (0 or 30)
      const hour = (startHour + Math.floor(i / 2)) % 24;
      const minute = (i % 2) * 30;

      const time = new Date();
      time.setHours(hour, minute, 0, 0);

      const formattedTime = time.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });

      // All slots are available initially
      slots.push({
        time: formattedTime,
        available: true,
      });
    }
    return slots;
  };

  const availableTimes = generateTimeSlots();

  const daysOfWeek = ["S", "M", "T", "W", "T", "F", "S"];

  const getMonthName = (date: Date) => {
    return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
  };

  const getSelectedDateName = (date: Date, day: number) => {
    const selectedDateObj = new Date(date.getFullYear(), date.getMonth(), day);
    return selectedDateObj.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    });
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();

    const days = [];

    // Previous month days
    for (let i = firstDay - 1; i >= 0; i--) {
      days.push({
        day: daysInPrevMonth - i,
        isCurrentMonth: false,
      });
    }

    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        day: i,
        isCurrentMonth: true,
      });
    }

    // Next month days
    const remainingDays = 42 - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      days.push({
        day: i,
        isCurrentMonth: false,
      });
    }

    return days;
  };

  const handlePrevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1)
    );
  };

  const handleDateClick = (day: { day: number; isCurrentMonth: boolean }) => {
    if (day.isCurrentMonth) {
      setSelectedDate(day.day);
      // Reset selections when changing date
      setSelectedTime(null);
      setSelectedTimes([]);
    }
  };

  const handleTimeClick = (time: { time: string; available: boolean }) => {
    if (time.available) {
      let newSelectedTimes: string[];

      if (selectedTimes.includes(time.time)) {
        // If already selected, remove it
        newSelectedTimes = selectedTimes.filter((t) => t !== time.time);
      } else {
        // If not selected, add it
        newSelectedTimes = [...selectedTimes, time.time];
      }

      // Update the state with new selections
      setSelectedTimes(newSelectedTimes);

      // Also update single selection for compatibility with current implementation
      // Use the last selected time as the "current" selection
      const lastSelectedTime =
        newSelectedTimes.length > 0
          ? newSelectedTimes[newSelectedTimes.length - 1]
          : null;
      setSelectedTime(lastSelectedTime);
    }
  };

  const days = getDaysInMonth(currentDate);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Select a Date & Time
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Calendar Section */}
          <div>
            {/* Month Navigation */}
            <div className="flex items-center justify-between mb-6">
              <span className="text-lg font-medium text-gray-700">
                {getMonthName(currentDate)}
              </span>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handlePrevMonth}
                  className="h-8 w-8"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleNextMonth}
                  className="h-8 w-8"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Calendar Grid */}
            <div className="bg-[#f2e3f0] rounded-lg p-4">
              {/* Day Headers */}
              <div className="grid grid-cols-7 gap-2 mb-2">
                {daysOfWeek.map((day, index) => (
                  <div
                    key={index}
                    className="text-center text-sm font-medium text-gray-600"
                  >
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar Days */}
              <div className="grid grid-cols-7 gap-2">
                {days.map((day, index) => (
                  <button
                    key={index}
                    onClick={() => handleDateClick(day)}
                    disabled={!day.isCurrentMonth}
                    className={`
                      aspect-square flex items-center justify-center rounded-full text-sm
                      ${
                        day.isCurrentMonth
                          ? "text-gray-900 hover:bg-[#d7aad3] cursor-pointer"
                          : "text-gray-400 cursor-not-allowed"
                      }
                      ${
                        day.isCurrentMonth && day.day === selectedDate
                          ? "bg-peter text-white hover:bg-peter-dark"
                          : ""
                      }
                    `}
                  >
                    {day.day}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Time Slots Section */}
          <div>
            <div className="mb-0">
              <span className="text-lg font-medium text-gray-700">
                {getSelectedDateName(currentDate, selectedDate)}
              </span>
            </div>

            <div className="mb-2">
              <div className=" text-sm text-peter">
                Select one or more time slots for your appointment
              </div>
            </div>

            <div className="space-y-3 max-h-96 overflow-y-auto border border-gray-200 rounded-lg p-2">
              {availableTimes.map((timeSlot, index) => (
                <button
                  key={index}
                  onClick={() => handleTimeClick(timeSlot)}
                  disabled={!timeSlot.available}
                  className={`
                    w-full py-3 px-4 rounded-lg border-2 text-center font-medium
                    transition-all relative
                    ${
                      timeSlot.available
                        ? "border-gray-200 hover:border-peter hover:bg-purple-50 cursor-pointer"
                        : "border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed"
                    }
                    ${
                      selectedTimes.includes(timeSlot.time)
                        ? "border-red-900 bg-[#f3ecf3]"
                        : ""
                    }
                  `}
                >
                  {selectedTimes.includes(timeSlot.time) && (
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 w-2 h-2 bg-green-500 rounded-full"></div>
                  )}
                  {timeSlot.time}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <Button
            className="bg-peter text-white hover:bg-peter-dark"
            onClick={() => {
              if (selectedTimes.length > 0 && selectedTime) {
                // Now we submit the selected times
                onSelectDateTime?.({
                  date: getSelectedDateName(currentDate, selectedDate),
                  time: selectedTime,
                  allSelectedTimes: selectedTimes,
                });
                onClose();
              }
            }}
          >
            Confirm Selection
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CalendarModal;
