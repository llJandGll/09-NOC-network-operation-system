import { Server } from "./presentation/server";
import { EnvsPlugin } from "../config";

(() => {
  main();
})();

function main(): void {
  const server = new Server({ port: EnvsPlugin.getPort() });
  server.start();
}
