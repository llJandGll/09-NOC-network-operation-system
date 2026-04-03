import type { CreateMonitorDto, GetIdMonitorDto } from "../dto";
import type { MonitoredUrlEntity } from "../entities/monitored-url.entity";

export abstract class MonitoredUrlRepository {
  abstract register(dto: CreateMonitorDto): Promise<MonitoredUrlEntity>;
  abstract getAll(): Promise<MonitoredUrlEntity[]>;
  abstract unregister(id: GetIdMonitorDto): Promise<void>;
}
