import React, { useRef, useState } from "react";
import cl from "classnames";
import { useMediaQuery } from "react-responsive";
import "./layout.css";
import { Menu } from "./Menu";

import "./theme.css";
import "@navikt/ds-css/accordion/index.css";

export const Sidebar = ({ open, onOpenChange }) => {
  const [mobile, setMobile] = useState(false);
  const overlayRef = useRef(null);
  const sidebarRef = useRef(null);

  const small = useMediaQuery({
    query: "(max-width: 960px)",
  });

  const checkViewport = () => {
    if (small && !mobile) {
      setMobile(true);
    } else if (!small && mobile) {
      setMobile(false);
      onOpenChange(false);
    }
  };

  const handleClick = (e) => {
    if (
      open &&
      e.target !== sidebarRef.current &&
      !sidebarRef.current.contains(e.target)
    ) {
      onOpenChange(false);
    }
  };

  const hidden = mobile && !open;

  checkViewport();
  return (
    <div
      onClick={(e) => handleClick(e)}
      ref={overlayRef}
      className={cl({ "ds-sidebar--overlay": open })}
    >
      <div
        ref={sidebarRef}
        className={cl({
          "ds-sidebar": !open && !mobile,
          "ds-sidebar__mobile": mobile,
          "ds-sidebar__mobile--open": open,
        })}
      >
        <Menu hidden={hidden} />
      </div>
    </div>
  );
};
