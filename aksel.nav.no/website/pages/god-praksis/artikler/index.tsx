import { getClient } from "@/sanity/client.server";
import { contributorsSingle } from "@/sanity/queries";
import {
  NextPageT,
  ResolveTemaT,
  ResolveSlugT,
  AkselGodPraksisDocT,
  ResolveContributorsSingleT,
} from "@/types";
import { Button, ErrorMessage, Heading } from "@navikt/ds-react";
import Footer from "components/layout/footer/Footer";
import { Header } from "components/layout/header/Header";
import ArtikkelCard from "components/sanity-modules/cards/ArtikkelCard";
import { AkselCubeStatic } from "components/website-modules/cube";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSWR from "swr";

type ArticleT = ResolveContributorsSingleT<
  ResolveTemaT<ResolveSlugT<AkselGodPraksisDocT>>
>;

type PageProps = NextPageT<{
  articles: Array<ArticleT>;
}>;

export const query = (boundry = "") => {
  return `{
    "articles": *[_type == "aksel_artikkel" && defined(publishedAt)] | order(publishedAt desc)${boundry} {
      _id,
      heading,
      _createdAt,
      _updatedAt,
      publishedAt,
      updateInfo,
      "slug": slug.current,
      "tema": tema[]->title,
      ingress,
      status,
      _type,
    "contributor": ${contributorsSingle}
    }
  }`;
};

export const getStaticProps = async ({
  preview = false,
}: {
  preview?: boolean;
}): Promise<PageProps> => {
  const { articles } = await getClient().fetch(query("[0..21]"));

  return {
    props: {
      articles,
      id: "godpraksis_landingsside_id1",
      title: "Alle God praksis artikler",
      preview,
    },
    revalidate: 60,
    notFound: false,
  };
};

const Artikler = ({ articles }: PageProps["props"]) => {
  const [allArticles, setAllArticles] = useState<Array<ArticleT>>(articles);
  const [hasFetched, setHasFetched] = useState<boolean>(false);
  const { alleArtikler } = useRouter().query;

  const lastPublishedAt = articles[articles.length - 1].publishedAt;
  const [fetchMore, setFetchMore] = useState<boolean>(false);

  useEffect(() => {
    if (alleArtikler === "true") {
      setFetchMore(true);
    }
  }, [alleArtikler]);

  const { data, error, isValidating } = useSWR(
    fetchMore
      ? () => `/api/aksel-articles?lastPublishedAt=${lastPublishedAt}`
      : null,
    (query) => fetch(query).then((res) => res.json())
  );

  if (data) {
    setAllArticles([...allArticles, ...data]);
    setFetchMore(false);
    setHasFetched(true);
  }

  return (
    <>
      <Head>
        <title>Artikler - Aksel</title>
        <meta property="og:title" content="Artikler - Aksel" />
      </Head>
      <div className="bg-surface-subtle overflow-clip">
        <Header variant="subtle" />
        <main
          tabIndex={-1}
          id="hovedinnhold"
          className="min-h-[80vh] focus:outline-none"
        >
          <div className="relative grid overflow-x-clip pb-40">
            <AkselCubeStatic className="text-deepblue-300 opacity-5 " />
            <div className="dynamic-wrapper mx-auto w-full px-4 sm:px-6">
              <Heading
                level="1"
                size="xlarge"
                className="text-deepblue-800 my-20 md:text-[3rem]"
              >
                Artikler
              </Heading>
              <div className="card-grid-3-1 mt-6">
                {allArticles
                  .filter((a) => a.tema)
                  .map((x) => {
                    return (
                      <ArtikkelCard
                        {...x}
                        source={x?.slug}
                        key={x._id}
                        variant="tema"
                      />
                    );
                  })}
              </div>
              <div className="mt-6 flex flex-col items-center">
                {!hasFetched && (
                  <Button
                    loading={isValidating}
                    onClick={() => setFetchMore(true)}
                  >
                    Last flere artikler
                  </Button>
                )}
                {error && (
                  <ErrorMessage size="medium" className="mt-4">
                    Kan ikke hente flere artikler, prøv igjen senere...
                  </ErrorMessage>
                )}
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Artikler;
