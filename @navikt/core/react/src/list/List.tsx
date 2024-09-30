import cl from "clsx";
import React, { forwardRef, useContext } from "react";
import { BodyLong, BodyShort, Heading } from "../typography";
import { ListItem } from "./ListItem";
import { ListContext } from "./context";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { ListItemProps, ListProps } from "./types";

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
      title,
      description,
      headingTag = "h3",
      size,
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
          size={size}
          ref={ref}
          className={cl("navds-list", `navds-list--${listSize}`, className)}
        >
          {title && (
            <Heading
              size={listSize === "medium" ? "small" : "xsmall"}
              as={headingTag}
            >
              {title}
            </Heading>
          )}
          {description && <BodyShort size={listSize}>{description}</BodyShort>}
          <ListTag role="list">{children}</ListTag>
        </BodyLong>
      </ListContext.Provider>
    );
  },
) as ListComponent;

List.Item = ListItem;

export default List;
