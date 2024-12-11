"use client"

import { Users } from 'lucide-react'
import Link from "next/link"

export function RequestHeader() {
  return (
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
  )
}