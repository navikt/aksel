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
  listType: "ul" | "ol";
  isNested: boolean | null;
}

export const ListContext = createContext<ListContextProps>({
  listType: "ul",
  isNested: null,
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
      ...rest
    },
    ref
  ) => {
    const ariaId = useId();

    const { isNested } = useContext(ListContext);

    return (
      <ListContext.Provider
        value={{
          listType: ListTag,
          isNested: isNested === null ? false : true,
        }}
      >
        <div
          {...rest}
          ref={ref}
          className={cl("navds-list", className, {
            "navds-list--nested": isNested === null ? false : true,
          })}
        >
          {title && (
            <Heading id={`tittel-${ariaId}`} size="small" as={headingTag}>
              {title}
            </Heading>
          )}
          {description && (
            <BodyShort id={`description-${ariaId}`}>{description}</BodyShort>
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
