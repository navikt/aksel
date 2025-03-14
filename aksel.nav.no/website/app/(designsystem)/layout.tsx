"use server";

import { sanityFetch } from "@/app/_sanity/live";
import { Header } from "@/app/_ui/header/Header";
import { Sidebar } from "@/layout/sidebar/Sidebar";
import { generateSidebar } from "@/utils";
import { DESIGNSYSTEM_SIDEBAR_QUERY } from "../_sanity/queries";

export default async function DesignsystemLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data } = await sanityFetch({
    query: DESIGNSYSTEM_SIDEBAR_QUERY,
  });

  console.log(data);
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex flex-auto">
        {/* <Sidebar
          sidebarData={[
            {
              label: "komponenter",
              links: generateSidebar(data, "komponenter"),
            },
          ]}
        /> */}

        {children}
      </div>
    </div>
  );
}
