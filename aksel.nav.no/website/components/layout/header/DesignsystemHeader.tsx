import { DsNavigationHeadingT } from "@/lib";
import { Header } from "@navikt/ds-react-internal";
import cl from "classnames";
import NextLink from "next/link";
import React, { useContext } from "react";
import { logNav, PagePropsContext, Search } from "../..";
import MobileNavigation from "./menu/MobileNav";
import PortalNavigation from "./menu/PortalNav";
import ProfileDropdown from "./ProfileDropdown";

const DesignsystemHeader = (): JSX.Element => {
  const { pageProps } = useContext(PagePropsContext);

  const nonMobile = (
    <>
      <PortalNavigation title="Designsystemet" />
      <div className="z-[1050] mr-auto flex">
        {pageProps?.navigation?.headings.map(
          (heading: DsNavigationHeadingT) => (
            <NextLink
              href={`/${
                (heading.link_ref as { slug?: { current: string } })?.slug
                  ?.current
              }`}
              passHref
              key={heading.title + heading.link_ref}
            >
              <a
                onClick={(e) =>
                  logNav(
                    "header",
                    window.location.pathname,
                    e.currentTarget.getAttribute("href")
                  )
                }
                className={cl(
                  "algolia-index-heading 2lg:px-4 min-w-header flex cursor-pointer items-center justify-center whitespace-nowrap py-0 px-2 focus:outline-none",
                  {
                    "text-text-on-inverted hover:bg-gray-800 focus-visible:shadow-[inset_0_0_0_1px_var(--a-gray-900),inset_0_0_0_3px_var(--a-border-focus-on-inverted)]":
                      !(pageProps?.activeHeading?.title === heading.title),
                    "algolia-index-heading--active text-text-default bg-white hover:bg-gray-50 focus-visible:shadow-[inset_0_0_0_1px_var(--a-gray-900),inset_0_0_0_2px_var(--a-white)_,inset_0_0_0_4px_var(--a-gray-900)]":
                      pageProps?.activeHeading?.title === heading.title,
                  }
                )}
              >
                {heading.title}
              </a>
            </NextLink>
          )
        )}
      </div>
      <div className="ml-auto flex">
        <ProfileDropdown dark />
        <Search />
      </div>
    </>
  );

  const mobile = (
    <>
      <PortalNavigation title="Designsystemet" />
      <div className="ml-auto flex">
        <ProfileDropdown dark />
        <Search />
        <MobileNavigation />
      </div>
    </>
  );

  return (
    <>
      <a className="skiplink" href="#hovedinnhold" tabIndex={-1}>
        Hopp til innhold
      </a>
      <Header className="z-[1050] justify-center">
        <div
          className="h-header hidden w-full max-w-screen-2xl lg:flex"
          data-theme="light"
        >
          {nonMobile}
        </div>
        <div
          className="h-header flex w-full max-w-screen-2xl lg:hidden"
          data-theme="light"
        >
          {mobile}
        </div>
      </Header>
    </>
  );
};
export default DesignsystemHeader;
