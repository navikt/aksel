import React, { forwardRef } from "react";
import cl from "classnames";
import "@navikt/ds-css/header/index.css";
import "@navikt/ds-css/typography/index.css";

export interface HeaderProps {
  title: string;
  user: { name: string; ident: string };
  children?: React.ReactNode;
  classname?: string;
}

const Header = forwardRef<HTMLHeadingElement, HeaderProps>(
  ({ children, classname, title, user, ...rest }, ref) => {
    return (
      <header ref={ref} className={cl("navds-header", classname)} {...rest}>
        <div className="navds-header__row">
          <h1 className="navds-header__title navds-heading--medium">{title}</h1>
          <span className="navds-header__divider" />
          {children}
        </div>
        <div className="navds-header__row navds-header--gap">
          <span className="navds-header__divider" />
          <p className="navds-header__user navds-text--small">{user.name}</p>
          <p className="navds-header__user navds-text--xs">{user.ident}</p>
        </div>
      </header>
    );
  }
);

export default Header;
