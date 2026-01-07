import { baseApi } from "../baseApi";

// API response types
export interface PharmacyLocation {
  type: string; // "Point"
  coordinates: [number, number]; // [longitude, latitude]
}

export interface PharmacyItem {
  _id: string;
  logo: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  contactPerson: string;
  title: string;
  yearofBusiness: string;
  message: string;
  status: string;
  latitude: number;
  longitude: number;
  location: PharmacyLocation;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface GetPharmaciesResponse {
  success: boolean;
  message: string;
  data: PharmacyItem[];
}

export interface GetPharmaciesParams {
  postCode: string;
  city: string;
  state: string;
}

export const mapApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPharmacies: builder.query<GetPharmaciesResponse, GetPharmaciesParams>({
      query: ({ postCode }) => ({
        url: `/pharmacies/all-pharmacie-by-map?postCode=${postCode}`,
        method: "GET",
      }),
      providesTags: ["Map"],
    }),
    getPartnerPharmaciesLogo: builder.query<
      GetPharmaciesResponse,
      GetPharmaciesParams
    >({
      query: () => ({
        url: `/pharmacies/all-pharmacie-by-map`, //limit 100
        method: "GET",
      }),
      providesTags: ["Map"],
    }),
  }),
  overrideExisting: true,
});

export const { useGetPharmaciesQuery, useGetPartnerPharmaciesLogoQuery } =
  mapApi;
// &city=${city}&state=${state}
