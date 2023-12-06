import { FileItem } from "../types";

export const isNativeFile = (fileItem: FileItem): fileItem is File =>
  "arrayBuffer" in fileItem
