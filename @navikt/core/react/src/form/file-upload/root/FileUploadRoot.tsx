import React, { HTMLAttributes, forwardRef } from "react";
import { cl } from "../../../utils/helpers";
import { ComponentTranslation } from "../../../utils/i18n/i18n.types";
import {
  FileUploadDropzone,
  type FileUploadDropzoneProps,
} from "../dropzone/FileUploadDropzone";
import {
  FileUploadItem,
  type FileUploadItemProps,
} from "../item/FileUploadItem";
import {
  FileUploadTrigger,
  type FileUploadTriggerProps,
} from "../trigger/FileUploadTrigger";
import { FileUploadLocaleContextProvider } from "./FileUploadRoot.context";

interface FileUploadProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  /**
   * i18n-API for customizing texts and labels
   */
  translations?: ComponentTranslation<"FileUpload">;
}

interface FileUploadComponent extends React.ForwardRefExoticComponent<
  FileUploadProps & React.RefAttributes<HTMLDivElement>
> {
  /**
   * Framed area to drag-n-drop files, upload files with button-click or copy-paste.
   * @see 🏷️ {@link FileUploadDropzoneProps}
   * @example
   * Single file
   * ```jsx
   * <FileUpload.Dropzone
   *   label="Last opp fil"
   *   multiple={false}
   *   onSelect={onSelect}
   * />
   * ```
   *
   * @example
   * Multiple files
   * ```jsx
   * <FileUpload.Dropzone
   *   label="Last opp fil"
   *   multiple={true}
   *   onSelect={onSelect}
   * />
   * ```
   *
   * @example
   * Error
   * ```jsx
   * <FileUpload.Dropzone
   *   label="Last opp filer"
   *   onSelect={onSelect}
   *   error={error}
   * />
   * ```
   */
  Dropzone: typeof FileUploadDropzone;

  /**
   * Displays a file with status, file size, action and error message.
   * @see 🏷️ {@link FileUploadItemProps}
   * @example
   * Single
   * ```jsx
   * <FileUpload.Item file={file} status="uploading" />
   * ```
   *
   * @example
   * Multiple items can be semantically grouped as a list.
   * ```jsx
   * <FileUpload>
   *   <VStack gap="space-16" as="ul">
   *     <FileUpload.Item as="li" file={file} />
   *     <FileUpload.Item as="li" file={file2} />
   *     <FileUpload.Item as="li" file={file3} status="uploading" />
   *   </VStack>
   * </FileUpload>
   * ```
   *
   * @example
   * Custom file object
   * ```jsx
   * <FileUpload.Item file={{ name: "fileName.pdf", size: 1_048_576 }} />
   * ```
   *
   * @example
   * Error
   * ```jsx
   * <FileUpload.Item file={file} error="Something went wrong" />
   * ```
   *
   * @example
   * Status & actions
   * ```jsx
   * <FileUpload.Item file={file} status="uploading" />
   * <FileUpload.Item file={file} status="downloading" />
   * <FileUpload.Item file={file} button={{ action:"retry", onClick:... }} />
   * <FileUpload.Item file={file} button={{ action:"delete", onClick:... }} />
   * ```
   */
  Item: typeof FileUploadItem;
  /**
   * Wrapper for a button to trigger file select.
   * @see 🏷️ {@link FileUploadTriggerProps}
   * @example
   * ```jsx
   * <FileUpload.Trigger onSelect={...}>
   *   <Button variant="secondary">Last opp filer</Button>
   * </FileUpload.Trigger>
   * ```
   */
  Trigger: typeof FileUploadTrigger;
}

/**
 * A set of components used to upload and display files.
 * @see [📝 Documentation](https://aksel.nav.no/komponenter/core/fileupload)
 * @example Dropzone
 * ```jsx
 *  <FileUpload.Dropzone />
 * ```
 *
 * @example
 * Items
 * ```jsx
 * <VStack gap="space-16" as="ul">
 *   <FileUpload.Item as="li" file={myFile} />
 *   <FileUpload.Item as="li" file={mySecondFile} />
 * </VStack>
 * ```
 */
export const FileUpload = forwardRef<HTMLDivElement, FileUploadProps>(
  ({ children, className, translations, ...rest }: FileUploadProps, ref) => {
    return (
      <FileUploadLocaleContextProvider translations={translations}>
        <div ref={ref} {...rest} className={cl("aksel-file-upload", className)}>
          {children}
        </div>
      </FileUploadLocaleContextProvider>
    );
  },
) as FileUploadComponent;

FileUpload.Dropzone = FileUploadDropzone;
FileUpload.Item = FileUploadItem;
FileUpload.Trigger = FileUploadTrigger;

export default FileUpload;

export { FileUploadTrigger, FileUploadDropzone, FileUploadItem };
export type {
  FileUploadTriggerProps,
  FileUploadDropzoneProps,
  FileUploadItemProps,
};
