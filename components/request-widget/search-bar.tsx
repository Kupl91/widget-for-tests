"use client"

import { X } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { useCallback } from 'react'

interface SearchBarProps {
  value: string
  onSearch: (query: string) => void
  onClear: () => void
}

export function SearchBar({ value, onSearch, onClear }: SearchBarProps) {
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value);
  }, [onSearch]);

  return (
    <div className="flex-1 relative">
      <Input 
        placeholder="Что нужно сделать?" 
        value={value}
        onChange={handleChange}
        className="pr-10"
      />
      {value && (
        <button
          onClick={onClear}
          className="absolute right-3 top-1/2 -translate-y-1/2"
        >
          <X className="h-4 w-4 text-gray-500" />
        </button>
      )}
    </div>
  )
}