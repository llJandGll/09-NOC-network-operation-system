import type { Request, Response } from "express";
import { CreateMonitorDto, GetIdMonitorDto } from "../../../domain/dto";
import { HttpError } from "../../errors/http.error";
import {
  ListMonitorsUseCaseImpl,
  CreateMonitorUseCaseImpl,
  UnregisterMonitorUseCaseImpl,
} from "../../../domain/use-cases";
import type { MonitoredUrlRepository } from "../../../domain/repositories";
import type { MonitorRegistry } from "../../monitor-registry/monitor-registry";

export class MonitorController {
  constructor(
    private readonly repository: MonitoredUrlRepository,
    private readonly registry: MonitorRegistry,
  ) {}

  register = async (req: Request, res: Response): Promise<void> => {
    const [error, dto] = CreateMonitorDto.create(req.body);

    if (error || !dto) {
      throw HttpError.badRequest(error ?? "Error al crear el monitoreo");
    }

    const monitor = await new CreateMonitorUseCaseImpl(
      this.repository,
    ).execute(dto);
    this.registry.register(monitor);
    res.status(201).json({ ok: true, monitor });
  };

  list = async (_req: Request, res: Response): Promise<void> => {
    const monitors = await new ListMonitorsUseCaseImpl(
      this.repository,
    ).execute();
    res.status(200).json({ ok: true, monitors });
  };

  unregister = async (req: Request, res: Response): Promise<void> => {
    const [error, dto] = GetIdMonitorDto.create(req.params);

    if (error || !dto) {
      throw HttpError.badRequest(error ?? "Invalid request body");
    }

    await new UnregisterMonitorUseCaseImpl(this.repository).execute(dto);
    this.registry.unregister(dto.id);
    res.status(200).json({ ok: true });
  };
}
