import { komponentLandingQuery, SidebarT, SanityT } from "@/lib";
import { SanityBlockContent } from "@/sanity-block";
import { getClient } from "@/sanity-client";
import { Heading, Ingress } from "@navikt/ds-react";
import { WithSidebar } from "components/layout/page-templates/WithSidebar";
import ComponentOverview from "components/sanity-modules/component-overview";
import { PreviewSuspense } from "next-sanity/preview";
import Head from "next/head";
import { lazy } from "react";
import { komponentKategorier } from "../../sanity/config";
import cl from "classnames";

const Page = ({
  page,
  sidebar,
  links,
}: {
  page: any;
  links: {
    _id: string;
    heading: string;
    slug: { current: string };
    kategori: string;
    status?: SanityT.Schema.komponent_artikkel["status"];
  }[];
  sidebar: SidebarT;
}): JSX.Element => {
  return (
    <>
      <Head>
        <title>Komponenter</title>
        <meta property="og:title" content="Komponenter" />
        <meta
          name="description"
          content="Komponenter fra designsystemet til NAV"
        />
      </Head>
      <WithSidebar
        sidebar={sidebar}
        pageType={{ type: "Komponenter", title: "Komponenter" }}
        intro={<Ingress className="text-text-on-action">{page?.intro}</Ingress>}
        pageProps={page}
      >
        {komponentKategorier.map((kat, i) => (
          <div className={cl({ "pb-8": i + 1 < komponentKategorier.length })}>
            <Heading
              level="2"
              size="large"
              spacing
              className="text-deepblue-800"
            >
              {kat.title}
            </Heading>
            {page[`ingress_${kat.value}`] && (
              <Ingress className="mb-2">{page[`ingress_${kat.value}`]}</Ingress>
            )}
            {page[`intro_${kat.value}`] && (
              <SanityBlockContent blocks={page[`intro_${kat.value}`]} />
            )}
            <ComponentOverview
              node={links.filter((x) => x.kategori === kat.value)}
            />
          </div>
        ))}
      </WithSidebar>
    </>
  );
};

const WithPreview = lazy(() => import("../../components/WithPreview"));

const Wrapper = (props: any): JSX.Element => {
  if (props?.preview) {
    return (
      <PreviewSuspense fallback={<Page {...props} />}>
        <WithPreview
          comp={Page}
          query={komponentLandingQuery}
          props={props}
          params={{
            type: "komponent_artikkel",
          }}
        />
      </PreviewSuspense>
    );
  }

  return <Page {...props} />;
};

export default Wrapper;

export const getStaticProps = async ({
  preview = false,
}: {
  preview?: boolean;
}) => {
  const { sidebar, page, links } = await getClient().fetch(
    komponentLandingQuery,
    {
      type: "komponent_artikkel",
    }
  );

  return {
    props: {
      page,
      sidebar,
      links,
      slug: "/komponenter",
      preview,
    },
    revalidate: 60,
  };
};
