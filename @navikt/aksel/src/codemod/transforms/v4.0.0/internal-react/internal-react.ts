import moveAndRenameImport from "../../../utils/moveAndRenameImport";

/**
 * @param {import('jscodeshift').FileInfo} file
 * @param {import('jscodeshift').API} api
 */
export default function transformer(file, api, options, ...rest) {
  const j = api.jscodeshift;

  let root: any;
  try {
    root = j(file.source);
  } catch {
    return file.source;
  }

  moveAndRenameImport(j, root, {
    fromImport: "@navikt/ds-react-internal",
    toImport: "@navikt/ds-react",
    fromName: "Header",
    toName: "InternalHeader",
  });
  moveAndRenameImport(j, root, {
    fromImport: "@navikt/ds-react-internal",
    toImport: "@navikt/ds-react",
    fromName: "Dropdown",
    toName: "Dropdown",
  });
  moveAndRenameImport(j, root, {
    fromImport: "@navikt/ds-react-internal",
    toImport: "@navikt/ds-react",
    fromName: "Timeline",
    toName: "Timeline",
  });

  return root.toSource(options.printOptions);
}
