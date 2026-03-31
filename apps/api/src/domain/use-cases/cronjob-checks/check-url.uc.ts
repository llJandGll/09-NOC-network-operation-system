import type { CheckUrlDto } from "../../dto";
import type { CheckUrlRepository } from "../../repositories";

interface CheckUrlCallbacks {
  onSuccess: () => void;
  onError: (error: Error) => void;
}

interface CheckUrlUseCase {
  execute(dto: CheckUrlDto): Promise<boolean>;
}

export class CheckUrlUseCaseImpl implements CheckUrlUseCase {
  constructor(
    private readonly checkUrlRepository: CheckUrlRepository,
    private readonly callbacks: CheckUrlCallbacks,
  ) {}

  async execute(dto: CheckUrlDto): Promise<boolean> {
    try {
      const result = await this.checkUrlRepository.check(dto);
      this.callbacks.onSuccess();
      return result;
    } catch (error) {
      this.callbacks.onError(error as Error);
      throw error;
    }
  }
}
