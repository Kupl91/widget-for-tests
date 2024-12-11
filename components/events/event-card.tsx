import { Card, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Typography } from "@/components/ui/typography"
import { ChevronDown } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"

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
      <CardHeader className="p-0 mb-4">
        <div className="flex items-center justify-between">
          <Typography className="font-medium">{title}</Typography>
          <ChevronDown className="h-4 w-4 text-gray-500" />
        </div>
      </CardHeader>
      <ScrollArea className="h-[300px] pr-4">
        <div className="space-y-4">
          {events.map((event, index) => (
            <div key={index} className="flex items-center gap-3">
              <div className="flex-1">
                <Typography>{`${event.firstName} ${event.lastName}`}</Typography>
                <Typography variant="small" className="text-gray-500">{event.date}</Typography>
              </div>
              <Skeleton className="h-8 w-8 rounded-full" />
            </div>
          ))}
        </div>
      </ScrollArea>
    </Card>
  )
} 