import inquirer, { QuestionCollection } from "inquirer";

export async function inquiry(questions: QuestionCollection) {
  return await inquirer.prompt(questions).catch((error) => {
    if (error.isTtyError) {
      console.log(
        "Oops, something went wrong! Looks like @navikt/aksel-cli can't run in this terminal. Contact Aksel"
      );
    } else {
      console.error(error);
    }
  });
}
