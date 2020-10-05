const fs = require("fs");

const typeQuestion = {
  type: "list",
  name: "type",
  message: "Template: ",
  choices: ["react", "less"],
  validate: (val) => (val ? true : "Must be defined"), // eslint-disable-line no-confusing-arrow
};
const nameQuestion = (type, filter, validate) => ({
  type: "input",
  name: "name",
  message: "Name: ",
  when: (ans) => ans.type === type,
  filter: (val) => filter(val).toLowerCase(),
  validate: (val) => {
    if (fs.existsSync(`./packages/node_modules/${val}`.toLowerCase())) {
      return "Package already exists.";
    }
    return validate(val);
  },
});
const reactNameQuestion = nameQuestion(
  "react",
  (val) => {
    if (val.startsWith("nav-frontend-")) return val;
    return `nav-frontend-${val}`;
  },
  (val) => (val !== "nav-frontend-" ? true : "Must be defined") // eslint-disable-line no-confusing-arrow
);
const lessNameQuestion = nameQuestion(
  "less",
  (val) => {
    if (val.startsWith("nav-frontend-") && val.endsWith("-style")) return val;
    if (val.startsWith("nav-frontend-")) return `${val}-style`;
    if (val.endsWith("-style")) return `nav-frontend-${val}`;
    return `nav-frontend-${val}-style`;
  },
  (val) => (val !== "nav-frontend--style" ? true : "Must be defined") // eslint-disable-line no-confusing-arrow
);
const okQuestion = {
  type: "confirm",
  name: "ok",
  message: "OK? ",
};

module.exports = [
  typeQuestion,
  reactNameQuestion,
  lessNameQuestion,
  okQuestion,
];
