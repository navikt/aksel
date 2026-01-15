import React from "react";
import {
  FileCsvIcon,
  FileExcelIcon,
  FileIcon,
  FileImageIcon,
  FilePdfIcon,
  FileTextIcon,
  FileWordIcon,
} from "@navikt/aksel-icons";
import { useRenameCSS } from "../../../../theme/Theme";
import { FileItem } from "./Item.types";

interface ItemIconProps {
  file: FileItem;
}

const iconProps = {
  fontSize: "2rem",
  "aria-hidden": true,
};

function ItemIcon({ file }: ItemIconProps) {
  const { cn } = useRenameCSS();
  return (
    <div className={cn("navds-file-item__icon")}>
      <Icon file={file} />
    </div>
  );
}

function Icon({ file }: { file: FileItem }) {
  const extension = file.name.substring(file.name.lastIndexOf(".") + 1);

  switch (extension) {
    case "jpg":
    case "jpeg":
    case "png":
    case "gif":
    case "webp":
      return <FileImageIcon {...iconProps} />;
    case "pdf":
      return <FilePdfIcon {...iconProps} />;
    case "txt":
      return <FileTextIcon {...iconProps} />;
    case "csv":
      return <FileCsvIcon {...iconProps} />;
    case "xls":
    case "xlsx":
      return <FileExcelIcon {...iconProps} />;
    case "doc":
    case "docx":
      return <FileWordIcon {...iconProps} />;
    default:
      return <FileIcon {...iconProps} />;
  }
}

export default ItemIcon;
