import { BodyShort, Detail } from "@navikt/ds-react";
import cl from "classnames";
import NextLink from "next/link";
import React, { useContext, useState, useEffect } from "react";
import { logNav, PagePropsContext } from "../..";
import { DsNavigationHeadingMenuT, DsNavigationHeadingT } from "@/lib";

const Menu = ({
  heading,
  onClick,
  inCategory,
  className,
}: {
  heading?: DsNavigationHeadingT;
  onClick?: () => void;
  inCategory?: boolean;
  className?: string;
}): JSX.Element => {
  const { pageProps } = useContext<any>(PagePropsContext);

  const [sidebarMenu, setSidebarMenu] = useState<DsNavigationHeadingMenuT[]>(
    []
  );

  useEffect(() => {
    if (!heading || !heading?.menu) return;
    setSidebarMenu([...heading.menu]);
  }, [heading]);

  return (
    <nav
      aria-label={heading.title}
      className={cl(className, "overflow-x-auto")}
    >
      <BodyShort as="ul">
        {sidebarMenu.map((item, x) => {
          if (item._type === "subheading") {
            return (
              <Detail
                as="li"
                size="small"
                key={item.title + x}
                className="text-text before:bg-divider relative mt-6 pt-7 pr-4 pb-[14px] pl-8 uppercase before:absolute before:top-0 before:left-auto before:right-auto before:h-[1px] before:w-9/12 first:mt-0 first:pt-[14px] first:before:bg-transparent"
              >
                {item.title}
              </Detail>
            );
          }
          return (
            <li
              key={item.title + x}
              className={cl(
                "focus-within:shadow-focus-inset hover:bg-canvas-background",
                {
                  "rounded-b": inCategory,
                  "bg-canvas-background":
                    pageProps?.page?.slug === item?.link?.slug?.current,
                }
              )}
            >
              <NextLink href={`/${item.link.slug.current}`} passHref>
                <a
                  onClick={(e) => {
                    onClick && onClick();
                    logNav(
                      "meny",
                      window.location.pathname,
                      e.currentTarget.getAttribute("href")
                    );
                  }}
                  className={cl(
                    "hover:text-text flex py-3 pr-4 no-underline focus:outline-none",
                    {
                      "text-text border-l-[6px] border-l-gray-900 pl-[26px] font-semibold":
                        pageProps?.page?.slug === item?.link?.slug?.current,
                      "text-text-muted pl-8": !(
                        pageProps?.page?.slug === item?.link?.slug?.current
                      ),
                    }
                  )}
                >
                  {item.title}
                </a>
              </NextLink>
            </li>
          );
        })}
      </BodyShort>
    </nav>
  );
};

export default Menu;
