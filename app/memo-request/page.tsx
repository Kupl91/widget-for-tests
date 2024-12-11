"use client"

import { ChevronRight, CalendarIcon } from 'lucide-react'
import Link from "next/link"
import { useState } from "react"
import { format } from "date-fns"
import { ru } from "date-fns/locale"

import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"

type Recipient = {
  position: string
  name: string
}

const recipients: Recipient[] = [
  {
    position: "Генеральный директор",
    name: "Шелобков А. А.",
  },
  // Добавьте других получателей по необходимости
]

export default function MemoRequestPage() {
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [recipient, setRecipient] = useState("0") // индекс получателя
  const [subject, setSubject] = useState("")
  const [content, setContent] = useState("")
  const [position, setPosition] = useState("")
  const [fullName, setFullName] = useState("")

  // Генерация текста служебной записки
  const memoText = `${recipients[parseInt(recipient)].position}
ООО "Бюро 1440"
${recipients[parseInt(recipient)].name}

от ${position}
${fullName}

Служебная записка

${content}

${selectedDate ? format(selectedDate, 'dd.MM.yyyy', { locale: ru }) : ""}
${fullName}
`

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Breadcrumb */}
      <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-8">
        <Link href="/" className="hover:text-blue-600">Главная</Link>
        <ChevronRight className="h-4 w-4" />
        <span>Создать заявку: Служебная записка</span>
      </nav>

      <h1 className="text-2xl font-semibold mb-8">
        Создать служебную записку
      </h1>

      <form className="space-y-6">
        {/* Получатель */}
        <div className="space-y-2">
          <label className="block">
            <span className="text-sm text-red-500 mr-1">*</span>
            Кому
          </label>
          <Select value={recipient} onValueChange={setRecipient}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Выберите получателя" />
            </SelectTrigger>
            <SelectContent>
              {recipients.map((r, index) => (
                <SelectItem key={index} value={index.toString()}>
                  {r.position} - {r.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* От кого */}
        <div className="space-y-2">
          <label className="block">
            <span className="text-sm text-red-500 mr-1">*</span>
            Должность составителя
          </label>
          <Input
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            placeholder="Укажите вашу должность"
          />
        </div>

        <div className="space-y-2">
          <label className="block">
            <span className="text-sm text-red-500 mr-1">*</span>
            ФИО составителя
          </label>
          <Input
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Укажите ва��е ФИО"
          />
        </div>

        {/* Тема */}
        <div className="space-y-2">
          <label className="block">
            <span className="text-sm text-red-500 mr-1">*</span>
            Тема
          </label>
          <Input
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Укажите тему служебной записки"
          />
        </div>

        {/* Содержание */}
        <div className="space-y-2">
          <label className="block">
            <span className="text-sm text-red-500 mr-1">*</span>
            Содержание
          </label>
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Опишите ситуацию, предложение или объяснение"
            className="min-h-[200px]"
          />
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

        {/* Предпросмотр */}
        <div className="space-y-2">
          <label className="block">Предпросмотр служебной записки</label>
          <div className="p-4 border rounded-md bg-gray-50 whitespace-pre-line">
            {memoText}
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex justify-end space-x-4 pt-4">
          <Link href="/">
            <Button variant="outline" type="button">
              Отмена
            </Button>
          </Link>
          <Button type="submit">
            Создать
          </Button>
        </div>
      </form>
    </div>
  )
} 