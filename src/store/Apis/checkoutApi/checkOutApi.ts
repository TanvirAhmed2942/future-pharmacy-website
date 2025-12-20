import { baseApi } from "../baseApi";

export interface CheckoutRequest {
  userId?: string;
  typeUser: "registered" | "guest";
  pickupAddress: string;
  deliveryAddress: string;
  deliveryDate: string; // Format: "2025-12-01"
  deliveryTime: string; // Format: "14:30"
  email: string;
  phone: string;
  legalName: string;
  dateOfBirth: string; // Format: "1997-10-23"
  deliveryInstruction?: string; // Additional instructions
  amount: number;
  serviceCharge: number; // Service charge
  deliveryCharge: number; // Delivery charge (amount if not partner pharmacy, 0 if partner)
}

export interface CheckoutResponse {
  success: boolean;
  message?: string;
  data?: {
    _id?: string;
    url?: string; // Stripe checkout URL
    [key: string]: unknown;
  };
  error?: string;
}

export const checkOutApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createCheckout: builder.mutation<CheckoutResponse, CheckoutRequest>({
      query: (body) => ({
        url: "/prescription-order/create-prescription-order",
        method: "POST",
        body,
      }),
    }),
  }),
  overrideExisting: true,
});

// Export types for use in components
export const { useCreateCheckoutMutation } = checkOutApi;
