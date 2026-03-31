import { CheckUrlDto } from "../../domain/dto";
import { NocError } from "../../domain/errors/noc.error";
import type { MonitoredUrlEntity } from "../../domain/entities/monitored-url.entity";
import type { CheckUrlRepository } from "../../domain/repositories";
import type { CronTime, Job, OnTick } from "../../domain/interfaces";
import { GlobalErrorHandler } from "../errors/global-error.handler";

interface MonitorRegistryOptions {
  scheduleJob: (cronTime: CronTime, onTick: OnTick) => Job;
  checkUrlRepository: CheckUrlRepository;
}

export class MonitorRegistry {
  private readonly jobs = new Map<string, Job>();

  constructor(private readonly options: MonitorRegistryOptions) {}

  register(monitoredUrl: MonitoredUrlEntity): void {
    if (this.jobs.has(monitoredUrl.id)) return;

    const cronTime = `*/${monitoredUrl.intervalSeconds} * * * * *`;
    const job = this.options.scheduleJob(cronTime, async () => {
      try {
        const [error, dto] = CheckUrlDto.create({ url: monitoredUrl.url });

        if (error || !dto) {
          throw NocError.validation(error ?? "Invalid url");
        }

        const isAlive = await this.options.checkUrlRepository.checkUrl(dto);
        const status = isAlive ? "ALIVE" : "DEAD";
        console.log(
          `[NOC] [${monitoredUrl.id}] ${monitoredUrl.url} is ${status}`,
        );
      } catch (error) {
        GlobalErrorHandler.handleBackgroundError(error);
      }
    });

    this.jobs.set(monitoredUrl.id, job);
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
