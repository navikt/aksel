import React, { useState, useRef } from "react";
import ReactDOM from "react-dom";
import { Link } from "gatsby";
import { useMediaQuery } from "react-responsive";

import { NAVLogo } from "../../assets/images/svg";

import MainNav from "./main-nav/MainNav";
import MobileNav from "./mobile-nav/MobileNav";
import MobileNavToggle from "./mobile-nav-toggle/MobileNavToggle";
import "./header.less";

const Header = ({ ...props }) => {
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

  checkViewport();
  return (
    <React.Fragment>
      <header className="header">
        <a href="#hovedinnhold" id="skip-link">
          Hopp til innhold
        </a>
        <div className="header__content">
          <Link to="/" className="header__logo">
            <NAVLogo />
            <div className="header__title">Designsystemet</div>
          </Link>
          <MobileNavToggle
            innerRef={(node) => {
              toggleBtn.current = node;
            }}
            onClick={() => toggleMobileNav()}
            {...ariaHidden}
          />
          <MainNav />
        </div>
      </header>
      <MobileNav open={mobileNavOpen} toggle={toggleMobileNav} />
    </React.Fragment>
  );
};

export default Header;
