import type { LogEntity } from "../entities";
import type { SeverityLevel } from "../interfaces";

export abstract class LogRepository {
  abstract save(log: LogEntity): Promise<void>;
  abstract getLogs(severityLevel: SeverityLevel): Promise<LogEntity[]>;
}
