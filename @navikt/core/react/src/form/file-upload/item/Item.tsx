import React, { forwardRef, useContext } from "react";
import cl from "clsx";
import { ErrorMessage } from "../../../typography";
import ItemButton from "./ItemButton";
import ItemIcon from "./ItemIcon";
import { ItemContext } from "./item-context";
import { formatFileSize } from "./utils/format-file-size";
import { FileListContext } from "../list/file-list-context";
import { FileItem } from "./props";

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
            <span>{file.name}</span>
            <Description />
          </div>
          <div className="navds-fileitem__button">
            <ItemButton />
          </div>
        </li>
      </ItemContext.Provider>
    )
  }
);

const Description = () => {
  const context = useContext(ItemContext)

  if (context == null) {
    console.error("<Description> has to be used within a <File>")
    return null
  }

  const { isLoading, error, file, locale } = context

  if (isLoading) {
    switch(locale) {
      case "nb":
      case "nn":
        return "Laster opp"
      case "en":
        return "Uploading"
    }
  }

  if (error) {
    return (
      <div
        className="navds-fileitem__error"
        aria-relevant="additions removals"
        aria-live="polite"
      >
        {!!error && <ErrorMessage>{error}</ErrorMessage>}
      </div>
    )
  }

  return <span>{formatFileSize(file)}</span>
}

export default Item;
