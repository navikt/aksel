import Link from "next/link";
import NavLogo from "../../assets/navLogo.svg";
import { HamburgerFilled } from "@navikt/ds-icons";
import cl from "classnames";
import "../layout.css";

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
    <header className={"header"}>
      <button
        onClick={() => onSidebarChange(!sidebar)}
        className={cl("header__link", "header__icon", {
          "header__icon--hidden": sidebar,
        })}
        tabIndex={!sidebar ? 0 : -1}
      >
        <HamburgerFilled />
      </button>
      <Link href="/">
        <button className={"header__link"}>
          <NavLogo />
          <span className={"header__link-title"}>NAV Designsystem</span>
        </button>
      </Link>
    </header>
  );
};

export default Header;
