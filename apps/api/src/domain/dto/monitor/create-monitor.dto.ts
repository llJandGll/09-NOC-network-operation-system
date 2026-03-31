import {
  createMonitorSchema,
  type CreateMonitorSchema,
} from "@repo/noc-shared";

export class CreateMonitorDto {
  constructor(
    public readonly url: CreateMonitorSchema["url"],
    public readonly intervalSeconds: CreateMonitorSchema["intervalSeconds"],
  ) {}

  static create(data: {
    [key: string]: unknown;
  }): [string?, CreateMonitorDto?] {
    const result = createMonitorSchema.safeParse(data);

    if (!result.success) {
      const message = result.error.issues[0]?.message;
      return [message, undefined];
    }

    const { url, intervalSeconds } = result.data;

    return [undefined, new CreateMonitorDto(url, intervalSeconds)];
  }
}
