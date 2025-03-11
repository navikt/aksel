import cl from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useId, useState } from "react";
import { ChevronDownIcon } from "@navikt/aksel-icons";
import { BodyShort, Detail } from "@navikt/ds-react";

type SidebarInputNodeT = {
  heading: string;
  slug: string;
  kategori: string;
  tag: "beta" | "new" | "ready" | "deprecated";
  sidebarindex: number | null;
};

type SidebarPageT = Pick<SidebarInputNodeT, "heading" | "slug" | "tag">;

type SidebarGroupedPagesT = {
  title: string;
  value: string;
  pages: SidebarPageT[];
};

type DesignsystemSectionT = {
  label: string;
  links: (SidebarPageT | SidebarGroupedPagesT)[];
};

type SidebarProps = {
  sidebarData: DesignsystemSectionT[];
} & React.HTMLAttributes<HTMLDivElement>;

const NotchClasses =
  "before:bg-ax-bg-brand-blue-strong before:absolute before:-left-2 before:top-1/2 before:h-[calc(100%-8px)] before:w-[3px] before:-translate-y-1/2 before:rounded-full";

/**
 * TODO:
 * - Synk with old sidebar features
 * - Add support for tags
 * - Add support for darkside colored group
 */
function Sidebar(props: SidebarProps) {
  const { sidebarData, className, ...rest } = props;

  return (
    <nav
      {...rest}
      aria-label="Sidemeny"
      className={cl(className, "relative w-sidebar shrink-0 self-start px-2")}
    >
      <BodyShort as="ul" className="space-y-3" size="small">
        {sidebarData.map((section, index) => {
          return (
            <React.Fragment key={section.label}>
              <SidebarGroup
                key={section.label}
                label={section.label}
                links={section.links}
              />
              {index !== sidebarData.length - 1 && <SidebarDivider />}
            </React.Fragment>
          );
        })}
      </BodyShort>
    </nav>
  );
}

function SidebarDivider() {
  return (
    <li
      aria-hidden
      className="h-px w-full border-t border-ax-border-neutral-subtle"
    />
  );
}

function SidebarGroup(props: DesignsystemSectionT) {
  const { label, links } = props;
  const id = useId();
  return (
    <li>
      <Detail
        as="div"
        weight="semibold"
        className="py-0.5 pl-2 text-ax-text-neutral-subtle"
        id={id}
      >
        {label}
      </Detail>
      <ul aria-labelledby={id}>
        {links.map((link) => {
          if (!("pages" in link)) {
            return <SidebarItem key={link.heading} page={link} />;
          }

          return (
            <SidebarSubNav
              key={link.title}
              pages={link.pages}
              title={link.title}
              value={link.value}
            />
          );
        })}
      </ul>
    </li>
  );
}

function SidebarSubNav(props: SidebarGroupedPagesT) {
  const { pages, title } = props;
  const [open, setOpen] = useState(false);
  const { asPath } = useRouter();

  const isActive = (slug: string) => {
    return asPath.split("#")[0] === `/${slug}`;
  };

  const isSectionActive = pages.some((page) => isActive(page.slug));

  return (
    <li>
      <button
        onClick={() => setOpen(!open)}
        className={cl(
          "focus-preset-tight relative flex w-full items-center justify-between self-stretch rounded-medium py-1 pl-2 pr-1 leading-5 hover:bg-ax-bg-neutral-moderate-hoverA",
          isSectionActive && !open && NotchClasses,
          {
            "bg-ax-bg-neutral-moderate": isSectionActive && !open,
          },
        )}
        aria-expanded={open}
      >
        {title}
        <ChevronDownIcon aria-hidden />
      </button>
      <ul hidden={!open}>
        {pages.map((page) => (
          <SidebarItem key={page.heading} page={page} isIndented />
        ))}
      </ul>
    </li>
  );
}

function SidebarItem(props: { page: SidebarPageT; isIndented?: boolean }) {
  const { page, isIndented = false } = props;
  const { asPath } = useRouter();

  const isActive = (slug: string) => {
    return asPath.split("#")[0] === `/${slug}`;
  };

  const active = isActive(page.slug);

  const Component = isIndented ? Detail : BodyShort;
  return (
    <Component
      as="li"
      size={isIndented ? "medium" : "small"}
      className="group relative leading-5"
    >
      <Link
        href={`/${page.slug}`}
        className={cl(
          "focus-preset-tight block rounded-medium py-0.5",
          active && NotchClasses,
          {
            "font-bold": active,
          },
        )}
      >
        <span
          className={cl("block rounded-medium px-2 py-1", {
            "bg-ax-bg-brand-blue-moderateA text-ax-text-brand-blue group-hover:bg-ax-bg-brand-blue-moderate-hoverA":
              active,
            "group-hover:bg-ax-bg-neutral-moderate-hoverA": !active,
            "pl-4": isIndented,
          })}
        >
          {page.heading}
        </span>
      </Link>
    </Component>
  );
}

export { Sidebar };
