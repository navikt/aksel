import React, { forwardRef, useContext } from "react";
import { BodyLong } from "../../typography";
import { cl } from "../../utils/helpers";
import type { ListItemProps, ListProps } from "../List.types";
import { ListItem } from "../item/ListItem";
import { ListContext } from "./ListRoot.context";

const ListRoot = forwardRef<HTMLDivElement, ListProps>(
  (
    {
      children,
      className,
      as: ListTag = "ul",
      size,
      "aria-label": _ariaLabel,
      "aria-labelledby": _ariaLabelledBy,
      ...rest
    },
    ref,
  ) => {
    const { size: contextSize } = useContext(ListContext);

    const listSize = size ?? contextSize;

    return (
      <ListContext.Provider
        value={{
          listType: ListTag,
          size: listSize,
        }}
      >
        <BodyLong
          as="div"
          {...rest}
          size={listSize}
          ref={ref}
          className={cl("aksel-list", `aksel-list--${listSize}`, className)}
        >
          <ListTag
            role="list"
            aria-label={_ariaLabel}
            aria-labelledby={_ariaLabelledBy}
          >
            {children}
          </ListTag>
        </BodyLong>
      </ListContext.Provider>
    );
  },
);

/**
 * A list component
 *
 * @see [📝 Documentation](https://aksel.nav.no/komponenter/core/list)
 * @see 🏷️ {@link ListProps | Props}
 *
 * @example
 * ```jsx
 * <List>
 *   <List.Item>Coffee</List.Item>
 *   <List.Item>Tea</List.Item>
 *   <List.Item>Milk</List.Item>
 * </List>
 * ```
 */
const List = Object.assign(ListRoot, {
  /**
   * @see 🏷️ {@link ListItemProps}
   */
  Item: ListItem,
});

export { List, ListItem };
export type { ListProps, ListItemProps };
