"use client";

import React, { useEffect, useState } from "react";
import { useGetActivityLogQuery } from "@/store/Apis/profileApi/profileApi";
import type { ActivityLogItem } from "@/store/Apis/profileApi/profileApi";
import { User, Calendar, Shield, Loader2, AlertCircle } from "lucide-react";

function formatTimeAgo(isoDate: string): string {
  const date = new Date(isoDate);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);
  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins} minute${diffMins !== 1 ? "s" : ""} ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours !== 1 ? "s" : ""} ago`;
  if (diffDays < 7) return `${diffDays} day${diffDays !== 1 ? "s" : ""} ago`;
  return date.toLocaleDateString();
}

function getActivityIcon(activity: ActivityLogItem) {
  const t = (activity.title || "").toLowerCase();
  const m = (activity.message || "").toLowerCase();
  const text = `${t} ${m}`;
  if (/login|logged in/.test(text)) return User;
  if (/security|two-step|verification|2fa|two-factor/.test(text)) return Shield;
  if (/appointment|schedule|calendar/.test(text)) return Calendar;
  return User;
}

function ActivityItem({ activity }: { activity: ActivityLogItem }) {
  const IconComponent = getActivityIcon(activity);
  return (
    <div className="flex items-start gap-3 sm:gap-4">
      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-peter flex items-center justify-center">
        <IconComponent className="w-5 h-5 text-white" />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="text-base font-medium text-gray-900 mb-0.5">
          {activity.title}
        </h3>
        <p className="text-sm text-gray-500 mb-0.5">{activity.message}</p>
        <p className="text-xs text-gray-400">
          {formatTimeAgo(activity.createdAt)}
        </p>
      </div>
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="space-y-4" data-testid="activity-log-loading">
      {[1, 2, 3].map((i) => (
        <div key={i} className="flex items-start gap-3 sm:gap-4 animate-pulse">
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-200" />
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-gray-200 rounded w-3/4" />
            <div className="h-3 bg-gray-100 rounded w-full" />
            <div className="h-3 bg-gray-100 rounded w-1/3" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function ActivityLog() {
  const [page, setPage] = useState(1);
  const [allActivities, setAllActivities] = useState<ActivityLogItem[]>([]);
  const limit = 10;

  const { data, isFetching, isLoading, isError, refetch } = useGetActivityLogQuery(
    { page, limit },
    { skip: false }
  );

  useEffect(() => {
    if (!data?.data || !data?.meta) return;
    const currentPage = data.meta.page;
    if (currentPage === 1) {
      setAllActivities(data.data);
    } else {
      setAllActivities((prev) => [...prev, ...data.data!]);
    }
  }, [data]);

  const meta = data?.meta;
  const hasMore = meta ? meta.page < meta.totalPage : false;
  const isInitialLoading = isLoading || (isFetching && allActivities.length === 0);

  return (
    <div className="w-full mx-auto">
      <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4 sm:mb-6">
          Activity Log
        </h2>

        {/* Error state */}
        {isError && (
          <div
            className="flex flex-col items-center justify-center py-8 px-4 text-center"
            role="alert"
          >
            <AlertCircle className="w-12 h-12 text-red-500 mb-3" />
            <p className="text-sm font-medium text-gray-900 mb-1">
              Unable to load activity log
            </p>
            <p className="text-sm text-gray-500 mb-4">
              Something went wrong. Please try again.
            </p>
            <button
              type="button"
              onClick={() => refetch()}
              className="px-4 py-2 text-sm font-medium text-white bg-peter hover:bg-peter-dark rounded-lg"
            >
              Try again
            </button>
          </div>
        )}

        {/* Loading state (initial load only) */}
        {!isError && isInitialLoading && <LoadingSkeleton />}

        {/* Success: list */}
        {!isError && !isInitialLoading && (
          <>
            <div
              className="space-y-4 max-h-[400px] overflow-y-auto pr-1"
              style={{ minHeight: "120px" }}
            >
              {allActivities.length === 0 && (
                <p className="text-sm text-gray-500 py-4 text-center">
                  No activity yet.
                </p>
              )}
              {allActivities.map((activity) => (
                <ActivityItem key={activity._id} activity={activity} />
              ))}
              {/* Inline loading when fetching more */}
              {isFetching && allActivities.length > 0 && (
                <div className="flex items-center justify-center gap-2 py-2 text-sm text-gray-500">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Loading more...
                </div>
              )}
            </div>

            {hasMore && !isFetching && (
              <div className="mt-4 flex justify-center">
                <button
                  type="button"
                  onClick={() => setPage((p) => p + 1)}
                  disabled={isFetching}
                  className="px-4 py-2 text-sm font-medium text-peter hover:text-peter-dark border border-peter rounded-lg hover:bg-peter/5 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Load more
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
