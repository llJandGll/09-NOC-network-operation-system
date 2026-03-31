import type { CronTime, Job, OnTick } from "../../domain/interfaces";
import { CheckUrlDto } from "../../domain/dto";
import { CustomError } from "../../domain/errors/custom.error";
import { GlobalErrorHandler } from "../errors/global-error.handler";

interface NocRunnerOptions {
  scheduleJob: (cronTime: CronTime, onTick: OnTick) => Job;
  checkUrl: (dto: CheckUrlDto) => Promise<boolean>;
}

export class NocRunner {
  constructor() {}

  public static start({ scheduleJob, checkUrl }: NocRunnerOptions): void {
    scheduleJob("*/5 * * * * *", async () => {
      try {
        const url = "www.google.com";

        const [error, checkUrlDto] = CheckUrlDto.create({ url });

        if (error || !checkUrlDto) {
          throw CustomError.validationError(error || "Invalid url");
        }
        const isAliveService = await checkUrl(checkUrlDto);
        const status = isAliveService ? "ALIVE" : "DEAD";
        console.log(`[NOC] ${url} is ${status}`);
      } catch (error) {
        GlobalErrorHandler.handleError(error);
      }
    });
  }
}
