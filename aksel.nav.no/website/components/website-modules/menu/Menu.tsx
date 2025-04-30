import cl from "clsx";
import Link from "next/link";
import { HTMLAttributes, createContext, useContext } from "react";
import { BodyShort, Label } from "@navikt/ds-react";
import { umamiTrack } from "@/app/_ui/umami/Umami.track";
import styles from "./Menu.module.css";

type MenuProps = {
  children: React.ReactNode;
  loggingContext: "meny" | "toc";
  variant: "action" | "neutral";
};

const MenuContext = createContext<Omit<MenuProps, "children"> | null>(null);

export function Menu({ children, ...rest }: MenuProps) {
  return <MenuContext.Provider value={rest}>{children}</MenuContext.Provider>;
}

type MenuHeadingProps = {
  children: React.ReactNode;
  as: "div" | "h2";
};

export function MenuHeading({ children, as }: MenuHeadingProps) {
  return (
    <Label as={as} size="small" textColor="subtle" className="py-05">
      {children}
    </Label>
  );
}

type MenuListProps = {
  children: React.ReactNode;
  id?: string;
  className?: string;
};

export function MenuUl({ children, id, className }: MenuListProps) {
  return (
    // eslint-disable-next-line jsx-a11y/no-redundant-roles
    <ul
      className={cl(styles.menuList, className)}
      id={id}
      // biome-ignore lint/a11y/noRedundantRoles: WebKit browsers remove list semantics when list-style-type is none
      role="list"
    >
      {children}
    </ul>
  );
}

type MenuLiProps = {
  children: React.ReactNode;
} & HTMLAttributes<HTMLLIElement>;

export function MenuLi(props: MenuLiProps) {
  return <li className="group" {...props} />;
}

type MenuLinkProps = {
  children: React.ReactNode;
  selected?: boolean;
  href: string;
  id?: string;
  onClick?: () => void;
  source: "sidebar" | "toc";
};

export function MenuLink({
  children,
  href,
  selected,
  id,
  onClick,
  source,
}: MenuLinkProps) {
  const ctx = useContext(MenuContext);

  if (!ctx) {
    throw new Error("MenuListItem must be used inside a Menu component");
  }

  const isDarksideOverride = href.includes("/darkside/");

  return (
    <div className="relative scroll-m-6 border-l border-border-subtle" id={id}>
      <BodyShort
        data-type={isDarksideOverride ? "darkside" : ctx.variant}
        data-current={selected}
        size="small"
        as={Link}
        prefetch={false}
        href={href}
        onClick={() => {
          onClick?.();
          umamiTrack("navigere", {
            kilde: source,
          });
        }}
        className={cl(
          styles.menuListItem,
          "flex py-05 focus:outline-none *:focus-visible:shadow-focus group-first:pt-0 group-last:last:pb-0",
          "before:absolute before:-left-px before:top-05 before:h-[calc(100%-0.25rem)] before:rounded-r-sm before:transition-all group-first:before:top-0 group-first:before:h-[calc(100%-0.125rem)] group-last:before:h-[calc(100%-0.125rem)]",
          {
            "text-text-subtle before:w-0 before:bg-gray-400 before:duration-100 before:ease-linear hover:text-text-default hover:before:w-1":
              !selected,
            "before:w-1": selected,
          },
        )}
      >
        <span className="w-full rounded px-2 py-1 transition-colors duration-100 ease-out">
          {children}
        </span>
      </BodyShort>
    </div>
  );
}
