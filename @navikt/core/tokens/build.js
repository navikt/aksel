const StyleDictionary = require("style-dictionary");
const kebabCase = require("./kebabCase");

StyleDictionary.registerTransform({
  name: "name/cti/kebab",
  type: "name",
  transformer: (prop, options) =>
    kebabCase([options.prefix].concat(prop.path).join(" ")),
});

const StyleDictionaryExtended = StyleDictionary.extend(
  __dirname + "/config.js"
);

StyleDictionaryExtended.buildAllPlatforms();
