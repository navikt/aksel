"use client";

import { stegaClean } from "next-sanity";
import { usePathname } from "next/navigation";
import { SquareGridFillIcon, SquareGridIcon } from "@navikt/aksel-icons";
import { Events } from "@navikt/analytics-types";
import { BodyShort, HStack, Tag } from "@navikt/ds-react";
import { useMobileNav } from "@/app/_ui/mobile-nav/MobileNav.provider";
import { NextLink } from "@/app/_ui/next-link/NextLink";
import { getStatusTag } from "@/app/_ui/theming/theme-config";
import { umamiTrack } from "@/app/_ui/umami/Umami.track";
import type { SidebarPageT } from "@/types";
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
  const active =
    path === cleanedSlug ||
    (!isOverviewPage && path.startsWith(`${cleanedSlug}/`)); // Needed for Endringslogg

  return (
    <BodyShort
      as="li"
      size={layout === "sidebar" ? "small" : "medium"}
      data-state={active ? "active" : "inactive"}
      data-nested={isIndented ? "true" : undefined}
      className={styles.navListItem}
    >
      <NextLink
        href={`/${page.slug}`}
        onNavigate={() => toggleOpen(false)}
        className={`${styles.navListItemLink} ${styles.navListNotch}`}
        data-notch={active}
        data-current={active}
        aria-current={active ? "page" : undefined}
        onClick={() =>
          umamiTrack(Events.NAVIGERE, {
            lenketekst: page.heading,
            destinasjon: `/${page.slug}`,
            lenkegruppe: "sidebar",
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
      </NextLink>
    </BodyShort>
  );
}

export { DesignsystemSidebarItem };
