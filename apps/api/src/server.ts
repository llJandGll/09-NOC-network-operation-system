import { NocRunner } from "./presentation/cronjob/noc-runner";

(() => {
  console.log("Hello World");

  main();
})();

function main() {
  NocRunner.start({
    scheduleJob: (cronTime, onTick) => {
      return {
        stop: () => {},
      };
    },
    checkUrl: "https://google.com",
  });
}
