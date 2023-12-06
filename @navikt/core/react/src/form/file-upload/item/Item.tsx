import cl from "clsx";
import React, { MouseEvent, forwardRef, useContext } from "react";
import { FileListContext } from "../list/file-list-context";
import ItemButton from "./ItemButton";
import ItemDescription from "./ItemDescription";
import ItemIcon from "./ItemIcon";
import ItemName from "./ItemName";
import { ItemContext } from "./item-context";
import { FileItem } from "./types";

const DEFAULT_LOCALE = "nb";

export interface FileItemProps {
  file: FileItem;
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
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
   * Class name passed to the <li> element.
   */
  className?: string;
  /**
   * Sets a ref on the <li> element.
   */
  ref?: React.Ref<HTMLLIElement>;
  /**
   * Changes locale used for component text.
   * @default "nb" (norsk bokmål)
   */
  locale?: "nb" | "nn" | "en";
}

export const Item = forwardRef<HTMLLIElement, FileItemProps>(
  (props: FileItemProps, ref) => {
    const {
      file,
      isLoading,
      onDelete,
      onRetry,
      error,
      className,
      href,
      onClick,
      locale,
    } = props;
    const context = useContext(FileListContext);

    if (context == null) {
      console.error(
        "<FileUpload.Item> has to be used within a <FileUpload.List>"
      );
      return null;
    }

    return (
      <ItemContext.Provider
        value={{
          file,
          isLoading,
          error,
          onDelete,
          onRetry,
          href,
          onClick,
          locale: locale || context.locale || DEFAULT_LOCALE,
        }}
      >
        <li
          ref={ref}
          className={cl("navds-fileitem", className, {
            "navds-fileitem--error": !!error,
          })}
        >
          <ItemIcon />
          <div className="navds-fileitem__file-info">
            <ItemName />
            <ItemDescription />
          </div>
          <div className="navds-fileitem__button">
            <ItemButton />
          </div>
        </li>
      </ItemContext.Provider>
    );
  }
);

export default Item;
