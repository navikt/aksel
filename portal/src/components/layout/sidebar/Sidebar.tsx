import { Link } from "gatsby";
import React from "react";
import { usePageTitle, usePageMenu } from "../../../useSiteStructure";
import "./styles.less";

const Sidebar = ({ location, className = "" }) => {
  const title = usePageTitle(location);
  const menu = usePageMenu(location);

  return (
    <div className={className}>
      <nav aria-labelledby="left-navigation-title">
        <h2 id="left-navigation-title" className="typo-systemtittel">
          {title}
        </h2>
        <ul className="nav-list">
          {menu.map(({ link, title }, index) => (
            <li key={index}>
              <Link to={link} partiallyActive activeClassName="active">
                {title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
