import cl from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useId, useState } from "react";
import { ChevronDownIcon } from "@navikt/aksel-icons";
import { BodyShort, Detail } from "@navikt/ds-react";
import { StatusTag } from "@/web/StatusTag";
import styles from "./Sidebar.module.css";

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

/**
 * TODO:
 * - Synk with old sidebar features
 */
function Sidebar(props: SidebarProps) {
  const { sidebarData, className, ...rest } = props;

  return (
    <nav
      {...rest}
      aria-label="Sidemeny"
      className={cl(className, styles.navElement)}
    >
      <BodyShort as="ul" className={styles.rootUl} size="small">
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
  return <li aria-hidden className={styles.divider} />;
}

function SidebarGroup(props: DesignsystemSectionT) {
  const { label, links } = props;
  const id = useId();

  const isDarkside = label.toLowerCase() === "darkside";

  return (
    <li
      className={styles.navListGroup}
      data-type={isDarkside ? "darkside" : "neutral"}
    >
      <Detail as="div" className={styles.navListGroupLabel} id={id}>
        {label}
      </Detail>
      <ul aria-labelledby={id}>
        {links.map((link) => {
          if (!("pages" in link)) {
            return <SidebarItem key={link.slug} page={link} />;
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
        className={cl(styles.navListSubButton, {
          [styles.navListNotch]: isSectionActive && !open,
        })}
        data-state={isSectionActive ? "active" : "inactive"}
        aria-expanded={open}
        data-umami-event="sidebar-subnav"
        data-umami-event-kategori={title}
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
      data-state={active ? "active" : "inactive"}
      data-nested={isIndented ? "true" : undefined}
      className={styles.navListItem}
    >
      <Link
        href={`/${page.slug}`}
        className={cl(styles.navListItemLink, {
          [styles.navListNotch]: active,
        })}
        prefetch={false}
        data-current={active}
        data-umami-event="navigere"
        data-umami-event-kilde="sidebar"
      >
        <span
          className={cl(styles.navListItemInner, {
            "pl-4": isIndented,
          })}
        >
          {page.heading}
          <StatusTag size="xsmall" status={page.tag} />
        </span>
      </Link>
    </Component>
  );
}

export { Sidebar };
