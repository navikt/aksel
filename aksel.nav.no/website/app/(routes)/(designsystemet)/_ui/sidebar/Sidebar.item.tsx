"use client";

import cl from "clsx";
import { stegaClean } from "next-sanity";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SquareGridFillIcon, SquareGridIcon } from "@navikt/aksel-icons";
import { BodyShort, HStack, Tag } from "@navikt/ds-react";
import { useMobileNav } from "@/app/_ui/mobile-nav/MobileNav.provider";
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
  const { toggleOpen } = useMobileNav();

  const path = pathName?.split("#")[0] || "";
  const cleanedSlug = stegaClean(`/${page.slug}`);
  const statusTag = getStatusTag(page.tag, true);

  const isOverviewPage = page.heading.toLowerCase() === "oversikt";
  const pathDepth = pathName?.split("/").length;

  const isRootOverviewPage =
    isOverviewPage && cleanedSlug.split("/").length === 2;

  let active =
    path === cleanedSlug || (path.startsWith(cleanedSlug) && !isIndented);

  if (isRootOverviewPage && pathDepth !== 2) {
    active = false;
  }

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
        onNavigate={() => toggleOpen(false)}
        className={cl(styles.navListItemLink, styles.navListNotch)}
        data-notch={active}
        data-current={active}
        onClick={() =>
          umamiTrack("navigere", {
            kilde: "sidebar",
            url: `/${page.slug}`,
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
          <Tag size="xsmall" data-color={statusTag.colorRole}>
            {statusTag.text}
          </Tag>
        )}
      </Link>
    </BodyShort>
  );
}

export { DesignsystemSidebarItem };
