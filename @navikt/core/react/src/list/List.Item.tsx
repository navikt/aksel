import React, { forwardRef, useContext } from "react";
import { useRenameCSS } from "../theme/Theme";
import { BodyLong } from "../typography";
import { ListContext } from "./List.context";
import type { ListItemProps } from "./List.types";

/**
 * @see 🏷️ {@link ListItemProps}
 */
export const ListItem = forwardRef<HTMLLIElement, ListItemProps>(
  ({ className, children, title, icon, ...rest }, ref) => {
    const { listType, size } = useContext(ListContext);
    const { cn } = useRenameCSS();

    if (listType === "ol" && icon) {
      console.warn(
        "<List />: Icon prop is not supported for ordered lists. Please remove the icon prop.",
      );
    }

    return (
      <li {...rest} ref={ref} className={cn("navds-list__item", className)}>
        {listType === "ul" && (
          <div
            className={cn("navds-list__item-marker", {
              "navds-list__item-marker--icon": icon,
              "navds-list__item-marker--bullet": !icon,
            })}
          >
            {icon ? (
              icon
            ) : (
              <svg
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

        <div>
          {title && (
            <BodyLong as="p" size={size} weight="semibold">
              {title}
            </BodyLong>
          )}
          {children}
        </div>
      </li>
    );
  },
);

ListItem.displayName = "List.Item";
export default ListItem;
