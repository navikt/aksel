import React, { forwardRef, useContext } from "react";
import cl from "clsx";
import { ErrorMessage } from "../../../typography";
import ItemButton from "./ItemButton";
import ItemIcon from "./ItemIcon";
import { ItemContext } from "./item-context";
import { formatFileSize } from "./utils/format-file-size";
import { FileListContext } from "../list/file-list-context";
import { FileItem } from "./props";
import ItemDescription from "./ItemDescription";
import ItemName from "./ItemName";

export interface FileProps {
  file: FileItem;
  error?: string;
  isLoading?: boolean;
  onDelete?: (file: FileItem) => void;
  onRetry?: (file: FileItem) => void;
  /**
   * Class name passed to the outermost <div> element.
   */
  className?: string;
  /**
   * Sets a ref on the outermost div.
   */
  ref?: React.Ref<HTMLLIElement>;
  /**
   * Changes locale used for component text.
   * @default "nb" (norsk bokmål)
   */
  locale?: "nb" | "nn" | "en"
}

export const Item = forwardRef<HTMLLIElement, FileProps>(
  (
    {
      file,
      isLoading,
      onDelete,
      onRetry,
      error,
      className,
      locale = "nb"
    },
    ref
  ) => {
    const context = useContext(FileListContext)

    if (context == null) {
      console.error("<FileUpload.Item> has to be used within a <FileUpload.List>")
      return null
    }

    return (
      <ItemContext.Provider value={{
        file,
        isLoading,
        error,
        onDelete: onDelete || context.onDelete,
        onRetry: onRetry || context.onRetry,
        locale: locale || context.locale
      }}>
        <li
          className={cl("navds-fileitem", className, {
            "navds-fileitem--error": !!error
          })}
          ref={ref}
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
    )
  }
);

export default Item;
