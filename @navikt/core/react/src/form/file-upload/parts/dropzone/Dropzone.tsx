import cl from "clsx";
import React, { forwardRef } from "react";
import { CircleSlashIcon, CloudUpIcon } from "@navikt/aksel-icons";
import { Button } from "../../../../button";
import { BodyShort, ErrorMessage, Label } from "../../../../typography";
import { composeEventHandlers } from "../../../../util/composeEventHandlers";
import { useId } from "../../../../util/hooks";
import { omit } from "../../../../util/omit";
import { useFormField } from "../../../useFormField";
import { useFileUploadTranslation } from "../../FileUpload.context";
import { useI18n } from "../../i18n/i18n.context";
import { useFileUpload } from "../../useFileUpload";
import { FileUploadDropzoneProps } from "./dropzone.types";
import { useDropzone } from "./useDropzone";

const Dropzone = forwardRef<HTMLInputElement, FileUploadDropzoneProps>(
  (props: FileUploadDropzoneProps, ref) => {
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
      icon: DropzoneIcon = CloudUpIcon,
      disabled,
      translations,
      onClick,
      ...rest
    } = props;

    const context = useFileUploadTranslation(false);
    const translate = useI18n(
      "FileUpload",
      { dropzone: translations },
      context?.translations,
    );

    const fileLimitReached =
      fileLimit && fileLimit?.current >= fileLimit?.max && fileLimit?.max > 0;

    const _disabled = disabled ?? fileLimitReached;

    const { inputProps, errorId, showErrorMsg, hasError, inputDescriptionId } =
      useFormField({ ...props, disabled: _disabled }, "fileUpload");
    const {
      id: inputId,
      "aria-describedby": ariaDescribedby,
      ...inputPropsRest
    } = inputProps;
    const labelId = useId();

    const { upload, onChange, inputRef, mergedRef } = useFileUpload({
      ref,
      onSelect,
      validator,
      accept,
      maxSizeInBytes,
      disabled: inputProps.disabled,
    });

    const dropzoneCtx = useDropzone({
      upload,
      disabled: inputProps.disabled,
    });

    return (
      <div
        className={cl("navds-form-field", "navds-dropzone", className, {
          "navds-dropzone--error": hasError,
          "navds-dropzone--dragging": dropzoneCtx.isDraggingOver,
          "navds-dropzone--disabled": inputProps.disabled,
        })}
      >
        <Label
          htmlFor={inputId}
          id={labelId}
          className="navds-form-field__label"
        >
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
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
        <div
          className="navds-dropzone__area"
          onDragEnter={dropzoneCtx.onDragEnter}
          onDragOver={dropzoneCtx.onDragOver}
          onDragLeave={dropzoneCtx.onDragLeave}
          onDrop={dropzoneCtx.onDrop}
          onClick={composeEventHandlers(
            onClick,
            () => inputRef.current?.click(),
          )}
        >
          {!inputProps.disabled && (
            <>
              <div className="navds-dropzone__area-icon">
                <DropzoneIcon fontSize="1.5rem" aria-hidden />
              </div>
              <div className="navds-dropzone__area-release">
                <div className="navds-dropzone__area-release__icon">
                  <DropzoneIcon aria-hidden />
                </div>
                <span
                  aria-hidden={!dropzoneCtx.isDraggingOver}
                  className="navds-dropzone__area-release__text"
                >
                  {translate("dropzone.drop")}
                </span>
              </div>
              <div aria-hidden>
                <BodyShort as="div" spacing>
                  {multiple
                    ? translate("dropzone.dragAndDropMultiple")
                    : translate("dropzone.dragAndDrop")}
                </BodyShort>
                <BodyShort as="div">{translate("dropzone.or")}</BodyShort>
              </div>
              <Button
                {...omit(rest, ["errorId", "id"])}
                {...inputPropsRest}
                aria-describedby={cl(labelId, ariaDescribedby)}
                className="navds-dropzone__area-button"
                type="button"
                variant="secondary"
              >
                {multiple
                  ? translate("dropzone.buttonMultiple")
                  : translate("dropzone.button")}
              </Button>
            </>
          )}

          {inputProps.disabled && (
            <div className="navds-dropzone__area-disabled">
              <CircleSlashIcon aria-hidden fontSize="1.75rem" />
              <BodyShort as="div">
                {fileLimitReached
                  ? translate("dropzone.disabledFilelimit")
                  : translate("dropzone.disabled")}
              </BodyShort>
            </div>
          )}

          <input
            id={inputId}
            type="file"
            style={{ display: "none" }}
            multiple={multiple}
            accept={accept}
            onChange={onChange}
            ref={mergedRef}
            disabled={inputProps.disabled}
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
