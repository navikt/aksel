import { FileBase64, FileItem } from "../types";

export const isBase64File = (fileItem: FileItem): fileItem is FileBase64 =>
  "base64" in fileItem;

export const isNativeFile = (fileItem: FileItem): fileItem is File =>
  "lastModified" in fileItem;

export const isFileWithData = (
  fileItem: FileItem
): fileItem is File | FileBase64 =>
  isNativeFile(fileItem) || isBase64File(fileItem);
