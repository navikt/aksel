module.exports = {
  meta: {
    type: "problem",
    fixable: "code",
    docs: {
      description:
        "Checks that each example exports const args with type ExampleArgsT",
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

            let typeAnnotation = null;
            let typeName = null;

            if (declaration.id.typeAnnotation) {
              typeAnnotation = declaration.id.typeAnnotation.typeAnnotation;
            }

            if (typeAnnotation) {
              typeName = typeAnnotation.typeName;
            }

            if (
              !typeAnnotation ||
              typeAnnotation.type !== "TSTypeReference" ||
              !typeName ||
              typeName.type !== "Identifier" ||
              typeName.name !== "ExampleArgsT"
            ) {
              context.report({
                node: declaration,
                message: "'args' must have type 'ExampleArgsT'.",
                fix(fixer) {
                  if (declaration.id.typeAnnotation) {
                    return fixer.replaceText(
                      declaration.id.typeAnnotation,
                      ": ExampleArgsT",
                    );
                  }

                  return fixer.insertTextAfter(
                    declaration.id,
                    ": ExampleArgsT",
                  );
                },
              });
            }
          }
        }

        if (!hasArgsExport) {
          context.report({
            node: programNode,
            message:
              "Each example must export 'const args: ExampleArgsT = ...'.",
          });
        }
      },
    };
  },
};
