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
  title?: string;
  /**
   * Allows setting a different HTML h-tag
   * @default "h4"
   */
  headingTag?: React.ElementType<any>;
  icon?: React.ReactNode;
}

export interface ListItemType
  extends React.ForwardRefExoticComponent<
    ListItemProps & React.RefAttributes<HTMLLIElement>
  > {}

export const ListItem: ListItemType = forwardRef(
  ({ className, children, title, headingTag = "h4", icon, ...rest }, ref) => {
    return (
      <li {...rest} ref={ref} className={cl("navds-list__item", className)}>
        <div className={`navds-list__item__icon${!icon && "--default"}`}>
          {icon ? icon : <ListMarker />}
        </div>

        <div className="navds-list__item__content">
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
        </div>
      </li>
    );
  }
);

const ListMarker = () => {
  return (
    <svg
      width="6"
      height="6"
      viewBox="0 0 6 6"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="6" height="6" rx="3" fill="#262626" />
    </svg>
  );
};

export default ListItem;
