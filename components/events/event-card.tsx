"use client"

import { Card, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Typography } from "@/components/ui/typography"
import { ChevronDown } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useVirtualizer } from '@tanstack/react-virtual'
import { useRef, useCallback } from 'react'

export type EventItem = {
  firstName: string
  lastName: string
  date: string
}

interface EventCardProps {
  title: string
  events: EventItem[]
}

export function EventCard({ title, events }: EventCardProps) {
  const parentRef = useRef<HTMLDivElement>(null)

  const rowVirtualizer = useVirtualizer({
    count: events.length,
    getScrollElement: () => parentRef.current,
    estimateSize: useCallback(() => 60, []),
    overscan: 5,
  })

  return (
    <Card className="p-4">
      <CardHeader className="p-0 mb-4">
        <div className="flex items-center justify-between">
          <Typography className="font-medium">{title}</Typography>
          <ChevronDown className="h-4 w-4 text-gray-500" />
        </div>
      </CardHeader>
      <ScrollArea className="h-[300px]">
        <div ref={parentRef} className="h-full overflow-auto">
          <div
            style={{
              height: `${rowVirtualizer.getTotalSize()}px`,
              width: '100%',
              position: 'relative',
            }}
          >
            {rowVirtualizer.getVirtualItems().map((virtualRow) => (
              <div
                key={virtualRow.index}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: `${virtualRow.size}px`,
                  transform: `translateY(${virtualRow.start}px)`,
                }}
              >
                <div className="flex items-center gap-3 p-2">
                  <div className="flex-1">
                    <Typography>{`${events[virtualRow.index].firstName} ${events[virtualRow.index].lastName}`}</Typography>
                    <Typography variant="small" className="text-gray-500">{events[virtualRow.index].date}</Typography>
                  </div>
                  <Skeleton className="h-8 w-8 rounded-full" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </ScrollArea>
    </Card>
  )
} 