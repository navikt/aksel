import React from "react";
import { Link } from "gatsby";
import { LenkepanelBase } from "nav-frontend-lenkepanel";
import { Sidetittel, Undertittel } from "nav-frontend-typografi";
import { usePageMenu, usePageTitle } from "../../useSiteStructure";
import "./styles.less";

const NavPage = ({ location }) => {
  const title = usePageTitle(location);
  const menu = usePageMenu(location);

  return (
    <>
      <Sidetittel>{title}</Sidetittel>
      <nav className="catalog" aria-labelledby="left-navigation-title">
        {menu.map(({ link, title }, index) => (
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
    </>
  );
};

export default NavPage;
