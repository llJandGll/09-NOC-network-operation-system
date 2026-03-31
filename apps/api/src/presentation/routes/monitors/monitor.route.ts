import { Router } from "express";
import { CheckUrlDatasourceImpl } from "../../../infrastructure/datasources/check-url.datasource.impl";
import { CheckUrlRepositoryImpl, MonitoredUrlRepositoryImpl } from "../../../infrastructure";
import { FileMonitoredUrlDatasourceImpl } from "../../../infrastructure/datasources/monitored-url.datasource.impl";
import { CronAdapter } from "../../../infrastructure/adapters/cron.adapter";
import { MonitorRegistry } from "../../monitor-registry/monitor-registry";
import { MonitorController } from "./monitor.controller";

export class MonitorRoute {
  public static route(): Router {
    const router = Router();

    // Datasources
    const checkUrlDatasource = new CheckUrlDatasourceImpl();
    const monitorDatasource = new FileMonitoredUrlDatasourceImpl();

    // Repositories
    const checkUrlRepository = new CheckUrlRepositoryImpl(checkUrlDatasource);
    const monitorRepository = new MonitoredUrlRepositoryImpl(monitorDatasource);

    // Registry
    const registry = new MonitorRegistry({
      scheduleJob: CronAdapter.createCronJob,
      checkUrlRepository,
    });

    const controller = new MonitorController(monitorRepository, registry);

    router.post("/", controller.register);
    router.get("/", controller.list);
    router.delete("/:id", controller.unregister);

    return router;
  }
}
