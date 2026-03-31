# NOC - Network Operation System (PROD)

Sistema de monitoreo de disponibilidad de red y servicios, construido bajo los principios de **Clean Architecture** y **Domain-Driven Design (DDD)**.

## 🚀 Estado Actual
El sistema cuenta con un motor de monitoreo basado en Jobs (Cron) que verifica la disponibilidad de URLs externas, manejando errores de red, DNS y timeouts de forma centralizada y tipada.

## 🏛️ Arquitectura
- **Domain:** Entidades, DTOs y contratos (interfaces) de la lógica de negocio.
- **Infrastructure:** Implementaciones concretas de repositorios (Fetch API) y adaptadores (Cron).
- **Presentation:** Orquestadores de ejecución y manejadores globales de errores.

## 🔮 Visión de Futuro (Roadmap)
Este proyecto evolucionará hacia un **Servicio de Notificaciones y Agendamiento (Reminder System)**:
- **Gestión de Usuarios:** Autenticación y perfiles.
- **Scheduler Dinámico:** Permitir que los usuarios programen sus propios recordatorios/tareas.
- **Multicanalidad:** Envío de alertas por Email (Nodemailer), Telegram y Push Notifications.
- **Dashboard Web:** Visualización en tiempo real del estado de los servicios y gestión de alertas.

---

## 🛠️ Desarrollo Local

### Instalación
```sh
pnpm install
```

### Ejecutar API (Dev)
```sh
pnpm run dev --filter=@repo/noc-api
```

### Build para Producción
```sh
pnpm build
```
