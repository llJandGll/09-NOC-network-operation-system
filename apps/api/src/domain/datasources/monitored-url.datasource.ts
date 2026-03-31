import type { CreateMonitorDto, GetIdMonitorDto } from "../dto";
import type { MonitoredUrlEntity } from "../entities/monitored-url.entity";

export abstract class MonitoredUrlDatasource {
  abstract save(dto: CreateMonitorDto): Promise<MonitoredUrlEntity>;
  abstract findAll(): Promise<MonitoredUrlEntity[]>;
  abstract delete(id: GetIdMonitorDto): Promise<void>;
}
