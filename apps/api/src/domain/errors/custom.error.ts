import { ErrorType } from "../interfaces/";
export class CustomError extends Error {
  constructor(
    public readonly type: ErrorType,
    public readonly message: string,
  ) {
    super(message);
  }

  static networkError(message: string): CustomError {
    return new CustomError(ErrorType.NETWORK_ERROR, message);
  }

  static validationError(message: string): CustomError {
    return new CustomError(ErrorType.VALIDATION_ERROR, message);
  }

  static timeoutError(message: string): CustomError {
    return new CustomError(ErrorType.TIMEOUT_ERROR, message);
  }

  static dnsError(url: string): CustomError {
    return new CustomError(ErrorType.DNS_ERROR, `DNS error for url: ${url}`);
  }

  static unknownError(message: string): CustomError {
    return new CustomError(ErrorType.UNKNOWN_ERROR, message);
  }
}
