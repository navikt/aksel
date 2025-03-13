import { useRouter } from "next/router";
import { GetServerSideProps } from "next/types";
import meta from "@navikt/aksel-icons/metadata";
import { Box, Heading, Show } from "@navikt/ds-react";
import Footer from "@/layout/footer/Footer";
import Header from "@/layout/header/Header";
import { Sidebar } from "@/layout/sidebar/Sidebar";
import { getClient } from "@/sanity/client.server";
import { sidebarQuery } from "@/sanity/queries";
import { NextPageT, SidebarT } from "@/types";
import { generateSidebar } from "@/utils";
import { SEO } from "@/web/seo/SEO";
import NotFound from "../404";

type PageProps = NextPageT<{
  sidebar: SidebarT;
}>;

export const getServerSideProps: GetServerSideProps =
  async (): Promise<PageProps> => {
    const { sidebar } = await getClient().fetch(`{${sidebarQuery}}`, {
      type: "komponent_artikkel",
      preview: "false",
    });

    console.log("re-fetch");

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

const Page = ({ sidebar }: PageProps["props"]) => {
  const { query } = useRouter();

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

            <div className="flex gap-10 sm:px-6 md:px-10">
              <div className="w-full">Innhold</div>
            </div>
          </main>
        </div>
      </Box>
      <Footer />
    </>
  );
};

export default Page;
