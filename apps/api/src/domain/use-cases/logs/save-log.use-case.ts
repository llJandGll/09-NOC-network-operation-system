import type { LogEntity } from "../../entities";
import type { LogRepository } from "../../repositories";

interface SaveLogUseCase {
  execute(log: LogEntity): Promise<void>;
}

export class SaveLogUseCaseImpl implements SaveLogUseCase {
  constructor(private readonly logRepository: LogRepository) {}

  execute(log: LogEntity): Promise<void> {
    return this.logRepository.save(log);
  }
}
