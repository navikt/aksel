import cl from "clsx";
import React, {
  ChangeEvent,
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { CloudUpIcon } from "@navikt/aksel-icons";
import { Button } from "../../../button";
import { BodyShort, ErrorMessage, Label } from "../../../typography";
import { useMergeRefs } from "../../../util/hooks";
import { omit } from "../../../util/omit";
import { FormFieldProps, useFormField } from "../../useFormField";
import { useFileUploadLocale } from "../FileUpload.context";
import {
  getButtonText,
  getDragAndDropText,
  getDropText,
  getOrText,
} from "../utils/i18n";
import { partitionFiles } from "../utils/partition-files";

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

const Dropzone = forwardRef<HTMLInputElement, DropzoneProps>(
  (props: DropzoneProps, ref) => {
    const [isDraggingOver, setIsDraggingOver] = useState(false);
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

    /**
     * Put callbacks in refs so that we don't re-add the paste event listener on every
     * render when consumer creates new onSelect/validator function(s) on every render
     */
    const onSelectRef = useRef(onSelect);
    const validatorRef = useRef(validator);
    onSelectRef.current = onSelect;
    validatorRef.current = validator;

    const upload = useCallback(
      (files: File[]) => {
        const { acceptedFiles, rejectedFiles } = partitionFiles(
          files,
          accept,
          validatorRef.current,
        );

        onSelectRef.current({ allFiles: files, acceptedFiles, rejectedFiles });
      },
      [accept],
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
      inputRef.current?.click();
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
          onDragOver={onDragEnter}
          onDragLeave={onDragEnd}
          onDragEnd={onDragEnd}
          onDrop={onDragEnd}
          className={cl("navds-file-dropzone__zone", {
            "navds-file-dropzone__zone--error": hasError,
            "navds-file-dropzone__zone--dragging-over": isDraggingOver,
          })}
        >
          {isDraggingOver && (
            <div className="navds-file-dropzone__dragover"></div>
          )}
          <div className="navds-file-dropzone__zone-icon">
            <CloudUpIcon fontSize="2rem" aria-hidden />
          </div>
          <div className="aware-animation">
            <div className="aware-animation-icon">
              <CloudUpIcon fontSize="2rem" aria-hidden />
            </div>
            <span
              aria-hidden={!isDraggingOver}
              className="aware-animation-text"
            >
              {getDropText(localeCtx)}
            </span>
          </div>
          <div aria-hidden className="navds-file-dropzone__zone-text">
            <BodyShort as="div" spacing>
              {getDragAndDropText(localeCtx, multiple)}
            </BodyShort>
            <BodyShort as="div">{getOrText(localeCtx)}</BodyShort>
          </div>
          <Button
            className="navds-file-dropzone__button"
            variant="secondary"
            onClick={onButtonClick}
            tabIndex={-1}
          >
            {getButtonText(localeCtx, multiple)}
          </Button>

          <input
            {...omit(rest, ["errorId"])}
            {...inputProps}
            type="file"
            className="navds-file-dropzone__input"
            multiple={multiple}
            accept={accept}
            onChange={onChange}
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
