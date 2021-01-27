import { MDXProvider } from "@mdx-js/react";
import "@navikt/ds-css/accordion/index.css";
import { Close, Hamburger } from "@navikt/ds-icons";
import { Heading, InternalHeader, Paragraph } from "@navikt/ds-react";
import cl from "classnames";
import { Link } from "gatsby";
import React, { useEffect, useState } from "react";
import { GithubLogoEm, NAVLogoWhite } from "../../assets/images/svg";
import Codeblock, { InlineCode } from "../../code/Code";
import Example from "../../example/Example";
import "./layout.css";
import { Sidebar } from "./Sidebar";
import "./theme.css";

const Header = ({ onClick, open, onOpenSidebar }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleClick = () => {
    onOpenSidebar(!sidebarOpen);
    setSidebarOpen(!sidebarOpen);
  };

  useEffect(() => {
    setSidebarOpen(open);
  }, [open]);

  return (
    <InternalHeader className="ds-header">
      <div className="ds-header__title--wrapper">
        <button onClick={() => handleClick()} className="ds-header__hamburger">
          {sidebarOpen ? <Close /> : <Hamburger />}
        </button>
        <Link to="/beta/" className="ds-header__title">
          {/* <NAVLogoWhite /> */}
          <span>NAV Design System v2</span>
        </Link>
      </div>
      <span className="ds-header__logo">
        <NAVLogoWhite />
      </span>
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
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div
      className={cl("ds-page-wrapper", {
        "ds-lightmode": !darkmode,
        "ds-darkmode": darkmode,
      })}
    >
      <Header
        onOpenSidebar={(e) => setSidebarOpen(e)}
        open={sidebarOpen}
        onClick={() => setDarkmode(!darkmode)}
      />
      <Sidebar open={sidebarOpen} onOpenChange={(e) => setSidebarOpen(e)} />
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
