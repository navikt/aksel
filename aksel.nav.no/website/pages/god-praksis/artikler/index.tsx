import { ArtikkelCard } from "@/components";
import { getClient } from "@/sanity-client";
import { ErrorMessage, Heading } from "@navikt/ds-react";
import Footer from "components/layout/footer/Footer";
import { Header } from "components/layout/header/Header";
import { AkselCubeStatic } from "components/website-modules/cube";
import { akselArticleAll } from "lib/sanity/queries";
import Head from "next/head";
import { useState } from "react";
import useSWR from "swr";
import { ArtiklerT } from "../[slug]";

interface ArtiklerProps {
  articles: ArtiklerT[];
}

const Artikler = ({ articles }: ArtiklerProps) => {
  const [allArticles, setAllArticles] = useState<ArtiklerT[]>(articles);
  const [fetchMore, setFetchMore] = useState<boolean>(false);

  const lastPublishedAt = articles[articles.length - 1].publishedAt;

  const { data, error } = useSWR(
    fetchMore
      ? () =>
          `/api/aksel-articles?lastId=test&lastPublishedAt=${lastPublishedAt}`
      : null,
    (query) => fetch(query).then((res) => res.json())
  );

  if (data) {
    setAllArticles([...allArticles, ...data]);
    setFetchMore(false);
  }

  return (
    <>
      <Head>
        <title>Artikler - Aksel</title>
        <meta property="og:title" content="Artikler - Aksel" />
      </Head>
      <div className="bg-surface-subtle">
        <Header variant="subtle" />
        <main
          tabIndex={-1}
          id="hovedinnhold"
          className="min-h-[80vh] focus:outline-none"
        >
          <div className="centered-layout mb-40 grid max-w-screen-2xl">
            <AkselCubeStatic className="text-deepblue-300 opacity-5 " />
            <Heading
              level="1"
              size="xlarge"
              className="algolia-index-lvl1 text-deepblue-800 my-20 md:text-[3rem]"
            >
              Artikler
            </Heading>
            <p>{allArticles?.length}</p>
            <button onClick={() => setFetchMore(true)}>Last flere</button>
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
            {error && (
              <div className="mt-4 flex justify-center">
                <ErrorMessage size="medium">
                  Kan ikke hente flere artikler, prøv igjen senere...
                </ErrorMessage>
              </div>
            )}
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export const getStaticProps = async () => {
  const { articles } = await getClient().fetch(akselArticleAll("[0...20]"));

  return {
    props: {
      articles,
    },
    revalidate: 60,
  };
};

export default Artikler;
