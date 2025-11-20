import type { API, FileInfo } from "jscodeshift";
import { findComponentImport } from "../../../utils/ast";
import { getLineTerminator } from "../../../utils/lineterminator";
import removePropsFromComponent from "../../../utils/removeProps";

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
      root,
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
