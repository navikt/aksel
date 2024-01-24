import * as jscodeshift from "jscodeshift";
import { compressToEncodedURIComponent } from "lz-string";
import ts from "typescript";

const parse = jscodeshift.withParser("tsx");

const convertReactHooks = (code: string) => {
  const reactHooks = [
    "useState",
    "useEffect",
    "useRef",
    "useContext",
    "useReducer",
    "useCallback",
    "useMemo",
    "useImperativeHandle",
    "useLayoutEffect",
    "useDebugValue",
  ];

  reactHooks.forEach((hook) => {
    code = code.replace(new RegExp(` ${hook}\\(`, "g"), ` React.${hook}(`);
  });

  return code;
};

const convertTSXToJSX = (code: string) => {
  return ts.transpile(code, {
    jsx: ts.JsxEmit.Preserve,
    target: ts.ScriptTarget.ESNext,
  });
};

const removeImportLines = (code: string) => {
  const ast = parse(code);
  const removeImport = (path: any) => {
    parse(path).remove();
  };
  ast.find(parse.ImportDeclaration).forEach((path: any) => removeImport(path));
  return ast.toSource();
};

const processCode = (code: string) => {
  const removedImports = removeImportLines(code);
  const jsx = convertTSXToJSX(removedImports);
  const jsxMogrified = convertReactHooks(jsx);

  return `{
  (() => {
    ${jsxMogrified}
    return <Example />
  })()
}`;
};

export const processAndCompressForURI = (code: string) => {
  const processedCode = processCode(code);
  return compressToEncodedURIComponent(
    JSON.stringify({
      code: processedCode,
    }),
  );
};
