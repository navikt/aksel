module.exports = {
  create(context) {
    return {
      ImportDeclaration(node) {
        if (
          !node.source.value.startsWith("@navikt") &&
          !(node.source.value === "react")
        ) {
          context.report({
            node,
            message:
              "Import from this module is not allowed. Only packages from '@navikt' or 'react' are allowed.",
          });
        }
      },
    };
  },
};
