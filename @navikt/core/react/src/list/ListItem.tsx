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
   * Icon to be used as list marker for unordered lists.
   */
  icon?: React.ReactNode;
}

export const ListItem = forwardRef<HTMLLIElement, ListItemProps>(
  ({ className, children, title, icon, ...rest }, ref) => {
    const { listType, size } = useContext(ListContext);

    if (listType === "ol" && icon) {
      console.warn(
        "<List />: Icon prop is not supported for ordered lists. Please remove the icon prop."
      );
    }

    return (
      <li {...rest} ref={ref} className={cl("navds-list__item", className)}>
        {listType === "ul" && (
          <div
            className={cl({
              "navds-list__item-marker--icon": icon,
              "navds-list__item-marker--bullet": !icon,
            })}
          >
            {icon ? (
              icon
            ) : (
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
                <rect width="6" height="6" rx="3" fill="currentColor" />
              </svg>
            )}
          </div>
        )}

        <BodyShort as="div" size={size} className="navds-list__item-content">
          {title && (
            <Label as="p" size={size}>
              {title}
            </Label>
          )}
          {children}
        </BodyShort>
      </li>
    );
  }
);

export default ListItem;
