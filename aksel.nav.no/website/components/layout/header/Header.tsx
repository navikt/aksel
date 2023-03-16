import Logo from "components/assets/Logo";
import Link from "next/link";
import { logNav } from "../..";
import cl from "clsx";
import { useRouter } from "next/router";
import { Hamburger } from "components/layout/header/Hamburger";
import { GlobalSearch } from "./search";

const LinkElement = ({ name, href, prefetch = undefined }) => {
  const { asPath } = useRouter();
  return (
    <li>
      <Link
        href={href}
        prefetch={prefetch}
        className={cl(
          "text-deepblue-800 focus-visible:shadow-focus relative grid h-11 place-items-center rounded px-2 focus:outline-none",
          {
            "before:bg-border-action-selected font-semibold before:absolute before:bottom-[1px] before:z-10 before:h-1 before:w-[calc(100%_-_16px)] before:rounded-full":
              asPath.startsWith(href),
            "hover:before:bg-border-subtle-hover before:absolute before:bottom-[1px] before:z-10 before:h-1 before:w-[calc(100%_-_16px)] before:rounded-full":
              !asPath.startsWith(href),
          }
        )}
        onClick={(e) =>
          logNav(
            "header",
            window.location.pathname,
            e.currentTarget.getAttribute("href")
          )
        }
      >
        {name}
      </Link>
    </li>
  );
};

export const Header = ({
  variant = "default",
}: {
  variant?: "blogg" | "subtle" | "default" | "transparent";
}) => {
  return (
    <>
      <a className="skiplink" href="#hovedinnhold">
        Hopp til innhold
      </a>
      <header
        className={cl("h-header z-20", {
          "bg-[#FEFCE9]": variant === "blogg",
          "bg-surface-default": variant === "default",
          "bg-surface-subtle": variant === "subtle",
          "bg-surface-transparent": variant === "transparent",
        })}
      >
        <div
          className={cl(
            "mx-auto flex h-full max-w-screen-2xl items-center pr-4 lg:pr-6"
          )}
        >
          <div className="flex h-11 items-center pr-4 pl-4 sm:pr-6 sm:pl-4">
            <Link
              href="/"
              passHref
              onClick={(e) =>
                logNav(
                  "header",
                  window.location.pathname,
                  e.currentTarget.getAttribute("href")
                )
              }
              className="focus-visible:shadow-focus grid h-full place-items-center rounded px-2 focus:outline-none"
            >
              <Logo className="text-deepblue-800" />
              <span className="sr-only">Aksel</span>
            </Link>
          </div>
          <nav
            className="ml-auto hidden h-full pr-2 lg:block lg:pr-8"
            aria-label="Hovedmeny"
          >
            <ul className="hidden h-full items-center gap-2 md:flex">
              <LinkElement name="God praksis" href="/god-praksis" />
              <LinkElement name="Grunnleggende" href="/grunnleggende" />
              <LinkElement name="Ikoner" href="/ikoner" prefetch={false} />
              <LinkElement name="Komponenter" href="/komponenter" />
              <LinkElement name="Bloggen" href="/produktbloggen" />
            </ul>
          </nav>
          <GlobalSearch />
          <div className="mr-2 h-full lg:hidden">
            <Hamburger />
          </div>
        </div>
      </header>
    </>
  );
};
