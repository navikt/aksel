import cl from "clsx";
import React, { forwardRef, useContext } from "react";
import { BodyShort, Heading } from "../typography";
import { useId } from "../util/hooks";
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
    const ariaId = useId();

    const { size: contextSize } = useContext(ListContext);

    const listSize = size ?? contextSize;
    return (
      <ListContext.Provider
        value={{
          listType: ListTag,
          size: listSize,
        }}
      >
        <div
          {...rest}
          ref={ref}
          className={cl("navds-list", `navds-list--${listSize}`, className)}
        >
          {title && (
            <Heading
              id={`tittel-${ariaId}`}
              size={listSize === "medium" ? "small" : "xsmall"}
              as={headingTag}
            >
              {title}
            </Heading>
          )}
          {description && (
            <BodyShort size={listSize} id={`description-${ariaId}`}>
              {description}
            </BodyShort>
          )}
          <ListTag
            role="list"
            aria-labelledby={title && `tittel-${ariaId}`}
            aria-describedby={description && `description-${ariaId}`}
          >
            {children}
          </ListTag>
        </div>
      </ListContext.Provider>
    );
  },
) as ListComponent;

List.Item = ListItem;

export default List;
