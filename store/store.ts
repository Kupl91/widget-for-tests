import { configureStore } from '@reduxjs/toolkit'
import { requestsApi } from './features/requests/requestsApi'
import { requestsSlice } from './features/requests/requestsSlice'

export const store = configureStore({
  reducer: {
    [requestsApi.reducerPath]: requestsApi.reducer,
    requests: requestsSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(requestsApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch 