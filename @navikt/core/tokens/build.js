const StyleDictionary = require("style-dictionary");
const kebabCase = require("./kebabCase");

StyleDictionary.registerTransform({
  name: "name/cti/kebab",
  type: "name",
  transformer: (prop, options) =>
    kebabCase([options.prefix].concat(prop.path).join(" ")),
});

StyleDictionary.registerFormat({
  name: "referenceFormat",
  formatter: ({ dictionary, platform, file, options }) => {
    const newTokens = dictionary.allTokens
      .map((token, i) => {
        let value = JSON.stringify(token.value);
        // new option added to decide whether or not to output references
        if (options.outputReferences) {
          console.log(dictionary.getReferences(token.original.value));
          // the `dictionary` object now has `usesReference()` and
          // `getReferences()` methods. `usesReference()` will return true if
          // the value has a reference in it. `getReferences()` will return
          // an array of references to the whole tokens so that you can access
          // their names or any other attributes.
          if (dictionary.usesReference(token.original.value)) {
            const refs = dictionary.getReferences(token.original.value);
            refs.forEach((ref) => {
              value = value.replace(ref.value, `var(${ref.path.join("-")})`);
            });
          }
        }

        return `"${kebabCase(token.name).replace("navds-", "")}": ${value}${
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
