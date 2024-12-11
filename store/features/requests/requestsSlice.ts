import { RootState } from '@/store/store'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { DepartmentType } from '@/components/request-widget/types'

interface RequestsState {
  selectedDepartment: keyof DepartmentType
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
    setSelectedDepartment: (state, action: PayloadAction<keyof DepartmentType>) => {
      state.selectedDepartment = action.payload
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload
    },
  },
})

export const { setSelectedDepartment, setSearchQuery } = requestsSlice.actions
export const selectRequests = (state: RootState) => state.requests 