import cl from "clsx";
import React, { forwardRef, isValidElement } from "react";
import { ErrorMessage } from "../../../typography";
import { FileListContext } from "./file-list-context";

export interface FileListProps {
  /**
   * Label describing the list.
   */
  label: string;
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
  ({ locale, children, label, error, className }, ref) => {
    return (
      <FileListContext.Provider
        value={{
          locale,
        }}
      >
        <div className={cl("navds-file-list", className)} ref={ref}>
          <span className="navds-heading navds-heading--small">{label}</span>
          <ul className="navds-file-list__list">
            {React.Children.map(children, (child) => {
              if (!isValidElement(child)) {
                return null;
              }

              return <li>{child}</li>;
            })}
          </ul>
          <div
            className="navds-file-list__error"
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
