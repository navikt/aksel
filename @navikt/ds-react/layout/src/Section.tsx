import React, { forwardRef, HTMLAttributes } from "react";
import { Cell } from "../../grid/src";
import cl from "classnames";

export interface SectionProps extends HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
  left?: boolean;
  right?: boolean;
}

const Section = forwardRef<HTMLDivElement, SectionProps>(
  ({ children, left, right, className, ...rest }, ref) => {
    return (
      <>
        {left && (
          <Cell sm={4} md={8} lg={12} xl={3} {...rest}>
            {children}
          </Cell>
        )}
        {!left && !right && (
          <Cell
            sm={4}
            md={8}
            lg={8}
            xl={6}
            className={cl("navds-layout-main-content")}
            {...rest}
          >
            {children}
          </Cell>
        )}
        {right && (
          <Cell sm={4} md={8} lg={4} xl={3} {...rest}>
            {children}
          </Cell>
        )}
      </>
    );
  }
);

export default Section;
