import React, { useContext } from "react";
import { ItemContext } from "./item-context";
import { FileItem, FileWithClick, FileWithLink } from "./props";
import { Link } from "../../../link";

const ItemName = () => {
  const context = useContext(ItemContext)

  if (context == null) {
    console.error("<ItemName> has to be used within a <File>")
    return null
  }

  const { file } = context

  if (isFileWithLink(file)) {
    return <Link
      href={file.href}
      target="_blank"
    >
      {file.name}
    </Link>
  }

  if (isFileWithClick(file)) {
    return <Link
      as="button"
      type="button"
      className="navds-fileitem__file-info-download-button"
      onClick={() => {
        if (isFileWithClick(file)) {
          file.onClick(file)
        }
      }}
    >
      {file.name}
    </Link>
  }

  return <span>{file.name}</span>
}

const isFileWithLink = (file: FileItem): file is FileWithLink =>
  "href" in file

const isFileWithClick = (file: FileItem): file is FileWithClick =>
  "onClick" in file

export default ItemName
