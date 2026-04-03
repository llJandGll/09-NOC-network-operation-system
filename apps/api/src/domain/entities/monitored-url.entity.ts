export class MonitoredUrlEntity {
  constructor(
    public readonly id: string,
    public readonly url: string,
    public readonly intervalSeconds: number,
    public readonly createdAt: Date,
    public readonly startAt?: Date,
  ) {}

  public static mapFromJson(monitorObj: {
    [key: string]: any;
  }): MonitoredUrlEntity {
    const { id, url, intervalSeconds, createdAt, startAt } = monitorObj;
    return new MonitoredUrlEntity(
      id,
      url,
      intervalSeconds,
      new Date(createdAt),
      startAt ? new Date(startAt) : undefined,
    );
  }

  public static mapToJson(monitor: MonitoredUrlEntity) {
    return {
      id: monitor.id,
      url: monitor.url,
      intervalSeconds: monitor.intervalSeconds,
      createdAt: monitor.createdAt.toISOString(),
      startAt: monitor.startAt?.toISOString() || new Date().toISOString(),
    };
  }
}
