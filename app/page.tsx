import { AcademyHeader } from "@/components/academy-header"
import { EventsSidebar } from "@/components/events/events-sidebar"
import RequestWidget from "@/components/request-widget"
import { MOCK_UPCOMING_EVENTS, MOCK_BIRTHDAYS, MOCK_NEW_EMPLOYEES } from "@/lib/constants/mock-data"

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="container mx-auto p-4 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr,300px] gap-8">
          <div className="space-y-8">
            <AcademyHeader />
            <RequestWidget />
          </div>
          <EventsSidebar 
            upcomingEvents={MOCK_UPCOMING_EVENTS}
            birthdays={MOCK_BIRTHDAYS}
            newEmployees={MOCK_NEW_EMPLOYEES}
          />
        </div>
      </div>
    </div>
  )
}

