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
  /**
   *
   */
  status?: "downloading" | "uploading" | "completed";
  /**
   * Callback called when the delete button is clicked.
   */
  /* onDelete?: (event: MouseEvent<HTMLButtonElement>) => void; */
  /**
   * Callback called when the retry button is clicked.
   */
  /* onRetry?: (event: MouseEvent<HTMLButtonElement>) => void; */
  /**
   *
   */
  /* itemAction?: "delete" | "retry" | "none"; */
}

type FileItemActionDelete = {
  onDelete: (event: MouseEvent<HTMLButtonElement>) => void;
  itemAction: "delete";
};

type FileItemActionRetry = {
  onRetry: (event: MouseEvent<HTMLButtonElement>) => void;
  itemAction: "retry";
};

type FileItemActionNone = {
  onRetry?: (event: MouseEvent<HTMLButtonElement>) => void;
  onDelete?: (event: MouseEvent<HTMLButtonElement>) => void;
  itemAction: "none";
};

type FileItemActionUndefined = {
  onRetry?: (event: MouseEvent<HTMLButtonElement>) => void;
  onDelete?: (event: MouseEvent<HTMLButtonElement>) => void;
  itemAction?: undefined;
};

type FileItemConditionalProps =
  | FileItemActionDelete
  | FileItemActionRetry
  | FileItemActionNone
  | FileItemActionUndefined;

export type FileItemProps = FileItemBaseProps &
  FileItemConditionalProps &
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
        itemAction = "delete",
      },
      ref,
    ) => {
      const localeCtx = useFileUploadLocale()?.locale ?? "nb";
      const translation = useLocale(localeCtx, { name: file.name });

      const showError = !!error && (!status || status === "completed");

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
            "navds-file-item--error": showError,
          })}
        >
          <div className="navds-file-item__inner">
            <ItemIcon
              isLoading={status && status !== "completed"}
              file={file}
              showError={showError}
            />
            <div className="navds-file-item__file-info">
              <ItemName file={file} href={href} onClick={onFileClick} />
              <BodyShort as="div">{getStatusText()}</BodyShort>
            </div>

            {status === "completed" && (
              <ItemButton
                file={file}
                onRetry={onRetry}
                onDelete={onDelete}
                action={itemAction}
              />
            )}
          </div>
          <div
            className="navds-file-item__error"
            aria-relevant="additions removals"
            aria-live="polite"
          >
            {showError && <ErrorMessage>{error}</ErrorMessage>}
          </div>
        </Component>
      );
    },
  );

export default Item;
