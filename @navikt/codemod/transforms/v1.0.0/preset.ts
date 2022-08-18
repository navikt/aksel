import transformTabs from "./tabs";
import transformChat from "./chat";
import transformPagination from "./pagination";

/**
 * @param {import('jscodeshift').FileInfo} file
 * @param {import('jscodeshift').API} api
 */
export default function transformer(file, api, options) {
  file.source = transformTabs(file, api, options);
  file.source = transformChat(file, api, options);
  file.source = transformPagination(file, api, options);

  return file.source;
}
