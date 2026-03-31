import { Router } from "express";
import { CheckUrlController } from "./check-url.controller";
import { CheckUrlDatasourceImpl } from "../../../infrastructure/datasources/check-url.datasource.impl";
import { CheckUrlRepositoryImpl } from "../../../infrastructure";

export class CheckUrlRoute {
  public static route(): Router {
    const router = Router();

    const checkUrlDatasource = new CheckUrlDatasourceImpl();
    const checkUrlRepository = new CheckUrlRepositoryImpl(checkUrlDatasource);
    const controller = new CheckUrlController(checkUrlRepository);

    router.post("/", controller.checkUrl);

    return router;
  }
}
