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

const ICON_CLASS_NAME = "navds-fileitem__icon"

const ItemIcon = () => {
  const context = useContext(ItemContext)

  if (context == null) {
    console.error("<ItemIcon> has to be used within a <Item>")
    return null
  }

  const { file, isLoading } = context

  if (isLoading) {
    return <div><Loader size="large" /></div>
  }

  const extension = file.name.substring(file.name.lastIndexOf(".") + 1)

  const iconProps = {
    fontSize: "1.5rem",
    focusable: false,
    ariaHidden: true
  }

  switch (extension) {
    case "jpg":
    case "jpeg":
    case "png":
    case "gif":
    case "webp":
      return (<div className={ICON_CLASS_NAME}>
        <FileImageIcon fontSize={iconProps.fontSize} focusable={iconProps.focusable} aria-hidden={iconProps.ariaHidden} />
      </div>)
    case "pdf":
      return (<div className={ICON_CLASS_NAME}>
        <FilePdfIcon fontSize={iconProps.fontSize} focusable={iconProps.focusable} aria-hidden={iconProps.ariaHidden} />
      </div>)
    case "txt":
      return (<div className={ICON_CLASS_NAME}>
        <FileTextIcon fontSize={iconProps.fontSize} focusable={iconProps.focusable} aria-hidden={iconProps.ariaHidden} />
      </div>)
    case "csv":
      return (<div className={ICON_CLASS_NAME}>
        <FileCsvIcon fontSize={iconProps.fontSize} focusable={iconProps.focusable} aria-hidden={iconProps.ariaHidden} />
      </div>)
    case "xls":
    case "xlsx":
      return (<div className={ICON_CLASS_NAME}>
        <FileExcelIcon fontSize={iconProps.fontSize} focusable={iconProps.focusable} aria-hidden={iconProps.ariaHidden} />
      </div>)
    case "doc":
    case "docx":
      return (<div className={ICON_CLASS_NAME}>
        <FileWordIcon fontSize={iconProps.fontSize} focusable={iconProps.focusable} aria-hidden={iconProps.ariaHidden} />
      </div>)
    default:
      return (<div className={ICON_CLASS_NAME}>
        <FileIcon fontSize={iconProps.fontSize} focusable={iconProps.focusable} aria-hidden={iconProps.ariaHidden} />
      </div>)
  }
}

export default ItemIcon