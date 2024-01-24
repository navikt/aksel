import React from "react";
import {
  FileCsvIcon,
  FileExcelIcon,
  FileIcon,
  FileImageIcon,
  FilePdfIcon,
  FileTextIcon,
  FileWordIcon,
  FileXMarkIcon,
} from "@navikt/aksel-icons";
import { Loader } from "../../../../loader";
import { FileItem } from "./types";

interface ItemIconProps {
  isLoading?: boolean;
  file: FileItem;
  error: boolean;
}

const iconProps = {
  fontSize: "2rem",
  "aria-hidden": true,
};

function ItemIcon({ isLoading, file, error }: ItemIconProps) {
  if (isLoading) {
    return (
      <div className="navds-file-item__icon navds-file-item__icon--loading">
        <Loader size="large" />
      </div>
    );
  } else if (error) {
    return (
      <div className="navds-file-item__icon navds-file-item__icon-avatar">
        <FileXMarkIcon {...iconProps} />
      </div>
    );
  }
  return (
    <div className="navds-file-item__icon navds-file-item__icon-avatar">
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
