const StyleDictionary = require("style-dictionary");
const kebabCase = require("./kebabCase");

StyleDictionary.registerTransform({
  name: "name/cti/kebab",
  type: "name",
  transformer: (prop, options) =>
    kebabCase([options.prefix].concat(prop.path).join(" ")),
});

/* https://github.com/amzn/style-dictionary/blob/main/examples/advanced/variables-in-outputs/sd.config.js */
StyleDictionary.registerFormat({
  name: "referenceFormat",
  formatter: ({ dictionary, options }) => {
    const newTokens = dictionary.allTokens
      .map((token, i) => {
        let value = JSON.stringify(token.value);
        // new option added to decide whether or not to output references
        if (options.outputReferences) {
          // the `dictionary` object now has `usesReference()` and
          // `getReferences()` methods. `usesReference()` will return true if
          // the value has a reference in it. `getReferences()` will return
          // an array of references to the whole tokens so that you can access
          // their names or any other attributes.
          if (dictionary.usesReference(token.original.value)) {
            const refs = dictionary.getReferences(token.original.value);
            refs.forEach((ref) => {
              value = value.replace(ref.value, `var(${ref.name})`);
            });
          }
        }

        return `"${token.name.replace("navds-", "")}": ${value}${
          i === dictionary.allTokens.length - 1 ? "" : ","
        }`;
      })
      .join(`\n\t`);
    return `{\n\t${newTokens}\n}`;
  },
});

const StyleDictionaryExtended = StyleDictionary.extend(
  __dirname + "/config.js"
);
StyleDictionaryExtended.buildAllPlatforms();
