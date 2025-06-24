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
    let hasMultipleReturns = false;

    traverse(ast, {
      VariableDeclarator(path) {
        if (
          (path.node.id as { name: string }).name === "Example" &&
          path.node.init &&
          (path.node.init.type === "ArrowFunctionExpression" ||
            path.node.init.type === "FunctionExpression")
        ) {
          // Traverse the function body to find the return statement
          path.traverse({
            ReturnStatement(returnPath) {
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
                  throw new Error("JSX element has no start or end position.");
                }

                jsxCode = code.slice(
                  returnPath.node.argument.start,
                  returnPath.node.argument.end,
                );
              }
            },
          });

          if (returnCount > 1) {
            hasMultipleReturns = true;
          }
          path.stop();
        }
      },
    });

    if (hasMultipleReturns) {
      return null;
    }

    if (jsxCode) {
      return await prettier.format(jsxCode, { parser: "typescript" });
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
