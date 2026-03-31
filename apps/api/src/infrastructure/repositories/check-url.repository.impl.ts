import type { CheckUrlDto } from "../../domain/dto";
import { CustomError } from "../../domain/errors/custom.error";
import { CheckUrlRepository } from "../../domain/repositories";

export class CheckUrlRepositoryImpl extends CheckUrlRepository {
  async check(dto: CheckUrlDto): Promise<boolean> {
    try {
      const response = await fetch(dto.url, {
        method: "HEAD",
        signal: AbortSignal.timeout(5000),
      });

      if (!response.ok) {
        throw CustomError.networkError(
          `${dto.url} respondió con status ${response.status}`,
        );
      }

      return true;
    } catch (error) {
      if (error instanceof CustomError) throw error;

      if (error instanceof TypeError) {
        // TypeError en fetch = problemas de red (DNS, conexión rechazada, etc.)
        if (String(error.cause).includes("ENOTFOUND")) {
          throw CustomError.dnsError(dto.url);
        }
        throw CustomError.networkError(error.message);
      }

      if (error instanceof DOMException && error.name === "AbortError") {
        throw CustomError.timeoutError(dto.url);
      }
      throw CustomError.unknownError(
        error instanceof Error ? error.message : "Error no catalogado",
      );
    }
  }
}
