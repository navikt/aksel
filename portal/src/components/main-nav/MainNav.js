import React from "react";
import { Link } from "gatsby";
import { GithubLogo } from "../assets/images/svg";
import { useMainMenuItems } from "../../useMenuItems";

import "./styles.less";

const MainNav = () => {
  const menuItems = useMainMenuItems();

  return (
    <nav className="mainNav" aria-label="Hoved">
      <div className="mainNav__wrapper">
        <ul>
          {menuItems.map(({ link, title }, index) => (
            <li key={title}>
              <Link
                partiallyActive={link !== "/"}
                activeClassName="active"
                to={link}
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
