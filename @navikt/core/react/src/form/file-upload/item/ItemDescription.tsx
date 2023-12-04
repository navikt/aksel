import React, { useContext } from "react";
import { ItemContext } from "./item-context";
import { ErrorMessage } from "../../../typography";
import { formatFileSize } from "./utils/format-file-size";

const ItemDescription = () => {
  const context = useContext(ItemContext)

  if (context == null) {
    console.error("<ItemDescription> has to be used within a <File>")
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

export default ItemDescription
