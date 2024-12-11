"use client"

import { ChevronRight } from 'lucide-react'
import Link from "next/link"

import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

export default function SystemAccessPage() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Breadcrumb */}
      <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-8">
        <Link href="/" className="hover:text-blue-600">Главная</Link>
        <ChevronRight className="h-4 w-4" />
        <span>Создать заявку: Доступ к системам</span>
      </nav>

      <h1 className="text-2xl font-semibold mb-8">
        Создать заявку: Доступ к системам
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

        {/* System Select */}
        <div className="space-y-2">
          <label className="block">
            <span className="text-sm text-red-500 mr-1">*</span>
            Система
          </label>
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Выберите систему" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="jira">Jira</SelectItem>
              <SelectItem value="confluence">Confluence</SelectItem>
              <SelectItem value="gitlab">GitLab</SelectItem>
              <SelectItem value="bitbucket">Bitbucket</SelectItem>
              <SelectItem value="jenkins">Jenkins</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Access Level */}
        <div className="space-y-2">
          <label className="block">
            <span className="text-sm text-red-500 mr-1">*</span>
            Уровень доступа
          </label>
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Выберите уровень доступа" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="read">Только чтение</SelectItem>
              <SelectItem value="write">Чтение и запись</SelectItem>
              <SelectItem value="admin">Администратор</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Description */}
        <div className="space-y-2">
          <label className="block">
            <span className="text-sm text-red-500 mr-1">*</span>
            Обоснование
          </label>
          <Textarea 
            placeholder="Опишите, для чего вам нужен доступ к системе"
            className="min-h-[100px]"
          />
        </div>

        {/* Executor */}
        <div className="space-y-2">
          <label className="block">
            <span className="text-sm text-red-500 mr-1">*</span>
            Исполнитель
          </label>
          <Select defaultValue="ict">
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Выберите исполнителя" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ict">ICT Support</SelectItem>
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
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="low">Low</SelectItem>
            </SelectContent>
          </Select>
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