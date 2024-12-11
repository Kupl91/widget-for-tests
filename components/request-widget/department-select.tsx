"use client"

import { ChevronDown } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { DepartmentType } from './types'

interface DepartmentSelectProps {
  departments: DepartmentType
  selectedDepartment: keyof DepartmentType
  onSelect: (dept: keyof DepartmentType) => void
}

export function DepartmentSelect({ departments, selectedDepartment, onSelect }: DepartmentSelectProps) {
  return (
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
            onClick={() => onSelect(dept as keyof DepartmentType)}
            className={selectedDepartment === dept ? "bg-blue-50" : ""}
          >
            {dept}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}