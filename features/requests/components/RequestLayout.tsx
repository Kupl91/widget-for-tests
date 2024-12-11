import { ChevronRight } from 'lucide-react'
import Link from "next/link"
import { ROUTES } from "@/constants/routes"

interface RequestLayoutProps {
  children: React.ReactNode
  title: string
}

export function RequestLayout({ children, title }: RequestLayoutProps) {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-8">
        <Link href={ROUTES.HOME} className="hover:text-blue-600">
          Главная
        </Link>
        <ChevronRight className="h-4 w-4" />
        <span>Создать заявку: {title}</span>
      </nav>

      <h1 className="text-2xl font-semibold mb-8">
        Создать заявку: {title}
      </h1>

      {children}
    </div>
  )
} 