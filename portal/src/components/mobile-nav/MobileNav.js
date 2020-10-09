import React, { useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import classnames from "classnames";

import { routingPaths } from "../util/routing";
import { Xknapp } from "nav-frontend-ikonknapper";

import { GithubLogo } from "../assets/images/svg";

import MobileNavMenuItem from "./MobileNavMenuItem";

import "./styles.less";

const cls = (props, hidden) =>
  classnames("mobile-nav", {
    "mobile-nav--open": props.open,
    "mobile-nav--hidden": hidden,
  });

const MobileNav = ({ ...props }) => {
  const [hidden, setHidden] = useState(true);
  const timer = useRef(null);
  const lukkBtn = useRef();
  const bg = useRef();

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    window.addEventListener("click", handleClick);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
      window.removeEventListener("click", handleClick);
    };
  }, []);

  useEffect(() => {
    if (props.open) {
      window.clearInterval(timer.current);

      setHidden(false);

      timer.current = null;

      ReactDOM.findDOMNode(lukkBtn.current).focus();
    } else {
      timer.current = window.setTimeout(() => setHidden(true), 200);
    }
  }, [props.open]);

  const handleKeyPress = (e) => {
    if (e.keyCode === 27 && props.open && !timer.current) {
      props.toggle();
    }
  };

  const handleClick = (e) => {
    if (!hidden && e.target === bg.current && !timer.current) {
      props.toggle();
    }
  };

  const renderRoute = (route, index) => {
    // const open =
    //   props.location.pathname.indexOf(route.path) !== -1 && route.routes;
    return (
      <MobileNavMenuItem open={open} route={route} index={index} key={index}>
        {route.routes && (
          <ul>
            {/* {route.routes
              .filter((subRoute) => subRoute.path !== "/new-project")
              .map((filteredRoute, i) => renderRoute(filteredRoute, i))} */}
          </ul>
        )}
      </MobileNavMenuItem>
    );
  };

  const { menuPaths } = routingPaths();

  return (
    <div
      ref={(node) => {
        bg.current = node;
      }}
      className={cls(props, hidden)}
      aria-hidden={hidden}
    >
      <nav className="mobile-nav__drawer" aria-label="main mobile">
        <Xknapp
          className="mobile-nav__close-btn"
          onClick={props.toggle}
          ref={(node) => {
            lukkBtn.current = node;
          }}
        >
          <span className="sr-only">Lukk meny</span>
        </Xknapp>
        <ul className="nav-list">
          {menuPaths
            .filter((route) => route.path)
            .map((route, index) => renderRoute(route, index))}
          <li>
            <a
              href="https://github.com/navikt/nav-frontend-moduler"
              className="github"
            >
              <GithubLogo />
              Github
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default MobileNav;
