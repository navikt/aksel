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
import { useRenameCSS } from "../../../../theme/Theme";
import { FileItem } from "./Item.types";

interface ItemIconProps {
  isLoading?: boolean;
  file: FileItem;
  showError: boolean;
}

const iconProps = {
  fontSize: "2rem",
  "aria-hidden": true,
};

function ItemIcon({ isLoading, file, showError }: ItemIconProps) {
  const { cn } = useRenameCSS();
  if (isLoading) {
    return (
      <div
        className={cn("navds-file-item__icon navds-file-item__icon--loading")}
      >
        <Loader size="large" />
      </div>
    );
  }

  if (showError) {
    return (
      <div className={cn("navds-file-item__icon")}>
        <FileXMarkIcon {...iconProps} />
      </div>
    );
  }
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
