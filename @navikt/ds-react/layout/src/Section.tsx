import React, { forwardRef, HTMLAttributes } from "react";
import { Cell } from "../../grid/src";
import cl from "classnames";

export interface SectionProps extends HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
  secondary?: boolean;
}

const Section = forwardRef<HTMLDivElement, SectionProps>(
  ({ children, secondary, className, ...rest }, ref) => {
    return (
      <>
        {secondary ? (
          <Cell {...rest} sm={4} md={8} lg={12} xl={3}>
            {children}
          </Cell>
        ) : (
          <Cell
            className={cl("navds-layout-main-content")}
            sm={4}
            md={8}
            lg={8}
            xl={6}
          >
            {children}
          </Cell>
        )}
      </>
    );
  }
);

export default Section;
