const { ESLINT_MODES } = require("@craco/craco");
const CracoLessPlugin = require("craco-less");

module.exports = {
  plugins: [{ plugin: CracoLessPlugin }],
  eslint: {
    mode: ESLINT_MODES.file,
  },
};
