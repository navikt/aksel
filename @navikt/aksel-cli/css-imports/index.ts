import inquirer from "inquirer";

async function main() {
  let answers = {};
  await inquirer
    .prompt([
      {
        type: "list",
        name: "advanced",
        message: "Import config:",
        choices: [
          "Simple import (recommended)",
          "Fine-graind CSS-imports (advanced)",
        ],
      },
      {
        type: "confirm",
        name: "tailwind",
        message: "Add tailwind support?",
        default: false,
      },
    ])
    .then((a) => {
      console.log("Answers: ", a);
      answers = { ...answers, ...a };
    })
    .catch((error) => {
      if (error.isTtyError) {
        console.log(
          "Oops, something went wrong! Looks like aksel-cli can't run in this terminal. Contact Aksel"
        );
      }
    });

  generateImports();
}

function generateImports() {
  console.log(
    `\nAdd these imports to your project:\n
@import "@navikt/ds-css/module/Fonts.css";
@import "@navikt/ds-css/module/Reset.css";
@import "@navikt/ds-css/module/Baseline.css";
@import "@navikt/ds-css/module/Tokens.css";
@import "@navikt/ds-css/module/Typography.css";
@import "@navikt/ds-css/module/Alert.css";
@import "@navikt/ds-css/module/Button.css";
`
  );
}

main();
