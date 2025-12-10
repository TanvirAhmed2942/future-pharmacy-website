import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

// Helper function to get cookie value
function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;

  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);

  if (parts.length === 2) {
    return parts.pop()?.split(";").shift() || null;
  }

  return null;
}

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, { endpoint, type }) => {
      // Get tokens from cookies only
      const token = getCookie("token");
      const verifyToken = getCookie("verifyToken");

      if (verifyToken) {
        headers.set("resettoken", verifyToken);
      }
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      // RTK Query automatically handles FormData and won't set Content-Type for it
      // Only set Content-Type for JSON requests (not for FormData)
      // Check if this is updateProfile mutation - it might use FormData
      const isUpdateProfile =
        endpoint === "updateProfile" && type === "mutation";

      // Set Content-Type only if not already set (FormData will have its own)
      // For updateProfile, we'll let RTK Query handle it automatically
      if (!isUpdateProfile && !headers.has("Content-Type")) {
        headers.set("Content-Type", "application/json");
      }

      return headers;
    },
  }),
  tagTypes: ["Auth", "Profile", "RefillTransferSchedule", "Business", "Blog"],
  endpoints: () => ({}),
});
