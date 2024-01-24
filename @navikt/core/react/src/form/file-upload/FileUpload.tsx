import cl from "clsx";
import React, { HTMLAttributes, forwardRef } from "react";
import { FileUploadLocaleContextProvider } from "./FileUpload.context";
import Dropzone from "./parts/dropzone/Dropzone";
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
  /**
   * Framed zone to drag-n-drop files, upload files with button-click or copy-paste.
   * @example Single file
   * ```jsx
   * <FileUpload.Dropzone
   *  label="Last opp fil"
   *   multiple={false}
   *   onSelect={onSelect}
   * />
   *
   * @example Multiple files
   * ```jsx
   * <FileUpload.Dropzone
   *  label="Last opp fil"
   *   multiple={true}
   *   onSelect={onSelect}
   * />
   *
   * @example Error
   * ```jsx
   *  <FileUpload.Dropzone
   *   label="Last opp filer"
   *   onSelect={onSelect}
   *   error={error}
   *  />
   * ```
   */
  Dropzone: typeof Dropzone;
  Item: typeof Item;
}

/**
 * A set of components used to upload and display files.
 * @see [📝 Documentation](https://aksel.nav.no/komponenter/core/fileupload)
 * @example Dropzone
 * ```jsx
 *  <FileUpload.Dropzone />
 * ```
 *
 * @example Items
 * ```jsx
 *  <VStack gap="4">
 *    <FileUpload.Item as="li" file={myFile} />
 *    <FileUpload.Item as="li" file={mySecondFile} />
 *  </VStack>
 * ```
 *
 * @example Locale
 * ```jsx
 * <FileUpload locale="en">
 *    <FileUpload.Dropzone />
 *   <VStack gap="4">
 *     <FileUpload.Item as="li" file={myFile} />
 *     <FileUpload.Item as="li" file={mySecondFile} />
 *   </VStack>
 * </FileUpload>
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
