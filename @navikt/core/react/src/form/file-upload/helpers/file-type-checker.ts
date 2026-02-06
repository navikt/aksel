import { FileItem } from "../item-root/FileUploadItemRoot.types";

export const isNativeFile = (fileItem: FileItem): fileItem is File =>
  "lastModified" in fileItem;
