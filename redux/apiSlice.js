import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import isUserLogged from "../services/isUserLogged";

export const usersApi = createApi({
  reducerPath: "usersApi",

  baseQuery: fetchBaseQuery({
    baseUrl: "https://e-life-server.vercel.app/api/v1/",
    prepareHeaders: (headers, { getState }) => {
      // const token = getState().auth.token;
      const token = isUserLogged.token;

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () => "user/findAlUser",
    }),

    getOneUser: builder.mutation({
      query: (data) => ({
        url: "user/findTheUser",
        method: "POST",
        body: data,
      }),
    }),

    getAllTeacherWithUser: builder.query({
      query: () => "user/findAllTeacherWithUser",
    }),

    updateTheUser: builder.mutation({
      query: (data) => ({
        url: "user/updateTheUser",
        method: "POST",
        body: data,
      }),
    }),
    postUser: builder.mutation({
      query: (data) => ({
        url: "auth/register",
        method: "POST",
        body: data,
      }),
    }),

    loginUser: builder.mutation({
      query: (data) => ({
        url: "auth/login",
        method: "POST",
        body: data,
      }),
    }),
    statusPost: builder.mutation({
      query: (data) => ({
        url: "post/createPost",
        method: "POST",
        body: data,
      }),
    }),
    getAllStatusPost: builder.query({
      query: () => "post/getAllPost",
    }),
    getAllStatusPostWithPagination: builder.mutation({
      query: (data) => ({
        url: "post/getAllPostWithPagination",
        method: "POST",
        body: data,
      }),
    }),
    getThisUserStatusPost: builder.mutation({
      query: (data) => ({
        url: "post/getOneUserPosts",
        method: "POST",
        body: data,
      }),
    }),
    createPostReaction: builder.mutation({
      query: (data) => ({
        url: "post/createReaction",
        method: "POST",
        body: data,
      }),
    }),
    getOnePostReaction: builder.mutation({
      query: (data) => ({
        url: "post/getTheReaction",
        method: "POST",
        body: data,
      }),
    }),
    deletePostReaction: builder.mutation({
      query: (data) => ({
        url: "post/deleteReaction",
        method: "POST",
        body: data,
      }),
    }),

    deleteOnePost: builder.mutation({
      query: (data) => ({
        url: "post/deletePost",
        method: "POST",
        body: data,
      }),
    }),
    updateOnePost: builder.mutation({
      query: (data) => ({
        url: "post/updatePost",
        method: "PATCH",
        body: data,
      }),
    }),
    changePassword: builder.mutation({
      query: (data) => ({
        url: "user/ChangePass",
        method: "POST",
        body: data,
      }),
    }),

    getAllBloodUser: builder.query({
      query: () => "user/GetAllBlood",
    }),
    getAllBatch: builder.mutation({
      query: (data) => ({
        url: "TuitionBatch/getAllBatch",
        method: "POST",
        body: data,
      }),
    }),
    createTuitionBatch: builder.mutation({
      query: (data) => ({
        url: "TuitionBatch/createBatch",
        method: "POST",
        body: data,
      }),
    }),
    searchTuitionBatch: builder.mutation({
      query: (data) => ({
        url: "TuitionBatch/searchBatch",
        method: "POST",
        body: data,
      }),
    }),
    updateTuitionBatch: builder.mutation({
      query: (data) => ({
        url: "TuitionBatch/updateBatch",
        method: "POST",
        body: data,
      }),
    }),
    DeleteTuitionBatch: builder.mutation({
      query: (data) => ({
        url: "TuitionBatch/deleteBatch",
        method: "POST",
        body: data,
      }),
    }),
    getStudentInBatch: builder.mutation({
      query: (data) => ({
        url: "TuitionBatch/getBatchDetails",
        method: "POST",
        body: data,
      }),
    }),
    getTeacherAllBatch: builder.mutation({
      query: (data) => ({
        url: "TuitionBatch/getOneTeacherAllBatch",
        method: "POST",
        body: data,
      }),
    }),
    addStudentInBatch: builder.mutation({
      query: (data) => ({
        url: "TuitionBatch/createBatchDetails",
        method: "POST",
        body: data,
      }),
    }),
    addStudentFee: builder.mutation({
      query: (data) => ({
        url: "TuitionBatch/createFee",
        method: "POST",
        body: data,
      }),
    }),
    deleteStudent: builder.mutation({
      query: (data) => ({
        url: "TuitionBatch/deleteBatchDetails",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useGetOneUserMutation,
  usePostUserMutation,
  useUpdateTheUserMutation,
  useGetOneTeacherMutation,
  useLoginUserMutation,
  useGetAllTeacherWithUserQuery,
  useStatusPostMutation,
  useGetAllStatusPostQuery,
  useDeleteOnePostMutation,
  useUpdateOnePostMutation,
  useCreatePostReactionMutation,
  useDeletePostReactionMutation,
  useGetThisUserStatusPostMutation,
  useChangePasswordMutation,
  useCreateTuitionBatchMutation,
  useUpdateTuitionBatchMutation,
  useAddStudentInBatchMutation,
  useGetStudentInBatchMutation,
  useGetAllBatchMutation,
  useGetOnePostReactionMutation,
  useGetTeacherAllBatchMutation,
  useGetAllBloodUserQuery,
  useAddStudentFeeMutation,
  useSearchTuitionBatchMutation,
  useGetAllStatusPostWithPaginationMutation,
  useDeleteTuitionBatchMutation,
  useDeleteStudentMutation,
} = usersApi;
