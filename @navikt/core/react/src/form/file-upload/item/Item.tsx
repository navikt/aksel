import React, { forwardRef, useContext } from "react";
import cl from "clsx";
import ItemButton from "./ItemButton";
import ItemIcon from "./ItemIcon";
import { ItemContext } from "./item-context";
import { FileListContext } from "../list/file-list-context";
import { FileItem } from "./props";
import ItemDescription from "./ItemDescription";
import ItemName from "./ItemName";

export interface BaseFileItemProps {
  file: FileItem;
  error?: string;
  isLoading?: boolean;
  onDelete?: () => void;
  onRetry?: () => void;
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
      locale = "nb"
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
        locale: locale || context.locale,
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
