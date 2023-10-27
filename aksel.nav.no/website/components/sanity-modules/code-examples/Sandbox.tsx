import { PencilIcon } from "@navikt/aksel-icons";
import { Button } from "@navikt/ds-react";
import { compressToEncodedURIComponent } from "lz-string";
import ts from "typescript";

const convertTSXToJSX = (code: string) => {
  return ts.transpile(code, {
    jsx: ts.JsxEmit.Preserve,
    target: ts.ScriptTarget.ES5,
  });
};

const removeImportLines = (code: string) => {
  return code.replace(/import.*?\n/g, "");
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
      action={`/sandbox?code=${compressedCode}`}
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
