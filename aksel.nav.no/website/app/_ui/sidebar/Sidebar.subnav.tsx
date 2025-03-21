"use client";

import cl from "clsx";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ChevronDownIcon } from "@navikt/aksel-icons";
import { SidebarGroupedPagesT } from "@/types";
import { SidebarItem } from "./Sidebar.item";
import styles from "./Sidebar.module.css";

function SidebarSubNav(
  props: SidebarGroupedPagesT & { layout: "sidebar" | "mobile" },
) {
  const { pages, title, layout } = props;
  const pathName = usePathname();

  const isSectionActive = pages.some((page) => {
    return pathName?.split("#")[0] === `/${page.slug}`;
  });

  /* Use this when sections are no longer default: open */
  /* const [open, setOpen] = useState(isSectionActive); */
  const [open, setOpen] = useState(true);

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
          <SidebarItem
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

export { SidebarSubNav };
