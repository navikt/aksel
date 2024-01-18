import React from "react";
import { FileUploadLocaleContextProvider } from "./FileUpload.context";
import Dropzone from "./parts/Dropzone";
import Item from "./parts/item/Item";

interface FileUploadProps {
  children: React.ReactNode;
  /**
   * Changes locale used for component text.
   * @default "nb" (norsk bokmål)
   */
  locale?: "nb" | "en";
}

// TODO: Update jsdoc
/**
 * A set of components used to upload files and display files.
 * FileUpload is only a namespace, only use the subcomponents.
 * @see [📝 Documentation](https://aksel.nav.no/komponenter/core/fileupload)
 * @example
 * ```jsx
 *  <FileUpload.Dropzone />
 * ```
 *
 * @example
 * ```jsx
 *  <FileUpload.List>
 *    <FileUpload.Item file={myFile} />
 *    <FileUpload.Item file={mySecondFile} />
 *  </FileUpload.List>
 * ```
 *
 * @example
 * ```jsx
 *  <FileUpload.Item file={myStandaloneFile} />
 * ```
 */
export const FileUpload = ({ children, locale }: FileUploadProps) => (
  <FileUploadLocaleContextProvider locale={locale}>
    {children}
  </FileUploadLocaleContextProvider>
);

FileUpload.Dropzone = Dropzone;
FileUpload.Item = Item;

export default FileUpload;
