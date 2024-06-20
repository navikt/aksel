import cl from "clsx";
import { GetStaticProps } from "next/types";
import { BodyLong, Heading } from "@navikt/ds-react";
import ComponentOverview from "@/cms/component-overview/ComponentOverview";
import Footer from "@/layout/footer/Footer";
import Header from "@/layout/header/Header";
import { WithSidebar } from "@/layout/templates/WithSidebar";
import { SanityBlockContent } from "@/sanity-block";
import { getClient } from "@/sanity/client.server";
import { landingPageQuery, sidebarQuery } from "@/sanity/queries";
import {
  AkselLandingPageDocT,
  ArticleListT,
  NextPageT,
  SidebarT,
} from "@/types";
import { generateSidebar } from "@/utils";
import { PagePreview } from "@/web/preview/PagePreview";
import { SEO } from "@/web/seo/SEO";
import { templatesKategorier } from "../../sanity/config";

type PageProps = NextPageT<{
  page: AkselLandingPageDocT;
  sidebar: SidebarT;
  links: ArticleListT;
}>;

export const query = `{${sidebarQuery}, ${landingPageQuery(
  "templates",
)}, "links": *[_type == "templates_artikkel" && defined(kategori)]{_id,heading,"slug": slug,status,kategori,"sidebarindex": sidebarindex}}`;

export const getStaticProps: GetStaticProps = async ({
  preview = false,
}): Promise<PageProps> => {
  const { sidebar, page, links } = await getClient().fetch(query, {
    type: "templates_artikkel",
  });

  return {
    props: {
      page,
      sidebar: generateSidebar(sidebar, "templates"),
      links,
      slug: "/monster-maler",
      preview,
      title: "Forside Mønster og Maler",
      id: page?._id ?? "",
    },
    revalidate: 60,
    notFound: false,
  };
};

const Page = ({ page, sidebar, links }: PageProps["props"]) => {
  return (
    <>
      <SEO
        title="Mønster og Maler"
        description={page?.seo?.meta}
        image={page?.seo?.image}
      />

      <Header />
      <WithSidebar
        sidebar={sidebar}
        pageType={{
          type: "templates",
          title: "Mønster og maler",
          rootUrl: "/monster-maler",
          rootTitle: "Mønster og Maler",
        }}
        intro={
          <BodyLong size="large" className="text-text-on-action">
            {page?.intro}
          </BodyLong>
        }
        pageProps={page}
      >
        {templatesKategorier
          .filter(
            (kat) => links?.filter((x) => x.kategori === kat.value).length > 0,
          )
          .map((kat, i) => (
            <div
              key={i}
              className={cl({ "pb-8": i + 1 < templatesKategorier.length })}
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

export default function MonsterMalerFrontpage(props: PageProps["props"]) {
  return props.preview ? (
    <PagePreview
      query={query}
      props={props}
      params={{ type: "templates_artikkel" }}
    >
      {(previewProps, loading) => {
        if (loading) {
          return <Page {...props} />;
        }
        return (
          <Page
            {...previewProps}
            sidebar={generateSidebar(previewProps.sidebar, "templates")}
          />
        );
      }}
    </PagePreview>
  ) : (
    <Page {...props} />
  );
}
