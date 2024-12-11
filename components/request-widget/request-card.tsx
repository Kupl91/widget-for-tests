"use client"

import Link from "next/link"
import { Card, CardDescription } from "@/components/ui/card"
import { memo } from 'react'

interface RequestCardProps {
  title: string
  href: string
}

export const RequestCard = memo(function RequestCard({ title, href }: RequestCardProps) {
  return (
    <Link href={href}>
      <Card className="p-3 aspect-[3/1] flex items-center hover:bg-blue-50 cursor-pointer transition-colors">
        <CardDescription className="text-blue-600 text-sm">
          {title}
        </CardDescription>
      </Card>
    </Link>
  )
})