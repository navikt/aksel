import { FileItem } from "../props";

export const isNativeFile = (fileItem: FileItem): fileItem is File =>
  "arrayBuffer" in fileItem
