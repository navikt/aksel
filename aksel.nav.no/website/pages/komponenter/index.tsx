import { komponentLandingQuery, SanityT, SidebarT, urlFor } from "@/lib";
import { SanityBlockContent } from "@/sanity-block";
import { getClient } from "@/sanity-client";
import { Heading, Ingress } from "@navikt/ds-react";
import cl from "clsx";
import { WithSidebar } from "components/layout/page-templates/WithSidebar";
import ComponentOverview from "components/sanity-modules/component-overview";
import { SuggestionBlock } from "components/website-modules/suggestionblock";
import { PreviewSuspense } from "next-sanity/preview";
import Head from "next/head";
import { lazy } from "react";
import { komponentKategorier } from "../../sanity/config";

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
        <meta name="description" content={page?.seo?.meta ?? ""} key="desc" />
        <meta
          property="og:description"
          content={page?.seo?.meta ?? ""}
          key="ogdesc"
        />
        <meta
          property="og:image"
          content={
            page?.seo?.image
              ? urlFor(page?.seo?.image)
                  .width(1200)
                  .height(630)
                  .fit("crop")
                  .quality(100)
                  .url()
              : ""
          }
          key="ogimage"
        />
      </Head>
      <WithSidebar
        sidebar={sidebar}
        pageType={{ type: "Komponenter", title: "Komponenter" }}
        intro={<Ingress className="text-text-on-action">{page?.intro}</Ingress>}
        pageProps={page}
      >
        <SuggestionBlock variant="komponenter" />
        {komponentKategorier
          .filter(
            (kat) => links?.filter((x) => x.kategori === kat.value).length > 0
          )
          .map((kat, i) => (
            <div
              key={i}
              className={cl({ "pb-8": i + 1 < komponentKategorier.length })}
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
              <div>
                {page?.[`ingress_${kat.value}`] && (
                  <Ingress className="mb-4 only:mb-7">
                    {page[`ingress_${kat.value}`]}
                  </Ingress>
                )}
                {page?.[`intro_${kat.value}`] && (
                  <SanityBlockContent blocks={page[`intro_${kat.value}`]} />
                )}
              </div>
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
