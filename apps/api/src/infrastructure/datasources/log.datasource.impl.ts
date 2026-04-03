import fs from "fs";
import { fileURLToPath } from "url";
import path from "path";

import type { LogDatasource } from "../../domain/datasources";
import type { LogEntity } from "../../domain/entities";
import { SeverityLevel } from "../../domain/interfaces";

export class LogDatasourceImpl implements LogDatasource {
  private readonly logPath: string = "logs";
  private readonly allLogsPath: string;
  private readonly lowPath: string;
  private readonly mediumPath: string;
  private readonly highPath: string;

  constructor() {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    this.logPath = path.join(__dirname, `../../../${this.logPath}`);
    this.allLogsPath = path.join(this.logPath, "all-logs.log");
    this.lowPath = path.join(this.logPath, "logs-low.log");
    this.mediumPath = path.join(this.logPath, "logs-medium.log");
    this.highPath = path.join(this.logPath, "logs-high.log");

    this.createLogsFiles();
  }

  private createLogsFiles = () => {
    if (!fs.existsSync(this.logPath)) {
      fs.mkdirSync(this.logPath, { recursive: true });
    }
  };

  async save(log: LogEntity): Promise<void> {
    const message = `${JSON.stringify(log)}\n`;
    switch (log.level) {
      case SeverityLevel.LOW:
        await fs.promises.appendFile(this.allLogsPath, message);
        await fs.promises.appendFile(this.lowPath, message);
        break;
      case SeverityLevel.MEDIUM:
        await fs.promises.appendFile(this.allLogsPath, message);
        await fs.promises.appendFile(this.mediumPath, message);
        break;
      case SeverityLevel.HIGH:
        await fs.promises.appendFile(this.allLogsPath, message);
        await fs.promises.appendFile(this.highPath, message);
        break;
      default:
        throw new Error("Invalid severity level");
    }
  }
  getLogs(severityLevel: SeverityLevel): Promise<LogEntity[]> {
    switch (severityLevel) {
      case SeverityLevel.LOW:
        return this.readLogs(this.lowPath);
      case SeverityLevel.MEDIUM:
        return this.readLogs(this.mediumPath);
      case SeverityLevel.HIGH:
        return this.readLogs(this.highPath);
      default:
        throw new Error("Invalid severity level");
    }
  }

  private readLogs(path: string): Promise<LogEntity[]> {
    return fs.promises
      .readFile(path, "utf-8")
      .then((data) => {
        return data
          .split("\n")
          .filter((line) => line.trim() !== "")
          .map((line) => JSON.parse(line));
      })
      .catch(() => []);
  }
}
