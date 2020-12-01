const fs = require("fs");

const typeQuestion = {
  type: "list",
  name: "type",
  message: "Template: ",
  choices: ["react", "css"],
  validate: (val) => (val ? true : "Must be defined"), // eslint-disable-line no-confusing-arrow
};
const nameQuestion = (type, filter, validate) => ({
  type: "input",
  name: "name",
  message: "Name: ",
  when: (ans) => ans.type === type,
  filter: (val) => filter(val).toLowerCase(),
  validate: (val) => {
    if (fs.existsSync(`../@nav-frontend/${val}`.toLowerCase())) {
      return "Package already exists.";
    }
    return validate(val);
  },
});
const reactNameQuestion = nameQuestion(
  "react",
  (val) => {
    if (val.startsWith("react-")) return val;
    return `react-${val}`;
  },
  (val) => (val !== "react-" ? true : "Must be defined") // eslint-disable-line no-confusing-arrow
);
const cssNameQuestion = nameQuestion(
  "css",
  (val) => {
    if (val.endsWith("-styles")) return val;
    return `${val}-styles`;
  },
  (val) => (val !== "-styles" ? true : "Must be defined") // eslint-disable-line no-confusing-arrow
);
const okQuestion = {
  type: "confirm",
  name: "ok",
  message: "OK? ",
};

module.exports = [typeQuestion, reactNameQuestion, cssNameQuestion, okQuestion];
