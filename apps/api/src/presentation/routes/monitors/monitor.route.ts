import { Router } from "express";
import { CheckUrlDatasourceImpl } from "../../../infrastructure/datasources/check-url.datasource.impl";
import {
  CheckUrlRepositoryImpl,
  MonitoredUrlRepositoryImpl,
  LogRepositoryImpl,
} from "../../../infrastructure";
import { FileMonitoredUrlDatasourceImpl } from "../../../infrastructure/datasources/monitored-url.datasource.impl";
import { LogDatasourceImpl } from "../../../infrastructure/datasources/log.datasource.impl";
import { BrevoMailerAdapter } from "../../../infrastructure/adapters/brevo.adapter";
import { CheckUrlUseCaseImpl, SendAlertEmailUseCaseImpl } from "../../../domain/use-cases";
import { CronAdapter } from "../../../infrastructure/adapters/cron.adapter";
import { MonitorRegistry } from "../../monitor-registry/monitor-registry";
import { MonitorController } from "./monitor.controller";
import { alertEmailTemplate } from "../../email-templates/alert.template";
import { EnvsPlugin } from "../../../../config";

export class MonitorRoute {
  public static route(): Router {
    const router = Router();

    // Datasources
    const checkUrlDatasource = new CheckUrlDatasourceImpl();
    const monitorDatasource = new FileMonitoredUrlDatasourceImpl();
    const logDatasource = new LogDatasourceImpl();

    // Repositories
    const checkUrlRepository = new CheckUrlRepositoryImpl(checkUrlDatasource);
    const monitorRepository = new MonitoredUrlRepositoryImpl(monitorDatasource);
    const logRepository = new LogRepositoryImpl(logDatasource);

    // Mailer
    const mailer = new BrevoMailerAdapter(EnvsPlugin.getBrevoApiKey(), {
      email: EnvsPlugin.getBrevoSenderEmail(),
      name: EnvsPlugin.getBrevoSenderName(),
    });

    // Use Cases
    const checkUrlUseCase = new CheckUrlUseCaseImpl({
      checkUrlRepository,
      logRepository,
      onStatusChange: (url, status, timestamp) => {
        const htmlContent = alertEmailTemplate({ url, status, timestamp });
        new SendAlertEmailUseCaseImpl(mailer).execute({
          to: [{ email: EnvsPlugin.getBrevoSenderEmail() }],
          subject: `[NOC] ${status}: ${url}`,
          htmlContent,
        });
      },
    });

    // Registry
    const registry = new MonitorRegistry({
      scheduleJob: CronAdapter.createCronJob,
      checkUrl: (dto) => checkUrlUseCase.execute(dto),
    });

    const controller = new MonitorController(monitorRepository, registry);

    // [NUEVO] 🔥 ARRANQUE EN CALIENTE 🔥
    // Apenas se configura la ruta, leemos el "Disco Duro" y despertamos a los cronjobs
    monitorRepository.getAll()
      .then(monitors => {
        registry.restoreAll(monitors);
        console.log(`[NOC] 🚀 ${monitors.length} monitores restaurados del disco`);
      })
      .catch(err => console.error("[NOC] ❌ Error al restaurar monitores:", err));

    router.post("/", controller.register);
    router.get("/", controller.list);
    router.delete("/:id", controller.unregister);

    return router;
  }
}
