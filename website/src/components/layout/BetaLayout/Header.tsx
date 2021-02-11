import React, { useEffect, useState, useRef } from "react";
import "@navikt/ds-css/accordion/index.css";
import "@navikt/ds-css/baseline/utility.css";
import { Hamburger } from "@navikt/ds-icons";
import { InternalHeader } from "@navikt/ds-react";
import { Link } from "gatsby";
import { GithubLogoEm, NAVLogoWhite } from "../../assets/images/svg";
import "./layout.css";
import "./theme.css";

export const Header = ({ onClick, open, onOpenSidebar }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleClick = () => {
    onOpenSidebar(!sidebarOpen);
    setSidebarOpen(!sidebarOpen);
  };

  useEffect(() => {
    setSidebarOpen(open);
  }, [open]);

  const buttonRef = useRef(null);
  const prevOpen = useRef(open);

  useEffect(() => {
    if (prevOpen.current && !open) {
      //buttonRef.current.focus();
    }
    prevOpen.current = open;
  }, [open]);

  return (
    <>
      <a href="#hovedinnhold" id="skip-link-v2" className="sr-only">
        Hopp til innhold
      </a>
      <InternalHeader className="ds-header">
        <div className="ds-header__title--wrapper">
          <button
            aria-label="Åpne sidenavigasjon"
            onClick={() => handleClick()}
            className="ds-header__icon ds-header__icon--slideIn"
            ref={buttonRef}
          >
            <Hamburger focusable="false" aria-label="Hamburger ikon" />
          </button>
          <Link to="/beta/" className="ds-header__title">
            {/* <NAVLogoWhite /> */}
            <span>NAV Design System v2</span>
          </Link>
        </div>
        <span className="ds-header__logo">
          <NAVLogoWhite role="img" aria-label="NAV logo hvit" />
        </span>
        <div className="ds-header--right">
          <a
            href="https://github.com/navikt/nav-frontend-moduler"
            className="ds-header__link ds-header__link--right"
            aria-label="Github lenke"
          >
            <GithubLogoEm role="img" aria-label="Github-logo" />
          </a>
        </div>
      </InternalHeader>
    </>
  );
};
