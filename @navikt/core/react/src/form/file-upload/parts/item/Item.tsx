import cl from "clsx";
import React, { MouseEvent, forwardRef } from "react";
import { ExclamationmarkTriangleIcon } from "@navikt/aksel-icons";
import { BodyShort } from "../../../../typography";
import { OverridableComponent } from "../../../../util";
import { useFileUploadTranslation } from "../../FileUpload.context";
import { useI18n } from "../../i18n/i18n.context";
import { ComponentTranslation } from "../../i18n/i18n.types";
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
   * onClick on the file name.
   * @note If this and `href` is not set and the `file` prop is a native file, onClick will download the file.
   */
  onFileClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
  /**
   * href on the file name.
   * @note If this and `onFileClick` is not set and the `file` prop is a native file, onClick will download the file.
   */
  href?: string;
  /**
   * Error message relating to the item.
   */
  error?: string;
  /**
   * Status "downloading" and "uploading" displays a loading indicator.
   * @default "idle"
   */
  status?: "downloading" | "uploading" | "idle";
  /**
   * i18n-API for customizing texts and labels
   */
  translations?: ComponentTranslation["FileUpload"];
  onRetry?: (event: MouseEvent<HTMLButtonElement>) => void;
  onDelete?: (event: MouseEvent<HTMLButtonElement>) => void;
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
  itemAction?: "none";
};

type FileItemConditionalProps =
  | FileItemActionDelete
  | FileItemActionRetry
  | FileItemActionNone;

export type FileUploadItemProps = FileItemBaseProps &
  FileItemConditionalProps &
  React.HTMLAttributes<HTMLDivElement>;

export const Item: OverridableComponent<FileUploadItemProps, HTMLDivElement> =
  forwardRef(
    (
      {
        as: Component = "div",
        file,
        status = "idle",
        onDelete,
        onRetry,
        error,
        className,
        href,
        onFileClick,
        itemAction = "delete",
        translations,
        ...rest
      },
      ref,
    ) => {
      const context = useFileUploadTranslation(false);
      const translate = useI18n({
        FileUpload: translations ?? context?.translations,
      });

      const showError = !!error && status === "idle";

      function getStatusText() {
        if (status === "uploading") {
          return translate("FileUpload.item.uploading");
        }
        if (status === "downloading") {
          return translate("FileUpload.item.downloading");
        }
        return formatFileSize(file);
      }

      return (
        <Component
          ref={ref}
          {...rest}
          className={cl("navds-file-item", className, {
            "navds-file-item--error": showError,
          })}
        >
          <div className="navds-file-item__inner">
            <ItemIcon
              isLoading={status !== "idle"}
              file={file}
              showError={showError}
            />
            <div className="navds-file-item__file-info">
              <ItemName file={file} href={href} onClick={onFileClick} />
              <BodyShort as="div" size="small">
                {getStatusText()}
              </BodyShort>
              <div
                className="navds-file-item__error"
                aria-relevant="additions removals"
                aria-live="polite"
              >
                {showError && (
                  <BodyShort
                    size="small"
                    className="navds-file-item__error-content"
                  >
                    <ExclamationmarkTriangleIcon aria-hidden />
                    {error}
                  </BodyShort>
                )}
              </div>
            </div>

            {status === "idle" && (
              <ItemButton
                file={file}
                onRetry={onRetry}
                onDelete={onDelete}
                action={itemAction}
                retryTitle={translate("FileUpload.item.retryButtonTitle")}
                deleteTitle={translate("FileUpload.item.deleteButtonTitle")}
              />
            )}
          </div>
        </Component>
      );
    },
  );

export default Item;
