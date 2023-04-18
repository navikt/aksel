import inquirer, { QuestionCollection } from "inquirer";
import { AnswersT } from "./config.js";

export async function inquiry(
  answers: AnswersT,
  questions: QuestionCollection
) {
  return await inquirer
    .prompt(questions)
    .then((a) => Object.assign(answers, a))
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
