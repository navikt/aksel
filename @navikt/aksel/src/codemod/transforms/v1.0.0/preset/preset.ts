import type { API, FileInfo } from "jscodeshift";
import transformChat from "../chat/chat";
import transformPagination from "../pagination/pagination";
import transformTabs from "../tabs/tabs";

export default function transformer(file: FileInfo, api: API) {
  file.source = transformTabs(file, api);
  file.source = transformChat(file, api);
  file.source = transformPagination(file, api);

  return file.source;
}
