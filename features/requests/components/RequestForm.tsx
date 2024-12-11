import { useForm, DefaultValues } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"

export const baseRequestSchema = z.object({
  managerId: z.string().min(1, "Выберите руководителя"),
  executorId: z.string().min(1, "Выберите исполнителя"),
  description: z.string().optional(),
})

export type BaseRequestFormData = z.infer<typeof baseRequestSchema>

interface RequestFormProps<T extends BaseRequestFormData> {
  onSubmit: (data: T) => Promise<void>
  schema: z.ZodType<T>
  defaultValues?: DefaultValues<T>
  children: React.ReactNode
}

export function RequestForm<T extends BaseRequestFormData>({
  onSubmit,
  schema,
  defaultValues,
  children
}: RequestFormProps<T>) {
  const form = useForm<T>({
    resolver: zodResolver(schema),
    defaultValues
  })

  const handleSubmit = async (data: T) => {
    try {
      await onSubmit(data)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
      {children}
      
      <div className="flex justify-end space-x-4 pt-4">
        <Button variant="outline" type="button">
          Отмена
        </Button>
        <Button type="submit">
          Создать
        </Button>
      </div>
    </form>
  )
} 