/* eslint-disable jsx-a11y/no-static-element-interactions */

/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { forwardRef } from "react";
import { CircleSlashIcon, CloudUpIcon } from "@navikt/aksel-icons";
import { Button } from "../../../button";
import { BodyShort, ErrorMessage, Label } from "../../../typography";
import { omit, useId } from "../../../utils-external";
import { cl, composeEventHandlers } from "../../../utils/helpers";
import { useI18n } from "../../../utils/i18n/i18n.hooks";
import { useFormField } from "../../useFormField";
import { useFileUpload } from "../hooks/useFileUpload";
import { useFileUploadTranslation } from "../root/FileUploadRoot.context";
import { FileUploadDropzoneProps } from "./dropzone.types";
import { useDropzone } from "./useDropzone";

const FileUploadDropzone = forwardRef<
  HTMLInputElement,
  FileUploadDropzoneProps
>((props: FileUploadDropzoneProps, ref) => {
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
    id: buttonId,
    "data-color": color,
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
    useFormField({ ...omit(props, ["id"]), disabled: _disabled }, "fileUpload");
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
      className={cl("aksel-form-field", "aksel-dropzone", className, {
        "aksel-dropzone--error": hasError,
        "aksel-dropzone--dragging": dropzoneCtx.isDraggingOver,
        "aksel-dropzone--disabled": inputProps.disabled,
      })}
    >
      <Label htmlFor={inputId} id={labelId} className="aksel-form-field__label">
        {label}
      </Label>
      {!!description && (
        <BodyShort
          id={inputDescriptionId}
          className="aksel-form-field__description"
          as="div"
        >
          {description}
        </BodyShort>
      )}
      {/** biome-ignore lint/a11y/noStaticElementInteractions: Assistive technologies will use the input within.  */}
      <div
        className="aksel-dropzone__area"
        onDragEnter={dropzoneCtx.onDragEnter}
        onDragOver={dropzoneCtx.onDragOver}
        onDragLeave={dropzoneCtx.onDragLeave}
        onDrop={dropzoneCtx.onDrop}
        onClick={composeEventHandlers(onClick, () => inputRef.current?.click())}
        data-disabled={inputProps.disabled}
        data-color={color}
      >
        {!inputProps.disabled && (
          <>
            <div className="aksel-dropzone__area-icon">
              <DropzoneIcon fontSize="1.5rem" aria-hidden />
            </div>
            <div className="aksel-dropzone__area-release">
              <div className="aksel-dropzone__area-release__icon">
                <DropzoneIcon aria-hidden />
              </div>
              <span
                aria-hidden={!dropzoneCtx.isDraggingOver}
                className="aksel-dropzone__area-release__text"
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
              {...omit(rest, ["errorId"])}
              {...inputPropsRest}
              id={buttonId}
              aria-describedby={cl(labelId, ariaDescribedby)}
              className="aksel-dropzone__area-button"
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
          <div className="aksel-dropzone__area-disabled">
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
        className="aksel-form-field__error"
        id={errorId}
        aria-relevant="additions removals"
        aria-live="polite"
      >
        {showErrorMsg && <ErrorMessage showIcon>{error}</ErrorMessage>}
      </div>
    </div>
  );
});

export default FileUploadDropzone;
export { FileUploadDropzone };
export type { FileUploadDropzoneProps };
