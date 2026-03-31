import { z } from "zod";
import { checkUrlSchema } from "../check-url";

export const createMonitorSchema = checkUrlSchema.extend({
  intervalSeconds: z.number().positive(),
});

export type CreateMonitorSchema = z.infer<typeof createMonitorSchema>;
