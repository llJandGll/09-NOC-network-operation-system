import { CustomError } from "../../domain/errors/custom.error";

/**
 * Global Error Handler para capturar cualquier excepción generada
 * en la capa de aplicación o background jobs.
 */
export class GlobalErrorHandler {
  public static handleError(error: unknown): void {
    if (error instanceof CustomError) {
      // Manejo de errores controlados del dominio
      const prefix = `[NOC] [${error.type}]`;
      console.error(`${prefix} ${error.message}`);
      return;
    }

    if (error instanceof Error) {
      // Manejo de errores nativos (Network, Syntax, etc)
      console.error(`[NOC] [UNHANDLED_ERROR] ${error.message}`);
      // Aquí se podría enviar a un centinela de errores en el futuro
      return;
    }

    // Cualquier otra cosa que no sea un objeto Error
    console.error(`[NOC] [FATAL] Error completamente desconocido:`, error);
  }
}
