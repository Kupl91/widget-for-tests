import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { ChevronDown } from "lucide-react"

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
  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-medium">{title}</h2>
        <ChevronDown className="h-4 w-4 text-gray-500" />
      </div>
      <div className="space-y-4">
        {events.map((event, index) => (
          <div key={index} className="flex items-center gap-3">
            <div className="flex-1">
              <p className="text-sm">{`${event.firstName} ${event.lastName}`}</p>
              <p className="text-xs text-gray-500">{event.date}</p>
            </div>
            <Skeleton className="h-8 w-8 rounded-full" />
          </div>
        ))}
      </div>
    </Card>
  )
} 