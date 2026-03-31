import cors from "cors";
import express, { type Application } from "express";
import { AppRouter } from "./app.router";
import { GlobalErrorHandler } from "./errors/global-error.handler";

interface ServerOptions {
  port: number;
}

export class Server {
  private readonly app: Application = express();
  private readonly port: number;

  constructor(options: ServerOptions) {
    this.port = options.port;
  }

  public start(): void {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cors());

    if (AppRouter.router) {
      this.app.use(AppRouter.router);
    }

    // Global error middleware — must be registered last
    this.app.use(GlobalErrorHandler.expressErrorMiddleware);

    this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
    });
  }
}
