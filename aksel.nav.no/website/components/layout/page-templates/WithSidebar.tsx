import { PageTypeT, SidebarT } from "@/lib";
import { Heading } from "@navikt/ds-react";
import Footer from "components/layout/footer/Footer";
import { Header } from "components/layout/header/Header";
import { Sidebar } from "components/layout/sidebar/Sidebar";
import { ReactNode } from "react";

export const WithSidebar = ({
  children,
  sidebar,
  pageType,
}: {
  children: ReactNode;
  sidebar: SidebarT;
  pageType: PageTypeT;
}) => {
  return (
    <>
      <Header />
      <div className="bg-bg-default">
        <div className="mx-auto flex w-full max-w-screen-xl gap-6">
          <Sidebar kategori={pageType.type} links={sidebar} />
          <div className="relative w-full">
            <main
              tabIndex={-1}
              id="hovedinnhold"
              className="min-h-screen-header md:max-w-screen-sidebar relative w-full focus:outline-none"
            >
              <div className="bg-deepblue-700 grid h-60 rounded-xl py-24 pb-6 pl-10">
                <Heading
                  level="1"
                  size="xlarge"
                  className="text-text-on-action mt-auto"
                >
                  {pageType.title}
                </Heading>
              </div>
              {children}
              {/* <LayoutPicker title="Aksel" data={page} /> */}
            </main>
          </div>
        </div>
        <Footer variant="ds" />
      </div>
    </>
  );
};
