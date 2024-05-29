import cl from "clsx";
import React, { MouseEvent, forwardRef } from "react";
import { ExclamationmarkTriangleIcon } from "@navikt/aksel-icons";
import { BodyShort } from "../../../../typography";
import { OverridableComponent } from "../../../../util";
import { useI18n } from "../../../../util/i18n/i18n.context";
import { ComponentTranslation } from "../../../../util/i18n/i18n.types";
import { useFileUploadTranslation } from "../../FileUpload.context";
import { FileItem } from "./Item.types";
import ItemButton from "./ItemButton";
import ItemIcon from "./ItemIcon";
import ItemName from "./ItemName";
import { formatFileSize } from "./utils/format-file-size";

export interface FileUploadItemProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Overrides html-tag
   * @default "div"
   */
  as?: ("div" | "li") & React.ElementType;
  /**
   * Either a native File or file metadata.
   */
  file: FileItem;
  /**
   * onClick on the file name.
   *
   * If neither this nor `href` is set, and the `file` prop is a native file, onClick will download the file.
   */
  onFileClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
  /**
   * href on the file name.
   *
   * If neither this nor `onFileClick` is set, and the `file` prop is a native file, onClick will download the file.
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
   * Props for the action button.
   */
  button?: {
    action: "delete" | "retry";
    onClick: (event: MouseEvent<HTMLButtonElement>) => void;
    id?: string;
  };
  /**
   * i18n-API for customizing texts and labels
   */
  translations?: ComponentTranslation<"FileUpload">["item"];
}

export const Item: OverridableComponent<FileUploadItemProps, HTMLDivElement> =
  forwardRef(
    (
      {
        as: Component = "div",
        file,
        status = "idle",
        error,
        className,
        href,
        onFileClick,
        button,
        translations,
        ...rest
      }: FileUploadItemProps,
      ref,
    ) => {
      const context = useFileUploadTranslation(false);
      const translate = useI18n(
        "FileUpload",
        { item: translations },
        context?.translations,
      );

      const showError = !!error && status === "idle";

      function getStatusText() {
        if (status === "uploading") {
          return translate("item.uploading");
        }
        if (status === "downloading") {
          return translate("item.downloading");
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

            {status === "idle" && button && (
              <ItemButton
                {...button}
                title={translate(
                  button.action === "retry"
                    ? "item.retryButtonTitle"
                    : "item.deleteButtonTitle",
                )}
              />
            )}
          </div>
        </Component>
      );
    },
  );

export default Item;
