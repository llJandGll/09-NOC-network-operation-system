import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { MonitoredUrlDatasource } from "../../domain/datasources/monitored-url.datasource";
import type { CreateMonitorDto, GetIdMonitorDto } from "../../domain/dto";
import { MonitoredUrlEntity } from "../../domain/entities/monitored-url.entity";

// Data de semilla (solo la leemos la primera vez)
import { monitors as seedData } from "@repo/database";

/**
 * File-based implementation of MonitoredUrlDatasource.
 *
 * To swap storage: create PostgresMonitoredUrlDatasourceImpl,
 * MongoMonitoredUrlDatasourceImpl, etc. implementing the same abstract class.
 */
export class FileMonitoredUrlDatasourceImpl extends MonitoredUrlDatasource {
  private readonly monitorsPath: string;

  constructor() {
    super();
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    // Guardamos los monitores en la carpeta data/ de la API
    const dataFolder = path.join(__dirname, "../../../data");
    this.monitorsPath = path.join(dataFolder, "monitors.json");

    // Si la carpeta o el archivo no existen, los creamos y "sembramos" la data
    if (!fs.existsSync(dataFolder)) {
      fs.mkdirSync(dataFolder, { recursive: true });
    }

    if (!fs.existsSync(this.monitorsPath)) {
      // Acá guardamos la data inicial que viene del paquete @repo/database
      fs.writeFileSync(this.monitorsPath, JSON.stringify(seedData, null, 2));
    }
  }

  // Helper privado para leer el archivo real
  private async readFromFile(): Promise<any[]> {
    const data = await fs.promises.readFile(this.monitorsPath, "utf-8");
    if (data.length === 0) return [];
    return JSON.parse(data);
  }

  // Helper privado para guardar en el archivo real
  private async saveToFile(monitors: any[]): Promise<void> {
    await fs.promises.writeFile(
      this.monitorsPath,
      JSON.stringify(monitors, null, 2),
    );
  }

  async register(dto: CreateMonitorDto): Promise<MonitoredUrlEntity> {
    const { url, intervalSeconds, startAt } = dto;

    const newMonitor = new MonitoredUrlEntity(
      crypto.randomUUID(),
      url,
      intervalSeconds,
      new Date(),
      startAt,
    );

    const currentMonitors = await this.readFromFile();
    currentMonitors.push(MonitoredUrlEntity.mapToJson(newMonitor));
    await this.saveToFile(currentMonitors);

    return newMonitor;
  }

  async getAll(): Promise<MonitoredUrlEntity[]> {
    const rawMonitors = await this.readFromFile();
    return rawMonitors.map((monitorObj) =>
      MonitoredUrlEntity.mapFromJson(monitorObj),
    );
  }

  async unregister(idDto: GetIdMonitorDto): Promise<void> {
    const currentMonitors = await this.readFromFile();
    const updatedMonitors = currentMonitors.filter((m) => m.id !== idDto.id);
    await this.saveToFile(updatedMonitors);
  }
}
