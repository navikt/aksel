import React, { forwardRef, HTMLAttributes } from "react";
import HeaderTitle, { HeaderTitleType } from "./HeaderTitle";
import HeaderUser, { HeaderUserType } from "./HeaderUser";
import HeaderUserMenu, { HeaderUserMenuType } from "./HeaderUserMenu";
import cl from "classnames";

export interface HeaderProps extends HTMLAttributes<HTMLElement> {
  /**
   * Component content
   */
  children?: React.ReactNode;
}

interface HeaderComponent
  extends React.ForwardRefExoticComponent<
    HeaderProps & React.RefAttributes<HTMLDivElement>
  > {
  Title: HeaderTitleType;
  User: HeaderUserType;
  UserMenu: HeaderUserMenuType;
}

const Header = forwardRef<HTMLElement, HeaderProps>(
  ({ children, className, ...rest }, ref) => (
    <header ref={ref} className={cl("navdsi-header", className)} {...rest}>
      {children}
    </header>
  )
) as HeaderComponent;

Header.Title = HeaderTitle;
Header.User = HeaderUser;
Header.UserMenu = HeaderUserMenu;

export default Header;
