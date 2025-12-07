import { baseApi } from "../baseApi";

// Common response interface
interface RefillTransferScheduleResponse {
  success: boolean;
  message?: string;
  data?: {
    _id: string;
  } & Record<string, unknown>;
  error?: string;
}

// Medication item interface
interface MedicationItem {
  medicationName: string;
  rxNumber: string;
}

// Personal info interface
interface PersonalInfo {
  first_name: string;
  last_name: string;
  phone: string;
  dateOfBirth: string; // Format: YYYY-MM-DD
}

// Pharmacy info interface
interface PharmacyInfo {
  name?: string;
  phone?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  address?: string;
  newPharmacyName?: string;
  newPharmacyPhone?: string;
  newPharmacyAddress?: string;
  newPharmacyCity?: string;
  newPharmacyState?: string;
  newPharmacyZipCode?: string;
  availableDateTime?: Array<{ date: string; time: string[] }>;
  serviceType?: string;
  serviceTypeChild?: string;
}

// Delivery info interface
interface DeliveryInfo {
  address: string;
  aptUnit?: string;
  city: string;
  state: string;
  zipCode: string;
}

// Refill request interface
interface RefillRequest {
  requiestType: "refill" | "transfer" | "schedule"; // Note: keeping typo as per API
  personalInfo: PersonalInfo;
  pharmacyInfo: PharmacyInfo;
  deliveryInfo: DeliveryInfo;
  medicationList: MedicationItem[];
  additionalNotes?: string;
}

// Transfer request interface
interface TransferRequest {
  requiestType: "refill" | "transfer" | "schedule"; // Note: keeping typo as per API
  personalInfo: PersonalInfo;
  pharmacyInfo: PharmacyInfo;
  medicationList: MedicationItem[];
  additionalNotes?: string;
}

// Schedule request interface
interface ScheduleRequest {
  requiestType: "refill" | "transfer" | "schedule"; // Note: keeping typo as per API
  personalInfo: PersonalInfo;
  pharmacyInfo: PharmacyInfo;
  additionalNotes?: string;
}

export const refillTransferScheduleApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createRefillRequest: builder.mutation<
      RefillTransferScheduleResponse,
      RefillRequest
    >({
      query: (body) => {
        return {
          url: "/refill-transfer-schedule-request/create",
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["RefillTransferSchedule"],
    }),
    createTransferRequest: builder.mutation<
      RefillTransferScheduleResponse,
      TransferRequest
    >({
      query: (body) => {
        return {
          url: "/refill-transfer-schedule-request/create",
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["RefillTransferSchedule"],
    }),
    createScheduleRequest: builder.mutation<
      RefillTransferScheduleResponse,
      ScheduleRequest
    >({
      query: (body) => {
        return {
          url: "/refill-transfer-schedule-request/create",
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["RefillTransferSchedule"],
    }),
    // Legacy endpoint (keeping for backward compatibility if needed)
    createRefillTransferScheduleRequest: builder.mutation<
      RefillTransferScheduleResponse,
      RefillRequest
    >({
      query: (body) => {
        return {
          url: "/refill-transfer-schedule-request/create",
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["RefillTransferSchedule"],
    }),
  }),
  overrideExisting: true,
});

export const {
  useCreateRefillRequestMutation,
  useCreateTransferRequestMutation,
  useCreateScheduleRequestMutation,
  useCreateRefillTransferScheduleRequestMutation,
} = refillTransferScheduleApi;

// Export types for use in components
export type {
  RefillRequest,
  TransferRequest,
  ScheduleRequest,
  PersonalInfo,
  PharmacyInfo,
  DeliveryInfo,
  MedicationItem,
  RefillTransferScheduleResponse,
};
