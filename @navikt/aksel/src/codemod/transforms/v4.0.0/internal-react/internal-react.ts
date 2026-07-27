import type { API, FileInfo } from "jscodeshift";
import { getLineTerminator } from "../../../utils/lineterminator";
import moveAndRenameImport from "../../../utils/packageImports";

export default function transformer(file: FileInfo, api: API) {
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

  return root.toSource(getLineTerminator(file.source));
}
