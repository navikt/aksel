import React from "react";
import { Link } from "gatsby";
import { guid } from "nav-frontend-js-utils";

import "./styles.less";

const MainNav = () => {
  const menu = [
    { link: "/designsystem", title: "Kom i gang" },
    { link: "/designsystem/components", title: "Komponenter" },
    { link: "/designsystem/patterns", title: "Mønster" },
    { link: "/designsystem/resources", title: "Ressurser" },
    { link: "/designsystem/accessibility", title: "Tilgjengelighet" },
  ];
  return (
    <nav className="mainNav" aria-label="Hovedmeny">
      <div className="mainNav__wrapper">
        <ul>
          {menu.map(({ link, title }) => (
            <li key={guid()}>
              <Link partiallyActive={false} activeClassName="active" to={link}>
                {title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default MainNav;
