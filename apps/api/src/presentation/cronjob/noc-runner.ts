import { CronJob } from "cron";
import type { CronTime, Job, OnTick } from "../../domain/interfaces";

interface NocRunnerOptions {
  scheduleJob: (cronTime: CronTime, onTick: OnTick) => Job;
  checkUrl: string;
}

export class NocRunner {
  constructor() {}

  public static start({ scheduleJob, checkUrl }: NocRunnerOptions): void {
    scheduleJob("*/5 * * * * *", () => {
      console.log("Hello World");
    });
  }
}
