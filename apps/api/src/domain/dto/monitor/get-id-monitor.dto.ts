import { getIdMonitorSchema, type GetIdMonitorSchema } from "@repo/noc-shared";

export class GetIdMonitorDto {
  constructor(public readonly id: GetIdMonitorSchema["id"]) {}

  static create(data: { [key: string]: any }): [string?, GetIdMonitorDto?] {
    const result = getIdMonitorSchema.safeParse(data);

    if (!result.success) {
      const message = result.error.issues[0]?.message;
      return [message, undefined];
    }

    const { id } = result.data;

    return [undefined, new GetIdMonitorDto(id)];
  }
}
