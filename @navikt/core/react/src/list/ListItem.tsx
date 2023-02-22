import cl from "clsx";
import React, { forwardRef, useContext } from "react";
import { BodyShort, Label } from "../typography";
import { ListContext } from "./List";

export interface ListItemProps extends React.HTMLAttributes<HTMLLIElement> {
  /**
   * Content for description of the list item
   */
  children: React.ReactNode;
  /**
   * Title for the list item
   */
  title?: string;
  /*
   * Icon to be used as list marker
   */
  icon?: React.ReactNode;
}

export interface ListItemType
  extends React.ForwardRefExoticComponent<
    ListItemProps & React.RefAttributes<HTMLLIElement>
  > {}

export const ListItem: ListItemType = forwardRef(
  ({ className, children, title, icon, ...rest }, ref) => {
    const { listType } = useContext(ListContext);

    return (
      <li {...rest} ref={ref} className={cl("navds-list__item", className)}>
        {listType === "ul" && (
          <div className={`navds-list__item-marker${icon ? "--icon" : ""}`}>
            {icon ? icon : <ListMarker />}
          </div>
        )}

        <BodyShort as="div" size="small" className="navds-list__item__content">
          {title && (
            <Label as="p" size="small">
              {title}
            </Label>
          )}
          {children}
        </BodyShort>
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
      aria-hidden
      focusable={false}
      role="img"
    >
      <rect width="6" height="6" rx="3" fill="#262626" />
    </svg>
  );
};

export default ListItem;
