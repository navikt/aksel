import { TabsList } from "@radix-ui/react-tabs";
import cl from "classnames";
import React, { forwardRef } from "react";

export interface ListProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Tab elements
   */
  children: React.ReactNode;
  /**
   * Loops back to start when navigating past last item
   */
  loop?: boolean;
}

export type ListType = React.ForwardRefExoticComponent<
  ListProps & React.RefAttributes<HTMLDivElement>
>;

const List = forwardRef<HTMLDivElement, ListProps>(
  ({ className, ...rest }, ref) => (
    <TabsList
      {...rest}
      ref={ref}
      className={cl("navds-tabs__tablist", className)}
    />
  )
) as ListType;

export default List;
