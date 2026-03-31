import { z } from "zod";

export const getIdMonitorSchema = z.object({
  id: z.uuid(),
});

export type GetIdMonitorSchema = z.infer<typeof getIdMonitorSchema>;
