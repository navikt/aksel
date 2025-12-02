import { sanityLocalFetch } from "@/app/_sanity/live";
import {
  DESIGNSYSTEM_OVERVIEW_PAGES_QUERY,
  DESIGNSYSTEM_SIDEBAR_QUERY,
} from "@/app/_sanity/queries";
import { DesignsystemSidebarNav, SidebarNavProps } from "./Sidebar.nav";
import { generateSidebar } from "./Sidebar.util";

type SidebarProps = Omit<SidebarNavProps, "sidebarData">;

async function DesignsystemSidebar(props: SidebarProps) {
  const { layout = "sidebar" } = props;

  const sidebarData = await getSidebarData();

  return <DesignsystemSidebarNav sidebarData={sidebarData} layout={layout} />;
}

async function getSidebarData() {
  "use server";

  const [{ data: sidebar }, { data: oversikt }] = await Promise.all([
    sanityLocalFetch({
      query: DESIGNSYSTEM_SIDEBAR_QUERY,
    }),
    sanityLocalFetch({
      query: DESIGNSYSTEM_OVERVIEW_PAGES_QUERY,
    }),
  ]);

  const sidebarData = generateSidebar(sidebar, oversikt);

  return sidebarData;
}

export { DesignsystemSidebar };
