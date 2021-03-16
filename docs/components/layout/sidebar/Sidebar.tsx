import Link from "next/link";
import cl from "classnames";
import { Close } from "@navikt/ds-icons";
import style from "../layout.module.css";
import { NextRouter } from "next/router";
import Pages, { NavdsPage } from "../../../src/pages";

interface SidebarProps {
  classname?: string;
  sidebar: boolean;
  small: boolean;
  onSidebarChange: (x: boolean) => void;
  route: NextRouter;
}

const Sidebar = ({ sidebar, small, onSidebarChange, route }: SidebarProps) => {
  const subLinks = (page: NavdsPage) => {
    return (
      <div key={page.title}>
        <span>{page.title}</span>
        <ul id={"collapse " + page.title}>
          {page.children.map((child) => {
            if (child.pathName) {
              return (
                <li key={child.pathName}>
                  <Link href={child.pathName}>
                    {child.title ? child.title : parseTitle(child.pathName)}
                  </Link>
                </li>
              );
            } else if (child.children && child.title) {
              return subLinks(child);
            }
            return null;
          })}
        </ul>
      </div>
    );
  };

  const parseTitle = (path: string) =>
    path
      .split("/")
      .pop()
      .replace(/^\w/, (c) => c.toUpperCase())
      .replace("-", " ") || "Default Title";

  const generateLinks = () => {
    return Pages.map((page) => {
      if (page.pathName) {
        return (
          <Link key={page.pathName} href={page.pathName}>
            {page.title ? page.title : parseTitle(page.pathName)}
          </Link>
        );
      } else if (page.title && page.children) {
        return subLinks(page);
      } else {
        return null;
      }
    });
  };

  return (
    <>
      {sidebar && small && (
        <div
          onClick={() => onSidebarChange(false)}
          className={cl(style["sidebar--overlay"], {
            [style["sidebar--overlay--fade"]]: sidebar,
          })}
        />
      )}
      <div
        className={cl(style.sidebar, {
          [style.sidebar__mobile]: small,
          [style["sidebar__mobile--open"]]: small && sidebar,
        })}
      >
        {small && sidebar && (
          <button
            onClick={() => onSidebarChange(!sidebar)}
            className={style.sidebar__icon}
          >
            <Close />
          </button>
        )}
        {generateLinks()}
        {/* <Link href="/">Home</Link>
        <Link href="/komponenter">Komponenter</Link>
        <Link href="/komponenter/button">Button</Link> */}
      </div>
    </>
  );
};

export default Sidebar;
