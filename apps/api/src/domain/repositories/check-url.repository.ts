import type { CheckUrlDto } from "../dto";

export abstract class CheckUrlRepository {
  abstract check(dto: CheckUrlDto): Promise<boolean>;
}
