import React from "react";
import { useThemeInternal } from "../../../theme/Theme";
import { LinkAnchor } from "../../../utils/components/link-anchor";
import { downloadFile } from "../helpers/download-file";
import { isNativeFile } from "../helpers/file-type-checker";
import ItemIcon from "../item-icon/ItemIcon";
import { FileItem } from "../item-root/FileUploadItemRoot.types";

interface Props {
  file: FileItem;
  href?: string;
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
}

const ItemHeader = ({ file, href, onClick }: Props) => {
  const ctx = useThemeInternal();

  if (onClick && href) {
    return (
      <LinkAnchor
        href={href}
        onClick={onClick}
        className="aksel-file-item__link"
        data-color={ctx.color}
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
        className="aksel-file-item__link"
        data-color={ctx.color}
      >
        <ItemIcon file={file} />
        {file.name}
      </LinkAnchor>
    );
  }

  if (href) {
    return (
      <LinkAnchor
        href={href}
        className="aksel-file-item__link"
        data-color={ctx.color}
      >
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
        className="aksel-file-item__link"
        data-color={ctx.color}
      >
        <ItemIcon file={file} />
        {file.name}
      </LinkAnchor>
    );
  }

  return (
    <span className="aksel-file-item__link">
      <ItemIcon file={file} />
      {file.name}
    </span>
  );
};

export { ItemHeader };
