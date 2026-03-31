import { z } from "zod";

export const checkUrlSchema = z.object({
  url: z.url(),
});

export type CheckUrlSchema = z.infer<typeof checkUrlSchema>;
