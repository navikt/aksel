import cl from "clsx";
import React, { forwardRef } from "react";

export interface ListProps extends React.HTMLAttributes<HTMLUListElement> {
  /**
   * Panel content
   */
  children: React.ReactNode;
}

interface ListComponent
  extends React.ForwardRefExoticComponent<
    ListProps & React.RefAttributes<HTMLUListElement>
  > {}

export const List: ListComponent = forwardRef(
  ({ children, className, ...rest }, ref) => {
    return (
      <ul ref={ref} className={cl("navds-list", className)} {...rest}>
        {children}
      </ul>
    );
  }
) as ListComponent;

export default List;
