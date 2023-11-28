module.exports = {
  meta: {
    type: "problem",
    docs: {
      description:
        "Enforce that a variable named `foo` can only be assigned a value of 'bar'.",
    },
    fixable: "code",
    schema: [],
  },
  create(context) {
    const foundComment = !!context.sourceCode
      .getAllComments()
      .find(
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
