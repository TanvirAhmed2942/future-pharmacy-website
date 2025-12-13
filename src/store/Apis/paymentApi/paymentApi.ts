import { baseApi } from "@/store/Apis/baseApi";

export interface PaymentItem {
  _id: string;
  email?: string;
  method?: string;
  amount?: number;
  status?: string;
  transactionId?: string;
  prescriptionOrderId?: string;
  transactionDate?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface PaymentMeta {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
}

export interface PaymentResponse {
  success: boolean;
  message: string;
  data: {
    meta: PaymentMeta;
    result: PaymentItem[];
  };
}

export interface PaymentQuery {
  page?: number;
  limit?: number;
}

export const paymentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPayment: builder.query<PaymentResponse, PaymentQuery | void>({
      query: (params) => {
        return {
          url: "/payment",
          method: "GET",
          params: params || { page: 1, limit: 10 },
        };
      },
      providesTags: ["Payment"],
    }),
  }),
  overrideExisting: true,
});

export const { useGetPaymentQuery } = paymentApi;
