import { SanityBlockContent } from "@/sanity-block";
import { getClient } from "@/sanity/client.server";
import { landingPageQuery, sidebarQuery } from "@/sanity/queries";
import {
  AkselLandingPageDocT,
  AkselSidebarT,
  ArticleListT,
  NextPageT,
} from "@/types";
import { BodyLong, Heading } from "@navikt/ds-react";
import cl from "clsx";
import { WithSidebar } from "components/layout/WithSidebar";
import Footer from "components/layout/footer/Footer";
import { Header } from "components/layout/header/Header";
import ComponentOverview from "components/sanity-modules/component-overview/ComponentOverview";
import { SEO } from "components/website-modules/seo/SEO";
import { GetStaticProps } from "next/types";
import { Suspense, lazy } from "react";
import { templatesKategorier } from "../../sanity/config";

type PageProps = NextPageT<{
  page: AkselLandingPageDocT;
  sidebar: AkselSidebarT;
  links: ArticleListT;
}>;

export const query = `{${sidebarQuery}, ${landingPageQuery(
  "templates"
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
      sidebar,
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
        pageType={{ type: "Templates", title: "Mønster og Maler" }}
        intro={
          <BodyLong size="large" className="text-text-on-action">
            {page?.intro}
          </BodyLong>
        }
        pageProps={page}
      >
        {templatesKategorier
          .filter(
            (kat) => links?.filter((x) => x.kategori === kat.value).length > 0
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
                className="text-deepblue-800 scoll-mt-20"
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

const WithPreview = lazy(() => import("../../components/WithPreview"));

const Wrapper = (props: any) => {
  if (props?.preview) {
    return (
      <Suspense fallback={<Page {...props} />}>
        <WithPreview
          comp={Page}
          query={query}
          props={props}
          params={{
            type: "templates_artikkel",
          }}
        />
      </Suspense>
    );
  }

  return <Page {...props} />;
};

export default Wrapper;
