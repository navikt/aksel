import { FileItem } from "../item/FileUploadItem.types";

export const isNativeFile = (fileItem: FileItem): fileItem is File =>
  "lastModified" in fileItem;
