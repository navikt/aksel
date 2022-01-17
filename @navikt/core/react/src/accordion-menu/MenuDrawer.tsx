import React, {
  createContext,
  forwardRef,
  HTMLAttributes,
  useContext,
  useState,
} from "react";
import cl from "classnames";
import { Expand, ExpandFilled } from "@navikt/ds-icons";
import MenuItems from "./MenuItems";

export const NestingContext = createContext<{ depth: number }>({ depth: 0 });

export interface MenuDrawerProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}

export type MenuDrawerType = React.ForwardRefExoticComponent<
  MenuDrawerProps & React.RefAttributes<HTMLDivElement>
>;

const Drawer: MenuDrawerType = forwardRef(
  ({ children, defaultOpen = false, title, className, ...rest }, ref) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);
    const context = useContext(NestingContext);

    return (
      <div
        ref={ref}
        className={cl("navds-menu-drawer", className, {
          "navds-menu-drawer--open": isOpen,
        })}
        {...rest}
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="navds-menu-drawer__button"
        >
          {title}
          <Expand
            title={isOpen ? "lukk navigasjons-skuff" : "åpne navigason-skuff"}
            className="navds-menu-drawer__expand-icon"
          />
          <ExpandFilled
            title={isOpen ? "lukk navigasjons-skuff" : "åpne navigason-skuff"}
            className="navds-menu-drawer__expand-icon navds-menu-drawer__expand-icon--filled"
          />
        </button>
        <NestingContext.Provider
          value={{
            depth: context.depth + 1,
          }}
        >
          {isOpen && (
            <MenuItems
              data-depth={context.depth + 1}
              className="navds-menu__list--inner"
            >
              {children}
            </MenuItems>
          )}
        </NestingContext.Provider>
      </div>
    );
  }
);

export default Drawer;
