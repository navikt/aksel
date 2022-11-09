import NextLink from "next/link";
import React from "react";
import { logNav } from "../../..";
import AkselLogo from "../../../assets/AkselLogo";

const PortalNav = ({ title }: { title: string }) => {
  return (
    <div className="text-text-on-inverted xs:mr-8 z-[1050] mr-0 flex h-full justify-center">
      <NextLink href="/" passHref>
        <a
          onClick={(e) =>
            logNav(
              "portalnavigasjon",
              window.location.pathname,
              e.currentTarget.getAttribute("href")
            )
          }
          className="navdsi-header__button min-w-header flex items-center justify-center border-none focus:outline-none focus-visible:shadow-[inset_0_0_0_1px_var(--a-surface-inverted),inset_0_0_0_3px_var(--a-border-focus-on-inverted)]"
        >
          <span className="sr-only">Tilbake til forsiden</span>
          <AkselLogo
            focusable={false}
            className="h-7 w-7 "
            aria-hidden
            aria-label="Tilbake til forsiden"
          />
        </a>
      </NextLink>
      <NextLink href="/designsystem" passHref>
        <a
          onClick={(e) =>
            logNav(
              "portalnavigasjon",
              window.location.pathname,
              e.currentTarget.getAttribute("href")
            )
          }
          className="navdsi-header__button min-w-header flex items-center justify-center border-none focus:outline-none focus-visible:shadow-[inset_0_0_0_1px_var(--a-surface-inverted),inset_0_0_0_3px_var(--a-border-focus-on-inverted)]"
        >
          {title}
        </a>
      </NextLink>
    </div>
  );
};

export default PortalNav;
