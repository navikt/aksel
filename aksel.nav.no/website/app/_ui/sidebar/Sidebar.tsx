"use client";

import cl from "clsx";
import React from "react";
import { BodyShort } from "@navikt/ds-react";
import { SidebarContext } from "./Sidebar.context";
import { type DesignsystemSidebarGroupT, SidebarGroup } from "./Sidebar.group";
import styles from "./Sidebar.module.css";

type SidebarProps = {
  sidebarData: DesignsystemSidebarGroupT[];
  layout?: "sidebar" | "mobile";
} & React.HTMLAttributes<HTMLDivElement>;

function Sidebar(props: SidebarProps) {
  const { sidebarData, className, layout = "sidebar", ...rest } = props;

  return (
    <SidebarContext.Provider value={layout}>
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
                />
                {index !== sidebarData.length - 1 && (
                  <li aria-hidden className={styles.navListDivider} />
                )}
              </React.Fragment>
            );
          })}
        </BodyShort>
      </nav>
    </SidebarContext.Provider>
  );
}

export { Sidebar };
