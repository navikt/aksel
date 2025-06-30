import { parse } from "@babel/parser";
import traverse from "@babel/traverse";
// eslint-disable-next-line import/default
import prettier from "prettier";

async function extractJsx(
  code: string,
  test?: boolean,
): Promise<string | null> {
  try {
    const ast = parse(code, {
      sourceType: "module",
      plugins: ["jsx", "typescript"],
    });

    let jsxCode = null;
    let returnCount = 0;

    traverse(ast, {
      VariableDeclarator(path) {
        if (
          (path.node.id as { name: string }).name === "Example" &&
          path.node.init &&
          (path.node.init.type === "ArrowFunctionExpression" ||
            path.node.init.type === "FunctionExpression")
        ) {
          /* Handle implicit return: const Example = () => <div>Hello</div> */
          if (
            path.node.init.type === "ArrowFunctionExpression" &&
            path.node.init.body &&
            (path.node.init.body.type === "JSXElement" ||
              path.node.init.body.type === "JSXFragment")
          ) {
            // The body itself is the JSX
            const body = path.node.init.body;
            if (body.start != null && body.end != null) {
              jsxCode = code.slice(body.start, body.end);
              returnCount = 1;
            }
            path.stop();
            return;
          }

          // Traverse the function body to find the return statement
          path.traverse({
            ReturnStatement(returnPath) {
              // Only count returns at the top level of the Example function
              const functionParent = returnPath.getFunctionParent();
              if (functionParent && functionParent.node === path.node.init) {
                returnCount++;
                if (
                  returnPath.node.argument &&
                  (returnPath.node.argument.type === "JSXElement" ||
                    returnPath.node.argument.type === "JSXFragment")
                ) {
                  if (
                    returnPath.node.argument.start === null ||
                    returnPath.node.argument.end === null
                  ) {
                    throw new Error(
                      "JSX element has no start or end position.",
                    );
                  }

                  jsxCode = code.slice(
                    returnPath.node.argument.start,
                    returnPath.node.argument.end,
                  );
                }
              }
            },
          });

          path.stop();
        }
      },
    });

    if (returnCount > 1) {
      return null;
    }

    if (jsxCode) {
      const formatedCode = await prettier.format(jsxCode, {
        parser: "typescript",
      });

      return formatedCode.trim().replace(/;$/, "").replace(/^;/, "");
    }

    return null;
  } catch (e) {
    if (!test) {
      console.error("Error in extractJsx:", e);
    }

    return null;
  }
}

export { extractJsx };
