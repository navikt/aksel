module.exports = {
  meta: {
    type: "problem",
    docs: {
      description:
        "Checks that every example and template contains the correct comment needed for parsing code for preview",
    },
    fixable: "code",
    schema: [],
  },
  create(context) {
    const foundComment = context.sourceCode
      .getAllComments()
      .some(
        ({ value }) =>
          value.trim() === "EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE"
      );

    return {
      ExportDefaultDeclaration: (node) => {
        if (!foundComment) {
          context.report({
            node,
            message: `All examples and templates rely on the comment 'EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE' to extract code for preview on website.
Add comment above default export:
\`// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE\``,
            fix(fixer) {
              return fixer.insertTextBefore(
                node,
                "// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE\n"
              );
            },
          });
        }
      },
    };
  },
};
