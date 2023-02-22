import cl from "clsx";
import React, { createContext, forwardRef } from "react";
import { BodyShort, Heading } from "../typography";
import { useId } from "../util/useId";
import { ListItem, ListItemType } from "./ListItem";

interface ListProps extends React.HTMLAttributes<HTMLDivElement> {
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

interface ListComponent extends React.ForwardRefExoticComponent<ListProps> {
  Item: ListItemType;
}

interface ListContextProps {
  listType: "ul" | "ol";
}

export const ListContext = createContext<ListContextProps>({
  listType: "ul",
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

    return (
      <ListContext.Provider
        value={{
          listType: ListTag,
        }}
      >
        <div {...rest} ref={ref} className={cl("navds-list", className)}>
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
