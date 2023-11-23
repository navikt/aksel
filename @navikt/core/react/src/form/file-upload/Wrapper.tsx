import cl from "clsx";
import { ErrorMessage } from "../../typography";
import React from "react";

interface Props {
  className?: string,
  labelClassName?: string,
  onDragEnter?: () => void;
  onDragEnd?: () => void;
  divRef: any;
  labelRef?: any;
  style?: any;
  error: any;
  isDraggingOver: any;
  children: any;
  inputId: any;
  multiple: any;
  accept: any;
  handleUpload: any;
}

const Wrapper = ({
  className,
  labelClassName,
  onDragEnter,
  onDragEnd,
  divRef,
  labelRef,
  style,
  error,
  isDraggingOver,
  children,
  inputId,
  multiple,
  accept,
  handleUpload
}: Props) => {
  const errorId = `${inputId}-error`
  const ariaDescribedby = error ? errorId : undefined

  return <div
    className={cl("navds-form-field", className)}
    onDragOver={onDragEnter}
    onDragLeave={onDragEnd}
    onDragEnd={onDragEnd}
    onDrop={onDragEnd}
    ref={divRef}
  >
    <label
      style={style}
      ref={labelRef}
      className={
        cl(
          "navds-fileupload",
          labelClassName,
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
  </div>}

export default Wrapper
