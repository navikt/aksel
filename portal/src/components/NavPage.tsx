import React from "react";
import { Link } from "gatsby";
import { LenkepanelBase } from "nav-frontend-lenkepanel";
import { Undertittel } from "nav-frontend-typografi/lib";
import useMenuItems from "../useMenuItems";

const NavPage = ({ location }) => {
  const menuItems = useMenuItems(location);

  return (
    <nav className="catalog" aria-labelledby="left-navigation-title">
      {menuItems.map(({ link, title }, index) => (
        <LenkepanelBase
          key={index}
          linkCreator={(props) => (
            <Link className="lenkepanel lenkepanel--border" to={link}>
              {props.children}
            </Link>
          )}
          href="wat"
        >
          <Undertittel className="lenkepanel__heading">{title}</Undertittel>
        </LenkepanelBase>
      ))}
    </nav>
  );
};

export default NavPage;
