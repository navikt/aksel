import React, { useState, useRef } from "react";
import ReactDOM from "react-dom";
import { Link } from "gatsby";
import { useMediaQuery } from "react-responsive";

import { NAVLogo } from "../../assets/images/svg";
import { Systemtittel } from "nav-frontend-typografi";
import MainNav from "./main-nav/MainNav";
import MobileNav from "./mobile-nav/MobileNav";
import MobileNavToggle from "./mobile-nav-toggle/MobileNavToggle";
import "./header.less";

const Header = ({ location, title }) => {
  const [mobile, setMobile] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const toggleBtn = useRef();

  const small = useMediaQuery({
    query: "(max-width: 1094px)",
  });

  const checkViewport = () => {
    if (small && !mobile) {
      setMobile(true);
    } else if (!small && mobile) {
      setMobile(false);
    }
  };

  const toggleMobileNav = () => {
    setMobileNavOpen(!mobileNavOpen);
    if (!mobileNavOpen) {
      ReactDOM.findDOMNode(toggleBtn.current).focus();
    }
  };

  const ariaHidden = mobile ? { "aria-hidden": !!mobileNavOpen } : undefined;
  const headlineTag = !!location.pathname.match(/\/.*?\/\S/) ? "h2" : "h1";

  let headerTitle =
    title === "Designsystemet" ? "Designsystemet" : title + " - Verktøykassen";
  headerTitle = title === "" ? "Verktøykassen" : headerTitle;

  const headerlink =
    title === "Designsystemet" ? "designsystem" : title.toLowerCase();

  const dsMenu = [
    { link: "/designsystem/resources", title: "Ressurser" },
    { link: "/designsystem/components/alertstripe", title: "Komponenter" },
    { link: "/designsystem/patterns", title: "Mønster" },
    { link: "/designsystem/accessibility", title: "Tilgjengelighet" },
  ];

  checkViewport();
  return (
    <React.Fragment>
      <header className="header">
        <a href="#hovedinnhold" id="skip-link">
          Hopp til innhold
        </a>
        <div className="header__content">
          <Link to={`/${headerlink}`} className="header__logo">
            <NAVLogo />
            <Systemtittel className="header__title" tag={headlineTag}>
              {headerTitle}
            </Systemtittel>
          </Link>
          <MobileNavToggle
            innerRef={(node) => {
              toggleBtn.current = node;
            }}
            onClick={() => toggleMobileNav()}
            {...ariaHidden}
          />
          <div style={{ flexGrow: 1 }} />
          {title === "Designsystemet" && <MainNav menu={dsMenu} />}
        </div>
      </header>
      <MobileNav
        open={mobileNavOpen}
        toggle={toggleMobileNav}
        location={location}
        menu={title === "Designsystemet" && dsMenu}
      />
    </React.Fragment>
  );
};

export default Header;
