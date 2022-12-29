import { PageTypeT, SidebarT, urlFor } from "@/lib";
import { Detail, Heading, Link } from "@navikt/ds-react";
import Footer from "components/layout/footer/Footer";
import { Header } from "components/layout/header/Header";
import { Sidebar } from "components/layout/sidebar/Sidebar";
import Feedback from "components/website-modules/feedback";
import { ReactNode } from "react";
import cl from "clsx";
import NextLink from "next/link";
import { capitalize } from "@/utils";
import Image from "next/image";
import { TableOfContentsv2 } from "components/website-modules/TOCv2";

const HeaderCube = ({ ...props }) => (
  <svg
    width="354"
    height="280"
    viewBox="0 0 354 280"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden
    {...props}
  >
    <path
      d="M507.265 293.265L389.355 175.355V293.089L507.265 410.999V293.265Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    <path
      d="M436.496 222.496L318.645 104.645L200.794 222.496L318.645 340.347L436.496 222.496Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    <path
      d="M247.934 269.754L130.024 151.844V269.577L247.934 387.487V269.754Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    <path
      d="M59.3133 81.1334L177.223 -36.7767L177.223 80.9564L59.3133 198.867V81.1334Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
  </svg>
);

export const WithSidebar = ({
  children,
  sidebar,
  pageType,
  intro,
  pageProps,
  variant = "landingPage",
  withToc = false,
  footer,
}: {
  children: ReactNode;
  sidebar: SidebarT;
  pageType: PageTypeT;
  pageProps: any;
  intro?: ReactNode;
  footer?: ReactNode;
  variant?: "page" | "landingPage";
  withToc?: boolean;
}) => {
  return (
    <>
      <Header />
      <div className="bg-bg-default">
        <div className="mx-auto mt-6 mb-24 flex w-full max-w-screen-2xl gap-6">
          <Sidebar kategori={pageType.type} links={sidebar} />
          <div className="relative w-full">
            <main
              tabIndex={-1}
              id="hovedinnhold"
              className="min-h-screen-header md:max-w-screen-sidebar xs:pl-6 xs:pr-6 relative w-full px-4 focus:outline-none md:pl-0"
            >
              <div
                className={cl(
                  "relative mb-10 min-h-[12.5rem] overflow-hidden rounded-xl pl-6 pr-4 md:pl-10 lg:pr-10",
                  {
                    "bg-surface-subtle flex items-center justify-between":
                      variant === "page",
                    "bg-deepblue-700 grid py-[4.25rem] pb-6":
                      variant !== "page",
                  }
                )}
              >
                <div className="z-[1]">
                  {variant === "page" && pageProps?.kategori && (
                    <Detail as="div" className="mb-2">
                      <NextLink
                        href={`/${pageType.type.toLowerCase()}`}
                        passHref
                      >
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
                      "text-text-on-action bg-deepblue-700/80 w-fit":
                        variant !== "page",
                    })}
                  >
                    {pageType.title}
                  </Heading>
                  <div
                    className={cl({
                      "bg-deepblue-700/80 w-fit": variant !== "page",
                    })}
                  >
                    {intro && intro}
                  </div>
                </div>
                {variant === "page" && pageProps.status?.bilde && (
                  <div
                    className={cl(
                      "relative hidden aspect-square h-[12.5rem] lg:block xl:mr-40",
                      {
                        "hue-rotate-[65deg]": pageProps?.status?.tag === "beta",
                      }
                    )}
                  >
                    <Image
                      src={urlFor(pageProps.status?.bilde).auto("format").url()}
                      decoding="async"
                      layout="fill"
                      objectFit="contain"
                      aria-hidden
                      priority
                    />
                  </div>
                )}
                {variant === "landingPage" && (
                  <div className="xs:block pointer-events-none absolute top-0 right-0 hidden">
                    <HeaderCube className="text-deepblue-300 z-0 max-h-full" />
                  </div>
                )}
              </div>
              <div className={cl("xs:px-6 md:px-10", { flex: withToc })}>
                {withToc && (
                  <TableOfContentsv2
                    changedState={pageProps["content"]}
                    hideToc={false}
                  />
                )}
                <div className="w-full">
                  {children}
                  <Feedback docId={pageProps?._id} docType={pageProps?._type} />
                  {footer && <div className="w-full">{footer}</div>}
                </div>
              </div>
            </main>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};
