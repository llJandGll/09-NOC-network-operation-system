import type { SeverityLevel } from "../interfaces";

export class LogEntity {
  constructor(
    public readonly id: string,
    public readonly message: string,
    public readonly level: SeverityLevel,
    public readonly createdAt: Date,
  ) {}

  public static fromObject(object: { [key: string]: any }): LogEntity {
    const { id, message, level, createdAt } = object;
    return new LogEntity(id, message, level, createdAt);
  }
}
