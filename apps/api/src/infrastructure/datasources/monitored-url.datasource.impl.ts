import { MonitoredUrlDatasource } from "../../domain/datasources/monitored-url.datasource";
import type { CreateMonitorDto, GetIdMonitorDto } from "../../domain/dto";
import type { MonitoredUrlEntity } from "../../domain/entities/monitored-url.entity";

/**
 * File-based implementation of MonitoredUrlDatasource.
 * TODO: implement using a JSON/txt file for persistence.
 *
 * To swap storage: create PostgresMonitoredUrlDatasourceImpl,
 * MongoMonitoredUrlDatasourceImpl, etc. implementing the same abstract class.
 */
export class FileMonitoredUrlDatasourceImpl extends MonitoredUrlDatasource {
  save(dto: CreateMonitorDto): Promise<MonitoredUrlEntity> {
    throw new Error("Not implemented — FileMonitoredUrlDatasourceImpl.save()");
  }

  findAll(): Promise<MonitoredUrlEntity[]> {
    throw new Error(
      "Not implemented — FileMonitoredUrlDatasourceImpl.findAll()",
    );
  }

  delete(idDto: GetIdMonitorDto): Promise<void> {
    throw new Error(
      "Not implemented — FileMonitoredUrlDatasourceImpl.delete()",
    );
  }
}
