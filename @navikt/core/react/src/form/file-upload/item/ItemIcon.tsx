import React, { useContext } from "react";
import {
  FileIcon,
  FileCsvIcon,
  FileExcelIcon,
  FileImageIcon,
  FilePdfIcon,
  FileTextIcon,
  FileWordIcon
} from "@navikt/aksel-icons";
import { ItemContext } from "./item-context";
import { Loader } from "../../../loader";

const ItemIcon = () => {
  const context = useContext(ItemContext)

  if (context == null) {
    console.error("<ItemIcon> has to be used within a <Item>")
    return null
  }

  const { isLoading } = context

  if (isLoading) {
    return <div><Loader size="large" /></div>
  }

  return (
    <div className="navds-fileitem__icon">
      <Icon />
    </div>
  )
}

const Icon = () => {
  const context = useContext(ItemContext)

  if (context == null) {
    console.error("<ItemIcon> has to be used within a <Item>")
    return null
  }

  const { file } = context

  const extension = file.name.substring(file.name.lastIndexOf(".") + 1)

  const iconProps = {
    fontSize: "1.5rem",
    ariaHidden: true
  }

  switch (extension) {
    case "jpg":
    case "jpeg":
    case "png":
    case "gif":
    case "webp":
      return <FileImageIcon {...iconProps} />
    case "pdf":
      return <FilePdfIcon {...iconProps} />
    case "txt":
      return <FileTextIcon {...iconProps} />
    case "csv":
      return <FileCsvIcon {...iconProps} />
    case "xls":
    case "xlsx":
      return <FileExcelIcon {...iconProps} />
    case "doc":
    case "docx":
      return <FileWordIcon {...iconProps} />
    default:
      return <FileIcon {...iconProps} />
  }
}

export default ItemIcon