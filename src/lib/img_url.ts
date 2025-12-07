/**
 * Converts a database image path to a full URL
 * @param path - Image path from database (e.g., "uploads\\profile\\image.jpg")
 * @returns Full URL (e.g., "http://10.10.7.65:5010/uploads/profile/image.jpg") or empty string if invalid
 */
export const imgUrl = (path?: string) => {
  if (!path || path === "N/A" || path.trim() === "") return "";

  // Get base URL from environment variable or use default
  const baseUrl = process.env.IMG_URL || "http://10.10.7.65:5010";

  // Convert Windows-style paths to URL paths (backslashes to forward slashes)
  const normalized = path.replace(/\\/g, "/");

  // Remove leading slash from normalized path if present to avoid double slashes
  const cleanPath = path ? normalized.slice(0) : normalized;

  console.log("cleanPath", `${baseUrl}/${cleanPath}`);
  return `${baseUrl}/${cleanPath}`;
};
