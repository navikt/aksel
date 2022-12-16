import { ArtikkelCard } from "@/components";
import { getClient } from "@/sanity-client";
import { Button, ErrorMessage, Heading } from "@navikt/ds-react";
import Footer from "components/layout/footer/Footer";
import { Header } from "components/layout/header/Header";
import { AkselCubeStatic } from "components/website-modules/cube";
import { akselArticleAll } from "lib/sanity/queries";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { ArtiklerT } from "../[slug]";

interface ArtiklerProps {
  articles: ArtiklerT[];
}

const Artikler = ({ articles }: ArtiklerProps) => {
  const [allArticles, setAllArticles] = useState<ArtiklerT[]>(articles);
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
            <div className="dynamic-wrapper">
              <Heading
                level="1"
                size="xlarge"
                className="algolia-index-lvl1 text-deepblue-800 my-20 md:text-[3rem]"
              >
                Artikler
              </Heading>
              <div className="card-grid-3-1 mt-6">
                {allArticles
                  .filter((a: ArtiklerT) => a.tema)
                  .map((x) => {
                    return (
                      <ArtikkelCard
                        {...x}
                        source={x?.slug?.current}
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

export const getStaticProps = async () => {
  const { articles } = await getClient().fetch(akselArticleAll("[0..21]"));

  return {
    props: {
      articles,
    },
    revalidate: 60,
  };
};

export default Artikler;
