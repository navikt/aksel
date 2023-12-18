import { FileBase64 } from "../types";
import { isNativeFile } from "./file-type-checker";

export const downloadFile = (file: File | FileBase64): void => {
  const a = document.createElement("a");
  const url = isNativeFile(file)
    ? URL.createObjectURL(file)
    : file.base64DataUrl;
  a.href = url;
  a.download = file.name;
  a.click();

  URL.revokeObjectURL(url);
};
