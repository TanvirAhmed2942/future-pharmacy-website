import { baseApi } from "../baseApi";

interface GetProfileResponse {
  success: boolean;
  message?: string;
  data?: {
    _id: string;
    profile: string;
    first_name: string;
    last_name: string;
    email: string;
    role: string;
    isActive: boolean;
    isDeleted: boolean;
    phone: string;
    dateOfBirth: string;
    gender: string;
    twoStepVerification: boolean;
    createdAt: string;
    updatedAt: string;
  };
  error?: string;
}
interface UpdateProfileResponse {
  success: boolean;
  message?: string;
  data?: {
    _id: string;
  };
  error?: string;
}
interface UpdateProfileRequest {
  firstName: string;
  lastName: string;
  phone: string;
  dateOfBirth: string;
  gender: string;
  profile?: string;
}
export const profileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query<GetProfileResponse, void>({
      query: () => {
        return {
          url: "/users/my-profile",
          method: "GET",
        };
      },
      providesTags: ["Profile"],
    }),
    updateProfile: builder.mutation<
      UpdateProfileResponse,
      UpdateProfileRequest & { profileFile?: File }
    >({
      query: (body) => {
        const { profileFile, ...rest } = body;

        // If there's a file, use FormData
        if (profileFile) {
          const formData = new FormData();
          formData.append("firstName", rest.firstName);
          formData.append("lastName", rest.lastName);
          formData.append("phone", rest.phone);
          formData.append("dateOfBirth", rest.dateOfBirth);
          formData.append("gender", rest.gender);
          formData.append("profile", profileFile);

          return {
            url: "/users/update-my-profile",
            method: "PATCH",
            body: formData,
          };
        }

        // Otherwise, send JSON with profile field
        return {
          url: "/users/update-my-profile",
          method: "PATCH",
          body: {
            firstName: rest.firstName,
            lastName: rest.lastName,
            phone: rest.phone,
            dateOfBirth: rest.dateOfBirth,
            gender: rest.gender,
            profile: rest.profile || "",
          },
        };
      },
      invalidatesTags: ["Profile"],
    }),
  }),
  overrideExisting: true,
});

export const { useGetProfileQuery, useUpdateProfileMutation } = profileApi;
