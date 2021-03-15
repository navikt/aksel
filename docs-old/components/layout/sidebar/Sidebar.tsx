import Link from "next/link";
import cl from "classnames";
import { Close } from "@navikt/ds-icons";
import style from "../layout.module.css";

interface SidebarProps {
  classname?: string;
  sidebar: boolean;
  small: boolean;
  onSidebarChange: (x: boolean) => void;
}

const Sidebar = ({
  sidebar,
  small,
  onSidebarChange,
  ...props
}: SidebarProps) => {
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
        <Link href="/">Home</Link>
        <Link href="/komponenter">KomponenterKomponenterKompo</Link>
        <Link href="/komponenter/button">Button</Link>
      </div>
    </>
  );
};

export default Sidebar;
