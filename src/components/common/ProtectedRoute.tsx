"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAppSelector } from "@/store/hooks";
import { selectIsLoggedIn } from "@/store/slices/userSlice/userSlice";
import { getCookie } from "@/lib/cookies";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const router = useRouter();
  const pathname = usePathname();
  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  useEffect(() => {
    // Check for token in cookie only (client-side only to prevent hydration mismatch)
    const token = getCookie("token");

    // If no token and not logged in, redirect to login
    if (!token && !isLoggedIn) {
      console.log("🔒 [ProtectedRoute] No token found, redirecting to login");
      const loginUrl = `/auth/login?redirect=${encodeURIComponent(pathname)}`;
      router.push(loginUrl);
      return;
    }

    // If we have a token but auth context says not logged in, update it
    if (token && !isLoggedIn) {
      console.log("🔒 [ProtectedRoute] Token found but not logged in context");
      // The auth context should be updated on login, but if token exists,
      // we might need to verify it with the backend
    }
  }, [isLoggedIn, pathname, router]);

  // Always render children initially to prevent hydration mismatch
  // The redirect will happen in useEffect (client-side only)
  return <>{children}</>;
}
