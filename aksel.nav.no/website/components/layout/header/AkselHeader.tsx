import cl from "classnames";
import NextLink from "next/link";
import React from "react";
import { logNav, Search } from "../..";
import AkselLogo from "../../assets/AkselLogo";
import ProfileDropdown from "./ProfileDropdown";

const AkselHeader = ({
  variant,
}: {
  variant?: "forside" | "artikkel" | "blogg" | "inngang";
}): JSX.Element => {
  return (
    <header
      className={cl(
        "shadow-header group sticky top-0 z-20 w-full backdrop-blur transition-colors duration-200 ease-out",
        {
          "header-aksel-forside bg-deepblue-900/90 hover:bg-deepblue-900 text-white":
            variant === "forside",
          "header-aksel-artikkel text-deepblue-800 bg-gray-50/80":
            variant === "artikkel",
          "header-aksel-artikkel text-deepblue-800 bg-white/80":
            variant === "inngang",
          "header-aksel-artikkel text-deepblue-800 bg-orange-50/80 ":
            variant === "blogg",
        }
      )}
    >
      <div className="dynamic-wrapper flex justify-between">
        <a className="skiplink" href="#hovedinnhold" tabIndex={-1}>
          Hopp til innhold
        </a>

        <NextLink href="/" passHref>
          <a
            className={cl("flex gap-3 px-4 py-3 focus:outline-none", {
              "focus-visible:shadow-focus-inverted-inset hover:bg-gray-100/10":
                variant === "forside",
              "focus-visible:shadow-focus-inset hover:bg-gray-900/10":
                variant === "artikkel" || variant === "blogg",
            })}
            onClick={(e) =>
              logNav(
                "header",
                window.location.pathname,
                e.currentTarget.getAttribute("href")
              )
            }
          >
            <AkselLogo className="h-7 w-7" aria-hidden />
            <span className="text-2xl">Aksel</span>
          </a>
        </NextLink>
        <span className="flex">
          <ProfileDropdown dark={variant === "forside"} />
          <Search
            variant={variant === "forside" ? "aksel-inverted" : "aksel"}
          />
        </span>
      </div>
      <style jsx global>{`
        .search-open .header-aksel-forside {
          background-color: var(--a-deepblue-900);
        }

        .search-open .header-aksel-artikkel {
          background-color: var(--a-gray-50);
        }
      `}</style>
    </header>
  );
};

export default AkselHeader;
