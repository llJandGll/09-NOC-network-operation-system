export const SeverityLevel = {
  LOW: "low",
  MEDIUM: "medium",
  HIGH: "high",
  CRITICAL: "critical",
} as const;

export type SeverityLevel = (typeof SeverityLevel)[keyof typeof SeverityLevel];
