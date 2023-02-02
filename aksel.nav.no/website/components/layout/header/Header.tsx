import Logo from "components/assets/Logo";
import Link from "next/link";
import { logNav } from "../..";
import cl from "clsx";
import { useRouter } from "next/router";
import { Hamburger } from "components/layout/header/Hamburger";
import { GlobalSearch } from "./search";

const LinkElement = ({ name, href }) => {
  const { asPath } = useRouter();
  return (
    <li>
      <Link href={href} passHref>
        <a
          className={cl(
            "text-deepblue-800 focus-visible:shadow-focus relative grid h-full place-items-center rounded focus:outline-none",
            {
              "before:bg-border-action-selected font-semibold before:absolute before:bottom-[0px] before:z-10 before:h-1 before:w-full before:rounded-full":
                asPath.startsWith(href),
              "hover:before:bg-border-subtle-hover before:absolute before:bottom-[4px] before:z-10 before:h-1 before:w-full before:rounded-full":
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
        </a>
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
        <div className="mx-auto flex h-full max-w-screen-2xl items-center justify-between pr-6 pt-4">
          <div className="xs:pr-6 xs:pl-4  flex h-11  items-center pr-4 pl-4">
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

            <div className="ml-auto h-full md:hidden">
              <Hamburger />
            </div>
          </div>
          <nav
            className="ml-auto hidden h-full pr-8 md:block"
            aria-label="Hovedmeny"
          >
            <ul className="hidden h-full gap-4 md:flex">
              <LinkElement name="God praksis" href="/god-praksis" />
              <LinkElement name="Grunnleggende" href="/grunnleggende" />
              <LinkElement name="Komponenter" href="/komponenter" />
              <LinkElement name="Bloggen" href="/produktbloggen" />
            </ul>
          </nav>
          <GlobalSearch />
        </div>
      </header>
    </>
  );
};
