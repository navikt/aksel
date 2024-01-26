import cl from "clsx";
import React, { MouseEvent, forwardRef } from "react";
import { BodyShort, ErrorMessage } from "../../../../typography";
import { OverridableComponent } from "../../../../util";
import { useFileUploadLocale } from "../../FileUpload.context";
import { useLocale } from "../../utils/useLocale";
import { FileItem } from "./Item.types";
import ItemButton from "./ItemButton";
import ItemIcon from "./ItemIcon";
import ItemName from "./ItemName";
import { formatFileSize } from "./utils/format-file-size";

export interface FileItemBaseProps {
  /**
   * Overrides html-tag
   * @default "div"
   */
  as?: "div" | "li";
  /**
   * Either a native File or file metadata.
   */
  file: FileItem;
  /**
   * Callback called when the filename is clicked.
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
}

type OnDelete = (event: MouseEvent<HTMLButtonElement>) => void;
type OnRetry = (event: MouseEvent<HTMLButtonElement>) => void;

type FileItemDeleteProps = {
  status: "delete";
  /**
   * Callback called when the delete button is clicked.
   */
  onDelete: OnDelete;
};

type FileItemRetryProps = {
  status: "retry";
  /**
   * Callback called when the retry button is clicked.
   */
  onRetry: OnRetry;
};

type FileItemDownloadingProps = {
  status: "downloading";
  /**
   * Callback called when the delete button is clicked.
   */
  onDelete?: OnDelete;
  /**
   * Callback called when the retry button is clicked.
   */
  onRetry?: OnRetry;
};

type FileItemUploadingProps = {
  status: "uploading";
  /**
   * Callback called when the delete button is clicked.
   */
  onDelete?: OnDelete;
  /**
   * Callback called when the retry button is clicked.
   */
  onRetry?: OnRetry;
};

type FileItemUndefinedProps = {
  status?: undefined;
  /**
   * Callback called when the delete button is clicked.
   */
  onDelete?: OnDelete;
  /**
   * Callback called when the retry button is clicked.
   */
  onRetry?: OnRetry;
};

type FileItemConditionalProps = FileItemBaseProps &
  (
    | FileItemDeleteProps
    | FileItemRetryProps
    | FileItemDownloadingProps
    | FileItemUploadingProps
    | FileItemUndefinedProps
  );

export type FileItemProps = FileItemConditionalProps &
  React.HTMLAttributes<HTMLDivElement>;

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
          <ItemIcon isLoading={!!status} file={file} error={isError} />
          <div className="navds-file-item__file-info">
            <ItemName file={file} href={href} onClick={onFileClick} />
            {!isError && (
              <BodyShort as="div" size="small">
                {getStatusText()}
              </BodyShort>
            )}
            <div
              className="navds-file-item__error"
              aria-relevant="additions removals"
              aria-live="polite"
            >
              {isError && <ErrorMessage size="small">{error}</ErrorMessage>}
            </div>
          </div>

          {!status && (
            <ItemButton
              file={file}
              onRetry={onRetry}
              onDelete={onDelete}
              error={error}
            />
          )}
        </Component>
      );
    },
  );

export default Item;
