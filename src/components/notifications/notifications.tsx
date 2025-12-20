"use client";
import React, { useState, useMemo } from "react";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";
import {
  useGetNotificationQuery,
  useMarkAllAsReadMutation,
  useMarkAsReadMutation,
} from "@/store/Apis/notificationApi/notificatioAnpi";
import useShowToast from "@/hooks/useShowToast";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

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

export default function Notifications() {
  const [page, setPage] = useState(1);
  const limit = 10;
  const { showSuccess, showError } = useShowToast();

  const { data: notificationData, isLoading } = useGetNotificationQuery({
    page,
    limit,
  });

  const [markAllAsRead, { isLoading: isMarkingAllAsRead }] =
    useMarkAllAsReadMutation();
  const [markAsRead] = useMarkAsReadMutation();

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
    } catch (error: unknown) {
      let errorMessage = "Failed to mark all as read";
      if (error && typeof error === "object") {
        if ("data" in error && error.data && typeof error.data === "object") {
          const data = error.data as { message?: string; error?: string };
          errorMessage = data.message || data.error || errorMessage;
        }
      }
      showError({ message: errorMessage });
    }
  };

  const handleMarkAsRead = async (id: string) => {
    try {
      await markAsRead(id).unwrap();
      // Don't show success toast for single read to avoid spam
    } catch (error: unknown) {
      let errorMessage = "Failed to mark notification as read";
      if (error && typeof error === "object") {
        if ("data" in error && error.data && typeof error.data === "object") {
          const data = error.data as { message?: string; error?: string };
          errorMessage = data.message || data.error || errorMessage;
        }
      }
      showError({ message: errorMessage });
    }
  };

  const handleNotificationClick = (notification: {
    _id: string;
    isRead: boolean;
  }) => {
    if (!notification.isRead) {
      handleMarkAsRead(notification._id);
    }
  };

  const totalPages = notificationData?.meta?.totalPage || 1;
  const currentPage = notificationData?.meta?.page || 1;

  return (
    <div className="w-full h-[calc(100vh-125px)] flex flex-col">
      {/* Header with Mark All as Read button */}
      <div className="flex items-center justify-between mb-4 pb-4 border-b">
        <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
        <Button
          variant="outline"
          size="sm"
          onClick={handleMarkAllAsRead}
          disabled={isMarkingAllAsRead || !hasUnreadNotifications}
          className="disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isMarkingAllAsRead ? "Marking..." : "Mark all as read"}
        </Button>
      </div>

      {/* Notifications List */}
      <ScrollArea className="flex-1 border border-gray-200 rounded-lg">
        <div className="bg-white rounded-lg">
          {isLoading ? (
            <div className="p-8 text-center text-gray-500">
              Loading notifications...
            </div>
          ) : notifications.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              No notifications found
            </div>
          ) : (
            notifications.map((notification, index) => (
              <React.Fragment key={notification._id}>
                <div
                  className={`flex gap-4 p-4 hover:bg-gray-50 transition-colors cursor-pointer ${
                    !notification.isRead ? "bg-purple-50" : ""
                  }`}
                  onClick={() => handleNotificationClick(notification)}
                >
                  {/* Icon */}
                  <div className="flex-shrink-0">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        !notification.isRead ? "bg-purple-100" : "bg-gray-200"
                      }`}
                    >
                      <Bell
                        className={`w-5 h-5 ${
                          !notification.isRead
                            ? "text-purple-600"
                            : "text-gray-600"
                        }`}
                      />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <h3
                        className={`text-base ${
                          !notification.isRead
                            ? "font-bold text-gray-900"
                            : "font-medium text-gray-900"
                        }`}
                      >
                        {notification.message}
                      </h3>
                      <span className="text-sm text-gray-500 whitespace-nowrap flex-shrink-0">
                        {formatTimeDisplay(notification.createdAt)}
                      </span>
                    </div>
                    {notification.type && (
                      <p className="text-xs text-gray-500 mt-1 capitalize">
                        {notification.type}
                      </p>
                    )}
                  </div>
                </div>

                {/* Separator - don't show after last item */}
                {index < notifications.length - 1 && (
                  <Separator className="bg-gray-200" />
                )}
              </React.Fragment>
            ))
          )}
        </div>
      </ScrollArea>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-4 pt-4 border-t">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (currentPage > 1) {
                      setPage(currentPage - 1);
                    }
                  }}
                  className={
                    currentPage <= 1
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer"
                  }
                />
              </PaginationItem>

              {/* Page Numbers */}
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (pageNum) => {
                  // Show first page, last page, current page, and pages around current
                  if (
                    pageNum === 1 ||
                    pageNum === totalPages ||
                    (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
                  ) {
                    return (
                      <PaginationItem key={pageNum}>
                        <PaginationLink
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            setPage(pageNum);
                          }}
                          isActive={currentPage === pageNum}
                          className="cursor-pointer"
                        >
                          {pageNum}
                        </PaginationLink>
                      </PaginationItem>
                    );
                  } else if (
                    pageNum === currentPage - 2 ||
                    pageNum === currentPage + 2
                  ) {
                    return (
                      <PaginationItem key={pageNum}>
                        <span className="px-2">...</span>
                      </PaginationItem>
                    );
                  }
                  return null;
                }
              )}

              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (currentPage < totalPages) {
                      setPage(currentPage + 1);
                    }
                  }}
                  className={
                    currentPage >= totalPages
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer"
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
}
