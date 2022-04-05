const docgen = require("react-docgen-typescript");

const options = {
  savePropValueAsString: true,
};

// Create a parser with using your typescript config
const tsConfigParser = docgen.withCustomConfig("./tsconfig.json", {
  savePropValueAsString: true,
});

const res = tsConfigParser.parse("./src/accordion/index.ts", options);

console.log(res);
