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
import { Loader } from "../../../../loader";
import { FileItem } from "./types";

interface ItemIconProps {
  isLoading?: boolean;
  file: FileItem;
}

function ItemIcon({ isLoading, file }: ItemIconProps) {
  return isLoading ? (
    <div className="navds-file-item__icon navds-file-item__icon--loading">
      <Loader size="large" />
    </div>
  ) : (
    <div className="navds-file-item__icon navds-file-item__icon-avatar">
      <Icon file={file} />
    </div>
  );
}

function Icon({ file }: { file: FileItem }) {
  const extension = file.name.substring(file.name.lastIndexOf(".") + 1);

  const iconProps = {
    fontSize: "2rem",
    "aria-hidden": true,
  };

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
