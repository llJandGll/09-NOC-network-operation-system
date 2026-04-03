import type { ErrorRequestHandler } from "express";
import { HttpError } from "./http.error";
import { NocError } from "../../domain/errors";

/**
 * GlobalErrorHandler — Punto único de manejo de errores de toda la aplicación.
 */
export class GlobalErrorHandler {
  /**
   * 1. Manejo de Errores en Background (NOC CronJobs, MonitorRegistry, etc.)
   * No hay cliente HTTP esperando. Solo se loguea (en el futuro a CloudWatch, Sentry, etc.)
   */
  public static handleBackgroundError(error: unknown): void {
    if (error instanceof NocError) {
      console.error(`[NOC] [ALARM] [${error.type}] ${error.message}`);
      // TODO: Disparar notificación por Email/Slack/Telegram
      return;
    }

    if (error instanceof Error) {
      console.error(`[NOC] [WORKER_UNHANDLED] ${error.message}`);
      return;
    }

    console.error(`[NOC] [FATAL_BACKGROUND] Error desconocido:`, error);
  }

  /**
   * 2. Manejo de Errores HTTP (Express routing).
   * Se registra siempre como el último middleware en server.ts
   */
  public static expressErrorMiddleware: ErrorRequestHandler = (
    err,
    _req,
    res,
    _next,
  ) => {
    // Si viene de nuestra clase tipada de HTTP:
    if (err instanceof HttpError) {
      res.status(err.statusCode).json({ ok: false, error: err.message });
      return;
    }

    // Si llegó un error de Dominio (NocError) u otra excepción no controlada a la capa HTTP
    console.error(`[NOC] [CRITICAL_API_ERROR]`, err);
    res.status(500).json({ ok: false, error: "Internal server error" });
  };
}
