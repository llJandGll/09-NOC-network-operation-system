import { checkUrlSchema, type CheckUrlSchema } from "@repo/noc-shared";

export class CheckUrlDto {
  constructor(public readonly url: CheckUrlSchema["url"]) {}

  static create(urlObj: { [key: string]: any }): [string?, CheckUrlDto?] {
    const result = checkUrlSchema.safeParse(urlObj);
    if (!result.success) {
      const message = result.error.issues[0]?.message;
      return [message, undefined];
    }
    const { url } = result.data;
    return [undefined, new CheckUrlDto(url)];
  }
}
