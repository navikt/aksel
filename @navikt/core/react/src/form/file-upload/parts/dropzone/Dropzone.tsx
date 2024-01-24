import cl from "clsx";
import React, { forwardRef, useRef } from "react";
import { CloudUpIcon } from "@navikt/aksel-icons";
import { Button } from "../../../../button";
import { BodyShort, ErrorMessage, Label } from "../../../../typography";
import { useMergeRefs } from "../../../../util/hooks";
import { omit } from "../../../../util/omit";
import { FormFieldProps, useFormField } from "../../../useFormField";
import { useFileUploadLocale } from "../../FileUpload.context";
import { useLocale } from "../../utils/useLocale";
import { useDropzone } from "./useDropzone";

export interface OnFileSelectProps {
  allFiles: File[];
  acceptedFiles: File[];
  rejectedFiles: File[];
}

export interface DropzoneProps
  extends Omit<FormFieldProps, "size" | "disabled" | "readOnly">,
    Omit<
      React.InputHTMLAttributes<HTMLInputElement>,
      "children" | "size" | "onSelect"
    > {
  /**
   * Text shown to the user.
   */
  label: string;
  /**
   * Class name passed to the outermost <div> element.
   */
  className?: string;
  /**
   * Indicates if it is possible
   * to select multiple files at once.
   * @default true
   */
  multiple?: boolean;
  /**
   * Indicates which file types to accept.
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#accept
   */
  accept?: string;
  /**
   * Callback triggered on file select
   */
  onSelect: (files: OnFileSelectProps) => void;
  /**
   * Custom validator that is used to decide
   * if a file is accepted or rejected.
   */
  validator?: (file: File) => boolean;
}

/**
 * TODO:
 * - Extract logic to hooks
 * - Update classNames
 * - Update i18n
 * - Update CSS
 */
const Dropzone = forwardRef<HTMLInputElement, DropzoneProps>(
  (props: DropzoneProps, ref) => {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const mergedRef = useMergeRefs(inputRef, ref);

    const {
      onSelect,
      error,
      label,
      description,
      className,
      multiple = true,
      accept,
      validator,
      ...rest
    } = props;

    const { inputProps, errorId, showErrorMsg, hasError, inputDescriptionId } =
      useFormField(props, "fileUpload");

    const localeCtx = useFileUploadLocale()?.locale ?? "nb";
    const translation = useLocale(localeCtx, { multiple });

    const dropzoneCtx = useDropzone({ inputRef, onSelect, validator, accept });

    return (
      <div className={cl("navds-form-field", "navds-file-dropzone", className)}>
        <Label htmlFor={inputProps.id} className="navds-form-field__label">
          {label}
        </Label>
        {!!description && (
          <BodyShort
            id={inputDescriptionId}
            className="navds-form-field__description"
            as="div"
          >
            {description}
          </BodyShort>
        )}
        <div
          onDragOver={dropzoneCtx.onDragOver}
          onDragLeave={dropzoneCtx.onDragLeave}
          onDragEnd={dropzoneCtx.onDragEnd}
          onDrop={dropzoneCtx.onDrop}
          className={cl("navds-file-dropzone__zone", {
            "navds-file-dropzone__zone--error": hasError,
            "navds-file-dropzone__zone--dragging-over":
              dropzoneCtx.isDraggingOver,
          })}
        >
          <div className="navds-file-dropzone__zone-icon">
            <CloudUpIcon fontSize="2rem" aria-hidden />
          </div>
          <div className="aware-animation">
            <div className="aware-animation-icon">
              <CloudUpIcon fontSize="2rem" aria-hidden />
            </div>
            <span
              aria-hidden={!dropzoneCtx.isDraggingOver}
              className="aware-animation-text"
            >
              {translation.drop}
            </span>
          </div>
          <div aria-hidden className="navds-file-dropzone__zone-text">
            <BodyShort as="div" spacing>
              {translation.dragAndDrop}
            </BodyShort>
            <BodyShort as="div">{translation.or}</BodyShort>
          </div>
          <Button
            className="navds-file-dropzone__button"
            variant="secondary"
            onClick={() => inputRef.current?.click()}
            tabIndex={-1}
          >
            {translation.button}
          </Button>

          <input
            {...omit(rest, ["errorId"])}
            {...inputProps}
            type="file"
            className="navds-file-dropzone__input"
            multiple={multiple}
            accept={accept}
            onChange={dropzoneCtx.onChange}
            ref={mergedRef}
          />
        </div>
        <div
          className="navds-form-field__error"
          id={errorId}
          aria-relevant="additions removals"
          aria-live="polite"
        >
          {showErrorMsg && <ErrorMessage>{error}</ErrorMessage>}
        </div>
      </div>
    );
  },
);

export default Dropzone;
