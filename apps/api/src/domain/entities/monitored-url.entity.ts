export class MonitoredUrlEntity {
  constructor(
    public readonly id: string,
    public readonly url: string,
    public readonly intervalSeconds: number,
    public readonly createdAt: Date,
  ) {}

  public static fromObject(object: {
    [key: string]: unknown;
  }): MonitoredUrlEntity {
    const { id, url, intervalSeconds, createdAt } = object as {
      id: string;
      url: string;
      intervalSeconds: number;
      createdAt: string | Date;
    };
    return new MonitoredUrlEntity(
      id,
      url,
      intervalSeconds,
      new Date(createdAt),
    );
  }
}
