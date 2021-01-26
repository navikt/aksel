import React, { useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import useKeypress from "react-use-keypress";

import classnames from "classnames";
import { Menu } from "./Menu";

import "./layout.css";

const cls = (props, hidden) =>
  classnames("ds-sidebar__mobile", {
    "ds-sidebar__mobile--open": props.open,
    "ds-sidebar__mobile--hidden": hidden,
  });

export const MobileNav = ({ ...props }) => {
  const [hidden, setHidden] = useState(true);
  const bg = useRef(null);
  const timer = useRef(null);

  // Timer is needed here to wait for transition animation to finish
  useEffect(() => {
    if (props.open) {
      clearTimeout(timer.current);
      timer.current = null;
      setHidden(false);
    } else {
      timer.current = setTimeout(() => {
        setHidden(true);
      }, 200);
    }
  }, [props.open]);

  useKeypress("Escape", () => {
    props.open && props.toggle();
  });

  const handleClick = (e) => {
    if (!hidden && e.target !== bg.current) {
      props.toggle();
    }
  };

  return (
    <div
      className={cls(props, hidden)}
      aria-hidden={hidden}
      onClick={(e) => handleClick(e)}
    >
      <Menu aria-label="Hovedmeny mobil" ref={bg.current} />
    </div>
  );
};

export default MobileNav;
