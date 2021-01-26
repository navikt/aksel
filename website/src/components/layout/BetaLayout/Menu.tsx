import React, { forwardRef, useState } from "react";
import "@navikt/ds-css/accordion/index.css";
import { Expand } from "@navikt/ds-icons";
import cl from "classnames";
import { Link } from "gatsby";
import { useBetaMenu } from "../../../useSiteStructure";
import "./layout.css";
import "./theme.css";

export const SubMenu = (props) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <>
      <button
        className="ds-sidebar__button"
        onClick={() => setExpanded(!expanded)}
        aria-expanded={expanded}
      >
        {props.title}
        <Expand
          className={cl(
            "navds-accordion__chevron",
            `navds-accordion__chevron--${expanded ? "up" : "down"}`,
            "ds-sidebar__chevron"
          )}
        />
      </button>
      <ul
        className={cl("ds-sidebar__submenu", {
          "ds-sidebar__submenu--hidden": !expanded,
        })}
      >
        {props.children.map((props) => (
          <li key={props.title}>
            {
              <Link
                to={props.link}
                className="ds-sidebar__submenu--item"
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
};

export const Menu = forwardRef<HTMLElement, {}>(
  ({ children, ...rest }, ref) => {
    const menu = useBetaMenu();

    return (
      <nav ref={ref}>
        <ul className="ds-sidebar__menu">
          {menu.map((props) => (
            <li key={props.title}>
              {props.children ? (
                <SubMenu {...props} />
              ) : (
                <Link
                  to={props.link}
                  className="ds-sidebar__button"
                  activeClassName="active"
                >
                  {props.title}
                  <Expand
                    className={cl(
                      "navds-accordion__chevron",
                      "ds-sidebar__chevron",
                      "ds-sidebar__chevron--right"
                    )}
                  />
                </Link>
              )}
            </li>
          ))}
        </ul>
      </nav>
    );
  }
);
