import cl from "clsx";
import React from "react";
import { BodyShort } from "@navikt/ds-react";
import { sanityFetch } from "@/app/_sanity/live";
import { DESIGNSYSTEM_SIDEBAR_QUERY } from "@/app/_sanity/queries";
import { generateSidebar } from "@/utils";
import { SidebarGroup } from "./Sidebar.group";
import styles from "./Sidebar.module.css";

type SidebarProps = {
  layout?: "sidebar" | "mobile";
} & React.HTMLAttributes<HTMLDivElement>;

async function Sidebar(props: SidebarProps) {
  const { className, layout = "sidebar", ...rest } = props;

  const { data } = await sanityFetch({
    query: DESIGNSYSTEM_SIDEBAR_QUERY,
  });

  const sidebarData = [
    {
      label: "komponenter",
      links: generateSidebar(data, "komponenter"),
    },
  ];

  return (
    <nav
      {...rest}
      aria-label="Sidemeny"
      className={cl(className, styles.navList)}
    >
      <BodyShort
        as="ul"
        className={styles.navListUl}
        size={layout === "sidebar" ? "small" : "medium"}
      >
        {sidebarData.map((section, index) => {
          return (
            <React.Fragment key={section.label}>
              <SidebarGroup
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

export { Sidebar };
