import { Router } from "express";
import { CheckUrlRoute } from "./routes/checks/check-url.route";
import { MonitorRoute } from "./routes/monitors/monitor.route";

export class AppRouter {
  public static get router(): Router {
    const router = Router();

    router.use("/api/v1/check-url", CheckUrlRoute.route());
    router.use("/api/v1/monitors", MonitorRoute.route());

    return router;
  }
}
