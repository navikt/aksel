import { useId } from "react";
import { BodyShort, Detail } from "@navikt/ds-react";
import { DesignsystemSidebarSectionT } from "@/types";
import { useSidebarLayout } from "./Sidebar.context";
import { SidebarItem } from "./Sidebar.item";
import styles from "./Sidebar.module.css";
import { SidebarSubNav } from "./Sidebar.subnav";

type DesignsystemSidebarGroupT = {
  label: string;
  links: DesignsystemSidebarSectionT;
};

function SidebarGroup(props: DesignsystemSidebarGroupT) {
  const { label, links } = props;
  const id = useId();
  const layout = useSidebarLayout();

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
            return <SidebarItem key={link.slug} page={link} />;
          }

          return (
            <SidebarSubNav
              key={link.title}
              pages={link.pages}
              title={link.title}
              value={link.value}
            />
          );
        })}
      </ul>
    </li>
  );
}

export { SidebarGroup };
export type { DesignsystemSidebarGroupT };
