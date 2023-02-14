import cl from "clsx";
import React, { forwardRef } from "react";
import { ListItem, ListItemType } from "./ListItem";

interface ListProps<T extends keyof HTMLElementTagNameMap>
  extends React.HTMLAttributes<HTMLElementTagNameMap[T]> {
  children: React.ReactNode;
  as?: T;
}

interface ListComponent<T extends keyof HTMLElementTagNameMap>
  extends React.ForwardRefExoticComponent<
    ListProps<T> & React.RefAttributes<HTMLElementTagNameMap[T]>
  > {
  Item: ListItemType;
}

type HTMLElementTagNameMap = {
  ul: HTMLUListElement;
  ol: HTMLOListElement;
};

export const List = forwardRef<
  HTMLUListElement | HTMLOListElement,
  ListProps<"ul" | "ol">
>(({ children, className, as = "ul", ...rest }, ref) => {
  const Component = React.createElement(
    as,
    { ref, className: cl("navds-list", className), ...rest },
    children
  );
  return Component;
}) as ListComponent<"ul" | "ol">;

List.Item = ListItem;

export default List;
