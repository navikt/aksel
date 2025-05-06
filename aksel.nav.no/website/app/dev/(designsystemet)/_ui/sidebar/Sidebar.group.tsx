import { stegaClean } from "next-sanity";
import { useId } from "react";
import { BodyShort, Detail } from "@navikt/ds-react";
import { DesignsystemSidebarSectionT } from "@/types";
import { DesignsystemSidebarItem } from "./Sidebar.item";
import styles from "./Sidebar.module.css";
import { DesignsystemSidebarSubNav } from "./Sidebar.subnav";

type DesignsystemSidebarGroupT = {
  label: string;
  links: DesignsystemSidebarSectionT;
  layout: "sidebar" | "mobile";
};

function DesignsystemSidebarGroup(props: DesignsystemSidebarGroupT) {
  const { label, links, layout } = props;
  const id = useId();

  const isDarkside = stegaClean(label.toLowerCase()) === "darkside";

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
      </ul>
    </li>
  );
}

export { DesignsystemSidebarGroup };
export type { DesignsystemSidebarGroupT };
