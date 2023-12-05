import React, { useContext } from "react";
import { ItemContext } from "./item-context";
import { Link } from "../../../link";
import { isNativeFile } from "./utils/is-native-file";
import { downloadFile } from "./utils/download-native-file";

const ItemName = () => {
  const context = useContext(ItemContext)

  if (context == null) {
    console.error("<ItemName> has to be used within a <File>")
    return null
  }

  const { file } = context

  if (context.href) {
    return <Link href={context.href}>
      {file.name}
    </Link>
  }

  if (context.onClick) {
    return <Link
      href="#"
      onClick={(event) => {
        event.preventDefault();
        context?.onClick?.();
      }}
    >
      {file.name}
    </Link>
  }

  if (isNativeFile(file)) {
    return <Link
      href="#"
      onClick={async (event) => {
        event.preventDefault();
        await downloadFile(file);
        /**
         * TODO vise en indikator på nedlasting? Kan dette potensielt ta tid ved større filer,
         * eller går det insta siden fila ligger lokalt?
         */
      }}
    >
      {file.name}
    </Link>  }

  return <span>{file.name}</span>
}

export default ItemName
