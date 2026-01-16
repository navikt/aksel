"use client";

import { stegaClean } from "next-sanity";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ChevronDownIcon } from "@navikt/aksel-icons";
import { HStack } from "@navikt/ds-react";
import { umamiTrack } from "@/app/_ui/umami/Umami.track";
import { SidebarGroupedPagesT } from "@/types";
import { DesignsystemSidebarItem } from "./Sidebar.item";
import styles from "./Sidebar.module.css";

function DesignsystemSidebarSubNav(
  props: SidebarGroupedPagesT & { layout: "sidebar" | "mobile" },
) {
  const { pages, title, layout } = props;
  const pathName = usePathname();

  const isSectionActive = pages.some((page) => {
    return pathName?.split("#")[0] === stegaClean(`/${page.slug}`);
  });

  const [open, setOpen] = useState(isSectionActive);

  return (
    <li
      data-color="brand-blue"
      data-active={isSectionActive}
      className={styles.navListSub}
    >
      <button
        type="button"
        onClick={() => {
          setOpen(!open);
          umamiTrack("sidebar-subnav", {
            kategori: title,
          });
        }}
        className={`${styles.navListSubButton} ${styles.navListNotch}`}
        data-notch={isSectionActive && !open}
        data-state={isSectionActive ? "active" : "inactive"}
        data-open={open}
        aria-expanded={open}
      >
        <HStack as="span" align="center" gap="space-8">
          {title}
        </HStack>

        <ChevronDownIcon aria-hidden className={styles.navListSubButtonIcon} />
      </button>
      <ul hidden={!open}>
        {pages.map((page) => (
          <DesignsystemSidebarItem
            key={page.heading}
            page={page}
            isIndented
            layout={layout}
          />
        ))}
      </ul>
    </li>
  );
}

export { DesignsystemSidebarSubNav };
