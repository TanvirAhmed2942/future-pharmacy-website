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
    isSubscriberUser: boolean;
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

        // Always use FormData with the same property names
        const formData = new FormData();
        formData.append("firstName", rest.firstName);
        formData.append("lastName", rest.lastName);
        formData.append("phone", rest.phone);
        formData.append("dateOfBirth", rest.dateOfBirth);
        formData.append("gender", rest.gender);

        // Always append profile field - file if changed, otherwise existing profile string (or empty string)
        if (profileFile) {
          formData.append("profile", profileFile);
        } else {
          formData.append("profile", rest.profile || "");
        }

        return {
          url: "/users/update-my-profile",
          method: "PATCH",
          body: formData,
        };
      },
      invalidatesTags: ["Profile"],
    }),
    twoStepVerification: builder.mutation<GetProfileResponse, void>({
      query: () => {
        return {
          url: "/users/two-step-varification-on-of",
          method: "POST",
        };
      },
      invalidatesTags: ["Profile"],
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetProfileQuery,
  useUpdateProfileMutation,
  useTwoStepVerificationMutation,
} = profileApi;
