import cl from "clsx";
import React, { MouseEvent, forwardRef } from "react";
import { ErrorMessage } from "../../../../typography";
import { useFileUploadLocale } from "../../FileUpload.context";
import ItemButton from "./ItemButton";
import ItemIcon from "./ItemIcon";
import ItemName from "./ItemName";
import { FileItem } from "./types";
import { formatFileSize } from "./utils/format-file-size";
import { getDownloadingText, getUploadingText } from "./utils/i18n";

export interface FileItemBaseProps {
  /**
   * Either a native File or file metadata.
   */
  file: FileItem;
  /**
   * Callback called when the file named is clicked.
   */
  onFileClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
  /**
   * Href to use on the <a> tag displaying the file name.
   */
  href?: string;
  /**
   * Error message relating to the item.
   */
  error?: string;
  /**
   * Indicates if the file is being uploaded or downloaded.
   */
  status?: "uploading" | "downloading";
  /**
   * Callback called when the delete button is clicked.
   */
  onDelete?: (event: MouseEvent<HTMLButtonElement>) => void;
  /**
   * Callback called when the retry button is clicked.
   */
  onRetry?: (event: MouseEvent<HTMLButtonElement>) => void;
}

export interface FileItemProps
  extends FileItemBaseProps,
    React.HTMLAttributes<HTMLDivElement> {}

export const Item = forwardRef<HTMLDivElement, FileItemProps>(
  (
    {
      file,
      status,
      onDelete,
      onRetry,
      error,
      className,
      href,
      onFileClick,
    }: FileItemProps,
    ref,
  ) => {
    const locale = useFileUploadLocale()?.locale ?? "nb";
    const isError = !!error && !status;

    return (
      <div
        ref={ref}
        className={cl("navds-file-item", className, {
          "navds-file-item--error": isError,
        })}
      >
        <ItemIcon isLoading={!!status} file={file} />
        <div className="navds-file-item__file-info">
          <ItemName file={file} href={href} onClick={onFileClick} />
          {!isError && <div>{getStatusText(file, locale, status)}</div>}
          <div
            className="navds-file-item__error"
            aria-relevant="additions removals"
            aria-live="polite"
          >
            {isError && <ErrorMessage>{error}</ErrorMessage>}
          </div>
        </div>
        <div className="navds-file-item__button">
          {!status && (
            <ItemButton
              file={file}
              onRetry={onRetry}
              onDelete={onDelete}
              error={error}
            />
          )}
        </div>
      </div>
    );
  },
);

function getStatusText(
  file: FileItem,
  locale: "nb" | "en",
  status?: FileItemProps["status"],
) {
  if (status === "uploading") {
    return getUploadingText(locale);
  }
  if (status === "downloading") {
    return getDownloadingText(locale);
  }
  return formatFileSize(file);
}

export default Item;