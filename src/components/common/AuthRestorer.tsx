"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { login } from "@/store/slices/userSlice/userSlice";
import { selectIsLoggedIn } from "@/store/slices/userSlice/userSlice";
import { getCookie } from "@/lib/cookies";

/**
 * Component that restores authentication state from cookies/localStorage on page refresh
 * This ensures the Redux store reflects the actual login state
 */
export default function AuthRestorer() {
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  useEffect(() => {
    // Only run on client side
    if (typeof window === "undefined") return;

    // If already logged in, don't restore
    if (isLoggedIn) return;

    const token = getCookie("token");

    // If token exists, restore user state
    if (token) {
      // First, try to restore from localStorage (most reliable)
      const storedUserData = localStorage.getItem("userData");

      if (storedUserData) {
        try {
          const userData = JSON.parse(storedUserData);
          // Verify token hasn't expired (if it's a JWT)
          try {
            const parts = token.split(".");
            if (parts.length === 3) {
              const payload = JSON.parse(atob(parts[1]));
              if (payload.exp && payload.exp * 1000 < Date.now()) {
                // Token expired, clear everything
                localStorage.removeItem("userData");
                return;
              }
            }
          } catch {
            // Not a JWT, continue with restoration
          }

          // Restore user state from localStorage
          dispatch(login(userData));
          return;
        } catch (error) {
          console.warn("Failed to parse stored user data", error);
          localStorage.removeItem("userData");
        }
      }

      // Fallback: Try to decode token to get user info (if it's a JWT)
      try {
        const parts = token.split(".");
        if (parts.length === 3) {
          const payload = JSON.parse(atob(parts[1]));

          // Check if token is expired
          if (payload.exp && payload.exp * 1000 < Date.now()) {
            // Token expired, clear it
            return;
          }

          // Restore user state from token
          dispatch(
            login({
              _id: payload.userId || payload._id,
              name: payload.name || payload.fullName || "",
              email: payload.email || "",
              phone: "",
              address: "",
              city: "",
              state: "",
              zip: "",
              country: "",
              role: payload.role || "user",
              dateOfBirth: "",
              isLoggedIn: true,
            })
          );
        }
      } catch {
        // If token is not a JWT or decoding fails,
        // we could call an API endpoint here to get user info
        console.warn("Could not decode token, user info may be incomplete");
      }
    }
  }, [dispatch, isLoggedIn]);

  // This component doesn't render anything
  return null;
}
