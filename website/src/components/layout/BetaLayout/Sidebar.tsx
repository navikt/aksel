import { Close } from "@navikt/ds-icons";
import cl from "classnames";
import { default as React, useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import useKeypress from "react-use-keypress";
import "./layout.css";
import { Menu } from "./Menu";
import "./theme.css";

export const Sidebar = ({ open, closeSidebar }) => {
  const [openButton, setOpenButton] = useState(open);
  const small = useMediaQuery({
    query: "(max-width: 960px)",
  });

  useKeypress("Escape", () => {
    closeSidebar();
  });

  useEffect(() => {
    if (!open) {
      setTimeout(() => {
        setOpenButton(false);
      }, 150);
    } else {
      setOpenButton(true);
    }
  }, [open]);

  return (
    <>
      {openButton && small && (
        <div
          onClick={closeSidebar}
          className={cl("ds-sidebar--overlay", {
            "ds-sidebar--overlay--fade": open,
          })}
        />
      )}
      <div
        className={cl("ds-sidebar", {
          "ds-sidebar__mobile": small,
          "ds-sidebar__mobile--open": small && open,
        })}
      >
        {small && openButton && (
          <button
            aria-label="Lukk sidenavigasjon"
            onClick={closeSidebar}
            className="ds-header__icon ds-header__icon--onSidebar"
            autoFocus
          >
            <Close focusable="false" aria-label="Lukk ikon" />
          </button>
        )}
        <Menu hidden={small && !open} />
      </div>
    </>
  );
};
