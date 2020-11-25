const fs = require("fs");
const inquirer = require("inquirer");
const extend = require("extend");
const copyfiles = require("copyfiles");
const glob = require("glob");
const mustache = require("mustache");
const utils = require("./utils.js");
const rawQuestions = require("./questions.js");

mustache.tags = ["<%", "%>"];

const globalDependencies = utils.allDependencies(
  JSON.parse(fs.readFileSync("./package.json"))
);

function prompt(questions) {
  // eslint-disable-next-line no-use-before-define
  return inquirer.prompt(questions).then(handleAnswers);
}

function create(config) {
  const source = `./_templates/${config.type}`;
  const dest = `./@nav-frontend/${config.name}`;
  const sourceGlob = `${source}/**/*.*`;
  const destGlob = `${dest}/**/*.*`;

  const renderdata = extend({}, config);
  renderdata.name = { original: config.name };
  renderdata.name.stripped = config.name.replace("react-", "");
  renderdata.name.indexfile = config.name.replace("react-", "");
  renderdata.name.capitalize = utils.capitalize(config.name);
  renderdata.name.camelcase = utils.camelcase(config.name);
  renderdata.name.kebabcase = utils.kebabcase(config.name);
  renderdata.name.cssname = utils.kebabcase(config.name);
  renderdata.name.cssname = renderdata.name.cssname.split("-");
  renderdata.name.cssname.pop();
  renderdata.name.cssname = renderdata.name.cssname.join("-");

  renderdata.resolve = () => (text, render) => {
    if (!globalDependencies[text]) {
      throw new Error(`Could not find global dependency: ${text}`);
    }
    return render(globalDependencies[text]);
  };

  copyfiles([sourceGlob, dest], { up: 2, all: true }, () => {
    glob(`${dest}/**/index.*`, { dot: true }, (err, files) => {
      // files.forEach((file) => {
      //   fs.renameSync(
      //     file,
      //     file.replace("src/index", `src/${renderdata.name.indexfile}`)
      //   );
      // });
      console.log("here");
      glob(`${dest}/**/md/**.*`, { dot: true }, (mdErr, mdFiles) => {
        mdFiles.forEach((file) => {
          // eslint-disable-next-line max-len
          const newName = `${renderdata.name.indexfile
            .charAt(0)
            .toUpperCase()}${renderdata.name.indexfile.slice(1)}.$&`;
          fs.renameSync(file, file.replace(/\w+\.md/g, newName));
        });

        glob(destGlob, { dot: true }, (globerr, globfiles) => {
          globfiles.forEach((file) => {
            const content = fs.readFileSync(file, "utf-8");
            fs.writeFileSync(
              file,
              mustache.render(content, renderdata),
              "utf-8"
            );
          });
        });
      });
    });
  });
}

function handleAnswers(answers) {
  if (!answers.ok) {
    const defaultValues = utils
      .entries(answers)
      .filter((entry) => entry.key !== "ok")
      .reduce((obj, entry) => extend(obj, { [entry.key]: entry.value }), {});

    const newQuestions = rawQuestions.map((question) => {
      const name = question.name;
      if (defaultValues[name]) {
        return extend({}, question, { default: defaultValues[name] });
      }
      return question;
    });

    return prompt(newQuestions);
  }

  return create(answers);
}

prompt(rawQuestions);
