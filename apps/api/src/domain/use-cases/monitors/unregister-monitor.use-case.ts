import type { GetIdMonitorDto } from "../../dto";
import type { MonitoredUrlRepository } from "../../repositories/monitored-url.repository";

export interface UnregisterMonitorUseCase {
  execute(dto: GetIdMonitorDto): Promise<void>;
}

export class UnregisterMonitorUseCaseImpl implements UnregisterMonitorUseCase {
  constructor(private readonly repository: MonitoredUrlRepository) {}

  execute(dto: GetIdMonitorDto): Promise<void> {
    return this.repository.unregister(dto);
  }
}
