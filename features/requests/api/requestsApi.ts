import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { Request, LeaveRequest, MemoRequest } from '@/types/requests'

export const requestsApi = createApi({
  reducerPath: 'requestsApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  tagTypes: ['Request'],
  endpoints: (builder) => ({
    getRequests: builder.query<Request[], void>({
      query: () => 'requests',
      providesTags: ['Request'],
    }),
    
    createLeaveRequest: builder.mutation<LeaveRequest, Partial<LeaveRequest>>({
      query: (body) => ({
        url: 'requests/leave',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Request'],
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled
        } catch (error) {
          // Обработка ошибок
        }
      },
    }),

    createMemoRequest: builder.mutation<MemoRequest, Partial<MemoRequest>>({
      query: (body) => ({
        url: 'requests/memo',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Request'],
    }),
  }),
})

export const {
  useGetRequestsQuery,
  useCreateLeaveRequestMutation,
  useCreateMemoRequestMutation,
} = requestsApi 