import cl from "clsx";
import React, { MouseEvent, forwardRef, useContext } from "react";
import { ErrorMessage } from "../../../typography";
import { FileListContext } from "../list/file-list-context";
import ItemButton from "./ItemButton";
import ItemIcon from "./ItemIcon";
import ItemName from "./ItemName";
import { FileItem } from "./types";
import { formatFileSize } from "./utils/format-file-size";
import { getLoadingText } from "./utils/i18n";

const DEFAULT_LOCALE = "nb";

export interface FileItemProps {
  /**
   * Either a native File or file metadata.
   */
  file: FileItem;
  /**
   * Callback called when the file named is clicked.
   */
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
  /**
   * Href to use on the <a> tag displaying the file name.
   */
  href?: string;
  /**
   * Error message relating to the item.
   */
  error?: string;
  /**
   * Indicates if the file is being uploaded.
   */
  isLoading?: boolean;
  /**
   * Callback called when the delete button is clicked.
   */
  onDelete?: (event: MouseEvent<HTMLButtonElement>) => void;
  /**
   * Callback called when the retry button is clicked.
   */
  onRetry?: (event: MouseEvent<HTMLButtonElement>) => void;
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
}

export const Item = forwardRef<HTMLDivElement, FileItemProps>(
  (
    {
      file,
      isLoading,
      onDelete,
      onRetry,
      error,
      className,
      href,
      onClick,
      locale,
    }: FileItemProps,
    ref
  ) => {
    const context = useContext(FileListContext);
    const finalLocale = locale || context?.locale || DEFAULT_LOCALE;

    return (
      <div
        ref={ref}
        className={cl("navds-file-item", className, {
          "navds-file-item--error": error,
        })}
      >
        <ItemIcon isLoading={isLoading} file={file} />
        <div className="navds-file-item__file-info">
          <ItemName file={file} href={href} onClick={onClick} />
          {!error && (
            <div>
              {isLoading ? getLoadingText(finalLocale) : formatFileSize(file)}
            </div>
          )}
          <div
            className="navds-file-item__error"
            aria-relevant="additions removals"
            aria-live="polite"
          >
            {!!error && <ErrorMessage>{error}</ErrorMessage>}
          </div>
        </div>
        <div className="navds-file-item__button">
          <ItemButton
            file={file}
            locale={finalLocale}
            onRetry={onRetry}
            onDelete={onDelete}
            isLoading={isLoading}
            error={error}
          />
        </div>
      </div>
    );
  }
);

export default Item;
