import React, { forwardRef, useContext } from "react";
import { useRenameCSS } from "../theme/Theme";
import { BodyLong } from "../typography";
import { ListItem } from "./List.Item";
import { ListContext } from "./List.context";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { ListItemProps, ListProps } from "./List.types";

export interface ListComponent
  extends React.ForwardRefExoticComponent<
    ListProps & React.RefAttributes<HTMLDivElement>
  > {
  /**
   * @see 🏷️ {@link ListItemProps}
   */
  Item: typeof ListItem;
}

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
export const List = forwardRef<HTMLDivElement, ListProps>(
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

    const { cn } = useRenameCSS();

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
          className={cn("navds-list", `navds-list--${listSize}`, className)}
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
) as ListComponent;

List.Item = ListItem;

export default List;
