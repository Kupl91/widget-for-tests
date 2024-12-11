import { RootState } from '@/store/store'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'


interface RequestsState {
  selectedDepartment: string
  searchQuery: string
  // другие поля
}

const initialState: RequestsState = {
  selectedDepartment: 'Все сервисы',
  searchQuery: '',
}

export const requestsSlice = createSlice({
  name: 'requests',
  initialState,
  reducers: {
    setSelectedDepartment: (state, action: PayloadAction<string>) => {
      state.selectedDepartment = action.payload
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload
    },
  },
})

export const { setSelectedDepartment, setSearchQuery } = requestsSlice.actions
export const selectRequests = (state: RootState) => state.requests 