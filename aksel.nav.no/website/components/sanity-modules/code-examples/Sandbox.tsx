import { PencilIcon } from "@navikt/aksel-icons";
import { Button } from "@navikt/ds-react";
import { compressToEncodedURIComponent } from "lz-string";
import ts from "typescript";
import * as jscodeshift from "jscodeshift";

const j = jscodeshift.withParser("tsx");

const convertTSXToJSX = (code: string) => {
  return ts.transpile(code, {
    jsx: ts.JsxEmit.Preserve,
    target: ts.ScriptTarget.ESNext,
  });
};

const removeImportLines = (code: string) => {
  // using jscodeshift to remove imports
  const ast = j(code);

  const removeImport = (path: any) => {
    j(path).remove();
  };

  ast.find(j.ImportDeclaration).forEach((path: any) => removeImport(path));

  return ast.toSource();
};

const processCode = (code: string) => {
  const removedImports = removeImportLines(code);
  const jsx = convertTSXToJSX(removedImports);

  return `
    {
      (() => {
        ${jsx}
        return <Example />
      })()
    }
  `;
};

export const Sandbox = ({ code }: { code: string }) => {
  const processedCode = processCode(code);
  const compressedCode = compressToEncodedURIComponent(
    JSON.stringify({
      code: processedCode,
    })
  );
  return (
    <form
      action={`/sandbox/index.html?code=${compressedCode}`}
      method="POST"
      target="_blank"
      className="h-8"
    >
      <Button
        variant="tertiary-neutral"
        size="small"
        type="submit"
        icon={<PencilIcon aria-hidden fontSize="1.5rem" />}
      >
        Sandbox
      </Button>
    </form>
  );
};
