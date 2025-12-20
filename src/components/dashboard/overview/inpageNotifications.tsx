"use client";
import React, { useMemo, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bell } from "lucide-react";
import {
  useGetNotificationQuery,
  useMarkAllAsReadMutation,
  useMarkAsReadMutation,
} from "@/store/Apis/notificationApi/notificatioAnpi";
import { Button } from "@/components/ui/button";
import useShowToast from "@/hooks/useShowToast";

// Format time for display (relative time)
const formatTimeDisplay = (dateStr: string | null | undefined): string => {
  if (!dateStr) return "";
  try {
    const date = new Date(dateStr);
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    // If less than 1 hour ago, show minutes
    if (diffInMinutes < 60) {
      if (diffInMinutes < 1) return "Just now";
      return `${diffInMinutes} min ago`;
    }

    // If less than 24 hours ago, show hours
    if (diffInHours < 24) {
      return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`;
    }

    // If yesterday
    if (diffInDays === 1) {
      return "Yesterday";
    }

    // If less than 7 days, show days
    if (diffInDays < 7) {
      return `${diffInDays} days ago`;
    }

    // Otherwise, show formatted date and time
    const isToday = date.toDateString() === now.toDateString();
    if (isToday) {
      return date.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });
    }

    // Show date and time for older notifications
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  } catch {
    return "";
  }
};

export default function InpageNotifications() {
  const [hoveredNotificationId, setHoveredNotificationId] = useState<
    string | null
  >(null);
  const { showSuccess, showError } = useShowToast();

  const { data: notificationData, isLoading } = useGetNotificationQuery({
    page: 1,
    limit: 10,
  });

  const [markAllAsRead, { isLoading: isMarkingAllAsRead }] =
    useMarkAllAsReadMutation();
  const [markAsRead, { isLoading: isMarkingAsRead }] = useMarkAsReadMutation();

  const notifications = useMemo(() => {
    if (!notificationData?.data?.result) return [];
    // Sort by createdAt descending (newest first)
    return [...notificationData.data.result].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }, [notificationData]);

  // Check if there are any unread notifications
  const hasUnreadNotifications = useMemo(() => {
    return notifications.some((notification) => !notification.isRead);
  }, [notifications]);

  const handleMarkAllAsRead = async () => {
    try {
      await markAllAsRead().unwrap();
      showSuccess({ message: "All notifications marked as read" });
    } catch {
      showError({ message: "Failed to mark all as read" });
    }
  };

  const handleMarkAsRead = async (id: string) => {
    try {
      await markAsRead(id).unwrap();
      showSuccess({ message: "Notification marked as read" });
    } catch {
      showError({ message: "Failed to mark notification as read" });
    }
  };

  return (
    <div className="w-full max-w-4xl   ">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
        <Button
          variant="outline"
          size="sm"
          onClick={handleMarkAllAsRead}
          disabled={isMarkingAllAsRead || !hasUnreadNotifications}
        >
          {isMarkingAllAsRead ? "Marking..." : "Mark all as read"}
        </Button>
      </div>

      <ScrollArea className="h-auto w-full rounded-lg border bg-white">
        <div className="divide-y divide-gray-100">
          {isLoading ? (
            <div className="p-4 text-center text-gray-500">
              Loading notifications...
            </div>
          ) : notifications.length === 0 ? (
            <div className="p-4 text-center text-gray-500">
              No notifications
            </div>
          ) : (
            notifications.map((notification) => (
              <div
                key={notification._id}
                className={`p-4 hover:bg-gray-50 transition-colors relative group ${
                  !notification.isRead ? "bg-purple-50" : ""
                }`}
                onMouseEnter={() => setHoveredNotificationId(notification._id)}
                onMouseLeave={() => setHoveredNotificationId(null)}
              >
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        !notification.isRead ? "bg-[#be95be]/60" : "bg-gray-200"
                      }`}
                    >
                      <Bell
                        className={`w-5 h-5 ${
                          !notification.isRead ? "text-peter" : "text-gray-600"
                        }`}
                      />
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h3
                        className={`font-semibold text-gray-900 ${
                          !notification.isRead ? "font-bold" : ""
                        }`}
                      >
                        {notification.message}
                      </h3>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-500 whitespace-nowrap">
                          {formatTimeDisplay(notification.createdAt)}
                        </span>
                        {!notification.isRead &&
                          hoveredNotificationId === notification._id && (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-7 px-2 text-xs"
                              onClick={() => handleMarkAsRead(notification._id)}
                              disabled={isMarkingAsRead}
                            >
                              {isMarkingAsRead ? "..." : "Read"}
                            </Button>
                          )}
                      </div>
                    </div>
                    {notification.type && (
                      <p className="text-xs text-gray-500 mt-1 capitalize">
                        {notification.type}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
