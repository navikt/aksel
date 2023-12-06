import React, { forwardRef, useContext } from "react";
import cl from "clsx";
import ItemButton from "./ItemButton";
import ItemIcon from "./ItemIcon";
import { ItemContext } from "./item-context";
import { FileListContext } from "../list/file-list-context";
import { FileItem } from "./props";
import ItemDescription from "./ItemDescription";
import ItemName from "./ItemName";

const DEFAULT_LOCALE = "nb"

export interface BaseFileItemProps {
  /**
   * The file to display.
   */
  file: FileItem;
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
  onDelete?: () => void;
  /**
   * Callback called when the retry button is clicked.
   */
  onRetry?: () => void;
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
  locale?: "nb" | "nn" | "en"
}

export interface FileMetadataWithHref extends BaseFileItemProps {
  href: string;
}

export interface FileMetadataWithOnClick extends BaseFileItemProps {
  onClick: () => void;
}

export type FileItemProps = BaseFileItemProps | FileMetadataWithHref | FileMetadataWithOnClick

export const Item = forwardRef<HTMLLIElement, FileItemProps>((
    props: FileItemProps,
    ref
) => {
    const {
      file,
      isLoading,
      onDelete,
      onRetry,
      error,
      className,
      locale
    } = props
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
        onDelete,
        onRetry,
        locale: locale || context.locale || DEFAULT_LOCALE,
        href: "href" in props ? props.href : undefined,
        onClick: "onClick" in props ? props.onClick : undefined
      }}>
        <li
          ref={ref}
          className={cl("navds-fileitem", className, {
            "navds-fileitem--error": !!error
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
    )
  })


export default Item;
