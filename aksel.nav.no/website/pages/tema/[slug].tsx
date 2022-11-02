import { abbrName, ArtikkelCard, BreadCrumbs, Slope } from "@/components";
import { AkselHeader, Footer } from "@/layout";
import {
  SanityT,
  akselTemaDocs,
  getAkselTema,
  getTemaSlug,
  usePreviewSubscription,
} from "@/lib";
import { SanityBlockContent } from "@/sanity-block";
import { getClient } from "@/sanity-client";
import { Heading, Label } from "@navikt/ds-react";
import Head from "next/head";
import React from "react";
import NotFotfund from "../404";
import cl from "classnames";

type ArtiklerT = Partial<
  SanityT.Schema.aksel_artikkel & {
    slug: string;
    tema: string[];
    contributors?: { title?: string }[];
  }
>;

export interface AkselTemaPage
  extends Omit<SanityT.Schema.aksel_tema, "ansvarlig"> {
  artikler: ArtiklerT[];
  ansvarlig?: { title?: string; roller: string[] };
}

interface PageProps {
  page: AkselTemaPage[];
  slug: string;
  preview: boolean;
}

const Page = (props: PageProps): JSX.Element => {
  const { data } = usePreviewSubscription(akselTemaDocs, {
    initialData: props.page,
    enabled: props?.preview,
  });

  const page = data.find((tema) => getTemaSlug(tema?.title) === props.slug);

  if (!page) {
    return <NotFotfund />;
  }

  const hasAnsvarlig = !!page?.ansvarlig?.title;

  return (
    <>
      <Head>
        <title>{`${page.title} - Aksel`}</title>
        <meta property="og:title" content={`${page.title} - Aksel`} />
      </Head>
      <div className="bg-white">
        <AkselHeader variant="inngang" />
        <main
          tabIndex={-1}
          id="hovedinnhold"
          className="min-h-[80vh] bg-gray-100 focus:outline-none"
        >
          <div className="relative overflow-x-clip bg-white pt-12">
            <div className="dynamic-wrapper px-4 pb-6">
              <BreadCrumbs href="/tema" text="Temaer" />
              <Heading
                level="1"
                size="xlarge"
                className="algolia-index-lvl1 text-deepblue-700 hidden text-5xl md:block"
              >
                {page.title}
              </Heading>
              <Heading
                level="1"
                size="large"
                className="algolia-index-lvl1 text-deepblue-700 block md:hidden"
              >
                {page.title}
              </Heading>

              <div className="mt-4 flex flex-col justify-between gap-8 xl:flex-row">
                <SanityBlockContent
                  blocks={page.beskrivelse}
                  noLastMargin
                  className="override-text-700 max-w-prose xl:mb-8"
                  isIngress
                />
                <div
                  className={cl(
                    "max-w xs:w-96 relative z-10 h-fit rounded-lg xl:mt-[10px]",
                    { invisible: !hasAnsvarlig }
                  )}
                  aria-hidden={!hasAnsvarlig}
                >
                  <Label
                    as="div"
                    size="small"
                    className="bg-deepblue-700 text-text-inverted flex rounded-t-lg px-4 pt-4 pb-3 uppercase md:px-6 md:pt-6 md:pb-4"
                  >
                    Ansvarlig for tema
                  </Label>
                  <div className="bg-deepblue-100 grid gap-2 rounded-b-lg px-4 py-3 md:px-6 md:py-4">
                    <div>
                      <Label as="div">
                        {page?.ansvarlig?.title
                          ? abbrName(page?.ansvarlig?.title)
                          : "placeholder"}
                      </Label>
                      {page?.ansvarlig?.roller?.length > 0 ? (
                        <div className="mt-[2px]">
                          {page?.ansvarlig?.roller.join(", ")}
                        </div>
                      ) : (
                        "placeholder"
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Slope />
          </div>

          {!page?.bruk_seksjoner || page?.seksjoner?.length === 0 ? (
            <div className="relative bg-gray-100 px-4 pt-8 pb-24 md:pt-16 xl:pt-8 ">
              <div className="dynamic-wrapper">
                <div className="card-grid-3-1">
                  {page.artikler.map((x) => (
                    <ArtikkelCard {...x} source={page.title} key={x._id} />
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="relative bg-gray-100 px-4 pt-8 pb-24 md:pt-16 xl:pt-8 ">
                <div className="dynamic-wrapper grid gap-16">
                  {page.seksjoner.map((seksjon) => (
                    <div key={seksjon._key}>
                      <Heading
                        level="2"
                        size="large"
                        spacing
                        className="hidden md:block"
                      >
                        {seksjon.title}
                      </Heading>
                      <Heading
                        level="2"
                        size="medium"
                        spacing
                        className="block md:hidden"
                      >
                        {seksjon.title}
                      </Heading>
                      {seksjon.beskrivelse && (
                        <div className="mt-2 mb-5 max-w-prose">
                          <SanityBlockContent
                            blocks={seksjon.beskrivelse}
                            noLastMargin
                          />
                        </div>
                      )}
                      <div className="card-grid-3-1">
                        {(seksjon.sider as unknown as ArtiklerT[]).map(
                          (x: ArtiklerT) => (
                            <ArtikkelCard
                              {...x}
                              source={page.title}
                              key={x._id}
                            />
                          )
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </main>
        <Footer variant="aksel" />
      </div>
    </>
  );
};

export const getStaticPaths = async () => {
  return {
    paths: await getAkselTema().then((paths) =>
      paths.map((slug) => ({
        params: {
          slug,
        },
      }))
    ),
    fallback: "blocking",
  };
};

export const getStaticProps = async ({
  params: { slug },
  preview = false,
}: {
  params: { slug: string };
  preview?: boolean;
}) => {
  const temas = await getClient().fetch(akselTemaDocs);
  const filtered = temas.filter(
    (x) => x.artikler.length !== 0 || x.seksjoner.length !== 0
  );
  const doc = filtered.find((tema) => getTemaSlug(tema?.title) === slug);

  return {
    props: {
      page: filtered,
      slug,
      preview,
      id: doc?._id ?? null,
    },
    notFound: !doc && !preview,
    revalidate: 60,
  };
};

export default Page;
