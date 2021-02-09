import React from "react";
import { MDXProvider } from "@mdx-js/react";
import { Link } from "gatsby";
import { NAVLogo } from "../../assets/images/svg";
import { useBetaMenu } from "../../../useSiteStructure";
import Example from "../../code-preview/example/CodeExample";
import { InlineCode } from "../../code/Code";
import { Heading, Paragraph } from "@navikt/ds-react";
import "./layout.css";
import { Code } from "../../code-preview/preview/Code";

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
      <MDXProvider
        components={{
          code: (props) => <Code accordion {...props} />,
          inlineCode: (props) => <InlineCode {...props} />,
          h1: (props) => <Heading {...props} level={1} size="xxl" />,
          h2: (props) => <Heading {...props} level={2} size="xl" />,
          h3: (props) => <Heading {...props} level={3} size="large" />,
          h4: (props) => <Heading {...props} level={4} size="medium" />,
          h5: (props) => <Heading {...props} level={5} size="small" />,
          p: (props) => <Paragraph {...props} />,
          Example: (props) => <Example {...props} />,
          Code: (props) => <Code accordion {...props} />,
        }}
      >
        {props.children}
      </MDXProvider>
    </div>
  </div>
);

export default BetaLayout;
