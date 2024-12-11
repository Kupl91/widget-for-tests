"use client"

import * as React from "react"
import { ChevronDown, Users, X } from 'lucide-react'
import Link from "next/link"

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
    "Согласование приказа",
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

export default function RequestWidget() {
  const [selectedDept, setSelectedDept] = React.useState<keyof DepartmentType>("Все сервисы")
  const [searchQuery, setSearchQuery] = React.useState("")

  const displayedRequests = selectedDept === "Все сервисы" 
    ? mostLikelyRequests 
    : departments[selectedDept]

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
                selectedDept !== "Все сервисы" ? "bg-blue-600 text-white hover:bg-blue-700" : ""
              }`}
            >
              {selectedDept}
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[200px]">
            {Object.keys(departments).map((dept) => (
              <DropdownMenuItem 
                key={dept}
                onClick={() => setSelectedDept(dept as keyof DepartmentType)}
                className={selectedDept === dept ? "bg-blue-50" : ""}
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
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pr-10"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2"
            >
              <X className="h-4 w-4 text-gray-500" />
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
        {displayedRequests?.map((title: string, index: number) => (
          <Link 
            key={index}
            href={
              title === "Отпуск по уходу за ребенком до 1,5 лет" 
                ? "/leave-request"
                : title === "Доступ к системам"
                ? "/system-access"
                : title === "Справка 2-НДФЛ"
                ? "/ndfl-request"
                : "#"
            }
          >
            <Card 
              className="p-3 hover:bg-blue-50 cursor-pointer transition-colors"
            >
              <CardDescription className="text-blue-600 text-sm">
                {title}
              </CardDescription>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}

