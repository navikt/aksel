import { Link } from "gatsby";
import React from "react";
import useMenuItems from "../../useMenuItems";
import "./styles.less";

const Sidebar = ({ location, className = "" }) => {
  const menuItems = useMenuItems(location);

  return (
    <div className={className}>
      <nav aria-labelledby="left-navigation-title">
        <h2 id="left-navigation-title" className="typo-systemtittel">
          Ressurser
        </h2>
        <ul className="nav-list">
          {menuItems.map(({ link, title }, index) => (
            <li key={index}>
              <Link to={link}>{title}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
