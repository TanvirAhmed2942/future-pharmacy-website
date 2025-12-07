import { getCookie } from "@/lib/cookies";
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

interface SignupRequest {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  password: string;
  role: string;
  agreement: boolean;
}

interface SignupResponse {
  success: boolean;
  message?: string;
  data?: {
    user?: {
      _id: string;
      profile?: string;
      fullName: string;
      email: string;
      role: string;
    };
    accessToken?: string;
    refreshToken?: string;
    createUserToken?: string;
  };
  error?: string;
}

interface VerifyEmailRequest {
  otp: string;
}

interface VerifyEmailResponse {
  success: boolean;
  message?: string;
  error?: string;
  data?: string;
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
    signup: builder.mutation<SignupResponse, SignupRequest>({
      query: (body: SignupRequest) => ({
        url: "/users/create",
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["Auth"],
    }),
    verifyEmail: builder.mutation<VerifyEmailResponse, VerifyEmailRequest>({
      query: ({ otp }) => {
        const createUserToken = getCookie("createUserToken");

        return {
          url: `/users/create-user-verify-otp`,
          method: "POST",
          body: { otp },
          headers: {
            token: createUserToken || "",
          },
        };
      },
      invalidatesTags: ["Auth"],
    }),
  }),
});

export const { useLoginMutation, useSignupMutation, useVerifyEmailMutation } =
  authApi;
