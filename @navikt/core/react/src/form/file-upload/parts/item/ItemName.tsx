import React from "react";
import { Link } from "../../../../link";
import { FileItem } from "./Item.types";
import { downloadFile } from "./utils/download-file";
import { isNativeFile } from "./utils/file-type-checker";

interface Props {
  file: FileItem;
  href?: string;
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
}

const ItemName = ({ file, href, onClick }: Props) => {
  if (onClick && href) {
    return (
      <Link href={href} onClick={onClick}>
        {file.name}
      </Link>
    );
  }

  if (onClick) {
    return (
      <Link
        href="#"
        onClick={(event) => {
          event.preventDefault();
          onClick(event);
        }}
      >
        {file.name}
      </Link>
    );
  }

  if (href) {
    return <Link href={href}>{file.name}</Link>;
  }

  if (isNativeFile(file)) {
    return (
      <Link
        href="#"
        download={file.name}
        onClick={(event) => {
          event.preventDefault();
          downloadFile(file);
        }}
      >
        {file.name}
      </Link>
    );
  }

  return <span>{file.name}</span>;
};

export default ItemName;
