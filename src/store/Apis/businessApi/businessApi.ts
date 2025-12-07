import { baseApi } from "../baseApi";

interface SubmitInterestResponse {
  success: boolean;
  message?: string;
  data?: {
    _id: string;
  };
  error?: string;
}

interface SubmitInterestRequest {
  name: string;
  address: string;
  phone: string;
  email: string;
  contactPerson: string;
  title: string;
  yearofBusiness: string;
  message: string;
}

interface SubmitDriverRequest {
  name: string;
  phone: string;
  email: string;
  city: string;
  zipCode: string;
  vehicleType: string;
  yearOfDriverLicense: string;
  message: string;
}

interface SubmitInvestorRequest {
  name: string;
  phone: string;
  email: string;
  organizationName: string;
  organizationType: string;
  website: string;
  yearOfInvestmentExperience: string;
  message: string;
}

interface SubmitOtherBusinessRequest {
  name: string;
  phone: string;
  email: string;
  organizationName: string;
  organizationType: string;
  organizationWebsite: string;
  region: string;
  message: string;
}

export const businessApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    submitInterestPharmacy: builder.mutation<
      SubmitInterestResponse,
      SubmitInterestRequest
    >({
      query: (body) => ({
        url: "/review-pharmacies/create-pharmacie",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Business"],
    }),
    submitInterestDriver: builder.mutation<
      SubmitInterestResponse,
      SubmitDriverRequest
    >({
      query: (body) => ({
        url: "/driver/create-driver",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Business"],
    }),
    submitInterestInvestor: builder.mutation<
      SubmitInterestResponse,
      SubmitInvestorRequest
    >({
      query: (body) => ({
        url: "/investors/create-investors",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Business"],
    }),
    submitInterestOtherBusiness: builder.mutation<
      SubmitInterestResponse,
      SubmitOtherBusinessRequest
    >({
      query: (body) => ({
        url: "/other-business/create-other-business",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Business"],
    }),
  }),
  overrideExisting: true,
});

export const {
  useSubmitInterestPharmacyMutation,
  useSubmitInterestDriverMutation,
  useSubmitInterestInvestorMutation,
  useSubmitInterestOtherBusinessMutation,
} = businessApi;
