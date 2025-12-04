import { baseApi } from "./baseApi";

interface LoginRequest {
  email: string;
  password: string;
}

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
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
