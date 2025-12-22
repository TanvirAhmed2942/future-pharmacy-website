import { baseApi } from "../baseApi";

// Types for blog API response
export interface BlogItem {
  _id: string;
  title: string;
  date: string;
  image: string;
  description: string;
  isDeleted: boolean;
  blogLikes: string[];
  createdAt: string;
  updatedAt: string;
}

// Comment user info
export interface CommentUser {
  _id: string;
  profile: string;
  first_name: string;
  last_name: string;
}

// Blog comment structure
export interface BlogComment {
  _id: string;
  userId: CommentUser;
  blogId: string;
  message: string;
  createdAt: string;
  updatedAt: string;
}

// Extended blog item with populated comments (for single blog details)
export interface BlogItemWithComments extends BlogItem {
  comments: BlogComment[];
}

export interface BlogMeta {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
}

export interface BlogResponseData {
  allSubscriberCount: number;
  data: BlogItem[];
}

export interface BlogResponse {
  success: boolean;
  message: string;
  meta: BlogMeta;
  data: BlogResponseData;
}

export interface BlogDetailsResponse {
  success: boolean;
  message: string;
  data: BlogItemWithComments;
}

export interface BlogCommentsResponse {
  success: boolean;
  message: string;
  data: BlogComment[];
}

export interface BlogQueryParams {
  page?: number;
  limit?: number;
}

// Create comment input
export interface CreateCommentInput {
  blogId: string;
  message: string;
}

// Create comment response
export interface CreateCommentResponse {
  success: boolean;
  message: string;
  data: BlogComment;
}

// Blog subscriber response
export interface BlogSubscriber {
  email: string;
  isSubscribed: boolean;
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface SubscribeToBlogResponse {
  success: boolean;
  message: string;
  data: BlogSubscriber;
}

// Blog subscribers data
export interface BlogSubscribersData {
  meta: BlogMeta;
  result: {
    allSubscriberCount: number;
    data: BlogSubscriber[];
  };
}

export interface BlogSubscribersResponse {
  success: boolean;
  message: string;
  data: BlogSubscribersData;
}

export const blogApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBlog: builder.query<BlogResponse, BlogQueryParams | void>({
      query: (params) => ({
        url: "/blog",
        method: "GET",
        params: params || { page: 1, limit: 10 },
      }),

      providesTags: ["Blog"],
    }),
    getBlogDetailsById: builder.query<BlogDetailsResponse, string>({
      query: (id) => ({
        url: `/blog/${id}`,
        method: "GET",
      }),
      providesTags: ["Blog"],
    }),
    getBlogCommentsById: builder.query<BlogCommentsResponse, string>({
      query: (id) => ({
        url: `/blog-comment/blog/${id}`,
        method: "GET",
      }),
      providesTags: ["Blog"],
    }),
    createBlogComment: builder.mutation<
      CreateCommentResponse,
      CreateCommentInput
    >({
      query: (comment) => ({
        url: `/blog-comment/create-comment`,
        method: "POST",
        body: comment,
      }),
      invalidatesTags: ["Blog"],
    }),
    createBlogLike: builder.mutation<void, string>({
      query: (blogId) => ({
        url: `/blog/blog-likes/${blogId}`,
        method: "POST",
      }),
      invalidatesTags: ["Blog"],
    }),
    deleteBlogComment: builder.mutation<void, string>({
      query: (commentId) => ({
        url: `/blog-comment/${commentId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Blog"],
    }),
    getBlogSubscribers: builder.query<BlogSubscribersResponse, void>({
      query: () => ({
        url: `/blog-subscriber`,
        method: "GET",
      }),
      providesTags: ["Blog"],
    }),
    subscribeToBlog: builder.mutation<
      SubscribeToBlogResponse,
      { email: string }
    >({
      query: (body) => ({
        url: `/blog-subscriber/create-subscriber`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Blog"],
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetBlogQuery,
  useGetBlogDetailsByIdQuery,
  useGetBlogCommentsByIdQuery,
  useCreateBlogCommentMutation,
  useCreateBlogLikeMutation,
  useDeleteBlogCommentMutation,
  useGetBlogSubscribersQuery,
  useSubscribeToBlogMutation,
} = blogApi;
