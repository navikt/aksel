import { FileBase64 } from "../types";
import { isNativeFile } from "./file-type-checker";

export const downloadFile = (file: File | FileBase64): void => {
  const a = document.createElement("a");
  const url = URL.createObjectURL(
    isNativeFile(file) ? file : base64toBlob(file.base64)
  );
  a.href = url;
  a.download = file.name;
  a.click();

  URL.revokeObjectURL(url);
};

function base64toBlob(base64: string): Blob {
  const parts = base64.split(";base64,");
  const contentType = parts[0].split(":")[1];
  const raw = window.atob(parts[1]);
  const rawLength = raw.length;
  const array = new Uint8Array(new ArrayBuffer(rawLength));

  for (let i = 0; i < rawLength; i++) {
    array[i] = raw.charCodeAt(i);
  }

  return new Blob([array], { type: contentType });
}
