import React, { forwardRef } from "react";
import cl from "classnames";
import InternalHeaderTitle, {
  InternalHeaderTitleType,
} from "./InternalHeaderTitle";
import InternalHeaderUser, {
  InternalHeaderUserType,
} from "./InternalHeaderUser";

export interface InternalHeaderProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Component content
   */
  children?: React.ReactNode;
}

interface InternalHeaderComponent
  extends React.ForwardRefExoticComponent<
    InternalHeaderProps & React.RefAttributes<HTMLElement>
  > {
  Title: InternalHeaderTitleType;
  User: InternalHeaderUserType;
}

const InternalHeader = forwardRef<HTMLElement, InternalHeaderProps>(
  ({ children, className, ...rest }, ref) => (
    <header
      ref={ref}
      className={cl("navds-interal-header", className)}
      {...rest}
    >
      {children}
    </header>
  )
) as InternalHeaderComponent;

InternalHeader.Title = InternalHeaderTitle;
InternalHeader.User = InternalHeaderUser;

export default InternalHeader;
