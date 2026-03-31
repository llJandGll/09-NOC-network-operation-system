import type { MonitoredUrlDatasource } from "../../domain/datasources/monitored-url.datasource";
import type { CreateMonitorDto, GetIdMonitorDto } from "../../domain/dto";
import type { MonitoredUrlEntity } from "../../domain/entities/monitored-url.entity";
import { MonitoredUrlRepository } from "../../domain/repositories/monitored-url.repository";

export class MonitoredUrlRepositoryImpl extends MonitoredUrlRepository {
  constructor(private readonly datasource: MonitoredUrlDatasource) {
    super();
  }

  save(dto: CreateMonitorDto): Promise<MonitoredUrlEntity> {
    return this.datasource.save(dto);
  }

  findAll(): Promise<MonitoredUrlEntity[]> {
    return this.datasource.findAll();
  }

  delete(idDto: GetIdMonitorDto): Promise<void> {
    return this.datasource.delete(idDto);
  }
}
