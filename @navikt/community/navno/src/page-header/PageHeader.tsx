import cl from "clsx";
import React, { forwardRef } from "react";
import "./page-header.css";

export interface PageHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const PageHeader = forwardRef<HTMLDivElement, PageHeaderProps>(
  ({ children, className, ...rest }, ref) => (
    <div {...rest} ref={ref} className={cl(className, "navno-page-header")}>
      {children}
    </div>
  )
);

export default PageHeader;
