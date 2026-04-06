import type { CheckUrlDto } from "../../dto";
import { LogEntity } from "../../entities";
import type { CheckUrlRepository, LogRepository } from "../../repositories";
import { SeverityLevel } from "../../interfaces";
import { SaveLogUseCaseImpl } from "../logs/save-log.use-case";

export interface CheckUrlUseCase {
  execute(dto: CheckUrlDto): Promise<boolean>;
}

export class CheckUrlUseCaseImpl implements CheckUrlUseCase {
  constructor(
    private readonly checkUrlRepository: CheckUrlRepository,
    private readonly logRepository: LogRepository,
  ) {}

  async execute(dto: CheckUrlDto): Promise<boolean> {
    const isAlive = await this.checkUrlRepository.checkUrl(dto);
    const status = isAlive ? "ALIVE" : "DEAD";
    const level = isAlive ? SeverityLevel.LOW : SeverityLevel.HIGH;
    const log = new LogEntity(
      crypto.randomUUID(),
      `Service ${dto.url} ${status}`,
      level,
      new Date(),
      "check-url.use-case.ts",
    );
    await new SaveLogUseCaseImpl(this.logRepository).execute(log);
    return isAlive;
  }
}
