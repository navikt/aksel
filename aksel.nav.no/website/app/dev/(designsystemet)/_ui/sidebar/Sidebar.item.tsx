"use client";

import cl from "clsx";
import { stegaClean } from "next-sanity";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SquareGridFillIcon, SquareGridIcon } from "@navikt/aksel-icons";
import { BodyShort, HStack, Tag } from "@navikt/ds-react";
import { getStatusTag } from "@/app/_ui/theming/theme-config";
import { umamiTrack } from "@/app/_ui/umami/Umami.track";
import { SidebarPageT } from "@/types";
import styles from "./Sidebar.module.css";

function DesignsystemSidebarItem(props: {
  page: SidebarPageT;
  isIndented?: boolean;
  layout: "sidebar" | "mobile";
}) {
  const { page, isIndented = false, layout } = props;
  const pathName = usePathname();

  const active = pathName?.split("#")[0] === stegaClean(`/${page.slug}`);
  const statusTag = getStatusTag(page.tag, true);

  const isOverviewPage = page.heading.toLowerCase() === "oversikt";

  return (
    <BodyShort
      as="li"
      size={layout === "sidebar" ? "small" : "medium"}
      data-state={active ? "active" : "inactive"}
      data-nested={isIndented ? "true" : undefined}
      className={styles.navListItem}
    >
      <Link
        /* TODO: Temp use /dev routing for testing */
        href={`/dev/${page.slug}`}
        className={cl(styles.navListItemLink, {
          [styles.navListNotch]: active,
        })}
        prefetch={false}
        data-current={active}
        onClick={() =>
          umamiTrack("navigere", {
            kilde: "sidebar",
            url: `/dev/${page.slug}`,
          })
        }
      >
        <HStack gap="space-4" align="center" as="span">
          {isOverviewPage &&
            (active ? (
              <SquareGridFillIcon aria-hidden />
            ) : (
              <SquareGridIcon aria-hidden />
            ))}
          {page.heading}
        </HStack>
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
