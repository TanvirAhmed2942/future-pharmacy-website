import { baseApi } from "@/store/Apis/baseApi";

export interface ZipcodeResponse {
  success: boolean;
  message: string;
  data: {
    zipCode: string;
    isExist?: boolean;
    email?: string;
    _id?: string;
    createdAt?: string;
    updatedAt?: string;
    __v?: number;
  };
}

export interface ZipcodeRequest {
  zipCode: string;
  email?: string;
}

export const zipcodeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getZipcode: builder.query<ZipcodeResponse, ZipcodeRequest | void>({
      query: (body) => ({
        url: "/delivery-zone/create",
        method: "POST",
        body,
      }),
      providesTags: ["Zipcode"],
    }),
  }),
  overrideExisting: true,
});

export const { useGetZipcodeQuery, useLazyGetZipcodeQuery } = zipcodeApi;
