import { CheckUrlDto } from "../../domain/dto";
import { NocError } from "../../domain/errors/noc.error";
import type { MonitoredUrlEntity } from "../../domain/entities/monitored-url.entity";
import type { CronTime, Job, OnTick } from "../../domain/interfaces";
import { GlobalErrorHandler } from "../errors/global-error.handler";

interface MonitorRegistryOptions {
  scheduleJob: (cronTime: CronTime, onTick: OnTick) => Job;
  checkUrl: (dto: CheckUrlDto) => Promise<boolean>;
}

export class MonitorRegistry {
  private readonly jobs = new Map<string, Job>();

  constructor(private readonly options: MonitorRegistryOptions) {}

  register(monitoredUrl: MonitoredUrlEntity): void {
    if (this.jobs.has(monitoredUrl.id)) return;

    const recurringCronTime = `*/${monitoredUrl.intervalSeconds} * * * * *`;

    const onTickRecurrent: OnTick = async () => {
      try {
        const [error, dto] = CheckUrlDto.create({ url: monitoredUrl.url });

        if (error || !dto) {
          throw NocError.validation(error ?? "Invalid url");
        }

        const isAlive = await this.options.checkUrl(dto);
        const status = isAlive ? "ALIVE" : "DEAD";
        console.log(
          `[NOC] [${monitoredUrl.id}] ${monitoredUrl.url} is ${status}`,
        );
      } catch (error) {
        GlobalErrorHandler.handleBackgroundError(error);
      }
    };

    if (monitoredUrl.startAt && monitoredUrl.startAt > new Date()) {
      const job1 = this.options.scheduleJob(monitoredUrl.startAt, () => {
        const job2 = this.options.scheduleJob(
          recurringCronTime,
          onTickRecurrent,
        );
        this.jobs.set(monitoredUrl.id, job2);
      });
      this.jobs.set(monitoredUrl.id, job1);
    } else {
      const job = this.options.scheduleJob(recurringCronTime, onTickRecurrent);
      this.jobs.set(monitoredUrl.id, job);
    }
  }

  unregister(id: string): void {
    const job = this.jobs.get(id);
    if (!job) return;

    job.stop();
    this.jobs.delete(id);
  }

  restoreAll(monitors: MonitoredUrlEntity[]): void {
    for (const monitor of monitors) {
      this.register(monitor);
    }
  }
}
