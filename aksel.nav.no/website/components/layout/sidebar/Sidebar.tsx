import { amplitudeLogNavigation } from "@/logging";
import { AkselSidebarT } from "@/types";
import {
  ChevronDownIcon,
  SparklesIcon,
  TestFlaskIcon,
  TrashIcon,
} from "@navikt/aksel-icons";
import { Detail } from "@navikt/ds-react";
import cl from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useSection } from "./useSection";

const NavItem = ({
  link,
}: {
  link: { heading: string; slug: string; kategori: string; tag?: string };
}) => {
  const { asPath } = useRouter();
  const isActive = asPath.split("#")[0] === `/${link.slug}`;

  return (
    <li>
      <Link
        aria-current={isActive ? "page" : undefined}
        href={`/${link.slug}`}
        onClick={(e) => {
          amplitudeLogNavigation("meny", e.currentTarget.getAttribute("href"));
        }}
        className={cl(
          "hover:text-deepblue-800 focus-visible:shadow-focus text-medium pr-05 relative flex overflow-hidden py-1 pl-4 leading-snug before:rounded-full hover:before:transition-colors focus:outline-none focus-visible:z-10 focus-visible:rounded-sm",
          {
            "before:border-l-border-action-selected before:absolute before:left-0 before:top-1/2 before:h-6 before:-translate-y-1/2 before:border-l-[4px]":
              isActive,
            "text-deepblue-800 font-semibold": isActive,
            "text-text-subtle": !isActive,
            "before:absolute before:left-0 before:top-0 before:h-full before:border-l before:border-l-gray-200 hover:before:top-1/2  hover:before:h-6 hover:before:min-h-[70%] hover:before:-translate-y-1/2 hover:before:border-l-2 hover:before:border-l-gray-400":
              !isActive,
          }
        )}
      >
        {link.heading}
        <span className="ml-auto capitalize">
          {link?.tag === "beta" && (
            <TestFlaskIcon
              aria-hidden
              className="text-violet-800"
              fontSize="1.25rem"
            />
          )}
          {link?.tag === "new" && (
            <SparklesIcon
              aria-hidden
              className="text-lightblue-700"
              fontSize="1.25rem"
            />
          )}
          {link?.tag === "deprecated" && (
            <TrashIcon
              aria-hidden
              className="text-text-default"
              fontSize="1.25rem"
            />
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

  return (
    <li className="peer w-full peer-data-[open=true]:mt-6" data-open={open}>
      <button
        onClick={() => setOpen((x) => !x)}
        className="min-h-8 text-text-subtle hover:text-deepblue-800 group z-10 flex w-full cursor-pointer items-center justify-between focus:outline-none"
        aria-expanded={open}
      >
        <Detail
          as="span"
          className="group-focus-visible:shadow-focus group-hover:bg-surface-neutral-subtle group-active:bg-surface-neutral-subtle-hover mt-6 flex w-full items-center justify-between rounded-sm pl-2 font-semibold transition-colors first:mt-0"
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
          <NavItem link={z} key={z?.heading} />
        ))}
      </ul>
    </li>
  );
};

export const Sidebar = ({
  kategori,
  links,
}: {
  kategori: "komponenter" | "grunnleggende" | "templates";
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
