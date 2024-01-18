import cl from "clsx";
import React, { forwardRef } from "react";
import { ErrorMessage, Heading } from "../../../../typography";

export interface FileListProps {
  /**
   * Label describing the list.
   */
  label?: string;
  /**
   * HTML tag to use for the label
   * @default "span"
   */
  labelTag?: React.ElementType;
  /**
   * Error message relating to the list.
   */
  error?: string;
  /**
   * Class name passed to the <div> element.
   */
  className?: string;
  /**
   * List items <FileUpload.Item>.
   */
  children: React.ReactNode;
}

export const FileList = forwardRef<HTMLDivElement, FileListProps>(
  ({ children, label, labelTag = "span", error, className }, ref) => {
    return (
      <div className={cl("navds-file-list", className)} ref={ref}>
        {label && (
          <Heading size="xsmall" as={labelTag}>
            {label}
          </Heading>
        )}
        <ul className="navds-file-list__list">{children}</ul>
        <div
          className="navds-form-field__error navds-file-list__error"
          aria-relevant="additions removals"
          aria-live="polite"
        >
          {!!error && <ErrorMessage>{error}</ErrorMessage>}
        </div>
      </div>
    );
  },
);

export default FileList;
