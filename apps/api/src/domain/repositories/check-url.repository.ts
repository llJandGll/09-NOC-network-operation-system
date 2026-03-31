import type { CheckUrlDto } from "../dto";

export abstract class CheckUrlRepository {
  abstract checkUrl(dto: CheckUrlDto): Promise<boolean>;
}
