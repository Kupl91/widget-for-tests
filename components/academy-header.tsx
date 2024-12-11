import { Button } from "@/components/ui/button"

export function AcademyHeader() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">
        Академия 1440:
        <br />
        образовательная платформа
      </h1>
      <div className="flex gap-4">
        <Button variant="default">
          Перейти
        </Button>
      </div>
    </div>
  )
} 