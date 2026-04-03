import { z } from "zod";
import { checkUrlSchema } from "../check-url";

export const createMonitorSchema = checkUrlSchema.extend({
  intervalSeconds: z.number().positive(),
  startAt: z
    .coerce.date()
    .refine((d) => d > new Date(), {
      message: "startAt must be a future date",
    })
    .optional(),
});

export type CreateMonitorSchema = z.infer<typeof createMonitorSchema>;
