import { groq } from "next-sanity";
import { GetStaticProps } from "next/types";
import { Suspense, lazy } from "react";
import GodPraksisPage from "@/layout/god-praksis-page/GodPraksisPage";
import {
  articlesQuery,
  chipDataQuery,
  heroNavQuery,
  innholdstypeQuery,
} from "@/layout/god-praksis-page/queries";
import {
  GpArticleListT,
  GpChipDataRawT,
  GpEntryPageProps,
  GpInnholdstypeT,
  HeroNavT,
} from "@/layout/god-praksis-page/types";
import { getClient } from "@/sanity/client.server";
import { NextPageT } from "@/types";
import { SEO } from "@/web/seo/SEO";

type PageProps = NextPageT<GpEntryPageProps>;

const query = groq`
{
  ${heroNavQuery},
  ${innholdstypeQuery},
  ${articlesQuery},
  ${chipDataQuery}
}
`;

const chipDataForMain = (data: GpChipDataRawT["chipData"]) => {
  const map = new Map<string, number>();
  for (const entry of data) {
    for (const innholdstype of entry.types) {
      const count = map.get(innholdstype.title) || 0;
      map.set(innholdstype.title, count + innholdstype.count);
    }
  }
  const chipData = [];
  for (const [key, value] of map.entries()) {
    chipData.push({ title: key, count: value });
  }
  return chipData;
};

export const getStaticProps: GetStaticProps = async ({
  preview = false,
}): Promise<PageProps> => {
  const {
    heroNav,
    articles,
    innholdstype,
    chipData,
  }: GpArticleListT & HeroNavT & GpInnholdstypeT & GpChipDataRawT =
    await getClient().fetch(query);

  return {
    props: {
      tema: null,
      articles,
      heroNav: heroNav.filter((x) => x.hasRefs),
      innholdstype: innholdstype.filter((x) => x.hasRefs),
      chipData: chipDataForMain(chipData),
      preview,
      id: "",
      title: "",
    },
    notFound: false,
    revalidate: 60,
  };
};

const GpPage = (props: PageProps["props"]) => {
  return (
    <>
      <SEO
        title="God praksis"
        /* description={page?.seo?.meta} */
        /* image={page?.seo?.image} */
      />
      <GodPraksisPage {...props} />
    </>
  );
};

const WithPreview = lazy(() => import("@/preview"));

const Wrapper = (props: any) => {
  if (props?.preview) {
    return (
      <Suspense fallback={<GpPage {...props} />}>
        <WithPreview comp={GpPage} query={query} props={props} />
      </Suspense>
    );
  }

  return <GpPage {...props} />;
};

export default Wrapper;
