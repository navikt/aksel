import React from "react";
import { MDXProvider } from "@mdx-js/react";
import { Link } from "gatsby";
import { NAVLogo } from "../../assets/images/svg";
import { useBetaMenu } from "../../../useSiteStructure";
import "./layout.css";

const SubMenu = (props) => (
  <>
    <div>{props.title}</div>
    <ul>
      {props.children.map((props) => (
        <li key={props.title}>
          {
            <Link
              to={props.link}
              className="sidebar__menu-item"
              activeClassName="active"
            >
              {props.title}
            </Link>
          }
        </li>
      ))}
    </ul>
  </>
);

const Menu = () => {
  const menu = useBetaMenu();

  console.log(menu);
  return (
    <ul className="sidebar__menu">
      {menu.map((props) => (
        <li key={props.title}>
          {props.children ? (
            <SubMenu {...props} />
          ) : (
            <Link
              to={props.link}
              className="sidebar__menu-item"
              activeClassName="active"
            >
              {props.title}
            </Link>
          )}
        </li>
      ))}
    </ul>
  );
};

const Sidebar = () => (
  <div className="sidebar">
    <Link to="/beta" className="sidebar__logo">
      <NAVLogo />
      <span>Designsystemet (beta)</span>
    </Link>
    <Menu />
  </div>
);

const BetaLayout = (props) => (
  <div className="page-wrapper">
    <Sidebar />
    <div className="content">
      <MDXProvider>{props.children}</MDXProvider>
    </div>
  </div>
);

export default BetaLayout;
