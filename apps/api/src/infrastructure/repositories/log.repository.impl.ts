import type { LogRepository } from "../../domain/repositories";
import type { LogDatasource } from "../../domain/datasources";
import type { LogEntity } from "../../domain/entities";
import type { SeverityLevel } from "../../domain/interfaces";

export class LogRepositoryImpl implements LogRepository {
  constructor(private readonly logDatasource: LogDatasource) {}

  save(log: LogEntity): Promise<void> {
    return this.logDatasource.save(log);
  }

  getLogs(severityLevel: SeverityLevel): Promise<LogEntity[]> {
    return this.logDatasource.getLogs(severityLevel);
  }
}
