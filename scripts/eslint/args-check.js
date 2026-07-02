module.exports = {
  meta: {
    type: "problem",
    docs: {
      description:
        "Checks that each example exports const args with shape { index: number, desc?: string, sandbox?: boolean, title?: string }",
    },
    schema: [],
  },
  create(context) {
    let hasArgsExport = false;

    return {
      Program(programNode) {
        const body = programNode.body;

        for (const node of body) {
          if (node.type !== "ExportNamedDeclaration" || !node.declaration) {
            continue;
          }

          if (node.declaration.type !== "VariableDeclaration") {
            continue;
          }

          for (const declaration of node.declaration.declarations) {
            if (
              !declaration.id ||
              declaration.id.type !== "Identifier" ||
              declaration.id.name !== "args"
            ) {
              continue;
            }

            hasArgsExport = true;

            const init = declaration.init;
            if (!init || init.type !== "ObjectExpression") {
              context.report({
                node: declaration,
                message:
                  "'args' must be exported as an object with shape { index: number, desc?: string, sandbox?: boolean, title?: string  }.",
              });
              continue;
            }

            const allowedKeys = new Set(["index", "desc", "sandbox", "title"]);
            let hasIndex = false;

            for (const property of init.properties) {
              if (property.type !== "Property" || property.computed) {
                context.report({
                  node: property,
                  message:
                    "'args' can only contain static properties 'index', optional 'desc', optional 'sandbox', and optional 'title'.",
                });
                continue;
              }

              const key =
                property.key.type === "Identifier"
                  ? property.key.name
                  : property.key.type === "Literal"
                    ? property.key.value
                    : null;

              if (typeof key !== "string" || !allowedKeys.has(key)) {
                context.report({
                  node: property,
                  message:
                    "'args' only supports keys 'index', optional 'desc', optional 'sandbox', and optional 'title'.",
                });
                continue;
              }

              if (key === "index") {
                hasIndex = true;
                if (
                  property.value.type !== "Literal" ||
                  typeof property.value.value !== "number"
                ) {
                  context.report({
                    node: property,
                    message: "'args.index' must be a number.",
                  });
                }
              }

              if (key === "desc") {
                if (
                  property.value.type !== "Literal" ||
                  typeof property.value.value !== "string"
                ) {
                  context.report({
                    node: property,
                    message: "'args.desc' must be a string when provided.",
                  });
                }
              }

              if (key === "sandbox") {
                if (
                  property.value.type !== "Literal" ||
                  typeof property.value.value !== "boolean"
                ) {
                  context.report({
                    node: property,
                    message: "'args.sandbox' must be a boolean when provided.",
                  });
                }
              }

              if (key === "title") {
                if (
                  property.value.type !== "Literal" ||
                  typeof property.value.value !== "string"
                ) {
                  context.report({
                    node: property,
                    message: "'args.title' must be a string when provided.",
                  });
                }
              }
            }

            if (!hasIndex) {
              context.report({
                node: init,
                message:
                  "'args' must include required key 'index' as a number.",
              });
            }
          }
        }

        if (!hasArgsExport) {
          context.report({
            node: programNode,
            message:
              "Each example must export 'const args = { index: number, desc?: string, sandbox?: boolean, title?: string }'.",
          });
        }
      },
    };
  },
};
