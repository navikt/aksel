import cl from "clsx";
import React, { forwardRef } from "react";
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

export const List = forwardRef<HTMLDivElement, ListProps>(
  (
    {
      children,
      className,
      as = "ul",
      title,
      description,
      headingTag = "h3",
      ...rest
    },
    ref
  ) => {
    const headingId = useId();
    const descriptionId = useId();
    const ListTag = as;
    return (
      <div {...rest} ref={ref} className={cl("navds-list", className)}>
        {title && (
          <Heading id={`tittel-${headingId}`} size="small" as={headingTag}>
            {title}
          </Heading>
        )}
        {description && (
          <BodyShort id={`description-${descriptionId}`}>
            {description}
          </BodyShort>
        )}
        <ListTag
          aria-labelledby={title && `tittel-${headingId}`}
          aria-describedby={description && `description-${descriptionId}`}
        >
          {children}
        </ListTag>
      </div>
    );
  }
) as unknown as ListComponent;

List.Item = ListItem;

export default List;
