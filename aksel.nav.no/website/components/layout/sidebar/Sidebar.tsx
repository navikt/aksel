import { SidebarT } from "@/lib";
import { logNav } from "@/utils";
import { Expand } from "@navikt/ds-icons";
import { BodyShort, Detail, Tag } from "@navikt/ds-react";
import cl from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";
import {
  grunnleggendeKategorier,
  komponentKategorier,
} from "../../../sanity/config";

const NavItem = ({
  link,
  asPath,
}: {
  link: { heading: string; slug: string; kategori: string; tag?: string };
  asPath: string;
}) => {
  const isActive = asPath === `/${link.slug}`;
  return (
    <li
      className={cl(
        "focus-within:shadow-focus peer relative rounded-sm pl-2 before:absolute before:left-0 before:z-[-1]",
        {
          "before:border-l-border-action-selected  before:top-1/2 before:h-6 before:-translate-y-1/2 before:rounded-full before:border-l-[4px]":
            isActive,
          "before:h-full before:rounded-full before:border-l before:border-l-gray-200 hover:before:top-1/2 hover:before:h-6 hover:before:-translate-y-1/2 hover:before:border-l-2 hover:before:border-l-gray-400":
            !isActive,
        }
      )}
    >
      <Link href={`/${link.slug}`} passHref>
        <BodyShort
          as="a"
          size="small"
          onClick={(e) => {
            logNav(
              "meny",
              window.location.pathname,
              e.currentTarget.getAttribute("href")
            );
          }}
          className={cl(
            "hover:text-deepblue-800 relative flex overflow-hidden px-2 py-[6px] no-underline focus:outline-none",
            {
              "text-deepblue-800 font-semibold": isActive,
              "text-text-subtle": !isActive,
            }
          )}
        >
          {link.heading}
          <span className="ml-2 capitalize">
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
        </BodyShort>
      </Link>
    </li>
  );
};

const Dropdown = ({ title, links }: { title: string; links: SidebarT }) => {
  const [open, setOpen] = useState(true);
  const { asPath } = useRouter();

  return (
    <li className="sidebar-dropdown w-full" data-open={open}>
      <button
        onClick={() => setOpen((x) => !x)}
        className="min-h-8 text-text-subtle hover:text-deepblue-800 group z-10 flex w-full cursor-pointer items-center justify-between pr-2 focus:outline-none"
        aria-expanded={open}
      >
        <Detail
          as="span"
          className="group-focus-visible:shadow-focus group-hover:bg-surface-neutral-subtle group-active:bg-bg-surface-neutral-subtle-hover mt-6 flex w-full items-center justify-between rounded-sm pl-2 font-semibold first:mt-0"
        >
          {title}
          <span className="flex h-6 w-6 items-center justify-center rounded">
            <Expand
              className={cl("text-base", { "rotate-180": open })}
              aria-hidden
              title={!open ? `åpne ${title}` : `lukk ${title}`}
            />
          </span>
        </Detail>
      </button>

      <ul hidden={!open} className="px-2">
        {links.map((z) => (
          <NavItem link={z} key={z?.heading} asPath={asPath} />
        ))}
      </ul>
      <style jsx>{`
        .sidebar-dropdown[data-open="true"] + .sidebar-dropdown {
          margin-top: var(--a-spacing-6);
        }
      `}</style>
    </li>
  );
};

export const Sidebar = ({
  kategori,
  links,
}: {
  kategori: "Komponenter" | "Grunnleggende";
  links: SidebarT;
}) => {
  const sections = useMemo(
    () =>
      (kategori === "Komponenter"
        ? komponentKategorier
        : grunnleggendeKategorier
      )
        .map((x) => ({
          ...x,
          pages: links
            .filter((y) => y?.kategori === x.value)
            .sort((a, b) => {
              if (a?.tag === "deprecated" && b?.tag === "deprecated") {
                return 0;
              } else if (a?.tag === "deprecated") {
                return 1;
              } else if (b.tag === "deprecated") {
                return -1;
              }

              return a?.heading.localeCompare(b?.heading);
            }),
        }))
        .filter((x) => !(!x.pages || x.pages.length === 0)),
    [links, kategori]
  );

  return (
    <div
      data-testid="ds-sidebar"
      className="algolia-ignore-index w-sidebar bg-surface-default z-[1002] hidden shrink-0 self-start pb-4 md:block"
    >
      <nav aria-label={kategori} className={cl("overflow-x-auto")}>
        <ul className="pb-4 pl-6">
          {sections.map((kat) => (
            <Dropdown links={kat.pages} title={kat.title} key={kat.title} />
          ))}
        </ul>
      </nav>
    </div>
  );
};
