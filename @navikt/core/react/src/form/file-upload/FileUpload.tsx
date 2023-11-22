import { UploadIcon } from "@navikt/aksel-icons";
import cl from "clsx";
import React, { forwardRef, ChangeEvent, useState } from "react";
import { BodyShort, ErrorMessage } from "../../typography";

export interface OnUploadProps {
  allFiles: File[],
  acceptedFiles: File[],
  rejectedFiles: File[]
}

export interface FileUploadProps {
  /**
   * Changes styling when changed.
   * The "box" variant takes up the full
   * width of its parent, while the "button"
   * variant takes up width based on its content.
   */
  variant: "box" | "button";
  /**
   * ID of the input element. Required to properly
   * connect input element to potential error message.
   */
  inputId: string;
  /**
   * Text shown to the user.
   */
  label?: string;
  /**
   * Class name passed to the outermost <div> element.
   */
  className?: string;
  /**
   * Error message.
   */
  error?: string;
  /**
   * Indicates if it is possible
   * to upload multiple files at once.
   */
  multiple?: boolean;
  /**
   * Indicates which MIME types are
   * selectable in the file browser.
   */
  accept?: string;
  /**
   * Sets a ref on the outermost div.
   */
  ref?: React.Ref<HTMLDivElement>;
  /**
   * Callback triggered on file upload
   */
  onUpload({ allFiles, acceptedFiles, rejectedFiles }: OnUploadProps): void;
  /**
   * Custom validator that is used to decide
   * if a file is accepted or rejected.
   */
  customValidator?(file: File): boolean;
}

/**
 * A component for uploading files
 * @see [📝 Documentation](https://aksel.nav.no/komponenter/core/FileUpload)
 * @see 🏷️ {@link FileUploadProps}
 * @example
 * ```jsx
 * <FileUpload
 *   onUpload={onUpload}
 *   variant="button"
 *   label="Last opp filer her"
 *   inputId="fileupload-input"
 * />
 * ```
 */
export const FileUpload = forwardRef<HTMLDivElement, FileUploadProps>(
  (
    {
      onUpload,
      error,
      inputId,
      label = "Velg dine filer",
      className,
      variant = "box",
      multiple = true,
      accept,
      customValidator
    },
    ref
  ) => {
    const onDragOver = () => setIsDraggingOver(true)
    const onDragLeave = () => setIsDraggingOver(false)
    const [isDraggingOver, setIsDraggingOver] = useState<boolean>(false)
    const errorId = `${inputId}-error`
    const ariaDescribedby = error ? errorId : undefined

    const handleUpload = (event: ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(event.target.files)
      const { acceptedFiles, rejectedFiles } = partitionFiles(files)

      onUpload({ allFiles: files, acceptedFiles, rejectedFiles })

      // Resets the value to make it is possible to upload the same file several consecutive times
      event.target.value = ""
    }

    const partitionFiles = (files: File[]): { acceptedFiles: File[], rejectedFiles: File[] } => {
      const acceptedFiles = []
      const rejectedFiles = []

      files.forEach(file => {
        const isAccepted = isAcceptedFileType(file, accept) && (customValidator?.(file) ?? true)
        if (isAccepted) {
          acceptedFiles.push(file)
        } else {
          rejectedFiles.push(file)
        }
      })

      return {
        acceptedFiles,
        rejectedFiles
      }
    }

    const isBoxVariant = variant === "box"

    return (
      <div className={cl('navds-fileupload', className)} onDragOver={onDragOver} onDragLeave={onDragLeave} ref={ref}>
        <label className={
          cl({
            'navds-fileuploadbox': isBoxVariant,
            "navds-fileuploadbox--error": !!error && isBoxVariant,
            "navds-fileupload--dragover": isDraggingOver
          })
        }>
          {isBoxVariant && (<>
            <BodyShort className="navds-fileuploadbox__text">Dra og slipp</BodyShort>
            <BodyShort className="navds-fileuploadbox__text">eller</BodyShort>
          </>)}
          <div className={cl("navds-button", "navds-button--secondary", "navds-fileuploadbutton", {
            "navds-fileupload--dragover": isDraggingOver
          })}>
            <UploadIcon fontSize="1.5rem" focusable={false} aria-hidden={true} className="navds-fileupload__icon" />
            {label}
          </div>
          <input
            type="file"
            className="navds-fileuploadinput"
            id={inputId}
            multiple={multiple}
            aria-describedby={ariaDescribedby}
            accept={accept}
            onChange={handleUpload}
          />
        </label>
        {error && <ErrorMessage id={errorId}>{error}</ErrorMessage>}
      </div>)
  }
);

function isAcceptedFileType(file: File, acceptAttribute: string | undefined): boolean {
  if (acceptAttribute === undefined) {
    return true
  }
  const mimeType = file.type
  const acceptedTypes = acceptAttribute.split(',')

  return acceptedTypes.some((type) => {
    const validType = type.trim()
    const isExtensionType = validType.startsWith('.')
    const isWildcardMimeType = validType.endsWith('/*')

    if (isExtensionType) {
      return file.name.toLowerCase().endsWith(validType.toLowerCase());
    } else if (isWildcardMimeType) {
      const baseMimeType = mimeType.replace(/\/.*$/, '')
      const baseValidType = validType.replace(/\/.*$/, '')
      return baseMimeType === baseValidType
    }
    return mimeType === validType;
  });
}

export default FileUpload;
