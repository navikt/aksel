import React, { useState } from "react";
import { MDXProvider } from "@mdx-js/react";
import { Link } from "gatsby";
import cl from "classnames";
import { NAVLogoWhite, GithubLogoEm } from "../../assets/images/svg";
import { useBetaMenu } from "../../../useSiteStructure";
import Example from "../../example/Example";
import Codeblock, { InlineCode } from "../../code/Code";
import { Heading, InternalHeader, Paragraph } from "@navikt/ds-react";
import { Expand, Hamburger, Close } from "@navikt/ds-icons";

import "./layout.css";
import "./theme.css";
import "@navikt/ds-css/accordion/index.css";

const SubMenu = (props) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <>
      <button
        className="ds-sidebar__button"
        onClick={() => setExpanded(!expanded)}
        aria-expanded={expanded}
      >
        {props.title}
        <Expand
          className={cl(
            "navds-accordion__chevron",
            `navds-accordion__chevron--${expanded ? "up" : "down"}`,
            "ds-sidebar__chevron"
          )}
        />
      </button>
      <ul
        className={cl("ds-sidebar__submenu", {
          "ds-sidebar__submenu--hidden": !expanded,
        })}
      >
        {props.children.map((props) => (
          <li key={props.title}>
            {
              <Link
                to={props.link}
                className="ds-sidebar__submenu--item"
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
};

const Menu = () => {
  const menu = useBetaMenu();

  return (
    <nav>
      <ul className="ds-sidebar__menu">
        {menu.map((props) => (
          <li key={props.title}>
            {props.children ? (
              <SubMenu {...props} />
            ) : (
              <Link
                to={props.link}
                className="ds-sidebar__button"
                activeClassName="active"
              >
                {props.title}
                <Expand
                  className={cl(
                    "navds-accordion__chevron",
                    "ds-sidebar__chevron",
                    "ds-sidebar__chevron--right"
                  )}
                />
              </Link>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

const Sidebar = () => (
  <div className="ds-sidebar">
    <Menu />
  </div>
);

const Header = ({ onClick }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <InternalHeader className="ds-header">
      <div className="ds-header__title--wrapper">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="ds-header__hamburger"
        >
          {sidebarOpen ? <Close /> : <Hamburger />}
        </button>
        <Link to="/beta/" className="ds-header__title">
          <NAVLogoWhite />
          <span>NAV Design System (beta)</span>
        </Link>
      </div>
      <div className="ds-header--right">
        <input
          onChange={() => onClick()}
          className="ds-header-darkswitch"
          type="checkbox"
        />
        <a
          href="https://github.com/navikt/nav-frontend-moduler"
          className="ds-header__link ds-header__link--right"
          aria-label="Github lenke"
        >
          <GithubLogoEm />
        </a>
      </div>
    </InternalHeader>
  );
};

const BlockHeading = ({ children, ...props }) => {
  return (
    <div className="ds-content--heading">
      <Heading {...props} level={1} size="xxl">
        {children}
      </Heading>
    </div>
  );
};

const BetaLayout = (props) => {
  const [darkmode, setDarkmode] = useState(false);

  return (
    <div
      className={cl("ds-page-wrapper", {
        "ds-lightmode": !darkmode,
        "ds-darkmode": darkmode,
      })}
    >
      <Header onClick={() => setDarkmode(!darkmode)} />
      <Sidebar />
      <main className="ds-content">
        <MDXProvider
          components={{
            code: (props) => <Codeblock {...props} />,
            inlineCode: (props) => <InlineCode {...props} />,
            Example,
            h1: (props) => <BlockHeading {...props} />,
            h2: (props) => <Heading {...props} level={2} size="xl" />,
            h3: (props) => <Heading {...props} level={3} size="large" />,
            h4: (props) => <Heading {...props} level={4} size="medium" />,
            h5: (props) => <Heading {...props} level={5} size="small" />,
            p: (props) => <Paragraph {...props} />,
          }}
        >
          {props.children}
        </MDXProvider>
      </main>
    </div>
  );
};

export default BetaLayout;
