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

export interface BlogResponse {
  success: boolean;
  message: string;
  meta: BlogMeta;
  data: BlogItem[];
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
  }),
  overrideExisting: true,
});

export const {
  useGetBlogQuery,
  useGetBlogDetailsByIdQuery,
  useGetBlogCommentsByIdQuery,
  useCreateBlogCommentMutation,
} = blogApi;
