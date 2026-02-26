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
  onSelectDateTime: (
    selectedDates: Array<{ date: string; times: string[] }>
  ) => void;
  initialSelectedDates?: Array<{ date: string; times: string[] }>;
}

const CalendarModal: React.FC<DateTimePickerModalProps> = ({
  isOpen,
  onClose,
  onSelectDateTime,
  initialSelectedDates = [],
}) => {
  const [currentDate, setCurrentDate] = useState(() => new Date());
  const [selectedDates, setSelectedDates] = useState<Set<number>>(new Set());
  const [selectedDateTimes, setSelectedDateTimes] = useState<
    Map<number, string[]>
  >(new Map());

  // When modal opens, show current month; reset or restore selections
  React.useEffect(() => {
    if (isOpen) {
      setCurrentDate(new Date());
    }
  }, [isOpen]);

  // Initialize with existing selections when modal opens
  React.useEffect(() => {
    if (isOpen && initialSelectedDates.length > 0) {
      const datesSet = new Set<number>();
      const timesMap = new Map<number, string[]>();

      initialSelectedDates.forEach((appointment) => {
        // Parse the date string to get the day number
        const dateMatch = appointment.date.match(/\d+/);
        if (dateMatch) {
          const day = parseInt(dateMatch[0]);
          datesSet.add(day);
          timesMap.set(day, appointment.times);
        }
      });

      setSelectedDates(datesSet);
      setSelectedDateTimes(timesMap);
    } else if (isOpen) {
      // Reset when modal opens fresh
      setSelectedDates(new Set());
      setSelectedDateTimes(new Map());
    }
  }, [isOpen, initialSelectedDates]);

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

  const getStartOfToday = () => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d.getTime();
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();
    const todayStart = getStartOfToday();

    const days: Array<{
      day: number;
      isCurrentMonth: boolean;
      fullDate: Date;
      isPast: boolean;
    }> = [];

    // Previous month days
    for (let i = firstDay - 1; i >= 0; i--) {
      const d = daysInPrevMonth - i;
      const fullDate = new Date(year, month - 1, d);
      days.push({
        day: d,
        isCurrentMonth: false,
        fullDate,
        isPast: fullDate.getTime() < todayStart,
      });
    }

    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      const fullDate = new Date(year, month, i);
      days.push({
        day: i,
        isCurrentMonth: true,
        fullDate,
        isPast: fullDate.getTime() < todayStart,
      });
    }

    // Next month days
    const remainingDays = 42 - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      const fullDate = new Date(year, month + 1, i);
      days.push({
        day: i,
        isCurrentMonth: false,
        fullDate,
        isPast: fullDate.getTime() < todayStart,
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

  const handleDateClick = (day: {
    day: number;
    isCurrentMonth: boolean;
    isPast: boolean;
  }) => {
    if (day.isCurrentMonth && !day.isPast) {
      const newSelectedDates = new Set(selectedDates);
      if (newSelectedDates.has(day.day)) {
        // Remove date if already selected
        newSelectedDates.delete(day.day);
        const newTimesMap = new Map(selectedDateTimes);
        newTimesMap.delete(day.day);
        setSelectedDateTimes(newTimesMap);
      } else {
        // Add date if not selected
        newSelectedDates.add(day.day);
      }
      setSelectedDates(newSelectedDates);
    }
  };

  const handleTimeClick = (
    time: { time: string; available: boolean },
    day: number
  ) => {
    if (time.available && selectedDates.has(day)) {
      const currentTimes = selectedDateTimes.get(day) || [];
      let newTimes: string[];

      if (currentTimes.includes(time.time)) {
        // If already selected, remove it
        newTimes = currentTimes.filter((t) => t !== time.time);
      } else {
        // If not selected, add it
        newTimes = [...currentTimes, time.time];
      }

      // Update the map with new times for this date
      const newTimesMap = new Map(selectedDateTimes);
      if (newTimes.length > 0) {
        newTimesMap.set(day, newTimes);
      } else {
        newTimesMap.delete(day);
      }
      setSelectedDateTimes(newTimesMap);
    }
  };

  const getSelectedTimesForDate = (day: number): string[] => {
    return selectedDateTimes.get(day) || [];
  };

  const days = getDaysInMonth(currentDate);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-4xl max-w-[95vw] p-3 sm:p-6">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Select a Date & Time
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
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
                    className="text-center text-xs md:text-sm font-medium text-gray-600"
                  >
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar Days */}
              <div className="grid grid-cols-7 gap-2">
                {days.map((day, index) => {
                  const isDisabled = !day.isCurrentMonth || day.isPast;
                  const isSelectable =
                    day.isCurrentMonth && !day.isPast;
                  return (
                    <button
                      key={index}
                      onClick={() => handleDateClick(day)}
                      disabled={isDisabled}
                      className={`
                        aspect-square flex items-center justify-center rounded-full text-xs md:text-sm relative
                        ${day.isPast
                          ? "text-gray-300 bg-gray-100/50 cursor-not-allowed"
                          : day.isCurrentMonth
                            ? "text-gray-900 hover:bg-[#d7aad3] cursor-pointer"
                            : "text-gray-400 cursor-not-allowed"
                        }
                        ${isSelectable && selectedDates.has(day.day)
                          ? "bg-peter text-white hover:bg-peter-dark"
                          : ""
                        }
                      `}
                    >
                      {day.day}
                      {isSelectable && selectedDates.has(day.day) && (
                        <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-white rounded-full"></span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Time Slots Section */}
          <div>
            <div className="mb-0">
              <span className="text-lg font-medium text-gray-700 block md:inline">
                {selectedDates.size > 0
                  ? `${selectedDates.size} ${selectedDates.size === 1 ? "Date" : "Dates"
                  } Selected`
                  : "Select Dates"}
              </span>
              <div className="text-sm text-peter mt-1 md:mt-0 mb-2">
                {selectedDates.size > 0
                  ? "Select time slots for each selected date"
                  : "Click on dates to select, then choose time slots"}
              </div>
            </div>

            {/* Display time slots for each selected date */}
            {selectedDates.size > 0 ? (
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {Array.from(selectedDates).map((day) => {
                  const timesForDate = getSelectedTimesForDate(day);
                  return (
                    <div
                      key={day}
                      className="border border-gray-200 rounded-lg p-3"
                    >
                      <div className="text-sm font-semibold text-gray-900 mb-2">
                        {getSelectedDateName(currentDate, day)}
                      </div>

                      {/* Desktop view - vertical scroll */}
                      <div className="hidden md:block space-y-2 max-h-64 overflow-y-auto">
                        {availableTimes.map((timeSlot, index) => {
                          const isSelected = timesForDate.includes(
                            timeSlot.time
                          );
                          return (
                            <button
                              key={`desktop-${day}-${index}`}
                              onClick={() => handleTimeClick(timeSlot, day)}
                              disabled={!timeSlot.available}
                              className={`
                                w-full py-2 px-3 rounded-lg border-2 text-center text-sm font-medium
                                transition-all relative
                                ${timeSlot.available
                                  ? "border-gray-200 hover:border-peter hover:bg-purple-50 cursor-pointer"
                                  : "border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed"
                                }
                                ${isSelected ? "border-peter bg-[#f3ecf3]" : ""}
                              `}
                            >
                              {isSelected && (
                                <div className="absolute left-3 top-1/2 -translate-y-1/2 w-2 h-2 bg-green-500 rounded-full"></div>
                              )}
                              {timeSlot.time}
                            </button>
                          );
                        })}
                      </div>

                      {/* Mobile view - horizontal scroll */}
                      <div className="md:hidden border border-gray-200 rounded-lg p-2 overflow-x-auto scroll-smooth">
                        <div className="flex flex-nowrap space-x-2 pb-1 scroll-smooth snap-x">
                          {availableTimes.map((timeSlot, index) => {
                            const isSelected = timesForDate.includes(
                              timeSlot.time
                            );
                            return (
                              <button
                                key={`mobile-${day}-${index}`}
                                onClick={() => handleTimeClick(timeSlot, day)}
                                disabled={!timeSlot.available}
                                className={`
                                  min-w-[90px] py-2 px-2 rounded-lg border-2 text-center text-sm
                                  transition-all relative flex-shrink-0 snap-start
                                  ${timeSlot.available
                                    ? "border-gray-200 hover:border-peter hover:bg-purple-50 cursor-pointer"
                                    : "border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed"
                                  }
                                  ${isSelected
                                    ? "border-peter bg-[#f3ecf3]"
                                    : ""
                                  }
                                `}
                              >
                                {isSelected && (
                                  <div className="absolute left-2 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                                )}
                                {timeSlot.time}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center text-gray-500 py-8 border border-gray-200 rounded-lg">
                Please select dates from the calendar first
              </div>
            )}
          </div>
        </div>
        <div className="flex justify-center">
          <Button
            className="bg-peter text-white hover:bg-peter-dark"
            onClick={() => {
              if (selectedDates.size > 0) {
                // Build array of selected dates with their time slots
                const selectedDatesArray: Array<{
                  date: string;
                  times: string[];
                }> = [];

                Array.from(selectedDates).forEach((day) => {
                  const times = getSelectedTimesForDate(day);
                  if (times.length > 0) {
                    selectedDatesArray.push({
                      date: getSelectedDateName(currentDate, day),
                      times: times,
                    });
                  }
                });

                if (selectedDatesArray.length > 0) {
                  onSelectDateTime?.(selectedDatesArray);
                  onClose();
                }
              }
            }}
            disabled={selectedDates.size === 0}
          >
            Confirm Selection ({selectedDates.size}{" "}
            {selectedDates.size === 1 ? "Date" : "Dates"})
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CalendarModal;
