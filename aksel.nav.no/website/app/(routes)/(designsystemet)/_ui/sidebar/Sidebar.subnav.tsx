"use client";

import cl from "clsx";
import { stegaClean } from "next-sanity";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ChevronDownIcon, SparklesIcon } from "@navikt/aksel-icons";
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

  const isDarkside = title.toLowerCase() === "darkside";

  const isSectionActive = pages.some((page) => {
    return pathName?.split("#")[0] === stegaClean(`/${page.slug}`);
  });

  const [open, setOpen] = useState(isSectionActive);

  return (
    <li
      data-color={isDarkside ? "brand-magenta" : "brand-blue"}
      data-active={isSectionActive}
      className={styles.navListSub}
    >
      <button
        onClick={() => {
          setOpen(!open);
          umamiTrack("sidebar-subnav", {
            kategori: title,
          });
        }}
        className={cl(styles.navListSubButton, styles.navListNotch)}
        data-notch={isSectionActive && !open}
        data-state={isSectionActive ? "active" : "inactive"}
        data-highlight={isDarkside}
        data-open={open}
        aria-expanded={open}
      >
        <HStack as="span" align="center" gap="space-8">
          {title}
          {isDarkside && <SparklesIcon aria-hidden />}
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
