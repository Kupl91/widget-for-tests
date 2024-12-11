"use client"

import { CalendarIcon, ChevronDown, ChevronRight, Cloud, Upload } from 'lucide-react'
import Link from "next/link"
import { useCreateRequestMutation } from '@/store/features/requests/requestsApi'

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

export default function LeaveRequestPage() {
  const [createRequest, { isLoading }] = useCreateRequestMutation()

  const handleSubmit = async (data: FormData) => {
    try {
      await createRequest({
        type: 'leave',
        // другие данные
      }).unwrap()
      // обработка успеха
    } catch (error) {
      // обработка ошибки
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Breadcrumb */}
      <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-8">
        <Link href="/" className="hover:text-blue-600">Главная</Link>
        <ChevronRight className="h-4 w-4" />
        <span>Создать заявку: Отпуск по уходу за ребенком до 1,5 лет</span>
      </nav>

      <h1 className="text-2xl font-semibold mb-8">
        Создать заявку: Отпуск по уходу за ребенком до 1,5 лет
      </h1>

      <form className="space-y-6">
        {/* Manager Select */}
        <div className="space-y-2">
          <label className="block">
            <span className="text-sm text-red-500 mr-1">*</span>
            Руководитель
          </label>
          <Select defaultValue="alexey">
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Выберите руководителя" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="alexey">Alexey Shamatrin</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Date Range */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block">
              <span className="text-sm text-red-500 mr-1">*</span>
              Отсутствие с
            </label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  16.12.2024
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <label className="block">
              <span className="text-sm text-red-500 mr-1">*</span>
              Отсутствие по
            </label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  24.12.2024
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* Location */}
        <div className="space-y-2">
          <label className="block">
            <span className="text-sm text-red-500 mr-1">*</span>
            Место пребывания
          </label>
          <Select defaultValue="georgia">
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Выберите место" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="georgia">Грузия</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Description */}
        <div className="space-y-2">
          <label className="block">Описание</label>
          <Textarea 
            placeholder="Введите описание"
            className="min-h-[100px]"
          />
        </div>

        {/* File Upload */}
        <div className="border-2 border-dashed rounded-lg p-8 text-center">
          <div className="flex flex-col items-center">
            <Cloud className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-sm text-muted-foreground">
              Перенесите файлы, чтобы прикрепить,<br />или кликните на область
            </p>
          </div>
        </div>

        {/* Executor */}
        <div className="space-y-2">
          <label className="block">
            <span className="text-sm text-red-500 mr-1">*</span>
            Исполнитель
          </label>
          <Select defaultValue="tatiana">
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Выберите исполнителя" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="tatiana">Tatiana Bunyak</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Priority */}
        <div className="space-y-2">
          <label className="block">Приоритет</label>
          <Select defaultValue="medium">
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Выберите приоритет" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="low">Low</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Form Actions */}
        <div className="flex justify-end space-x-4 pt-4">
          <Button variant="outline" type="button">
            Отмена
          </Button>
          <Button type="submit">
            Создать
          </Button>
        </div>
      </form>
    </div>
  )
}

