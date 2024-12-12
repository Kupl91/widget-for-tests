import { Button } from "@/components/ui/button"

export function AcademyHeader() {
  return (
    <div 
      className="space-y-4 relative" 
      style={{ 
        backgroundImage: 'url(/academy-background.png)', 
        backgroundSize: 'cover', 
        backgroundPosition: 'center', 
        width: '1024px', 
        height: '480px' 
      }}
    >
      <h1 className="text-2xl font-semibold text-white pl-8">
        Академия 1440:
        <br />
        образовательная платформа
      </h1>
      <div className="absolute bottom-8 left-8 text-2xl font-semibold text-white">
        <Button variant="default">
          Перейти
        </Button>
      </div>
    </div>
  )
} 