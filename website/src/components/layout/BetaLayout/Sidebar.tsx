import React, { useState } from "react";
import cl from "classnames";
import { useMediaQuery } from "react-responsive";
import "./layout.css";
import { Menu } from "./Menu";

import "./theme.css";
import "@navikt/ds-css/accordion/index.css";

export const Sidebar = ({ open, onOpenChange }) => {
  const [mobile, setMobile] = useState(false);

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

  const ariaHidden = mobile ? { "aria-hidden": !!open } : undefined;

  checkViewport();
  return (
    <div className={cl({ "ds-sidebar--overlay": open })}>
      <div
        className={cl({
          "ds-sidebar": !open && !mobile,
          "ds-sidebar__mobile": mobile,
          "ds-sidebar__mobile--open": open,
        })}
      >
        <Menu />
      </div>
    </div>
  );
};
