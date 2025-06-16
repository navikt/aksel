import { useId } from "react";
import { BodyShort, Detail, VStack } from "@navikt/ds-react";
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

  const LabelComponent = layout === "sidebar" ? Detail : BodyShort;

  return (
    <li data-layout={layout}>
      <LabelComponent
        as="div"
        className={styles.navListGroupLabel}
        id={id}
        size={layout === "sidebar" ? "medium" : "small"}
      >
        {label}
      </LabelComponent>
      <VStack gap="space-4" as="ul" aria-labelledby={id}>
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
      </VStack>
    </li>
  );
}

export { DesignsystemSidebarGroup };
export type { DesignsystemSidebarGroupT };
