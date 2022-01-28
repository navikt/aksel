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

export const NestingContext = createContext<{ depth: number }>({ depth: 1 });

const NestingProvider = ({ children }) => {
  const context = useContext(NestingContext);

  return (
    <NestingContext.Provider
      value={{
        depth: context.depth + 1,
      }}
    >
      {children}
    </NestingContext.Provider>
  );
};

export interface MenuCollapseProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}

export type MenuCollapseType = React.ForwardRefExoticComponent<
  MenuCollapseProps & React.RefAttributes<HTMLDivElement>
>;

const Collapse: MenuCollapseType = forwardRef(
  ({ children, defaultOpen = false, title, className, ...rest }, ref) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);
    const context = useContext(NestingContext);

    return (
      <div
        {...rest}
        ref={ref}
        className={cl("navds-menu-collapse", className, {
          "navds-menu-collapse--open": isOpen,
        })}
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="navds-menu-collapse__button"
        >
          {title}
          <Expand
            title={isOpen ? "lukk navigasjons-skuff" : "åpne navigason-skuff"}
            className="navds-menu-collapse__expand-icon"
          />
          <ExpandFilled
            title={isOpen ? "lukk navigasjons-skuff" : "åpne navigason-skuff"}
            className="navds-menu-collapse__expand-icon navds-menu-collapse__expand-icon--filled"
          />
        </button>
        <NestingProvider>
          {isOpen && (
            <MenuItems
              data-depth={context.depth}
              className="navds-menu__list--inner"
            >
              {children}
            </MenuItems>
          )}
        </NestingProvider>
      </div>
    );
  }
);

export default Collapse;
