"use client";

import React, { useId, useMemo, useState } from "react";
import { BodyShort, Detail, Search, VStack } from "@navikt/ds-react";
import {
  DesignsystemSidebarSectionT,
  SidebarGroupedPagesT,
  SidebarPageT,
} from "@/types";
import { DesignsystemSidebarItem } from "./Sidebar.item";
import styles from "./Sidebar.module.css";
import { DesignsystemSidebarSubNav } from "./Sidebar.subnav";
import { type DesignsystemSidebarDataT } from "./Sidebar.util";

type SidebarNavProps = {
  layout?: "sidebar" | "mobile";
  sidebarData: DesignsystemSidebarDataT;
};

function DesignsystemSidebarNav(props: SidebarNavProps) {
  const { layout = "sidebar", sidebarData } = props;

  const [filterText, setFilterText] = useState<string>("");
  const id = useId();

  const LabelComponent = layout === "sidebar" ? Detail : BodyShort;

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
          isValidHit(page.heading) &&
            pages.push({
              ...page,
              heading:
                page.heading === "Oversikt"
                  ? `${page.heading} (${link.title})`
                  : page.heading,
            });
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
        size={layout === "sidebar" ? "small" : "medium"}
        label="Filtrer navigasjon"
        clearButton={false}
        onChange={setFilterText}
        autoComplete="off"
      />
      <nav aria-label="Sidemeny" data-layout={layout}>
        <VStack gap="space-24" asChild>
          <BodyShort
            as="ul"
            className={styles.navListUl}
            size={layout === "sidebar" ? "small" : "medium"}
            data-color="brand-blue"
          >
            {filteredSidebarData.map((section, index) => {
              return (
                <li data-layout={layout} key={section.label}>
                  <LabelComponent
                    as="div"
                    className={styles.navListGroupLabel}
                    id={`${id}-${index}`}
                    size={layout === "sidebar" ? "medium" : "small"}
                  >
                    {section.label}
                  </LabelComponent>
                  <VStack
                    gap="space-4"
                    as="ul"
                    aria-labelledby={`${id}-${index}`}
                  >
                    {section.links.map((link) => {
                      if (!("pages" in link)) {
                        return (
                          <DesignsystemSidebarItem
                            key={link.slug}
                            page={link}
                            layout={layout}
                          />
                        );
                      }

                      return (
                        <DesignsystemSidebarSubNav
                          key={link.title}
                          pages={link.pages}
                          title={link.title}
                          value={link.value}
                          layout={layout}
                        />
                      );
                    })}
                  </VStack>
                </li>
              );
            })}
          </BodyShort>
        </VStack>
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
