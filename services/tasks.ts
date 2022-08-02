import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Task } from "../features/tasks/taskSlice";

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "/",
  }),
  tagTypes: ["Task"],
  endpoints: (build) => ({
    getTasks: build.query<Task[], void>({
      query: () => ({ url: `api/task` }),
      providesTags: ["Task"],
    }),
    addTask: build.mutation<Task, Partial<Task>>({
      query: ({ ...body }) => ({
        url: `api/task`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Task"],
    }),
    updateTask: build.mutation<Task, Partial<Task> & Pick<Task, "id">>({
      query: ({ id, ...body }) => ({
        url: `api/task/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Task"],
    }),
    duplicateTask: build.mutation<Task, string>({
      query: (id: string) => ({
        url: `api/task/${id}`,
        method: "POST",
      }),
      invalidatesTags: ["Task"],
    }),
    deleteTask: build.mutation<Task, Partial<Task> & Pick<Task, "id">>({
      query: ({ id }) => ({
        url: `api/task/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Task"],
    }),
  }),
});

export const {
  useGetTasksQuery,
  useAddTaskMutation,
  useUpdateTaskMutation,
  useDuplicateTaskMutation,
  useDeleteTaskMutation,
} = api;
