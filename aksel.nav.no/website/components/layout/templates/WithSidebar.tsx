import cl from "clsx";
import Image from "next/legacy/image";
import NextLink from "next/link";
import { Box, Detail, Heading, Link, Show } from "@navikt/ds-react";

/* import SidebarOld from "@/layout/sidebar/Sidebar"; */
import { urlFor } from "@/sanity/interface";
import { SidebarT, TableOfContentsT } from "@/types";
import { capitalize } from "@/utils";
import { TableOfContents } from "@/web/toc/TableOfContents";
import { Sidebar } from "../sidebar-v2/Sidebar";

export const WithSidebar = ({
  children,
  sidebar,
  pageType,
  intro,
  pageProps,
  variant = "landingPage",
  footer,
  toc,
}: {
  children: React.ReactNode;
  sidebar: SidebarT;
  toc?: TableOfContentsT;
  pageType: {
    type: "komponenter" | "grunnleggende" | "templates";
    title: string;
    rootUrl: string;
    rootTitle: string;
  };
  pageProps: any;
  intro?: React.ReactNode;
  footer?: React.ReactNode;
  variant?: "page" | "landingPage";
}) => {
  return (
    <Box
      background="bg-default"
      paddingBlock="6 24"
      className="min-h-screen-header"
    >
      <div className="mx-auto flex w-full max-w-screen-2xl gap-6">
        {/* <SidebarOld kategori={pageType.type} links={sidebar} /> */}
        <Show asChild above="md">
          <Sidebar
            sidebarData={[
              { label: "Grunnleggende", links: sidebar },
              { label: "Komponenter", links: sidebar },
            ]}
          />
        </Show>
        <main
          tabIndex={-1}
          id="hovedinnhold"
          className="relative z-0 w-full px-4 focus:outline-none sm:pl-6 sm:pr-6 md:pl-0"
        >
          <div
            className={cl(
              "relative mb-10 min-h-[12.5rem] overflow-hidden rounded-xl pl-6 pr-4 md:pl-10 lg:pr-10",
              {
                "flex items-center justify-between bg-surface-subtle":
                  variant === "page",
                "grid bg-deepblue-700/70 py-[4.25rem] pb-6": variant !== "page",
                "before:absolute before:inset-0 before:-z-10 before:rounded-xl before:bg-gradient-to-br before:from-deepblue-700 before:via-blue-500 before:to-violet-700":
                  variant !== "page",
              },
            )}
          >
            <div className="z-[1]">
              {variant === "page" && pageProps?.kategori && (
                <Detail as="div" className="mb-2">
                  <NextLink href={pageType.rootUrl} passHref legacyBehavior>
                    <Link className="text-text-default">
                      {pageType.rootTitle}
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
                  "w-fit text-text-on-action": variant !== "page",
                })}
              >
                {pageType.title}
              </Heading>
              <div
                className={cl({
                  "w-fit": variant !== "page",
                })}
              >
                {intro}
              </div>
            </div>
            {variant === "page" && pageProps.status?.bilde && (
              <div
                className={cl(
                  "relative hidden aspect-square h-[12.5rem] lg:block xl:mr-40",
                  {
                    "hue-rotate-[65deg]": pageProps?.status?.tag === "beta",
                  },
                )}
              >
                <Image
                  src={urlFor(pageProps.status?.bilde)
                    .auto("format")
                    .url()}
                  decoding="async"
                  layout="fill"
                  objectFit="contain"
                  aria-hidden
                  priority
                />
              </div>
            )}
            {variant === "landingPage" && (
              <div className="pointer-events-none absolute right-0 top-0 hidden md:block">
                <HeaderCube />
              </div>
            )}
          </div>

          <div
            className={cl("sm:px-6 md:px-10", {
              "flex gap-10": variant === "page",
            })}
          >
            {variant === "page" && toc && <TableOfContents toc={toc} />}
            <div className="w-full">
              {children}
              {footer && <div className="w-full">{footer}</div>}
            </div>
          </div>
        </main>
      </div>
    </Box>
  );
};

function HeaderCube() {
  return (
    <svg
      width="354"
      height="280"
      viewBox="0 0 354 280"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      className="z-[-1] max-h-full text-deepblue-300"
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
}
