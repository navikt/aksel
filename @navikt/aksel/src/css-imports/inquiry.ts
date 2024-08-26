import chalk from "chalk";
import Enquirer from "enquirer";
import { AnswersT } from "./config";

export async function inquiry(answers: AnswersT, questions: any[]) {
  return await Enquirer.prompt(
    questions.map((x) => ({
      ...x,
      cancel: () => process.exit(1),
      header: `\n${chalk.gray(
        "Command 'css-imports' will not edit your files directly!",
      )}\n`,
    })),
  )
    .then((a) => {
      Object.entries(a).forEach(([key, value]) => {
        answers[key] = value;
      });
    })
    .catch((error) => {
      if (error.isTtyError) {
        console.info(
          "Oops, something went wrong! Looks like @navikt/aksel-cli can't run in this terminal. Contact Aksel",
        );
      } else {
        console.error(error);
      }
    });
}
