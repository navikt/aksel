import React, { MouseEvent, forwardRef } from "react";
import { BodyLong, BodyShort, ErrorMessage } from "../../../../typography";
import type { OverridableComponent } from "../../../../utils-external";
import { cl } from "../../../../utils/helpers";
import { useI18n } from "../../../../utils/i18n/i18n.hooks";
import type { ComponentTranslation } from "../../../../utils/i18n/i18n.types";
import { useFileUploadTranslation } from "../../FileUpload.context";
import { FileItem } from "./Item.types";
import { ItemActionField } from "./ItemActionField";
import { ItemHeader } from "./ItemHeader";
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
   * File description. Replaces file size when status is "idle".
   * This is useful for displaying upload date. Should not act as a replacement for error messages.
   */
  description?: string;
  /**
   * Props for the action button.
   */
  button?:
    | {
        action: "delete" | "retry";
        onClick: (event: MouseEvent<HTMLButtonElement>) => void;
        id?: string;
      }
    | React.ReactNode;
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
        description,
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
        return description ?? formatFileSize(file);
      }

      return (
        <Component
          ref={ref}
          {...rest}
          className={cl("aksel-file-item", className, {
            "aksel-file-item--error": showError,
          })}
        >
          <div className="aksel-file-item__inner">
            <BodyLong as="div" className="aksel-file-item__file-info">
              <ItemHeader file={file} href={href} onClick={onFileClick} />
              <BodyShort as="div" size="small">
                {getStatusText()}
              </BodyShort>
              <div
                className="aksel-file-item__error"
                aria-relevant="additions removals"
                aria-live="polite"
              >
                {showError && (
                  <ErrorMessage size="small" showIcon>
                    {error}
                  </ErrorMessage>
                )}
              </div>
            </BodyLong>
            <ItemActionField
              isLoading={status !== "idle"}
              button={button}
              translate={translate}
            />
          </div>
        </Component>
      );
    },
  );

export default Item;
