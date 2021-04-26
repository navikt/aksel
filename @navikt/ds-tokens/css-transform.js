/* const StyleDictionary = require("style-dictionary");

StyleDictionary.registerTransform({
  name: "time/seconds",
  type: "value",
  matcher: function (prop) {
    return prop.attributes.category === "time";
  },
  transformer: function (prop) {
    // Note the use of prop.original.value,
    // before any transforms are performed, the build system
    // clones the original property to the 'original' attribute.
    return (parseInt(prop.original.value) / 1000).toString() + "s";
  },
});
 */
