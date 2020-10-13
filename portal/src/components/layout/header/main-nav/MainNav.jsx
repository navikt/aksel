import React from "react";
import { Link } from "gatsby";
import { GithubLogo } from "../../../assets/images/svg";
import { useMainMenu } from "../../../../useSiteStructure";
import {guid} from 'nav-frontend-js-utils';

import "./styles.less";

const MainNav = () => {
  const menu = useMainMenu();

  return (
    <nav className="mainNav" aria-label="Hoved">
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
          <div style={{ flexGrow: 1 }} />
          <li>
            <a
              href="https://github.com/navikt/nav-frontend-moduler"
              className="github"
            >
              <GithubLogo />
              Github
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default MainNav;
