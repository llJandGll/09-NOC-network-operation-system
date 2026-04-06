import type { SeverityLevel } from "../interfaces";

export class LogEntity {
  constructor(
    public readonly id: string,
    public readonly message: string,
    public readonly level: SeverityLevel,
    public readonly createdAt: Date,
    public readonly origin: string,
  ) {}

  public static fromObject(object: { [key: string]: any }): LogEntity {
    const { id, message, level, createdAt, origin } = object;
    return new LogEntity(id, message, level, createdAt, origin);
  }
}
