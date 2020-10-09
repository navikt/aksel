import React from "react";
import { Link } from "gatsby";
import { routingPaths } from "../util/routing";
import { GithubLogo } from "../assets/images/svg";

import "./styles.less";

const MainNav = () => {
  const { menuPaths } = routingPaths();
  return (
    <nav className="mainNav" aria-label="Hoved">
      <div className="mainNav__wrapper">
        <ul>
          {menuPaths
            .filter((item) => item.path && item.path !== "/new-project")
            .map((item, index) => (
              <li key={item.title}>
                <Link
                  partiallyActive={item.path !== "/"}
                  activeClassName="active"
                  to={item.path}
                >
                  {item.title}
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
