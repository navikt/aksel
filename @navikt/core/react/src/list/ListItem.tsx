import cl from "clsx";
import React, { forwardRef } from "react";
import { BodyShort } from "../typography";

export interface ListItemProps extends React.HTMLAttributes<HTMLLIElement> {
  /**
   * Content for description of the list item
   */
  children: React.ReactNode;
  /**
   * Title for the list item
   */
  title: string;
  /**
   * Allows setting a different HTML h-tag
   * @default "h4"
   */
  headingTag?: React.ElementType<any>;
}

export interface ListItemType
  extends React.ForwardRefExoticComponent<
    ListItemProps & React.RefAttributes<HTMLLIElement>
  > {}

export const ListItem: ListItemType = forwardRef(
  ({ className, children, title, headingTag = "h4", ...rest }, ref) => {
    return (
      <li {...rest} ref={ref} className={cl("navds-list__item", className)}>
        {title && (
          <BodyShort
            as={headingTag}
            size="small"
            className="navds-list__item__title"
          >
            {title}
          </BodyShort>
        )}
        {children}
      </li>
    );
  }
);

export default ListItem;
