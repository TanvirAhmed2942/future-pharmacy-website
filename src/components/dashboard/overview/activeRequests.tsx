import React, { useMemo } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MyRequestItem } from "@/store/Apis/dashboard/myrequestApi/myrequestApi";

interface ActiveRequestsProps {
  requests: MyRequestItem[];
}

// Format date for display
const formatDateDisplay = (dateStr: string | null): string => {
  if (!dateStr) return "";
  try {
    const date = new Date(dateStr);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    // Check if it's today
    if (date.toDateString() === today.toDateString()) {
      return "today";
    }
    // Check if it's tomorrow
    if (date.toDateString() === tomorrow.toDateString()) {
      return "tomorrow";
    }
    // Otherwise format as "MMM DD, YYYY"
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return "";
  }
};

// Format time for display (convert 24-hour to 12-hour)
const formatTimeDisplay = (timeStr: string | null): string => {
  if (!timeStr) return "";
  try {
    const [hours, minutes] = timeStr.split(":");
    const hour = parseInt(hours, 10);
    const ampm = hour >= 12 ? "PM" : "AM";
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes} ${ampm}`;
  } catch {
    return timeStr;
  }
};

// Get status badge color
const getStatusColor = (status: string): string => {
  switch (status.toLowerCase()) {
    case "completed":
      return "bg-green-500";
    case "pending":
      return "bg-yellow-500";
    case "in progress":
      return "bg-peter";
    default:
      return "bg-gray-500";
  }
};

// Format status text
const formatStatus = (status: string): string => {
  return status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
};

export default function ActiveRequests({ requests }: ActiveRequestsProps) {
  // Get latest 5 requests, sorted by createdAt descending
  const latestRequests = useMemo(() => {
    return [...requests]
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
      .slice(0, 5);
  }, [requests]);

  return (
    <div className="w-full max-w-4xl   ">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">Active Requests</h1>

      <ScrollArea className="h-[600px] w-full rounded-lg border bg-white p-4">
        <div className="space-y-4">
          {latestRequests.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No active requests</p>
          ) : (
            latestRequests.map((request) => {
              const scheduledDate = formatDateDisplay(request.deliveryDate);
              const scheduledTime = formatTimeDisplay(request.deliveryTime);
              const scheduledText =
                scheduledDate && scheduledTime
                  ? `${scheduledDate}, ${scheduledTime}`
                  : scheduledDate || scheduledTime || "Not scheduled";

              return (
                <Card
                  key={request._id}
                  className="overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <CardContent className="p-0">
                    <div className="flex items-center gap-4 p-4">
                      <div className="flex-1">
                        <Badge
                          className={`${getStatusColor(
                            request.status
                          )} text-white mb-2`}
                        >
                          {formatStatus(request.status)}
                        </Badge>
                        <h3 className="text-xl font-semibold text-gray-900 mb-1">
                          Prescription Pickup
                        </h3>
                        <p className="text-gray-500">
                          Pickup scheduled for {scheduledText}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
