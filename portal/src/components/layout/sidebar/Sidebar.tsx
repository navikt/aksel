import { Link } from "gatsby";
import React from "react";
import { useNavigationPage, usePageMenu } from "../../../useSiteStructure";
import "./styles.less";

const Sidebar = ({ location, className = "" }) => {
  const page = useNavigationPage(location);
  const menu = usePageMenu(location);

  return (
    <div className={className}>
      <nav aria-labelledby="left-navigation-title">
        <h2 id="left-navigation-title" className="typo-systemtittel">
          {page?.title}
        </h2>
        <ul className="nav-list">
          {menu.map(({ link, title }, index) => {
            return (
              <li key={index}>
                <Link to={link} activeClassName="active">
                  {title}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
