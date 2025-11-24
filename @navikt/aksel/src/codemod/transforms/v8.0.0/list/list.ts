import type { API, FileInfo } from "jscodeshift";
import { getLineTerminator } from "../../../utils/lineterminator";
import transformBoxNewToBox from "../box-new/box-new";

const headingSizeMap = {
  small: "xsmall",
  medium: "small",
  large: "medium",
};

const bodySizeMap = {
  small: "small",
  medium: "medium",
};

const boxMarginMap = {
  small: "space-12",
  medium: "space-16",
};

export default function transformer(file: FileInfo, api: API) {
  const j = api.jscodeshift;
  const root = j(file.source);

  const toSourceOptions = getLineTerminator(file.source);

  file.source = root.toSource(toSourceOptions);

  return transformBoxNewToBox(file, api);
}
