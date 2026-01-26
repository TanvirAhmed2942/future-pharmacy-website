import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Strips HTML tags from a string and returns plain text
 * Works in both server and client environments
 * @param html - HTML string to strip
 * @returns Plain text without HTML tags
 */
export function stripHtmlTags(html: string): string {
  if (!html) return "";
  // Remove HTML tags using regex (works in both server and client)
  let text = html.replace(/<[^>]*>/g, ""); // Remove all HTML tags
  
  // Decode common HTML entities
  const entityMap: Record<string, string> = {
    "&nbsp;": " ",
    "&amp;": "&",
    "&lt;": "<",
    "&gt;": ">",
    "&quot;": '"',
    "&#39;": "'",
    "&apos;": "'",
    "&mdash;": "—",
    "&ndash;": "–",
    "&hellip;": "...",
  };
  
  // Replace HTML entities
  Object.entries(entityMap).forEach(([entity, char]) => {
    text = text.replace(new RegExp(entity, "g"), char);
  });
  
  // Replace numeric HTML entities (e.g., &#160;)
  text = text.replace(/&#\d+;/g, " ");
  
  // Replace hex HTML entities (e.g., &#xA0;)
  text = text.replace(/&#x[0-9A-Fa-f]+;/g, " ");
  
  // Clean up whitespace
  text = text
    .replace(/\s+/g, " ") // Replace multiple spaces with single space
    .replace(/\n\s*\n/g, "\n") // Remove empty lines
    .trim(); // Remove leading/trailing whitespace
  
  return text;
}

/**
 * Truncates text to a specified character limit
 * @param text - Text to truncate
 * @param maxLength - Maximum character length (default: 60)
 * @returns Truncated text with ellipsis if needed
 */
export function truncateText(text: string, maxLength: number = 60): string {
  if (!text) return "";
  const trimmed = text.trim();
  if (trimmed.length <= maxLength) return trimmed;
  return trimmed.substring(0, maxLength).trim() + "...";
}
