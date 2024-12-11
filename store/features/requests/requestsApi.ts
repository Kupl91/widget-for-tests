import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export type Request = {
  id: string
  type: string
  status: 'pending' | 'approved' | 'rejected'
  createdAt: string
  // другие поля
}

export const requestsApi = createApi({
  reducerPath: 'requestsApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  tagTypes: ['Request'],
  endpoints: (builder) => ({
    getRequests: builder.query<Request[], void>({
      query: () => 'requests',
      providesTags: ['Request'],
    }),
    createRequest: builder.mutation<Request, Partial<Request>>({
      query: (body) => ({
        url: 'requests',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Request'],
    }),
    // другие эндпоинты
  }),
})

export const {
  useGetRequestsQuery,
  useCreateRequestMutation,
} = requestsApi 