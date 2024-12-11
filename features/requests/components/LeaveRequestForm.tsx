import { z } from "zod"
import { RequestForm, baseRequestSchema } from "./RequestForm"

const leaveRequestSchema = baseRequestSchema.extend({
  startDate: z.string(),
  endDate: z.string(),
  location: z.string(),
})

type LeaveRequestFormData = z.infer<typeof leaveRequestSchema> 