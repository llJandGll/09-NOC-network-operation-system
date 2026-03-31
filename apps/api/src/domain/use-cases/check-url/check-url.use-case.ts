import type { CheckUrlDto } from "../../dto";
import type { CheckUrlRepository } from "../../repositories";

export interface CheckUrlUseCase {
  execute(dto: CheckUrlDto): Promise<boolean>;
}

export class CheckUrlUseCaseImpl implements CheckUrlUseCase {
  constructor(private readonly checkUrlRepository: CheckUrlRepository) {}

  async execute(dto: CheckUrlDto): Promise<boolean> {
    return this.checkUrlRepository.checkUrl(dto);
  }
}
