import Fuse from "fuse.js";
import Link from "next/link";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next/types";
import React, { useMemo, useState } from "react";
import * as Icons from "@navikt/aksel-icons";
import meta from "@navikt/aksel-icons/metadata";
import {
  Box,
  HStack,
  Heading,
  Search,
  Show,
  ToggleGroup,
} from "@navikt/ds-react";
import { useMedia } from "@/hooks/useMedia";
import Footer from "@/layout/footer/Footer";
import Header from "@/layout/header/Header";
import { Sidebar } from "@/layout/sidebar/Sidebar";
import { getClient } from "@/sanity/client.server";
import { sidebarQuery } from "@/sanity/queries";
import { NextPageT, SidebarT } from "@/types";
import { generateSidebar } from "@/utils";
import { categorizeIcons, getFillIcon } from "@/web/icon-page/utils";
import { SEO } from "@/web/seo/SEO";
import NotFound from "../404";
import styles from "./icons.module.css";

type PageProps = NextPageT<{
  sidebar: SidebarT;
}>;

export const getServerSideProps: GetServerSideProps =
  async (): Promise<PageProps> => {
    const { sidebar } = await getClient().fetch(`{${sidebarQuery}}`, {
      type: "komponent_artikkel",
      preview: "false",
    });

    return {
      props: {
        sidebar: generateSidebar(sidebar, "komponenter"),
        preview: false,
        title: "Ikoner",
        id: "",
        slug: "/ikoner",
      },
      notFound: false,
    };
  };

const fuseStroke = new Fuse(
  Object.values(meta).filter((x) => x.variant.toLowerCase() === "stroke"),
  {
    threshold: 0.2,
    keys: [
      { name: "name", weight: 3 },
      { name: "category", weight: 2 },
      { name: "sub_category", weight: 2 },
      { name: "keywords", weight: 3 },
      { name: "variant", weight: 1 },
    ],
    shouldSort: false,
  },
);

const fuseFill = new Fuse(getFillIcon(Object.values(meta)), {
  threshold: 0.2,
  keys: [
    { name: "name", weight: 3 },
    { name: "category", weight: 2 },
    { name: "sub_category", weight: 2 },
    { name: "keywords", weight: 3 },
    { name: "variant", weight: 1 },
  ],
  shouldSort: false,
});

const Page = ({ sidebar }: PageProps["props"]) => {
  const { query } = useRouter();

  const [iconQuery, setIconQuery] = useState("");

  const [toggle, setToggle] = useState<"stroke" | "fill">("stroke");
  const [strokeIcons] = useState(
    Object.values(meta).filter((x) => x.variant.toLowerCase() === "stroke"),
  );

  const [fillIcons] = useState(getFillIcon(Object.values(meta)));

  const hideModal = useMedia("screen and (min-width: 1024px)");

  const categories = useMemo(() => {
    if (toggle === "fill") {
      return categorizeIcons(
        iconQuery
          ? fuseFill.search(iconQuery).map((result) => result.item as any)
          : fillIcons,
      );
    }

    return categorizeIcons(
      iconQuery
        ? fuseStroke.search(iconQuery).map((result) => result.item as any)
        : strokeIcons,
    );
  }, [toggle, iconQuery, strokeIcons, fillIcons]);

  if (
    (query?.name?.[0] && !meta[query.name[0]]) ||
    (query?.name && query?.name?.length > 1)
  ) {
    return <NotFound />;
  }

  const name = query?.name?.[0] ?? "";

  return (
    <>
      <SEO
        title={name.length > 0 ? `${name}Icon` : "Ikoner"}
        description="800+ open source-ikoner designet og utviklet for Nav"
        fallbackImage="https://aksel.nav.no/images/og/ikoner/og-ikoner.png"
        canonical="https://aksel.nav.no/ikoner"
      />
      <Header />
      <Box
        background="bg-default"
        paddingBlock="6 24"
        className="min-h-screen-header"
      >
        <div className="mx-auto flex w-full max-w-screen-2xl gap-6">
          <Show asChild above="md">
            <Sidebar sidebarData={[{ label: "Komponenter", links: sidebar }]} />
          </Show>
          <main
            tabIndex={-1}
            id="hovedinnhold"
            className="relative z-0 w-full px-4 focus:outline-none sm:pl-6 sm:pr-6 md:pl-0"
          >
            <div className="relative mb-10 flex min-h-[12.5rem] items-center justify-between overflow-hidden rounded-xl bg-surface-subtle pl-6 pr-4 md:pl-10 lg:pr-10">
              <div className="z-[1]">
                <Heading level="1" size="xlarge" className="text-deepblue-800">
                  Ikoner
                </Heading>
                <div>Introtekst</div>
              </div>
            </div>

            <div className="flex flex-col gap-10 sm:px-6 md:px-10">
              <form
                onSubmit={(e) => e.preventDefault()}
                className="flex w-fit items-center gap-6 sm:flex-nowrap"
              >
                <Search
                  variant="simple"
                  label="Ikonsøk"
                  placeholder="Søk"
                  autoComplete="off"
                  onChange={setIconQuery}
                  value={iconQuery}
                  clearButton={false}
                  onKeyDown={(e) => {
                    /* Avoids closing icon-sidebar when clearing Search */
                    if (e.key === "Escape") {
                      if (e.currentTarget.value) {
                        e.stopPropagation();
                      }
                    }
                  }}
                />
                <ToggleGroup
                  value={toggle}
                  onChange={(v) => setToggle(v as any)}
                  variant="neutral"
                  aria-label="Velg ikonvariant"
                  className="shrink-0"
                >
                  <ToggleGroup.Item value="stroke" label="Stroke" />
                  <ToggleGroup.Item value="fill" label="Fill" />
                </ToggleGroup>
              </form>
              <div className="flex flex-col gap-10">
                {categories.map((section) => {
                  return (
                    <div key={section.category}>
                      <Heading level="2" size="large" spacing>
                        {section.category}
                      </Heading>

                      <HStack gap="space-8" width="100%">
                        {section.sub_categories.map((sub) => {
                          return (
                            <React.Fragment key={sub.sub_category}>
                              {sub.icons.map((i) => {
                                const T = Icons[`${i.id}Icon`]; // eslint-disable-line import/namespace
                                if (T === undefined) {
                                  return null;
                                }

                                return (
                                  <Link
                                    href={`/icons/${i.id}`}
                                    scroll={false}
                                    key={i.id}
                                    prefetch={false}
                                    id={i.id}
                                    className={styles.iconButton}
                                    data-state={
                                      i.id === name ? "active" : "inactive"
                                    }
                                  >
                                    <span className="navds-sr-only">
                                      {i.name}
                                    </span>
                                    <T fontSize="1.5rem" aria-hidden alt="" />
                                  </Link>
                                );
                              })}
                            </React.Fragment>
                          );
                        })}
                      </HStack>
                    </div>
                  );
                })}
              </div>
            </div>
          </main>
        </div>
      </Box>
      <Footer />
    </>
  );
};

export default Page;
