import type { Request, Response } from "express";
import { CreateMonitorDto, GetIdMonitorDto } from "../../../domain/dto";
import { HttpError } from "../../errors/http.error";
import {
  ListMonitorsUseCaseImpl,
  RegisterMonitorUseCaseImpl,
  UnregisterMonitorUseCaseImpl,
} from "../../../domain/use-cases";
import type { MonitoredUrlRepository } from "../../../domain/repositories/monitored-url.repository";
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

    try {
      const monitor = await new RegisterMonitorUseCaseImpl(
        this.repository,
      ).execute(dto);
      this.registry.register(monitor);
      res.status(201).json({ ok: true, monitor });
    } catch (err) {
      throw err;
    }
  };

  list = async (_req: Request, res: Response): Promise<void> => {
    try {
      const monitors = await new ListMonitorsUseCaseImpl(
        this.repository,
      ).execute();
      res.status(200).json({ ok: true, monitors });
    } catch (err) {
      throw err;
    }
  };

  unregister = async (req: Request, res: Response): Promise<void> => {
    const [error, dto] = GetIdMonitorDto.create(req.params);

    if (error || !dto) {
      throw HttpError.badRequest(error ?? "Invalid request body");
    }

    try {
      await new UnregisterMonitorUseCaseImpl(this.repository).execute(dto);
      this.registry.unregister(dto.id);
      res.status(200).json({ ok: true });
    } catch (err) {
      throw err;
    }
  };
}
