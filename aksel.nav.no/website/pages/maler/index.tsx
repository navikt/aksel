import { SanityBlockContent } from "@/sanity-block";
import { getClient } from "@/sanity/client.server";
import { landingPageQuery, sidebarQuery } from "@/sanity/queries";
import {
  AkselLandingPageDocT,
  AkselSidebarT,
  ArticleListT,
  NextPageT,
} from "@/types";
import { BodyLong, Heading, Ingress } from "@navikt/ds-react";
import cl from "clsx";
import { WithSidebar } from "components/layout/WithSidebar";
import Footer from "components/layout/footer/Footer";
import { Header } from "components/layout/header/Header";
import ComponentOverview from "components/sanity-modules/ComponentOverview";
import { SEO } from "components/website-modules/seo/SEO";
import { GetStaticProps } from "next/types";
import { Suspense, lazy } from "react";
import { malerKategorier } from "../../sanity/config";

type PageProps = NextPageT<{
  page: AkselLandingPageDocT;
  sidebar: AkselSidebarT;
  links: ArticleListT;
}>;

export const query = `{${sidebarQuery}, ${landingPageQuery(
  "maler"
)}, "links": *[_type == "aksel_maler" && defined(kategori)]{_id,heading,"slug": slug,status,kategori,"sidebarindex": sidebarindex}}`;

export const getStaticProps: GetStaticProps = async ({
  preview = false,
}): Promise<PageProps> => {
  const { sidebar, page, links } = await getClient().fetch(query, {
    type: "aksel_maler",
  });

  return {
    props: {
      page,
      sidebar,
      links,
      slug: "/maler",
      preview,
      title: "Forside Maler",
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
        title="Grunnleggende"
        description={page?.seo?.meta}
        image={page?.seo?.image}
      />

      <Header />
      <WithSidebar
        sidebar={sidebar}
        pageType={{ type: "Maler", title: "Maler" }}
        intro={<Ingress className="text-text-on-action">{page?.intro}</Ingress>}
        pageProps={page}
      >
        {malerKategorier
          .filter(
            (kat) => links?.filter((x) => x.kategori === kat.value).length > 0
          )
          .map((kat, i) => (
            <div
              key={i}
              className={cl({ "pb-8": i + 1 < malerKategorier.length })}
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
            type: "ds_artikkel",
          }}
        />
      </Suspense>
    );
  }

  return <Page {...props} />;
};

export default Wrapper;
