import cl from "classnames";
import { Close } from "@navikt/ds-icons";
import "../layout.css";
import Menu from "./Menu";

interface SidebarProps {
  classname?: string;
  sidebar: boolean;
  small: boolean;
  onSidebarChange: (x: boolean) => void;
  menu: any[];
}

const Sidebar = ({
  sidebar,
  small,
  onSidebarChange,
  menu = [],
}: SidebarProps) => {
  return (
    <>
      {sidebar && small && (
        <div
          onClick={() => onSidebarChange(false)}
          className={cl("sidebar--overlay", {
            "sidebar--overlay--fade": sidebar,
          })}
        />
      )}
      <div
        className={cl("sidebar", {
          sidebar__mobile: small,
          "sidebar__mobile--open": small && sidebar,
        })}
      >
        {small && sidebar && (
          <button
            onClick={() => onSidebarChange(!sidebar)}
            className={"sidebar__icon"}
          >
            <Close />
          </button>
        )}
        <Menu menu={menu} />
      </div>
    </>
  );
};

export default Sidebar;
