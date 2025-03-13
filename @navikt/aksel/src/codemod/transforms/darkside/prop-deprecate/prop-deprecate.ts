import type { API, FileInfo } from "jscodeshift";
import { getLineTerminator } from "../../../utils/lineterminator";
import removePropsFromComponent from "../../../utils/removeProps";
import { findComponentImport } from "../darkside.utils";

const deprecationMap = {
  Accordion: ["headingSize", "variant"],
  Popover: ["arrow"],
  Page: ["background"],
};

export default function transformer(file: FileInfo, api: API) {
  const j = api.jscodeshift;
  const root = j(file.source);

  const toSourceOptions = getLineTerminator(file.source);

  for (const [component, props] of Object.entries(deprecationMap)) {
    const sourceName = findComponentImport({
      file,
      j,
      name: component,
      packageType: "react",
    });

    if (!sourceName) {
      continue;
    }

    removePropsFromComponent(j, root, sourceName, props);
  }

  return root.toSource(toSourceOptions);
}
