import { FileItem } from "../types";

export const isNativeFile = (fileItem: FileItem): fileItem is File => {
  /**
   * Checking for File does not work in Node (for instance on the
   * server side in Next.js). File is only defined in the browser.
   * A File is a specialized form of a Blob, so we check if the
   * file is a Blob, since Blob is defined in both the browser
   * and in Node.
   */
  return fileItem instanceof Blob;
};
