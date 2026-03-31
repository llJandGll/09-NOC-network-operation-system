import { CheckUrlDatasource } from "../../domain/datasources/check-url.datasource";
import type { CheckUrlDto } from "../../domain/dto";
import { NocError } from "../../domain/errors/noc.error";

export class CheckUrlDatasourceImpl implements CheckUrlDatasource {
  async checkUrl(urlObject: CheckUrlDto): Promise<boolean> {
    try {
      const { url } = urlObject;
      const req = await fetch(url, {
        method: "HEAD",
        signal: AbortSignal.timeout(5000),
      });

      if (!req.ok) {
        throw NocError.network(`${url} no está disponible`);
      }

      return true;
    } catch (error: unknown) {
      if (error instanceof NocError) throw error;

      if (error instanceof TypeError) {
        if (String(error).includes("ENOTFOUND")) {
          throw NocError.dns(urlObject.url);
        }

        if (String(error).includes("ETIMEDOUT")) {
          throw NocError.timeout(urlObject.url);
        }
      }

      if (error instanceof DOMException && error.name === "AbortError") {
        throw NocError.timeout(urlObject.url);
      }

      // Los errores no catalogados se lanzan como errores nativos 
      // para que el GlobalErrorHandler los capture como FATAL
      throw new Error(error instanceof Error ? error.message : "Error no catalogado");
    }
  }
}
