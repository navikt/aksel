import { draftMode } from "next/headers";
import { Suspense } from "react";
import {
  type DynamicFetchOptions,
  getDynamicFetchOptions,
  sanityFetch,
} from "@/app/_sanity/live";
import {
  DESIGNSYSTEM_OVERVIEW_PAGES_QUERY,
  DESIGNSYSTEM_SIDEBAR_QUERY,
} from "@/app/_sanity/queries";
import { DesignsystemSidebarNav, type SidebarNavProps } from "./Sidebar.nav";
import { generateSidebar } from "./Sidebar.util";

type SidebarProps = Omit<SidebarNavProps, "sidebarData">;

async function DesignsystemSidebar(props: SidebarProps) {
  const { layout = "sidebar" } = props;
  const { isEnabled: isDraftMode } = await draftMode();

  if (!isDraftMode) {
    return (
      <CachedSidebar layout={layout} perspective="published" stega={false} />
    );
  }

  return (
    <Suspense fallback={null}>
      <DynamicSidebar layout={layout} />
    </Suspense>
  );
}

async function DynamicSidebar({ layout }: SidebarProps) {
  const { perspective, stega } = await getDynamicFetchOptions();
  return (
    <CachedSidebar layout={layout} perspective={perspective} stega={stega} />
  );
}

async function CachedSidebar({
  layout,
  perspective,
  stega,
}: SidebarProps & DynamicFetchOptions) {
  "use cache";

  const [{ data: sidebar }, { data: oversikt }] = await Promise.all([
    sanityFetch({
      query: DESIGNSYSTEM_SIDEBAR_QUERY,
      perspective,
      stega,
    }),
    sanityFetch({
      query: DESIGNSYSTEM_OVERVIEW_PAGES_QUERY,
      perspective,
      stega,
    }),
  ]);

  const sidebarData = generateSidebar(sidebar, oversikt);

  return <DesignsystemSidebarNav sidebarData={sidebarData} layout={layout} />;
}

export { DesignsystemSidebar };
