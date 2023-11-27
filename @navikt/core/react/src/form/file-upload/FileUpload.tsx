import React, { forwardRef, ChangeEvent, useState } from "react";
import cl from "clsx";
import { partitionFiles } from "./utils/partition-files";
import { BodyShort, ErrorMessage, Label } from "../../typography";
import ZoneVariant from "./ZoneVariant";
import ButtonVariant from "./ButtonVariant";
import { FileUploadContext } from "./FileUploadContext";

export interface OnUploadProps {
  allFiles: File[],
  acceptedFiles: File[],
  rejectedFiles: File[]
}

export interface FileUploadProps {
  /**
   * Represents the type of FileUpload component that
   * should be rendered.
   */
  children: React.ReactNode;
  /**
   * ID of the input element. Required to properly
   * connect input element to potential error message.
   */
  inputId: string;
  /**
   * Text shown to the user.
   */
  label: string;
  /**
   * Adds a description to extend labling of FileUpload
   */
  description?: string;
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
  validator?(file: File): boolean;
  /**
   * Changes locale used for component text.
   * @default "nb" (norsk bokmål)
   */
  locale?: "nb" | "nn" | "en";
}

/**
 * A component for uploading files
 * @see [📝 Documentation](https://aksel.nav.no/komponenter/core/FileUpload)
 * @see 🏷️ {@link FileUploadProps}
 * @example
 * ```jsx
 * <FileUpload
 *   onUpload={onUpload}
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
      label,
      description,
      className,
      multiple = true,
      accept,
      validator,
      children,
      locale = "nb"
    },
    ref
  ) => {
    const [isDraggingOver, setIsDraggingOver] = useState<boolean>(false)

    const errorId = `${inputId}-error`
    const ariaDescribedby = error ? errorId : undefined

    const onDragEnter = () => setIsDraggingOver(true)
    const onDragEnd = () => setIsDraggingOver(false)

    const handleUpload = (event: ChangeEvent<HTMLInputElement>) => {
      const fileList = event.target.files
      if (!fileList) {
        return
      }
      const files = Array.from(fileList)
      const { acceptedFiles, rejectedFiles } = partitionFiles(files, accept, validator)

      onUpload({ allFiles: files, acceptedFiles, rejectedFiles })

      // Resets the value to make it is possible to upload the same file several consecutive times
      event.target.value = ""
    }

    return (
      <FileUploadContext.Provider value={{ locale }}>
        <div
          className={cl("navds-form-field", "navds-fileupload", className)}
          ref={ref}
        >
          <Label
            htmlFor={inputId}
            className={cl("navds-form-field__label")}
          >{label}</Label>
          {!!description && (
            <BodyShort
              className={cl("navds-form-field__description")}
              as="div"
            >{description}</BodyShort>
          )}
          <div
            onDragOver={onDragEnter}
            onDragLeave={onDragEnd}
            onDragEnd={onDragEnd}
            onDrop={onDragEnd}
            className={
              cl(
                "navds-fileupload__content",
                {
                  "navds-fileupload__content--error": !!error,
                  "navds-fileupload__content--dragover": isDraggingOver
                }
              )
            }
          >
            {children}
            <input
              type="file"
              className="navds-fileupload__content__input"
              id={inputId}
              multiple={multiple}
              aria-describedby={ariaDescribedby}
              accept={accept}
              onChange={handleUpload}
            />
          </div>
          <div
            className="navds-form-field__error"
            id={errorId}
            aria-relevant="additions removals"
            aria-live="polite"
          >
            {error && <ErrorMessage>{error}</ErrorMessage>}
          </div>
        </div>
      </FileUploadContext.Provider>
    )
  }
) as FileUploadComponent;

export interface FileUploadComponent
  extends React.ForwardRefExoticComponent<
    FileUploadProps & React.RefAttributes<HTMLDivElement>
  > {
  Zone: typeof ZoneVariant;
  Button: typeof ButtonVariant;
}

FileUpload.Zone = ZoneVariant
FileUpload.Button = ButtonVariant

export default FileUpload;
