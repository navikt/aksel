import Link from "next/link";
import NavLogo from "../../assets/navLogo.svg";
import { HamburgerFilled } from "@navikt/ds-icons";
import cl from "classnames";
import style from "../layout.module.css";

interface HeaderProps {
  className?: string;
  sidebar: boolean;
  onSidebarChange: (x: boolean) => void;
}

const Header = ({
  className,
  sidebar,
  onSidebarChange,
  ...props
}: HeaderProps) => {
  return (
    <header className={style.header}>
      <button
        onClick={() => onSidebarChange(!sidebar)}
        className={cl(style.header__link, style.header__icon, {
          [style["header__icon--hidden"]]: sidebar,
        })}
        tabIndex={!sidebar ? 0 : -1}
      >
        <HamburgerFilled />
      </button>
      <Link href="/">
        <button className={style.header__link}>
          <NavLogo />
          <span className={style["header__link-title"]}>NAV Designsystem</span>
        </button>
      </Link>
    </header>
  );
};

export default Header;
