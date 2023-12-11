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
import { Loader } from "../../../loader";
import { FileItem } from "./types";

interface ItemIconProps {
  isLoading?: boolean;
  file: FileItem;
}

const ItemIcon = ({ isLoading, file }: ItemIconProps) => {
  if (isLoading) {
    return (
      <div>
        <Loader size="large" />
      </div>
    );
  }

  return (
    <div className="navds-file-item__icon">
      <Icon file={file} />
    </div>
  );
};

const Icon = ({ file }: { file: FileItem }) => {
  const extension = file.name.substring(file.name.lastIndexOf(".") + 1);

  const iconProps = {
    fontSize: "1.5rem",
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
};

export default ItemIcon;
