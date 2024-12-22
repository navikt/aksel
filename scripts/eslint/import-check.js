module.exports = {
  create(context) {
    return {
      ImportDeclaration(node) {
        const usNavikt = node.source.value.startsWith("@navikt");
        const isReact = node.source.value === "react";
        const isInlineParts = node.source.value.includes("__parts");
        const isExampleHOC =
          node.source.value === "@/web/examples/withDsExample";
        const isAliasImport = node.source.value.startsWith("@");

        if (isInlineParts && isAliasImport) {
          context.report({
            node,
            message:
              "When using __parts, import must be 'relative' ('../') to the current file.",
          });
        }

        if (isExampleHOC && !isAliasImport) {
          context.report({
            node,
            message:
              "When using 'withDsExample'-HOC, import must be '@/web/examples/withDsExample'",
          });
        }

        if (
          !usNavikt &&
          !isReact &&
          !isInlineParts &&
          !isExampleHOC &&
          !isAliasImport
        ) {
          context.report({
            node,
            message:
              "You can only import from '@navikt', 'react', '__parts' or '@/web/examples/withDsExample'",
          });
        }
      },
    };
  },
};
