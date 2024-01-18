import cl from "clsx";
import React, { forwardRef } from "react";
import Item, { FileItemBaseProps } from "../item/Item";

export interface FileListItemProps
  extends FileItemBaseProps,
    React.HTMLAttributes<HTMLDivElement> {}

export const ListItem = forwardRef<HTMLLIElement, FileListItemProps>(
  ({ className, ...rest }: FileListItemProps, ref) => {
    return (
      <li ref={ref} className={cl("navds-file-list-item", className)}>
        <Item {...rest} />
      </li>
    );
  },
);

export default ListItem;
