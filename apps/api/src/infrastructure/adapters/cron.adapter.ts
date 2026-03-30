import { CronJob } from "cron";
import type { CronTime, Job, OnTick } from "../../domain/interfaces";

export class CronAdapter {
  public static createCronJob(cronTime: CronTime, onTick: OnTick): Job {
    const cronJob = new CronJob(
      cronTime, // cronTime
      onTick, // onTick
      null, // onComplete
      true, // start
      "America/Los_Angeles", // timeZone
    );
    return {
      stop: () => cronJob.stop(),
    };
  }
}
