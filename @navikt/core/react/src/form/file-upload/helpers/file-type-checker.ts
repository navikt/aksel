import type { FileItem } from "../item/FileUploadItem.types";

const isNativeFile = (fileItem: FileItem): fileItem is File =>
  "lastModified" in fileItem;

export { isNativeFile };
