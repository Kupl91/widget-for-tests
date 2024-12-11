"use client"

import * as React from "react"
import { ChevronDown, Users, X } from 'lucide-react'
import Link from "next/link"
import { useDebouncedCallback } from 'use-debounce'
import { useSelector, useDispatch } from 'react-redux'
import { useGetRequestsQuery, useCreateRequestMutation } from '@/store/features/requests/requestsApi'
import { setSelectedDepartment, setSearchQuery, selectRequests } from '@/store/features/requests/requestsSlice'
import { useMemo, useCallback, memo } from 'react'
import { ROUTES } from '@/constants/routes'

import { Button } from "@/components/ui/button"
import {
  Card,
  CardDescription,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"

// Определяем тип для departments
type DepartmentType = {
  "Все сервисы": never[]
  "ICT": string[]
  "HR": string[]
  "Согл. док-та": string[]
  "Финансы": string[]
}

const departments: DepartmentType = {
  "Все сервисы": [],
  "ICT": [
    "Доступ к системам",
    "Установка ПО",
    "Настройка оборудования",
  ],
  "HR": [
    "Очередной оплачиваемый отпуск",
    "Отпуск без сохранения з/п",
    "Отпуск по беременности и родам",
    "Отпуск по уходу за ребенком до 1,5 лет",
    "Отпуск по уходу за ребенком до 3 лет",
    "Учебный отпуск",
  ],
  "Согл. док-та": [
    "Согласование договора",
    "Сог��асование приказа",
    "Согласование служебной записки",
  ],
  "Финансы": [
    "Авансовый отчет",
    "Заявка на оплату",
    "Справка 2-НДФЛ",
  ],
}

const mostLikelyRequests = [
  "Очередной оплачиваемый отпуск",
  "Доступ к системам",
  "Согласование договора",
  "Авансовый отчет",
  "Установка ПО",
  "Справка 2-НДФЛ",
  "Отпуск без сохранения з/п",
  "Согласование приказа",
] as const

const MemoizedCard = memo(({ title, href }: { title: string; href: string }) => (
  <Link href={href}>
    <Card className="p-3 hover:bg-blue-50 cursor-pointer transition-colors">
      <CardDescription className="text-blue-600 text-sm">
        {title}
      </CardDescription>
    </Card>
  </Link>
))

export default function RequestWidget() {
  const dispatch = useDispatch()
  const { selectedDepartment, searchQuery } = useSelector(selectRequests)
  const { data: requests, isLoading } = useGetRequestsQuery()
  const [createRequest] = useCreateRequestMutation()
  const [debouncedSearchResults, setDebouncedSearchResults] = React.useState<string[]>([])

  // Получаем все доступные заявки из всех департаментов
  const getAllRequests = React.useMemo(() => {
    return Object.entries(departments)
      .filter(([dept]) => dept !== "Все сервисы")
      .flatMap(([, requests]) => requests)
  }, [])

  // Функция поиска с debounce
  const debouncedSearch = useDebouncedCallback((query: string) => {
    if (query.length >= 3) {
      const results = getAllRequests.filter(request =>
        request.toLowerCase().includes(query.toLowerCase())
      )
      setDebouncedSearchResults(results)
    } else {
      setDebouncedSearchResults([])
    }
  }, 300)

  const handleDepartmentChange = useCallback((dept: string) => {
    dispatch(setSelectedDepartment(dept))
  }, [dispatch])

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(e.target.value))
  }, [dispatch])

  // Определяем, какие заявки показывать
  const displayedRequests = useMemo(() => {
    if (searchQuery.length >= 3) {
      return debouncedSearchResults
    }
    
    return selectedDepartment === "Все сервисы" 
      ? mostLikelyRequests 
      : departments[selectedDepartment as keyof DepartmentType]
  }, [searchQuery, selectedDepartment, debouncedSearchResults])

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Создать заявку</h1>
        <Link 
          href="#" 
          className="flex items-center text-blue-600 hover:text-blue-700"
        >
          <Users className="mr-2 h-5 w-5" />
          Кабинет руководителя
        </Link>
      </div>

      <div className="flex gap-4 mb-8">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="outline" 
              className={`w-[200px] justify-between ${
                selectedDepartment !== "Все сервисы" ? "bg-blue-600 text-white hover:bg-blue-700" : ""
              }`}
            >
              {selectedDepartment}
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[200px]">
            {Object.keys(departments).map((dept) => (
              <DropdownMenuItem 
                key={dept}
                onClick={() => handleDepartmentChange(dept as keyof DepartmentType)}
                className={selectedDepartment === dept ? "bg-blue-50" : ""}
              >
                {dept}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="flex-1 relative">
          <Input 
            placeholder="Что нужно сделать?" 
            value={searchQuery}
            onChange={handleSearchChange}
            className="pr-10"
          />
          {searchQuery && (
            <button
              onClick={() => {
                dispatch(setSearchQuery(""))
                setDebouncedSearchResults([])
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2"
            >
              <X className="h-4 w-4 text-gray-500" />
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
        {displayedRequests?.map((title: string, index: number) => (
          <MemoizedCard 
            key={index}
            title={title}
            href={
              title === "Отпуск по уходу за ребенком до 1,5 лет" 
                ? ROUTES.REQUESTS.LEAVE
                : title === "Доступ к системам"
                ? ROUTES.REQUESTS.SYSTEM_ACCESS
                : title === "Справка 2-НДФЛ"
                ? ROUTES.REQUESTS.NDFL
                : title === "Согласование служебной записки"
                ? ROUTES.REQUESTS.MEMO
                : ROUTES.HOME
            }
          />
        ))}
      </div>
    </div>
  )
}

