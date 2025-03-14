"use client";

import cl from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BodyShort } from "@navikt/ds-react";
import { SidebarPageT } from "@/types";
import { StatusTag } from "@/web/StatusTag";
import { useSidebarLayout } from "./Sidebar.context";
import styles from "./Sidebar.module.css";

function SidebarItem(props: { page: SidebarPageT; isIndented?: boolean }) {
  const { page, isIndented = false } = props;
  const pathName = usePathname();

  const layout = useSidebarLayout();

  const active = pathName?.split("#")[0] === `/${page.slug}`;

  return (
    <BodyShort
      as="li"
      size={layout === "sidebar" ? "small" : "medium"}
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
        {page.heading}
        <StatusTag size="xsmall" status={page.tag} />
      </Link>
    </BodyShort>
  );
}

export { SidebarItem };
