export const ErrorType = {
  VALIDATION_ERROR: "validation_error",
  NETWORK_ERROR: "network_error",
  TIMEOUT_ERROR: "timeout_error",
  DNS_ERROR: "dns_error",
  UNKNOWN_ERROR: "unknown_error",
} as const;

export type ErrorType = (typeof ErrorType)[keyof typeof ErrorType];
