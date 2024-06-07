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
            message: "You can only import from '@navikt' and 'react'.",
          });
        }
      },
    };
  },
};
