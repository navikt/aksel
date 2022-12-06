import { PageTypeT, SidebarT } from "@/lib";
import { Heading } from "@navikt/ds-react";
import Footer from "components/layout/footer/Footer";
import { Header } from "components/layout/header/Header";
import { Sidebar } from "components/layout/sidebar/Sidebar";
import Feedback from "components/website-modules/feedback";
import { ReactNode } from "react";

export const WithSidebar = ({
  children,
  sidebar,
  pageType,
  intro,
  pageProps,
}: {
  children: ReactNode;
  sidebar: SidebarT;
  pageType: PageTypeT;
  pageProps: any;
  intro?: ReactNode;
}) => {
  return (
    <>
      <Header />
      <div className="bg-bg-default">
        <div className="mx-auto mt-6 flex w-full max-w-screen-xl gap-6">
          <Sidebar kategori={pageType.type} links={sidebar} />
          <div className="relative w-full">
            <main
              tabIndex={-1}
              id="hovedinnhold"
              className="min-h-screen-header md:max-w-screen-sidebar relative w-full pr-6 focus:outline-none"
            >
              <div className="bg-deepblue-700 mb-10 grid rounded-xl py-24 pb-6 pl-6 md:pl-10">
                <Heading
                  level="1"
                  size="xlarge"
                  className="text-text-on-action mt-auto"
                >
                  {pageType.title}
                </Heading>
                {intro && intro}
              </div>
              <div className="pl-6 md:pl-10">
                {children}
                <Feedback docId={pageProps?._id} docType={pageProps?._type} />
              </div>
            </main>
          </div>
        </div>
        <Footer variant="ds" />
      </div>
    </>
  );
};
