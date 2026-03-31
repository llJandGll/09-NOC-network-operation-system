import type { CheckUrlDto } from "../dto";

export abstract class CheckUrlDatasource {
  abstract checkUrl(url: CheckUrlDto): Promise<boolean>;
}
