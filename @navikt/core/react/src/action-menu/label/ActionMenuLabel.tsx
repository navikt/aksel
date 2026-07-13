import React, { forwardRef } from "react";
import { cl } from "../../utils/helpers";

interface ActionMenuLabelProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const ActionMenuLabel = forwardRef<HTMLDivElement, ActionMenuLabelProps>(
  ({ children, className, ...rest }: ActionMenuLabelProps, ref) => {
    return (
      <div
        ref={ref}
        {...rest}
        className={cl("aksel-action-menu__label", className)}
      >
        {children}
      </div>
    );
  },
);

export { ActionMenuLabel };
export type { ActionMenuLabelProps };
