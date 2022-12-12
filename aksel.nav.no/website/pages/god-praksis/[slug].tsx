import { abbrName, ArtikkelCard } from "@/components";
import { Footer } from "@/layout";
import { akselTemaDocs, getAkselTema, SanityT, urlFor } from "@/lib";
import { SanityBlockContent } from "@/sanity-block";
import { getClient } from "@/sanity-client";
import { Heading, Label } from "@navikt/ds-react";
import cl from "classnames";
import { Header } from "components/layout/header/Header";
import { PreviewSuspense } from "next-sanity/preview";
import Head from "next/head";
import Image from "next/image";
import { lazy } from "react";
import NotFotfund from "../404";

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
  tema: AkselTemaPage;
  slug: string;
  preview: boolean;
}

const Page = ({ tema: page }: PageProps): JSX.Element => {
  if (!page || !page.seksjoner || page.seksjoner.length === 0) {
    return <NotFotfund />;
  }

  const hasAnsvarlig = !!page?.ansvarlig?.title;

  return (
    <>
      <Head>
        <title>{`${page.title} - Aksel`}</title>
        <meta property="og:title" content={`${page.title} - Aksel`} />
      </Head>
      <div className="bg-surface-subtle">
        <Header variant="subtle" />
        <main
          tabIndex={-1}
          id="hovedinnhold"
          className="min-h-[80vh] focus:outline-none"
        >
          <div className="relative overflow-x-clip pt-12">
            <div className="dynamic-wrapper px-4 pb-6">
              <Image
                src={urlFor(page.pictogram).auto("format").url()}
                decoding="async"
                width="72px"
                height="72px"
                layout="fixed"
                aria-hidden
              />
              <Heading
                level="1"
                size="xlarge"
                className="algolia-index-lvl1 text-5xl"
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
                    className="bg-deepblue-700 text-text-on-inverted flex rounded-t-lg px-4 pt-4 pb-3 uppercase md:px-6 md:pt-6 md:pb-4"
                  >
                    Ansvarlig for tema
                  </Label>
                  <div className="bg-deepblue-100 grid gap-2 rounded-b-lg px-4 py-3 md:px-6 md:py-4">
                    <div>
                      <Label as="div">
                        {page?.ansvarlig?.title
                          ? abbrName(page?.ansvarlig?.title)
                          : ""}
                      </Label>
                      {page?.ansvarlig?.roller?.length > 0 ? (
                        <div className="mt-[2px]">
                          {page?.ansvarlig?.roller.join(", ")}
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="relative px-4 pt-8 pb-24 md:pt-16 xl:pt-8 ">
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
                          source={page?.slug?.current}
                          key={x._id}
                        />
                      )
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

const WithPreview = lazy(() => import("../../components/WithPreview"));

const Wrapper = (props: any): JSX.Element => {
  if (props?.preview) {
    return (
      <PreviewSuspense fallback={<Page {...props} />}>
        <WithPreview
          comp={Page}
          query={akselTemaDocs}
          props={props}
          params={{
            slug: props?.slug,
          }}
        />
      </PreviewSuspense>
    );
  }

  return <Page {...props} />;
};

export default Wrapper;

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
  const { tema } = await getClient().fetch(akselTemaDocs, {
    slug,
  });

  return {
    props: {
      tema,
      slug,
      preview,
      id: tema?._id ?? null,
    },
    notFound: !tema && !preview,
    revalidate: 60,
  };
};
