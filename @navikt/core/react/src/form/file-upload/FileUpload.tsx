import cl from "clsx";
import React, { HTMLAttributes, forwardRef } from "react";
import { FileUploadLocaleContextProvider } from "./FileUpload.context";
import { ComponentTranslation } from "./i18n/i18n.types";
import Trigger from "./parts/Trigger";
import Dropzone from "./parts/dropzone/Dropzone";
import Item from "./parts/item/Item";

interface FileUploadProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  /**
   * i18n-API for easier access to customizing texts and labels
   */
  translations?: ComponentTranslation["FileUpload"];
}

interface FileUploadComponent
  extends React.ForwardRefExoticComponent<
    FileUploadProps & React.RefAttributes<HTMLDivElement>
  > {
  /**
   * Framed area to drag-n-drop files, upload files with button-click or copy-paste.
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

  /**
   * Framed zone to drag-n-drop files, upload files with button-click or copy-paste.
   * @example Single
   * ```jsx
   * <FileUpload.Item file={file} status="uploading" />
   * ```
   *
   * @example Multiple items can be semantically grouped as a list.
   * ```jsx
   * <VStack gap="4" as="ul">
   *    <FileUpload.Item as="li" file={file} />
   *    <FileUpload.Item as="li" file={file2} />
   *    <FileUpload.Item as="li" file={file3} status="uploading" />
   * </VStack>
   * ```
   * @example File-object
   * ```jsx
   * // Native File
   * <FileUpload.Item file={file} error="Something went wrong" />
   *
   * // File-metadata
   * <FileUpload.Item file={{ name: "fileName.pdf", size: 1_048_576 }} error="Something went wrong" />
   * ```
   *
   * @example Error
   * ```jsx
   * <FileUpload.Item file={file} error="Something went wrong" />
   * ```
   *
   * @example Status
   * ```jsx
   * <FileUpload.Item file={file} status="uploading" />
   * <FileUpload.Item file={file} status="downloading" />
   * <FileUpload.Item file={file} status="retry" onRetry={...}/>
   * <FileUpload.Item file={file} status="delete" onDelete={...}/>
   * ```
   */
  Item: typeof Item;
  Trigger: typeof Trigger;
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
  ({ children, className, translations, ...rest }: FileUploadProps, ref) => {
    return (
      <FileUploadLocaleContextProvider translations={translations}>
        <div ref={ref} {...rest} className={cl("navds-file-upload", className)}>
          {children}
        </div>
      </FileUploadLocaleContextProvider>
    );
  },
) as FileUploadComponent;

FileUpload.Dropzone = Dropzone;
FileUpload.Item = Item;
FileUpload.Trigger = Trigger;

export default FileUpload;
