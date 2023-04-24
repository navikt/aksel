import Enquirer from "enquirer";
import { AnswersT } from "./config.js";

export async function inquiry(answers: AnswersT, questions: any[]) {
  return await Enquirer.prompt(
    questions.map((x) => ({ ...x, cancel: () => process.exit(1) }))
  )
    .then((a) => {
      Object.entries(a).forEach(([key, value]) => {
        answers[key] = value;
      });
    })
    .catch((error) => {
      if (error.isTtyError) {
        console.log(
          "Oops, something went wrong! Looks like @navikt/aksel-cli can't run in this terminal. Contact Aksel"
        );
      } else {
        console.error(error);
      }
    });
}
