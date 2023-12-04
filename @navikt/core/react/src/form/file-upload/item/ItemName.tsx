import React, { useContext } from "react";
import { ItemContext } from "./item-context";
import { Link } from "../../../link";

const ItemName = () => {
  const context = useContext(ItemContext)

  if (context == null) {
    console.error("<ItemName> has to be used within a <File>")
    return null
  }

  const { file } = context

  if (context.href) {
    return <Link
      href={context.href}
      target="_blank"
    >
      {file.name}
    </Link>
  }

  if (context.onClick) {
    return <Link
      as="button"
      type="button"
      className="navds-fileitem__file-info-download-button"
      onClick={() => {
        if (context?.onClick) {
          context.onClick(file)
        }
      }}
    >
      {file.name}
    </Link>
  }

  return <span>{file.name}</span>
}

export default ItemName
