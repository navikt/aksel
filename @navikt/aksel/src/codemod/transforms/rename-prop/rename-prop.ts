import type { API, FileInfo, Options } from "jscodeshift";
import renameProps from "../../utils/rename-props";

export default function transformer(
  file: FileInfo,
  api: API,
  options: Options,
) {
  const j = api.jscodeshift;
  const root = j(file.source);

  const printOptions = options.printOptions;

  return renameProps({
    root,
    componentName: options.component,
    props: { [options.from]: options.to },
  }).toSource(printOptions);
}
