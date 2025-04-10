import React from "react";
import { BodyShort } from "@navikt/ds-react";
import { sanityFetch } from "@/app/_sanity/live";
import {
  DESIGNSYSTEM_OVERVIEW_PAGES_QUERY,
  DESIGNSYSTEM_SIDEBAR_QUERY,
} from "@/app/_sanity/queries";
import { DesignsystemSidebarGroup } from "./Sidebar.group";
import styles from "./Sidebar.module.css";
import { generateSidebar } from "./Sidebar.util";

type SidebarProps = {
  layout?: "sidebar" | "mobile";
} & React.HTMLAttributes<HTMLDivElement>;

async function DesignsystemSidebar(props: SidebarProps) {
  const { layout = "sidebar" } = props;

  const sidebarData = await getSidebarData();

  return (
    <nav aria-label="Sidemeny" className={styles.navList} data-layout={layout}>
      <BodyShort
        as="ul"
        className={styles.navListUl}
        size={layout === "sidebar" ? "small" : "medium"}
      >
        {sidebarData.map((section, index) => {
          return (
            <React.Fragment key={section.label}>
              <DesignsystemSidebarGroup
                key={section.label}
                label={section.label}
                links={section.links}
                layout={layout}
              />
              {index !== sidebarData.length - 1 && (
                <li aria-hidden className={styles.navListDivider} />
              )}
            </React.Fragment>
          );
        })}
      </BodyShort>
    </nav>
  );
}

async function getSidebarData() {
  "use server";

  const [{ data: sidebar }, { data: oversikt }] = await Promise.all([
    sanityFetch({
      query: DESIGNSYSTEM_SIDEBAR_QUERY,
    }),
    sanityFetch({
      query: DESIGNSYSTEM_OVERVIEW_PAGES_QUERY,
    }),
  ]);

  const sidebarData = generateSidebar(sidebar, oversikt);

  return sidebarData;
}

export { DesignsystemSidebar };
