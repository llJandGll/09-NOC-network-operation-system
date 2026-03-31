export class HttpError extends Error {
  private constructor(
    public readonly statusCode: number,
    public override readonly message: string,
  ) {
    super(message);
    this.name = "HttpError";
  }

  static badRequest(message: string): HttpError {
    return new HttpError(400, message);
  }

  static unauthorized(message: string): HttpError {
    return new HttpError(401, message);
  }

  static forbidden(message: string): HttpError {
    return new HttpError(403, message);
  }

  static notFound(message: string): HttpError {
    return new HttpError(404, message);
  }

  static internalServer(message = "Internal Server Error"): HttpError {
    return new HttpError(500, message);
  }
}
