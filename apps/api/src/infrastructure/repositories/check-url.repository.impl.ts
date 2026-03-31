import type { CheckUrlDatasource } from "../../domain/datasources/check-url.datasource";
import type { CheckUrlDto } from "../../domain/dto";
import { NocError } from "../../domain/errors/noc.error";
import { CheckUrlRepository } from "../../domain/repositories";

export class CheckUrlRepositoryImpl implements CheckUrlRepository {
  constructor(private readonly datasource: CheckUrlDatasource) {}

  checkUrl(dto: CheckUrlDto): Promise<boolean> {
    return this.datasource.checkUrl(dto);
  }
}
