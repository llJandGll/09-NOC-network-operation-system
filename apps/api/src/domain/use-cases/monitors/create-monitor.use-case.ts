import type { CreateMonitorDto } from "../../dto";
import type { MonitoredUrlEntity } from "../../entities/monitored-url.entity";
import type { MonitoredUrlRepository } from "../../repositories/monitored-url.repository";

export interface CreateMonitorUseCase {
  execute(dto: CreateMonitorDto): Promise<MonitoredUrlEntity>;
}

export class CreateMonitorUseCaseImpl implements CreateMonitorUseCase {
  constructor(private readonly repository: MonitoredUrlRepository) {}

  execute(dto: CreateMonitorDto): Promise<MonitoredUrlEntity> {
    return this.repository.register(dto);
  }
}
