import cl from "clsx";
import React, { CSSProperties, MutableRefObject, Ref, useRef } from "react";
import { ErrorMessage, Label, BodyShort } from "../../typography";

interface Props {
  label: string;
  description: string | undefined;
  className: string | undefined;
  dropzoneClassName?: string;
  onDragEnter?: () => void;
  onDragEnd?: () => void;
  divRef: any;
  dropzoneRef?: MutableRefObject<HTMLDivElement | null>;
  style?: CSSProperties;
  error: string | undefined;
  isDraggingOver: boolean;
  children: React.ReactNode;
  inputId: string;
  multiple: boolean;
  accept: string | undefined;
  handleUpload: any;
  fullWidth: boolean;
}

const Wrapper = ({
  className,
  label,
  description,
  dropzoneClassName,
  onDragEnter,
  onDragEnd,
  divRef,
  dropzoneRef,
  style,
  error,
  isDraggingOver,
  children,
  inputId,
  multiple,
  accept,
  handleUpload,
  fullWidth
}: Props) => {
  const errorId = `${inputId}-error`
  const ariaDescribedby = error ? errorId : undefined

  return <div
    className={cl("navds-form-field", className)}
    ref={divRef}
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
      style={{
        width: style?.width ? style.width : fullWidth ? "100%" : "auto",
        height: style?.height
      }}
      ref={dropzoneRef}
      className={
        cl(
          "navds-fileupload",
          dropzoneClassName,
          {
            "navds-fileupload--error": !!error,
            "navds-fileupload--dragover": isDraggingOver
          }
        )
      }
    >
      {children}
      <input
        type="file"
        className="navds-fileupload__input"
        style={style}
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
  </div>}

export default Wrapper
