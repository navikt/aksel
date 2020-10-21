import React from "react";
import { Link } from "gatsby";
import { LenkepanelBase } from "nav-frontend-lenkepanel";
import { Undertittel } from "nav-frontend-typografi";
import { usePageMenu } from "../../useSiteStructure";

const NavPage = ({ location }) => {
  const menu = usePageMenu(location);

  return (
    <>
      <nav className="catalog" aria-labelledby="left-navigation-title">
        {menu.map(({ link, title }, index) => (
          <LenkepanelBase
            key={index}
            linkCreator={(props) => (
              <Link className="lenkepanel lenkepanel--border" to={link}>
                {props.children}
              </Link>
            )}
            href="#"
          >
            <Undertittel className="lenkepanel__heading">{title}</Undertittel>
          </LenkepanelBase>
        ))}
      </nav>
    </>
  );
};

export default NavPage;
