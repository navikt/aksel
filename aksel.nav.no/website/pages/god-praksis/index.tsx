import ArtikkelCard from "@/cms/cards/ArtikkelCard";
import GodPraksisCard from "@/cms/cards/GodPraksisCard";
import Footer from "@/layout/footer/Footer";
import Header from "@/layout/header/Header";
import { SanityBlockContent } from "@/sanity-block";
import { getClient } from "@/sanity/client.server";
import { destructureBlocks } from "@/sanity/queries";
import {
  AkselGodPraksisDocT,
  AkselGodPraksisLandingPageDocT,
  AkselTemaT,
  NextPageT,
  ResolveContributorsT,
  ResolveSlugT,
  ResolveTemaT,
} from "@/types";
import { AkselCubeStatic } from "@/web/aksel-cube/AkselCube";
import { SEO } from "@/web/seo/SEO";
import { SparklesIcon } from "@navikt/aksel-icons";
import { Heading } from "@navikt/ds-react";
import { GetStaticProps } from "next/types";
import { Suspense, lazy } from "react";

type PageProps = NextPageT<{
  page: AkselGodPraksisLandingPageDocT;
  temaer: Array<AkselTemaT>;
  resent: Array<
    ResolveTemaT<ResolveContributorsT<ResolveSlugT<AkselGodPraksisDocT>>>
  >;
}>;

export const query = `*[_type == "godpraksis_landingsside"][0]{
  "page": {
    ...,
    intro[]{
      ...,
      ${destructureBlocks}
    }
  },
  "temaer": *[_type == "aksel_tema" && defined(seksjoner[].sider[])]{
    ...,
    "refCount": count(*[_type == "aksel_artikkel" && !(_id in path("drafts.**")) && references(^._id)])
  },
  "resent": *[_type == "aksel_artikkel" && defined(publishedAt)] | order(publishedAt desc)[0...9]{
    _id,
    heading,
    _createdAt,
    _updatedAt,
    publishedAt,
    "slug": slug.current,
    "tema": tema[]->title,
    ingress,
  }
}`;

export const getStaticProps: GetStaticProps = async ({
  preview = false,
}): Promise<PageProps> => {
  const { temaer, page, resent } = await getClient().fetch(query);

  return {
    props: {
      page,
      temaer,
      resent,
      slug: "/god-praksis",
      preview,
      title: "Forside God praksis",
      id: page?._id ?? "",
    },
    notFound: !temaer,
    revalidate: 60,
  };
};

const Page = ({ temaer, page, resent }: PageProps["props"]) => {
  const filteredTemas = temaer.filter((x) => x.refCount > 0);
  return (
    <>
      <SEO
        title="God praksis"
        description={page?.seo?.meta}
        image={page?.seo?.image}
      />

      <div className="relative overflow-hidden bg-surface-subtle">
        <Header variant="transparent" />
        <main tabIndex={-1} id="hovedinnhold" className=" focus:outline-none">
          <div className="mx-auto mb-40 grid w-full max-w-screen-2xl px-4 pt-20 sm:px-6">
            <Heading
              level="1"
              size="xlarge"
              className="mb-4 text-5xl text-deepblue-800"
            >
              God praksis
            </Heading>
            {page.intro && <SanityBlockContent isIngress blocks={page.intro} />}
            <AkselCubeStatic className="text-deepblue-300 opacity-5 " />
            <div>
              <ul className="card-grid-3-1 mt-20 ">
                {filteredTemas.map((t) => (
                  <GodPraksisCard key={t._id} node={t} />
                ))}
              </ul>
            </div>

            <div className="mt-24">
              <Heading
                level="2"
                size="medium"
                className="flex items-center gap-2 text-deepblue-800"
              >
                <SparklesIcon aria-hidden className="shrink-0" /> Nyeste
                artikler
              </Heading>
              <div className="card-grid-3-1 my-6">
                {resent.map((art: any) => (
                  <ArtikkelCard
                    level="3"
                    variant="tema"
                    {...art}
                    key={art._id}
                  />
                ))}
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

const WithPreview = lazy(() => import("@/preview"));

const Wrapper = (props: any) => {
  if (props?.preview) {
    return (
      <Suspense fallback={<Page {...props} />}>
        <WithPreview comp={Page} query={query} props={props} />
      </Suspense>
    );
  }

  return <Page {...props} />;
};

export default Wrapper;
