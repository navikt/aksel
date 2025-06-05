"use client";

import React, { useMemo, useState } from "react";
import { BodyShort, Search } from "@navikt/ds-react";
import {
  DesignsystemSidebarSectionT,
  SidebarGroupedPagesT,
  SidebarPageT,
} from "@/types";
import { DesignsystemSidebarGroup } from "./Sidebar.group";
import styles from "./Sidebar.module.css";
import { type DesignsystemSidebarDataT } from "./Sidebar.util";

type SidebarNavProps = {
  layout?: "sidebar" | "mobile";
  sidebarData: DesignsystemSidebarDataT;
} & React.HTMLAttributes<HTMLDivElement>;

function DesignsystemSidebarNav(props: SidebarNavProps) {
  const { layout = "sidebar", sidebarData } = props;

  const [filterText, setFilterText] = useState<string>("");

  const filteredSidebarData = useMemo(() => {
    if (!filterText) {
      return sidebarData;
    }

    const isValidHit = (value: string): boolean => {
      return value.toLowerCase().includes(filterText.toLowerCase());
    };

    const sections: DesignsystemSidebarDataT = [];

    for (const section of sidebarData) {
      const pages: SidebarPageT[] = [];

      for (const link of section.links) {
        if (!itemIsSidebarGroup(link)) {
          isValidHit(link.heading) && pages.push(link);
          continue;
        }

        if (isValidHit(link.title)) {
          pages.push(...link.pages);
          continue;
        }

        for (const page of link.pages) {
          isValidHit(page.heading) && pages.push(page);
        }
      }

      if (pages.length === 0) {
        continue;
      }

      sections.push({
        label: section.label,
        links: pages,
      });
    }

    return sections;
  }, [filterText, sidebarData]);

  return (
    <div className={styles.navList} data-layout={layout}>
      <Search
        variant="simple"
        size="small"
        label="Filtrer navigasjon"
        clearButton={false}
        value={filterText}
        onChange={setFilterText}
      />
      <nav aria-label="Sidemeny">
        <BodyShort
          as="ul"
          className={styles.navListUl}
          size={layout === "sidebar" ? "small" : "medium"}
        >
          {filteredSidebarData.map((section, index) => {
            return (
              <React.Fragment key={section.label}>
                <DesignsystemSidebarGroup
                  key={section.label}
                  label={section.label}
                  links={section.links}
                  layout={layout}
                />
                {index !== filteredSidebarData.length - 1 && (
                  <li aria-hidden className={styles.navListDivider} />
                )}
              </React.Fragment>
            );
          })}
        </BodyShort>
      </nav>
    </div>
  );
}

function itemIsSidebarGroup(
  input: DesignsystemSidebarSectionT[number],
): input is SidebarGroupedPagesT {
  return "pages" in input;
}

export { DesignsystemSidebarNav };
export type { SidebarNavProps };
