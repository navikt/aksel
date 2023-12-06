import React, { useContext } from "react";
import { Link } from "../../../link";
import { ItemContext } from "./item-context";
import { downloadFile } from "./utils/download-native-file";
import { isNativeFile } from "./utils/is-native-file";

const ItemName = () => {
  const context = useContext(ItemContext);

  if (context == null) {
    console.error("<ItemName> has to be used within a <File>");
    return null;
  }

  const { file } = context;

  if (context.onClick && context.href) {
    return (
      <Link
        href={context.href}
        onClick={(event) => {
          context.onClick?.(event);
        }}
      >
        {file.name}
      </Link>
    );
  }

  if (context.onClick) {
    return (
      <Link
        href="#"
        onClick={(event) => {
          event.preventDefault();
          context.onClick?.(event);
        }}
      >
        {file.name}
      </Link>
    );
  }

  if (context.href) {
    return <Link href={context.href}>{file.name}</Link>;
  }

  if (isNativeFile(file)) {
    return (
      <Link
        href="#"
        onClick={async (event) => {
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
