import React, { forwardRef } from "react";
import cl from "clsx";
import { ErrorMessage } from "../../../typography";
import { FileItem } from "../item/props";
import { FileListContext } from "./file-list-context";

export interface FileListProps {
  label: string;
  error?: string;
  className?: string;
  ref?: React.Ref<HTMLDivElement>;
  onDelete?: (file: FileItem) => void;
  onRetry?: (file: FileItem) => void;
  /**
   * Changes locale used for component text.
   * @default "nb" (norsk bokmål)
   */
  locale?: "nb" | "nn" | "en";
  children: React.ReactNode;
}

export const FileList = forwardRef<HTMLDivElement, FileListProps>(
  (
    {
      locale,
      onRetry,
      onDelete,
      children,
      label,
      error,
      className
    },
    ref
  ) => {
    return (
      <FileListContext.Provider value={{
        locale,
        onRetry,
        onDelete
      }}>
        <div
          className={cl("navds-filelist", className)}
          ref={ref}
        >
          <span className="navds-heading navds-heading--small">{label}</span>
          <ul className="navds-filelist__list">
            {children}
          </ul>
          <div
            className="navds-filelist__error"
            aria-relevant="additions removals"
            aria-live="polite"
          >
            {!!error && <ErrorMessage>{error}</ErrorMessage>}
          </div>
        </div>
      </FileListContext.Provider>
    )
  }
);

export default FileList;
