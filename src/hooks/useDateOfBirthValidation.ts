"use client";

export interface UseDateOfBirthValidationOptions {
  /** Minimum age required (default: 13) */
  minAge?: number;
  /** Message when date of birth is empty or invalid */
  requiredMessage?: string;
  /** Message when user is below minimum age */
  underAgeMessage?: string;
}

const DEFAULT_REQUIRED_MESSAGE = "Date of birth is required";
const DEFAULT_UNDER_AGE_MESSAGE =
  "You must be at least 13 years old to use this service";

/**
 * Returns a function that validates a date-of-birth string and returns an error
 * message if the date is empty, invalid, or the person is below the minimum age.
 * Use in forms to validate on select and on submit.
 */
export function useDateOfBirthValidation(
  options: UseDateOfBirthValidationOptions = {}
) {
  const {
    minAge = 13,
    requiredMessage = DEFAULT_REQUIRED_MESSAGE,
    underAgeMessage = DEFAULT_UNDER_AGE_MESSAGE,
  } = options;

  const getDateOfBirthError = (dateStr: string): string | undefined => {
    if (!dateStr.trim()) return requiredMessage;
    const birthDate = new Date(dateStr);
    if (isNaN(birthDate.getTime())) return requiredMessage;
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    const hasHadBirthdayThisYear =
      today.getMonth() > birthDate.getMonth() ||
      (today.getMonth() === birthDate.getMonth() &&
        today.getDate() >= birthDate.getDate());
    const actualAge = hasHadBirthdayThisYear ? age : age - 1;
    return actualAge < minAge ? underAgeMessage : undefined;
  };

  return { getDateOfBirthError };
}
