import React from "react";
import { Link } from "gatsby";
import { guid } from "nav-frontend-js-utils";

import "./styles.less";

const MainNav = ({ menu }) => {
  return (
    <>
      {menu ? (
        <nav className="mainNav" aria-label="Hovedmeny">
          <div className="mainNav__wrapper">
            <ul>
              {menu.map(({ link, title }) => (
                <li key={guid()}>
                  <Link
                    partiallyActive={true}
                    activeClassName="active"
                    to={link}
                  >
                    {title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      ) : null}
    </>
  );
};

export default MainNav;
