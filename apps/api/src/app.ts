import { Server } from "./presentation/server";

(() => {
  main();
})();

function main(): void {
  const server = new Server({ port: 3000 });
  server.start();
}
