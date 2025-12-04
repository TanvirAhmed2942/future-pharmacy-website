/**
 * Cookie utility functions
 */

/**
 * Get a cookie value by name
 */
export function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;

  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);

  if (parts.length === 2) {
    return parts.pop()?.split(";").shift() || null;
  }

  return null;
}

/**
 * Set a cookie
 */
export function setCookie(
  name: string,
  value: string,
  options?: {
    maxAge?: number;
    path?: string;
    sameSite?: "Strict" | "Lax" | "None";
    secure?: boolean;
  }
): void {
  if (typeof document === "undefined") return;

  const {
    maxAge = 31536000, // 1 year default
    path = "/",
    sameSite = "Lax",
    secure = false,
  } = options || {};

  // Only set Secure flag in HTTPS
  const isProduction =
    typeof window !== "undefined" && window.location.protocol === "https:";
  const secureFlag = secure || isProduction ? "Secure;" : "";

  document.cookie = `${name}=${value}; path=${path}; max-age=${maxAge}; SameSite=${sameSite}; ${secureFlag}`;
}

/**
 * Delete a cookie
 */
export function deleteCookie(name: string, path: string = "/"): void {
  if (typeof document === "undefined") return;
  document.cookie = `${name}=; path=${path}; max-age=0;`;
}
