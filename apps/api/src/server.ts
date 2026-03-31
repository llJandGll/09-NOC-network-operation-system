import { CheckUrlUseCaseImpl } from "./domain/use-cases";
import { CheckUrlRepositoryImpl, CronAdapter } from "./infrastructure";
import { NocRunner } from "./presentation/cronjob/noc-runner";

(() => {
  console.log("Hello World");

  main();
})();

function main() {
  const checkUrlRepository = new CheckUrlRepositoryImpl();
  const checkUrlUseCase = new CheckUrlUseCaseImpl(checkUrlRepository, {
    onSuccess: () => {
      console.log("Success");
    },
    onError: (error) => {
      console.log("Error", error);
    },
  });

  NocRunner.start({
    scheduleJob: CronAdapter.createCronJob,
    checkUrl: checkUrlUseCase.execute,
  });
}
