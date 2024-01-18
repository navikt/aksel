import cl from "clsx";
import React, { HTMLAttributes, forwardRef } from "react";
import { FileUploadLocaleContextProvider } from "./FileUpload.context";
import Dropzone from "./parts/Dropzone";
import Item from "./parts/item/Item";

interface FileUploadProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  /**
   * Changes locale used for component text.
   * @default "nb" (norsk bokmål)
   */
  locale?: "nb" | "en";
}

interface FileUploadComponent
  extends React.ForwardRefExoticComponent<
    FileUploadProps & React.RefAttributes<HTMLDivElement>
  > {
  Dropzone: typeof Dropzone;
  Item: typeof Item;
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
export const FileUpload = forwardRef<HTMLDivElement, FileUploadProps>(
  ({ children, locale, className, ...rest }: FileUploadProps, ref) => (
    <FileUploadLocaleContextProvider locale={locale}>
      <div ref={ref} {...rest} className={cl("navds-file-upload", className)}>
        {children}
      </div>
    </FileUploadLocaleContextProvider>
  ),
) as FileUploadComponent;

FileUpload.Dropzone = Dropzone;
FileUpload.Item = Item;

export default FileUpload;
