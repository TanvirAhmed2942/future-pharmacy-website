import { baseApi } from "../baseApi";

interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  success: boolean;
  message?: string;
  data?: {
    user: {
      _id: string;
      profile?: string;
      fullName: string;
      email: string;
      role: string;
    };
    accessToken: string;
    refreshToken: string;
  };
  error?: string;
}

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (body: LoginRequest) => ({
        url: "/auth/login",
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["Auth"],
    }),
  }),
});

export const { useLoginMutation } = authApi;
