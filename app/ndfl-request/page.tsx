"use client"

import { ChevronRight } from 'lucide-react'
import Link from "next/link"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { ru } from "date-fns/locale"

type PeriodOption = {
  value: string
  label: string
  quarters: number[]
}

const periodOptions: PeriodOption[] = [
  { value: "q1", label: "1 квартал", quarters: [1] },
  { value: "q2", label: "2 квартал", quarters: [2] },
  { value: "q3", label: "3 квартал", quarters: [3] },
  { value: "q4", label: "4 квартал", quarters: [4] },
  { value: "q1-2", label: "1-2 квартал", quarters: [1, 2] },
  { value: "q2-3", label: "2-3 квартал", quarters: [2, 3] },
  { value: "q3-4", label: "3-4 квартал", quarters: [3, 4] },
  { value: "q1-3", label: "1-3 квартал", quarters: [1, 2, 3] },
  { value: "q2-4", label: "2-4 квартал", quarters: [2, 3, 4] },
  { value: "full", label: "Год", quarters: [1, 2, 3, 4] },
]

export default function NdflRequestPage() {
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [period, setPeriod] = useState("q1")
  const [year, setYear] = useState("2024")
  const [copies, setCopies] = useState("2")

  // Функция для получения текстового описания периода
  const getPeriodText = (periodValue: string) => {
    const selectedPeriod = periodOptions.find(p => p.value === periodValue)
    if (!selectedPeriod) return ""

    if (selectedPeriod.value === "full") {
      return `${year} год`
    }

    if (selectedPeriod.quarters.length === 1) {
      return `${selectedPeriod.quarters[0]} квартал ${year} года`
    }

    const firstQ = selectedPeriod.quarters[0]
    const lastQ = selectedPeriod.quarters[selectedPeriod.quarters.length - 1]
    return `${firstQ}-${lastQ} кварталы ${year} года`
  }

  // Автоматически сгенерированный текст заявления
  const requestText = `Прошу выдать мне справку по форме 2-НДФЛ «Справка о доходах и суммах налога физического лица» за ${getPeriodText(period)} в количестве ${copies} экземпляров в соответствии с п.3 ст.230 НК РФ.`

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Breadcrumb */}
      <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-8">
        <Link href="/" className="hover:text-blue-600">Главная</Link>
        <ChevronRight className="h-4 w-4" />
        <span>Создать заявку: Справка 2-НДФЛ</span>
      </nav>

      <div className="mb-8">
        <h1 className="text-2xl font-semibold mb-4">
          Заявление на получение справки 2-НДФЛ
        </h1>
        <div className="text-right text-sm text-gray-600 space-y-1">
          <p>Генеральному директору</p>
          <p>ООО &ldquo;Бюро 1440&rdquo;</p>
          <p>Шелобкову А. А.</p>
          <p>от {`<Должность>`}</p>
          <p>{`<ФИО>`}</p>
        </div>
      </div>

      <form className="space-y-6">
        {/* Период */}
        <div className="space-y-2">
          <label className="block">
            <span className="text-sm text-red-500 mr-1">*</span>
            Период
          </label>
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Выберите период" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="full">За год</SelectItem>
              <SelectItem value="q1">1 квартал</SelectItem>
              <SelectItem value="q2">2 квартал</SelectItem>
              <SelectItem value="q3">3 квартал</SelectItem>
              <SelectItem value="q4">4 квартал</SelectItem>
              <SelectItem value="q1-2">1-2 кварталы</SelectItem>
              <SelectItem value="q2-3">2-3 кварталы</SelectItem>
              <SelectItem value="q3-4">3-4 кварталы</SelectItem>
              <SelectItem value="q1-3">1-3 кварталы</SelectItem>
              <SelectItem value="q2-4">2-4 кварталы</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Год */}
        <div className="space-y-2">
          <label className="block">
            <span className="text-sm text-red-500 mr-1">*</span>
            Год
          </label>
          <Select value={year} onValueChange={setYear}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Выберите год" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2024">2024</SelectItem>
              <SelectItem value="2023">2023</SelectItem>
              <SelectItem value="2022">2022</SelectItem>
              <SelectItem value="2021">2021</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Количество экземпляров */}
        <div className="space-y-2">
          <label className="block">
            <span className="text-sm text-red-500 mr-1">*</span>
            Количество экземпляров
          </label>
          <Select value={copies} onValueChange={setCopies}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Выберите количество" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1 экземпляр</SelectItem>
              <SelectItem value="2">2 экземпляра</SelectItem>
              <SelectItem value="3">3 экземпляра</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Дата */}
        <div className="space-y-2">
          <label className="block">
            <span className="text-sm text-red-500 mr-1">*</span>
            Дата
          </label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !selectedDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {selectedDate ? format(selectedDate, 'dd.MM.yyyy', { locale: ru }) : "Выберите дату"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Предпросмотр текста заявления */}
        <div className="space-y-2">
          <label className="block">Текст заявления</label>
          <div className="p-4 border rounded-md bg-gray-50">
            {requestText}
          </div>
        </div>

        {/* Executor */}
        <div className="space-y-2">
          <label className="block">
            <span className="text-sm text-red-500 mr-1">*</span>
            Исполнитель
          </label>
          <Select defaultValue="hr">
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Выберите исполнителя" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="hr">HR Department</SelectItem>
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