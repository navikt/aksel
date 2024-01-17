import cl from "clsx";
import React, { forwardRef, useContext } from "react";
import { BodyShort, Heading } from "../typography";
import { useId } from "../util/hooks";
import { ListItem } from "./ListItem";
import { ListContext } from "./context";
import { ListProps } from "./types";

export interface ListComponent
  extends React.ForwardRefExoticComponent<
    ListProps & React.RefAttributes<HTMLDivElement>
  > {
  /**
   * @see 🏷️ {@link ListItemProps}
   */
  Item: typeof ListItem;
}

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

    const { isNested, size: _size } = useContext(ListContext);

    const listSize = size ?? _size ?? "medium";
    return (
      <ListContext.Provider
        value={{
          listType: ListTag,
          isNested: isNested === null ? false : true,
          size: listSize,
        }}
      >
        <div
          {...rest}
          ref={ref}
          className={cl("navds-list", `navds-list--${listSize}`, className, {
            "navds-list--nested": isNested === null ? false : true,
          })}
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
