"use client"

import { useMemo, useCallback, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useDebouncedCallback } from 'use-debounce'
import { useGetRequestsQuery } from '@/store/features/requests/requestsApi'
import { setSelectedDepartment, setSearchQuery, selectRequests } from '@/store/features/requests/requestsSlice'
import { ROUTES } from '@/constants/routes'
import { RequestHeader } from './header'
import { SearchBar } from './search-bar'
import { DepartmentSelect } from './department-select'
import { RequestCard } from './request-card'
import { departments, mostLikelyRequests, DepartmentType } from './types'

export function RequestWidget() {
  const dispatch = useDispatch()
  const { selectedDepartment, searchQuery } = useSelector(selectRequests)
  const { isLoading } = useGetRequestsQuery()
  const [debouncedSearchResults, setDebouncedSearchResults] = useState<string[]>([])

  const getAllRequests = useMemo(() => {
    return Object.entries(departments)
      .filter(([dept]) => dept !== "Все сервисы")
      .flatMap(([, requests]) => requests)
  }, [])

  const handleDepartmentChange = useCallback((dept: keyof DepartmentType) => {
    dispatch(setSelectedDepartment(dept))
  }, [dispatch])

  const handleSearch = useDebouncedCallback((query: string) => {
    if (query.length >= 3) {
      const results = getAllRequests.filter(request =>
        request.toLowerCase().includes(query.toLowerCase())
      )
      setDebouncedSearchResults(results)
    } else {
      setDebouncedSearchResults([])
    }
    dispatch(setSearchQuery(query))
  }, 0)

  const handleClearSearch = useCallback(() => {
    dispatch(setSearchQuery(""))
    setDebouncedSearchResults([])
  }, [dispatch])

  const displayedRequests = useMemo(() => {
    if (searchQuery.length >= 3) {
      return debouncedSearchResults
    }
    
    return selectedDepartment === "Все сервисы" 
      ? mostLikelyRequests 
      : departments[selectedDepartment]
  }, [searchQuery, selectedDepartment, debouncedSearchResults])

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-6">
      <RequestHeader />
      
      <div className="flex gap-4 mb-8">
        <DepartmentSelect
          departments={departments}
          selectedDepartment={selectedDepartment}
          onSelect={handleDepartmentChange}
        />
        <SearchBar
          value={searchQuery}
          onSearch={handleSearch}
          onClear={handleClearSearch}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
        {displayedRequests?.map((title, index) => (
          <RequestCard 
            key={index}
            title={title}
            href={getRequestHref(title)}
          />
        ))}
      </div>
    </div>
  )
}

function getRequestHref(title: string): string {
  switch (title) {
    case "Отпуск по уходу за ребенком до 1,5 лет":
      return ROUTES.REQUESTS.LEAVE
    case "Доступ к системам":
      return ROUTES.REQUESTS.SYSTEM_ACCESS
    case "Справка 2-НДФЛ":
      return ROUTES.REQUESTS.NDFL
    case "Согласование служебной записки":
      return ROUTES.REQUESTS.MEMO
    default:
      return ROUTES.HOME
  }
}