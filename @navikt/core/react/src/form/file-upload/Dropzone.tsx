import cl from "clsx";
import React, {
  ChangeEvent,
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { CloudUpIcon, UploadIcon } from "@navikt/aksel-icons";
import { Button } from "../../button";
import { BodyShort, ErrorMessage, Label } from "../../typography";
import { mergeRefs } from "../../util";
import { useFormField } from "../useFormField";
import {
  getButtonText,
  getDragAndDropText,
  getDropText,
  getOrText,
} from "./utils/i18n";
import { partitionFiles } from "./utils/partition-files";

export interface OnFileUploadProps {
  allFiles: File[];
  acceptedFiles: File[];
  rejectedFiles: File[];
}

export interface DropzoneProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "children" | "size"
  > {
  /**
   * ID of the input element. Required to properly
   * connect input element to potential error message.
   */
  id: string;
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
  ref?: React.Ref<HTMLInputElement>;
  /**
   * Callback triggered on file upload
   */
  onUpload({ allFiles, acceptedFiles, rejectedFiles }: OnFileUploadProps): void;
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

const Dropzone = forwardRef<HTMLInputElement, DropzoneProps>(
  (props: DropzoneProps, ref) => {
    const [isDraggingOver, setIsDraggingOver] = useState<boolean>(false);

    const inputRef = useRef<HTMLInputElement | null>(null);
    const mergedRef = useMemo(() => mergeRefs([inputRef, ref]), [ref]);

    const {
      onUpload,
      error,
      label,
      description,
      className,
      multiple = true,
      accept,
      validator,
      locale: localeProp,
      ...rest
    } = props;

    const { inputProps, errorId, showErrorMsg, hasError, inputDescriptionId } =
      useFormField(props, "fileUpload");

    const locale = localeProp || "nb";

    const upload = useCallback(
      (files: File[]) => {
        const { acceptedFiles, rejectedFiles } = partitionFiles(
          files,
          accept,
          validator
        );

        onUpload({ allFiles: files, acceptedFiles, rejectedFiles });
      },
      [onUpload, accept, validator]
    );

    useEffect(() => {
      const fileInput = inputRef.current;

      const handlePaste = (event: ClipboardEvent) => {
        if (fileInput === null || window.document.activeElement !== fileInput) {
          return;
        }
        event.preventDefault();
        if (!event.clipboardData) {
          return;
        }

        const files = Array.from(event.clipboardData.items)
          .filter((item) => item.kind === "file")
          .map((item) => item.getAsFile())
          .filter((item): item is File => item !== null);

        if (files.length > 0) {
          upload(files);
        }
      };

      window.addEventListener("paste", handlePaste);

      return () => {
        window.removeEventListener("paste", handlePaste);
      };
    }, [upload]);

    const onButtonClick = () => {
      inputRef?.current?.click();
    };

    const onDragEnter = () => setIsDraggingOver(true);

    const onDragEnd = () => setIsDraggingOver(false);

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
      const fileList = event.target.files;
      if (!fileList) {
        return;
      }

      upload(Array.from(fileList));

      // Resets the value to make it is possible to upload the same file several consecutive times
      event.target.value = "";
    };

    return (
      <div className={cl("navds-form-field", "navds-file-dropzone", className)}>
        <Label
          htmlFor={inputProps.id}
          className={cl("navds-form-field__label")}
        >
          {label}
        </Label>
        {!!description && (
          <BodyShort
            id={inputDescriptionId}
            className={cl("navds-form-field__description")}
            as="div"
          >
            {description}
          </BodyShort>
        )}
        <div
          onDragOver={onDragEnter}
          onDragLeave={onDragEnd}
          onDragEnd={onDragEnd}
          onDrop={onDragEnd}
          className={cl("navds-file-dropzone__content", {
            "navds-file-dropzone__content--error": hasError,
            "navds-file-dropzone__content--dragover": isDraggingOver,
          })}
        >
          <div className="navds-file-dropzone__content-zone">
            {isDraggingOver && (
              <div className="navds-file-dropzone__content-zone-dragover">
                <CloudUpIcon fontSize="1.5rem" aria-hidden />
                <BodyShort as="span">{getDropText(locale)}</BodyShort>
              </div>
            )}
            <div className="navds-file-dropzone__content-zone-icon">
              <UploadIcon fontSize="1.5rem" aria-hidden />
            </div>
            <div className="navds-file-dropzone__content-zone-text">
              <BodyShort as="span" aria-hidden>
                {getDragAndDropText(locale)}
              </BodyShort>
              <BodyShort as="span" aria-hidden>
                {getOrText(locale)}
              </BodyShort>
            </div>
            <Button
              className="navds-file-dropzone__content-zone-button"
              variant="secondary"
              onClick={onButtonClick}
              tabIndex={-1}
            >
              {getButtonText(locale)}
            </Button>
          </div>
          <input
            type="file"
            className="navds-file-dropzone__content-input"
            multiple={multiple}
            accept={accept}
            onChange={onChange}
            ref={mergedRef}
            {...rest}
            {...inputProps}
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
  }
);

export default Dropzone;
