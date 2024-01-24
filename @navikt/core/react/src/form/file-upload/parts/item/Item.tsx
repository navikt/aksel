import cl from "clsx";
import React, { MouseEvent, forwardRef } from "react";
import { ErrorMessage } from "../../../../typography";
import { OverridableComponent } from "../../../../util";
import { useFileUploadLocale } from "../../FileUpload.context";
import { useLocale } from "../../utils/useLocale";
import ItemButton from "./ItemButton";
import ItemIcon from "./ItemIcon";
import ItemName from "./ItemName";
import { FileItem } from "./types";
import { formatFileSize } from "./utils/format-file-size";

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

export const Item: OverridableComponent<FileItemProps, HTMLDivElement> =
  forwardRef(
    (
      {
        as: Component = "div",
        file,
        status,
        onDelete,
        onRetry,
        error,
        className,
        href,
        onFileClick,
      },
      ref,
    ) => {
      const localeCtx = useFileUploadLocale()?.locale ?? "nb";
      const translation = useLocale(localeCtx, { name: file.name });

      const isError = !!error && !status;

      function getStatusText() {
        if (status === "uploading") {
          return translation.uploading;
        }
        if (status === "downloading") {
          return translation.downloading;
        }
        return formatFileSize(file);
      }

      return (
        <Component
          ref={ref}
          className={cl("navds-file-item", className, {
            "navds-file-item--error": isError,
          })}
        >
          <ItemIcon isLoading={!!status} file={file} />
          <div className="navds-file-item__file-info">
            <ItemName file={file} href={href} onClick={onFileClick} />
            {!isError && <div>{getStatusText()}</div>}
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
        </Component>
      );
    },
  );

export default Item;
