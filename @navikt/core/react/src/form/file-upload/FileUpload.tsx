import { UploadIcon } from "@navikt/aksel-icons";
import cl from "clsx";
import React, { forwardRef, ChangeEvent } from "react";
import { BodyShort, ErrorMessage } from "../../typography";

export interface FileUploadProps {
  /**
   * Changes styling when changed.
   * The "box" variant takes up the full
   * width of its parent, while the "button"
   * variant takes up width based on its content.
   */
  variant: "box" | "button";
  /**
   * Callback called when one or several files
   * are uploaded either on click or drag-and-drop
   */
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
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
  acceptedMimeTypes?: string[];
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
      onChange,
      error,
      inputId,
      label = "Velg dine filer",
      className,
      variant = "box",
      multiple = true,
      acceptedMimeTypes
    },
    ref
  ) => {
    const errorId = `${inputId}-error`
    const buttonClassNames = "navds-button navds-button--secondary navds-fileuploadbutton"

    const accept = acceptedMimeTypes ? acceptedMimeTypes.join(", ") : undefined
    const ariaDescribedby = error ? errorId : undefined
    if (variant === "button") {
      return (
        <div className={className}>
          <label className={buttonClassNames}>
            <UploadIcon focusable={false} aria-hidden={true} />
            <BodyShort as="span">{label}</BodyShort>
            <Input
              inputId={inputId}
              onChange={onChange}
              accept={accept}
              ariaDescribedby={ariaDescribedby}
              multiple={multiple}
            />
          </label>
          <Error error={error} errorId={errorId} />
        </div>
      )
    }

    return (
      <div className={className}>
        <label className={cl('navds-fileuploadbox', { "navds-fileuploadbox--error": !!error })}>
          <BodyShort className="navds-fileuploadbox__text">Dra og slipp</BodyShort>
          <BodyShort className="navds-fileuploadbox__text">eller</BodyShort>
          <div className={buttonClassNames}>
            <UploadIcon fontSize="1.5rem" focusable={false} className="navds-fileuploadbox__icon" aria-hidden={true} />
            {label}
          </div>
          <Input
            inputId={inputId}
            onChange={onChange}
            accept={accept}
            ariaDescribedby={ariaDescribedby}
            multiple={multiple}
          />
        </label>
        <Error error={error} errorId={errorId} />
      </div>
    )
  }
);

interface InputProps {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  inputId: string;
  multiple: boolean | undefined;
  accept: string | undefined;
  ariaDescribedby: string | undefined;
}

const Input = ({
  onChange,
  inputId,
  multiple,
  ariaDescribedby,
  accept
}: InputProps) => (
    <input
      type="file"
      className="navds-fileuploadinput"
      id={inputId}
      multiple={multiple}
      aria-describedby={ariaDescribedby}
      accept={accept}
      onChange={onChange}
    />
  )

interface ErrorProps {
  error: string | undefined;
  errorId: string | undefined;
}

const Error = ({error, errorId}: ErrorProps) => (error ?
    <ErrorMessage id={errorId}>{error}</ErrorMessage>
    : null
)

export default FileUpload;
