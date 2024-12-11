import { EventCard, type EventItem } from "./event-card"

interface EventsSidebarProps {
  upcomingEvents: { title: string; date: string }[]
  birthdays: EventItem[]
  newEmployees: { firstName: string; lastName: string; position: string }[]
}

export function EventsSidebar({ upcomingEvents, birthdays, newEmployees }: EventsSidebarProps) {
  return (
    <div className="space-y-6">
      <EventCard 
        title="Ближайшие события" 
        events={upcomingEvents.map(event => ({
          firstName: event.title,
          lastName: "",
          date: event.date
        }))} 
      />
      <EventCard 
        title="Дни рождения" 
        events={birthdays} 
      />
      <EventCard 
        title="Новые сотрудники" 
        events={newEmployees.map(employee => ({
          firstName: employee.firstName,
          lastName: employee.lastName,
          date: employee.position
        }))}
      />
    </div>
  )
} 