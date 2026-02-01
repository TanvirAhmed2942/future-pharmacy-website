"use client";

/**
 * Reverse geocode: get postal code (zipcode) from lat/lng using Google Geocoder.
 * Must run in browser where window.google is available.
 */
export function reverseGeocodeToZipcode(
  lat: number,
  lng: number
): Promise<string | null> {
  return new Promise((resolve) => {
    if (
      typeof window === "undefined" ||
      !window.google?.maps?.Geocoder
    ) {
      resolve(null);
      return;
    }

    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode(
      {
        location: new window.google.maps.LatLng(lat, lng),
      },
      (results: google.maps.GeocoderResult[] | null, status: google.maps.GeocoderStatus) => {
        if (status !== "OK" || !results?.[0]?.address_components) {
          resolve(null);
          return;
        }

        const postalCode = results[0].address_components.find((c) =>
          c.types.includes("postal_code")
        );
        const zip = postalCode?.long_name?.trim() ?? null;
        resolve(zip || null);
      }
    );
  });
}

/** Normalize US zipcode to 5 digits for comparison (handles ZIP+4). */
export function normalizeZipcode(zip: string): string {
  const digits = zip.replace(/\D/g, "");
  return digits.slice(0, 5);
}

/** Check if a zipcode is in the coverage list (normalized 5-digit comparison). */
export function isZipcodeInCoverage(
  zipcode: string,
  coverageZipcodes: string[]
): boolean {
  if (!zipcode?.trim() || !Array.isArray(coverageZipcodes) || coverageZipcodes.length === 0) {
    return false;
  }
  const normalized = normalizeZipcode(zipcode);
  const coverageSet = new Set(
    coverageZipcodes.map((z) => normalizeZipcode(String(z)))
  );
  return coverageSet.has(normalized);
}

export interface ValidateAddressCoverageResult {
  valid: boolean;
  zipcode: string | null;
}

/**
 * Validate that a location (lat/lng) falls within coverage zipcodes.
 * Uses reverse geocoding to get the zipcode, then checks against coverage list.
 */
export async function validateAddressCoverage(
  location: { lat: number; lng: number },
  coverageZipcodes: string[]
): Promise<ValidateAddressCoverageResult> {
  const zipcode = await reverseGeocodeToZipcode(location.lat, location.lng);
  if (zipcode === null) {
    return { valid: false, zipcode: null };
  }
  const valid = isZipcodeInCoverage(zipcode, coverageZipcodes);
  return { valid, zipcode };
}
