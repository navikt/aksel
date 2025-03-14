"use server";

import { useId } from "react";
import { BodyShort, Detail } from "@navikt/ds-react";
import { DesignsystemSidebarSectionT } from "@/types";
import { SidebarItem } from "./Sidebar.item";
import styles from "./Sidebar.module.css";
import { SidebarSubNav } from "./Sidebar.subnav";

type DesignsystemSidebarGroupT = {
  label: string;
  links: DesignsystemSidebarSectionT;
  layout: "sidebar" | "mobile";
};

function SidebarGroup(props: DesignsystemSidebarGroupT) {
  const { label, links, layout } = props;
  const id = useId();

  const isDarkside = label.toLowerCase() === "darkside";

  const LabelComponent = layout === "sidebar" ? Detail : BodyShort;

  return (
    <li
      className={styles.navListGroup}
      data-type={isDarkside ? "darkside" : "neutral"}
      data-layout={layout}
    >
      <LabelComponent
        as="div"
        className={styles.navListGroupLabel}
        id={id}
        size={layout === "sidebar" ? "medium" : "small"}
      >
        {label}
      </LabelComponent>
      <ul aria-labelledby={id}>
        {links.map((link) => {
          if (!("pages" in link)) {
            return <SidebarItem key={link.slug} page={link} layout={layout} />;
          }

          return (
            <SidebarSubNav
              key={link.title}
              pages={link.pages}
              title={link.title}
              value={link.value}
              layout={layout}
            />
          );
        })}
      </ul>
    </li>
  );
}

export { SidebarGroup };
export type { DesignsystemSidebarGroupT };
