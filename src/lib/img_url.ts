/**
 * Converts a database image path to a full URL
 * @param path - Image path from database (e.g., "uploads\\profile\\image.jpg")
 * @returns Full URL (e.g., "https://humayon5002.binarybards.online/uploads/profile/image.jpg") or empty string if invalid
 */
export const imgUrl = (path?: string) => {
  if (!path || path === "N/A" || path.trim() === "") return "";

  // Get base URL from environment variable (use NEXT_PUBLIC_ prefix for client-side access)
  // Try both NEXT_PUBLIC_IMG_URL and IMG_URL for backward compatibility
  const baseUrl =
    (typeof window !== "undefined"
      ? process.env.NEXT_PUBLIC_IMG_URL
      : process.env.IMG_URL) ||
    process.env.NEXT_PUBLIC_IMG_URL ||
    process.env.IMG_URL ||
    "https://humayon5002.binarybards.online";

  // Convert Windows-style paths to URL paths (backslashes to forward slashes)
  const normalized = path.replace(/\\/g, "/");

  // Remove leading slash from normalized path if present to avoid double slashes
  const cleanPath = normalized.startsWith("/")
    ? normalized.slice(1)
    : normalized;

  // Remove trailing slash from baseUrl if present
  const cleanBaseUrl = baseUrl.endsWith("/") ? baseUrl.slice(0, -1) : baseUrl;

  const fullUrl = `${cleanBaseUrl}/${cleanPath}`;
  return fullUrl;
};
