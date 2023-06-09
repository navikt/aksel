import { AkselSidebarT } from "@/types";
import { logNav } from "@/utils";
import { ChevronDownIcon } from "@navikt/aksel-icons";
import { Detail, Tag } from "@navikt/ds-react";
import cl from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useSection } from "./use-sections";

const NavItem = ({
  link,
  asPath,
}: {
  link: { heading: string; slug: string; kategori: string; tag?: string };
  asPath: string;
}) => {
  const isActive = asPath === `/${link.slug}`;
  return (
    <li>
      <Link
        href={`/${link.slug}`}
        onClick={(e) => {
          logNav(
            "meny",
            window.location.pathname,
            e.currentTarget.getAttribute("href")
          );
        }}
        className={cl(
          "hover:text-deepblue-800 focus-visible:shadow-focus text-medium relative  flex overflow-hidden rounded-sm py-1 pl-4 pr-2 leading-snug before:rounded-full hover:before:transition-colors focus:outline-none",
          {
            "before:border-l-border-action-selected before:absolute before:left-0 before:top-1/2 before:h-6 before:-translate-y-1/2 before:border-l-[4px]":
              isActive,
            "text-deepblue-800 font-semibold": isActive,
            "text-text-subtle": !isActive,
            "before:absolute before:left-0 before:h-full before:border-l before:border-l-gray-200 hover:before:top-1/2  hover:before:h-6 hover:before:-translate-y-1/2 hover:before:border-l-2 hover:before:border-l-gray-400":
              !isActive,
          }
        )}
      >
        {link.heading}
        <span className="ml-auto capitalize">
          {link.tag && ["deprecated", "beta", "new"].includes(link.tag) && (
            <Tag
              size="xsmall"
              variant={
                link.tag === "beta"
                  ? "alt1"
                  : link.tag === "deprecated"
                  ? "neutral"
                  : "info"
              }
              className={cl({
                "border-violet-300 bg-violet-50": link.tag === "beta",
              })}
            >
              {link.tag === "new"
                ? "ny"
                : link.tag === "deprecated"
                ? "Avviklet"
                : link.tag}
            </Tag>
          )}
        </span>
      </Link>
    </li>
  );
};

const Dropdown = ({
  title,
  links,
}: {
  title: string;
  links: AkselSidebarT;
}) => {
  const [open, setOpen] = useState(true);
  const { asPath } = useRouter();

  return (
    <li className="peer w-full peer-data-[open=true]:mt-6" data-open={open}>
      <button
        onClick={() => setOpen((x) => !x)}
        className="min-h-8 text-text-subtle hover:text-deepblue-800 group z-10 flex w-full cursor-pointer items-center justify-between focus:outline-none"
        aria-expanded={open}
      >
        <Detail
          as="span"
          className="group-focus-visible:shadow-focus group-hover:bg-surface-neutral-subtle group-active:bg-bg-surface-neutral-subtle-hover mt-6 flex w-full items-center justify-between rounded-sm pl-2 font-semibold transition first:mt-0"
        >
          {title}
          <span className="flex h-6 w-6  items-center justify-center rounded">
            <ChevronDownIcon
              className={cl("text-base", { "rotate-180": open })}
              aria-hidden
              title={!open ? `åpne ${title}` : `lukk ${title}`}
            />
          </span>
        </Detail>
      </button>

      <ul hidden={!open} className="pl-2">
        {links.map((z) => (
          <NavItem link={z} key={z?.heading} asPath={asPath} />
        ))}
      </ul>
    </li>
  );
};

export const Sidebar = ({
  kategori,
  links,
}: {
  kategori: "Komponenter" | "Grunnleggende";
  links: AkselSidebarT;
}) => {
  const sections = useSection({ kategori, links });

  return (
    <div
      data-testid="ds-sidebar"
      className="toc-ignore w-sidebar bg-surface-default z-[1002] hidden shrink-0 self-start overflow-x-auto pb-8 pl-6 pr-2 md:block"
    >
      <nav aria-label={kategori}>
        <ul>
          {sections.map((kat) => (
            <Dropdown links={kat.pages} title={kat.title} key={kat.title} />
          ))}
        </ul>
      </nav>
    </div>
  );
};
