import Logo from "components/assets/Logo";
import Link from "next/link";
import { logNav /* Search */ } from "../..";
import cl from "classnames";
import { useRouter } from "next/router";
import { Hamburger } from "components/layout/header/Hamburger";

const LinkElement = ({ name, href }) => {
  const { asPath } = useRouter();
  return (
    <Link href={href} passHref>
      <a
        className={cl(
          "text-text-default relative grid h-full place-items-center rounded-full px-2 focus:outline-none",
          {
            "focus:shadow-focus-gap before:bg-deepblue-700 font-semibold before:absolute before:bottom-[6px] before:z-10 before:h-1 before:w-full before:rounded-full":
              asPath.startsWith(href),
            "focus-visible:shadow-focus": !asPath.startsWith(href),
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
      </a>
    </Link>
  );
};

export const Header = ({
  variant = "default",
}: {
  variant?: "blogg" | "subtle" | "default" | "transparent";
}) => {
  return (
    <>
      <a className="skiplink" href="#hovedinnhold" tabIndex={-1}>
        Hopp til innhold
      </a>
      <header
        className={cl("h-header z-20 flex items-center", {
          "bg-surface-warning-subtle": variant === "blogg",
          "bg-surface-default": variant === "default",
          "bg-surface-subtle": variant === "subtle",
          "bg-surface-transparent": variant === "transparent",
        })}
      >
        <div className="xs:pr-6 xs:pl-4 mx-auto flex h-11 w-full max-w-7xl items-center justify-between pr-4 pl-4">
          <Link href="/" passHref>
            <a
              onClick={(e) =>
                logNav(
                  "header",
                  window.location.pathname,
                  e.currentTarget.getAttribute("href")
                )
              }
              className="focus-visible:shadow-focus grid h-full place-items-center rounded px-2 focus:outline-none"
            >
              <Logo />
              <span className="sr-only">Aksel</span>
            </a>
          </Link>
          <div className="hidden h-full gap-2 md:flex">
            <LinkElement name="God praksis" href="/god-praksis" />
            <LinkElement name="Grunnleggende" href="/grunnleggende" />
            <LinkElement name="Komponenter" href="/komponenter" />
            <LinkElement name="Bloggen" href="/produktbloggen" />
          </div>
          <div className="h-full md:hidden">
            <Hamburger />
          </div>
        </div>
      </header>
    </>
  );
};
