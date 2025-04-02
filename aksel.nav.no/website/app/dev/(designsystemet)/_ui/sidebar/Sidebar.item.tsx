"use client";

import cl from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BodyShort, Tag } from "@navikt/ds-react";
import { getStatusTag } from "@/app/_ui/theme-config";
import { SidebarPageT } from "@/types";
import styles from "./Sidebar.module.css";

function DesignsystemSidebarItem(props: {
  page: SidebarPageT;
  isIndented?: boolean;
  layout: "sidebar" | "mobile";
}) {
  const { page, isIndented = false, layout } = props;
  const pathName = usePathname();

  const active = pathName?.split("#")[0] === `/${page.slug}`;
  const statusTag = getStatusTag(page.tag, true);

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
        {statusTag && (
          <Tag
            variant="info"
            size="xsmall"
            data-color-role={statusTag.colorRole}
          >
            {statusTag.text}
          </Tag>
        )}
      </Link>
    </BodyShort>
  );
}

export { DesignsystemSidebarItem };
