import { UploadIcon } from "@navikt/aksel-icons";
import cl from "clsx";
import React, { forwardRef, ChangeEvent, useState, useRef } from "react";
import { BodyShort, ErrorMessage } from "../../typography";
import { partitionFiles } from "./partition-files";
import { useClientLayoutEffect } from "../../util";

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
  validator?(file: File): boolean;
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
      validator
    },
    ref
  ) => {
    const isBoxVariant = variant === "box"
    const errorId = `${inputId}-error`
    const ariaDescribedby = error ? errorId : undefined

    const labelRef = useRef<HTMLLabelElement | null>(null)
    const [isDraggingOver, setIsDraggingOver] = useState<boolean>(false)
    const [widthOverride, setWidthOverride] = useState<number>()
    const [heightOverride, setHeightOverride] = useState<number>()

    useClientLayoutEffect(() => {
      if (isBoxVariant && isDraggingOver) {
        const requestID = window.requestAnimationFrame(() => {
          const boundingClientRect = labelRef?.current?.getBoundingClientRect()
          setWidthOverride(boundingClientRect?.width)
          setHeightOverride(boundingClientRect?.height)
        });
        return () => {
          setWidthOverride(undefined);
          setHeightOverride(undefined);
          cancelAnimationFrame(requestID);
        };
      } else {
        setWidthOverride(undefined);
        setHeightOverride(undefined);
      }
    }, [isDraggingOver, variant]);

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
      <div
        className={cl("navds-form-field", className)}
        onDragOver={onDragEnter}
        onDragLeave={onDragEnd}
        onDragEnd={onDragEnd}
        onDrop={onDragEnd}
        ref={ref}
      >
        <label
          style={{
            width: widthOverride,
            height: heightOverride
          }}
          ref={labelRef}
          className={
            cl("navds-fileupload", {
              'navds-fileupload--box': isBoxVariant,
              "navds-fileupload--error": !!error,
              "navds-fileupload--dragover": isDraggingOver
            })
          }
        >
          {widthOverride
            ? <BodyShort as="span">Slipp</BodyShort>
            : (<>
              {isBoxVariant && (<>
                <BodyShort as="span">Dra og slipp</BodyShort>
                <BodyShort as="span">eller</BodyShort>
              </>)}
              <span
                className={cl(
                  "navds-button",
                  "navds-button--secondary",
                  "navds-fileuploadbutton",
                  { "navds-fileuploadbutton--dragover": isDraggingOver }
                )}
              >
                <UploadIcon fontSize="1.5rem" focusable={false} aria-hidden={true} className="navds-fileupload__icon" />
                  {label}
              </span>
            </>)
          }
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
        <div
          className="navds-form-field__error"
          id={errorId}
          aria-relevant="additions removals"
          aria-live="polite"
        >
          {error && <ErrorMessage>{error}</ErrorMessage>}
        </div>
      </div>)
  }
);

export default FileUpload;
