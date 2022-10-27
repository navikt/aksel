import React, { forwardRef, HTMLAttributes } from "react";
import HeaderTitle, { HeaderTitleType } from "./HeaderTitle";
import HeaderUser, { HeaderUserType } from "./HeaderUser";
import HeaderButton, { HeaderButtonType } from "./HeaderButton";
import HeaderUserButton, { HeaderUserButtonType } from "./HeaderUserButton";
import cl from "clsx";

export interface HeaderProps extends HTMLAttributes<HTMLElement> {
  /**
   * Header content
   */
  children: React.ReactNode;
}

interface HeaderComponent
  extends React.ForwardRefExoticComponent<
    HeaderProps & React.RefAttributes<HTMLElement>
  > {
  Title: HeaderTitleType;
  User: HeaderUserType;
  Button: HeaderButtonType;
  UserButton: HeaderUserButtonType;
}

export const Header = forwardRef(({ className, ...rest }, ref) => (
  <header
    data-theme="dark"
    {...rest}
    ref={ref}
    className={cl("navdsi-header", className)}
  />
)) as HeaderComponent;

Header.Title = HeaderTitle;
Header.User = HeaderUser;
Header.Button = HeaderButton;
Header.UserButton = HeaderUserButton;

export default Header;
