import { baseApi } from "../baseApi";

interface ContactResponse {
  success: boolean;
  message?: string;
  data?: {
    _id: string;
  };
  error?: string;
}

interface ContactRequest {
  fullName: string;
  email: string;
  phoneNumber: string;
  subject: string;
  message: string;
}

export const contactApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createContactMessage: builder.mutation<ContactResponse, ContactRequest>({
      query: (body) => ({
        url: "/contact-us/create-contact",
        method: "POST",
        body,
      }),
    }),
  }),
  overrideExisting: true,
});

// Export types for use in components
export type { ContactResponse, ContactRequest };

export const { useCreateContactMessageMutation } = contactApi;
