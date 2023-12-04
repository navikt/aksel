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
      href="#"
      onClick={(event) => {
        event.preventDefault();
        context?.onClick?.(file);
      }}
    >
      {file.name}
    </Link>
  }

  return <span>{file.name}</span>
}

export default ItemName
