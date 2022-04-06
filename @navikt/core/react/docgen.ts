/* import * as reactDocs from "react-docgen";
import fs from "fs";

const data = fs.readFileSync("src/form/checkbox/Checkbox.tsx").toString();

const componentInfo = reactDocs.parse(data);

console.log(componentInfo);
 */

const docgen = require("react-docgen-typescript");

const options = {
  savePropValueAsString: true,
  componentNameResolver: (exp, source) => {
    console.log(exp);
    return "Accordion";
  },
};

const tsConfigParser = docgen.withCustomConfig("./tsconfig.esm.json", options);

// Parse a file for docgen info
/* const res = docgen.parse("src/form/checkbox/Checkbox.tsx", options); */
const res = tsConfigParser.parse("src/accordion/AccordionItem.tsx");

console.log(res);
/* console.log(res[0].props.ref); */
