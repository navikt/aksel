import React, { forwardRef, HTMLAttributes } from "react";
import InternalHeaderTitle, {
  InternalHeaderTitleType,
} from "./InternalHeaderTitle";
import InternalHeaderUser, {
  InternalHeaderUserType,
} from "./InternalHeaderUser";
import InternalHeaderButton, {
  InternalHeaderButtonType,
} from "./InternalHeaderButton";
import InternalHeaderUserButton, {
  InternalHeaderUserButtonType,
} from "./InternalHeaderUserButton";
import cl from "clsx";

export interface InternalHeaderProps extends HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
}

interface InternalHeaderComponent
  extends React.ForwardRefExoticComponent<
    InternalHeaderProps & React.RefAttributes<HTMLElement>
  > {
  Title: InternalHeaderTitleType;
  User: InternalHeaderUserType;
  Button: InternalHeaderButtonType;
  UserButton: InternalHeaderUserButtonType;
}

export const InternalHeader = forwardRef(({ className, ...rest }, ref) => (
  <header
    data-theme="dark"
    {...rest}
    ref={ref}
    className={cl("navdsi-header", className)}
  />
)) as InternalHeaderComponent;

InternalHeader.Title = InternalHeaderTitle;
InternalHeader.User = InternalHeaderUser;
InternalHeader.Button = InternalHeaderButton;
InternalHeader.UserButton = InternalHeaderUserButton;

export default InternalHeader;
