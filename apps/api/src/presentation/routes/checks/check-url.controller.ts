import type { NextFunction, Request, Response } from "express";
import { CheckUrlDto } from "../../../domain/dto";
import { HttpError } from "../../errors/http.error";
import { CheckUrlUseCaseImpl } from "../../../domain/use-cases";
import type { CheckUrlRepository } from "../../../domain/repositories";

export class CheckUrlController {
  constructor(private readonly checkUrlRepository: CheckUrlRepository) {}

  checkUrl = async (req: Request, res: Response): Promise<void> => {
    const [error, checkUrlDto] = CheckUrlDto.create(req.body);

    if (error || !checkUrlDto) {
      throw HttpError.badRequest(error ?? "Invalid request body");
    }

    try {
      const isAlive = await new CheckUrlUseCaseImpl(
        this.checkUrlRepository,
      ).execute(checkUrlDto);
      res.status(200).json({ ok: true, isAlive });
    } catch (err) {
      throw err;
    }
  };
}
