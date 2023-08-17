import cl from "clsx";
import React, { createContext, forwardRef, useContext } from "react";
import { BodyShort, Heading } from "../typography";
import { useId } from "../util/useId";
import { ListItem, ListItemProps } from "./ListItem";

export interface ListProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  /**
   * HTML list element to render
   * @default "ul"
   */
  as?: "ul" | "ol";
  /**
   * List heading title
   */
  title?: string;
  /**
   * List heading description
   */
  description?: string;
  /**
   * Allows setting a different HTML h-tag
   * @default "h3"
   */
  headingTag?: React.ElementType<any>;
  /**
   * Changes padding, height and font-size
   * @default medium
   */
  size?: "medium" | "small";
}

export interface ListComponent
  extends React.ForwardRefExoticComponent<ListProps> {
  /**
   * @see 🏷️ {@link ListItemProps}
   */
  Item: React.ForwardRefExoticComponent<
    ListItemProps & React.RefAttributes<HTMLLIElement>
  >;
}

interface ListContextProps {
  listType: ListProps["as"];
  isNested: boolean | null;
  size: ListProps["size"];
}

export const ListContext = createContext<ListContextProps>({
  listType: "ul",
  isNested: null,
  size: "medium",
});

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
    ref
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
  }
) as ListComponent;

List.Item = ListItem;

export default List;
