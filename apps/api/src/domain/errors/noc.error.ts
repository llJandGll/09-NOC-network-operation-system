export type NocErrorType =
  | "VALIDATION_ERROR"
  | "NETWORK_DOWN"
  | "TIMEOUT"
  | "DNS_ERROR"
  | "BUSINESS_RULE";

export class NocError extends Error {
  private constructor(
    public readonly type: NocErrorType,
    public override readonly message: string,
  ) {
    super(message);
    this.name = "NocError";
  }

  static validation(message: string): NocError {
    return new NocError("VALIDATION_ERROR", message);
  }

  static network(message: string): NocError {
    return new NocError("NETWORK_DOWN", message);
  }

  static timeout(message: string): NocError {
    return new NocError("TIMEOUT", message);
  }

  static dns(url: string): NocError {
    return new NocError("DNS_ERROR", `DNS error for url: ${url}`);
  }

  static businessRule(message: string): NocError {
    return new NocError("BUSINESS_RULE", message);
  }
}
