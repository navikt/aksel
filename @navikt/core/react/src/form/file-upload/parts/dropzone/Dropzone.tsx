import cl from "clsx";
import React, { forwardRef } from "react";
import { CloudUpIcon } from "@navikt/aksel-icons";
import { Button } from "../../../../button";
import { BodyShort, ErrorMessage, Label } from "../../../../typography";
import { omit } from "../../../../util/omit";
import { useFormField } from "../../../useFormField";
import { useFileUploadLocale } from "../../FileUpload.context";
import { useFileUpload } from "../../useFileUpload";
import { useLocale } from "../../utils/useLocale";
import { DropzoneProps } from "./dropzone.types";
import { useDropzone } from "./useDropzone";

const Dropzone = forwardRef<HTMLInputElement, DropzoneProps>(
  (props: DropzoneProps, ref) => {
    const {
      onSelect,
      error,
      label,
      description,
      className,
      multiple = true,
      accept,
      validator,
      maxSizeInBytes,
      fileLimit,
      ...rest
    } = props;

    const { inputProps, errorId, showErrorMsg, hasError, inputDescriptionId } =
      useFormField(props, "fileUpload");

    const localeCtx = useFileUploadLocale()?.locale ?? "nb";
    const translation = useLocale(localeCtx, { multiple });

    const disabled =
      inputProps.disabled ??
      (fileLimit && fileLimit?.current >= fileLimit?.max && fileLimit?.max > 0);

    const { onChange, inputRef, mergedRef } = useFileUpload({
      ref,
      onSelect,
      validator,
      accept,
      maxSizeInBytes,
      fileLimit,
      disabled,
    });

    const dropzoneCtx = useDropzone({
      disabled,
    });

    return (
      <div
        className={cl("navds-form-field", "navds-dropzone", className, {
          "navds-dropzone--error": hasError,
          "navds-dropzone--dragging": dropzoneCtx.isDraggingOver,
          "navds-dropzone--disabled": disabled,
        })}
      >
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
          className="navds-dropzone__area"
        >
          <div className="navds-dropzone__area-icon">
            <CloudUpIcon fontSize="1.5rem" aria-hidden />
          </div>
          <div className="navds-dropzone__area-release">
            <div className="navds-dropzone__area-release__icon">
              <CloudUpIcon aria-hidden />
            </div>
            <span
              aria-hidden={!dropzoneCtx.isDraggingOver}
              className="navds-dropzone__area-release__text"
            >
              {translation.drop}
            </span>
          </div>
          <div aria-hidden>
            <BodyShort as="div" spacing>
              {translation.dragAndDrop}
            </BodyShort>
            <BodyShort as="div">{translation.or}</BodyShort>
          </div>
          <Button
            className="navds-dropzone__area-button"
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
            className="navds-dropzone__area-input"
            multiple={multiple}
            accept={accept}
            onChange={onChange}
            ref={mergedRef}
            disabled={disabled}
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
