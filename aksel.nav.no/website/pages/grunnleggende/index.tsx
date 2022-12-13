import { grunnleggendeLandingQuery, SidebarT } from "@/lib";
import { SanityBlockContent } from "@/sanity-block";
import { getClient } from "@/sanity-client";
import { Heading, Ingress } from "@navikt/ds-react";
import cl from "classnames";
import { WithSidebar } from "components/layout/page-templates/WithSidebar";
import ComponentOverview from "components/sanity-modules/component-overview";
import { PreviewSuspense } from "next-sanity/preview";
import Head from "next/head";
import { lazy } from "react";
import { grunnleggendeKategorier } from "../../sanity/config";

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
  }[];
  sidebar: SidebarT;
}): JSX.Element => {
  return (
    <>
      <Head>
        <title>Grunnleggende</title>
        <meta property="og:title" content="Grunnleggende" />
        <meta
          name="description"
          content="Grunnelegende deler fra designsystemet til NAV"
        />
      </Head>
      <WithSidebar
        sidebar={sidebar}
        pageType={{ type: "Grunnleggende", title: "Grunnleggende" }}
        intro={<Ingress className="text-text-on-action">{page?.intro}</Ingress>}
        pageProps={page}
      >
        {grunnleggendeKategorier.map((kat, i) => (
          <div
            key={i}
            className={cl({ "pb-8": i + 1 < grunnleggendeKategorier.length })}
          >
            <Heading
              level="2"
              size="large"
              spacing
              className="text-deepblue-800 scoll-mt-20"
              id={kat.value}
            >
              {kat.title}
            </Heading>
            {page?.[`ingress_${kat.value}`] && (
              <Ingress className="mb-2">{page[`ingress_${kat.value}`]}</Ingress>
            )}
            {page?.[`intro_${kat.value}`] && (
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
          query={grunnleggendeLandingQuery}
          props={props}
          params={{
            type: "ds_artikkel",
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
    grunnleggendeLandingQuery,
    {
      type: "ds_artikkel",
    }
  );

  return {
    props: {
      page,
      sidebar,
      links,
      slug: "/grunnleggende",
      preview,
    },
    revalidate: 60,
  };
};
