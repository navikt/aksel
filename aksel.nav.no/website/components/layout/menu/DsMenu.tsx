import { Expand } from "@navikt/ds-icons";
import { BodyShort, Detail } from "@navikt/ds-react";
import cl from "classnames";
import NextLink from "next/link";
import React, { useContext, useMemo, useState } from "react";
import { logNav, PagePropsContext } from "../..";
import { DsNavigationHeadingMenuT, DsNavigationHeadingT } from "@/lib";
import style from "./index.module.css";

const NavItem = ({
  onClick,
  item,
  inDropdown = false,
}: {
  item: DsNavigationHeadingMenuT;
  inDropdown?: boolean;
  onClick?: () => void;
}) => {
  const { pageProps } = useContext<any>(PagePropsContext);
  return (
    <li
      className={cl(
        style.item,
        "peer relative rounded-sm before:absolute before:left-0 before:z-[-1] focus-within:shadow-focus",
        {
          "before:top-1/2 before:h-6 before:-translate-y-1/2 before:border-l-[8px] before:border-l-deepblue-300":
            pageProps?.page?.slug === item?.link?.slug?.current,
          "before:h-full before:border-l before:border-l-gray-200 hover:before:border-l-2 hover:before:border-l-gray-500":
            pageProps?.page?.slug !== item?.link?.slug?.current && inDropdown,
          "pl-2": inDropdown,
          "mr-2 px-0": !inDropdown,
        }
      )}
    >
      <NextLink href={`/${item.link.slug.current}`} passHref>
        <BodyShort
          as="a"
          size="small"
          onClick={(e) => {
            onClick && onClick();
            logNav(
              "meny",
              window.location.pathname,
              e.currentTarget.getAttribute("href")
            );
          }}
          className={cl(
            "relative flex overflow-hidden px-2 py-[6px] no-underline hover:text-deepblue-800 focus:outline-none",
            {
              "font-semibold text-deepblue-800":
                pageProps?.page?.slug === item?.link?.slug?.current,
              "text-text-muted": !(
                pageProps?.page?.slug === item?.link?.slug?.current
              ),
              "pl-4":
                !inDropdown &&
                pageProps?.page?.slug === item?.link?.slug?.current,
            }
          )}
        >
          {item.title}
          {item?.link?.status &&
            ["deprecated", "beta"].includes(item.link.status?.tag) && (
              <Detail
                className={cl(
                  "ml-2 rounded-full border-none px-2 font-regular capitalize",
                  {
                    "bg-gray-200 capitalize text-text ring-1 ring-inset ring-gray-900/10":
                      item.link.status?.tag === "deprecated",
                    "bg-purple-50 text-text ring-1 ring-inset ring-purple-900/10":
                      item.link.status?.tag === "beta",
                  }
                )}
              >
                {item.link.status?.tag}
              </Detail>
            )}
        </BodyShort>
      </NextLink>
    </li>
  );
};

const Dropdown = ({
  items,
  onClick,
}: {
  items: DsNavigationHeadingMenuT[];
  onClick?: () => void;
}) => {
  const [heading, ...rest] = items;
  const [open, setOpen] = useState(true);

  return (
    <li
      key={heading.title}
      data-open={open}
      className={cl(style.dropdown, "w-full")}
    >
      <button
        onClick={() => setOpen((x) => !x)}
        className="group z-10 flex min-h-8 w-full cursor-pointer items-center justify-between pr-2 text-text-muted hover:text-deepblue-800 focus:outline-none"
        aria-expanded={open}
      >
        <Detail
          as="span"
          className="mt-6 flex w-full items-center justify-between rounded-sm pl-2 font-semibold first:mt-0 group-hover:bg-[rgba(0,0,0,0.06)] group-focus-visible:shadow-focus group-active:bg-[rgba(0,0,0,0.10)]"
        >
          {heading.title}
          <span className="flex h-6 w-6 items-center justify-center rounded">
            <Expand
              className={cl("text-base", { "rotate-180": open })}
              aria-hidden
              title={!open ? `åpne ${heading.title}` : `lukk ${heading.title}`}
            />
          </span>
        </Detail>
      </button>

      <ul hidden={!open} className="px-2">
        {rest.map((z) => (
          <NavItem item={z} key={z._key} inDropdown onClick={onClick} />
        ))}
      </ul>
    </li>
  );
};

const Menu = ({
  heading,
  onClick,
}: {
  heading?: DsNavigationHeadingT;
  onClick?: () => void;
}): JSX.Element => {
  const lists = useMemo(() => {
    const groups = () => {
      if (!heading.menu || heading.menu.length === 0) return;

      const list = [];
      let last = 0;
      heading.menu.forEach((x, y) => {
        if (x._type === "subheading") {
          list.push(heading.menu.slice(last, y));
          last = y;
        } else if (y === heading.menu.length - 1) {
          list.push(heading.menu.slice(last, heading.menu.length));
        }
      });

      return list.filter((x) => x.length > 0);
    };
    const menulist = groups();

    return (
      <ul className="py-4 pl-6">
        {menulist
          ? menulist.map((x: DsNavigationHeadingMenuT[], y) => {
              return x[0]._type === "item" ? (
                // eslint-disable-next-line react/prop-types
                x.map((item) => (
                  <NavItem onClick={onClick} item={item} key={item._key} />
                ))
              ) : (
                <Dropdown items={x} key={y} onClick={onClick} />
              );
            })
          : null}
      </ul>
    );
  }, [heading.menu, onClick]);

  return (
    <nav aria-label={heading.title} className={cl("overflow-x-auto")}>
      {lists}
    </nav>
  );
};

export default Menu;
