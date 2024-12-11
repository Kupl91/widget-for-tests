import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import RequestWidget from "@/components/request-widget"
import { ChevronDown } from "lucide-react"

function EventCard({ title, events }: { 
  title: string; 
  events: { 
    firstName: string;
    lastName: string;
    date: string 
  }[] 
}) {
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

export default function Home() {
  const upcomingEvents = [
    { title: "Запуск спутника Россат-7", date: "завтра, 27 июня" },
    { title: "ALL-hands meeting", date: "28 июня" },
    { title: "Корпоратив в Сколково", date: "30 июня" },
  ]

  const birthdays = [
    { firstName: "Евгений", lastName: "Камышанов", date: "СЕГОДНЯ" },
    { firstName: "Роман", lastName: "Буреев", date: "СЕГОДНЯ" },
    { firstName: "Евгений", lastName: "Камышанов", date: "26 ИЮНЯ" },
    { firstName: "Мария", lastName: "Соколова", date: "27 ИЮНЯ" },
    { firstName: "Александр", lastName: "Иванов", date: "28 ИЮНЯ" },
    { firstName: "Екатерина", lastName: "Смирнова", date: "30 ИЮНЯ" }
  ]

  const newEmployees = [
    { firstName: "Роман", lastName: "Буреев", position: "Административный директор" },
    { firstName: "Иван", lastName: "Петров", position: "Руководитель отдела разработки" },
    { firstName: "Анна", lastName: "Сидорова", position: "Директор по маркетингу" },
  ]

  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="container mx-auto p-4 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr,300px] gap-8">
          {/* Основной контент */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-2xl font-semibold">
                Академия 1440:
                <br />
                образовательная платформа
              </h1>
              <div className="flex gap-4">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                  Перейти
                </button>
              </div>
            </div>

            {/* Виджет заявок */}
            <RequestWidget />
          </div>

          {/* Боковая панель */}
          <div className="space-y-6">
            <EventCard 
              title="Ближайшие события" 
              events={upcomingEvents.map(event => ({
                firstName: event.title,
                lastName: "",
                date: event.date
              }))} 
            />
            <EventCard title="Дни рождения" events={birthdays} />
            <EventCard 
              title="Новые сотрудники" 
              events={newEmployees.map(employee => ({
                firstName: employee.firstName,
                lastName: employee.lastName,
                date: employee.position
              }))}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

