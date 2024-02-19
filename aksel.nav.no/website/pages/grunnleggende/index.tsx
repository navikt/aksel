import { vercelStegaCleanAll } from "@sanity/client/stega";
import cl from "clsx";
import { GetStaticProps } from "next/types";
import { BodyLong, Heading } from "@navikt/ds-react";
import ComponentOverview from "@/cms/component-overview/ComponentOverview";
import { PagePreview } from "@/draftmode/PagePreview";
import { getDraftClient } from "@/draftmode/client";
import { draftmodeToken, viewerToken } from "@/draftmode/token";
import Footer from "@/layout/footer/Footer";
import Header from "@/layout/header/Header";
import { WithSidebar } from "@/layout/templates/WithSidebar";
import { SanityBlockContent } from "@/sanity-block";
import { landingPageQuery, sidebarQuery } from "@/sanity/queries";
import {
  AkselLandingPageDocT,
  ArticleListT,
  NextPageT,
  SidebarT,
} from "@/types";
import { generateSidebar } from "@/utils";
import { SEO } from "@/web/seo/SEO";
import { grunnleggendeKategorier } from "../../sanity/config";

type PageProps = NextPageT<{
  page: AkselLandingPageDocT;
  sidebar: SidebarT;
  links: ArticleListT;
}>;

const Page = ({ page, sidebar, links }: PageProps["props"]) => {
  return (
    <>
      <SEO
        title="Grunnleggende"
        description={page?.seo?.meta}
        image={page?.seo?.image}
      />

      <Header />
      <WithSidebar
        sidebar={sidebar}
        pageType={{
          type: "grunnleggende",
          title: "Grunnleggende",
          rootUrl: "/grunnleggende",
          rootTitle: "Grunnleggende",
        }}
        intro={
          <BodyLong size="large" className="text-text-on-action">
            {page?.intro}
          </BodyLong>
        }
        pageProps={page}
      >
        {grunnleggendeKategorier
          .filter(
            (kat) => links?.filter((x) => x.kategori === kat.value).length > 0,
          )
          .map((kat, i) => (
            <div
              key={i}
              className={cl({ "pb-8": i + 1 < grunnleggendeKategorier.length })}
            >
              <Heading
                level="2"
                size="large"
                spacing
                className="scoll-mt-20 text-deepblue-800"
                id={kat.value}
              >
                {kat.title}
              </Heading>
              <div>
                {page?.[`ingress_${kat.value}`] && (
                  <BodyLong size="large" className="mb-4 only:mb-7">
                    {page[`ingress_${kat.value}`]}
                  </BodyLong>
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
      <Footer />
    </>
  );
};

const query = `{${sidebarQuery}, ${landingPageQuery(
  "grunnleggende",
)}, "links": *[_type == "ds_artikkel" && defined(kategori)]{_id,heading,"slug": slug,status,kategori,"sidebarindex": sidebarindex}}`;

export const getStaticProps: GetStaticProps = async ({
  draftMode = false,
}): Promise<PageProps> => {
  const client = getDraftClient({
    draftMode,
    token: draftMode ? draftmodeToken : viewerToken,
  });

  const { sidebar, page, links } = await client.fetch(query, {
    type: "ds_artikkel",
  });

  return {
    props: {
      page,
      sidebar: generateSidebar(sidebar, "grunnleggende"),
      links,
      slug: "/grunnleggende",
      title: "Forside Grunnleggende",
      id: page?._id ?? "",
      draftMode,
      token: draftMode ? draftmodeToken : "",
    },
    revalidate: 60,
    notFound: false,
  };
};

export default function GrunnleggendeFrontpage(props: PageProps["props"]) {
  return props.draftMode ? (
    <PagePreview
      query={query}
      props={props}
      params={{
        type: "ds_artikkel",
      }}
    >
      {(_props, loading) => {
        if (loading) {
          return <Page {...props} />;
        }
        return (
          <Page
            {..._props}
            sidebar={generateSidebar(_props?.sidebar, "grunnleggende")}
            links={vercelStegaCleanAll(_props?.links)}
          />
        );
      }}
    </PagePreview>
  ) : (
    <Page {...props} />
  );
}
