import type { MonitoredUrlEntity } from "../../entities/monitored-url.entity";
import type { MonitoredUrlRepository } from "../../repositories/monitored-url.repository";

export interface ListMonitorsUseCase {
  execute(): Promise<MonitoredUrlEntity[]>;
}

export class ListMonitorsUseCaseImpl implements ListMonitorsUseCase {
  constructor(private readonly repository: MonitoredUrlRepository) {}

  execute(): Promise<MonitoredUrlEntity[]> {
    return this.repository.findAll();
  }
}
