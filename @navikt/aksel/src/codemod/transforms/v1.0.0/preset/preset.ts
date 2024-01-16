import transformChat from "../chat/chat";
import transformPagination from "../pagination/pagination";
import transformTabs from "../tabs/tabs";

/**
 * @param {import('jscodeshift').FileInfo} file
 * @param {import('jscodeshift').API} api
 */
export default function transformer(file, api) {
  file.source = transformTabs(file, api);
  file.source = transformChat(file, api);
  file.source = transformPagination(file, api);

  return file.source;
}
