import React from "react";
import { Link } from "gatsby";
import { GithubLogo } from "../../../assets/images/svg";
import { useMainMenu } from "../../../../useSiteStructure";
import { guid } from "nav-frontend-js-utils";

import "./styles.less";

const MainNav = () => {
  const menu = useMainMenu();
  return (
    <nav className="mainNav" aria-label="Hovedmeny">
      <div className="mainNav__wrapper">
        <ul>
          {menu.map(({ link, title }, index) => (
            <li key={guid()}>
              <Link
                partiallyActive={link ? true : false}
                activeClassName="active"
                to={link ? link : "/"}
              >
                {title}
              </Link>
            </li>
          ))}
          <li>
            <a
              href="https://github.com/navikt/nav-frontend-moduler"
              className="github"
              aria-label="Github lenke"
            >
              <GithubLogo />
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default MainNav;
