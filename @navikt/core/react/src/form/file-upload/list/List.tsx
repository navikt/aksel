import cl from "clsx";
import React, { forwardRef, isValidElement } from "react";
import { ErrorMessage, Heading } from "../../../typography";
import { FileListContext } from "./file-list-context";

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
   * Sets a ref on the <div> element.
   */
  ref?: React.Ref<HTMLDivElement>;
  /**
   * Changes locale used for component text.
   * @default "nb" (norsk bokmål)
   */
  locale?: "nb" | "nn" | "en";
  /**
   * List items <FileUpload.Item>.
   */
  children: React.ReactNode;
}

export const FileList = forwardRef<HTMLDivElement, FileListProps>(
  ({ locale, children, label, labelTag = "span", error, className }, ref) => {
    return (
      <FileListContext.Provider value={{ locale }}>
        <div className={cl("navds-file-list", className)} ref={ref}>
          {label && (
            <Heading size="xsmall" as={labelTag}>
              {label}
            </Heading>
          )}
          <ul className="navds-file-list__list">
            {React.Children.map(children, (child) => {
              if (!isValidElement(child)) {
                return null;
              }

              return <li>{child}</li>;
            })}
          </ul>
          <div
            className="navds-form-field__error navds-file-list__error"
            aria-relevant="additions removals"
            aria-live="polite"
          >
            {!!error && <ErrorMessage>{error}</ErrorMessage>}
          </div>
        </div>
      </FileListContext.Provider>
    );
  }
);

export default FileList;
