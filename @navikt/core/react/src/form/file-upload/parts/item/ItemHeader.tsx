import React from "react";
import { useRenameCSS } from "../../../../theme/Theme";
import { LinkAnchor } from "../../../../util/link-anchor";
import { FileItem } from "./Item.types";
import ItemIcon from "./ItemIcon";
import { downloadFile } from "./utils/download-file";
import { isNativeFile } from "./utils/file-type-checker";

interface Props {
  file: FileItem;
  href?: string;
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
}

const ItemHeader = ({ file, href, onClick }: Props) => {
  const { cn } = useRenameCSS();

  if (onClick && href) {
    return (
      <LinkAnchor
        href={href}
        onClick={onClick}
        className={cn("navds-file-item__link")}
      >
        <ItemIcon file={file} />
        {file.name}
      </LinkAnchor>
    );
  }

  if (onClick) {
    return (
      <LinkAnchor
        href="#"
        onClick={(event) => {
          event.preventDefault();
          onClick(event);
        }}
        className={cn("navds-file-item__link")}
      >
        <ItemIcon file={file} />
        {file.name}
      </LinkAnchor>
    );
  }

  if (href) {
    return (
      <LinkAnchor href={href} className={cn("navds-file-item__link")}>
        <ItemIcon file={file} />
        {file.name}
      </LinkAnchor>
    );
  }

  if (isNativeFile(file)) {
    return (
      <LinkAnchor
        href="#"
        download={file.name}
        onClick={(event) => {
          event.preventDefault();
          downloadFile(file);
        }}
        className={cn("navds-file-item__link")}
      >
        <ItemIcon file={file} />
        {file.name}
      </LinkAnchor>
    );
  }

  return (
    <span className={cn("navds-file-item__link")}>
      <ItemIcon file={file} />
      {file.name}
    </span>
  );
};

export { ItemHeader };
