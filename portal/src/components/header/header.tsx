import React from "react";
import { Link } from "gatsby";
import { default as cl } from "classnames";

import { Sidetittel } from "nav-frontend-typografi";
import "./header.less";
import { NAVLogo } from "../assets/images/svg";

const Header = ({ siteTitle, className = "" }) => {
  return (
    <header className={cl("header", className)}>
      <a href="#hovedinnhold" id="skip-link">
        Jump to content
      </a>
      <div className="header__content">
        <Link className="header__logo" to="/">
          <NAVLogo />
          <Sidetittel className="header__title">{siteTitle}</Sidetittel>
        </Link>
      </div>
    </header>
  );
};

export default Header;
