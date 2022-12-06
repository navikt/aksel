import { PageTypeT, SidebarT, urlFor } from "@/lib";
import { Detail, Heading, Link } from "@navikt/ds-react";
import Footer from "components/layout/footer/Footer";
import { Header } from "components/layout/header/Header";
import { Sidebar } from "components/layout/sidebar/Sidebar";
import Feedback from "components/website-modules/feedback";
import { ReactNode } from "react";
import cl from "classnames";
import NextLink from "next/link";
import { capitalize } from "@/utils";
import Image from "next/image";

export const WithSidebar = ({
  children,
  sidebar,
  pageType,
  intro,
  pageProps,
  variant = "landingPage",
}: {
  children: ReactNode;
  sidebar: SidebarT;
  pageType: PageTypeT;
  pageProps: any;
  intro?: ReactNode;
  variant?: "page" | "landingPage";
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
              <div
                className={cl("mb-10 rounded-xl pl-6 md:pl-10", {
                  "bg-surface-subtle flex items-center justify-between pr-6 md:pr-10":
                    variant === "page",
                  "bg-deepblue-700 grid py-24 pb-6": variant !== "page",
                })}
              >
                <div>
                  {variant === "page" && pageProps?.kategori && (
                    <Detail as="div" className="mb-2">
                      <NextLink href={`/${pageType.type}`} passHref>
                        <Link className="text-text-default">
                          {capitalize(pageType.type)}
                        </Link>
                      </NextLink>{" "}
                      / {capitalize(pageProps.kategori)}
                    </Detail>
                  )}
                  <Heading
                    level="1"
                    size="xlarge"
                    className={cl({
                      "text-deepblue-800": variant === "page",
                      "text-text-on-action": variant !== "page",
                    })}
                  >
                    {pageType.title}
                  </Heading>
                  {intro && intro}
                </div>
                {variant === "page" && pageProps.status?.bilde && (
                  <div className="relative aspect-square h-[12.5rem]">
                    <Image
                      src={urlFor(pageProps.status?.bilde).auto("format").url()}
                      decoding="async"
                      /* width="200px"
                  height="200px" */
                      layout="fill"
                      objectFit="contain"
                      aria-hidden
                    />
                  </div>
                )}
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
