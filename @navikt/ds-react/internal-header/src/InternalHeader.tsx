import React, { forwardRef, HTMLAttributes } from "react";
import cl from "classnames";
import "@navikt/ds-css/internal-header/index.css";
import "@navikt/ds-css/typography/index.css";
import InternalHeaderTitle, {
  InternalHeaderTitleProps,
} from "./InternalHeaderTitle";
import InternalHeaderUser, {
  InternalHeaderUserProps,
} from "./InternalHeaderUser";

interface InternalHeaderComponent
  extends React.ForwardRefExoticComponent<
    InternalHeaderProps & HTMLAttributes<HTMLElement>
  > {
  Title: React.ForwardRefExoticComponent<
    InternalHeaderTitleProps & HTMLAttributes<HTMLElement>
  >;
  User: React.ForwardRefExoticComponent<
    InternalHeaderUserProps & HTMLAttributes<HTMLDivElement>
  >;
}

export interface InternalHeaderProps extends HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
}

const InternalHeader = forwardRef<HTMLElement, InternalHeaderProps>(
  ({ children, className, ...rest }, ref) => (
    <header ref={ref} className={cl("navds-header", className)} {...rest}>
      {children}
    </header>
  )
) as InternalHeaderComponent;

InternalHeader.Title = InternalHeaderTitle;
InternalHeader.User = InternalHeaderUser;

export default InternalHeader;
